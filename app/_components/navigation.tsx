"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth/auth-client";

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
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const session = await authClient.getSession();
      setIsLoggedIn(!!session?.data?.user);
    };

    checkSession();
  }, [pathname]);

  return (
    <nav className="bg-white dark:bg-[#0a0a0a] border-b border-gray-200 dark:border-gray-800 shadow-sm transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-blue-600 tracking-tight">
          ViaCroatia
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex gap-2">
          {pages.map((page) => (
            <li key={page.path}>
              <Link
                href={page.path}
                className={`px-4 py-2 rounded-md text-base font-medium transition-all duration-200 tracking-wide ${
                  pathname === page.path
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-blue-600 hover:text-white"
                }`}
              >
                {page.title}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden md:flex">
          {isLoggedIn ? (
            <Link 
              href="/profile" 
              className="px-5 py-2 rounded-lg bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 transition shadow-sm"
            >
              My Profile
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

        {/* Mobile menu button */}
        <button onClick={() => setOpen(!open)} className="md:hidden text-gray-800 dark:text-gray-200 text-2xl">
          ☰
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0a0a0a] px-4 py-4 space-y-4">
          {pages.map((page) => (
            <Link
              key={page.path}
              href={page.path}
              onClick={() => setOpen(false)}
              className={`block px-4 py-2 rounded-md font-medium ${
                pathname === page.path
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 dark:text-gray-300"
              }`}
            >
              {page.title}
            </Link>
          ))}

          <Link
            href={isLoggedIn ? "/profile" : "/login"}
            onClick={() => setOpen(false)}
            className="block text-center py-2 rounded-lg bg-blue-600 text-white font-bold"
          >
            {isLoggedIn ? "My Profile" : "Log in / Sign up"}
          </Link>
        </div>
      )}
    </nav>
  );
}
