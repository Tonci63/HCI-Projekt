"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const pages = [
  { title: "Home", path: "/" },
  { title: "Explore", path: "/explore" },
  { title: "Itineraries", path: "/Itineraries" },
  { title: "Plan & Info", path: "/plan-info" },
  { title: "Blog / Reviews", path: "/blog" },
  { title: "Profile/Settings", path: "/profile" },
];

export function Navigation() {
  const currentPath = usePathname();

  return (
    <nav className="flex justify-between items-center p-4 border-b border-gray-700 bg-black">
      <div className="text-xl font-bold text-white ml-4">ViaCroatia</div>
      <ul className="flex space-x-4">
        {pages.map((page) => {
          const isActive = currentPath === page.path;
          return (
            <li key={page.path}>
              <Link
                href={page.path}
                className={`px-4 py-2 rounded-md transition-colors duration-200 ${
                  isActive
                    ? "bg-blue-700 text-white"
                    : "hover:bg-gray-800 text-white"
                }`}
              >
                {page.title}{" "}
              </Link>{" "}
            </li>
          );
        })}{" "}
      </ul>{" "}
    </nav>
  );
}
