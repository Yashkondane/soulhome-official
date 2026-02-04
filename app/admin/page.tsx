import { createClient } from "@/lib/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Library, Download, CreditCard, TrendingUp, Clock } from "lucide-react"

export default async function AdminPage() {
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

  // Get stats
  const { count: totalMembers } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })

  const { count: activeSubscriptions } = await supabase
    .from('subscriptions')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'active')

  const { count: totalResources } = await supabase
    .from('resources')
    .select('*', { count: 'exact', head: true })

  const { count: publishedResources } = await supabase
    .from('resources')
    .select('*', { count: 'exact', head: true })
    .eq('is_published', true)

  const { count: totalDownloads } = await supabase
    .from('downloads')
    .select('*', { count: 'exact', head: true })

  // Get recent activity
  const { data: recentMembers } = await supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(5)

  const { data: recentDownloads } = await supabase
    .from('downloads')
    .select('*, resource:resources(title), profile:profiles(full_name, email)')
    .order('downloaded_at', { ascending: false })
    .limit(5)

  const stats = [
    { label: "Total Members", value: totalMembers || 0, icon: Users, color: "text-blue-600" },
    { label: "Active Subscriptions", value: activeSubscriptions || 0, icon: CreditCard, color: "text-green-600" },
    { label: "Total Resources", value: totalResources || 0, icon: Library, color: "text-orange-600" },
    { label: "Total Downloads", value: totalDownloads || 0, icon: Download, color: "text-primary" },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-3xl font-bold text-foreground">Admin Overview</h1>
        <p className="mt-2 text-muted-foreground">
          Monitor your membership platform at a glance.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="border-border/50">
            <CardContent className="flex items-center gap-4 p-6">
              <div className={`flex h-12 w-12 items-center justify-center rounded-lg bg-secondary`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Card className="border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <TrendingUp className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Published Resources</p>
                <p className="text-lg font-semibold text-foreground">
                  {publishedResources} of {totalResources}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Conversion Rate</p>
                <p className="text-lg font-semibold text-foreground">
                  {totalMembers ? Math.round(((activeSubscriptions || 0) / totalMembers) * 100) : 0}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Recent Members */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="font-serif">Recent Members</CardTitle>
            <CardDescription>Newly registered users</CardDescription>
          </CardHeader>
          <CardContent>
            {recentMembers && recentMembers.length > 0 ? (
              <div className="space-y-4">
                {recentMembers.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center justify-between rounded-lg border border-border/50 p-3"
                  >
                    <div>
                      <p className="font-medium text-foreground">
                        {member.full_name || 'Unnamed'}
                      </p>
                      <p className="text-sm text-muted-foreground">{member.email}</p>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {new Date(member.created_at).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No members yet.</p>
            )}
          </CardContent>
        </Card>

        {/* Recent Downloads */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="font-serif">Recent Downloads</CardTitle>
            <CardDescription>Latest resource downloads</CardDescription>
          </CardHeader>
          <CardContent>
            {recentDownloads && recentDownloads.length > 0 ? (
              <div className="space-y-4">
                {recentDownloads.map((download) => (
                  <div
                    key={download.id}
                    className="flex items-center justify-between rounded-lg border border-border/50 p-3"
                  >
                    <div>
                      <p className="font-medium text-foreground">
                        {download.resource?.title || 'Unknown Resource'}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        by {download.profile?.full_name || download.profile?.email || 'Unknown User'}
                      </p>
                    </div>
                    <p className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {new Date(download.downloaded_at).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No downloads yet.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
