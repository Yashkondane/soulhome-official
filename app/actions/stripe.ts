"use server"

import Stripe from "stripe"
import { createClient } from "@/lib/server"
import { getProduct, PRODUCTS } from "@/lib/products"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function createCheckoutSession(productId: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error("Not authenticated")
  }

  const product = getProduct(productId)
  if (!product) {
    throw new Error("Product not found")
  }

  // Check if user already has an active subscription ONLY if buying a subscription
  if (product.type === 'subscription') {
    const { data: existingSubscription } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', user.id)
      .eq('status', 'active')
      .single()

    if (existingSubscription) {
      throw new Error("You already have an active subscription")
    }
  }

  // Check if user has a Stripe customer ID
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  let customerId: string | undefined = profile?.stripe_customer_id

  // If user doesn't have a Stripe customer, create one
  if (!customerId) {
    const customer = await stripe.customers.create({
      email: user.email,
      metadata: {
        supabase_user_id: user.id,
      },
    })
    customerId = customer.id
    // Store the customer ID - updating profile
    await supabase.from('profiles').update({ stripe_customer_id: customerId }).eq('id', user.id)
  } else {
    // If they HAVE a customer ID, make sure the metadata is synced
    // This fixes the issue where old test customers didn't have the ID attached
    await stripe.customers.update(customerId, {
      metadata: {
        supabase_user_id: user.id
      }
    })
  }

  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    customer_update: {
      address: 'auto',
    },
    // When customer is provided, customer_email must NOT be provided
    // customer_email: customerId ? undefined : user.email, 
    line_items: [
      {
        price_data: {
          currency: 'gbp',
          product_data: {
            name: product.name,
            description: product.description,
          },
          unit_amount: product.priceInCents,
          recurring: product.type === 'subscription' && product.interval ? {
            interval: product.interval,
          } : undefined,
        },
        quantity: 1,
      },
    ],
    mode: product.type === 'subscription' ? 'subscription' : 'payment',
    ui_mode: 'embedded',
    return_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    metadata: {
      user_id: user.id,
      product_id: productId,
      type: product.type, // Pass type to webhook
    },
  })

  return { clientSecret: session.client_secret }
}

export async function getCheckoutSession(sessionId: string) {
  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['subscription', 'customer'],
  })

  return session
}

export async function createBillingPortalSession() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error("Not authenticated")
  }

  const { data: subscription } = await supabase
    .from('subscriptions')
    .select('stripe_customer_id')
    .eq('user_id', user.id)
    .single()

  if (!subscription?.stripe_customer_id) {
    throw new Error("No subscription found")
  }

  const session = await stripe.billingPortal.sessions.create({
    customer: subscription.stripe_customer_id,
    return_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/dashboard/settings`,
  })

  return { url: session.url }
}
