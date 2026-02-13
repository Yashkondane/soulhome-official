import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">

      {/* Section 1: About Krisha (Text Left, Image Right) */}
      <section className="py-20 sm:py-28 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            {/* Text Side */}
            <div className="space-y-6 animate-in slide-in-from-left duration-700">
              <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-6">
                About Krisha
              </h1>
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  I am a Blue-Violet Ray Starseed, carrying the codes of Lemurian light, crystalline remembrance, and divine alchemy. My work flows through frequency; The unseen current of energy that heals, awakens, and restores truth.
                </p>
                <p>
                  My transmissions are gentle yet powerful, here to dissolve illusion and show you a mirror to your original soul blueprint. I bridge higher realms and earth, holding a field where the unseen becomes felt and the sacred becomes real.
                </p>
              </div>
            </div>

            {/* Image Side */}
            <div className="relative aspect-[4/5] lg:aspect-square w-full max-w-md mx-auto lg:max-w-none rounded-2xl overflow-hidden shadow-2xl animate-in slide-in-from-right duration-700">
              <Image
                src="/about-soulhome.png"
                alt="Krisha"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: My Magical Childhood */}
      <section className="bg-primary/5 py-20 sm:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center space-y-8">
          <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
            My Magical Childhood
          </h2>
          <div className="space-y-6 text-muted-foreground leading-relaxed text-lg">
            <p>
              Growing up, I was deeply intuitive and sensitive to energies I didn’t yet have language for. In environments that felt dense or disconnected, I naturally retreated into my inner world, where imagination and subtle awareness felt safer and more real. Over time, I silenced this sensitivity; a necessary descent into the human experience, in order to belong and navigate expectations.
            </p>
            <p>
              Around the age of seven, I began having vivid inner visions of my adult self, pregnant and speaking to me. I also found myself channeling sounds and frequencies that felt as though they came from another realm. At that age, these experiences were brushed off as imagination, not recognised as ancient or intuitive intelligence. Now, those same currents move through my work as multidimensional lightcode transmissions. I didn’t build this as I grew older, I looked inward and remembered.
            </p>
          </div>
        </div>
      </section>

      {/* Section 3: A Neurodivergent Journey */}
      <section className="py-20 sm:py-28 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center space-y-8">
          <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
            A Neurodivergent Journey
          </h2>
          <div className="space-y-6 text-muted-foreground leading-relaxed text-lg">
            <p>
              As a neurodivergent soul, I understand that many of my clients are not here to learn something new, but to reconnect with what they already carry. This is also why I don’t share detailed narratives of my personal journey when asked. Your path is meant to be your own, not an adaptation of mine or anyone else’s. Your truth emerges most clearly when it is discovered from within.
            </p>
          </div>
        </div>
      </section>

      {/* Section 4: From Medical to Energy Healing */}
      <section className="bg-primary/5 py-20 sm:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center space-y-8">
          <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
            From Medical to Energy Healing
          </h2>
          <div className="space-y-6 text-muted-foreground leading-relaxed text-lg">
            <p>
              Through my work as a Therapy Radiographer in Oncology, I felt the deep emotions of souls at their most vulnerable. Close to death, yet on the edge of rebirth. I witnessed the courage a cancer diagnosis can bring, and the way life is celebrated even amidst struggle. This work gave me purpose during a very dark phase of my own.
            </p>
            <p>
              Later, in healthcare business development, I explored creativity and perseverance while supporting patients worldwide, connecting the farthest corners of the world in ways that weren’t possible for many during COVID lockdowns. Looking back, I see how all of this prepared me for wholeness, shaping the compassion, depth, and insight that now flow naturally through my work.
            </p>
            <p className="font-medium text-primary">
              With frequency-healing, I see deeper layers as my awareness grows.
            </p>
          </div>
        </div>
      </section>

      {/* Section 5: Krisha's Skills */}
      <section className="py-24 sm:py-32 bg-[#FDFBF7]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[#9F8EA1]">
              Krisha’s Skills
            </h2>
          </div>

          <div className="grid gap-12 md:grid-cols-3 max-w-7xl mx-auto">

            {/* Skill 1: Multidimensional Healing */}
            <div className="flex flex-col items-center text-center space-y-6">
              <div className="relative w-full aspect-square max-w-[300px] overflow-hidden rounded-t-full">
                <Image
                  src="/download (7).png"
                  alt="Multidimensional Healing"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="space-y-4 pt-4 relative">
                <div className="w-16 h-0.5 bg-[#9F8EA1]/30 mx-auto absolute top-0 inset-x-0"></div>
                <h3 className="font-serif text-2xl italic text-[#7A6B7E]">
                  Multidimensional Healing
                </h3>
                <p className="text-sm text-[#7A6B7E]/80 leading-relaxed max-w-sm mx-auto">
                  This isn’t ordinary healing. It requires deep insight, strong grounding, and the capacity to move through multiple layers of reality and return with clarity. I work with the body’s sheaths; physical, emotional, mental, and subtle, which correspond to different dimensions or lokas and hold imprints of karma, memory, and wisdom.
                </p>
              </div>
            </div>

            {/* Skill 2: Akashic Field Integration */}
            <div className="flex flex-col items-center text-center space-y-6">
              <div className="relative w-full aspect-square max-w-[300px] overflow-hidden rounded-t-full">
                <Image
                  src="/download (6).png"
                  alt="Akashic Field Integration"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="space-y-4 pt-4 relative">
                <div className="w-16 h-0.5 bg-[#9F8EA1]/30 mx-auto absolute top-0 inset-x-0"></div>
                <h3 className="font-serif text-2xl italic text-[#7A6B7E]">
                  Akashic Field Integration
                </h3>
                <p className="text-sm text-[#7A6B7E]/80 leading-relaxed max-w-sm mx-auto">
                  It was through understanding my own relationship with the Akashic field that I found my footing and true grounding within it. I released the taught way of access, and allowed my own way to emerge. Now, the Akashic frequency is interlaced subtly into my work, supporting gentle integration rather than overt transmission.
                </p>
              </div>
            </div>

            {/* Skill 3: Embodied Sovereignty */}
            <div className="flex flex-col items-center text-center space-y-6">
              <div className="relative w-full aspect-square max-w-[300px] overflow-hidden rounded-t-full">
                <Image
                  src="/download (5).png"
                  alt="Embodied Sovereignty"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="space-y-4 pt-4 relative">
                <div className="w-16 h-0.5 bg-[#9F8EA1]/30 mx-auto absolute top-0 inset-x-0"></div>
                <h3 className="font-serif text-2xl italic text-[#7A6B7E]">
                  Embodied Sovereignty
                </h3>
                <p className="text-sm text-[#7A6B7E]/80 leading-relaxed max-w-sm mx-auto">
                  I guide this work through a unique interplay of soul, body, and nervous system. I channel and create bespoke exercises that bring astral and multidimensional experiences into the 3-dimensional plane, helping clients anchor self-trust and embody their own sovereignty.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary/95 text-primary-foreground py-20 sm:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl font-bold sm:text-4xl mb-6">
            Ready to Begin Your Journey?
          </h2>
          <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto mb-10">
            Join our community and reconnect with your original soul blueprint.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" variant="secondary" asChild className="text-primary bg-white hover:bg-white/90">
              <Link href="/membership">
                View Membership
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 bg-transparent" asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
