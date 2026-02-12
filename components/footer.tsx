import Link from "next/link"
import Image from "next/image"

const footerLinks = {
  explore: [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/membership", label: "Membership" },
    { href: "/contact", label: "Contact" },
  ],
  legal: [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="Soulhome Logo"
                width={60}
                height={60}
                className="object-contain"
              />
              <span className="font-serif text-lg uppercase tracking-[0.2em] font-semibold text-primary">Soulhome</span>
            </Link>
            <p className="mt-4 max-w-md text-sm text-muted-foreground leading-relaxed">
              A sacred space for spiritual seekers to deepen their practice and awaken to their highest potential through ancient wisdom.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h3 className="font-semibold text-foreground">Explore</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.explore.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-foreground">Legal</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            {new Date().getFullYear()} Soulhome. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
