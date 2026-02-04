import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Heart, Flame, Sun, Moon } from "lucide-react"

const values = [
  {
    icon: Heart,
    title: "Authenticity",
    description: "We honour the traditional lineage while making ancient wisdom accessible to modern seekers."
  },
  {
    icon: Flame,
    title: "Transformation",
    description: "Every teaching is designed to support genuine spiritual growth and inner transformation."
  },
  {
    icon: Sun,
    title: "Accessibility",
    description: "Quality spiritual education should be available to all sincere seekers, regardless of location."
  },
  {
    icon: Moon,
    title: "Community",
    description: "We nurture a supportive space where practitioners can grow together on the path."
  }
]

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-primary/15 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl text-balance">
              Our Sacred Mission
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed text-balance">
              Dedicated to preserving and sharing the ancient wisdom for seekers around the world.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
              Our Story
            </h2>
            <div className="mt-8 space-y-6 text-muted-foreground leading-relaxed">
              <p>
                Soulhome was founded with a singular vision: to make authentic spiritual teachings accessible to sincere seekers everywhere. After decades of study with masters across India and Tibet, our founder recognised the need for a dedicated space where the profound wisdom could be shared with the Western world.
              </p>
              <p>
                What began as small gatherings in London has grown into a thriving online community of practitioners from across the globe. We have carefully curated a library of teachings that honour the traditional lineage while speaking to the modern seeker's journey.
              </p>
              <p>
                Every meditation, every teaching, every resource in our library has been created with deep reverence for the ancient traditions and practical wisdom for contemporary life. We believe that spiritual awakening is not an escape from the world, but a deeper engagement with it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-primary/15 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
              Our Core Values
            </h2>
            <p className="mt-4 text-muted-foreground">
              The principles that guide everything we create and share.
            </p>
          </div>
          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <Card key={value.title} className="border-border/50 bg-card/50 text-center">
                <CardContent className="pt-6">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mt-4 font-semibold text-foreground">{value.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Approach Section */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl text-balance">
                Our Approach to Teaching
              </h2>
              <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  We believe in meeting seekers where they are. Whether you are taking your first steps on the spiritual path or deepening an established practice, our resources are designed to support your unique journey.
                </p>
                <p>
                  Our teachings combine traditional practices with clear, accessible instruction. We provide context for ancient techniques, explain the energetic principles at work, and offer practical guidance for integrating these practices into daily life.
                </p>
                <p>
                  Most importantly, we emphasise direct experience over mere intellectual understanding. The practices we share are meant to be lived, not just learned.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5 p-8">
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <div className="space-y-4">
                    <p className="font-serif text-2xl font-semibold text-foreground">
                      {"\""}The goal is not to become special, but to become real.{"\""}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      — Our Founding Principle
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-serif text-3xl font-bold text-primary-foreground sm:text-4xl text-balance">
              Ready to Begin?
            </h2>
            <p className="mt-4 text-primary-foreground/80">
              Join our community and gain access to our complete library of teachings and practices.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/membership">
                  View Membership
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 bg-transparent" asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
