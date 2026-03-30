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
            Applies to 1:1 Sessions & Kundalini School
          </p>
        </header>

        <div className="prose prose-lg dark:prose-invert prose-headings:font-serif prose-headings:text-primary prose-p:text-muted-foreground leading-relaxed max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 border-b border-primary/10 pb-2">1. Who I Am</h2>
            <p className="mb-4">
              Krisha provides spiritual guidance, energy healing, and digital self-development services.
              For the purposes of data protection law, Krisha acts as the data controller of your personal data.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 border-b border-primary/10 pb-2">2. Information I Collect</h2>
            <p className="mb-4">
              When you book a session, join Kundalini School, or interact with this website, I may collect:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
              <li>Name</li>
              <li>Email address</li>
              <li>Payment information (processed securely via third-party providers)</li>
              <li>Account/login details (for platform access, if applicable)</li>
              <li>Any personal information you voluntarily share during sessions, forms, or communication</li>
            </ul>
            <p>
              I do not intentionally collect sensitive personal data unless it is voluntarily shared by you.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 border-b border-primary/10 pb-2">3. How Your Information Is Used (Lawful Basis)</h2>
            <p className="mb-4">Your data is processed under the following lawful bases:</p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-6">
              <li><strong>Contractual necessity</strong> – to deliver sessions, memberships, and services you purchase</li>
              <li><strong>Legitimate interests</strong> – to improve services and maintain communication</li>
              <li><strong>Consent</strong> – where you opt into marketing or non-essential communication</li>
            </ul>
            <p className="mb-4 text-foreground font-medium">Your information is used only to:</p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Provide your session or access to Kundalini School</li>
              <li>Manage bookings, payments, and account access</li>
              <li>Communicate with you regarding services, updates, or support</li>
              <li>Improve the quality and delivery of services</li>
            </ul>
            <p className="mt-6 font-medium text-foreground">
              I do not sell or rent your personal data.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 border-b border-primary/10 pb-2">4. Third-Party Processors</h2>
            <p className="mb-4">
              To operate this website and services, I use trusted third-party providers, including:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
              <li>Stripe (payment processing)</li>
              <li>Website hosting providers</li>
              <li>Email and communication platforms</li>
            </ul>
            <p>
              These providers process your data only as necessary to deliver their services and are expected to handle data securely and in compliance with applicable laws.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 border-b border-primary/10 pb-2">5. International Data Transfers</h2>
            <p className="mb-4">
              Some third-party providers may store or process data outside the United Kingdom. Where this occurs, reasonable steps are taken to ensure your data is protected through appropriate safeguards (such as standard contractual clauses or equivalent protections).
            </p>
            <p className="mb-4">
              I may work with trusted technical service providers (including website developers and support teams) who may have limited access to personal data solely for the purpose of maintaining, developing, or supporting the website and services.
            </p>
            <p>
              All such providers are required to handle your data securely and in accordance with applicable data protection laws. This may include service providers located outside the United Kingdom (including India), where appropriate safeguards are in place to protect your data.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 border-b border-primary/10 pb-2">6. Payment Security</h2>
            <p className="mb-4">All payments are processed through secure third-party platforms.</p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>I do not store or have access to your full payment details</li>
              <li>Payment providers manage and secure your financial data</li>
              <li>By making a payment, you agree to the terms and privacy policies of the relevant payment provider</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 border-b border-primary/10 pb-2">7. Confidentiality</h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
              <li>Personal sharing within 1:1 sessions is treated as strictly confidential</li>
              <li>Group spaces (such as Kundalini School) are held with respect for privacy, but confidentiality cannot be fully guaranteed due to the nature of shared participation</li>
              <li>Confidentiality may be limited where disclosure is required by law</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 border-b border-primary/10 pb-2">8. Data Retention</h2>
            <p className="mb-4">Your data is stored only for as long as necessary to:</p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Deliver services</li>
              <li>Maintain records for legal, tax, or business obligations</li>
              <li>Resolve disputes or enforce agreements</li>
            </ul>
            <p className="mt-4">When no longer required, your data is securely deleted or anonymised.</p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 border-b border-primary/10 pb-2">9. Your Rights</h2>
            <p className="mb-4 text-foreground font-medium">Under UK GDPR, you have the right to:</p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Request access to your personal data</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data (“right to be forgotten”)</li>
              <li>Restrict or object to certain processing</li>
              <li>Withdraw consent at any time (where applicable)</li>
            </ul>
            <p className="mt-4">Requests can be made via the contact details on the website.</p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 border-b border-primary/10 pb-2">10. Cookies & Tracking</h2>
            <p className="mb-4">This website uses cookies to improve your experience and functionality. Cookies may include:</p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li><strong>Essential cookies</strong> (required for website operation)</li>
              <li><strong>Analytics cookies</strong> (to understand website usage)</li>
              <li><strong>Functional cookies</strong> (for login or preferences)</li>
            </ul>
            <p className="mt-4">Where required, you will be given the option to accept or reject non-essential cookies via a cookie banner.</p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 border-b border-primary/10 pb-2">11. Data Security</h2>
            <p className="mb-4">Appropriate technical and organisational measures are in place to protect your data from:</p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Unauthorised access</li>
              <li>Loss or misuse</li>
              <li>Disclosure or alteration</li>
            </ul>
            <p className="mt-4 text-foreground italic">However, no online system can be guaranteed to be 100% secure.</p>
          </section>
        </div>
      </div>
    </main>
  )
}
