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
    order: sort === "oldest" ? ["fields.publishedAt"] : ["-fields.publishedAt"],
  });

  let posts = data.items;
  if (category && category !== "All") {
    posts = posts.filter((p: any) => p.fields.category === category);
  }

  const totalPages = Math.ceil(posts.length / PER_PAGE);
  const paginated = posts.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const categories = ["All", "Hidden Gems", "Travel Tips", "Cultural Insights"];

  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-500 pb-20">
      
      {/* NJEGOV ORIGINALNI HEADER */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-black mb-2 uppercase tracking-tighter">
          Travel Blog
        </h1>
        <p className="opacity-70 text-lg">
          Local stories and hidden gems across Croatia.
        </p>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-4">
        
        {/* FILTERS & SORT - Popravljeni hoveri i klase */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 mb-16">
          <div className="flex flex-wrap gap-3">
            {categories.map((c) => {
              const active = c === (category ?? "All");
              const queryParams = new URLSearchParams();
              if (c !== "All") queryParams.set("category", c);
              if (sort !== "recent") queryParams.set("sort", sort);

              return (
                <Link
                  key={c}
                  href={`/blog?${queryParams.toString()}`}
                  className={`px-5 py-2.5 rounded-lg font-bold text-[11px] uppercase tracking-widest transition-all duration-300 border ${
                    active
                      ? "bg-blue-600 text-white border-blue-600 shadow-md"
                      : "bg-transparent text-foreground border-foreground/10 hover:border-blue-600 hover:text-blue-600"
                  }`}
                >
                  {c}
                </Link>
              );
            })}
          </div>

          <div className="flex gap-2">
            <Link
              href={`/blog?${category ? `category=${category}&` : ""}sort=recent`}
              className={`px-4 py-2 rounded-xl border text-[10px] font-black uppercase transition-all duration-300 ${
                sort === "recent" 
                ? "bg-blue-600 text-white border-blue-600" 
                : "border-foreground/10 opacity-50 hover:opacity-100 hover:border-foreground/30 text-foreground"
              }`}
            >
              Most recent
            </Link>
            <Link
              href={`/blog?${category ? `category=${category}&` : ""}sort=oldest`}
              className={`px-4 py-2 rounded-xl border text-[10px] font-black uppercase transition-all duration-300 ${
                sort === "oldest" 
                ? "bg-blue-600 text-white border-blue-600" 
                : "border-foreground/10 opacity-50 hover:opacity-100 hover:border-foreground/30 text-foreground"
              }`}
            >
              Oldest
            </Link>
          </div>
        </div>

        {/* POSTS GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {paginated.map((post: any) => (
            <Link
              key={post.sys.id}
              href={`/blog/${post.fields.slug}`}
              className="group flex flex-col rounded-4xl overflow-hidden border border-foreground/10 transition-all duration-500 hover:shadow-2xl bg-background"
            >
              <div className="relative h-64 w-full overflow-hidden bg-foreground/5">
                {post.fields.coverImage?.fields?.file?.url && (
                  <img
                    src={`https:${post.fields.coverImage.fields.file.url}`}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
                    alt={post.fields.title}
                  />
                )}
                {/* EXPLORE STYLE BADGE - Prati temu */}
                <div className="absolute top-5 left-5">
                  <span className="px-3 py-1.5 bg-background/90 backdrop-blur-sm text-foreground border border-foreground/10 rounded-lg text-[9px] font-black uppercase tracking-widest shadow-sm">
                    {post.fields.category}
                  </span>
                </div>
              </div>

              <div className="p-8 flex flex-col flex-1">
                <p className="text-[10px] opacity-40 font-bold uppercase mb-3">
                   {new Date(post.fields.publishedAt).toLocaleDateString()}
                </p>
                <h2 className="text-2xl font-black leading-tight mb-4 group-hover:text-blue-600 transition-colors uppercase tracking-tighter">
                  {post.fields.title}
                </h2>
                <p className="opacity-60 text-sm leading-relaxed mb-8 line-clamp-3 text-foreground">
                  {post.fields.excerpt}
                </p>
                <div className="mt-auto pt-6 border-t border-foreground/5 flex items-center justify-between font-black uppercase text-[10px] tracking-widest">
                  Read Story <span className="text-blue-600 text-xl group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* PAGINACIJA - IDENTIČNA EXPLORE KODU */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-3 mt-16">
            {page > 1 && (
              <Link
                href={`/blog?page=${page - 1}${category ? `&category=${category}` : ""}${sort !== "recent" ? `&sort=${sort}` : ""}`}
                className="px-5 py-2.5 rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition font-black uppercase text-[11px] tracking-widest"
              >
                ← Previous
              </Link>
            )}

            <span className="px-5 py-2.5 rounded-lg bg-blue-600 text-white font-black text-[11px] tracking-widest shadow-md">
              {page} / {totalPages}
            </span>

            {page < totalPages && (
              <Link
                href={`/blog?page=${page + 1}${category ? `&category=${category}` : ""}${sort !== "recent" ? `&sort=${sort}` : ""}`}
                className="px-5 py-2.5 rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition font-black uppercase text-[11px] tracking-widest"
              >
                Next →
              </Link>
            )}
          </div>
        )}
      </div>
    </main>
  );
}