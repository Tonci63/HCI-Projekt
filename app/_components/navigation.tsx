"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

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

  return (
    <nav className="bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-blue-600">
          ViaCroatia
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex gap-2">
          {pages.map((page) => (
            <li key={page.path}>
              <Link
                href={page.path}
                className={`px-4 py-2 rounded-md text-base font-medium transition ${
                  pathname === page.path
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-blue-600 hover:text-white"
                }`}
              >
                {page.title}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <Link
          href="/profile"
          className="hidden md:inline-flex px-5 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition"
        >
          Log in / Sign up
        </Link>

        {/* Mobile menu button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-gray-800"
        >
          ☰
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden border-t bg-white px-4 py-4 space-y-4">
          {pages.map((page) => (
            <Link
              key={page.path}
              href={page.path}
              onClick={() => setOpen(false)}
              className={`block font-medium ${
                pathname === page.path
                  ? "text-blue-600"
                  : "text-gray-700"
              }`}
            >
              {page.title}
            </Link>
          ))}

          <Link
            href="/profile"
            onClick={() => setOpen(false)}
            className="block text-center py-2 rounded-lg bg-blue-600 text-white font-medium"
          >
            Log in / Sign up
          </Link>
        </div>
      )}
    </nav>
  );
}
