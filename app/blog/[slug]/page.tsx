import cms from "@/cms";
import { notFound } from "next/navigation";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Link from "next/link";
import { ArrowLeft, Calendar, User, Share2 } from "lucide-react";
import { getComments } from "@/app/actions/blog-comments";
import { getOptionalUser } from "@/app/actions/itinerary";
import BlogComments from "../_components/blog-comments";

export default async function BlogDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const data = await cms.getEntries({
    content_type: "blogPost",
    "fields.slug": slug,
    limit: 1,
  });

  const post = data.items[0];
  if (!post) return notFound();

  const comments = await getComments(slug);

  const uiComments = comments.map((c: any) => ({
    id: c.id,
    content: c.message,
    authorName: c.userName,
    userId: c.userId,
    createdAt: c.createdAt.toISOString(),
  }));

  const user = await getOptionalUser();
  const canComment = !!user;
  const authorName = user?.name ?? user?.email ?? "User";
  const currentUserId = user?.id ?? null;

  const fields: any = post.fields;

  return (
    // DODANO: bg-background i !bg-none da eliminiramo bilo kakav globalni overlay
    <main className="min-h-screen bg-background bg-none! text-foreground pb-32 transition-colors duration-500">
      
      {/* 1. PROGRESS BAR - Maknuta siva podloga skroz */}
      <div className="fixed top-0 left-0 w-full h-1 z-50 pointer-events-none">
        <div className="h-full bg-blue-600 dark:bg-blue-500 w-0 transition-all duration-150" id="progress-bar"></div>
      </div>

      {/* 2. TOP NAVIGATION - Ovdje je bio problem. Sad je !bg-transparent bez ikakvih wrappera */}
      <nav className="max-w-4xl mx-auto px-6 pt-16 flex justify-between items-center bg-transparent! border-none">
        <Link
          href="/blog"
          className="group inline-flex items-center text-[10px] font-black uppercase tracking-[0.3em] text-blue-700 dark:text-blue-500 hover:text-foreground transition-all"
        >
          <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-2" />
          Back to Blog
        </Link>
        
        <button className="text-foreground/40 hover:text-foreground transition-all p-2 bg-transparent!">
          <Share2 className="h-4 w-4" />
        </button>
      </nav>

      {/* 3. HERO HEADER */}
      <header className="max-w-3xl mx-auto px-6 pt-20 pb-12 text-center">
        <span className="text-blue-700 dark:text-blue-500 text-[10px] font-black uppercase tracking-[0.5em] mb-6 block">
          {fields.category}
        </span>
        <h1 className="text-4xl md:text-5xl font-black leading-[1.1] tracking-tight uppercase mb-8 text-balance">
          {fields.title}
        </h1>
        <div className="flex items-center justify-center gap-6 text-[10px] font-black uppercase tracking-widest opacity-40">
          <span className="flex items-center gap-2">
            <Calendar className="h-3.5 w-3.5" />
            {new Date(fields.publishedAt).toLocaleDateString("en-GB", { day: '2-digit', month: 'short', year: 'numeric' })}
          </span>
          <div className="w-1.5 h-1.5 rounded-full bg-blue-700 dark:bg-blue-500"></div>
          <span className="flex items-center gap-2">
            <User className="h-3.5 w-3.5" />
            {fields.authorName || "Essentia Team"}
          </span>
        </div>
      </header>

      {/* 4. HERO IMAGE - Smanjena i bez sivih bordera */}
      <section className="max-w-4xl mx-auto px-6 mb-20">
        {fields.coverImage?.fields?.file?.url && (
          <div className="relative aspect-16/8 md:aspect-21/9 w-full overflow-hidden rounded-4xl border border-foreground/5 shadow-2xl dark:shadow-none">
            <img
              src={`https:${fields.coverImage.fields.file.url}`}
              className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
              alt={fields.title}
            />
          </div>
        )}
      </section>

      {/* 5. ARTICLE BODY */}
      <article className="max-w-2xl mx-auto px-6 mb-32">
        <div className="prose prose-lg dark:prose-invert max-w-none 
          prose-p:text-[18px] prose-p:leading-[1.8] prose-p:text-foreground/80
          prose-headings:text-foreground prose-headings:font-black prose-headings:tracking-tighter prose-headings:uppercase
          prose-a:text-blue-700 dark:prose-a:text-blue-500
          prose-blockquote:border-l-4 prose-blockquote:border-blue-700 dark:prose-blockquote:border-blue-500 prose-blockquote:bg-blue-700/5 prose-blockquote:p-8 prose-blockquote:rounded-r-[32px]">
          {documentToReactComponents(fields.body)}
        </div>
      </article>

      {/* 6. COMMENTS SECTION */}
      <section className="max-w-3xl mx-auto px-6">
        <div className="p-8 md:p-12 rounded-[40px] bg-foreground/2 border border-foreground/5 shadow-inner">
          <BlogComments
            slug={slug}
            initialComments={uiComments}
            canComment={canComment}
            authorName={authorName}
            currentUserId={currentUserId}
          />
        </div>
      </section>
    </main>
  );
}