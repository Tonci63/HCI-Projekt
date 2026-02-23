"use client";

import { useTheme } from "../_components/ThemeWrapper"; // Provjeri je li putanja točna

export default function AboutPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div 
      className="transition-colors duration-300"
      style={{ 
        backgroundColor: isDark ? "#121212" : "#ffffff", 
        color: isDark ? "#ffffff" : "#1e293b",
        minHeight: "100vh" 
      }}
    >
      <div className="container mx-auto px-6 py-24 max-w-3xl">
        <h1 className="text-4xl font-black mb-8 tracking-tighter text-blue-600">
          About ViaCroatia
        </h1>
        
        <div className="space-y-6 text-lg leading-relaxed opacity-90">
          <p>
            ViaCroatia is your ultimate digital companion for exploring the breathtaking beauty of the Croatian coast and interior. 
            Our mission is to help travelers discover hidden gems beyond the usual tourist traps.
          </p>
          <p>
            Whether you're looking for the ancient walls of Dubrovnik, the crystal-clear lakes of Plitvice, or the 
            vibrant streets of Zagreb, we provide the tools to plan, save, and enjoy your perfect itinerary.
          </p>

          {/* OVO JE TAJ PRAVOKUTNIK KOJI TE MUČIO */}
          <div 
            className="p-6 rounded-2xl border transition-all duration-300"
            style={{ 
              backgroundColor: isDark ? "rgba(37, 99, 235, 0.1)" : "#eff6ff", 
              borderColor: isDark ? "rgba(37, 99, 235, 0.3)" : "#dbeafe" 
            }}
          >
            <h2 className="font-bold text-blue-600 mb-2">Our Vision</h2>
            <p 
              className="text-sm"
              style={{ color: isDark ? "#cbd5e1" : "#1e293b" }}
            >
              To make travel planning seamless, personalized, and unforgettable for every visitor to Croatia.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}