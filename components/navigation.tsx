"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/membership", label: "Membership" },
  { href: "/contact", label: "Contact" },
]

interface NavigationProps {
  isLoggedIn?: boolean
  isAdmin?: boolean
}

export function Navigation({ isLoggedIn = false, isAdmin = false }: NavigationProps) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const isHome = pathname === "/"
  const isTransparent = isHome && !scrolled
  const isDarkText = !isHome && !scrolled

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300",
      scrolled
        ? "bg-primary/95 backdrop-blur-md shadow-lg py-0 border-b-0"
        : "bg-transparent border-b border-white/20 py-2"
    )}>
      <nav className={cn(
        "mx-auto flex max-w-[1400px] items-center justify-between px-6 sm:px-8 lg:px-12 transition-all duration-300",
        scrolled ? "h-20" : "h-28"
      )}>
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/soulhome_logo.png"
            alt="Soulhome Logo"
            width={80}
            height={80}
            className={cn(
              "object-contain transition-all",
              isDarkText ? "brightness-0" : "brightness-0 invert"
            )}
          />
          <span className={cn(
            "font-serif text-lg uppercase tracking-[0.2em] drop-shadow-lg transition-colors",
            isDarkText ? "text-primary" : "text-white"
          )}>Soulhome</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-opacity-80",
                isDarkText ? "text-primary hover:text-primary/80" : "text-white hover:text-white/80",
                pathname === link.href && "underline underline-offset-4"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-4 md:flex">
          {isLoggedIn ? (
            <>
              {isAdmin && (
                <Button variant="ghost" asChild className={cn(
                  "hover:bg-white/10",
                  isDarkText ? "text-primary hover:text-primary/80 hover:bg-primary/10" : "text-white hover:text-white/80"
                )}>
                  <Link href="/admin">Admin</Link>
                </Button>
              )}
              <Button variant="ghost" asChild className={cn(
                "hover:bg-white/10",
                isDarkText ? "text-primary hover:text-primary/80 hover:bg-primary/10" : "text-white hover:text-white/80"
              )}>
                <Link href="/dashboard">Dashboard</Link>
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" asChild className={cn(
                "hover:bg-white/10",
                isDarkText ? "text-primary hover:text-primary/80 hover:bg-primary/10" : "text-white hover:text-white/80"
              )}>
                <Link href="/auth/login">Sign In</Link>
              </Button>
              <Button asChild className={cn(
                isDarkText ? "bg-primary text-white hover:bg-primary/90" : "bg-white text-primary hover:bg-white/90"
              )}>
                <Link href="/membership">Join Now</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Navigation */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <div className="flex flex-col gap-6 pt-6">
              <div className="flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
                  <Image
                    src="/soulhome_logo.png"
                    alt="Soulhome Logo"
                    width={80}
                    height={80}
                    className="object-contain"
                  />
                  <span className="font-serif text-lg uppercase tracking-[0.2em] text-primary">Soulhome</span>
                </Link>
              </div>
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "text-lg font-medium transition-colors hover:text-primary",
                      pathname === link.href
                        ? "text-primary"
                        : "text-muted-foreground"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              <div className="flex flex-col gap-3 pt-4 border-t">
                {isLoggedIn ? (
                  <>
                    {isAdmin && (
                      <Button variant="outline" asChild className="w-full bg-transparent">
                        <Link href="/admin" onClick={() => setOpen(false)}>Admin</Link>
                      </Button>
                    )}
                    <Button asChild className="w-full">
                      <Link href="/dashboard" onClick={() => setOpen(false)}>Dashboard</Link>
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="outline" asChild className="w-full bg-transparent">
                      <Link href="/auth/login" onClick={() => setOpen(false)}>Sign In</Link>
                    </Button>
                    <Button asChild className="w-full">
                      <Link href="/membership" onClick={() => setOpen(false)}>Join Now</Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  )
}
