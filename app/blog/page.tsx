import cms from "@/cms";
import Link from "next/link";

const PER_PAGE = 6;

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; page?: string; sort?: string }>;
}) {
  const params = await searchParams;

  const category = params?.category;
  const page = Number(params?.page ?? 1);
  const sort = params?.sort ?? "recent";

  const data = await cms.getEntries({
    content_type: "blogPost",
    order: sort === "oldest"
    ? ["fields.publishedAt"]
    : ["-fields.publishedAt"],
  });

  let posts = data.items;

  // filter
  if (category && category !== "All") {
    posts = posts.filter(
      (p: any) => p.fields.category === category
    );
  }

  const totalPages = Math.ceil(posts.length / PER_PAGE);

  const paginated = posts.slice(
    (page - 1) * PER_PAGE,
    page * PER_PAGE
  );

  const categories = [
    "All",
    "Hidden Gems",
    "Travel Tips",
    "Cultural Insights",
  ];

  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      {/* Header */}
      <h1 className="text-4xl font-black mb-2">Travel Blog</h1>
      <p className="opacity-70 mb-10">
        Local stories and hidden gems across Croatia.
      </p>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
        
        {/* LEFT — FILTERS */}
        <div className="flex flex-wrap gap-3">
          {categories.map((c) => {
            const active = c === (category ?? "All");

            const params = new URLSearchParams();
            if (c !== "All") params.set("category", c);
            if (sort !== "recent") params.set("sort", sort);

            return (
              <Link
                key={c}
                href={`/blog?${params.toString()}`}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  active
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                {c}
              </Link>
            );
          })}
        </div>

        {/* RIGHT — SORT */}
        <div className="flex gap-2">
          <Link
            href={`/blog?${category ? `category=${category}&` : ""}sort=recent`}
            className={`px-4 py-2 rounded-lg border font-medium ${
              sort === "recent"
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white hover:bg-gray-100"
            }`}
          >
            Most recent
          </Link>

          <Link
            href={`/blog?${category ? `category=${category}&` : ""}sort=oldest`}
            className={`px-4 py-2 rounded-lg border font-medium ${
              sort === "oldest"
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white hover:bg-gray-100"
            }`}
          >
            Oldest
          </Link>
        </div>

      </div>


      {/* Posts */}
      <div className="grid md:grid-cols-3 gap-8">
        {paginated.map((post: any) => (
          <Link
            key={post.sys.id}
            href={`/blog/${post.fields.slug}`}
            className="border rounded-xl overflow-hidden hover:shadow-lg transition"
          >
            {post.fields.coverImage?.fields?.file?.url && (
              <img
                src={`https:${post.fields.coverImage.fields.file.url}`}
                className="h-48 w-full object-cover"
                alt={post.fields.title}
              />
            )}

            <div className="p-4">
              <span className="text-xs text-blue-600 font-bold">
                {post.fields.category}
              </span>

              <p className="text-xs opacity-50 mt-1">
                {new Date(post.fields.publishedAt).toLocaleDateString()}
              </p>

              <h2 className="text-xl font-bold mt-1">
                {post.fields.title}
              </h2>

              <p className="opacity-70 text-sm mt-2">
                {post.fields.excerpt}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-3 mt-12">
        {page > 1 && (
          <Link
            href={`/blog?page=${page - 1}${
              category ? `&category=${category}` : ""
            }`}
            className="px-4 py-2 border rounded-lg"
          >
            ← Prev
          </Link>
        )}

        {page < totalPages && (
          <Link
            href={`/blog?page=${page + 1}${
              category ? `&category=${category}` : ""
            }`}
            className="px-4 py-2 border rounded-lg"
          >
            Next →
          </Link>
        )}
      </div>
    </main>
  );
}
