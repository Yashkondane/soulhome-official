import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Play, Calendar, Video, Clock, Sparkles } from "lucide-react"
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
            <p className="text-xl text-muted-foreground font-serif italic max-w-2xl mx-auto">
              A sacred space for deep transformation, guided by the energetic current of Earth.
            </p>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-30 pointer-events-none">
          <div className="absolute top-20 right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse delay-700"></div>
        </div>
      </section>

      {/* Video Content Section */}
      <section className="py-12 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl border-4 border-white/50 bg-black group">
              {/* YouTube Placeholder - Will be updated with user's video */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4 text-white">
                  <div className="w-20 h-20 rounded-full bg-primary/80 flex items-center justify-center group-hover:scale-110 transition-transform cursor-pointer">
                    <Play className="h-10 w-10 fill-white" />
                  </div>
                  <span className="font-serif italic tracking-wide">Watch the introduction</span>
                </div>
              </div>
              <Image 
                src="/live session.jpg" 
                alt="1:1 Live Session Introduction" 
                fill 
                className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" 
              />
              {/* Overlays */}
              <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
                 <p className="text-white font-serif italic text-lg">Understanding the journey of 1:1 transformation</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Details Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            <div className="space-y-8">
              <h2 className="font-serif text-3xl font-bold text-primary">About the Sessions</h2>
              <p className="text-lg text-[#885d7b] leading-relaxed">
                Live video call sessions are a unique opportunity to work with me directly. These sessions only open seasonally, as they are carefully timed with the energetic current of our planet.
              </p>
              <p className="text-lg text-[#885d7b] leading-relaxed">
                Each session is curated with love for true healing and transformation. We dive deep into your energetic blueprint to alchemise karma into spiritual wisdom.
              </p>

              <div className="grid sm:grid-cols-2 gap-6 pt-4">
                 <div className="flex gap-4 items-start">
                    <div className="p-3 bg-primary/10 rounded-xl">
                       <Clock className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                       <h4 className="font-bold text-primary">Seasonal Openings</h4>
                       <p className="text-sm text-muted-foreground">Aligned with earth's current</p>
                    </div>
                 </div>
                 <div className="flex gap-4 items-start">
                    <div className="p-3 bg-primary/10 rounded-xl">
                       <Video className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                       <h4 className="font-bold text-primary">Private Video Calls</h4>
                       <p className="text-sm text-muted-foreground">Safe and sacred virtual space</p>
                    </div>
                 </div>
                 <div className="flex gap-4 items-start">
                    <div className="p-3 bg-primary/10 rounded-xl">
                       <Sparkles className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                       <h4 className="font-bold text-primary">Personalised Healing</h4>
                       <p className="text-sm text-muted-foreground">Based on your energetic needs</p>
                    </div>
                 </div>
                 <div className="flex gap-4 items-start">
                    <div className="p-3 bg-primary/10 rounded-xl">
                       <Calendar className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                       <h4 className="font-bold text-primary">Limited Slots</h4>
                       <p className="text-sm text-muted-foreground">Curated one-on-one attention</p>
                    </div>
                 </div>
              </div>
            </div>

            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
               <Image 
                 src="/live session.jpg" 
                 alt="SACRED SPACE" 
                 fill 
                 className="object-cover" 
               />
               <div className="absolute inset-x-0 bottom-0 p-8 pt-20 bg-gradient-to-t from-primary/80 to-transparent">
                  <p className="text-white text-xl font-serif italic text-center">Transforming dense karma into spiritual light.</p>
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
           <div className="pt-8">
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
