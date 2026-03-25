import { DecorativeArch } from "@/components/decorative-arch"

export default function TermsPage() {
  return (
    <main className="min-h-screen pt-32 pb-24 bg-background selection:bg-primary/20">
      <div className="mx-auto max-w-4xl px-6 sm:px-8">
        {/* Decorative Arch Background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] -z-10 pointer-events-none opacity-10">
          <DecorativeArch className="w-full h-full text-primary" />
        </div>

        <header className="mb-16 text-center">
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-foreground tracking-tight mb-4 uppercase">
            Disclaimer & Terms
          </h1>
          <p className="text-muted-foreground italic">
            Please read these terms carefully before booking a session.
          </p>
        </header>

        <div className="prose prose-lg dark:prose-invert prose-headings:font-serif prose-headings:text-primary prose-p:text-muted-foreground leading-relaxed max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 border-b border-primary/10 pb-2">1. Nature of Service</h2>
            <ul className="list-disc pl-6 space-y-3 text-muted-foreground">
              <li>Krisha is a spiritual advisor and energy healer, not a fortune teller.</li>
              <li>Sessions may include spiritual guidance, inner healing, and energy work. They are not for future predictions or guaranteed outcomes.</li>
              <li>Advice shared about areas such as medical, psychiatric, legal, financial, or pregnancy-related matters is for guidance only. Please consult a qualified professional in the respective field for further development and understanding.</li>
            </ul>
             <div className="mt-8 italic font-medium bg-secondary/50 p-6 rounded-2xl text-foreground border border-primary/10">
                By booking a session with Krisha, you acknowledge and agree to the following sections:
              </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 border-b border-primary/10 pb-2">2. Healing Process</h2>
            <ul className="list-disc pl-6 space-y-3 text-muted-foreground">
              <li>Deep healing can trigger emotional releases, unsettled feelings, or life changes. This is a normal part of the process.</li>
              <li>Integration is a key phase following sessions. Journaling, rest, and conscious choices help ground the work. Please feel free to book consultations for continued support.</li>
              <li>If you are pregnant or trying to conceive, please inform Krisha beforehand. She works with spirit baby energies and can support you accordingly. Please use all advice at your own discretion, and consult a healthcare professional as and when needed.</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 border-b border-primary/10 pb-2">3. Client Responsibility</h2>
            <ul className="list-disc pl-6 space-y-3 text-muted-foreground">
              <li>By booking, you confirm you are choosing to engage in this work voluntarily.</li>
              <li>Results vary for each individual, and no outcomes are guaranteed.</li>
              <li>You remain responsible for your decisions and actions following the session.</li>
              <li>Sessions are open to clients of all ages. For clients under 18, parental consent and presence are required.</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 border-b border-primary/10 pb-2">4. Consent & Access</h2>
            <ul className="list-disc pl-6 space-y-3 text-muted-foreground">
              <li>Akashic and astral work requires both client permission and permission from the higher realms.</li>
              <li>If higher guidance does not grant access, partial refunds may apply.</li>
              <li>In cases of heavy or resistant energy where work cannot proceed, at least 50% of the session fee will be retained.</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 border-b border-primary/10 pb-2">5. Refunds & Rescheduling</h2>
            <ul className="list-disc pl-6 space-y-3 text-muted-foreground">
              <li>Cancellations 3 days before the session: 80% refundable.</li>
              <li>Cancellations 2 days before the session: 60% refundable.</li>
              <li>Cancellations or reschedules made within 24 hours of the appointment, as well as no-shows, are non-refundable.</li>
              <li>Time zones and punctuality are the client’s responsibility.</li>
              <li>Krisha reserves the right to cancel a booking if she feels the energetic alignment is not right. In such cases, a full refund minus transaction fees will be provided.</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 border-b border-primary/10 pb-2">6. Ethical Boundaries</h2>
            <ul className="list-disc pl-6 space-y-3 text-muted-foreground">
              <li>Krisha does not discuss black magic or harmful practices. If a client brings this into the session, the session will be ended immediately with no refund.</li>
              <li>No fortune-telling questions will be entertained.</li>
              <li>Krisha reserves the right to decline or discontinue a session if she feels it is not in energetic alignment.</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 border-b border-primary/10 pb-2">7. Confidentiality</h2>
            <p>All personal information and session content are kept private and confidential.</p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 border-b border-primary/10 pb-2">8. Payments</h2>
            <p>Payments are accepted via PayPal (USD), Stripe (GBP), or UPI (INR). Booking links are provided only for confirmed sessions.</p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 border-b border-primary/10 pb-2">9. Liability</h2>
            <p>By booking, you agree that Krisha is not liable for any outcomes, decisions, or consequences of your session.</p>
          </section>
        </div>
      </div>
    </main>
  )
}
