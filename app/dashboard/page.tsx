import { createClient } from "@/lib/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { BookOpen, Headphones, Play, Download, ArrowRight, Clock, FileText } from "lucide-react"

export default async function DashboardPage() {
  const supabase = await createClient()
  let user = null
  try {
    const { data: { user: authUser } } = await supabase.auth.getUser()
    user = authUser
  } catch {
    return null
  }
  
  if (!user) {
    return null
  }

  // Get user's download count
  const { count: downloadCount } = await supabase
    .from('downloads')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user?.id)

  // Get resource counts by type
  const { count: pdfCount } = await supabase
    .from('resources')
    .select('*', { count: 'exact', head: true })
    .eq('type', 'pdf')
    .eq('is_published', true)

  const { count: audioCount } = await supabase
    .from('resources')
    .select('*', { count: 'exact', head: true })
    .eq('type', 'audio')
    .eq('is_published', true)

  const { count: videoCount } = await supabase
    .from('resources')
    .select('*', { count: 'exact', head: true })
    .eq('type', 'video')
    .eq('is_published', true)

  // Get recent resources
  const { data: recentResources } = await supabase
    .from('resources')
    .select('*, category:categories(*)')
    .eq('is_published', true)
    .order('created_at', { ascending: false })
    .limit(5)

  // Get recent downloads
  const { data: recentDownloads } = await supabase
    .from('downloads')
    .select('*, resource:resources(*)')
    .eq('user_id', user?.id)
    .order('downloaded_at', { ascending: false })
    .limit(3)

  const stats = [
    { label: "PDF Guides", value: pdfCount || 0, icon: BookOpen, href: "/dashboard/resources?type=pdf" },
    { label: "Audio Meditations", value: audioCount || 0, icon: Headphones, href: "/dashboard/resources?type=audio" },
    { label: "Video Teachings", value: videoCount || 0, icon: Play, href: "/dashboard/resources?type=video" },
    { label: "My Downloads", value: downloadCount || 0, icon: Download, href: "/dashboard/downloads" },
  ]

  const typeIcons = {
    pdf: FileText,
    audio: Headphones,
    video: Play,
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-3xl font-bold text-foreground">Welcome Back</h1>
        <p className="mt-2 text-muted-foreground">
          Continue your spiritual journey with our latest resources.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="border-border/50 transition-all hover:border-primary/30">
            <Link href={stat.href}>
              <CardContent className="flex items-center gap-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Recent Resources */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="font-serif">New Resources</CardTitle>
            <CardDescription>Recently added to the library</CardDescription>
          </CardHeader>
          <CardContent>
            {recentResources && recentResources.length > 0 ? (
              <div className="space-y-4">
                {recentResources.map((resource) => {
                  const Icon = typeIcons[resource.type as keyof typeof typeIcons] || FileText
                  return (
                    <Link
                      key={resource.id}
                      href={`/dashboard/resources/${resource.slug}`}
                      className="flex items-center gap-4 rounded-lg p-2 transition-colors hover:bg-secondary/50"
                    >
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-secondary">
                        <Icon className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-medium text-foreground">{resource.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {resource.category?.name || 'Uncategorized'}
                        </p>
                      </div>
                      <ArrowRight className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
                    </Link>
                  )
                })}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No resources available yet.</p>
            )}
            <Button variant="outline" className="mt-4 w-full bg-transparent" asChild>
              <Link href="/dashboard/resources">
                Browse All Resources
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Recent Downloads */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="font-serif">Recent Downloads</CardTitle>
            <CardDescription>Your downloaded resources</CardDescription>
          </CardHeader>
          <CardContent>
            {recentDownloads && recentDownloads.length > 0 ? (
              <div className="space-y-4">
                {recentDownloads.map((download) => {
                  const Icon = download.resource?.type 
                    ? typeIcons[download.resource.type as keyof typeof typeIcons] 
                    : FileText
                  return (
                    <div
                      key={download.id}
                      className="flex items-center gap-4 rounded-lg p-2"
                    >
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-secondary">
                        <Icon className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-medium text-foreground">
                          {download.resource?.title || 'Unknown Resource'}
                        </p>
                        <p className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {new Date(download.downloaded_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">You haven{"'"}t downloaded anything yet.</p>
            )}
            <Button variant="outline" className="mt-4 w-full bg-transparent" asChild>
              <Link href="/dashboard/downloads">
                View All Downloads
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
