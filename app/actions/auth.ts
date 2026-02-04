"use server"

import { redirect } from "next/navigation"
import { createClient } from "@/lib/server"

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect("/")
}

export async function getUser() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

export async function getUserProfile() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) return null
  
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()
    
  return profile
}

export async function getUserSubscription() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) return null
  
  const { data: subscription } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('user_id', user.id)
    .eq('status', 'active')
    .single()
    
  return subscription
}

export async function requireAuth() {
  const user = await getUser()
  if (!user) {
    redirect("/auth/login")
  }
  return user
}

export async function requireActiveSubscription() {
  const user = await requireAuth()
  const subscription = await getUserSubscription()
  
  if (!subscription) {
    redirect("/membership")
  }
  
  return { user, subscription }
}

export async function requireAdmin() {
  const user = await requireAuth()
  const profile = await getUserProfile()
  
  if (!profile?.is_admin) {
    redirect("/dashboard")
  }
  
  return { user, profile }
}
