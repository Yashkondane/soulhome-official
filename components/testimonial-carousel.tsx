"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Heart } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface Testimonial {
    quote: string
    name: string
    location: string
}

interface TestimonialCarouselProps {
    testimonials: Testimonial[]
}

export function TestimonialCarousel({ testimonials }: TestimonialCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [direction, setDirection] = useState(0)

    const nextSlide = () => {
        setDirection(1)
        setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }

    const prevSlide = () => {
        setDirection(-1)
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    }

    const goToSlide = (index: number) => {
        setDirection(index > currentIndex ? 1 : -1)
        setCurrentIndex(index)
    }

    // Get 3 testimonials to display (current and next 2)
    const getVisibleTestimonials = () => {
        const visible = []
        for (let i = 0; i < 3; i++) {
            visible.push(testimonials[(currentIndex + i) % testimonials.length])
        }
        return visible
    }

    const visibleTestimonials = getVisibleTestimonials()

    return (
        <div className="relative">
            {/* Navigation Arrows */}
            <Button
                variant="outline"
                size="icon"
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 rounded-full bg-primary text-white hover:bg-primary/90 border-none shadow-lg hidden md:flex"
                onClick={prevSlide}
            >
                <ChevronLeft className="h-6 w-6" />
            </Button>

            <Button
                variant="outline"
                size="icon"
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 rounded-full bg-primary text-white hover:bg-primary/90 border-none shadow-lg hidden md:flex"
                onClick={nextSlide}
            >
                <ChevronRight className="h-6 w-6" />
            </Button>

            {/* Testimonial Cards */}
            <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto overflow-hidden">
                <AnimatePresence initial={false} mode="popLayout">
                    {visibleTestimonials.map((testimonial, index) => (
                        <motion.div
                            key={testimonial.name}
                            initial={{ opacity: 0, x: direction * 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -direction * 50 }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                            layout
                        >
                            <Card className="border-none shadow-lg overflow-hidden bg-white h-full">
                                <CardContent className="p-0 h-full flex flex-col">
                                    {/* Avatar */}
                                    <div className="flex justify-center -mb-12 pt-8 relative z-10">
                                        <div className="h-24 w-24 rounded-full bg-gray-300 border-4 border-white flex items-center justify-center shadow-sm">
                                            <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center">
                                                <Heart className="h-8 w-8 text-gray-500" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="bg-primary text-white pt-16 pb-8 px-6 relative flex-grow flex flex-col">
                                        {/* Opening Quote */}
                                        <div className="text-6xl font-serif leading-none mb-4 opacity-50">"</div>

                                        <p className="text-sm leading-relaxed mb-6 min-h-[120px] flex-grow">
                                            {testimonial.quote}
                                        </p>

                                        {/* Closing Quote */}
                                        <div className="text-6xl font-serif leading-none text-right opacity-50 -mt-4">"</div>

                                        {/* Name */}
                                        <div className="text-center mt-4">
                                            <p className="font-semibold uppercase tracking-wide text-sm">
                                                {testimonial.name}
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center gap-2 mt-8">
                {testimonials.slice(0, 3).map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`h-2 w-2 rounded-full transition-all duration-300 ${index === currentIndex % 3 ? 'bg-primary w-6' : 'bg-gray-300 w-2'
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    )
}
