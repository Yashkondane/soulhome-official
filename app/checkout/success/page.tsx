import { redirect } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/server"
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

  // Create or update subscription record
  if (session.subscription && typeof session.subscription !== 'string') {
    const subscription = session.subscription

    // Check if subscription already exists
    const { data: existingSub } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('stripe_subscription_id', subscription.id)
      .single()

    if (!existingSub) {
      await supabase.from('subscriptions').insert({
        user_id: user.id,
        stripe_customer_id: typeof session.customer === 'string' ? session.customer : session.customer?.id,
        stripe_subscription_id: subscription.id,
        status: subscription.status,
        plan_id: session.metadata?.product_id || 'monthly-membership',
        current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
        current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
        cancel_at_period_end: subscription.cancel_at_period_end,
      })
    }
  }

  const features = [
    { icon: Library, text: "Full access to our resource library" },
    { icon: Download, text: "Unlimited downloads" },
    { icon: Heart, text: "New content added weekly" },
  ]

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-secondary/30 px-4 py-12">
      <Link href="/" className="mb-8 flex items-center gap-2">
        <Sparkles className="h-8 w-8 text-primary" />
        <span className="font-serif text-2xl font-semibold text-foreground">Kundalini Awakening</span>
      </Link>
      
      <Card className="w-full max-w-md border-border/50 text-center">
        <CardHeader>
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <CheckCircle2 className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="mt-4 font-serif text-2xl">Welcome to the Community!</CardTitle>
          <CardDescription className="mt-2">
            Your subscription is now active
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-sm text-muted-foreground leading-relaxed">
            Thank you for joining us on this sacred journey. You now have full access to all our teachings, meditations, and resources.
          </p>

          <div className="rounded-lg bg-secondary/50 p-4 text-left">
            <h3 className="font-semibold text-foreground">What you can do now:</h3>
            <ul className="mt-3 space-y-3">
              {features.map((feature) => (
                <li key={feature.text} className="flex items-center gap-3">
                  <feature.icon className="h-5 w-5 text-primary" />
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
