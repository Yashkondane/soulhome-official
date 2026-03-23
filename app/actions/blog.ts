"use server"

import { createClient } from "@/lib/server"
import { revalidatePath } from "next/cache"
import { v4 as uuidv4 } from "uuid"

// Types
export interface BlogData {
  title: string
  slug: string
  excerpt: string
  content: string
  cover_image_url: string
  gallery_image_urls: string[]
  is_published: boolean
}

// Ensure user is an admin
async function requireAdmin() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) throw new Error("Unauthorized")

  const { data: profile } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)
    .single()

  if (!profile?.is_admin) throw new Error("Unauthorized: Admins only")

  return { supabase, user }
}

export async function uploadBlogImage(formData: FormData) {
  try {
    const { supabase } = await requireAdmin()
    const file = formData.get("file") as File
    
    if (!file) throw new Error("No file provided")

    const fileExt = file.name.split('.').pop()
    const fileName = `${uuidv4()}.${fileExt}`
    const filePath = `${fileName}`

    const { error: uploadError } = await supabase.storage
      .from('blog-images')
      .upload(filePath, file)

    if (uploadError) throw uploadError

    const { data: { publicUrl } } = supabase.storage
      .from('blog-images')
      .getPublicUrl(filePath)

    return { success: true, url: publicUrl }
  } catch (error) {
    console.error("Error uploading image:", error)
    return { success: false, error: "Failed to upload image" }
  }
}

export async function createBlog(data: BlogData) {
  try {
    const { supabase, user } = await requireAdmin()

    const { error } = await supabase.from('blogs').insert({
      ...data,
      author_id: user.id,
      published_at: data.is_published ? new Date().toISOString() : null
    })

    if (error) {
      // Handle unique slug constraint violation gracefully
      if (error.code === '23505') {
          throw new Error("A blog with this slug already exists. Please choose a different title or slug.")
      }
      throw error
    }

    revalidatePath('/admin/blogs')
    revalidatePath('/blog')
    
    return { success: true }
  } catch (error) {
    console.error("Error creating blog:", error)
    return { success: false, error: error instanceof Error ? error.message : "Failed to create blog" }
  }
}

export async function updateBlog(id: string, data: BlogData) {
  try {
    const { supabase } = await requireAdmin()

    const updateData = {
      ...data,
      published_at: data.is_published ? new Date().toISOString() : null
    }

    const { error } = await supabase
      .from('blogs')
      .update(updateData)
      .eq('id', id)

    if (error) throw error

    revalidatePath('/admin/blogs')
    revalidatePath('/blog')
    revalidatePath(`/blog/${data.slug}`)
    
    return { success: true }
  } catch (error) {
    console.error("Error updating blog:", error)
    return { success: false, error: "Failed to update blog" }
  }
}

export async function deleteBlog(id: string) {
  try {
    const { supabase } = await requireAdmin()

    const { error } = await supabase
      .from('blogs')
      .delete()
      .eq('id', id)

    if (error) throw error

    revalidatePath('/admin/blogs')
    revalidatePath('/blog')

    return { success: true }
  } catch (error) {
    console.error("Error deleting blog:", error)
    return { success: false, error: "Failed to delete blog" }
  }
}

// Public fetcher functions (no auth required)
export async function getPublishedBlogs() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('blogs')
    .select('id, title, slug, excerpt, cover_image_url, published_at, profiles(full_name)')
    .eq('is_published', true)
    .order('published_at', { ascending: false })

  if (error) {
    console.error("Error fetching blogs:", error)
    return []
  }
  return data
}

export async function getBlogBySlug(slug: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('blogs')
    .select('*, profiles(full_name)')
    .eq('slug', slug)
    .eq('is_published', true)
    .single()

  if (error) {
    return null
  }
  return data
}

// Admin fetcher functions
export async function adminGetBlogs() {
  try {
    const { supabase } = await requireAdmin()
    const { data, error } = await supabase
      .from('blogs')
      .select('id, title, is_published, created_at')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  } catch (error) {
    console.error("Error fetching blogs for admin:", error)
    return []
  }
}

export async function adminGetBlogById(id: string) {
  try {
    const { supabase } = await requireAdmin()
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error("Error fetching blog by ID for admin:", error)
    return null
  }
}
