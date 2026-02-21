"use client";

import { useState, useEffect } from "react"; // Dodan useEffect
import { useRouter } from "next/navigation";
import { SectionCard } from "./section-card";

const sections = [
  { title: "Top Attractions", image: "/attractions.jpg", category: "top" },
  { title: "Hidden Gems", image: "/hidden-gems.jpg", category: "gems" },
  { title: "Family-Friendly", image: "/family.jpg", category: "family" },
  { title: "Cultural Sites", image: "/culture.jpg", category: "culture" },
];

export function PopularSections() {
  const [index, setIndex] = useState(0);
  const [theme, setTheme] = useState("light"); // State za temu
  const router = useRouter();

  // Isti sistem za temu kao u Hero komponenti
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    const handleStorage = () => setTheme(localStorage.getItem("theme") || "light");
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const isDark = theme === "dark";

  const handleNavigation = (category: string) => {
    router.push(`/explore?category=${category}`);
  };

  const prev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIndex((i) => (i === 0 ? sections.length - 1 : i - 1));
  };

  const next = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIndex((i) => (i === sections.length - 1 ? 0 : i + 1));
  };

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 py-12">
      <h2 className={`text-2xl md:text-3xl font-bold mb-6 ${isDark ? 'text-white' : 'text-black'}`}>
        Popular Sections
      </h2>

      {/* MOBILE CAROUSEL */}
      <div className="relative md:hidden">
        <div onClick={() => handleNavigation(sections[index].category)} className="cursor-pointer">
          <SectionCard
            title={sections[index].title}
            image={sections[index].image}
          />
        </div>

        {/* Arrows - Popravljene boje za Dark Mode */}
        <button
          onClick={prev}
          className={`absolute left-3 top-1/2 -translate-y-1/2 w-14 h-14 text-3xl z-30 shadow-xl rounded-full flex items-center justify-center transition active:scale-95 ${
            isDark 
              ? "bg-zinc-800 text-white border border-zinc-700" 
              : "bg-white/90 text-black border border-gray-100"
          }`}
        >
          ‹
        </button>

        <button
          onClick={next}
          className={`absolute right-3 top-1/2 -translate-y-1/2 w-14 h-14 text-3xl z-30 shadow-xl rounded-full flex items-center justify-center transition active:scale-95 ${
            isDark 
              ? "bg-zinc-800 text-white border border-zinc-700" 
              : "bg-white/90 text-black border border-gray-100"
          }`}
        >
          ›
        </button>

        {/* Dots (Točkice na dnu) - također popravljene za mrak */}
        <div className="flex justify-center gap-2 mt-4">
          {sections.map((_, i) => (
            <span
              key={i}
              className={`w-2 h-2 rounded-full transition-all ${
                i === index 
                  ? "bg-blue-600 w-4" 
                  : (isDark ? "bg-zinc-700" : "bg-gray-300")
              }`}
            />
          ))}
        </div>
      </div>

      {/* DESKTOP GRID */}
      <div className="hidden md:grid grid-cols-2 gap-8">
        {sections.map((s) => (
          <div 
            key={s.title} 
            onClick={() => handleNavigation(s.category)} 
            className="cursor-pointer"
          >
            <SectionCard
              title={s.title}
              image={s.image}
            />
          </div>
        ))}
      </div>
    </section>
  );
}