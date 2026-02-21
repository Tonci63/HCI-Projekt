export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-6 py-24 max-w-3xl min-h-[70vh]">
      <h1 className="text-4xl font-black mb-8 tracking-tighter text-blue-600">Privacy Policy</h1>
      <div className="prose dark:prose-invert max-w-none space-y-6 opacity-80">
        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">1. Information We Collect</h2>
          <p>We collect information you provide directly to us, such as when you create an account, save an itinerary, or contact us for support.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">2. How We Use Information</h2>
          <p>We use the information to personalize your travel experience, maintain your saved trips, and improve our application services.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">3. Data Security</h2>
          <p>We implement industry-standard security measures to protect your personal data from unauthorized access or disclosure.</p>
        </section>
      </div>
    </div>
  );
}