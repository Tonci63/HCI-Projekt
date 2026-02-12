"use client";

import { useState } from "react";

type Review = {
  id: number;
  user: string;
  rating: number;
  comment: string;
  date: string;
  isTip?: boolean;
};

export default function ReviewsSection() {
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(0); // Stanje za hover efekt zvjezdica
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: 1,
      user: "Ivan Horvat",
      rating: 5,
      comment: "Genijalan tekst! Svakako posjetite unutrašnjost Istre, tartufi su nevjerojatni.",
      date: "2024-05-14",
      isTip: true,
    },
    {
      id: 2,
      user: "Ana K.",
      rating: 4,
      comment: "Korisni savjeti, hvala na infu!",
      date: "2024-05-15",
    }
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    const newReview: Review = {
      id: Date.now(),
      user: "Guest User",
      rating,
      comment,
      date: new Date().toISOString().split('T')[0],
      isTip: comment.length > 60,
    };

    setReviews([newReview, ...reviews]);
    setComment("");
    setRating(5);
  };

  return (
    <section className="mt-20 pt-16 border-t border-gray-100">
      <div className="flex items-center gap-4 mb-10">
        <h3 className="text-3xl font-black text-gray-900 uppercase tracking-tighter">
          Community Feedback
        </h3>
        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold">
          {reviews.length} Reviews
        </span>
      </div>

      {/* FORM ZA UNOS */}
      <div className="bg-white rounded-3xl p-8 mb-16 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
        <h4 className="text-lg font-bold text-gray-900 mb-6">How was your experience?</h4>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* INTERAKTIVNE ZVJEZDICE */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Your Rating</span>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                  onClick={() => setRating(star)}
                  className="text-3xl transition-all duration-200 transform hover:scale-125 focus:outline-none"
                >
                  <span className={`
                    ${(hover || rating) >= star ? "text-blue-600" : "text-gray-200"}
                  `}>
                    ★
                  </span>
                </button>
              ))}
              <span className="ml-3 self-center text-sm font-bold text-blue-600">
                {hover || rating} / 5
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Your Review</span>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share a travel tip or your thoughts on this article..."
              className="w-full p-5 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-50 transition-all outline-none text-gray-700 h-32"
            />
          </div>

          <button
            type="submit"
            className="w-full md:w-auto bg-blue-600 text-white px-10 py-4 rounded-2xl font-bold hover:bg-blue-700 hover:-translate-y-1 transition-all active:scale-95 shadow-lg shadow-blue-200"
          >
            Submit Review
          </button>
        </form>
      </div>

      {/* LISTA REVIJEVA */}
      <div className="grid gap-6">
        {reviews.map((rev) => (
          <div 
            key={rev.id} 
            className={`group p-8 rounded-3xl border transition-all duration-300 ${
              rev.isTip ? "border-blue-100 bg-blue-50/20" : "border-gray-100 bg-white hover:border-blue-200"
            }`}
          >
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center font-bold text-gray-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  {rev.user.charAt(0)}
                </div>
                <div>
                  <span className="block font-bold text-gray-900">{rev.user}</span>
                  <span className="text-xs text-gray-400">{rev.date}</span>
                </div>
              </div>
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={i < rev.rating ? "text-blue-600 text-lg" : "text-gray-200 text-lg"}>
                    ★
                  </span>
                ))}
              </div>
            </div>
            
            <p className="text-gray-600 leading-relaxed text-sm md:text-base">
              {rev.comment}
            </p>

            {rev.isTip && (
              <div className="mt-6 flex items-center gap-2">
                <span className="bg-blue-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter">
                  Pro Tip
                </span>
                <span className="text-blue-600 text-xs font-bold">Very helpful</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}