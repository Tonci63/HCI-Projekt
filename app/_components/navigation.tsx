"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth/auth-client";
import { useTheme } from "./ThemeWrapper"; 

const pages = [
  { title: "Home", path: "/" },
  { title: "Explore", path: "/explore" },
  { title: "Itineraries", path: "/itineraries" },
  { title: "Plan & Info", path: "/plan-info" },
  { title: "Blog", path: "/blog" },
];

export function Navigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  
  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    const checkSession = async () => {
      const session = await authClient.getSession();
      setUser(session?.data?.user || null);
    };
    checkSession();
  }, [pathname]);

  return (
    <nav 
      style={{ backgroundColor: isDark ? "#0a0a0a" : "#ffffff" }}
      className={`border-b transition-colors duration-300 shadow-sm sticky top-0 z-100 ${
        isDark ? "border-gray-800" : "border-gray-200"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* LOGO I TEKST - POVEĆANA SAMO IKONA */}
        <Link href="/" className="flex items-center gap-2 text-2xl font-bold tracking-tight">
          <img 
            src="/ikonica2.png" 
            alt="ViaCroatia Logo" 
            className="w-10 h-10 object-contain" /* Povećano s 8 na 10 */
          />
          <span style={{ color: "#2563eb" }}>
            ViaCroatia
          </span>
        </Link>

        {/* DESKTOP LINKS */}
        <ul className="hidden md:flex gap-2">
          {pages.map((page) => {
            const isActive = pathname === page.path;
            return (
              <li key={page.path}>
                <Link
                  href={page.path}
                  style={{ 
                    color: isActive ? "#ffffff" : (isDark ? "#d1d5db" : "#374151") 
                  }}
                  className={`px-4 py-2 rounded-md text-base font-medium transition-all duration-200 ${
                    isActive ? "bg-blue-600" : "hover:bg-blue-600 hover:text-white"
                  }`}
                >
                  {page.title}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* DESKTOP DESNA STRANA - POVEĆAN PROFIL */}
        <div className="hidden md:flex items-center">
          {user ? (
            <Link href="/profile" className="transition-transform hover:scale-110 active:scale-95">
              <div 
                style={{
                  width: "46px", /* Povećano s 42px na 46px */
                  height: "46px",
                  backgroundColor: "#2563eb",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "1.1rem",
                  overflow: "hidden",
                  border: `2.5px solid ${isDark ? "#333" : "#e5e7eb"}`,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
                }}
              >
                {user.image ? (
                  <img src={user.image} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  user.email?.charAt(0).toUpperCase()
                )}
              </div>
            </Link>
          ) : (
            <Link 
              href="/login" 
              className="px-5 py-2 rounded-lg bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 transition shadow-sm"
            >
              Log in / Sign up
            </Link>
          )}
        </div>

        {/* MOBILE MENU BUTTON */}
        <button 
          onClick={() => setOpen(!open)} 
          className={`md:hidden text-2xl ${isDark ? "text-white" : "text-gray-800"}`}
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* MOBILE DROPDOWN */}
      {open && (
        <div 
          style={{ backgroundColor: isDark ? "#0a0a0a" : "#ffffff" }}
          className={`md:hidden border-t px-4 py-4 space-y-4 ${
            isDark ? "border-gray-800" : "border-gray-200"
          }`}
        >
          {pages.map((page) => {
            const isActive = pathname === page.path;
            return (
              <Link
                key={page.path}
                href={page.path}
                onClick={() => setOpen(false)}
                style={{ 
                  color: isActive ? "#ffffff" : (isDark ? "#d1d5db" : "#374151") 
                }}
                className={`block px-4 py-2 rounded-md font-medium ${
                  isActive ? "bg-blue-600 text-white" : ""
                }`}
              >
                {page.title}
              </Link>
            );
          })}
          
          <div className="pt-2 border-t border-gray-200 dark:border-gray-800">
            <Link
              href={user ? "/profile" : "/login"}
              onClick={() => setOpen(false)}
              className="block px-4 py-2 rounded-md font-bold text-blue-600"
            >
              {user ? "My Profile" : "Log in / Sign up"}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}