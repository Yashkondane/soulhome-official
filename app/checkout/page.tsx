import { redirect } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Sparkles, ArrowLeft, CheckCircle2, ShieldCheck } from "lucide-react"
import { getProduct, PRODUCTS } from "@/lib/products"
import { CheckoutForm } from "./checkout-form"

interface CheckoutPageProps {
  searchParams: Promise<{ plan?: string }>
}

export default async function CheckoutPage({ searchParams }: CheckoutPageProps) {
  const params = await searchParams
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Check if user already has an active subscription
  const { data: existingSubscription } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('user_id', user.id)
    .eq('status', 'active')
    .single()

  if (existingSubscription) {
    redirect("/dashboard")
  }

  const productId = params.plan || 'monthly-membership'
  const product = getProduct(productId)

  if (!product) {
    redirect("/membership")
  }

  const otherProduct = PRODUCTS.find(p => p.id !== productId)

  return (
    <div className="min-h-screen bg-secondary/30 py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/membership">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Membership
            </Link>
          </Button>
        </div>

        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-2">
            <Sparkles className="h-8 w-8 text-primary" />
            <span className="font-serif text-2xl font-semibold text-foreground">Soulhome</span>
          </Link>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Order Summary */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="font-serif text-xl">Order Summary</CardTitle>
              <CardDescription>Review your subscription details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-lg bg-secondary/50 p-4">
                <h3 className="font-semibold text-foreground">{product.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{product.description}</p>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-foreground">
                    £{(product.priceInCents / 100).toFixed(0)}
                  </span>
                  <span className="text-muted-foreground">
                    /{product.interval === 'month' ? 'month' : 'year'}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-foreground">Includes:</h4>
                {product.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>

              {otherProduct && (
                <div className="border-t border-border pt-4">
                  <p className="text-sm text-muted-foreground">
                    Want a different plan?{" "}
                    <Link
                      href={`/checkout?plan=${otherProduct.id}`}
                      className="text-primary hover:underline"
                    >
                      Switch to {otherProduct.name}
                    </Link>
                  </p>
                </div>
              )}

              <div className="flex items-center gap-2 rounded-lg bg-primary/5 p-3">
                <ShieldCheck className="h-5 w-5 text-primary" />
                <span className="text-sm text-muted-foreground">
                  Secure payment powered by Stripe
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Checkout Form */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="font-serif text-xl">Payment Details</CardTitle>
              <CardDescription>Complete your subscription</CardDescription>
            </CardHeader>
            <CardContent>
              <CheckoutForm productId={productId} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
