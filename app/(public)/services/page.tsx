import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ExternalLink, BookOpen, GraduationCap } from "lucide-react"

export default function ServicesPage() {
    return (
        <div className="flex flex-col min-h-screen">

            {/* Hero / Header - Matching About Page style */}
            <section className="bg-primary/15 py-20 sm:py-28">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-6 text-balance">
                        Our Services
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed text-balance">
                        Transformative offerings to guide your spiritual journey, grounded in authenticity and love.
                    </p>
                </div>
            </section>

            <section className="py-20 sm:py-28">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-24 max-w-6xl">

                    {/* Service 1: 1:1 Live Session — Laya */}
                    <div className="grid gap-12 md:grid-cols-2 items-center">

                        {/* Image Side (Left) */}
                        <div className="order-1 relative aspect-[4/5] w-full overflow-hidden rounded-2xl md:aspect-square lg:aspect-[4/3]">
                            <Image
                                src="/download (2).png"
                                alt="Laya Session"
                                fill
                                className="object-contain hover:scale-105 transition-transform duration-700"
                            />
                        </div>

                        {/* Text Side (Right) */}
                        <div className="order-2 space-y-6">

                            <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl text-balance">
                                1:1 Live Session — Laya
                            </h2>

                            <div className="space-y-4 text-muted-foreground leading-relaxed">
                                <p>
                                    Limited-time offering for starseeds and grid workers, souls ready to integrate their Kundalini Shakti safely.
                                </p>
                                <p>
                                    Laya (लय) is the state that dissolves inner blockages, allowing the masculine and feminine within to meet in softness.
                                </p>
                                <p>
                                    Book this session if you’re here to download New Earth into your bones and make real changes in your life, not for spiritual bypassing.
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 pt-6">
                                <Button size="lg" className="rounded-full px-8" asChild>
                                    <a href="https://calendly.com/soulhome-krisha/laya?month=2026-02" target="_blank" rel="noopener noreferrer">
                                        Book Your Laya Session
                                    </a>
                                </Button>
                                <Button variant="outline" size="lg" className="rounded-full bg-transparent border-primary/20 text-foreground hover:bg-primary/5" asChild>
                                    <a
                                        href="https://www.canva.com/design/DAG_CgV7V7Y/MvT2w8vimUMGpzgAEFj0Iw/view?utm_content=DAG_CgV7V7Y&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h36b69ae688#8"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2"
                                    >
                                        <ExternalLink className="h-4 w-4" />
                                        Info Booklet
                                    </a>
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Service 2: Kundalini School */}
                    <div className="grid gap-12 md:grid-cols-2 items-center">

                        {/* Text Side (Left for alternating layout) */}
                        <div className="order-2 md:order-1 space-y-6">

                            <div className="space-y-2">
                                <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl text-balance">
                                    Kundalini School
                                </h2>
                                <p className="text-sm font-medium text-primary uppercase tracking-wider">
                                    Membership & Community
                                </p>
                            </div>

                            <div className="space-y-4 text-muted-foreground leading-relaxed">
                                <p>
                                    A structured learning space for deep spiritual awakening and mastery of Kundalini energy. Designed for those ready to commit to transformation, discipline, and higher consciousness development.
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 pt-6">
                                <Button size="lg" className="rounded-full px-8" asChild>
                                    <Link href="/membership">
                                        Enroll Now
                                    </Link>
                                </Button>
                            </div>
                        </div>

                        {/* Image Side (Right for alternating layout) */}
                        <div className="order-1 md:order-2 relative aspect-[4/5] w-full overflow-hidden rounded-2xl md:aspect-square lg:aspect-[4/3]">
                            <Image
                                src="/download (4).png"
                                alt="Kundalini School"
                                fill
                                className="object-contain hover:scale-105 transition-transform duration-700"
                            />
                        </div>

                    </div>
                </div>
            </section>
        </div>
    )
}
