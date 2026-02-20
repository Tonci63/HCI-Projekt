"use client";

import { useState } from "react";
import { addComment } from "@/app/actions/blog-comments";
import { useRouter } from "next/navigation";
import { deleteComment } from "@/app/actions/blog-comments";

type Comment = {
  id: string;
  content: string;
  authorName: string;
  userId: string;
  createdAt: string;
};

export default function BlogComments({
  slug,
  initialComments,
  canComment,
  authorName,
  currentUserId,
}: {
  slug: string;
  initialComments: Comment[];
  canComment: boolean;
  authorName: string;
  currentUserId: string | null;
}) {
  const router = useRouter();
  const [comments, setComments] = useState(initialComments);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDelete = async (id: string) => {
    await deleteComment(id);

    setComments((prev) => prev.filter((c) => c.id !== id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!text.trim()) return;

    const newComment = {
      id: crypto.randomUUID(),
      content: text,
      authorName: authorName,
      userId: currentUserId ?? "unknown",
      createdAt: new Date().toISOString(),
    };

    // optimistic UI
    setComments((prev) => [newComment, ...prev]);

    await addComment(slug, text);

    setText("");
  };


  return (
    <section className="mt-16">
      <h3 className="text-xl font-bold mb-6">Comments</h3>

      {/* WRITE COMMENT */}
      {canComment ? (
        <div className="mb-8">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write your thoughts..."
            className="w-full border rounded-xl p-4 mb-3"
          />

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold"
          >
            {loading ? "Posting..." : "Post comment"}
          </button>
        </div>
      ) : (
        <div className="mb-8 border rounded-xl p-4 text-sm opacity-70">
          You must be logged in to comment.
        </div>
      )}

      {/* COMMENTS LIST */}
      <div className="space-y-4">
        {comments.length === 0 && (
          <p className="opacity-60">No comments yet.</p>
        )}

        {comments.map((c) => (
          <div key={c.id} className="border rounded-xl p-4">
            <div className="flex justify-between text-sm opacity-60 mb-2">
              <span className="font-semibold">{c.authorName}</span>
              {currentUserId === c.userId && (
                <button
                  onClick={() => handleDelete(c.id)}
                  className="text-xs text-red-500 hover:underline ml-2"
                >
                  Delete
                </button>
              )}
              <span>
                {new Date(c.createdAt).toLocaleDateString()}
              </span>
            </div>

            <p>{c.content}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
