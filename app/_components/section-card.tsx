"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface SectionCardProps {
  title: string;
  image: string;
}

export function SectionCard({ title, image }: SectionCardProps) {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    setTheme(localStorage.getItem("theme") || "light");
    const handleStorage = () => setTheme(localStorage.getItem("theme") || "light");
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const isDark = theme === "dark";

  return (
    /* Dodao sam 'group', hover:shadow-2xl, i hover:-translate-y-1 za lagani skok cijele kartice */
    <div className={`group relative ${isDark ? "bg-[#262626]" : "bg-white"} 
      rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 
      overflow-hidden h-50 p-6 flex flex-col justify-between cursor-pointer`}>
      
      {/* Title - Na hover mijenja boju u plavu */}
      <h3 className={`text-xl font-semibold z-10 transition-colors duration-300 
        ${isDark ? "text-white group-hover:text-blue-400" : "text-black group-hover:text-blue-600"}`}>
        {title}
      </h3>

      {/* View more - Na hover se strelica pomakne udesno */}
      <p className={`${isDark ? "text-blue-400" : "text-blue-600"} 
        font-medium z-10 transition-transform duration-300 group-hover:translate-x-1`}>
        View More →
      </p>

      {/* Image - Dodan zoom efekt (scale) na hover */}
      <div className="absolute top-0 right-0 w-48 h-full overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Blagi gradient da slika ne "pojede" tekst na manjim ekranima */}
        <div className={`absolute inset-0 bg-linear-to-r ${isDark ? 'from-[#262626]' : 'from-white'} via-transparent to-transparent opacity-80`} />
      </div>
    </div>
  );
}