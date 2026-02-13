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

  // Create or update subscription record
  if (session.subscription && typeof session.subscription !== 'string') {
    const subscription = session.subscription

    try {
      // Create a Service Role client to bypass RLS for subscription insertion
      const supabaseAdmin = createSupabaseClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
      )

      // Check if subscription already exists
      const { data: existingSub, error: fetchError } = await supabaseAdmin
        .from('subscriptions')
        .select('*')
        .eq('stripe_subscription_id', subscription.id)
        .single()

      if (fetchError && fetchError.code !== 'PGRST116') {
        console.error("Error fetching subscription:", fetchError)
      }

      if (existingSub) {
        // Determine start and end times
        const nowSeconds = Math.floor(Date.now() / 1000)
        let startInput = (subscription as any).current_period_start
        let endInput = (subscription as any).current_period_end

        // Fallback if missing
        if (!startInput) startInput = nowSeconds
        if (!endInput) endInput = startInput + 30 * 24 * 60 * 60

        // Safety check: ensure end is after start (min 28 days to be safe for monthly)
        if (endInput <= startInput) {
          console.warn("Detected end date <= start date, adjusting by 30 days")
          endInput = startInput + 30 * 24 * 60 * 60
        }

        const current_period_start = new Date(startInput * 1000).toISOString()
        const current_period_end = new Date(endInput * 1000).toISOString()

        // Update existing subscription
        const { error: updateError } = await supabaseAdmin.from('subscriptions').update({
          status: 'active', // Force active since we are in success page
          current_period_start,
          current_period_end,
          cancel_at_period_end: subscription.cancel_at_period_end,
        }).eq('id', existingSub.id)

        if (updateError) console.error("Error updating subscription:", updateError)

      } else {
        // Insert new subscription
        const { error: insertError } = await supabaseAdmin.from('subscriptions').insert({
          user_id: user.id,
          stripe_customer_id: typeof session.customer === 'string' ? session.customer : session.customer?.id,
          stripe_subscription_id: subscription.id,
          status: 'active', // Force active
          plan_id: session.metadata?.product_id || 'monthly-membership',
          used_downloads: 0,
          current_period_start: new Date(((subscription as any).current_period_start || Date.now() / 1000) * 1000).toISOString(),
          current_period_end: new Date(((subscription as any).current_period_end || (Date.now() / 1000) + 30 * 24 * 60 * 60) * 1000).toISOString(),
          cancel_at_period_end: subscription.cancel_at_period_end,
        })

        if (insertError) console.error("Error inserting subscription:", insertError)
      }
    } catch (err) {
      console.error("CRITICAL: Failed to process subscription in success page:", err)
    }
  }

  const features = [
    { icon: Library, text: "Full access to our resource library" },
    { icon: Download, text: "Unlimited downloads" },
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
