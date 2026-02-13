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
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/terms", label: "T&C" },
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
        : "bg-transparent py-2"
    )}>
      <nav className={cn(
        "mx-auto flex max-w-[1400px] items-center px-6 sm:px-8 lg:px-12 transition-all duration-300 relative",
        scrolled ? "h-20" : "h-28"
      )}>
        {/* Mobile Navigation Trigger - Absolute Right */}
        <div className="absolute right-6 md:hidden z-50">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className={isDarkText ? "text-primary" : "text-white"}>
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col gap-6 pt-6">
                <div className="flex items-center justify-between">
                  <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
                    <Image
                      src="/logo.png"
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
                        <Link href="/dashboard" onClick={() => setOpen(false)}>My Journey</Link>
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button variant="outline" asChild className="w-full bg-transparent">
                        <Link href="/auth/login" onClick={() => setOpen(false)}>Sign In</Link>
                      </Button>
                      <Button asChild className="w-full">
                        <Link href="/membership" onClick={() => setOpen(false)}>Sign Up</Link>
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Logo - Centered on Mobile using Absolute Positioning, Left on Desktop */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:static md:translate-x-0 md:translate-y-0 md:flex-1 md:flex md:justify-start">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Soulhome Logo"
              width={80}
              height={80}
              className={cn(
                "object-contain transition-all h-16 w-16 md:h-20 md:w-20",
              )}
            />
            <span className={cn(
              "font-serif text-lg uppercase tracking-[0.2em] drop-shadow-lg transition-colors hidden md:block",
              isDarkText ? "text-primary" : "text-white"
            )}>Soulhome</span>
          </Link>
        </div>

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
                <Link href="/dashboard">My Journey</Link>
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
                <Link href="/membership">Sign Up</Link>
              </Button>
            </>
          )}
        </div>


      </nav>
    </header>
  )
}
