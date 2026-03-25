"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Cookie, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent")
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 2000)
      return () => clearTimeout(timer)
    }
  }, [])

  const acceptCookies = () => {
    localStorage.setItem("cookie-consent", "true")
    setIsVisible(false)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-6 left-6 right-6 md:left-auto md:right-8 md:w-[400px] z-[60]"
        >
          <div className="bg-background/95 backdrop-blur-md border border-primary/20 rounded-2xl p-6 shadow-2xl shadow-primary/10">
            <div className="flex gap-4 items-start">
              <div className="bg-primary/10 p-2 rounded-xl shrink-0">
                <Cookie className="w-6 h-6 text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="font-serif text-lg font-semibold text-foreground">Cookie Policy</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We use cookies to enhance your journey and analyze our traffic. By clicking &quot;Accept&quot;, you consent to our use of cookies.
                </p>
              </div>
              <button 
                onClick={() => setIsVisible(false)}
                className="text-muted-foreground hover:text-primary transition-colors shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex gap-3 mt-6">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1 rounded-full border-primary/20 hover:bg-primary/5"
                asChild
              >
                <a href="/privacy">Learn More</a>
              </Button>
              <Button 
                size="sm" 
                className="flex-1 rounded-full bg-primary text-white hover:bg-primary/90"
                onClick={acceptCookies}
              >
                Accept
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
