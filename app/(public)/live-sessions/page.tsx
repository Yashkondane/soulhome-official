import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, Video, Clock, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function LiveSessionsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Back Navigation */}
      <div className="fixed top-24 left-4 sm:left-8 lg:left-12 z-40">
        <Button variant="ghost" size="sm" asChild className="hover:bg-primary/5 text-primary">
          <Link href="/services">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Services
          </Link>
        </Button>
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-primary tracking-tight">
              1:1 Live Sessions
            </h1>
            <p className="text-xl font-serif italic text-primary max-w-2xl mx-auto" style={{ color: '#9B6FA8' }}>
              Feminine healing for the wounded soul.
            </p>
          </div>
        </div>
        {/* Decorative blobs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-30 pointer-events-none">
          <div className="absolute top-20 right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse delay-700"></div>
        </div>
      </section>

      {/* Hero Image Section */}
      <section className="pb-0">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="relative aspect-[21/9] rounded-2xl overflow-hidden shadow-2xl border-4 border-white/50">
              <Image
                src="/live session.jpg"
                alt="1:1 Live Session"
                fill
                className="object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Written Content Section */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-6 sm:px-8">
          <div className="space-y-8 font-serif text-[1.05rem] leading-[1.9] text-foreground/90">

            <p>
              My live sessions are a space where healing happens, they are spaces for{" "}
              <strong className="text-foreground">alignment to your Higher Self.</strong>
            </p>

            <div>
              <p className="mb-4">
                When you enter as a client, we are not looking at the <em>surface story</em>. We are attuning to what sits beneath;
              </p>
              <ul className="space-y-2 ml-2">
                <li className="flex gap-3">
                  <span className="text-primary mt-1 shrink-0">•</span>
                  <span>The patterns in your nervous system</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary mt-1 shrink-0">•</span>
                  <span>The emotional imprints you&apos;ve been carrying,</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary mt-1 shrink-0">•</span>
                  <span>The subtle ways your energy has adapted to <em>survive</em> rather than expand.</span>
                </li>
              </ul>
            </div>

            <p className="text-center italic text-primary text-xl sm:text-2xl py-4">
              This is where the work begins.
            </p>

            <p>
              Through frequency, presence, and precise guidance, the session starts to{" "}
              <strong className="text-foreground">reorganise</strong> what feels scattered or heavy. It&apos;s quiet, exact, and deeply felt. Your body finally begins to soften. Your mind stops looping. (Literally) Something within you recognises a more natural state, one that isn&apos;t driven by urgency, fear, or over-effort.
            </p>

            <p className="text-center">
              Your inner feminine begins to find <strong className="text-foreground"><em>Home.</em></strong>
            </p>

            <div className="w-24 h-px bg-primary/30 mx-auto" />

            <p>
              Clarity comes, it emerges from within you, clean and undeniable.
            </p>

            <p>
              What I offer is not prediction, and it&apos;s not dependency. It&apos;s a return to self-trust in a way that is embodied, not conceptual. People leave with more than insight. They leave with a different baseline.
            </p>

            <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8 space-y-4">
              <p className="font-bold text-foreground text-lg">You leave feeling:</p>
              <ul className="space-y-2">
                <li className="flex gap-3">
                  <span className="text-primary shrink-0">•</span>
                  <span>More regulated.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary shrink-0">•</span>
                  <span>More aware.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary shrink-0">•</span>
                  <span>More anchored in your body.</span>
                </li>
              </ul>
            </div>

            <p>
              And from that place, their life begins to move differently. You don&apos;t need to try harder, you work in alignment. You no longer work against their own system.
            </p>

            <div className="text-center space-y-4 py-4">
              <p className="italic text-lg">This is why the space is held the way it is.</p>
              <p className="italic text-lg">It is not for consumption.</p>
              <p className="italic text-xl font-semibold text-primary mt-4">
                It is for those who are ready to meet themselves, truthfully.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Details Grid */}
      <section className="py-16 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <div className="flex gap-4 items-start">
              <div className="p-3 bg-primary/10 rounded-xl shrink-0">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h4 className="font-bold text-primary font-serif">Seasonal Openings</h4>
                <p className="text-sm text-muted-foreground">Aligned with earth&apos;s current</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="p-3 bg-primary/10 rounded-xl shrink-0">
                <Video className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h4 className="font-bold text-primary font-serif">Private Video Calls</h4>
                <p className="text-sm text-muted-foreground">Safe and sacred virtual space</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="p-3 bg-primary/10 rounded-xl shrink-0">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h4 className="font-bold text-primary font-serif">Personalised Healing</h4>
                <p className="text-sm text-muted-foreground">Based on your energetic needs</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="p-3 bg-primary/10 rounded-xl shrink-0">
                <Calendar className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h4 className="font-bold text-primary font-serif">Limited Slots</h4>
                <p className="text-sm text-muted-foreground">Curated one-on-one attention</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary text-white">
        <div className="container mx-auto px-4 text-center space-y-8">
          <h2 className="font-serif text-4xl md:text-5xl font-bold">Ready to Start Your Journey?</h2>
          <p className="text-xl opacity-90 font-serif italic max-w-2xl mx-auto">
            Book your session below or join the waitlist for the next opening.
          </p>
          <div className="pt-4">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 rounded-full px-12 py-8 text-xl font-bold transition-all shadow-xl hover:scale-105" asChild>
              <Link href="https://calendly.com/soulhome-krisha" target="_blank" rel="noopener noreferrer">
                BOOK YOUR SESSION HERE
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
