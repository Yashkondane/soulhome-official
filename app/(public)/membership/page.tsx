import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Sparkles, ArrowRight, ShieldCheck, RefreshCw, Heart } from "lucide-react"
import { PRODUCTS } from "@/lib/products"

const faqs = [
  {
    question: "What happens after I subscribe?",
    answer: "You'll receive immediate access to our entire resource library. You can start exploring and downloading content right away."
  },
  {
    question: "Can I cancel anytime?",
    answer: "Yes, you can cancel your membership at any time. You'll retain access until the end of your current billing period."
  },
  {
    question: "How often is new content added?",
    answer: "We add new teachings, meditations, and resources weekly. Members receive notifications when fresh content is available."
  },
  {
    question: "Can I download resources for offline use?",
    answer: "Yes! All PDFs, audio files, and videos are downloadable. Your downloads are tracked in your personal dashboard."
  },
  {
    question: "Is there a free trial?",
    answer: "We don't offer a free trial, but you can cancel within the first 7 days for a full refund if the membership isn't right for you."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, debit cards, and Apple Pay through our secure Stripe payment system."
  }
]

const guarantees = [
  {
    icon: ShieldCheck,
    title: "Secure Payments",
    description: "All transactions are encrypted and processed securely through Stripe."
  },
  {
    icon: RefreshCw,
    title: "Cancel Anytime",
    description: "No long-term contracts. Cancel whenever you need to."
  },
  {
    icon: Heart,
    title: "7-Day Guarantee",
    description: "Not satisfied? Get a full refund within your first 7 days."
  }
]

function formatPrice(cents: number, interval?: string): string {
  const pounds = cents / 100
  if (!interval) return `£${pounds.toFixed(0)}`
  return `£${pounds.toFixed(0)}/${interval === 'month' ? 'mo' : 'yr'}`
}

export default function MembershipPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-primary/15 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              <Sparkles className="h-4 w-4" />
              Membership
            </div>
            <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl text-balance">
              Invest in Your Spiritual Growth
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed text-balance">
              Choose the plan that works best for your journey. Full access to our entire library with either option.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-4xl gap-8 lg:grid-cols-2">
            {PRODUCTS.map((product) => (
              <Card
                key={product.id}
                className={`relative border-border/50 ${product.interval === 'year' ? 'border-primary shadow-lg' : ''}`}
              >
                {product.interval === 'year' && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground">
                    Best Value
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="font-serif text-2xl">{product.name}</CardTitle>
                  <CardDescription className="mt-2">
                    {product.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="mt-4">
                    <span className="font-serif text-5xl font-bold text-foreground">
                      {formatPrice(product.priceInCents, product.interval)}
                    </span>
                    {product.interval === 'year' && (
                      <p className="mt-2 text-sm text-muted-foreground">
                        That{"'"}s just £{(product.priceInCents / 100 / 12).toFixed(2)}/month
                      </p>
                    )}
                  </div>
                  <ul className="mt-8 space-y-3 text-left">
                    {product.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                        <span className="text-sm text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full"
                    size="lg"
                    variant={product.interval === 'year' ? 'default' : 'outline'}
                    asChild
                  >
                    <Link href={`/checkout?plan=${product.id}`}>
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantees */}
      <section className="bg-primary/15 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-3">
            {guarantees.map((guarantee) => (
              <div key={guarantee.title} className="flex items-start gap-4 text-center md:flex-col md:items-center">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <guarantee.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{guarantee.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{guarantee.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-muted-foreground">
              Everything you need to know about membership.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-3xl">
            <div className="space-y-8">
              {faqs.map((faq) => (
                <div key={faq.question} className="border-b border-border pb-8 last:border-0">
                  <h3 className="font-semibold text-foreground">{faq.question}</h3>
                  <p className="mt-2 text-muted-foreground leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-serif text-3xl font-bold text-primary-foreground sm:text-4xl text-balance">
              Ready to Transform Your Practice?
            </h2>
            <p className="mt-4 text-primary-foreground/80">
              Join hundreds of seekers who have deepened their spiritual journey with us.
            </p>
            <div className="mt-10">
              <Button size="lg" variant="secondary" asChild>
                <Link href="#pricing">
                  Choose Your Plan
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
