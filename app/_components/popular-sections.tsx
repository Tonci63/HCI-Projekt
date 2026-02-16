"use client";

import { useState } from "react";
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
  const router = useRouter();

  const handleNavigation = (category: string) => {
    // Navigacija na explore s filterom
    router.push(`/explore?category=${category}`);
  };

  const prev = (e: React.MouseEvent) => {
    e.stopPropagation(); // Sprječava okidanje klika na karticu
    setIndex((i) => (i === 0 ? sections.length - 1 : i - 1));
  };

  const next = (e: React.MouseEvent) => {
    e.stopPropagation(); // Sprječava okidanje klika na karticu
    setIndex((i) => (i === sections.length - 1 ? 0 : i + 1));
  };

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 py-12">
      <h2 className="text-2xl md:text-3xl font-bold mb-6">
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

        {/* Arrows - z-30 osigurava da su iznad svega */}
        <button
          onClick={prev}
          className="absolute left-3 top-1/2 -translate-y-1/2 w-14 h-14 text-3xl z-30 bg-white/90 shadow-xl rounded-full flex items-center justify-center hover:bg-white transition active:scale-95"
        >
          ‹
        </button>

        <button
          onClick={next}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-14 h-14 text-3xl z-30 bg-white/90 shadow-xl rounded-full flex items-center justify-center hover:bg-white transition active:scale-95"
        >
          ›
        </button>

        <div className="flex justify-center gap-2 mt-4">
          {sections.map((_, i) => (
            <span
              key={i}
              className={`w-2 h-2 rounded-full transition-all ${i === index ? "bg-blue-600 w-4" : "bg-gray-300"}`}
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