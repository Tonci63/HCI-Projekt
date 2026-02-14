"use client";

import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import Link from "next/link";

const API_URL = "https://6942e05d69b12460f313226c.mockapi.io/attractions";

export function SearchBar() {
  const [query, setQuery] = useState("");
  const [allLocations, setAllLocations] = useState([]);
  const [results, setResults] = useState([]);
  const [isDark, setIsDark] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 1. Tema
    const checkTheme = () => setIsDark(localStorage.getItem("theme") === "dark");
    checkTheme();
    window.addEventListener("storage", checkTheme);

    // 2. Povuci podatke s tvog API-ja
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setAllLocations(data);
      } catch (error) {
        console.error("Greška pri dohvaćanju s API-ja:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    return () => window.removeEventListener("storage", checkTheme);
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);

    if (val.length > 1) {
      const filtered = allLocations.filter((loc: any) =>
        loc.name.toLowerCase().includes(val.toLowerCase())
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  };

  return (
    <div className="relative w-full z-50">
      {/* INPUT POLJE */}
      <div className={`flex items-center gap-3 border-2 transition-all duration-300 rounded-2xl px-5 py-3.5
        ${isDark 
          ? "bg-[#1e1e1e] border-[#262626] focus-within:border-blue-600" 
          : "bg-white border-gray-100 focus-within:border-blue-600 shadow-sm"
        }`}
      >
        <Search className={`w-5 h-5 ${isDark ? "text-gray-500" : "text-gray-400"}`} />
        <input
          type="text"
          value={query}
          onChange={handleSearch}
          placeholder={isLoading ? "Loading..." : "Search by city, attraction..."}
          disabled={isLoading}
          className={`flex-1 outline-none font-bold text-sm bg-transparent
            ${isDark ? "text-white placeholder-gray-600" : "text-gray-900 placeholder-gray-400"}`}
        />
      </div>

      {/* DROPDOWN REZULTATI */}
      {results.length > 0 && (
        <div className={`absolute top-full left-0 w-full mt-3 rounded-[2rem] border overflow-hidden shadow-2xl animate-in fade-in slide-in-from-top-2
          ${isDark ? "bg-[#1e1e1e] border-[#262626]" : "bg-white border-gray-100"}`}
        >
          {results.map((loc: any) => (
            <Link 
              key={loc.id} 
              href={`/explore/${loc.id}`} 
              className={`flex items-center gap-4 p-5 transition-all border-b last:border-0 
                ${isDark ? "hover:bg-[#262626] border-[#262626]" : "hover:bg-blue-50 border-gray-50"}`}
              onClick={() => {
                setQuery("");
                setResults([]);
              }}
            >
              {/* Ovdje pretpostavljam da API ima 'image' i 'name' */}
              <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 relative shrink-0">
                <img src={loc.image} alt={loc.name} className="object-cover w-full h-full" />
              </div>
              <div className="text-left">
                <p className={`font-black text-xs uppercase tracking-tighter ${isDark ? "text-white" : "text-gray-900"}`}>
                  {loc.name}
                </p>
                <p className="text-[9px] text-blue-600 font-black uppercase tracking-[0.2em] mt-0.5">
                  View details
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}