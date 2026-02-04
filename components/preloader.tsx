"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function Preloader() {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 2500) // Slightly longer to appreciate the animation

        return () => clearTimeout(timer)
    }, [])

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-background"
                >
                    <div className="relative flex items-center justify-center">
                        {/* Outer Ring */}
                        <motion.div
                            animate={{ rotate: 360, scale: [1, 1.05, 1] }}
                            transition={{
                                rotate: { duration: 15, repeat: Infinity, ease: "linear" },
                                scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                            }}
                            className="absolute w-64 h-64 border-[1px] border-primary/10 rounded-full"
                        />

                        {/* Middle Ring */}
                        <motion.div
                            animate={{ rotate: -360, scale: [1, 0.95, 1] }}
                            transition={{
                                rotate: { duration: 12, repeat: Infinity, ease: "linear" },
                                scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                            }}
                            className="absolute w-48 h-48 border-[1px] border-primary/20 rounded-full dashed-border"
                            style={{ borderStyle: 'dashed' }}
                        />

                        {/* Inner Ring */}
                        <motion.div
                            animate={{ rotate: 360, opacity: [0.3, 0.6, 0.3] }}
                            transition={{
                                rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                                opacity: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                            }}
                            className="absolute w-32 h-32 border-[1.5px] border-primary/30 rounded-full"
                        />

                        {/* Center Content */}
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="relative z-10 text-center"
                        >
                            <motion.div
                                animate={{ y: [0, -5, 0] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <h1 className="font-serif text-5xl font-bold uppercase tracking-[0.2em] text-primary" style={{ fontFamily: 'var(--font-libre)' }}>
                                    Soulhome
                                </h1>
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: "100%" }}
                                    transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                                    className="h-[1px] bg-primary/40 mx-auto mt-2"
                                />
                            </motion.div>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
