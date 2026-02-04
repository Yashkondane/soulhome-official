import Image from "next/image"
import Link from "next/link"

interface AuthSplitLayoutProps {
    children: React.ReactNode
}

export function AuthSplitLayout({ children }: AuthSplitLayoutProps) {
    return (
        <div className="flex min-h-screen w-full">
            {/* Left Column - Form */}
            <div className="flex w-full flex-col justify-center bg-background px-8 py-12 lg:w-1/2 lg:px-12 xl:px-24">
                {/* Mobile Header (Logo) - Visible only on mobile */}
                <div className="mb-10 flex justify-center lg:hidden">
                    <Link href="/" className="flex items-center gap-2">
                        <Image
                            src="/soulhome_logo.png"
                            alt="Soulhome Logo"
                            width={50}
                            height={50}
                            className="object-contain"
                        />
                        <span className="font-serif text-2xl font-semibold uppercase tracking-[0.2em] text-primary">Soulhome</span>
                    </Link>
                </div>

                <div className="mx-auto w-full max-w-sm">
                    {children}
                </div>
            </div>

            {/* Right Column - Image & Branding */}
            <div className="hidden lg:relative lg:flex lg:w-1/2 lg:bg-primary/5">
                <Image
                    src="/auth-background.png"
                    alt="Soulhome Atmosphere"
                    fill
                    className="object-cover"
                    priority
                    quality={90}
                />
                {/* Overlay for better text readability/tint */}
                <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />

                <div className="relative z-10 flex h-full w-full flex-col items-center justify-center p-12 text-center text-white">
                    <div className="mb-8 flex flex-col items-center gap-4">
                        <Image
                            src="/soulhome_logo.png"
                            alt="Soulhome Logo"
                            width={120}
                            height={120}
                            className="object-contain brightness-0 invert drop-shadow-lg"
                        />
                        <h1 className="font-serif text-5xl font-bold uppercase tracking-[0.2em] drop-shadow-lg">Soulhome</h1>
                    </div>
                    <p className="max-w-md text-lg text-white/90 drop-shadow-md">
                        "Return to the source of who you truly are."
                    </p>
                </div>
            </div>
        </div>
    )
}
