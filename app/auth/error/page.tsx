import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles, AlertTriangle, ArrowRight } from "lucide-react"

export default function AuthErrorPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-secondary/30 px-4 py-12">
      <Link href="/" className="mb-8 flex items-center gap-2">
        <Sparkles className="h-8 w-8 text-primary" />
        <span className="font-serif text-2xl font-semibold text-foreground">Kundalini Awakening</span>
      </Link>
      
      <Card className="w-full max-w-md border-border/50 text-center">
        <CardHeader>
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
            <AlertTriangle className="h-8 w-8 text-destructive" />
          </div>
          <CardTitle className="mt-4 font-serif text-2xl">Authentication Error</CardTitle>
          <CardDescription className="mt-2">
            Something went wrong during authentication
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-sm text-muted-foreground leading-relaxed">
            We encountered an error while trying to authenticate your account. This could be due to an expired link or a temporary issue.
          </p>
          <div className="flex flex-col gap-3">
            <Button asChild>
              <Link href="/auth/login">
                Try Signing In
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/contact">Contact Support</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
