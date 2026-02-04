"use client"

import React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, CheckCircle2 } from "lucide-react"
import { createClient } from "@/lib/client"
import type { Profile } from "@/lib/types"

interface ProfileFormProps {
  profile: Profile | null
  email: string
}

export function ProfileForm({ profile, email }: ProfileFormProps) {
  const router = useRouter()
  const [fullName, setFullName] = useState(profile?.full_name || "")
  const [isLoading, setIsLoading] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)
    setIsSaved(false)

    const supabase = createClient()
    const { error } = await supabase
      .from('profiles')
      .update({ full_name: fullName })
      .eq('id', profile?.id)

    if (!error) {
      setIsSaved(true)
      router.refresh()
      setTimeout(() => setIsSaved(false), 3000)
    }

    setIsLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          disabled
          className="bg-secondary/50"
        />
        <p className="text-xs text-muted-foreground">
          Email cannot be changed
        </p>
      </div>
      <div className="space-y-2">
        <Label htmlFor="fullName">Full Name</Label>
        <Input
          id="fullName"
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Enter your full name"
          disabled={isLoading}
        />
      </div>
      <div className="flex items-center gap-3">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            "Save Changes"
          )}
        </Button>
        {isSaved && (
          <span className="flex items-center gap-1 text-sm text-primary">
            <CheckCircle2 className="h-4 w-4" />
            Saved
          </span>
        )}
      </div>
    </form>
  )
}
