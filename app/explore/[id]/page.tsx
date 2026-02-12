"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";

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

  useEffect(() => {
    const getAttraction = async () => {
      try {
        const res = await fetch(`${API_URL}/${params.id}`);
        if (res.ok) {
          const data = await res.json();
          setAttraction(data);
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

  if (loading) return <div style={{ textAlign: "center", padding: "50px" }}>Loading...</div>;
  if (!attraction) return <div style={{ textAlign: "center", padding: "50px" }}>Attraction not found.</div>;

  const isDark = theme === "dark";

  return (
    <div style={{ 
      backgroundColor: isDark ? "#1a1a1a" : "#ffffff", 
      color: isDark ? "#ffffff" : "#000000",
      minHeight: "100vh",
      transition: "background-color 0.3s ease"
    }}>
      <main className="container mx-auto px-6 py-12 max-w-5xl">
        <Link
          href="/explore"
          style={{ color: "#2563eb" }}
          className="inline-flex items-center hover:underline mb-8 text-lg font-medium"
        >
          <ArrowLeft className="mr-2 h-5 w-5" /> Back to Explore
        </Link>

        <h1 className="text-4xl font-bold mb-6">
          {attraction.name}
        </h1>

        <div className="relative w-full h-96 mb-8 shadow-lg rounded-xl overflow-hidden">
          <Image
            src={attraction.image}
            alt={attraction.name}
            fill
            className="object-cover"
            unoptimized // Dodaj ovo ako ti MockAPI slika ne radi
          />
        </div>

        <p className="text-lg mb-10 leading-relaxed opacity-80">
          {attraction.description}
        </p>

        <div className="grid md:grid-cols-2 gap-10">
          <div style={{ 
            backgroundColor: isDark ? "#262626" : "#f9f9f9", 
            border: `1px solid ${isDark ? "#333" : "#eee"}` 
          }} className="p-6 rounded-2xl">
            <h2 style={{ color: "#2563eb" }} className="text-2xl font-semibold mb-4">
              Travel Time
            </h2>
            <p className="mb-8">{attraction.travelTime}</p>

            <h2 style={{ color: "#2563eb" }} className="text-2xl font-semibold mb-4">
              Accessibility
            </h2>
            <p>{attraction.accessibility}</p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">Location</h2>
            <div className="rounded-xl overflow-hidden shadow-lg border h-96" style={{ borderColor: isDark ? "#333" : "#ccc" }}>
              <iframe
                width="100%"
                height="100%"
                frameBorder="0"
                src={`https://www.openstreetmap.org/export/embed.html?bbox=${
                  attraction.lng - 0.02
                }%2C${attraction.lat - 0.02}%2C${attraction.lng + 0.02}%2C${
                  attraction.lat + 0.02
                }&layer=mapnik&marker=${attraction.lat}%2C${attraction.lng}`}
                style={{ border: 0, filter: isDark ? "invert(90%) hue-rotate(180deg)" : "none" }}
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <button className="bg-green-600 text-white px-10 py-4 rounded-lg text-xl font-medium hover:bg-green-700 transition">
            Add to Itinerary
          </button>
        </div>
      </main>
    </div>
  );
}
