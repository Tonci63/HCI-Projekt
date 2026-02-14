"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, Suspense } from "react"; // Dodan Suspense
import { useSearchParams } from "next/navigation";

const API_URL = "https://6942e05d69b12460f313226c.mockapi.io/attractions";

const categories = [
  "All",
  "Cultural & Historical",
  "Nature & Beaches",
  "Local Cuisine",
  "Hidden Gems",
  "Family-Friendly",
] as const;

const PER_PAGE = 6;

type Attraction = {
  id: number;
  name: string;
  category: string;
  shortDesc: string;
  description: string;
  image: string;
  travelTime: string;
  accessibility: string;
  lat: number;
  lng: number;
};

// 1. Sva tvoja postojeća logika ide u ovu "unutrašnju" komponentu
function ExploreContent() {
  const searchParams = useSearchParams();
  const [attractions, setAttractions] = useState<Attraction[]>([]);
  const [theme, setTheme] = useState("light");
  const [loading, setLoading] = useState(true);

  const category = searchParams.get("category") || "All";
  const currentPage = Math.max(1, Number(searchParams.get("page")) || 1);

  useEffect(() => {
    const getAttractions = async () => {
      try {
        const res = await fetch(API_URL);
        if (res.ok) {
          const data = await res.json();
          setAttractions(data);
        }
      } catch (err) {
        console.error("Error fetching:", err);
      } finally {
        setLoading(false);
      }
    };

    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);

    const handleStorage = () => {
      setTheme(localStorage.getItem("theme") || "light");
    };

    getAttractions();
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  if (loading) return <div className="text-center py-20">Loading attractions...</div>;

  const isDark = theme === "dark";

  const filtered =
    category === "All"
      ? attractions
      : attractions.filter((a) => a.category === category);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * PER_PAGE,
    currentPage * PER_PAGE
  );

  const getHref = (newCategory: string, newPage = 1) => {
    const params = new URLSearchParams();
    if (newCategory !== "All") params.set("category", newCategory);
    if (newPage > 1) params.set("page", newPage.toString());
    const query = params.toString();
    return query ? `/explore?${query}` : "/explore";
  };

  return (
    <div style={{ 
      backgroundColor: isDark ? "#1a1a1a" : "#ffffff", 
      color: isDark ? "#ffffff" : "#000000",
      minHeight: "100vh",
      transition: "background-color 0.3s ease"
    }}>
      <div className="container mx-auto pt-12 pb-16 px-6 max-w-7xl">
        
        {/* Filter Bar */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <Link
              key={cat}
              href={getHref(cat, 1)}
              className={`px-5 py-3 rounded-lg font-medium transition ${
                category === cat
                  ? "bg-blue-600 text-white shadow-md"
                  : isDark ? "bg-[#262626] text-white hover:bg-[#333]" : "bg-gray-200 text-gray-900 hover:bg-gray-300"
              }`}
            >
              {cat}
            </Link>
          ))}
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {paginated.map((attr) => (
            <Link
              key={attr.id}
              href={`/explore/${attr.id}`}
              style={{ 
                backgroundColor: isDark ? "#262626" : "#ffffff",
                borderColor: isDark ? "#333" : "#e5e7eb"
              }}
              className="group block rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border"
            >
              <div className="relative h-56 w-full overflow-hidden">
                <Image
                  src={attr.image}
                  alt={attr.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  unoptimized
                />
              </div>
              <div className="p-6">
                <h2 className={`text-2xl font-bold mb-2 group-hover:text-blue-600 transition-colors duration-300 ${isDark ? "text-white" : "text-gray-900"}`}>
                  {attr.name}
                </h2>
                <p className={`${isDark ? "text-gray-400" : "text-gray-600"} line-clamp-3`}>{attr.shortDesc}</p>
                
                <span className="inline-flex items-center mt-4 text-blue-600 font-medium group-hover:underline">
                  View Details 
                  <span className="ml-1 transition-transform duration-300 group-hover:translate-x-1">→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-3 mt-10">
            {currentPage > 1 && (
              <Link
                href={getHref(category, currentPage - 1)}
                style={{ backgroundColor: isDark ? "#262626" : "#ffffff" }}
                className="px-4 py-2 rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-50 transition font-medium"
              >
                ← Previous
              </Link>
            )}

            <span className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold">
              {currentPage} / {totalPages}
            </span>

            {currentPage < totalPages && (
              <Link
                href={getHref(category, currentPage + 1)}
                style={{ backgroundColor: isDark ? "#262626" : "#ffffff" }}
                className="px-4 py-2 rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-50 transition font-medium"
              >
                Next →
              </Link>
            )}
          </div>
        )}
      </div>
      
    </div>
  );
}

// 2. Glavni export koji samo omotava sadržaj u Suspense
export default function ExplorePage() {
  return (
    <Suspense fallback={<div className="text-center py-20">Loading page...</div>}>
      <ExploreContent />
    </Suspense>
  );
}