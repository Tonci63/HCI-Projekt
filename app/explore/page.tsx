// app/explore/page.tsx
import Link from "next/link";
import Image from "next/image";

const API_URL = "https://6942e05d69b12460f313226c.mockapi.io/attractions"; // Tvoj URL

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

async function fetchAttractions(): Promise<Attraction[]> {
  const res = await fetch(API_URL, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch attractions");
  return res.json();
}

export default async function ExplorePage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; page?: string }>;
}) {
  const { category = "All", page = "1" } = await searchParams;
  const currentPage = Math.max(1, Number(page) || 1);

  const attractions = await fetchAttractions();

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
    <div className="container mx-auto p-6 max-w-7xl">
      <h1 className="text-4xl font-bold mb-8 text-center text-white">
        Explore Croatia Attractions
      </h1>

      {/* Filter Bar */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {categories.map((cat) => (
          <Link
            key={cat}
            href={getHref(cat, 1)}
            className={`px-5 py-3 rounded-lg font-medium transition ${
              category === cat
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
            <Image
              src={attr.image}
              alt={attr.name}
              width={800}
              height={500}
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
        <div className="flex justify-center items-center gap-3 mt-10">
          {/* Previous */}
          {currentPage > 1 && (
            <Link
              href={getHref(category, currentPage - 1)}
              className="px-4 py-2 rounded-lg border border-blue-600 text-blue-600 bg-white hover:bg-blue-50 transition font-medium"
            >
              ← Previous
            </Link>
          )}

          {/* Page indicator */}
          <span className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold">
            {currentPage} / {totalPages}
          </span>

          {/* Next */}
          {currentPage < totalPages && (
            <Link
              href={getHref(category, currentPage + 1)}
              className="px-4 py-2 rounded-lg border border-blue-600 text-blue-600 bg-white hover:bg-blue-50 transition font-medium"
            >
              Next →
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
