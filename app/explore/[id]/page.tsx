"use client";

import Link from "next/link";
import { ArrowLeft, CheckCircle, Star } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useAuthGate } from "@/app/_hooks/use-auth-gate";
import { AuthRequiredModal } from "@/app/_components/auth-required-modal";
import { addAttractionToUserItinerary } from "@/app/actions/itinerary";

const API_URL = "https://6942e05d69b12460f313226c.mockapi.io/attractions";

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
  rating?: number;
  reviews?: number;
  cost?: number; 
};

export default function AttractionDetail() {
  const params = useParams();
  const [attraction, setAttraction] = useState<Attraction | null>(null);
  const [theme, setTheme] = useState("light");
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const { showModal, setShowModal, requireAuth } = useAuthGate();

  useEffect(() => {
    const getAttraction = async () => {
      try {
        const res = await fetch(`${API_URL}/${params.id}`);
        if (res.ok) {
          const data = await res.json();
          setAttraction(data);

          const savedFavs = JSON.parse(localStorage.getItem("favorites") || "[]");
          setIsFavorite(savedFavs.includes(Number(params.id)));

          try {
            const res = await fetch(`/api/check-attraction-saved?id=${data.id}`);
            if (res.ok) {
              const result = await res.json();
              setAdded(result.saved);
            }
          } catch (err) {
            console.error("Error checking saved state:", err);
          }
        }
      } catch (err) {
        console.error("Error fetching:", err);
      } finally {
        setLoading(false);
      }
    };

    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);

    const handleStorage = () => {
      setTheme(localStorage.getItem("theme") || "light");
    };

    getAttraction();
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [params.id]);

  const toggleFavorite = () => {
    const favs = JSON.parse(localStorage.getItem("favorites") || "[]") as number[];
    const id = Number(params.id);
    let updated;
    
    if (favs.includes(id)) {
      updated = favs.filter(f => f !== id);
      setIsFavorite(false);
    } else {
      updated = [...favs, id];
      setIsFavorite(true);
    }
    
    localStorage.setItem("favorites", JSON.stringify(updated));
    window.dispatchEvent(new Event("storage"));
  };

  const renderCost = (cost: number = 1) => {
    return (
      <div className="flex items-center ml-4 border-l pl-4 dark:border-gray-700 border-gray-200">
        {[1, 2, 3].map((step) => (
          <span
            key={step}
            style={{ 
              color: step <= cost ? "#16a34a" : (theme === "dark" ? "#444" : "#d1d5db"),
              fontSize: "1.1rem",
              fontWeight: "900",
              marginRight: "2px"
            }}
          >
            $
          </span>
        ))}
        <span className="ml-2 text-xs font-bold opacity-50 uppercase tracking-wider">
          {cost === 1 ? "Budget" : cost === 2 ? "Moderate" : "Luxury"}
        </span>
      </div>
    );
  };

  const addToItinerary = async () => {
    if (!attraction) return;
    try {
      await addAttractionToUserItinerary({
        id: String(attraction.id),
        name: attraction.name,
        image: attraction.image,
        travelTime: attraction.travelTime,
        lat: attraction.lat,
        lng: attraction.lng,
      });
      setAdded(true);
    } catch (err) {
      console.error("Error saving to DB:", err);
    }
  };

  const handleAddClick = () => {
    requireAuth(() => {
      addToItinerary();
    });
  };

  if (loading)
    return <div className="text-center py-20 text-xl font-medium tracking-tight">Loading details...</div>;

  if (!attraction)
    return <div className="text-center py-20 text-xl font-medium">Attraction not found.</div>;

  const isDark = theme === "dark";

  return (
    <>
      <div
        style={{
          backgroundColor: isDark ? "#1a1a1a" : "#ffffff",
          color: isDark ? "#ffffff" : "#000000",
          minHeight: "100vh",
          transition: "background-color 0.3s ease",
        }}
      >
        <main className="container mx-auto px-6 py-12 max-w-5xl">
          <Link
            href="/explore"
            className="group inline-flex items-center mb-8 px-5 py-2.5 rounded-xl text-lg font-bold transition-all duration-300"
            style={{ 
              color: "#2563eb",
              backgroundColor: isDark ? "rgba(37, 99, 235, 0.1)" : "rgba(37, 99, 235, 0.05)"
            }}
          >
            <ArrowLeft className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:-translate-x-2" /> 
            Back to Explore
          </Link>

          {/* NASLOV + FAVORITE GUMB S LABELOM */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              {attraction.name}
            </h1>
            
            <div className="flex items-center gap-3 self-end md:self-auto">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 text-right leading-none">
                {isFavorite ? "Saved to\nfavorites" : "Add to\nfavorites"}
              </span>
              <button 
                onClick={toggleFavorite}
                className="group relative p-3 rounded-full transition-all duration-300 active:scale-90"
              >
                <div className={`absolute inset-0 rounded-full transition-all duration-500 blur-xl opacity-0 group-hover:opacity-40 ${
                  isFavorite ? "bg-yellow-400" : "bg-blue-400"
                }`} />
                
                <Star 
                  className={`h-9 w-9 relative z-10 transition-all duration-500 ease-out 
                    ${isFavorite 
                      ? "fill-yellow-400 text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.6)]" 
                      : "text-gray-400 group-hover:text-yellow-400/80 group-hover:rotate-12 group-hover:scale-125"
                    }`} 
                />
              </button>
            </div>
          </div>

          <div className="flex items-center flex-wrap gap-y-4 mb-8">
            {attraction.rating && (
              <div className="flex items-center">
                <div className="flex items-center bg-yellow-400/10 px-3 py-1 rounded-full">
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1.5" />
                  <span className="font-bold text-yellow-600 dark:text-yellow-500">
                    {attraction.rating}
                  </span>
                </div>
                <span className="ml-2 text-sm opacity-60">
                  ({attraction.reviews?.toLocaleString()} reviews)
                </span>
              </div>
            )}
            {renderCost(attraction.cost)}
          </div>

          <div className="relative w-full h-72 md:h-[500px] mb-8 shadow-2xl rounded-3xl overflow-hidden border border-gray-200 dark:border-gray-800">
            <Image
              src={attraction.image}
              alt={attraction.name}
              fill
              className="object-cover"
              unoptimized
            />
          </div>

          <div className="flex flex-col lg:flex-row gap-12 mt-10">
            <div className="lg:w-2/3">
              <h2 className="text-2xl font-bold mb-4 text-blue-600">
                About this destination
              </h2>
              <p className="text-lg mb-10 leading-relaxed opacity-90">
                {attraction.description}
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div
                  style={{
                    backgroundColor: isDark ? "#262626" : "#f9f9f9",
                    border: `1px solid ${isDark ? "#333" : "#eee"}`,
                  }}
                  className="p-6 rounded-2xl shadow-sm"
                >
                  <h3 className="text-xl font-bold mb-3 text-blue-600">
                    Travel Time
                  </h3>
                  <p className="text-lg">{attraction.travelTime}</p>
                </div>

                <div
                  style={{
                    backgroundColor: isDark ? "#262626" : "#f9f9f9",
                    border: `1px solid ${isDark ? "#333" : "#eee"}`,
                  }}
                  className="p-6 rounded-2xl shadow-sm"
                >
                  <h3 className="text-xl font-bold mb-3 text-blue-600">
                    Accessibility
                  </h3>
                  <p className="text-lg">{attraction.accessibility}</p>
                </div>
              </div>
            </div>

            <div className="lg:w-1/3">
              <h2 className="text-2xl font-bold mb-4">Location</h2>
              <div
                className="rounded-2xl overflow-hidden shadow-lg border h-80 relative"
                style={{ borderColor: isDark ? "#444" : "#ccc" }}
              >
                <iframe
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  src={`https://www.openstreetmap.org/export/embed.html?bbox=${
                    attraction.lng - 0.02
                  }%2C${attraction.lat - 0.02}%2C${attraction.lng + 0.02}%2C${
                    attraction.lat + 0.02
                  }&layer=mapnik&marker=${attraction.lat}%2C${attraction.lng}`}
                  style={{
                    border: 0,
                    filter: isDark
                      ? "invert(90%) hue-rotate(180deg)"
                      : "none",
                  }}
                  allowFullScreen
                />
              </div>

              <div className="mt-8">
                <button
                  onClick={handleAddClick}
                  disabled={added}
                  className={`w-full py-4 rounded-xl text-xl font-bold transition-all shadow-lg flex items-center justify-center gap-2 ${
                    added
                      ? "bg-gray-500 cursor-not-allowed text-white"
                      : "bg-green-600 hover:bg-green-700 text-white hover:scale-[1.02]"
                  }`}
                >
                  {added ? (
                    <>
                      <CheckCircle className="h-6 w-6" /> Added to Itinerary
                    </>
                  ) : (
                    "Add to Itinerary"
                  )}
                </button>

                {added && (
                  <Link
                    href="/itineraries"
                    className="group flex items-center justify-center mt-6 text-blue-500 font-bold text-lg transition-all duration-300"
                  >
                    <span className="relative">
                      View my plan
                      <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-500 scale-x-0 transition-transform duration-300 group-hover:scale-x-100 origin-left"></span>
                    </span>
                    <span className="ml-2 transition-transform duration-300 group-hover:translate-x-2">→</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>

      <AuthRequiredModal
        open={showModal}
        onClose={() => setShowModal(false)}
      />
    </>
  );
}