import { headers } from "next/headers"
import { NextResponse } from "next/server"
import Stripe from "stripe"
import { createClient } from "@supabase/supabase-js"
import { revokeFolderAccess, grantFolderAccess } from "@/lib/google-drive"

export async function POST(request: Request) {
  const body = await request.text()
  const headersList = await headers()
  const signature = headersList.get("stripe-signature")

  if (!signature) {
    return NextResponse.json({ error: "No signature" }, { status: 400 })
  }

  // Initialize Stripe and Supabase INSIDE the handler to avoid build-time errors
  // when environment variables might be missing.
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    console.error("Webhook signature verification failed:", err)
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
  }

  try {
    switch (event.type) {
      case "customer.subscription.created":
      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription

        // Find user by stripe customer id
        const { data: existingSub } = await supabase
          .from('subscriptions')
          .select('*')
          .eq('stripe_subscription_id', subscription.id)
          .single()


        const toISO = (timestamp: number | null | undefined, context: string) => {
          if (!timestamp) {
            console.warn(`[Stripe Webhook] Missing timestamp for ${context} in subscription ${subscription.id}`)
            // Default to 30 days from now if missing
            return new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
          }
          return new Date(timestamp * 1000).toISOString()
        }

        // Access properties safely, defaulting to snake_case but checking if they are missing
        const currentPeriodStart = (subscription as any).current_period_start
        let currentPeriodEnd = (subscription as any).current_period_end

        // Safety check: if end <= start or missing, add 30 days
        if (!currentPeriodEnd || (currentPeriodStart && currentPeriodEnd <= currentPeriodStart)) {
          console.warn(`[Stripe Webhook] Invalid or equal period end for subscription ${subscription.id}. Adjusting.`)
          const start = currentPeriodStart || Math.floor(Date.now() / 1000)
          currentPeriodEnd = start + 30 * 24 * 60 * 60
        }

        console.log(`[Stripe Webhook] Processing subscription ${subscription.id}. Start: ${currentPeriodStart}, End: ${currentPeriodEnd}`)

        const subscriptionData = {
          stripe_customer_id: subscription.customer as string,
          stripe_subscription_id: subscription.id,
          status: subscription.status,
          current_period_start: toISO(currentPeriodStart, 'start'),
          current_period_end: toISO(currentPeriodEnd, 'end'),
          cancel_at_period_end: subscription.cancel_at_period_end,
        }

        if (existingSub) {
          await supabase
            .from('subscriptions')
            .update(subscriptionData)
            .eq('stripe_subscription_id', subscription.id)
        } else {
          // If subscription doesn't exist, we need to create it.
          // First, fetch the customer to get the metadata with supabase_user_id
          const customer = await stripe.customers.retrieve(subscription.customer as string)

          if ((customer as any).deleted) {
            console.error("Customer deleted, cannot create subscription")
            break
          }

          // Safe access to metadata
          const customerData = customer as Stripe.Customer
          const supabaseUserId = customerData.metadata?.supabase_user_id

          if (supabaseUserId) {
            console.log(`Creating subscription for user ${supabaseUserId}`)

            const insertData = {
              user_id: supabaseUserId,
              ...subscriptionData,
              status: 'active',
              plan_id: subscription.metadata?.product_id || 'monthly-membership',
            }

            const { error: insertError } = await supabase.from('subscriptions').insert(insertData)

            if (insertError) {
              console.error("Error inserting subscription to Supabase:", insertError)
            } else {
              console.log("Subscription created successfully")

              // Grant Google Drive Access
              try {
                const folderId = process.env.GOOGLE_DRIVE_RESOURCE_ID
                if (folderId && customerData.email) {
                  await grantFolderAccess(customerData.email, folderId)
                } else {
                  console.warn("Skipping Drive Access: Missing GOOGLE_DRIVE_RESOURCE_ID or customer email.")
                }
              } catch (driveErr) {
                console.error("Failed to grant Drive access:", driveErr)
                // We don't fail the webhook, just log it
              }
            }

          } else {
            console.error("No supabase_user_id found in customer metadata for subscription:", subscription.id)
          }
        }
        break
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription

        // 1. Mark subscription as canceled
        await supabase
          .from('subscriptions')
          .update({ status: 'canceled' })
          .eq('stripe_subscription_id', subscription.id)

        // 2. Revoke Google Drive Access for ALL downloads
        // We need to find the user_id first
        const { data: subData } = await supabase
          .from('subscriptions')
          .select('user_id')
          .eq('stripe_subscription_id', subscription.id)
          .single()

        if (subData?.user_id) {
          // Get all downloads with permission IDs
          const { data: downloads } = await supabase
            .from('downloads')
            .select('drive_permission_id, drive_file_id')
            .eq('user_id', subData.user_id)
            .not('drive_permission_id', 'is', null)

          if (downloads && downloads.length > 0) {
            console.log(`Revoking ${downloads.length} Drive permissions for user ${subData.user_id}...`)

            // We shouldn't await inside a loop if we can avoid it, but for API rate limits simple sequential is safer
            // or Promise.all with concurrency limit. Given typical user doesn't have 1000s, Promise.all is ok-ish 
            // but let's be safe and do sequential or batches.
            for (const d of downloads) {
              if (d.drive_permission_id && d.drive_file_id) {
                try {
                  await revokeFolderAccess(d.drive_permission_id, d.drive_file_id)
                } catch (err) {
                  console.error(`Failed to revoke ${d.drive_file_id}:`, err)
                }
              }
            }
          }
        }
        break
      }

      case "invoice.payment_succeeded": {
        const invoice = event.data.object as Stripe.Invoice

        if ((invoice as any).subscription) {
          const subscription = await stripe.subscriptions.retrieve(
            (invoice as any).subscription as string
          )

          await supabase
            .from('subscriptions')
            .update({
              status: subscription.status,
              current_period_start: new Date((subscription as any).current_period_start * 1000).toISOString(),
              current_period_end: new Date((subscription as any).current_period_end * 1000).toISOString(),
            })
            .eq('stripe_subscription_id', subscription.id)
        }
        break
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice

        if ((invoice as any).subscription) {
          await supabase
            .from('subscriptions')
            .update({ status: 'past_due' })
            .eq('stripe_subscription_id', (invoice as any).subscription as string)
        }
        break
      }
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session

        // Check if this is a one-time payment for an event
        if (session.mode === 'payment' && session.metadata?.type === 'one_time') {
          const userId = session.metadata.user_id
          const productId = session.metadata.product_id

          // Record the booking
          await supabase.from('bookings').insert({
            user_id: userId,
            stripe_session_id: session.id,
            payment_intent_id: session.payment_intent as string,
            amount_paid: session.amount_total,
            currency: session.currency,
            status: 'paid',
            // We could link to an event_id here if we map productId -> event_id
            // for now we'll store the stripe_session_id which serves as proof
          })
        }
        break
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Webhook handler error:", error)
    return NextResponse.json(
      { error: `Webhook handler failed: ${error instanceof Error ? error.message : String(error)}` },
      { status: 500 }
    )
  }
}
