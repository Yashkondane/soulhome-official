import Image from "next/image"
import { CheckSquare } from "lucide-react"
import { SubscribeDialog } from "./subscribe-dialog"
import { DecorativeArch } from "@/components/decorative-arch"
import { Card, CardContent } from "@/components/ui/card"

export default function MembershipPage() {
  return (
    <div className="flex flex-col bg-background min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full -z-10 pointer-events-none opacity-20">
          <DecorativeArch className="w-full h-full text-primary" />
        </div>

        <div className="mx-auto max-w-6xl relative z-10">
          <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-16 text-center text-balance hand-drawn-underline pb-4">
            KUNDALINI SCHOOL
          </h1>

          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            {/* Left Column - Intro */}
            <div className="flex flex-col items-center text-center lg:pr-8">
              <div className="relative w-full aspect-[2/1] max-w-lg mb-8 drop-shadow-sm">
                <Image
                  src="/download (24).png"
                  alt="Flute with Peacock Feather"
                  fill
                  className="object-contain"
                />
              </div>
              <p className="text-[#885d7b] font-medium leading-relaxed max-w-md text-lg">
                Kundalini School is a <span className="font-bold text-primary">self-healing portal</span>.
                A space away from the distractions of the world, to connect with yourself and find inner peace.
                Here, you learn to alchemise dense karma into spiritual wisdom.
              </p>
            </div>

            {/* Right Column - Pricing Box */}
            <Card className="border-primary/20 bg-background/50 backdrop-blur-sm shadow-xl p-2 md:p-4">
              <CardContent className="p-6 md:p-8 space-y-6">
                <h2 className="text-center text-primary font-serif font-bold text-xl mb-6">
                  Energy Exchange: £77 per month
                </h2>
                
                <ul className="space-y-4 text-[#885d7b] text-sm md:text-base leading-relaxed mb-8">
                  <li className="flex gap-3">
                    <span className="text-primary mt-1.5 shrink-0">•</span>
                    <span>Free to become a member, and view topics of healing.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary mt-1.5 shrink-0">•</span>
                    <span>Subscribe and pay to download healings & resources</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary mt-1.5 shrink-0">•</span>
                    <span>Monthly subscription</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary mt-1.5 shrink-0">•</span>
                    <span>Cancel anytime with a month{"'"}s notice <span className="text-xs font-bold block mt-1">(30 days notice required for billing + notification sent to our team)</span></span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary mt-1.5 shrink-0">•</span>
                    <span>Payment covers energy exchange for one person, do not reshare as it leads to energy displacement</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary mt-1.5 shrink-0">•</span>
                    <span>Feedback form to reflect and ask questions for future healing suggestions</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary mt-1.5 shrink-0">•</span>
                    <span>This does not include live sessions</span>
                  </li>
                </ul>

                <div className="space-y-3 text-[#885d7b]/80 text-xs md:text-sm italic border-t border-primary/10 pt-6">
                  <p>• I have read and agree to the terms & conditions by making this payment.</p>
                  <p>• No refund given once payment has been made for the month.</p>
                  <p>• Monthly payments will be taken unless cancelled, with a month{"'"}s notice.</p>
                </div>

                <div className="flex justify-center mt-8 pt-4">
                  <SubscribeDialog 
                    planId="monthly-membership" 
                    buttonText="Become a Member" 
                    className="bg-primary hover:bg-primary/90 text-white rounded-full px-10 py-6 text-lg shadow-lg hover:shadow-xl transition-all"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-24 px-4 sm:px-6 lg:px-8 bg-primary/5">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-serif text-3xl font-bold text-center text-foreground mb-20 tracking-wide hand-drawn-underline pb-4">
            WHAT DOES KUNDALINI SCHOOL GIVE YOU?
          </h2>

          <div className="space-y-24">
            {/* Feature 1 */}
            <div className="flex flex-col md:flex-row gap-12 items-center md:items-start group">
              <div className="w-40 h-40 md:w-48 md:h-48 shrink-0 relative transition-transform duration-500 group-hover:scale-105">
                <Image
                  src="/download (23).png"
                  alt="Lavender"
                  fill
                  className="object-contain object-top"
                />
              </div>
              <div className="text-[#885d7b] pt-4 md:pt-8 text-center md:text-left">
                <p className="mb-6 leading-relaxed text-lg">
                  <span className="font-bold text-primary">Self-healing resources</span> to enhance your life and spiritual journey. This is not a space to binge, it is a space to slow down and settle into your self.
                </p>
                <div className="flex gap-4 items-start justify-center md:justify-start">
                  <CheckSquare className="w-6 h-6 mt-0.5 shrink-0 text-primary opacity-80" />
                  <p className="leading-relaxed">Every month, you can download 3 healings to practice in your own time.</p>
                </div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col md:flex-row gap-12 items-center md:items-start group">
              <div className="w-40 h-40 md:w-48 md:h-48 shrink-0 relative transition-transform duration-500 group-hover:scale-105">
                <Image
                  src="/download (22).png"
                  alt="Lavender"
                  fill
                  className="object-contain object-top"
                />
              </div>
              <div className="text-[#885d7b] pt-4 md:pt-8 text-center md:text-left">
                <p className="mb-6 leading-relaxed text-lg">
                  <span className="font-bold text-primary">Divine Feminine & Masculine energies</span> are supported through specific modules which help you evolve on your inner work journey, with love and tenderness. The feminine blooms in the safety of the divine masculine{"'"}s presence. Let yourself bloom in self-love.
                </p>
                <div className="flex gap-4 items-start justify-center md:justify-start">
                  <CheckSquare className="w-6 h-6 mt-0.5 shrink-0 text-primary opacity-80" />
                  <p className="leading-relaxed font-medium">All exercises promote a balance of inner union, and twin flame union</p>
                </div>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col md:flex-row gap-12 items-center md:items-start group">
              <div className="w-40 h-40 md:w-48 md:h-48 shrink-0 relative transition-transform duration-500 group-hover:scale-105">
                <Image
                  src="/download (21).png"
                  alt="Lavender"
                  fill
                  className="object-contain object-top"
                />
              </div>
              <div className="text-[#885d7b] pt-4 md:pt-8 text-center md:text-left">
                <p className="mb-6 leading-relaxed text-lg">
                  <span className="font-bold text-primary">Twin Flames:</span> Every single healing or transmission will help you unlock union. There are specific modules just for twin flames as well. Although I would not suggest solely focusing on this. Instead, explore the wide range of healings available.
                </p>
                <div className="flex gap-4 items-start justify-center md:justify-start">
                  <CheckSquare className="w-6 h-6 mt-0.5 shrink-0 text-primary opacity-80" />
                  <p className="leading-relaxed">Learn to embody twin flame union through regular practice, not seek it outside</p>
                </div>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="flex flex-col md:flex-row gap-12 items-center md:items-start group">
              <div className="w-40 h-40 md:w-48 md:h-48 shrink-0 relative transition-transform duration-500 group-hover:scale-105">
                <Image
                  src="/download (20).png"
                  alt="Lavender branch"
                  fill
                  className="object-contain object-top"
                />
              </div>
              <div className="text-[#885d7b] pt-4 md:pt-8 text-center md:text-left">
                <p className="mb-6 leading-relaxed text-lg">
                  <span className="font-bold text-primary">Learn integration;</span> the biggest challenge in spirituality is to truly receive and integrate healing within your body and nervous system. If food is healing, then integration is like absorbing nutrients from the food.
                </p>
                <div className="flex gap-4 items-start justify-center md:justify-start">
                  <CheckSquare className="w-6 h-6 mt-0.5 shrink-0 text-primary opacity-80" />
                  <p className="leading-relaxed">Exercises included to practice true integration at your own pace.</p>
                </div>
              </div>
            </div>

            {/* Feature 5 */}
            <div className="flex flex-col md:flex-row gap-12 items-center md:items-start group">
              <div className="w-40 h-40 md:w-48 md:h-48 shrink-0 relative transition-transform duration-500 group-hover:scale-105">
                <Image
                  src="/download (19).png"
                  alt="Lavender branch"
                  fill
                  className="object-contain object-top"
                />
              </div>
              <div className="text-[#885d7b] pt-4 md:pt-8 text-center md:text-left">
                <p className="mb-6 leading-relaxed text-lg">
                  <span className="font-bold text-primary">Choosing serotonin over dopamine-spikes.</span> This space will demand your body to sink into its relaxed state. It is not fast or intimidating like social media. It is a safe, healing space. This will trigger you for the first 3 months, as most of us have already been conditioned to seek dopamine. Sit with it, you will notice a positive development in about 6-7 months.
                </p>
                <div className="flex gap-4 items-start justify-center md:justify-start">
                  <CheckSquare className="w-6 h-6 mt-0.5 shrink-0 text-primary opacity-80" />
                  <p className="leading-relaxed">De-conditioning of the nervous system to release anxiety naturally</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Closing Text Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-background relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-64 h-64 -z-10 opacity-10 blur-2xl bg-primary/40 rounded-full translate-x-1/2 translate-y-1/2"></div>
        <div className="mx-auto max-w-4xl text-center space-y-10 text-primary/80">
          <div className="italic text-xl leading-relaxed space-y-4 font-serif text-foreground">
            <p>{"\""}Here{"'"}s something special: As I have been writing this particular segment, I closed my eyes for a minute and felt the presence of SO MANY divine beings, starseeds from higher dimensions, holding their palms and hearts as a blessing for this service.{"\""}</p>
            <p className="text-sm not-italic uppercase tracking-widest font-bold text-primary/40 pt-4">This space contains specialised, channelled information. Not AI.</p>
          </div>

          <div className="italic text-lg leading-relaxed space-y-2 text-[#885d7b] max-w-2xl mx-auto">
            <p>For souls who are truly here for a transformation, I would suggest membership for 5-7 months to notice an impact, and any duration after that would take you towards growth.</p>
            <p>Although once you sign up, you have the freedom to leave at any point with the notice of a month.</p>
          </div>
          
          <div className="pt-12">
            <SubscribeDialog 
              planId="monthly-membership" 
              buttonText="Join Kundalini School" 
              className="bg-primary hover:bg-primary/90 text-white rounded-full px-12 py-8 text-xl tracking-wider shadow-2xl hover:scale-105 transition-all duration-300"
            />
          </div>
        </div>
      </section>
    </div>
  )
}
