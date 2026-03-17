"use client"

import { useState, useCallback, useEffect } from "react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { CheckSquare, ChevronLeft, ChevronRight, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface TestimonialImage {
  src: string
  alt: string
  category: "General" | "Healing"
}

const testimonialImages: TestimonialImage[] = [
  // General Testimonials
  { src: "/testimonials/IMG_4003.jpg", alt: "Soulhome Testimonial", category: "General" },
  { src: "/testimonials/IMG_4005.jpg", alt: "Soulhome Testimonial", category: "General" },
  { src: "/testimonials/IMG_4006.jpg", alt: "Soulhome Testimonial", category: "General" },
  { src: "/testimonials/IMG_4008.jpg", alt: "Soulhome Testimonial", category: "General" },
  { src: "/testimonials/IMG_4016.jpg", alt: "Soulhome Testimonial", category: "General" },
  { src: "/testimonials/IMG_4017.jpg", alt: "Soulhome Testimonial", category: "General" },
  { src: "/testimonials/IMG_4018.jpg", alt: "Soulhome Testimonial", category: "General" },
  { src: "/testimonials/IMG_5343.PNG", alt: "Soulhome Testimonial", category: "General" },
  { src: "/testimonials/Screenshot_20240808_092642_WhatsAppBusiness.jpg", alt: "WhatsApp Testimonial", category: "General" },
  { src: "/testimonials/Screenshot_20240815_151157_Instagram.jpg", alt: "Instagram Testimonial", category: "General" },
  { src: "/testimonials/Screenshot_20240820_094854_WhatsAppBusiness.jpg", alt: "WhatsApp Testimonial", category: "General" },
  { src: "/testimonials/Screenshot_20240903_175658_WhatsAppBusiness.jpg", alt: "WhatsApp Testimonial", category: "General" },
  { src: "/testimonials/Screenshot_20250703_142522_WhatsAppBusiness.jpg", alt: "WhatsApp Testimonial", category: "General" },
  { src: "/testimonials/Screenshot_20250711_082816_Instagram.jpg", alt: "Instagram Testimonial", category: "General" },
  { src: "/testimonials/Screenshot_20250718_220302_WhatsAppBusiness.jpg", alt: "WhatsApp Testimonial", category: "General" },
  { src: "/testimonials/Screenshot_20260120_192311_WhatsAppBusiness.jpg", alt: "WhatsApp Testimonial", category: "General" },
  { src: "/testimonials/Screenshot_20260120_192349_WhatsAppBusiness.jpg", alt: "WhatsApp Testimonial", category: "General" },
  { src: "/testimonials/Screenshot_20260120_204145_WhatsAppBusiness.jpg", alt: "WhatsApp Testimonial", category: "General" },
  { src: "/testimonials/Screenshot_20260120_205850_WhatsAppBusiness.jpg", alt: "WhatsApp Testimonial", category: "General" },

  // Healing Reviews
  { src: "/testimonials/healing reviews/Healing reviews/IMG_5342.PNG", alt: "Healing Review", category: "Healing" },
  { src: "/testimonials/healing reviews/Healing reviews/IMG_5345.PNG", alt: "Healing Review", category: "Healing" },
  { src: "/testimonials/healing reviews/Healing reviews/IMG_5347.PNG", alt: "Healing Review", category: "Healing" },
  { src: "/testimonials/healing reviews/Healing reviews/IMG_5348.PNG", alt: "Healing Review", category: "Healing" },
  { src: "/testimonials/healing reviews/Healing reviews/IMG_5349.PNG", alt: "Healing Review", category: "Healing" },
  { src: "/testimonials/healing reviews/Healing reviews/IMG_5350.PNG", alt: "Healing Review", category: "Healing" },
  { src: "/testimonials/healing reviews/Healing reviews/IMG_5351.PNG", alt: "Healing Review", category: "Healing" },
  { src: "/testimonials/healing reviews/Healing reviews/IMG_5352.PNG", alt: "Healing Review", category: "Healing" },
  { src: "/testimonials/healing reviews/Healing reviews/IMG_5353.PNG", alt: "Healing Review", category: "Healing" },
  { src: "/testimonials/healing reviews/Healing reviews/Screenshot_20241016_134214_Instagram.jpg", alt: "Healing Review", category: "Healing" },
]

