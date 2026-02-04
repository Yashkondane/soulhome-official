import { createClient } from "@/lib/server"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { User, CreditCard, Mail, Calendar, ExternalLink } from "lucide-react"
import { ProfileForm } from "./profile-form"

export default async function SettingsPage() {
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

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  const { data: subscription } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('user_id', user.id)
    .eq('status', 'active')
    .single()

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-3xl font-bold text-foreground">Settings</h1>
        <p className="mt-2 text-muted-foreground">
          Manage your account and subscription settings.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Profile Section */}
        <Card className="border-border/50">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <User className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle className="font-serif">Profile</CardTitle>
                <CardDescription>Update your personal information</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ProfileForm profile={profile} email={user.email || ''} />
          </CardContent>
        </Card>

        {/* Subscription Section */}
        <Card className="border-border/50">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <CreditCard className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle className="font-serif">Subscription</CardTitle>
                <CardDescription>Manage your membership</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {subscription ? (
              <>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Status</span>
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    Active
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Current Period</span>
                  <span className="text-sm text-foreground">
                    {new Date(subscription.current_period_start).toLocaleDateString()} - {new Date(subscription.current_period_end).toLocaleDateString()}
                  </span>
                </div>
                {subscription.cancel_at_period_end && (
                  <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
                    Your subscription will end on {new Date(subscription.current_period_end).toLocaleDateString()}
                  </div>
                )}
                <Button variant="outline" className="w-full bg-transparent" asChild>
                  <Link href="/dashboard/settings/billing">
                    Manage Billing
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </>
            ) : (
              <>
                <div className="rounded-lg bg-secondary/50 p-4 text-center">
                  <p className="text-sm text-muted-foreground">
                    You don{"'"}t have an active subscription.
                  </p>
                </div>
                <Button className="w-full" asChild>
                  <Link href="/membership">Subscribe Now</Link>
                </Button>
              </>
            )}
          </CardContent>
        </Card>

        {/* Account Info Section */}
        <Card className="border-border/50 lg:col-span-2">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle className="font-serif">Account Information</CardTitle>
                <CardDescription>Your account details</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium text-foreground">{user.email}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Member Since</p>
                <p className="font-medium text-foreground">
                  {new Date(user.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
