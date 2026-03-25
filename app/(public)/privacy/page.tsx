"use client"

import { DecorativeArch } from "@/components/decorative-arch"

export default function PrivacyPage() {
  return (
    <main className="min-h-screen pt-32 pb-24 bg-background selection:bg-primary/20">
      <div className="mx-auto max-w-4xl px-6 sm:px-8">
        {/* Decorative Arch Background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] -z-10 pointer-events-none opacity-10">
          <DecorativeArch className="w-full h-full text-primary" />
        </div>

        <header className="mb-16 text-center">
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-foreground tracking-tight mb-4 uppercase">
            Privacy Policy
          </h1>
          <p className="text-muted-foreground italic">
            Applies to both 1:1 Sessions & Kundalini School
          </p>
        </header>

        <div className="prose prose-lg dark:prose-invert prose-headings:font-serif prose-headings:text-primary prose-p:text-muted-foreground leading-relaxed max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 border-b border-primary/10 pb-2">1. Information I Collect</h2>
            <p className="mb-4">
              When you book a session or join Kundalini School, I may collect:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Name</li>
              <li>Email address</li>
              <li>Payment details (processed securely via third-party providers)</li>
              <li>Any information you voluntarily share during sessions or communication</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 border-b border-primary/10 pb-2">2. How Your Information Is Used</h2>
            <p className="mb-4">
              Your information is used only to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Deliver your session or access to Kundalini School</li>
              <li>Communicate with you about bookings, updates, or support</li>
              <li>Improve the quality of services</li>
            </ul>
            <p className="mt-6 font-medium text-foreground">
              I do not sell, rent, or share your personal data with third parties.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 border-b border-primary/10 pb-2">3. Confidentiality</h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>All personal sharing during 1:1 sessions is treated as strictly confidential</li>
              <li>Kundalini School group spaces are held with respect and privacy, but group confidentiality cannot be absolutely guaranteed</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 border-b border-primary/10 pb-2">4. Payment Security</h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>All payments are processed through secure third-party platforms</li>
              <li>I do not store or have access to your full payment details</li>
              <li>By making a payment, you agree to the terms set by the payment provider</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 border-b border-primary/10 pb-2">5. Data Storage</h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Your data is stored securely and only for as long as necessary to provide services</li>
              <li>You may request deletion of your data at any time</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 border-b border-primary/10 pb-2">6. Your Rights</h2>
            <p className="mb-4">You have the right to:</p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Request access to your data</li>
              <li>Request corrections</li>
              <li>Request deletion</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 border-b border-primary/10 pb-2">7. Contact</h2>
            <p>
              For any privacy-related concerns, you can contact me directly.
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}
