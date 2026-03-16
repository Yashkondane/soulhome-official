import Link from "next/link"
import Image from "next/image"

export default function ServicesPage() {
    return (
        <div className="flex flex-col min-h-screen bg-primary/5">

            {/* Hero / Header */}
            <section className="pt-32 pb-20 sm:pt-40 sm:pb-28">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="font-serif text-3xl font-bold text-primary sm:text-4xl text-balance uppercase tracking-widest mb-6">
                        Ways to Connect with Soulhome
                    </h1>
                </div>

                <div className="grid md:grid-cols-2 gap-16 md:gap-8 max-w-5xl mx-auto mt-16">
                    {/* 1:1 Live Sessions */}
                    <div className="flex flex-col items-center text-center space-y-6">
                        <div className="relative aspect-square w-full max-w-[300px] rounded-full overflow-hidden shadow-xl border-4 border-white">
                            <Image
                                src="/live session.jpg"
                                alt="1:1 Live Sessions"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="space-y-4">
                            <h3 className="font-serif text-2xl italic text-primary">1:1 Live Sessions</h3>
                            <div className="w-full h-[1px] bg-primary/20"></div>
                            <p className="text-muted-foreground leading-relaxed text-balance text-sm max-w-sm mx-auto">
                                Live video call sessions that only open seasonally. These sessions are curated with love for true healing and transformation, and are based on the energetic current of Earth.
                            </p>
                            <Link href="https://calendly.com/soulhome-krisha" target="_blank" rel="noopener noreferrer" className="inline-block font-serif text-lg italic text-primary hover:text-primary/80 transition-colors">
                                Know more here
                            </Link>
                        </div>
                    </div>

                    {/* Self-Healing Portal */}
                    <div className="flex flex-col items-center text-center space-y-6">
                        <div className="relative aspect-square w-full max-w-[300px] rounded-full overflow-hidden shadow-xl border-4 border-white">
                            <Image
                                src="/school.jpg"
                                alt="Self-Healing Portal"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="space-y-4">
                            <h3 className="font-serif text-2xl italic text-primary">Kundalini School</h3>
                            <div className="w-full h-[1px] bg-primary/20"></div>
                            <p className="text-muted-foreground leading-relaxed text-balance text-sm max-w-sm mx-auto">
                                A monthly membership to an online portal on this website, that allows you to access self-healing resources to enhance your life and spiritual journey through integration practices. If you resonate with my instagram content, this is a level up, and a deeper connection to your soul.
                            </p>
                            <Link href="/membership" className="inline-block font-serif text-lg italic text-primary hover:text-primary/80 transition-colors">
                                More info
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
