import Link from "next/link"

export default function TermsPage() {
    return (
        <div className="flex flex-col min-h-screen">

            {/* Hero / Header - Matching About/Contact Page style */}
            <section className="bg-primary/15 py-20 sm:py-28">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-6 text-balance">
                        Disclaimer & Terms of Service
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed text-balance">
                        Please read these terms carefully before booking a session.
                    </p>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-20 sm:py-28">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                    <div className="prose prose-stone dark:prose-invert max-w-none space-y-12">

                        <section>
                            <h2 className="text-2xl font-bold mb-4 font-serif text-foreground">1. Nature of Service</h2>
                            <ul className="space-y-3 list-none pl-0 text-muted-foreground leading-relaxed">
                                <li><strong className="text-foreground">1.1</strong> Krisha is a spiritual advisor and energy healer, not a fortune teller.</li>
                                <li><strong className="text-foreground">1.2</strong> Sessions may include spiritual guidance, inner healing, and energy work. They are not for future predictions or guaranteed outcomes.</li>
                                <li><strong className="text-foreground">1.3</strong> Advice shared about areas such as medical, psychiatric, legal, financial, or pregnancy-related matters is for guidance only. Please consult a qualified professional in the respective field for further development and understanding.</li>
                            </ul>
                            <div className="mt-6 italic font-medium bg-secondary/50 p-6 rounded-xl text-foreground border border-secondary">
                                By booking a session with Krisha, you acknowledge and agree to the following:
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-4 font-serif text-foreground">2. Healing Process</h2>
                            <ul className="space-y-3 list-none pl-0 text-muted-foreground leading-relaxed">
                                <li><strong className="text-foreground">2.1</strong> Deep healing can trigger emotional releases, unsettled feelings, or life changes. This is a normal part of the process.</li>
                                <li><strong className="text-foreground">2.2</strong> Integration is a key phase following sessions. Journaling, rest, and conscious choices help ground the work. Please feel free to book consultations for continued support.</li>
                                <li><strong className="text-foreground">2.3</strong> If you are pregnant or trying to conceive, please inform Krisha beforehand. She works with spirit baby energies and can support you accordingly. Please use all advice at your own discretion, and consult a healthcare professional as and when needed.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-4 font-serif text-foreground">3. Client Responsibility</h2>
                            <ul className="space-y-3 list-none pl-0 text-muted-foreground leading-relaxed">
                                <li><strong className="text-foreground">3.1</strong> By booking, you confirm you are choosing to engage in this work voluntarily.</li>
                                <li><strong className="text-foreground">3.2</strong> Results vary for each individual, and no outcomes are guaranteed.</li>
                                <li><strong className="text-foreground">3.3</strong> You remain responsible for your decisions and actions following the session.</li>
                                <li><strong className="text-foreground">3.4</strong> Sessions are open to clients of all ages. For clients under 18, parental consent and presence are required.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-4 font-serif text-foreground">4. Consent & Access</h2>
                            <ul className="space-y-3 list-none pl-0 text-muted-foreground leading-relaxed">
                                <li><strong className="text-foreground">4.1</strong> Akashic and astral work requires both client permission and permission from the higher realms.</li>
                                <li><strong className="text-foreground">4.2</strong> If higher guidance does not grant access, partial refunds may apply.</li>
                                <li><strong className="text-foreground">4.3</strong> In cases of heavy or resistant energy where work cannot proceed, at least 50% of the session fee will be retained.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-4 font-serif text-foreground">5. Refunds & Rescheduling</h2>
                            <ul className="space-y-3 list-none pl-0 text-muted-foreground leading-relaxed">
                                <li><strong className="text-foreground">5.1</strong> Cancellations 3 days before the session: 80% refundable.</li>
                                <li><strong className="text-foreground">5.2</strong> Cancellations 2 days before the session: 60% refundable.</li>
                                <li><strong className="text-foreground">5.3</strong> Cancellations or reschedules made within 24 hours of the appointment, as well as no-shows, are non-refundable. A client will be considered a no-show if they do not arrive within 10 minutes of the scheduled appointment time.</li>
                                <li><strong className="text-foreground">5.4</strong> Time zones and punctuality are the client’s responsibility.</li>
                                <li><strong className="text-foreground">5.5</strong> Krisha reserves the right to cancel a booking before or during the session if she feels the energetic alignment is not right, or due to health reasons, or unforeseen circumstances. In such cases, a full refund minus transaction fees will be provided.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-4 font-serif text-foreground">6. Ethical Boundaries</h2>
                            <ul className="space-y-3 list-none pl-0 text-muted-foreground leading-relaxed">
                                <li><strong className="text-foreground">6.1</strong> Krisha does not discuss black magic or harmful practices in any form. If a client brings this into the session or breaks this boundary, the session will be ended immediately with no refund.</li>
                                <li><strong className="text-foreground">6.2</strong> No fortune-telling questions will be entertained.</li>
                                <li><strong className="text-foreground">6.3</strong> Krisha reserves the right to decline or discontinue a session if she feels it is not in energetic alignment or safe for either party.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-4 font-serif text-foreground">7. Confidentiality</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                All personal information and session content are kept private and confidential.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-4 font-serif text-foreground">8. Payments</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                Payments are accepted via PayPal (USD), Stripe (GBP), or UPI (INR). Booking links are provided only for confirmed sessions.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-4 font-serif text-foreground">9. Liability</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                By booking, you agree that Krisha is not liable for any outcomes, decisions, or consequences of your session. Clients are responsible for ensuring a stable internet connection for online sessions.
                            </p>
                        </section>



                    </div>
                </div>
            </section>
        </div>
    )
}
