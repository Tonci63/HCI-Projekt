"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SearchBar } from "./search-bar";

export function Hero() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);

    const handleStorage = () => {
      setTheme(localStorage.getItem("theme") || "light");
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const isDark = theme === "dark";

  return (
    /* Maknuo sam bg-white i stavio bg-transparent da Hero ne izgleda kao kartica */
    <section 
      className="max-w-7xl mx-auto px-0 md:px-6 py-0 md:py-10 bg-transparent transition-colors duration-300"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-10 items-center">
        
        {/* TEXT */}
        <div className="order-2 md:order-1 px-4 md:px-0 text-center md:text-left -mt-16 md:mt-0 relative z-10">
          <h1 
            style={{ color: isDark ? "#ffffff" : "#000000" }} 
            className="text-3xl md:text-5xl font-bold leading-tight"
          >
            Discover Croatia —
            <br />
            <span className="text-blue-600">
              Plan Smarter, Travel Better
            </span>
          </h1>

          <p className={`mt-4 md:mt-6 max-w-xl mx-auto md:mx-0 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
            Find attractions, estimate travel costs and time, and create your own journey.
          </p>

          <div className="mt-6 max-w-lg mx-auto md:mx-0">
            <SearchBar />
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-lg mx-auto md:mx-0">
            <Link href="/itineraries">
              <button className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium shadow hover:bg-blue-700 transition cursor-pointer">
                Plan My Trip
              </button>
            </Link>

            <Link href="/explore">
              <button className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium shadow hover:bg-blue-700 transition cursor-pointer">
                Explore Croatia
              </button>
            </Link>
          </div>
        </div>

        {/* IMAGE */}
        {/* Maknuo sam shadow na slici ako je mobitel da se stopi s pozadinom */}
        <div className="order-1 md:order-2 relative w-full h-72 md:h-[420px] md:rounded-2xl overflow-hidden shadow-none md:shadow-lg">
          <Image
            src="/dubrovnik.jpg"
            alt="Dubrovnik old town"
            fill
            className="object-cover"
            priority
          />

          {/* Gradijent koji se stopi s bojom stranice ovisno o temi */}
          <div 
            style={{ 
              background: isDark 
                ? "linear-gradient(to top, #1a1a1a 10%, transparent)" 
                : "linear-gradient(to top, #ffffff 10%, transparent)" 
            }}
            className="absolute bottom-0 left-0 right-0 h-[60%] md:hidden" 
          />
        </div>
      </div>
    </section>
  );
}