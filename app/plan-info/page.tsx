"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function InfoPage() {
  const [theme, setTheme] = useState("light");
  const [activeSection, setActiveSection] = useState("tips"); // State za praćenje aktivnog linka

  useEffect(() => {
    const syncTheme = () => {
      const storedTheme = localStorage.getItem("theme") || "light";
      setTheme(storedTheme);
    };
    syncTheme();
    window.addEventListener("storage", syncTheme);

    // LOGIKA ZA PRAĆENJE SKROLA
    const handleScroll = () => {
      const sections = ["tips", "weather", "events", "faq"];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const height = element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + height) {
            setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("storage", syncTheme);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const isDark = theme === "dark";

  const bgColor = isDark ? "bg-[#121212]" : "bg-[#fafafa]";
  const cardBg = isDark ? "bg-[#1e1e1e]" : "bg-white";
  const textColor = isDark ? "text-white" : "text-gray-900";
  const descColor = isDark ? "text-gray-400" : "text-gray-500";
  const borderColor = isDark ? "border-[#262626]" : "border-gray-100";

  return (
    <div className={`min-h-screen ${bgColor} pb-20 transition-colors duration-300`}>
      
      {/* QUICK NAV */}
      <div className="sticky top-0 z-50 flex justify-center p-4">
        <div className={`${cardBg} backdrop-blur-md bg-opacity-80 border ${borderColor} px-6 py-2 rounded-full shadow-lg flex gap-8 text-[9px] font-black uppercase tracking-[0.2em]`}>
          <a 
            href="#tips" 
            className={`transition-colors ${activeSection === "tips" ? "text-blue-600" : isDark ? "text-gray-400" : "text-gray-500"} hover:text-blue-600`}
          >
            Tips
          </a>
          <a 
            href="#weather" 
            className={`transition-colors ${activeSection === "weather" ? "text-blue-600" : isDark ? "text-gray-400" : "text-gray-500"} hover:text-blue-600`}
          >
            Weather
          </a>
          <a 
            href="#events" 
            className={`transition-colors ${activeSection === "events" ? "text-blue-600" : isDark ? "text-gray-400" : "text-gray-500"} hover:text-blue-600`}
          >
            Events
          </a>
          <a 
            href="#faq" 
            className={`transition-colors ${activeSection === "faq" ? "text-blue-600" : isDark ? "text-gray-400" : "text-gray-500"} hover:text-blue-600`}
          >
            FAQ
          </a>
        </div>
      </div>

      {/* HEADER */}
      <section className={`py-20 px-6 relative ${cardBg} border-b ${borderColor}`}>
        <div className="absolute top-0 left-0 w-full h-1 bg-blue-600"></div>
        <div className="max-w-5xl mx-auto">
          <span className="text-blue-600 font-black text-[10px] uppercase tracking-[0.3em] mb-4 block">
            Resources & Guide
          </span>
          <h1 className={`text-5xl md:text-6xl font-black ${textColor} uppercase tracking-tighter leading-none`}>
            Traveler <span className="text-blue-600">Essentials.</span>
          </h1>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 py-16 space-y-24">
        
        {/* TRAVEL TIPS */}
        <section id="tips">
          <div className="flex items-center gap-4 mb-10">
            <h2 className={`text-xl font-black ${textColor} uppercase tracking-tight italic`}>Travel Tips</h2>
            <div className={`h-0.5 flex-1 ${isDark ? "bg-[#262626]" : "bg-gray-100"}`}></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Currency", desc: "Croatia uses the Euro (€). While cards are standard, always keep some cash for local markets." },
              { title: "Transport", desc: "Ferries for islands and FlixBus for cities are your best options. Book in advance." },
              { title: "Language", desc: "English is widely spoken, but 'Dobar dan' and 'Hvala' go a long way." }
            ].map((tip, i) => (
              <div key={i} className={`${cardBg} p-8 rounded-4xl border ${borderColor} shadow-sm hover:border-blue-500/50 hover:-translate-y-2 transition-all duration-300 cursor-default`}>
                <h3 className="font-black text-blue-600 uppercase text-xs mb-3">{tip.title}</h3>
                <p className={`${isDark ? "text-gray-300" : "text-gray-600"} text-sm leading-relaxed`}>{tip.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* WEATHER & SEASONS */}
        <section id="weather">
          <div className="flex items-center gap-4 mb-10">
            <h2 className={`text-xl font-black ${textColor} uppercase tracking-tight italic`}>Weather & Seasons</h2>
            <div className={`h-0.5 flex-1 ${isDark ? "bg-[#262626]" : "bg-gray-100"}`}></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: "☀️", label: "Summer", desc: "Hot (25-35°C). Best for beaches." },
              { icon: "🍂", label: "Fall & Spring", desc: "Mild (18-24°C). Perfect for hiking." },
              { icon: "❄️", label: "Winter", desc: "Cold (2-10°C). Magic Advent." }
            ].map((s, i) => (
              <div key={i} className={`${cardBg} p-8 rounded-4xl border ${borderColor} shadow-sm hover:border-blue-500/50 hover:-translate-y-2 transition-all duration-300`}>
                <span className="text-3xl block mb-4">{s.icon}</span>
                <h3 className={`font-bold ${textColor} uppercase text-xs tracking-widest`}>{s.label}</h3>
                <p className={`${descColor} text-sm mt-2`}>{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* EVENTS SECTION */}
        <section id="events">
          <div className="flex items-center gap-4 mb-10">
            <h2 className={`text-xl font-black ${textColor} uppercase tracking-tight italic`}>Upcoming Events</h2>
            <div className={`h-0.5 flex-1 ${isDark ? "bg-[#262626]" : "bg-gray-100"}`}></div>
          </div>
          <div className="space-y-4">
            {[
              { name: "Dubrovnik Summer Festival", date: "July - Aug", loc: "Old Town", img: "🎭", tips: ["Book plays early", "Dress smart casual", "Avoid the main crowd"] },
              { name: "Ultra Europe Split", date: "July", loc: "Park Mladeži", img: "🔊", tips: ["Use free shuttle buses", "Stay hydrated", "Get wristband early"] },
              { name: "Advent in Zagreb", date: "Dec - Jan", loc: "Zagreb Center", img: "🎄", tips: ["Visit King Tomislav ice rink", "Try fritule at Zrinjevac", "Weekdays are less busy"] }
            ].map((event, i) => (
              <div key={i} className={`group flex flex-col ${cardBg} rounded-3xl overflow-hidden border ${borderColor} hover:border-blue-500 transition-all duration-500 shadow-sm`}>
                <div className="flex flex-col md:flex-row items-center">
                  <div className={`w-full md:w-32 h-20 md:h-24 ${isDark ? "bg-[#262626]" : "bg-gray-100"} flex items-center justify-center text-2xl group-hover:bg-blue-600 group-hover:text-white transition-colors duration-500`}>
                    {event.img}
                  </div>
                  <div className="p-6 flex-1 flex justify-between items-center w-full">
                    <div>
                      <h4 className={`font-black ${textColor} uppercase text-sm tracking-tight`}>{event.name}</h4>
                      <p className="text-[10px] text-blue-600 font-bold uppercase tracking-widest mt-0.5">{event.loc}</p>
                    </div>
                    <span className={`${isDark ? "bg-blue-600" : "bg-gray-900"} text-white text-[9px] font-black px-3 py-1.5 rounded-full uppercase`}>
                      {event.date}
                    </span>
                  </div>
                </div>
                <div className="max-h-0 group-hover:max-h-24 overflow-hidden transition-all duration-500 ease-in-out">
                  <div className={`px-6 pb-6 pt-2 border-t ${isDark ? "border-[#262626]" : "border-gray-50"} flex gap-6`}>
                    {event.tips.map((tip, idx) => (
                      <span key={idx} className={`${isDark ? "text-gray-400" : "text-gray-500"} text-[11px] italic`}>• {tip}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ SECTION */}
        <section id="faq">
          <div className="flex items-center gap-4 mb-10">
            <h2 className={`text-xl font-black ${textColor} uppercase tracking-tight italic`}>Common Questions</h2>
            <div className={`h-0.5 flex-1 ${isDark ? "bg-[#262626]" : "bg-gray-100"}`}></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
            {[
              { q: "Is tap water drinkable?", a: "Yes, tap water in Croatia is safe and among the best in Europe." },
              { q: "Do I need to tip at restaurants?", a: "It's not mandatory, but leaving 10% is standard for good service." },
              { q: "How safe is Croatia?", a: "Very safe. It's consistently ranked as one of the safest countries in the world." },
              { q: "Can I pay with a credit card?", a: "Yes, almost everywhere. Small island shops might still prefer cash." }
            ].map((f, i) => (
              <div key={i} className="group">
                <h4 className={`font-black text-xs uppercase ${textColor} group-hover:text-blue-600 transition-colors`}>{f.q}</h4>
                <p className={`${descColor} text-sm mt-2 leading-relaxed`}>{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="pt-10 border-t border-gray-100 dark:border-[#262626] text-center">
            <Link href="/itineraries" className={`group inline-flex items-center gap-3 ${textColor} font-black uppercase text-[10px] tracking-[0.2em] hover:text-blue-600 transition-all`}>
              <span>Back to my journey</span>
              <span className="group-hover:translate-x-2 transition-transform">→</span>
            </Link>
        </section>

      </div>
    </div>
  );
}