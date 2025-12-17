// app/explore/page.tsx
import Link from "next/link";
import { attractions } from "@/data/attractions";
import type { Attraction } from "@/data/attractions";

const categories = [
  "All",
  "Cultural & Historical",
  "Nature & Beaches",
  "Local Cuisine",
  "Hidden Gems",
  "Family-Friendly",
] as const;

const PER_PAGE = 5;

export default async function ExplorePage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; page?: string }>;
}) {
  const { category = "All", page = "1" } = await searchParams;
  const currentCategory = category;
  const currentPage = Math.max(1, Number(page) || 1);

  const filtered =
    currentCategory === "All"
      ? attractions
      : attractions.filter((a) => a.category === currentCategory);

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
    <div className="container mx-auto p-6 max-w-7xl">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Explore Croatia Attractions
      </h1>

      {/* Filter Bar */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {categories.map((cat) => (
          <Link
            key={cat}
            href={getHref(cat, 1)}
            className={`px-5 py-3 rounded-lg font-medium transition ${
              currentCategory === cat
                ? "bg-blue-600 text-white shadow-md"
                : "bg-gray-200 text-gray-900 hover:bg-gray-300"
            }`}
          >
            {cat}
          </Link>
        ))}
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {paginated.map((attr) => (
          <Link
            key={attr.id}
            href={`/explore/${attr.id}`}
            className="group block bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200"
          >
            <img
              src={attr.image}
              alt={attr.name}
              className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {attr.name}
              </h2>
              <p className="text-gray-600 line-clamp-3">{attr.shortDesc}</p>
              <span className="inline-block mt-4 text-blue-600 font-medium group-hover:underline">
                View Details →
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-6 text-lg">
          {currentPage > 1 && (
            <Link
              href={getHref(currentCategory, currentPage - 1)}
              className="px-6 py-3 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
            >
              ← Previous
            </Link>
          )}
          <span className="font-medium">
            Page {currentPage} of {totalPages}
          </span>
          {currentPage < totalPages && (
            <Link
              href={getHref(currentCategory, currentPage + 1)}
              className="px-6 py-3 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
            >
              Next →
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
