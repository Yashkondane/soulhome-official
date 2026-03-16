import Image from "next/image"
import { CheckSquare } from "lucide-react"
import { SubscribeDialog } from "./subscribe-dialog"

export default function MembershipPage() {
  return (
    <div className="flex flex-col bg-white min-h-screen">
      {/* Hero Section */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-16 text-center text-balance">
            KUNDALINI SCHOOL
          </h1>

          <div className="grid gap-16 lg:grid-cols-2 lg:items-start">
            {/* Left Column - Intro */}
            <div className="flex flex-col items-center lg:items-center text-center">
              <div className="relative w-full aspect-[2/1] max-w-lg mb-8">
                <Image
                  src="/download (24).png"
                  alt="Flute with Peacock Feather"
                  fill
                  className="object-contain"
                />
              </div>
              <p className="text-[#885d7b] font-medium leading-relaxed max-w-sm">
                Kundalini School is a <span className="font-bold">self-healing portal</span>.
                A space away from the distractions of the world, to connect with yourself and find inner peace.
                Here, you learn to alchemise dense karma into spiritual wisdom.
              </p>
            </div>

            {/* Right Column - Pricing Box */}
            <div className="rounded-xl border-2 border-[#6d5b88] p-8 md:p-10 bg-transparent">
              <h2 className="text-center text-[#6d5b88] font-medium text-lg mb-6">
                Energy Exchange: £77 per month
              </h2>
              
              <ul className="space-y-4 text-[#885d7b] text-sm md:text-base leading-relaxed mb-8 list-disc list-outside ml-6">
                <li className="pl-1">Cancel anytime with a month{"'"}s notice</li>
                <li className="pl-1">Payment covers energy exchange for one person, do not reshare as it leads to energy displacement</li>
                <li className="pl-1">Feedback form to reflect and ask questions for future healing suggestions</li>
                <li className="pl-1">This does not include live sessions</li>
              </ul>

              <div className="space-y-2 text-[#885d7b] text-sm md:text-base leading-relaxed mb-8">
                <p>(Checkbox) I have read and agree to the terms & conditions by making this payment.</p>
                <p>(Checkbox) No refund given once payment has been made for the month.</p>
                <p>(Checkbox) Monthly payments will be taken unless cancelled, with a month{"'"}s notice.</p>
              </div>

              <div className="flex justify-center mt-8">
                <SubscribeDialog 
                  planId="monthly-membership" 
                  buttonText="Become a Member" 
                  className="bg-[#6d5b88] hover:bg-[#5a4a70] text-white rounded-full px-8"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-serif text-3xl font-bold text-center text-[#55476a] mb-16 tracking-wide">
            WHAT DOES KUNDALINI SCHOOL GIVE YOU?
          </h2>

          <div className="space-y-16">
            {/* Feature 1 */}
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="w-32 h-32 md:w-40 md:h-40 shrink-0 relative">
                <Image
                  src="/download (23).png"
                  alt="Lavender"
                  fill
                  className="object-contain object-top"
                />
              </div>
              <div className="text-[#885d7b] pt-4">
                <p className="mb-4 leading-relaxed">
                  <span className="font-bold">Self-healing resources</span> to enhance your life and spiritual journey. This is not a space to binge, it is a space to slow down and settle into your self.
                </p>
                <div className="flex gap-3 items-start">
                  <CheckSquare className="w-5 h-5 mt-0.5 shrink-0 text-[#4a4a4a]" />
                  <p className="leading-relaxed">Every month, you can download 3 healings to practice in your own time.</p>
                </div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="w-32 h-32 md:w-40 md:h-40 shrink-0 relative">
                <Image
                  src="/download (22).png"
                  alt="Lavender"
                  fill
                  className="object-contain object-top"
                />
              </div>
              <div className="text-[#885d7b] pt-4">
                <p className="mb-4 leading-relaxed text-[#a8446b]">
                  <span className="font-bold">Divine Feminine & Masculine energies</span> are supported through specific modules which help you evolve on your inner work journey, with love and tenderness. The feminine blooms in the safety of the divine masculine{"'"}s presence. Let yourself bloom in self-love.
                </p>
                <div className="flex gap-3 items-start text-[#a8446b]">
                  <CheckSquare className="w-5 h-5 mt-0.5 shrink-0 text-[#4a4a4a]" />
                  <p className="leading-relaxed">All exercises promote a balance of inner union, and twin flame union</p>
                </div>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="w-32 h-32 md:w-40 md:h-40 shrink-0 relative">
                <Image
                  src="/download (21).png"
                  alt="Lavender"
                  fill
                  className="object-contain object-top"
                />
              </div>
              <div className="text-[#6d5b88] pt-4">
                <p className="mb-4 leading-relaxed">
                  <span className="font-bold">Twin Flames:</span> Every single healing or transmission will help you unlock union. There are specific modules just for twin flames as well. Although I would not suggest solely focusing on this. Instead, explore the wide range of healings available.
                </p>
                <div className="flex gap-3 items-start">
                  <CheckSquare className="w-5 h-5 mt-0.5 shrink-0 text-[#4a4a4a]" />
                  <p className="leading-relaxed">Learn to embody twin flame union through regular practice, not seek it outside</p>
                </div>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="w-32 h-32 md:w-40 md:h-40 shrink-0 relative">
                <Image
                  src="/download (20).png"
                  alt="Lavender branch"
                  fill
                  className="object-contain object-top"
                />
              </div>
              <div className="text-[#885d7b] pt-4">
                <p className="mb-4 leading-relaxed text-[#a8446b]">
                  <span className="font-bold text-[#885d7b]">Learn integration;</span> the biggest challenge in spirituality is to truly receive and integrate healing within your body and nervous system. If food is healing, then integration is like absorbing nutrients from the food.
                </p>
                <div className="flex gap-3 items-start text-[#a8446b]">
                  <CheckSquare className="w-5 h-5 mt-0.5 shrink-0 text-[#4a4a4a]" />
                  <p className="leading-relaxed text-[#885d7b]">Exercises included to practice true integration at your own pace.</p>
                </div>
              </div>
            </div>

            {/* Feature 5 */}
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="w-32 h-32 md:w-40 md:h-40 shrink-0 relative">
                <Image
                  src="/download (19).png"
                  alt="Lavender branch"
                  fill
                  className="object-contain object-top"
                />
              </div>
              <div className="text-[#885d7b] pt-4">
                <p className="mb-4 leading-relaxed">
                  <span className="font-bold text-[#6d5b88]">Choosing serotonin over dopamine-spikes.</span> This space will demand your body to sink into its relaxed state. It is not fast or intimidating like social media. It is a safe, healing space. This will trigger you for the first 3 months, as most of us have already been conditioned to seek dopamine. Sit with it, you will notice a positive development in about 6-7 months.
                </p>
                <div className="flex gap-3 items-start">
                  <CheckSquare className="w-5 h-5 mt-0.5 shrink-0 text-[#4a4a4a]" />
                  <p className="leading-relaxed">De-conditioning of the nervous system to release anxiety naturally</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Closing Text Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center space-y-8 text-[#6d5b88]">
          <div className="italic text-[1.05rem] leading-relaxed space-y-2">
            <p>Here{"'"}s something special: As I have been writing this particular segment, I closed my eyes for a</p>
            <p>minute and felt the presence of SO MANY divine beings, starseeds from higher dimensions, holding</p>
            <p>their palms and hearts as a blessing for this service.</p>
            <p>This space contains specialised, channelled information. Not AI.</p>
          </div>

          <div className="italic text-[1.05rem] leading-relaxed space-y-2 text-[#885d7b]">
            <p>For souls who are truly here for a transformation, I would suggest membership for 5-7 months to</p>
            <p>notice an impact, and any duration after that would take you towards growth. Although once you</p>
            <p>sign up, you have the freedom to leave at any point with the notice of a month.</p>
          </div>
          
          <div className="pt-8">
            <SubscribeDialog 
              planId="monthly-membership" 
              buttonText="Join Kundalini School" 
              className="bg-[#6d5b88] hover:bg-[#5a4a70] text-white rounded-full px-10 py-6 text-lg tracking-wide"
            />
          </div>
        </div>
      </section>
    </div>
  )
}
