import React from "react"
import { redirect } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/server"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { LayoutDashboard, Library, Download, Settings, LogOut, Shield } from "lucide-react"
import { signOut } from "@/app/actions/auth"
import Image from "next/image"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

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

  const navLinks = [
    { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
    { href: "/dashboard/resources", label: "Resources", icon: Library },
    { href: "/dashboard/downloads", label: "My Downloads", icon: Download },
    { href: "/dashboard/settings", label: "Settings", icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <LayoutDashboard className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-4 mt-6">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground transition-all duration-200 hover:bg-primary/5 hover:text-primary hover:shadow-sm"
                    >
                      <link.icon className="h-5 w-5" />
                      {link.label}
                    </Link>
                  ))}

                  {/* Subscription Status Mobile */}
                  <div className="mt-8 rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm p-5 shadow-sm">
                    <h3 className="text-sm font-semibold text-foreground">Subscription</h3>
                    {subscription ? (
                      <div className="mt-2">
                        <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                          Active
                        </span>
                        <p className="mt-2 text-xs text-muted-foreground">
                          Renews: {new Date(subscription.current_period_end).toLocaleDateString()}
                        </p>
                      </div>
                    ) : (
                      <div className="mt-2">
                        <span className="inline-flex items-center rounded-full bg-destructive/10 px-2 py-1 text-xs font-medium text-destructive">
                          No active subscription
                        </span>
                        <Button size="sm" className="mt-2 w-full" asChild>
                          <Link href="/membership">Subscribe</Link>
                        </Button>
                      </div>
                    )}
                  </div>
                </nav>
              </SheetContent>
            </Sheet>

            <Link href="/dashboard" className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="Soul Home"
                width={40}
                height={40}
                className="object-contain"
              />
              <span className="font-serif text-xl font-semibold text-foreground tracking-wide hidden sm:block">Member Portal</span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {profile?.is_admin && (
              <Button variant="ghost" size="sm" asChild>
                <Link href="/admin">
                  <Shield className="mr-2 h-4 w-4" />
                  Admin
                </Link>
              </Button>
            )}
            <span className="text-sm text-muted-foreground">
              {profile?.full_name || user.email}
            </span>
            <form action={signOut}>
              <Button variant="ghost" size="sm">
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </form>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden w-64 border-r border-border/50 bg-secondary/10 backdrop-blur-sm p-4 md:block">
          <nav className="space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground transition-all duration-200 hover:bg-primary/5 hover:text-primary hover:shadow-sm"
              >
                <link.icon className="h-5 w-5" />
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Subscription Status */}
          <div className="mt-8 rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-foreground">Subscription</h3>
            {subscription ? (
              <div className="mt-2">
                <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                  Active
                </span>
                <p className="mt-2 text-xs text-muted-foreground">
                  Renews: {new Date(subscription.current_period_end).toLocaleDateString()}
                </p>
              </div>
            ) : (
              <div className="mt-2">
                <span className="inline-flex items-center rounded-full bg-destructive/10 px-2 py-1 text-xs font-medium text-destructive">
                  No active subscription
                </span>
                <Button size="sm" className="mt-2 w-full" asChild>
                  <Link href="/membership">Subscribe</Link>
                </Button>
              </div>
            )}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
