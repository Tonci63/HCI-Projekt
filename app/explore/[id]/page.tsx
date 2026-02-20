"use client";

import Link from "next/link";
import { ArrowLeft, CheckCircle } from "lucide-react";
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
};

export default function AttractionDetail() {
  const params = useParams();
  const [attraction, setAttraction] = useState<Attraction | null>(null);
  const [theme, setTheme] = useState("light");
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);

  const { showModal, setShowModal, requireAuth } = useAuthGate();

  useEffect(() => {
    const getAttraction = async () => {
      try {
        const res = await fetch(`${API_URL}/${params.id}`);
        if (res.ok) {
          const data = await res.json();
          setAttraction(data);

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
    return (
      <div className="text-center py-20 text-xl font-medium">
        Loading details...
      </div>
    );

  if (!attraction)
    return (
      <div className="text-center py-20 text-xl font-medium">
        Attraction not found.
      </div>
    );

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
            style={{ color: "#2563eb" }}
            className="inline-flex items-center hover:underline mb-8 text-lg font-medium"
          >
            <ArrowLeft className="mr-2 h-5 w-5" /> Back to Explore
          </Link>

          <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            {attraction.name}
          </h1>

          <div className="relative w-full h-72 md:h-[500px] mb-8 shadow-2xl rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800">
            <Image
              src={attraction.image}
              alt={attraction.name}
              fill
              className="object-cover"
              unoptimized
            />
          </div>

          <div className="flex flex-col lg:flex-row gap-12 mt-10">
            {/* LEFT */}
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

            {/* RIGHT */}
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
                    className="block text-center mt-4 text-blue-500 font-medium hover:underline"
                  >
                    View my plan →
                  </Link>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* AUTH MODAL */}
      <AuthRequiredModal
        open={showModal}
        onClose={() => setShowModal(false)}
      />
    </>
  );
}
