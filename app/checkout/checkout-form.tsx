"use client"

import { useCallback, useState } from "react"
import { loadStripe } from "@stripe/stripe-js"
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js"
import { createCheckoutSession } from "@/app/actions/stripe"
import { Loader2 } from "lucide-react"

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
)

interface CheckoutFormProps {
  productId: string
}

export function CheckoutForm({ productId }: CheckoutFormProps) {
  const [error, setError] = useState<string | null>(null)

  const fetchClientSecret = useCallback(async () => {
    try {
      const { clientSecret } = await createCheckoutSession(productId)
      return clientSecret!
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create checkout session')
      throw err
    }
  }, [productId])

  if (error) {
    return (
      <div className="rounded-lg bg-destructive/10 p-4 text-center">
        <p className="text-sm text-destructive">{error}</p>
      </div>
    )
  }

  return (
    <div id="checkout" className="min-h-[400px]">
      <EmbeddedCheckoutProvider
        stripe={stripePromise}
        options={{ fetchClientSecret }}
      >
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  )
}
