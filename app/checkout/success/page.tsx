import { redirect } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { createClient } from "@/lib/server"
import { createClient as createSupabaseClient } from "@supabase/supabase-js"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Sparkles, CheckCircle2, ArrowRight, Library, Download, Heart } from "lucide-react"
import { getCheckoutSession } from "@/app/actions/stripe"

interface SuccessPageProps {
  searchParams: Promise<{ session_id?: string }>
}

export default async function CheckoutSuccessPage({ searchParams }: SuccessPageProps) {
  const params = await searchParams
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  if (!params.session_id) {
    redirect("/dashboard")
  }

  // Verify the session and get subscription details
  let session
  try {
    session = await getCheckoutSession(params.session_id)
  } catch {
    redirect("/dashboard")
  }

  // Wait for the webhook to create the subscription record.
  // The webhook handles subscription creation — we just poll to confirm it arrived.
  if (session.subscription) {
    const subscriptionId = typeof session.subscription === 'string'
      ? session.subscription
      : session.subscription.id

    const supabaseAdmin = createSupabaseClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    // Poll up to 5 times (10 seconds total) for the webhook to create the subscription
    let subscriptionFound = false
    for (let i = 0; i < 5; i++) {
      const { data: sub } = await supabaseAdmin
        .from('subscriptions')
        .select('id')
        .eq('stripe_subscription_id', subscriptionId)
        .single()

      if (sub) {
        subscriptionFound = true
        break
      }

      // Wait 2 seconds before retrying
      await new Promise(resolve => setTimeout(resolve, 2000))
    }

    if (!subscriptionFound) {
      console.warn(`Webhook may not have fired yet for subscription ${subscriptionId}. User may need to refresh.`)
    }
  }

  const features = [
    { icon: Library, text: "Full access to our resource library" },
    { icon: Download, text: "3 resource downloads per month" },
    { icon: Heart, text: "New content added weekly" },
  ]

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-secondary/30 px-4 py-12">
      <Link href="/" className="mb-8 flex flex-col items-center gap-4">
        <div className="relative h-24 w-24">
          <Image
            src="/logo.png"
            alt="Soul Home"
            fill
            className="object-contain"
          />
        </div>
        <span className="font-serif text-2xl font-semibold text-foreground">Soul Home</span>
      </Link>

      <Card className="w-full max-w-md border-border/50 text-center">
        <CardHeader>
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <CheckCircle2 className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="mt-4 font-serif text-2xl">Payment Successful!</CardTitle>
          <CardDescription className="mt-2">
            Your subscription is now active
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-sm text-muted-foreground leading-relaxed">
            Thank you for joining us. You now have full access to all our resources.
          </p>

          <div className="bg-muted p-3 rounded-md text-xs text-muted-foreground break-all">
            Order Reference: {params.session_id}
          </div>

          <div className="rounded-lg bg-secondary/50 p-4 text-left">
            <h3 className="font-semibold text-foreground">What you can do now:</h3>
            <ul className="mt-3 space-y-3">
              {features.map((feature) => (
                <li key={feature.text} className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground">{feature.text}</span>
                </li>
              ))}
            </ul>
          </div>

          <Button asChild className="w-full">
            <Link href="/dashboard">
              Go to Dashboard
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
