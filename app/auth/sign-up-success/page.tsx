import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles, Mail, ArrowRight } from "lucide-react"

export default function SignUpSuccessPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-secondary/30 px-4 py-12">
      <Link href="/" className="mb-8 flex items-center gap-2">
        <Sparkles className="h-8 w-8 text-primary" />
        <span className="font-serif text-2xl font-semibold text-foreground">Kundalini Awakening</span>
      </Link>
      
      <Card className="w-full max-w-md border-border/50 text-center">
        <CardHeader>
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Mail className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="mt-4 font-serif text-2xl">Check Your Email</CardTitle>
          <CardDescription className="mt-2">
            We{"'"}ve sent a confirmation link to your email address
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-sm text-muted-foreground leading-relaxed">
            Please click the link in the email to verify your account. Once verified, you can sign in and start exploring our resources.
          </p>
          <div className="rounded-lg bg-secondary/50 p-4">
            <p className="text-sm text-muted-foreground">
              Didn{"'"}t receive the email? Check your spam folder or{" "}
              <Link href="/auth/sign-up" className="text-primary hover:underline">
                try signing up again
              </Link>
            </p>
          </div>
          <Button asChild className="w-full">
            <Link href="/auth/login">
              Go to Sign In
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
