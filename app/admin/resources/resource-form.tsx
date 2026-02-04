"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Loader2, Upload, X, Crop as CropIcon } from "lucide-react"
import { createClient } from "@/lib/client"
import type { Category, Resource } from "@/lib/types"
import { ImageCropper } from "@/components/image-cropper"

interface ResourceFormProps {
  categories: Category[]
  resource?: Resource
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

export function ResourceForm({ categories, resource }: ResourceFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isCropperOpen, setIsCropperOpen] = useState(false)
  const [tempImageSrc, setTempImageSrc] = useState<string | null>(null)

  // File states
  const [pdfFile, setPdfFile] = useState<File | null>(null)
  const [thumbnailFile, setThumbnailFile] = useState<Blob | null>(null)
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(resource?.thumbnail_url || null)

  const [formData, setFormData] = useState({
    title: resource?.title || "",
    slug: resource?.slug || "",
    description: resource?.description || "",
    type: resource?.type || "pdf",
    file_url: resource?.file_url || "",
    thumbnail_url: resource?.thumbnail_url || "",
    duration_minutes: resource?.duration_minutes?.toString() || "",
    file_size_bytes: resource?.file_size_bytes?.toString() || "",
    category_id: resource?.category_id || "none",
    is_published: resource?.is_published ?? false,
  })

  function handleTitleChange(title: string) {
    setFormData(prev => ({
      ...prev,
      title,
      slug: resource ? prev.slug : generateSlug(title),
    }))
  }

  // Handle PDF File Selection
  const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setPdfFile(file)
      // Auto-set file size
      setFormData(prev => ({
        ...prev,
        file_size_bytes: file.size.toString()
      }))
    }
  }

  // Handle Image File Selection (opens cropper)
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const reader = new FileReader()
      reader.addEventListener("load", () => {
        setTempImageSrc(reader.result as string)
        setIsCropperOpen(true)
      })
      reader.readAsDataURL(file)
      // Reset input value to allow re-selecting same file
      e.target.value = ''
    }
  }

  // Handle Crop Completion
  const onCropComplete = (croppedBlob: Blob) => {
    setThumbnailFile(croppedBlob)
    setThumbnailPreview(URL.createObjectURL(croppedBlob))
  }

  // Upload to Supabase Storage
  async function uploadFileToSupabase(file: File | Blob, bucket: string, path: string) {
    const supabase = createClient()
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, file, {
        cacheControl: '3600',
        upsert: true
      })

    if (error) {
      throw error
    }

    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(path)

    return publicUrl
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)

    try {
      let finalFileUrl = formData.file_url
      let finalThumbnailUrl = formData.thumbnail_url

      // Upload PDF if new file selected
      if (pdfFile) {
        const fileExt = pdfFile.name.split('.').pop()
        const fileName = `${formData.slug}-${Date.now()}.${fileExt}`
        const filePath = `uploads/${fileName}`

        // Ensure you have a 'resources' bucket
        finalFileUrl = await uploadFileToSupabase(pdfFile, 'resources', filePath)
      }

      // Upload Thumbnail if new file selected/cropped
      if (thumbnailFile) {
        const fileName = `${formData.slug}-thumb-${Date.now()}.jpg`
        const filePath = `uploads/${fileName}`

        // Ensure you have a 'thumbnails' bucket
        finalThumbnailUrl = await uploadFileToSupabase(thumbnailFile, 'thumbnails', filePath)
      }

      const supabase = createClient()

      const duration = parseInt(formData.duration_minutes)
      const fileSize = parseInt(formData.file_size_bytes)

      const data = {
        title: formData.title,
        slug: formData.slug,
        description: formData.description || null,
        type: formData.type,
        file_url: finalFileUrl,
        thumbnail_url: finalThumbnailUrl || null,
        duration_minutes: isNaN(duration) ? null : duration,
        file_size_bytes: isNaN(fileSize) ? null : fileSize,
        category_id: formData.category_id === "none" ? null : formData.category_id,
        is_published: formData.is_published,
      }

      console.log('Submitting data:', data) // Debug log

      if (resource) {
        const { error } = await supabase
          .from('resources')
          .update(data)
          .eq('id', resource.id)
        if (error) throw error
      } else {
        const { error } = await supabase
          .from('resources')
          .insert(data)
        if (error) throw error
      }

      router.push('/admin/resources')
      router.refresh()
    } catch (error: any) {
      console.error('Error saving resource:', error)
      const msg = error.message || error.error_description || JSON.stringify(error)
      alert(`Failed to save resource: ${msg}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 rounded-lg shadow-sm border">
        <div className="grid gap-8 sm:grid-cols-2">
          {/* Main Info Column */}
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Resource title"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">Slug</Label>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                placeholder="resource-slug"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Brief description of this resource"
                rows={4}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type">Type</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF Guide</SelectItem>
                    <SelectItem value="audio">Audio</SelectItem>
                    <SelectItem value="video">Video</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={formData.category_id}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, category_id: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No Category</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Upload Column */}
          <div className="space-y-6">
            {/* PDF Upload */}
            <div className="space-y-2 p-4 border rounded-md bg-gray-50/50">
              <Label className="flex items-center gap-2">
                <Upload className="w-4 h-4" />
                Resource File ({formData.type.toUpperCase()})
              </Label>

              <Input
                type="file"
                accept={formData.type === 'pdf' ? '.pdf' : 'audio/*,video/*'}
                onChange={handlePdfChange}
                className="cursor-pointer"
              />

              {formData.file_url && !pdfFile && (
                <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                  ✓ Current file: ...{formData.file_url.slice(-20)}
                </p>
              )}
            </div>

            {/* Thumbnail Upload */}
            <div className="space-y-2 p-4 border rounded-md bg-gray-50/50">
              <Label className="flex items-center gap-2">
                <CropIcon className="w-4 h-4" />
                Thumbnail Image
              </Label>

              <Input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="cursor-pointer"
              />

              {thumbnailPreview && (
                <div className="mt-4 relative group w-fit">
                  <img
                    src={thumbnailPreview}
                    alt="Thumbnail preview"
                    className="w-40 h-auto rounded-md border shadow-sm"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute -top-2 -right-2 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => {
                      setThumbnailFile(null)
                      setThumbnailPreview(null)
                      setFormData(prev => ({ ...prev, thumbnail_url: '' }))
                    }}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="duration_minutes">Duration (mins)</Label>
                <Input
                  id="duration_minutes"
                  type="number"
                  value={formData.duration_minutes}
                  onChange={(e) => setFormData(prev => ({ ...prev, duration_minutes: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="file_size_bytes">Size (bytes)</Label>
                <Input
                  id="file_size_bytes"
                  type="number"
                  readOnly={!!pdfFile} // Auto-calculated if new file
                  className={pdfFile ? "bg-gray-100" : ""}
                  value={formData.file_size_bytes}
                  onChange={(e) => setFormData(prev => ({ ...prev, file_size_bytes: e.target.value }))}
                />
              </div>
            </div>

            <div className="flex items-center gap-3 pt-4">
              <Switch
                id="is_published"
                checked={formData.is_published}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_published: checked }))}
              />
              <Label htmlFor="is_published">Publish to members immediately</Label>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4 pt-4 border-t">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading} className="min-w-[150px]">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : (
              "Save Resource"
            )}
          </Button>
        </div>
      </form>

      <ImageCropper
        imageSrc={tempImageSrc}
        isOpen={isCropperOpen}
        onClose={() => setIsCropperOpen(false)}
        onCropComplete={onCropComplete}
        aspectRatio={16 / 9}
      />
    </>
  )
}
