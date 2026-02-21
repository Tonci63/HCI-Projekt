"use client";

import Link from "next/link";
import { saveRecommendedTrip } from "@/app/actions/itinerary";
import { useRouter } from "next/navigation";
import { deleteSavedTrip } from "@/app/actions/itinerary";
import { deleteSavedLocation } from "@/app/actions/itinerary";
import { useState, useEffect } from "react";

interface Attraction {
  id: string;
  attractionId: string;
  name: string;
  image: string;
  travelTime: string;
  isPriority: boolean | null;
  lat?: string | null;
  lng?: string | null;
}

interface SavedTrip {
  id: string;
  tripId: string;
  title: string;
  image: string;
}

export default function ItinerariesClient({
  attractions,
  trips,
  locked,
}: {
  attractions: Attraction[];
  trips: SavedTrip[];
  locked: boolean;
}) {
  const router = useRouter();
  const [theme, setTheme] = useState<string>("light");

  useEffect(() => {
    const syncData = () => {
      setTheme(localStorage.getItem("theme") || "light");
    };
    syncData();
    window.addEventListener("storage", syncData);
    return () => window.removeEventListener("storage", syncData);
  }, []);

  const isDark = theme === "dark";

  const suggestedTrips = [
    { id: "1", title: "Solo Explorer", image: "/solo.jpg" },
    { id: "2", title: "Family Trip", image: "/family2.avif" },
    { id: "3", title: "Senior Friendly", image: "/senior3.jpg" },
  ];

  const handleSaveTrip = async (trip: any) => {
    await saveRecommendedTrip(trip);
    router.refresh();
  };

  const handleDeleteTrip = async (id: string) => {
    await deleteSavedTrip(id);
    router.refresh();
  };

  const handleDeleteLocation = async (id: string) => {
    await deleteSavedLocation(id);
    router.refresh();
  };

  const CITY_CENTERS = {
    Zagreb: { lat: 45.815, lng: 15.9819 },
    Split: { lat: 43.5081, lng: 16.4402 },
    Dubrovnik: { lat: 42.6507, lng: 18.0944 },
    Zadar: { lat: 44.1194, lng: 15.2314 },
    Pula: { lat: 44.8666, lng: 13.8496 },
    Rijeka: { lat: 45.3271, lng: 14.4422 },
  };

  const distanceKm = (lat1: number, lng1: number, lat2: number, lng2: number) => {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLng = ((lng2 - lng1) * Math.PI) / 180;
    const a = Math.sin(dLat / 2) ** 2 + Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
    return 2 * R * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  };

  const analyzePlan = () => {
    if (!attractions || attractions.length === 0) return null;
    
    const counts: Record<string, number> = {};
    let maxDistance = 0;
    
    attractions.forEach((a, i) => {
      let closest = "Coastal Region";
      let minD = Infinity;
      if (a.lat && a.lng) {
        for (const [city, center] of Object.entries(CITY_CENTERS)) {
          const d = distanceKm(Number(a.lat), Number(a.lng), center.lat, center.lng);
          if (d < minD) { minD = d; closest = city; }
        }
        if (i > 0 && attractions[0].lat && attractions[0].lng) {
          const dFromStart = distanceKm(Number(attractions[0].lat), Number(attractions[0].lng), Number(a.lat), Number(a.lng));
          if (dFromStart > maxDistance) maxDistance = dFromStart;
        }
      }
      counts[closest] = (counts[closest] || 0) + 1;
    });

    const needsWarning = maxDistance > 250;
    const mostFrequentCity = Object.entries(counts).reduce((a, b) => (a[1] > b[1] ? a : b))[0];
    const bestBase = attractions.length <= 2 && !needsWarning ? "No stay needed" : mostFrequentCity;

    const type = bestBase === "No stay needed" ? "One Day Trip" : attractions.length <= 5 ? "Weekend" : "Vacation";
    const intensity = attractions.length > 6 ? "Busy Schedule 🏃" : "Relaxed Pace ☕";
    
    let persona = "The Balanced Explorer";
    if (attractions.length > 5) persona = "Hardcore Backpacker 🎒";

    return { bestBase, type, intensity, persona, needsWarning };
  };

  const stats = analyzePlan();

  return (
    <div style={{ 
      backgroundColor: isDark ? "#121212" : "#ffffff", 
      color: isDark ? "#ffffff" : "#1e293b", 
      minHeight: "100vh", 
      transition: "background-color 0.3s ease",
      filter: locked ? "blur(4px)" : "none",
      pointerEvents: locked ? "none" : "auto"
    }}>
      <header style={{ padding: "3rem 1rem", textAlign: "center", borderBottom: `1px solid ${isDark ? "#222" : "#f1f5f9"}` }}>
        <h1 style={{ fontSize: "2.2rem", fontWeight: "900", letterSpacing: "-1px" }}>ADVENTURE PLANNER</h1>
        <p style={{ fontSize: "1rem", opacity: 0.7 }}>Organize your spots and explore travel routes.</p>
      </header>

      <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "2.5rem 1.5rem" }}>
        
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "800" }}>Recommended for you</h2>
          <div className="badge-weekly">
            <span className="dot-container">
              <span className="dot-ping"></span>
              <span className="dot-main"></span>
            </span>
            <span style={{ fontSize: "0.75rem", fontWeight: "900", color: "#3b82f6" }}>UPDATED WEEKLY</span>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem", marginBottom: "5rem" }}>
          {suggestedTrips.map(trip => {
            const isSaved = trips.some(t => t.title === trip.title);
            return (
              <div key={trip.id} className="suggested-card-v2" style={{ 
                backgroundColor: isDark ? "#1e1e1e" : "#ffffff", 
                borderRadius: "24px", overflow: "hidden", border: `1px solid ${isDark ? "#333" : "#e2e8f0"}`, position: "relative"
              }}>
                <div style={{ position: "absolute", top: "15px", left: "15px", zIndex: 10, background: "rgba(255,255,255,0.9)", padding: "4px 10px", borderRadius: "10px", fontSize: "0.65rem", fontWeight: "bold", color: "#2563eb" }}>✓ VERIFIED</div>
                <div style={{ height: "180px", overflow: "hidden" }}>
                  <img className="zoom-img-v2" src={trip.image} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <div style={{ padding: "1.5rem", textAlign: "center" }}>
                  <h3 style={{ fontWeight: "800", fontSize: "1.2rem", marginBottom: "1.2rem" }}>{trip.title}</h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    <Link href={`/itineraries/${trip.id}`} style={{ backgroundColor: "#2563eb", color: "white", padding: "12px", borderRadius: "14px", textDecoration: "none", fontWeight: "bold", fontSize: "0.9rem" }}>View Details</Link>
                    <button onClick={() => !isSaved && handleSaveTrip(trip)} disabled={isSaved} className="btn-save" style={{ border: isSaved ? "2px solid #94a3b8" : "2px solid #16a34a", color: isSaved ? "#94a3b8" : "#16a34a", padding: "10px", borderRadius: "14px", background: "transparent", cursor: isSaved ? "default" : "pointer", fontWeight: "bold", fontSize: "0.9rem", opacity: isSaved ? 0.7 : 1 }}>
                      {isSaved ? "✓ Saved Trip" : "Save Trip"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ backgroundColor: isDark ? "#1a1a1a" : "#f8fafc", borderRadius: "40px", padding: "3rem", border: `1px solid ${isDark ? "#262626" : "#e2e8f0"}` }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "3.5rem" }}>
            
            <section>
              <h3 style={{ borderBottom: "3px solid #2563eb", paddingBottom: "10px", marginBottom: "1.5rem", fontWeight: "800" }}>Locations Schedule</h3>
              
              {stats ? (
                <div style={{ 
                  backgroundColor: isDark ? "#2563eb08" : "#f0f7ff", 
                  borderRadius: "24px", padding: "1.5rem", marginBottom: "2.5rem", 
                  border: `1px solid ${isDark ? "#2563eb20" : "#e0f0ff"}`,
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                    <span style={{ fontSize: "0.65rem", fontWeight: "900", color: "#2563eb" }}>PLANNER INTELLIGENCE</span>
                    <span style={{ fontSize: "0.65rem", fontWeight: "900", opacity: 0.5 }}>{stats.intensity}</span>
                  </div>
                  
                  <div style={{ marginBottom: "15px" }}>
                    <p style={{ fontSize: "0.6rem", fontWeight: "900", opacity: 0.5 }}>TRAVEL PERSONA</p>
                    <p style={{ fontSize: "1.1rem", fontWeight: "900" }}>{stats.persona}</p>
                  </div>

                  <div style={{ height: "1px", backgroundColor: isDark ? "#333" : "#ddd", marginBottom: "15px" }}></div>
                  
                  <div style={{ display: "flex", justifyContent: "space-between", gap: "10px" }}>
                    <div>
                      <p style={{ fontSize: "0.6rem", fontWeight: "900", opacity: 0.5 }}>STAY AT</p>
                      <p style={{ fontSize: "0.85rem", fontWeight: "800" }}>{stats.bestBase === "No stay needed" ? "🚶 " + stats.bestBase : "📍 " + stats.bestBase}</p>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <p style={{ fontSize: "0.6rem", fontWeight: "900", opacity: 0.5 }}>TRIP TYPE</p>
                      <p style={{ fontSize: "0.85rem", fontWeight: "800" }}>{stats.type} 🌍</p>
                    </div>
                  </div>

                  {stats.needsWarning && (
                    <div style={{ 
                      marginTop: "15px", padding: "12px", backgroundColor: isDark ? "rgba(37, 99, 235, 0.1)" : "#eff6ff", 
                      borderRadius: "16px", display: "flex", gap: "10px", alignItems: "center", border: `1px solid ${isDark ? "#2563eb30" : "#bfdbfe"}` 
                    }}>
                      <span style={{ fontSize: "1.1rem" }}>📍</span>
                      <p style={{ fontSize: "0.7rem", color: isDark ? "#93c5fd" : "#1e40af", fontWeight: "600", margin: 0 }}>
                        <b>Note:</b> These spots are quite far apart. We recommend a stay for a better experience!
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div style={{ 
                  backgroundColor: isDark ? "#2563eb05" : "#f8fafc", 
                  borderRadius: "24px", padding: "1.5rem", marginBottom: "2.5rem", 
                  border: `2px dashed ${isDark ? "#333" : "#e2e8f0"}`,
                  textAlign: "center"
                }}>
                  <p style={{ fontSize: "0.8rem", fontWeight: "700", color: "#2563eb", marginBottom: "5px" }}>READY FOR AN ADVENTURE?</p>
                  <p style={{ fontSize: "0.75rem", opacity: 0.6, margin: 0 }}>Add a spot and I'll analyze your route and travel style!</p>
                </div>
              )}

              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                {attractions.length > 0 ? (
                  <>
                    {attractions.map(attr => (
                      <div key={attr.id} className="row-hover" style={{ backgroundColor: isDark ? "#262626" : "white", padding: "14px", borderRadius: "20px", display: "flex", alignItems: "center", gap: "15px", border: `1px solid ${isDark ? "#333" : "#eee"}`, transition: "0.3s" }}>
                        <img src={attr.image} style={{ width: "55px", height: "55px", borderRadius: "12px", objectFit: "cover" }} />
                        <div style={{ flex: 1 }}>
                          <Link href={`/explore/${attr.attractionId}`} style={{ textDecoration: "none", color: "inherit" }}>
                            <h4 style={{ fontWeight: "bold", fontSize: "0.95rem", margin: 0 }}>{attr.name}</h4>
                          </Link>
                          <p style={{ fontSize: "0.75rem", opacity: 0.5, margin: 0 }}>{attr.travelTime}</p>
                        </div>
                        <button onClick={() => handleDeleteLocation(attr.id)} className="btn-remove-text">REMOVE</button>
                      </div>
                    ))}
                    <Link href="/explore" style={{ textDecoration: "none" }}>
                      <div className="add-more-btn-v2" style={{ padding: "14px 20px", borderRadius: "20px", border: `2px dashed ${isDark ? "#444" : "#cbd5e1"}`, color: isDark ? "#aaa" : "#64748b", fontSize: "0.9rem", fontWeight: "bold", textAlign: "center" }}>+ Add More Attractions</div>
                    </Link>
                  </>
                ) : (
                  <div style={{ border: `2px dashed ${isDark ? "#444" : "#cbd5e1"}`, borderRadius: "30px", padding: "4rem 2rem", textAlign: "center" }}>
                    <p style={{ fontWeight: "800", fontSize: "1rem", color: isDark ? "#aaa" : "#64748b", marginBottom: "1.5rem" }}>No locations yet.</p>
                    <Link href="/explore" style={{ textDecoration: "none" }}>
                      <span className="btn-start-exploring">Start Exploring</span>
                    </Link>
                  </div>
                )}
              </div>
            </section>

            <section>
              <h3 style={{ borderBottom: "3px solid #16a34a", paddingBottom: "10px", marginBottom: "2rem", fontWeight: "800" }}>Trip Plans</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
                {trips.length > 0 ? (
                  trips.map(trip => (
                    <div key={trip.id} className="row-hover" style={{ backgroundColor: isDark ? "#262626" : "white", padding: "14px", borderRadius: "20px", display: "flex", alignItems: "center", gap: "15px", border: `1px solid ${isDark ? "#333" : "#eee"}`, transition: "0.3s" }}>
                      <img src={trip.image} style={{ width: "55px", height: "55px", borderRadius: "12px", objectFit: "cover" }} />
                      <Link href={`/itineraries/${trip.tripId ?? trip.id}`} style={{ flex: 1, textDecoration: "none", color: "inherit" }}>
                        <h4 style={{ fontWeight: "bold", fontSize: "0.95rem", margin: 0 }}>{trip.title}</h4>
                      </Link>
                      <button onClick={() => handleDeleteTrip(trip.id)} className="btn-remove-text">REMOVE</button>
                    </div>
                  ))
                ) : (
                  <div style={{ border: `2px dashed ${isDark ? "#444" : "#cbd5e1"}`, borderRadius: "24px", padding: "3rem", textAlign: "center", opacity: 0.4 }}>
                    <p style={{ fontWeight: "800", fontSize: "0.9rem", color: isDark ? "#aaa" : "#64748b", margin: 0 }}>Your saved trips will appear here.</p>
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>
      </main>

      <style jsx global>{`
        @keyframes ping { 75%, 100% { transform: scale(2); opacity: 0; } }
        .dot-ping { position: absolute; height: 100%; width: 100%; border-radius: 50%; background-color: #3b82f6; opacity: 0.6; animation: ping 1.5s infinite; }
        .dot-main { position: relative; border-radius: 50%; height: 10px; width: 10px; background-color: #2563eb; display: block; }
        .dot-container { position: relative; display: flex; height: 10px; width: 10px; }
        .badge-weekly { display: flex; align-items: center; gap: 10px; background-color: ${isDark ? "rgba(37, 99, 235, 0.1)" : "#eff6ff"}; padding: 8px 18px; border-radius: 30px; border: 1px solid ${isDark ? "#1e40af" : "#3b82f6"}; width: fit-content; }
        .suggested-card-v2 { transition: 0.3s ease; }
        .suggested-card-v2:hover { transform: translateY(-10px); box-shadow: 0 10px 20px rgba(0,0,0,0.1); }
        .zoom-img-v2 { transition: 0.5s ease; }
        .suggested-card-v2:hover .zoom-img-v2 { transform: scale(1.08); }
        .btn-save:hover:not(:disabled) { background-color: #16a34a !important; color: white !important; }
        .row-hover:hover { transform: scale(1.02) translateX(10px); border-color: #2563eb !important; }
        .btn-remove-text { background: #fee2e2; color: #ef4444; border: 1px solid #fecaca; padding: 6px 12px; border-radius: 10px; cursor: pointer; font-weight: 800; font-size: 0.65rem; transition: 0.2s; }
        .btn-remove-text:hover { background: #ef4444; color: white; transform: scale(1.05); }
        .add-more-btn-v2 { transition: 0.2s ease; cursor: pointer; }
        .add-more-btn-v2:hover { border-color: #2563eb !important; color: #2563eb !important; background: ${isDark ? "rgba(37, 99, 235, 0.1)" : "rgba(37, 99, 235, 0.05)"}; }
        
        .btn-start-exploring {
          background-color: #2563eb;
          color: white;
          padding: 14px 32px;
          border-radius: 16px;
          font-weight: 800;
          font-size: 1rem;
          display: inline-block;
          transition: all 0.3s ease;
          box-shadow: 0 4px 10px rgba(37, 99, 235, 0.2);
          cursor: pointer;
        }
        .btn-start-exploring:hover {
          background-color: #1d4ed8;
          transform: translateY(-2px);
          box-shadow: 0 6px 15px rgba(37, 99, 235, 0.25);
        }
      `}</style>
    </div>
  );
}