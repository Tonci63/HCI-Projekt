import cms from "@/cms";
import { notFound } from "next/navigation";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
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

  const uiComments = comments.map((c) => ({
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
    <main className="max-w-3xl mx-auto px-6 py-12">
      <Link
        href="/blog"
        className="inline-flex items-center hover:underline mb-6 text-lg font-medium text-blue-600"
        >
        <ArrowLeft className="mr-2 h-5 w-5" />
        Back
      </Link> 
      
      {/* Cover */}
      {fields.coverImage?.fields?.file?.url && (
        <img
          src={`https:${fields.coverImage.fields.file.url}`}
          className="w-full h-[420px] object-cover rounded-2xl mb-8"
          alt={fields.title}
        />
      )}

      {/* Category */}
      <span className="text-sm text-blue-600 font-bold">
        {fields.category}
      </span>

      {/* Title */}
      <h1 className="text-4xl font-black mt-2 mb-4">
        {fields.title}
      </h1>

      {/* Meta */}
      <div className="flex gap-4 text-sm opacity-60 mb-10">
        <span>
          {new Date(fields.publishedAt).toLocaleDateString()}
        </span>
        {fields.authorName && <span>• {fields.authorName}</span>}
      </div>

      {/* Body */}
      <article className="prose max-w-none">
      {documentToReactComponents(fields.body)}
      </article>

      <BlogComments
        slug={slug}
        initialComments={uiComments}
        canComment={canComment}
        authorName={authorName}
        currentUserId={currentUserId}
        />
    </main>
  );
}
