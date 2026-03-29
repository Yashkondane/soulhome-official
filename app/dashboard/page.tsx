import { createClient } from "@/lib/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { BookOpen, Headphones, Play, Download, ArrowRight, Clock, FileText, AlertCircle } from "lucide-react"

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

  // Get user's active subscription for download counter
  const { data: subscriptions } = await supabase
    .from('subscriptions')
    .select('downloads_used, downloads_limit, current_period_end')
    .eq('user_id', user.id)
    .eq('status', 'active')
    .order('created_at', { ascending: false })
    .limit(1)

  const subscription = subscriptions?.[0] || null

  const downloadsUsed = subscription?.downloads_used ?? 0
  const downloadsLimit = subscription?.downloads_limit ?? 3
  const downloadsLeft = Math.max(0, downloadsLimit - downloadsUsed)
  const renewalDate = subscription?.current_period_end
    ? new Date(subscription.current_period_end).toLocaleDateString('en-GB', { day: 'numeric', month: 'long' })
    : null

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
        <h1 className="font-serif text-3xl font-bold text-foreground tracking-tight">Welcome Back</h1>
        <p className="mt-2 text-muted-foreground text-lg">
          Continue your spiritual journey with our latest resources.
        </p>
      </div>

      {/* Download Counter Banner */}
      {subscription && (() => {
        const ratio = downloadsUsed / downloadsLimit
        const isMaxed = downloadsLeft === 0
        const bgClass = ratio >= 1
          ? 'bg-purple-900/15 border-purple-400'
          : ratio >= 0.67
          ? 'bg-purple-700/12 border-purple-300'
          : ratio >= 0.34
          ? 'bg-purple-500/10 border-purple-200'
          : 'bg-purple-100/60 border-purple-100'
        const iconClass = ratio >= 1 ? 'text-purple-900' : ratio >= 0.67 ? 'text-purple-700' : ratio >= 0.34 ? 'text-purple-600' : 'text-purple-400'
        const barClass = ratio >= 1 ? 'bg-purple-800' : ratio >= 0.67 ? 'bg-purple-600' : ratio >= 0.34 ? 'bg-purple-500' : 'bg-purple-400'
        const textClass = ratio >= 1 ? 'text-purple-900' : ratio >= 0.67 ? 'text-purple-800' : ratio >= 0.34 ? 'text-purple-700' : 'text-purple-600'
        const barWidth = Math.min(100, ratio * 100)
        const message = isMaxed
          ? "You've reached your download limit for this month"
          : downloadsLeft === 1
          ? '1 download remaining this month'
          : `${downloadsLeft} downloads remaining this month`
        return (
          <div className={`rounded-2xl border p-5 flex items-center gap-5 ${bgClass}`}>
            <div className={`shrink-0 ${iconClass}`}>
              <Download className="h-8 w-8" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline justify-between gap-4 flex-wrap">
                <p className={`font-semibold text-sm ${textClass}`}>{message}</p>
                <p className="text-xs text-purple-500 shrink-0">
                  {downloadsUsed} / {downloadsLimit} used
                  {renewalDate ? ` · Resets ${renewalDate}` : ''}
                </p>
              </div>
              <div className="mt-2.5 h-2 rounded-full bg-purple-100 overflow-hidden">
                <div className={`h-full rounded-full transition-all duration-500 ${barClass}`} style={{ width: `${barWidth}%` }} />
              </div>
              {isMaxed && renewalDate && (
                <p className="mt-1.5 text-xs text-purple-700">Your downloads will reset on {renewalDate}.</p>
              )}
            </div>
          </div>
        )
      })()}

      {/* Stats Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="group relative overflow-hidden border-border/50 bg-gradient-to-br from-card/50 to-card/10 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:border-primary/20 hover:-translate-y-1">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <Link href={stat.href}>
              <CardContent className="flex items-center gap-4 p-6 relative z-10">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
                </div>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Recent Resources */}
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-sm">
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
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-sm">
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
