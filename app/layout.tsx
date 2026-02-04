import React from "react"
import type { Metadata } from 'next'
import { Libre_Baskerville } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  variable: '--font-libre',
  weight: ['400', '700'],
  style: ['normal', 'italic']
});

export const metadata: Metadata = {
  title: 'Soulhome | Transform Your Life Through Ancient Wisdom',
  description: 'Join our sacred community and access exclusive teachings, meditations, and spiritual resources. Monthly membership with unlimited downloads.',
  keywords: ['kundalini yoga', 'spiritual awakening', 'meditation', 'energy healing', 'chakras', 'consciousness'],
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

import { Preloader } from "@/components/preloader"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${libreBaskerville.variable} font-serif antialiased bg-background text-foreground`}>
        <Preloader />
        <Analytics />
        {children}
      </body>
    </html>
  )
}
