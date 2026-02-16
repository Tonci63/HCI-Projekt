"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

interface Attraction {
  id: string;
  name: string;
  image: string;
  travelTime: string;
  isPriority?: boolean;
}

interface Trip {
  id: string;
  title: string;
  image: string;
}

export default function ItinerariesPage() {
  const suggestedTrips: Trip[] = [
    { id: "1", title: "Solo Explorer", image: "/solo.jpg" },
    { id: "2", title: "Family Trip", image: "/family2.avif" },
    { id: "3", title: "Senior Friendly", image: "/senior3.jpg" },
  ];

  const [myItineraries, setMyItineraries] = useState<Trip[]>([]);
  const [myAttractions, setMyAttractions] = useState<Attraction[]>([]);
  const [theme, setTheme] = useState<string>("light");

  useEffect(() => {
    const syncData = () => {
      setTheme(localStorage.getItem("theme") || "light");
      const storedTrips = localStorage.getItem("myItineraries");
      if (storedTrips) setMyItineraries(JSON.parse(storedTrips));
      const storedAttr = localStorage.getItem("myItinerary");
      if (storedAttr) setMyAttractions(JSON.parse(storedAttr));
    };
    syncData();
    window.addEventListener("storage", syncData);
    return () => window.removeEventListener("storage", syncData);
  }, []);

  const isDark = theme === "dark";

  const getSmartTravelAdvice = (items: Attraction[]) => {
    if (items.length === 0) return null;

    let totalMinutes = 0;
    const locations = items.map(a => a.name.toLowerCase());
    
    items.forEach(attr => {
      const timeStr = attr.travelTime?.toLowerCase() || "";
      const num = parseFloat(timeStr);
      if (!isNaN(num)) {
        if (timeStr.includes("h")) totalMinutes += num * 60;
        else if (timeStr.includes("min")) totalMinutes += num;
      }
    });

    const h = Math.floor(totalMinutes / 60);
    const m = totalMinutes % 60;
    const timeDisplay = h > 0 ? `${h}h ${m}min` : `${m}min`;

    let baseCity = "the central location";
    if (locations.some(l => l.includes("split") || l.includes("dalmatia") || l.includes("hvar"))) baseCity = "Split";
    else if (locations.some(l => l.includes("zagreb") || l.includes("plitvice"))) baseCity = "Zagreb";
    else if (locations.some(l => l.includes("dubrovnik"))) baseCity = "Dubrovnik";
    else if (locations.some(l => l.includes("istr") || l.includes("pula") || l.includes("rovinj"))) baseCity = "Istria (Pula/Rovinj)";

    return {
      time: timeDisplay,
      isLongTrip: totalMinutes > 360,
      baseCity: baseCity,
      count: items.length
    };
  };

  const advice = getSmartTravelAdvice(myAttractions);

  const handleSaveTrip = (trip: Trip) => {
    if (myItineraries.find(t => t.id === trip.id)) return;
    const updated = [...myItineraries, trip];
    setMyItineraries(updated);
    localStorage.setItem("myItineraries", JSON.stringify(updated));
    window.dispatchEvent(new Event("storage"));
  };

  const togglePriority = (e: React.MouseEvent, id: string) => {
    e.preventDefault(); e.stopPropagation();
    const updated = myAttractions.map(attr => 
      attr.id === id ? { ...attr, isPriority: !attr.isPriority } : attr
    ).sort((a, b) => Number(b.isPriority) - Number(a.isPriority));
    setMyAttractions(updated);
    localStorage.setItem("myItinerary", JSON.stringify(updated));
  };

  const handleRemove = (e: React.MouseEvent, id: string, type: "attr" | "trip") => {
    e.preventDefault(); e.stopPropagation();
    if (type === "attr") {
      const updated = myAttractions.filter(a => a.id !== id);
      setMyAttractions(updated);
      localStorage.setItem("myItinerary", JSON.stringify(updated));
    } else {
      const updated = myItineraries.filter(t => t.id !== id);
      setMyItineraries(updated);
      localStorage.setItem("myItineraries", JSON.stringify(updated));
    }
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <div style={{ backgroundColor: isDark ? "#121212" : "#ffffff", color: isDark ? "#ffffff" : "#1e293b", minHeight: "100vh", transition: "0.3s" }}>
      
      <header style={{ padding: "3rem 1rem", textAlign: "center", borderBottom: `1px solid ${isDark ? "#222" : "#f1f5f9"}` }}>
        <h1 style={{ fontSize: "2.2rem", fontWeight: "900", letterSpacing: "-1px", marginBottom: "0.5rem" }}>ADVENTURE PLANNER</h1>
        <p style={{ fontSize: "1rem", opacity: 0.7 }}>Organize your spots and explore curated travel routes.</p>
      </header>

      <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "2.5rem 1.5rem" }}>
        
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "800" }}>Recommended for you</h2>
          <div className="badge-weekly">
            <span className="dot-container"><span className="dot-ping"></span><span className="dot-main"></span></span>
            <span style={{ fontSize: "0.75rem", fontWeight: "900", color: "#3b82f6" }}>UPDATED WEEKLY</span>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem", marginBottom: "5rem" }}>
          {suggestedTrips.map(trip => (
            <div key={trip.id} className="suggested-card" style={{ backgroundColor: isDark ? "#1e1e1e" : "#ffffff", borderRadius: "24px", overflow: "hidden", border: `1px solid ${isDark ? "#333" : "#e2e8f0"}`, position: "relative", transition: "0.3s" }}>
              <div style={{ position: "absolute", top: "15px", left: "15px", zIndex: 10, background: "rgba(255,255,255,0.9)", padding: "4px 10px", borderRadius: "10px", fontSize: "0.65rem", fontWeight: "bold", color: "#2563eb" }}>✓ VERIFIED</div>
              <div style={{ height: "200px", overflow: "hidden" }}><img src={trip.image} className="card-image" style={{ width: "100%", height: "100%", objectFit: "cover", transition: "0.5s" }} /></div>
              <div style={{ padding: "1.5rem", textAlign: "center" }}>
                <h3 style={{ fontWeight: "800", fontSize: "1.2rem", marginBottom: "1.2rem" }}>{trip.title}</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <Link href={`/itineraries/${trip.id}`} style={{ backgroundColor: "#2563eb", color: "white", padding: "12px", borderRadius: "14px", textDecoration: "none", fontWeight: "bold", fontSize: "0.9rem" }}>View Details</Link>
                  <button onClick={() => handleSaveTrip(trip)} className="btn-save" style={{ border: `2px solid #16a34a`, color: "#16a34a", padding: "10px", borderRadius: "14px", background: "transparent", cursor: "pointer", fontWeight: "bold", fontSize: "0.9rem" }}>Save Trip</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: isDark ? "#1a1a1a" : "#f8fafc", borderRadius: "40px", padding: "3rem", border: `1px solid ${isDark ? "#262626" : "#e2e8f0"}` }}>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "3.5rem" }}>
            
            {/* LIJEVA STRANA - LOCATIONS */}
            <section>
              <h3 style={{ borderBottom: "3px solid #2563eb", paddingBottom: "10px", marginBottom: "2rem", fontWeight: "800" }}>Locations</h3>
              
              {advice && (
                <div style={{ 
                  backgroundColor: "#2563eb", color: "white", borderRadius: "20px", padding: "15px 20px", 
                  marginBottom: "2rem", boxShadow: "0 8px 20px rgba(37, 99, 235, 0.2)",
                  display: "flex", flexDirection: "column", gap: "8px"
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <h4 style={{ margin: 0, fontSize: "0.9rem", fontWeight: "900" }}>🗺️ ROUTE INFO</h4>
                    <span style={{ fontSize: "1rem", fontWeight: "900" }}>{advice.time}</span>
                  </div>
                  <p style={{ margin: 0, fontSize: "0.8rem", opacity: 0.9, lineHeight: "1.4" }}>
                    Stay in <strong>{advice.baseCity}</strong> to visit these {advice.count} spots efficiently.
                  </p>
                  <span style={{ fontSize: "0.65rem", fontWeight: "800", textTransform: "uppercase", opacity: 0.8, marginTop: "4px" }}>
                    {advice.isLongTrip ? "⚠️ Multi-day trip suggested" : "✅ Perfect for 1 day"}
                  </span>
                </div>
              )}

              <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
                {myAttractions.length === 0 ? (
                  <div style={{ padding: "3rem 1rem", border: "2px dashed #cbd5e1", borderRadius: "20px", textAlign: "center", opacity: 0.8 }}>
                    <p style={{ fontSize: "0.9rem", fontWeight: "600", marginBottom: "1.5rem" }}>No locations saved yet.</p>
                    <Link href="/explore" style={{ 
                      display: "inline-block", padding: "10px 20px", borderRadius: "12px", 
                      border: "1px solid #2563eb", color: "#2563eb", textDecoration: "none", 
                      fontSize: "0.85rem", fontWeight: "bold", transition: "0.2s" 
                    }} className="empty-state-btn">Start Exploring</Link>
                  </div>
                ) : (
                  <>
                    {myAttractions.map(attr => (
                      <Link key={attr.id} href={`/explore/${attr.id}`} className="saved-link-wrapper">
                        <div className="saved-row" style={{ 
                          backgroundColor: attr.isPriority 
                            ? (isDark ? "#2d2a1e" : "#fffbeb") 
                            : (isDark ? "#262626" : "white"), 
                          padding: "14px", 
                          borderRadius: "20px", 
                          display: "flex", 
                          alignItems: "center", 
                          gap: "15px", 
                          border: attr.isPriority 
                            ? "2px solid #eab308" 
                            : `1px solid ${isDark ? "#333" : "#eee"}`, 
                          position: "relative",
                          boxShadow: attr.isPriority ? "0 4px 15px rgba(234, 179, 8, 0.15)" : "none"
                        }}>
                          {/* VISUAL FEEDBACK ZA FAVORITE */}
                          {attr.isPriority && (
                            <span style={{ 
                              position: "absolute", top: "-10px", right: "20px", 
                              backgroundColor: "#eab308", color: "white", 
                              fontSize: "0.6rem", fontWeight: "900", padding: "2px 8px", 
                              borderRadius: "10px", letterSpacing: "0.5px", boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
                            }}>MUST VISIT</span>
                          )}

                          <img src={attr.image} style={{ width: "55px", height: "55px", borderRadius: "12px", objectFit: "cover" }} />
                          <div style={{ flex: 1 }}>
                            <h4 style={{ fontWeight: "bold", fontSize: "0.95rem", margin: 0 }}>{attr.name}</h4>
                            <p style={{ fontSize: "0.75rem", opacity: 0.5, margin: 0 }}>{attr.travelTime}</p>
                          </div>
                          <button 
                            onClick={(e) => togglePriority(e, attr.id)} 
                            className="btn-priority" 
                            style={{ 
                              background: "none", border: "none", cursor: "pointer", 
                              color: attr.isPriority ? "#eab308" : "#ccc", 
                              fontSize: "1.4rem",
                              transition: "0.2s",
                              filter: attr.isPriority ? "drop-shadow(0 0 5px rgba(234, 179, 8, 0.5))" : "none"
                            }}
                          >
                            ★
                          </button>
                          <button onClick={(e) => handleRemove(e, attr.id, "attr")} className="btn-remove-text">REMOVE</button>
                        </div>
                      </Link>
                    ))}
                    <Link href="/explore" style={{ 
                      textAlign: "center", padding: "12px", borderRadius: "16px", border: `2px dashed ${isDark ? "#444" : "#cbd5e1"}`, 
                      color: isDark ? "#aaa" : "#64748b", textDecoration: "none", fontSize: "0.85rem", fontWeight: "bold", 
                      marginTop: "0.5rem", transition: "0.2s" 
                    }} className="add-more-btn">+ Add More Attractions</Link>
                  </>
                )}
              </div>
            </section>

            {/* DESNA STRANA - TRIP PLANS */}
            <section>
              <h3 style={{ borderBottom: "3px solid #16a34a", paddingBottom: "10px", marginBottom: "2rem", fontWeight: "800" }}>Trip Plans</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
                {myItineraries.length === 0 ? (
                  <div style={{ padding: "3rem 1rem", border: "2px dashed #cbd5e1", borderRadius: "20px", textAlign: "center", opacity: 0.4 }}>
                    <p style={{ fontSize: "0.9rem", fontWeight: "600" }}>Your saved trips will appear here.</p>
                  </div>
                ) : (
                  myItineraries.map(trip => (
                    <Link key={trip.id} href={`/itineraries/${trip.id}`} className="saved-link-wrapper">
                      <div className="saved-row" style={{ backgroundColor: isDark ? "#262626" : "white", padding: "14px", borderRadius: "20px", display: "flex", alignItems: "center", gap: "15px", border: `1px solid ${isDark ? "#333" : "#eee"}`, position: "relative" }}>
                        <img src={trip.image} style={{ width: "55px", height: "55px", borderRadius: "12px", objectFit: "cover" }} />
                        <h4 style={{ fontWeight: "bold", fontSize: "0.95rem", flex: 1, margin: 0 }}>{trip.title}</h4>
                        <button onClick={(e) => handleRemove(e, trip.id, "trip")} className="btn-remove-text">REMOVE</button>
                      </div>
                    </Link>
                  ))
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
        .badge-weekly { display: flex; align-items: center; gap: 10px; background-color: ${isDark ? "rgba(37, 99, 235, 0.1)" : "#eff6ff"}; padding: 8px 18px; border-radius: 30px; border: 1px solid ${isDark ? "#1e40af" : "#3b82f6"}; }
        
        .suggested-card:hover { transform: translateY(-10px); box-shadow: 0 20px 40px rgba(0,0,0,0.15); }
        .suggested-card:hover .card-image { transform: scale(1.1); }
        .btn-save:hover { background-color: #16a34a !important; color: white !important; }

        .saved-link-wrapper { text-decoration: none; color: inherit; display: block; }
        .saved-row { transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
        .saved-link-wrapper:hover .saved-row { 
          transform: scale(1.02) translateX(10px); 
          box-shadow: ${isDark ? "0 10px 30px rgba(0,0,0,0.4)" : "0 10px 30px rgba(37, 99, 235, 0.1)"};
          border-color: #2563eb !important;
        }

        .btn-remove-text { 
          background: #fee2e2; color: #ef4444; border: 1px solid #fecaca; 
          padding: 6px 12px; border-radius: 10px; cursor: pointer; 
          font-weight: 800; font-size: 0.65rem; letter-spacing: 0.5px; transition: 0.2s; 
        }
        .btn-remove-text:hover { background: #ef4444; color: white; border-color: #ef4444; transform: scale(1.05); }
        .btn-priority:hover { transform: scale(1.3); }
        .empty-state-btn:hover { background-color: #2563eb; color: white !important; }
        .add-more-btn:hover { border-color: #2563eb !important; color: #2563eb !important; }
      `}</style>
    </div>
  );
}