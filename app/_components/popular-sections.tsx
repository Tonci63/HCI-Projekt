"use client";

import { useState } from "react";
import { SectionCard } from "./section-card";

const sections = [
  { title: "Top Attractions", image: "/attractions.jpg" },
  { title: "Hidden Gems", image: "/hidden-gems.jpg" },
  { title: "Family-Friendly", image: "/family.jpg" },
  { title: "Cultural Sites", image: "/culture.jpg" },
];

export function PopularSections() {
  const [index, setIndex] = useState(0);

  const prev = () =>
    setIndex((i) => (i === 0 ? sections.length - 1 : i - 1));
  const next = () =>
    setIndex((i) => (i === sections.length - 1 ? 0 : i + 1));

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 py-12">
      <h2 className="text-2xl md:text-3xl font-bold mb-6">
        Popular Sections
      </h2>

      {/* MOBILE CAROUSEL */}
      <div className="relative md:hidden">
        {/* Card */}
        <SectionCard
          title={sections[index].title}
          image={sections[index].image}
        />

        {/* Arrows */}
        <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2
                w-14 h-14 text-3xl
                bg-white shadow-lg rounded-full
                flex items-center justify-center
                hover:bg-gray-100 transition"
            >
            ‹
        </button>


        <button
                onClick={next}
                className="absolute right-3 top-1/2 -translate-y-1/2
                            w-14 h-14 text-3xl
                            bg-white shadow-lg rounded-full
                            flex items-center justify-center
                            hover:bg-gray-100 transition"
                >
                ›
        </button>


        {/* Dots */}
        <div className="flex justify-center gap-2 mt-4">
          {sections.map((_, i) => (
            <span
              key={i}
              className={`w-2 h-2 rounded-full ${
                i === index ? "bg-blue-600" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>

      {/* DESKTOP GRID */}
      <div className="hidden md:grid grid-cols-2 gap-8">
        {sections.map((s) => (
          <SectionCard
            key={s.title}
            title={s.title}
            image={s.image}
          />
        ))}
      </div>
    </section>
  );
}