export function TestimonialMasonry() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const handlePrevious = useCallback(() => {
    setSelectedIndex((current) => 
      current === null ? null : (current === 0 ? testimonialImages.length - 1 : current - 1)
    )
  }, [])

  const handleNext = useCallback(() => {
    setSelectedIndex((current) => 
      current === null ? null : (current === testimonialImages.length - 1 ? 0 : current + 1)
    )
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return
      if (e.key === "ArrowLeft") handlePrevious()
      if (e.key === "ArrowRight") handleNext()
      if (e.key === "Escape") setSelectedIndex(null)
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [selectedIndex, handlePrevious, handleNext])

  const selectedImage = selectedIndex !== null ? testimonialImages[selectedIndex] : null

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
        {testimonialImages.map((testimonial, index) => (
          <div
            key={index}
            onClick={() => setSelectedIndex(index)}
            className="break-inside-avoid relative group rounded-2xl overflow-hidden bg-[#6d5b88] p-1 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-white/5 cursor-zoom-in"
          >
            {/* Healing Badge */}
            {testimonial.category === "Healing" && (
              <div className="absolute top-3 left-3 z-10">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-[#a585c6] text-white shadow-lg backdrop-blur-md border border-white/20">
                  Healing
                </span>
              </div>
            )}

            {/* Image Container */}
            <div className="relative w-full rounded-xl overflow-hidden">
              <img
                src={testimonial.src}
                alt={testimonial.alt}
                className="w-full h-auto object-contain block hover:scale-[1.02] transition-transform duration-500"
                loading="lazy"
              />
            </div>

            {/* Subtle Overlay on hover */}
            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          </div>
        ))}
      </div>

      {/* Lightbox Dialog */}
      <Dialog open={selectedIndex !== null} onOpenChange={(open) => !open && setSelectedIndex(null)}>
        <DialogContent 
          className="max-w-[95vw] md:max-w-5xl h-[90vh] p-0 border-none bg-black/40 backdrop-blur-xl shadow-none overflow-hidden flex items-center justify-center pointer-events-none"
          showCloseButton={false}
        >
          <DialogTitle className="sr-only">Testimonial Image Viewer</DialogTitle>
          
          {selectedImage && (
            <div className="relative w-full h-full flex items-center justify-center p-4 md:p-12 pointer-events-auto">
              
              {/* Close Button */}
              <button 
                onClick={() => setSelectedIndex(null)}
                className="absolute top-4 right-4 z-[60] p-2 bg-[#6d5b88]/90 hover:bg-[#5a4a70] text-white rounded-full shadow-lg transition-all border border-white/20 group active:scale-95"
              >
                <X className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
              </button>

              {/* Navigation Arrows */}
              <button 
                onClick={(e) => { e.stopPropagation(); handlePrevious(); }}
                className="absolute left-4 z-50 p-4 bg-[#6d5b88]/80 hover:bg-[#6d5b88] text-white rounded-full shadow-xl transition-all border border-white/10 disabled:opacity-30 active:scale-95 group backdrop-blur-md"
              >
                <ChevronLeft className="w-8 h-8 group-hover:-translate-x-1 transition-transform" />
              </button>

              <button 
                onClick={(e) => { e.stopPropagation(); handleNext(); }}
                className="absolute right-4 z-50 p-4 bg-[#6d5b88]/80 hover:bg-[#6d5b88] text-white rounded-full shadow-xl transition-all border border-white/10 disabled:opacity-30 active:scale-95 group backdrop-blur-md"
              >
                <ChevronRight className="w-8 h-8 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* The Image */}
              <div className="relative max-w-full max-h-full flex items-center justify-center animate-in fade-in zoom-in duration-300">
                <img
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  className="max-w-[90vw] md:max-w-[80vw] max-h-[80vh] md:max-h-[85vh] object-contain rounded-lg shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10"
                />
                
                {/* Info Badge in Lightbox */}
                {selectedImage.category === "Healing" && (
                  <div className="absolute -top-4 left-0">
                    <span className="inline-flex items-center px-4 py-1.5 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase bg-[#a585c6] text-white shadow-2xl border border-white/30">
                      Healing Transformation
                    </span>
                  </div>
                )}
              </div>

              {/* Progress Indicator */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-black/20 backdrop-blur-md rounded-full text-white/60 text-xs font-mono border border-white/5 tracking-widest">
                {(selectedIndex || 0) + 1} / {testimonialImages.length}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
