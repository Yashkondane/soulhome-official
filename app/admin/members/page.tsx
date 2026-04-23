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
    <div className="space-y-10">
      <div className="flex flex-col gap-2">
        <h1 className="font-serif text-4xl font-bold text-foreground tracking-tight">Community Directory</h1>
        <p className="text-muted-foreground text-lg font-medium opacity-80">
          Global database of all souls journeying with Soul Home.
        </p>
      </div>

      {profiles && profiles.length > 0 ? (
        <div className="grid gap-6">
          {profiles.map((profile) => {
            const subscription = subscriptionMap[profile.id]
            const downloadCount = downloadCounts[profile.id] || 0
            
            return (
              <Card key={profile.id} className="group overflow-hidden border-border/40 bg-white/40 backdrop-blur-xl dark:bg-black/40 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-0.5">
                <CardContent className="flex items-center gap-6 p-6">
                  <div className="relative h-14 w-14 shrink-0 rounded-full bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center text-primary font-bold shadow-sm transition-transform duration-500 group-hover:scale-110">
                     {profile.full_name?.charAt(0) || 'U'}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-1.5">
                       <h3 className="text-xl font-bold text-foreground tracking-tight group-hover:text-primary transition-colors">
                        {profile.full_name || 'Unnamed Member'}
                      </h3>
                      {profile.is_admin && (
                        <Badge variant="secondary" className="rounded-full px-3 py-0.5 bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20 text-[10px] uppercase font-bold tracking-widest leading-none">
                          <Shield className="mr-1 h-3 w-3" />
                          Architect
                        </Badge>
                      )}
                      {subscription?.status === 'active' ? (
                        <Badge variant="secondary" className="rounded-full px-3 py-0.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 text-[10px] uppercase font-bold tracking-widest leading-none">
                          <CreditCard className="mr-1 h-3 w-3" />
                          Elite Access
                        </Badge>
                      ) : (
                        <Badge variant="ghost" className="rounded-full px-3 py-0.5 bg-secondary/50 text-muted-foreground text-[10px] uppercase font-bold tracking-widest leading-none">
                          Base Membership
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground font-medium opacity-70">{profile.email}</p>
                  </div>

                  <div className="hidden text-right md:block">
                    <div className="flex items-center justify-end gap-2 text-muted-foreground mb-1">
                       <Users className="h-3.5 w-3.5" />
                       <span className="text-sm font-bold">{downloadCount} resources acquired</span>
                    </div>
                    <p className="flex items-center justify-end gap-1.5 text-[11px] font-bold uppercase tracking-widest text-muted-foreground/50">
                      <Calendar className="h-3 w-3" />
                      Manifested {new Date(profile.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      ) : (
        <Card className="border-border/40 bg-white/40 backdrop-blur-xl dark:bg-black/40 border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-20 text-center">
            <div className="h-20 w-20 rounded-full bg-primary/5 flex items-center justify-center mb-6">
              <Users className="h-10 w-10 text-primary/40" />
            </div>
            <h3 className="text-2xl font-bold text-foreground tracking-tight">The Directory is Quiet</h3>
            <p className="mt-2 text-muted-foreground font-medium max-w-sm mx-auto">
              No souls have joined the journey yet. Your community will grow in time.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
