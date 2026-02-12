"use client";

import { useState } from "react";
import ReviewsSection from "./Reviews";

const BLOG_POSTS = [
  {
    id: 1,
    title: "5 Hidden Gems in Istria You Must Visit",
    category: "Hidden Gems",
    rating: 4.8,
    date: "2024-05-10",
    excerpt: "Beyond Rovinj and Pula, Istria hides medieval hilltop towns and secret coves...",
  },
  {
    id: 2,
    title: "Traditional Croatian Dishes to Try This Summer",
    category: "Cultural Insights",
    rating: 4.5,
    date: "2024-05-12",
    excerpt: "From Peka to Crni Rižot, explore the rich flavors of the Adriatic coast...",
  },
  {
    id: 3,
    title: "Solo Traveler's Guide to Dubrovnik",
    category: "Travel Tips",
    rating: 4.9,
    date: "2024-05-15",
    excerpt: "Is Dubrovnik safe for solo travelers? Here is everything you need to know...",
  },
];

export default function BlogPage() {
  const [filter, setFilter] = useState("All");
  const [sortBy, setSortBy] = useState("recent"); // Stanje za sortiranje

  // Logika koja kombinira filtriranje i sortiranje
  const filteredAndSortedPosts = BLOG_POSTS
    .filter((post) => filter === "All" || post.category === filter)
    .sort((a, b) => {
      if (sortBy === "highest") return b.rating - a.rating; // Od najveće ocjene
      if (sortBy === "recent") return new Date(b.date).getTime() - new Date(a.date).getTime(); // Od najnovijeg datuma
      return 0;
    });

  return (
    <div className="min-h-screen bg-white">
      {/* HEADER */}
      <section className="bg-gray-900 py-20 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
            Latest Updates
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-white mt-6 mb-4 uppercase tracking-tighter">
            Travel Blog
          </h1>
          <p className="text-gray-400 text-lg">
            Local stories and hidden gems across Croatia.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-12">
        
        {/* FILTER & SORT BAR */}
        <div className="flex flex-col md:flex-row justify-between items-center pb-8 mb-12 border-b gap-6">
          
          {/* Kategorije */}
          <div className="flex gap-3 overflow-x-auto w-full md:w-auto">
            {["All", "Hidden Gems", "Cultural Insights", "Travel Tips"].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 rounded-full text-xs font-black uppercase transition whitespace-nowrap ${
                  filter === cat 
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-100" 
                    : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sortiranje - OVO JE FALILO */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Sort by:</span>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-gray-50 border border-gray-200 text-xs font-bold p-2 px-4 rounded-xl outline-none focus:ring-2 focus:ring-blue-600 cursor-pointer"
            >
              <option value="recent">Most Recent</option>
              <option value="highest">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* LISTA BLOGOVA */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-24">
          {filteredAndSortedPosts.map((post) => (
            <article key={post.id} className="group cursor-pointer">
              <div className="aspect-video w-full mb-6 bg-gray-50 rounded-2xl flex items-center justify-center border border-gray-100 group-hover:border-blue-200 transition-colors">
                <span className="text-gray-300 font-bold uppercase text-[10px] tracking-widest italic">Image Preview</span>
              </div>
              
              <div className="flex items-center justify-between mb-2">
                <span className="text-blue-600 text-[10px] font-black uppercase tracking-widest">
                  {post.category}
                </span>
                <span className="text-blue-600 font-bold text-xs">★ {post.rating}</span>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                {post.title}
              </h2>
              
              <p className="text-gray-500 text-sm line-clamp-2 mb-6">
                {post.excerpt}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                <span className="text-gray-400 text-[10px] font-bold uppercase">{post.date}</span>
                <span className="text-gray-900 font-black text-xs uppercase group-hover:text-blue-600 transition-colors">
                  Read More →
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* REVIEWS SEKCIJA */}
        <div className="max-w-4xl border-t border-gray-100 pt-16">
          <ReviewsSection />
        </div>
      </div>
    </div>
  );
}