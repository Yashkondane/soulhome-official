"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Loader2, CheckCircle2 } from "lucide-react"
import { createClient } from "@/lib/client"
import { AuthSplitLayout } from "@/components/auth-split-layout"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const supabase = createClient()
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/update-password`,
    })

    if (error) {
      setError(error.message)
      setIsLoading(false)
      return
    }

    setSuccess(true)
    setIsLoading(false)
  }

  return (
    <AuthSplitLayout>
      <div className="mb-8 space-y-2 text-center lg:text-left">
        <h1 className="font-serif text-3xl font-bold tracking-wide text-foreground">Reset Password</h1>
        <p className="text-muted-foreground">Enter your email to receive a reset link</p>
      </div>

      <div className="space-y-4">
        {success ? (
          <div className="space-y-4 text-center">
            <div className="flex justify-center">
              <CheckCircle2 className="h-12 w-12 text-green-500" />
            </div>
            <h3 className="text-xl font-medium">Check your email</h3>
            <p className="text-muted-foreground">
              We have sent a password reset link to <span className="font-medium text-foreground">{email}</span>.
            </p>
            <Button asChild className="w-full mt-4" variant="outline">
              <Link href="/auth/login">Return to log in</Link>
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
                className="bg-background"
              />
            </div>
            
            <Button type="submit" className="w-full py-6 text-lg" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending Link...
                </>
              ) : (
                "Send Reset Link"
              )}
            </Button>

            <div className="mt-6 text-center text-sm">
              <Link href="/auth/login" className="font-medium text-primary hover:underline">
                Back to log in
              </Link>
            </div>
          </form>
        )}
      </div>
    </AuthSplitLayout>
  )
}
