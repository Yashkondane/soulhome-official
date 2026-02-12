"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function Preloader() {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 3000) // Give enough time for the full animation sequence

        return () => clearTimeout(timer)
    }, [])

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-background overflow-hidden"
                >
                    {/* Background Ambience */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/5 via-background to-background" />

                    <div className="relative flex flex-col items-center justify-center z-10">
                        {/* Orbiting Rings */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            {/* Fine border ring */}
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                className="w-80 h-80 border-[0.5px] border-primary/20 rounded-full opacity-50"
                            />
                            {/* Dashed ring */}
                            <motion.div
                                animate={{ rotate: -360 }}
                                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                                className="absolute w-64 h-64 border border-dashed border-primary/30 rounded-full opacity-40"
                            />
                            {/* Glowing effect ring */}
                            <motion.div
                                animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.1, 0.3] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute w-56 h-56 bg-primary/5 rounded-full blur-2xl"
                            />
                        </div>

                        {/* Logo Container */}
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0, y: 10 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            transition={{ duration: 1.2, ease: "easeOut" }}
                            className="relative mb-6"
                        >
                            <motion.div
                                animate={{ y: [-5, 5, -5] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="relative w-24 h-24 md:w-32 md:h-32 filter drop-shadow-[0_0_15px_rgba(168,85,247,0.2)]"
                            >
                                <img
                                    src="/logo.png"
                                    alt="SoulHome Logo"
                                    className="w-full h-full object-contain"
                                />
                            </motion.div>
                        </motion.div>

                        {/* Text Reveal */}
                        <div className="overflow-hidden">
                            <motion.h1
                                initial={{ y: "100%" }}
                                animate={{ y: 0 }}
                                transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                className="font-serif text-3xl md:text-5xl font-bold tracking-[0.2em] text-primary"
                            >
                                SOULHOME
                            </motion.h1>
                        </div>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.2, duration: 1 }}
                            className="mt-2 text-sm text-muted-foreground tracking-widest uppercase text-[10px]"
                        >
                            Sanctuary for the Soul
                        </motion.p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
