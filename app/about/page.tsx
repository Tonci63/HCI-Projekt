export default function AboutPage() {
  return (
    <div className="container mx-auto px-6 py-24 max-w-3xl min-h-[70vh]">
      <h1 className="text-4xl font-black mb-8 tracking-tighter text-blue-600">About ViaCroatia</h1>
      <div className="space-y-6 text-lg leading-relaxed opacity-90">
        <p>
          ViaCroatia is your ultimate digital companion for exploring the breathtaking beauty of the Croatian coast and interior. 
          Our mission is to help travelers discover hidden gems beyond the usual tourist traps.
        </p>
        <p>
          Whether you're looking for the ancient walls of Dubrovnik, the crystal-clear lakes of Plitvice, or the 
          vibrant streets of Zagreb, we provide the tools to plan, save, and enjoy your perfect itinerary.
        </p>
        <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-800">
          <h2 className="font-bold text-blue-600 mb-2">Our Vision</h2>
          <p className="text-sm">To make travel planning seamless, personalized, and unforgettable for every visitor to Croatia.</p>
        </div>
      </div>
    </div>
  );
}