import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function LiveSessionsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Back Navigation */}
      <div className="fixed top-24 left-4 sm:left-8 z-40">
        <Button variant="ghost" size="sm" asChild className="hover:bg-primary/5 text-primary">
          <Link href="/services">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Link>
        </Button>
      </div>

      {/* Hero Image */}
      <section className="relative h-[50vh] sm:h-[60vh] overflow-hidden">
        <Image
          src="/live session.jpg"
          alt="1:1 Live Sessions"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-background" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="font-serif text-5xl sm:text-7xl font-bold uppercase tracking-widest text-white drop-shadow-2xl mb-4">
            1:1 Live Sessions
          </h1>
          <p className="font-serif text-xl sm:text-2xl italic text-primary-foreground/90 drop-shadow-lg" style={{ color: '#c9a0d4' }}>
            Feminine healing for the wounded soul.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-6 sm:px-8">

          {/* Intro */}
          <div className="space-y-8 text-[1.08rem] leading-[1.95] font-serif text-foreground/90">
            <p>
              My live sessions are a space where healing happens, they are spaces for{" "}
              <strong className="text-primary font-bold">alignment to your Higher Self.</strong>
            </p>

            <div>
              <p className="mb-4">
                When you enter as a client, we are not looking at the <em>surface story</em>. We are attuning to what sits beneath;
              </p>
              <ul className="space-y-2 ml-2">
                {["The patterns in your nervous system", "The emotional imprints you've been carrying,", "The subtle ways your energy has adapted to survive rather than expand."].map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="text-primary mt-1 shrink-0">•</span>
                    <span>{item.includes('survive') ? (
                      <>The subtle ways your energy has adapted to <em>survive</em> rather than expand.</>
                    ) : item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Pull quote */}
            <p className="text-center italic text-primary text-xl sm:text-2xl py-4 font-serif">
              This is where the work begins.
            </p>

            <p>
              Through frequency, presence, and precise guidance, the session starts to{" "}
              <strong>reorganise</strong> what feels scattered or heavy. It&apos;s quiet, exact, and deeply felt. Your body finally begins to soften. Your mind stops looping. (Literally) Something within you recognises a more natural state, one that isn&apos;t driven by urgency, fear, or over-effort.
            </p>

            <p className="text-center">
              Your inner feminine begins to find <strong><em>Home.</em></strong>
            </p>

            <div className="w-24 h-[1px] bg-primary/30 mx-auto" />

            <p>
              Clarity comes, it emerges from within you, clean and undeniable.
            </p>

            <p>
              What I offer is not prediction, and it&apos;s not dependency. It&apos;s a return to self-trust in a way that is embodied, not conceptual. People leave with more than insight. They leave with a different baseline.
            </p>

            <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8 space-y-4">
              <p className="font-bold text-primary text-lg">You leave feeling:</p>
              <ul className="space-y-2">
                {["More regulated.", "More aware.", "More anchored in your body."].map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="text-primary shrink-0">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <p>
              And from that place, their life begins to move differently. You don&apos;t need to try harder, you work in alignment. You no longer work against their own system.
            </p>

            <div className="text-center space-y-3 py-4">
              <p className="italic text-lg">This is why the space is held the way it is.</p>
              <p className="italic text-lg">It is not for consumption.</p>
              <p className="italic text-xl font-semibold text-primary mt-4">
                It is for those who are ready to meet themselves, truthfully.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 pt-12 border-t border-primary/20 text-center space-y-6">
            <p className="font-serif text-lg text-muted-foreground italic">Sessions open seasonally.</p>
            <Button size="lg" className="rounded-full px-12 py-6 text-lg font-bold bg-primary text-white hover:bg-primary/90 transition-all hover:scale-105 shadow-xl" asChild>
              <Link href="https://calendly.com/soulhome-krisha" target="_blank" rel="noopener noreferrer">
                BOOK YOUR SESSION
              </Link>
            </Button>
          </div>

        </div>
      </section>
    </div>
  )
}
