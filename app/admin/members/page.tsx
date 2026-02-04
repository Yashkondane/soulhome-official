import { createClient } from "@/lib/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Shield, CreditCard, Calendar } from "lucide-react"

export default async function AdminMembersPage() {
  const supabase = await createClient()

  // Get all profiles with their subscriptions
  const { data: profiles } = await supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false })

  // Get all subscriptions
  const { data: subscriptions } = await supabase
    .from('subscriptions')
    .select('*')

  // Create a map of user_id to subscription
  const subscriptionMap = subscriptions?.reduce((acc, sub) => {
    acc[sub.user_id] = sub
    return acc
  }, {} as Record<string, typeof subscriptions[0]>) || {}

  // Get download counts per user
  const { data: downloads } = await supabase
    .from('downloads')
    .select('user_id')

  const downloadCounts = downloads?.reduce((acc, d) => {
    acc[d.user_id] = (acc[d.user_id] || 0) + 1
    return acc
  }, {} as Record<string, number>) || {}

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-3xl font-bold text-foreground">Members</h1>
        <p className="mt-2 text-muted-foreground">
          View and manage your membership base.
        </p>
      </div>

      {profiles && profiles.length > 0 ? (
        <div className="space-y-4">
          {profiles.map((profile) => {
            const subscription = subscriptionMap[profile.id]
            const downloadCount = downloadCounts[profile.id] || 0
            
            return (
              <Card key={profile.id} className="border-border/50">
                <CardContent className="flex items-center gap-4 p-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-medium text-foreground">
                        {profile.full_name || 'Unnamed Member'}
                      </h3>
                      {profile.is_admin && (
                        <Badge variant="secondary" className="bg-blue-500/10 text-blue-600">
                          <Shield className="mr-1 h-3 w-3" />
                          Admin
                        </Badge>
                      )}
                      {subscription?.status === 'active' ? (
                        <Badge variant="secondary" className="bg-green-500/10 text-green-600">
                          <CreditCard className="mr-1 h-3 w-3" />
                          Active
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="bg-secondary text-muted-foreground">
                          No Subscription
                        </Badge>
                      )}
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{profile.email}</p>
                  </div>
                  <div className="hidden text-right sm:block">
                    <p className="text-sm text-muted-foreground">
                      {downloadCount} downloads
                    </p>
                    <p className="flex items-center justify-end gap-1 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      Joined {new Date(profile.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      ) : (
        <Card className="border-border/50">
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <Users className="h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 font-semibold text-foreground">No Members Yet</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Members will appear here once they sign up.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
