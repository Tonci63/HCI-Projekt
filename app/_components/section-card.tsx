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
    <div className={`relative ${isDark ? "bg-[#262626]" : "bg-white"} rounded-2xl shadow-lg hover:shadow-xl transition overflow-hidden h-50 p-6 flex flex-col justify-between`}>
      
      {/* Title - Mijenja se samo boja */}
      <h3 className={`text-xl font-semibold z-10 ${isDark ? "text-white" : "text-black"}`}>
        {title}
      </h3>

      {/* View more - Mijenja se samo boja */}
      <p className={`${isDark ? "text-blue-400" : "text-blue-600"} font-medium z-10 cursor-pointer`}>
        View More →
      </p>

      {/* Image - Ostaje sve isto tvoje */}
      <div className="absolute top-0 right-0 w-48 h-full">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
}