export default function TermsPage() {
  return (
    <div className="container mx-auto px-6 py-24 max-w-3xl min-h-[70vh]">
      <h1 className="text-4xl font-black mb-8 tracking-tighter text-blue-600">Terms of Service</h1>
      <div className="prose dark:prose-invert max-w-none space-y-6 opacity-80">
        <p className="italic">Last updated: February 20, 2026</p>
        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">1. Acceptance of Terms</h2>
          <p>By accessing ViaCroatia, you agree to be bound by these Terms of Service and all applicable laws and regulations.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">2. Use License</h2>
          <p>Permission is granted to temporarily use the application for personal, non-commercial transitory viewing and trip planning only.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">3. Disclaimer</h2>
          <p>The travel information provided is for general purposes. We strive for accuracy but cannot guarantee that all locations, prices, or hours are always up to date.</p>
        </section>
      </div>
    </div>
  );
}