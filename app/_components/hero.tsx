"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SearchBar } from "./search-bar";
import { AuthRequiredModal } from "./auth-required-modal";
import { useAuthGate } from "../_hooks/use-auth-gate";

export function Hero() {
  const [theme, setTheme] = useState("light");
  const router = useRouter();
  const { showModal, setShowModal, requireAuth } = useAuthGate();

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

  const handlePlanClick = () => {
    requireAuth(() => {
      router.push("/itineraries");
    });
  };

  return (
    <>
      <section className="max-w-7xl mx-auto px-0 md:px-6 py-0 md:py-10 bg-transparent transition-colors duration-300">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-10 items-center">
          
          {/* TEXT */}
          <div className="order-2 md:order-1 px-4 md:px-0 text-center md:text-left -mt-20 md:mt-0 relative z-30">
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

            <p
              className={`mt-4 md:mt-6 max-w-xl mx-auto md:mx-0 ${
                isDark ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Find attractions, estimate travel costs and time, and create your own journey.
            </p>

            <div className="mt-6 max-w-lg mx-auto md:mx-0">
              <SearchBar />
            </div>

            {/* CTA BUTTONS */}
            <div className="mt-8 flex flex-col md:flex-row items-center gap-6 max-w-lg mx-auto md:mx-0">
              
              {/* PLAN MY TRIP (AUTH GATED) */}
              <button
                onClick={handlePlanClick}
                className="w-full md:w-[65%] py-4 bg-blue-600 text-white rounded-xl font-black shadow-[0_10px_20px_-5px_rgba(37,99,235,0.4)] hover:bg-blue-700 hover:-translate-y-1 active:scale-95 transition-all duration-300 cursor-pointer uppercase text-[12px] tracking-[0.15em]"
              >
                Plan My Trip
              </button>

              {/* EXPLORE */}
              <Link href="/explore" className="w-full md:w-auto">
                <button
                  className={`w-full md:w-auto px-6 py-3 rounded-xl font-bold transition-all duration-300 cursor-pointer text-[11px] uppercase tracking-widest border ${
                    isDark
                      ? "bg-[#262626] border-[#333] text-gray-300 hover:bg-[#333] hover:text-white"
                      : "bg-gray-100 border-gray-200 text-gray-600 hover:bg-gray-200 hover:text-gray-900"
                  } hover:-translate-y-1`}
                >
                  Explore Croatia
                </button>
              </Link>

            </div>
          </div>

          {/* IMAGE S ZOOM EFEKTOM */}
          <div className="order-1 md:order-2 relative w-full h-72 md:h-[420px] md:rounded-3xl overflow-hidden shadow-none md:shadow-2xl group">
            <Image
              src="/dubrovnik.jpg"
              alt="Dubrovnik old town"
              fill
              className="object-cover transition-transform duration-2000 ease-out group-hover:scale-110"
              priority
            />

            {/* Overlay gradijent za ljepši prijelaz na mobitelu */}
            <div
              style={{
                background: isDark
                  ? "linear-gradient(to top, #1a1a1a 15%, transparent)"
                  : "linear-gradient(to top, #ffffff 15%, transparent)",
              }}
              className="absolute bottom-0 left-0 right-0 h-[60%] md:hidden z-20"
            />
            
            {/* Blagi unutarnji shadow za "dubinu" slike */}
            <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.1)] pointer-events-none" />
          </div>
        </div>
      </section>

      {/* AUTH MODAL */}
      <AuthRequiredModal
        open={showModal}
        onClose={() => setShowModal(false)}
      />
    </>
  );
}