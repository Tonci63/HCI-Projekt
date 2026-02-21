"use client";

import { useState } from "react";
import { addComment, deleteComment } from "@/app/actions/blog-comments";

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
  const [comments, setComments] = useState(initialComments);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDelete = async (id: string) => {
    try {
      await deleteComment(id);
      setComments((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      console.error("Error deleting comment");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || loading) return;

    setLoading(true);
    const newCommentId = crypto.randomUUID();
    
    const newComment = {
      id: newCommentId,
      content: text,
      authorName: authorName,
      userId: currentUserId ?? "unknown",
      createdAt: new Date().toISOString(),
    };

    setComments((prev) => [newComment, ...prev]);
    const savedText = text;
    setText("");
    
    try {
      await addComment(slug, savedText);
    } catch (err) {
      setComments(initialComments);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mt-10">
      
      {/* HEADER - Čisti plavi badge za broj komentara */}
      <div className="flex items-center gap-4 mb-10">
        <h3 className="text-2xl font-black uppercase tracking-tighter text-foreground">
          Comments
        </h3>
        <div className="h-7 w-7 rounded-full bg-blue-700 flex items-center justify-center shadow-[0_4px_12px_rgba(29,78,216,0.3)]">
          <span className="text-white text-[10px] font-black">
            {comments.length}
          </span>
        </div>
      </div>

      {canComment ? (
        <div className="mb-14">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full bg-foreground/3 border-2 border-foreground/10 rounded-4xl p-7 mb-4 text-foreground outline-none transition-all duration-500 focus:bg-background focus:border-blue-700 focus:ring-8 focus:ring-blue-700/5 resize-none min-h-[150px] placeholder:opacity-20"
            placeholder="Write your comment..."
          />
          
          <div className="flex justify-end">
            <button
              onClick={handleSubmit}
              disabled={loading || !text.trim()}
              className={`
                px-10 py-4 rounded-full font-black uppercase text-[10px] tracking-[0.2em] transition-all duration-500
                ${loading || !text.trim() 
                  ? "bg-foreground/10 text-foreground/30 cursor-not-allowed" 
                  : "bg-blue-700 text-white hover:bg-blue-800 hover:px-12 hover:shadow-[0_15px_30px_-5px_rgba(29,78,216,0.4)] active:scale-95 shadow-lg shadow-blue-700/20"
                }
              `}
            >
              {loading ? "Posting..." : "Post Comment"}
            </button>
          </div>
        </div>
      ) : (
        <div className="mb-14 p-10 border-2 border-dashed border-foreground/10 rounded-4xl bg-foreground/1 text-center">
          <p className="opacity-40 text-[9px] font-black uppercase tracking-[0.4em]">
            Sign in to leave a comment.
          </p>
        </div>
      )}

      {/* LISTA KOMENTARA */}
      <div className="space-y-6">
        {comments.map((c) => (
          <div 
            key={c.id} 
            className="group p-7 rounded-4xl border border-foreground/5 bg-foreground/1 hover:bg-background hover:border-blue-700/20 hover:shadow-xl transition-all duration-500"
          >
            <div className="flex justify-between items-start mb-5">
              <div className="flex items-center gap-4">
                {/* Avatar koji se lagano rotira na hover cijele kartice */}
                <div className="w-11 h-11 rounded-2xl bg-blue-700 text-white flex items-center justify-center font-black text-sm shadow-lg transform group-hover:rotate-6 transition-transform">
                  {c.authorName[0]}
                </div>
                <div>
                  <span className="block text-blue-700 font-black uppercase text-[11px] tracking-widest mb-0.5">
                    {c.authorName}
                  </span>
                  <span className="text-[9px] opacity-30 font-bold uppercase">
                    {new Date(c.createdAt).toLocaleDateString("en-GB", { day: '2-digit', month: 'short' })}
                  </span>
                </div>
              </div>

              {currentUserId === c.userId && (
                <button 
                  onClick={() => handleDelete(c.id)} 
                  className="text-[9px] font-black uppercase tracking-widest text-red-600/40 hover:text-red-600 transition-all opacity-0 group-hover:opacity-100"
                >
                  Delete
                </button>
              )}
            </div>
            <p className="text-foreground/80 text-[16px] leading-[1.7] pl-1 group-hover:text-foreground transition-colors">
              {c.content}
            </p>
          </div>
        ))}
        
        {comments.length === 0 && (
          <p className="text-center opacity-20 text-xs italic py-10 tracking-widest uppercase">No comments yet</p>
        )}
      </div>
    </section>
  );
}