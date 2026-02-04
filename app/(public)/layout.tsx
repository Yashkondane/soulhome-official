import React from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { createClient } from "@/lib/server"

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  let isAdmin = false
  if (user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('is_admin')
      .eq('id', user.id)
      .single()
    isAdmin = profile?.is_admin ?? false
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navigation isLoggedIn={!!user} isAdmin={isAdmin} />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  )
}
