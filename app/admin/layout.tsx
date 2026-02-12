import React from "react"
import { redirect } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/server"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Library, Users, FolderOpen, LogOut, ArrowLeft } from "lucide-react"
import { signOut } from "@/app/actions/auth"
import Image from "next/image"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  console.log('[v0] Admin layout - User:', user?.id)

  if (!user) {
    redirect("/auth/login")
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  console.log('[v0] Admin layout - Profile:', profile)
  console.log('[v0] Admin layout - Is admin:', profile?.is_admin)

  if (!profile?.is_admin) {
    console.log('[v0] Admin layout - Not admin, redirecting')
    redirect("/dashboard")
  }

  console.log('[v0] Admin layout - Access granted')

  const navLinks = [
    { href: "/admin", label: "Overview", icon: LayoutDashboard },
    { href: "/admin/resources", label: "Resources", icon: Library },
    { href: "/admin/categories", label: "Categories", icon: FolderOpen },
    { href: "/admin/members", label: "Members", icon: Users },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/admin" className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Soul Home"
              width={40}
              height={40}
              className="object-contain"
            />
            <span className="font-serif text-xl font-semibold text-foreground tracking-wide">Admin Panel</span>
          </Link>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Member Dashboard
              </Link>
            </Button>
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
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
