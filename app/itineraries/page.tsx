"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

interface Trip {
  id: string;
  title: string;
  description: string;
  image: string;
}

export default function ItinerariesPage() {
  const suggestedTrips: Trip[] = [
    { id: "1", title: "Solo Explorer", description: "Hidden gems, beaches, local food tours", image: "/solo.jpg" },
    { id: "2", title: "Family Trip", description: "Kid-friendly attractions, safe spots", image: "/family2.avif" },
    { id: "3", title: "Senior Friendly", description: "Accessible routes, cultural sights", image: "/senior3.jpg" },
  ];

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [myItineraries, setMyItineraries] = useState<Trip[]>([]);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const syncData = () => {
      setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
      setTheme(localStorage.getItem("theme") || "light");
      const stored = localStorage.getItem("myItineraries");
      if (stored) setMyItineraries(JSON.parse(stored));
    };

    syncData();
    window.addEventListener("storage", syncData);
    return () => window.removeEventListener("storage", syncData);
  }, []);

  const isDark = theme === "dark";

  const handleSaveTrip = (tripId: string) => {
    if (!isLoggedIn) {
      alert("Please log in to save trips!");
      return;
    }
    const localTrip = suggestedTrips.find(t => t.id === tripId);
    if (myItineraries.some((t) => t.id === tripId)) {
      alert("Trip already saved!");
      return;
    }
    const updated = [...myItineraries, localTrip as Trip];
    setMyItineraries(updated);
    localStorage.setItem("myItineraries", JSON.stringify(updated));
    window.dispatchEvent(new Event("storage"));
    alert(`Trip saved!`);
  };

  const handleRemoveTrip = (id: string) => {
    const updated = myItineraries.filter((t) => t.id !== id);
    setMyItineraries(updated);
    localStorage.setItem("myItineraries", JSON.stringify(updated));
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <div style={{ 
      backgroundColor: isDark ? "#1a1a1a" : "#ffffff", 
      color: isDark ? "#ffffff" : "#111827",
      minHeight: "100vh",
      transition: "all 0.3s ease" 
    }}>
      <div style={{ 
        padding: "4rem 1.5rem", 
        textAlign: "center", 
        borderBottom: `1px solid ${isDark ? "#333" : "#eee"}`,
        backgroundColor: isDark ? "#1f1f1f" : "#f9fafb" 
      }}>
        <h1 style={{ fontSize: "2.5rem", fontWeight: "800", marginBottom: "1rem", textTransform: "uppercase" }}>
          Plan Your Croatian Adventure
        </h1>
        <p style={{ opacity: 0.7, fontSize: "1.1rem", fontStyle: "italic" }}>
          Expertly crafted routes for every type of traveler.
        </p>
      </div>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "3rem 1.5rem" }}>
        
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2.5rem", flexWrap: "wrap", gap: "15px" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ backgroundColor: "#2563eb", width: "6px", height: "30px", borderRadius: "10px" }}></span> 
            Suggested Itineraries
          </h2>

          <div style={{ 
            display: "flex", alignItems: "center", gap: "10px", 
            backgroundColor: isDark ? "#1e3a8a33" : "#eff6ff", 
            padding: "8px 16px", borderRadius: "20px", border: `1px solid ${isDark ? "#1e40af" : "#dbeafe"}` 
          }}>
            <span style={{ position: "relative", display: "flex", height: "10px", width: "10px" }}>
              <span className="animate-ping" style={{ position: "absolute", height: "100%", width: "100%", borderRadius: "50%", backgroundColor: "#3b82f6", opacity: 0.75 }}></span>
              <span style={{ position: "relative", borderRadius: "50%", height: "10px", width: "10px", backgroundColor: "#2563eb" }}></span>
            </span>
            <span style={{ fontSize: "0.75rem", fontWeight: "bold", color: isDark ? "#60a5fa" : "#1e40af", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Plans updated weekly
            </span>
          </div>
        </div>
        
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem", marginBottom: "5rem" }}>
          {suggestedTrips.map((trip) => (
            <div key={trip.id} style={{ 
              backgroundColor: isDark ? "#262626" : "#ffffff",
              border: `1px solid ${isDark ? "#333" : "#eee"}`,
              borderRadius: "20px",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              position: "relative"
            }}>
              <div style={{ width: "100%", height: "220px", overflow: "hidden", position: "relative" }}>
                <img 
                  src={trip.image} 
                  alt={trip.title} 
                  style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                />
                <div style={{ position: "absolute", top: "15px", left: "15px" }}>
                  <span style={{ backgroundColor: "rgba(255,255,255,0.9)", color: "#2563eb", fontSize: "0.65rem", fontWeight: "bold", padding: "4px 10px", borderRadius: "20px", textTransform: "uppercase" }}>
                    Verified Plan
                  </span>
                </div>
              </div>
              
              <div style={{ padding: "1.5rem", textAlign: "center", flexGrow: 1, display: "flex", flexDirection: "column" }}>
                <h3 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "0.5rem" }}>{trip.title}</h3>
                <p style={{ fontSize: "0.9rem", opacity: 0.6, marginBottom: "1.5rem" }}>{trip.description}</p>
                
                <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: "10px" }}>
                  <Link href={`/itineraries/${trip.id}`} style={{ backgroundColor: "#2563eb", color: "white", padding: "12px", borderRadius: "12px", fontWeight: "bold", textDecoration: "none" }}>
                    View Details
                  </Link>
                  <button onClick={() => handleSaveTrip(trip.id)} style={{ 
                    border: "2px solid #16a34a", color: "#16a34a", padding: "10px", 
                    borderRadius: "12px", fontWeight: "bold", backgroundColor: "transparent", cursor: "pointer" 
                  }}>
                    Save to My Trips
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ 
          backgroundColor: isDark ? "#212121" : "#f3f4f6", 
          borderRadius: "32px", 
          padding: "2.5rem", 
          border: `1px solid ${isDark ? "#333" : "#e5e7eb"}` 
        }}>
          <h2 style={{ fontSize: "2rem", fontWeight: "bold", textAlign: "center", marginBottom: "2.5rem", textTransform: "uppercase" }}>
            My Saved Journey
          </h2>
          
          {!isLoggedIn ? (
            <div style={{ textAlign: "center", padding: "2rem", backgroundColor: isDark ? "#262626" : "#fff", borderRadius: "20px", border: "2px dashed #ccc" }}>
              <p style={{ opacity: 0.5 }}>Please log in to see your personalized itineraries.</p>
            </div>
          ) : myItineraries.length === 0 ? (
            <p style={{ textAlign: "center", opacity: 0.4, fontStyle: "italic" }}>Your list is empty. Start adding some adventures!</p>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem" }}>
              {myItineraries.map((trip) => (
                <div key={trip.id} style={{ 
                  backgroundColor: isDark ? "#262626" : "#fff", 
                  padding: "1.2rem", 
                  borderRadius: "20px", 
                  border: `1px solid ${isDark ? "#333" : "#eee"}`,
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)"
                }}>
                  <div style={{ width: "100%", height: "140px", overflow: "hidden", borderRadius: "12px", marginBottom: "1rem" }}>
                    <img 
                      src={trip.image} 
                      alt={trip.title} 
                      style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                    />
                  </div>
                  
                  <h3 style={{ fontWeight: "bold", marginBottom: "15px", fontSize: "1.1rem" }}>{trip.title}</h3>
                  
                  <button onClick={() => handleRemoveTrip(trip.id)} style={{ 
                    marginTop: "auto", 
                    color: "#ef4444", 
                    fontSize: "0.8rem", 
                    fontWeight: "700", 
                    backgroundColor: isDark ? "#450a0a33" : "#fef2f2", 
                    border: "1px solid #fee2e2", 
                    borderRadius: "10px",
                    padding: "8px 12px",
                    cursor: "pointer", 
                    textTransform: "uppercase",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px",
                    transition: "all 0.2s ease"
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = "#ef4444";
                    e.currentTarget.style.color = "white";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = isDark ? "#450a0a33" : "#fef2f2";
                    e.currentTarget.style.color = "#ef4444";
                  }}
                  >
                    <span style={{ fontSize: "1rem" }}>🗑</span> Remove Trip
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}