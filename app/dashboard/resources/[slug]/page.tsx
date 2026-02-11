import { createClient } from "@/lib/server"
import { notFound, redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowLeft, BookOpen, Headphones, Play, FileText, Clock, Download, Calendar } from "lucide-react"
import { DownloadButton } from "./download-button"

interface ResourcePageProps {
  params: Promise<{ slug: string }>
}

export default async function ResourcePage({ params }: ResourcePageProps) {
  const { slug } = await params
  const supabase = await createClient()
  let user = null
  try {
    const { data: { user: authUser } } = await supabase.auth.getUser()
    user = authUser
  } catch {
    redirect("/auth/login")
  }

  if (!user) {
    redirect("/auth/login")
  }

  // Check subscription status
  const { data: subscription } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('user_id', user.id)
    .eq('status', 'active')
    .single()

  // Get resource
  const { data: resource } = await supabase
    .from('resources')
    .select('*, category:categories(*)')
    .eq('slug', slug)
    .eq('is_published', true)
    .single()

  if (!resource) {
    notFound()
  }

  // Check if already downloaded
  const { data: existingDownload } = await supabase
    .from('downloads')
    .select('*')
    .eq('user_id', user.id)
    .eq('resource_id', resource.id)
    .single()

  const typeIcons = {
    pdf: FileText,
    audio: Headphones,
    video: Play,
  }

  const typeLabels = {
    pdf: "PDF Guide",
    audio: "Audio Meditation",
    video: "Video Teaching",
  }

  const typeColors = {
    pdf: "bg-blue-500/10 text-blue-600",
    audio: "bg-green-500/10 text-green-600",
    video: "bg-orange-500/10 text-orange-600",
  }

  const Icon = typeIcons[resource.type as keyof typeof typeIcons] || FileText
  const typeLabel = typeLabels[resource.type as keyof typeof typeLabels] || resource.type
  const typeColor = typeColors[resource.type as keyof typeof typeColors] || "bg-secondary text-foreground"

  function formatFileSize(bytes: number | null) {
    if (!bytes) return null
    const mb = bytes / (1024 * 1024)
    return `${mb.toFixed(1)} MB`
  }

  return (
    <div className="space-y-8">
      <div>
        <Button variant="ghost" size="sm" asChild className="mb-4">
          <Link href="/dashboard/resources">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Library
          </Link>
        </Button>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <Card className="border-border/50">
            <CardHeader>
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <Icon className="h-7 w-7 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="secondary" className={typeColor}>
                      {typeLabel}
                    </Badge>
                    {resource.category && (
                      <Badge variant="outline">{resource.category.name}</Badge>
                    )}
                  </div>
                  <CardTitle className="mt-2 font-serif text-2xl">
                    {resource.title}
                  </CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {resource.description && (
                <div>
                  <h3 className="font-semibold text-foreground">Description</h3>
                  <p className="mt-2 text-muted-foreground leading-relaxed">
                    {resource.description}
                  </p>
                </div>
              )}

              {/* Resource Preview/Player Area */}
              {resource.type === 'video' && resource.file_url && (
                <div className="aspect-video overflow-hidden rounded-lg bg-secondary">
                  <video
                    controls
                    className="h-full w-full"
                    src={resource.file_url}
                    poster={resource.thumbnail_url || undefined}
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
              )}

              {resource.type === 'audio' && resource.file_url && (
                <div className="rounded-lg bg-secondary p-6">
                  <audio controls className="w-full">
                    <source src={resource.file_url} />
                    Your browser does not support the audio element.
                  </audio>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Download Card */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-lg">Download Resource</CardTitle>
              <CardDescription>
                {subscription
                  ? "Save this resource for offline access"
                  : "Subscribe to download resources"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {subscription ? (
                <DownloadButton
                  resourceId={resource.id}
                  fileUrl={resource.file_url}
                  fileName={`${resource.slug}.${resource.type === 'pdf' ? 'pdf' : resource.type === 'audio' ? 'mp3' : 'mp4'}`}
                  hasDownloaded={!!existingDownload}
                  slug={slug}
                />
              ) : (
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">
                    An active subscription is required to download resources.
                  </p>
                  <Button className="mt-4 w-full" asChild>
                    <Link href="/membership">Subscribe Now</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Details Card */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-lg">Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {resource.duration_minutes && (
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Duration</p>
                    <p className="text-sm text-muted-foreground">{resource.duration_minutes} minutes</p>
                  </div>
                </div>
              )}
              {resource.file_size_bytes && (
                <div className="flex items-center gap-3">
                  <Download className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-foreground">File Size</p>
                    <p className="text-sm text-muted-foreground">{formatFileSize(resource.file_size_bytes)}</p>
                  </div>
                </div>
              )}
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-foreground">Added</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(resource.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
