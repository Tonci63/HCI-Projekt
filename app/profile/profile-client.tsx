"use client";

import { authClient } from "@/lib/auth/auth-client";
import { useTheme } from "../_components/ThemeWrapper";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Trash2, Plus, Type } from "lucide-react";

const API_URL = "https://6942e05d69b12460f313226c.mockapi.io/attractions";

interface ProfileClientProps {
  user: any;
}

export default function ProfileClient({ user }: ProfileClientProps) {
  const { theme, toggleTheme } = useTheme();
  
  const [favorites, setFavorites] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isBtnHovered, setIsBtnHovered] = useState(false);
  
  // State za Large Font
  const [largeFont, setLargeFont] = useState(false);

  const isDark = theme === "dark";
  const textColor = isDark ? "#ffffff" : "#1e293b";
  const subTextColor = isDark ? "#a1a1aa" : "#64748b";
  const cardBg = isDark ? "#1e1e1e" : "#ffffff";
  const borderColor = isDark ? "#333" : "#e2e8f0";
  const pageBg = isDark ? "#121212" : "#ffffff";

  useEffect(() => {
    // Učitaj Large Font postavku
    const isLarge = localStorage.getItem("large-font") === "true";
    setLargeFont(isLarge);
    if (isLarge) document.documentElement.classList.add("large-text");

    const loadFavorites = async () => {
      const savedIds = JSON.parse(localStorage.getItem("favorites") || "[]") as number[];
      if (savedIds.length === 0) {
        setFavorites([]);
        setLoading(false);
        return;
      }
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        setFavorites(data.filter((attr: any) => savedIds.includes(Number(attr.id))));
      } catch (err) {
        console.error("Greška:", err);
      } finally {
        setLoading(false);
      }
    };
    loadFavorites();
  }, []);

  const toggleLargeFont = () => {
    const newState = !largeFont;
    setLargeFont(newState);
    localStorage.setItem("large-font", String(newState));
    if (newState) {
      document.documentElement.classList.add("large-text");
    } else {
      document.documentElement.classList.remove("large-text");
    }
  };

  const removeFavorite = (id: number) => {
    const savedIds = JSON.parse(localStorage.getItem("favorites") || "[]") as number[];
    const updatedIds = savedIds.filter(favId => favId !== id);
    localStorage.setItem("favorites", JSON.stringify(updatedIds));
    setFavorites(prev => prev.filter(attr => Number(attr.id) !== id));
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <div style={{ backgroundColor: pageBg, minHeight: "100vh", color: textColor, transition: "0.3s ease", padding: "4rem 1.5rem" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        
        {/* HEADER - BEZ MOGUĆNOSTI PROMJENE SLIKE */}
        <section style={{ textAlign: "center", marginBottom: "3rem" }}>
          <div 
            style={{
              width: "130px", height: "130px", backgroundColor: "#2563eb", borderRadius: "50%",
              margin: "0 auto 1.5rem", display: "flex", alignItems: "center", justifyContent: "center",
              color: "white", fontSize: "3rem", fontWeight: "bold",
              position: "relative", overflow: "hidden", border: `4px solid ${cardBg}`,
              boxShadow: "0 10px 30px rgba(37, 99, 235, 0.25)"
            }}
          >
            {user?.image ? (
              <img src={user.image} style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="Profile" />
            ) : (
              user?.name?.charAt(0).toUpperCase() || "U"
            )}
          </div>
          <h1 style={{ fontSize: "2.5rem", fontWeight: "900", margin: 0, letterSpacing: "-1px" }}>{user?.name}</h1>
          <p style={{ color: subTextColor, fontWeight: "500" }}>{user?.email}</p>
        </section>

        {/* FAVORITES SECTION */}
        <section style={{ marginBottom: "3rem" }}>
          <h3 style={{ fontSize: "1.2rem", fontWeight: "900", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ color: "#2563eb" }}>⭐</span> My Favorites
          </h3>

          {loading ? (
            <p style={{ textAlign: "center", opacity: 0.5 }}>Loading...</p>
          ) : favorites.length > 0 ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "1.5rem" }}>
              {favorites.map((attr) => (
                <div key={attr.id} className="fav-card" style={{ 
                  backgroundColor: cardBg, borderRadius: "24px", overflow: "hidden", border: `1px solid ${borderColor}`,
                  position: "relative", transition: "0.3s ease"
                }}>
                  <div style={{ position: "relative", height: "120px" }}>
                    <img src={attr.image} style={{ width: "100%", height: "100%", objectFit: "cover" }} alt={attr.name} />
                    <button 
                      onClick={() => removeFavorite(Number(attr.id))}
                      style={{ 
                        position: "absolute", top: "8px", right: "8px", backgroundColor: "rgba(239, 68, 68, 0.9)", 
                        color: "white", border: "none", padding: "6px", borderRadius: "10px", cursor: "pointer"
                      }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <div style={{ padding: "12px" }}>
                    <h4 style={{ margin: "0 0 5px", fontSize: "0.9rem", fontWeight: "bold" }}>{attr.name}</h4>
                    <Link href={`/explore/${attr.id}`} style={{ fontSize: "0.75rem", color: "#2563eb", textDecoration: "none", fontWeight: "800" }}>VIEW →</Link>
                  </div>
                </div>
              ))}
              
              <Link href="/explore" style={{ textDecoration: "none" }}>
                <div className="add-more-card" style={{
                  height: "100%", minHeight: "180px", border: `2px dashed ${borderColor}`,
                  borderRadius: "24px", display: "flex", flexDirection: "column",
                  alignItems: "center", justifyContent: "center", gap: "10px", transition: "0.3s"
                }}>
                  <div className="plus-icon-bg">
                    <Plus size={24} className="plus-icon" />
                  </div>
                  <span style={{ fontSize: "0.8rem", fontWeight: "900", color: textColor }}>ADD MORE</span>
                </div>
              </Link>
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "4rem 2rem", border: `2px dashed ${borderColor}`, borderRadius: "32px", color: subTextColor }}>
              <p style={{ margin: "0 0 25px", fontWeight: "700", fontSize: "1.1rem" }}>No favorites saved yet.</p>
              
              <Link href="/explore" style={{ textDecoration: "none" }}>
                <span 
                  onMouseEnter={() => setIsBtnHovered(true)}
                  onMouseLeave={() => setIsBtnHovered(false)}
                  style={{
                    display: "inline-block", padding: "14px 32px", borderRadius: "16px", border: "2px solid #2563eb",
                    backgroundColor: isBtnHovered ? "#2563eb" : "transparent",
                    color: isBtnHovered ? "#ffffff" : "#2563eb",
                    fontWeight: "900", fontSize: "0.9rem", transition: "0.2s all ease-in-out", cursor: "pointer",
                    transform: isBtnHovered ? "translateY(-2px)" : "none",
                    boxShadow: isBtnHovered ? "0 8px 20px rgba(37, 99, 235, 0.3)" : "none"
                  }}
                >
                  EXPLORE PLACES
                </span>
              </Link>
            </div>
          )}
        </section>

        {/* SETTINGS */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
          
          {/* Appearance (Theme) */}
          <div style={{ 
            width: "100%", maxWidth: "400px", padding: "1rem 1.5rem", 
            backgroundColor: cardBg, border: `1px solid ${borderColor}`, 
            borderRadius: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" 
          }}>
            <div>
              <h4 style={{ fontWeight: "900", margin: 0, fontSize: "0.9rem" }}>Appearance</h4>
              <p style={{ fontSize: "0.75rem", color: subTextColor, margin: 0 }}>Toggle Mode</p>
            </div>
            <button className="theme-btn" onClick={toggleTheme} style={{ 
              padding: "8px 16px", borderRadius: "10px", border: "none", 
              cursor: "pointer", backgroundColor: isDark ? "#333" : "#f1f5f9", 
              color: textColor, fontWeight: "bold", transition: "0.2s", fontSize: "0.8rem"
            }}>
              {isDark ? "🌙 DARK" : "☀️ LIGHT"}
            </button>
          </div>

          {/* Accessibility (Large Font) */}
          <div style={{ 
            width: "100%", maxWidth: "400px", padding: "1rem 1.5rem", 
            backgroundColor: cardBg, border: `1px solid ${borderColor}`, 
            borderRadius: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" 
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <Type size={18} style={{ color: "#2563eb" }} />
              <div>
                <h4 style={{ fontWeight: "900", margin: 0, fontSize: "0.9rem" }}>Accessibility</h4>
                <p style={{ fontSize: "0.75rem", color: subTextColor, margin: 0 }}>Large Font Mode</p>
              </div>
            </div>
            <button 
              onClick={toggleLargeFont}
              style={{ 
                width: "48px", height: "24px", borderRadius: "12px", border: "none", 
                cursor: "pointer", backgroundColor: largeFont ? "#2563eb" : (isDark ? "#333" : "#f1f5f9"), 
                position: "relative", transition: "0.3s ease"
              }}
            >
              <div style={{ 
                width: "18px", height: "18px", backgroundColor: "white", borderRadius: "50%",
                position: "absolute", top: "3px", left: largeFont ? "27px" : "3px",
                transition: "0.3s ease", boxShadow: "0 2px 4px rgba(0,0,0,0.2)"
              }} />
            </button>
          </div>

          <button className="logout-btn" onClick={() => authClient.signOut()} style={{ 
            width: "100%", maxWidth: "400px", padding: "0.8rem", backgroundColor: "transparent", 
            color: "#ef4444", border: "2px solid #ef4444", borderRadius: "20px", 
            fontWeight: "900", cursor: "pointer", transition: "0.3s ease", 
            letterSpacing: "1px", fontSize: "0.85rem"
          }}>
            SIGN OUT
          </button>
        </div>
      </div>

      <style jsx>{`
        .fav-card:hover { transform: translateY(-5px); border-color: #2563eb !important; }

        .plus-icon-bg {
          background-color: ${isDark ? "#262626" : "#f1f5f9"};
          padding: 12px;
          border-radius: 50%;
          transition: 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        :global(.plus-icon) {
          color: #2563eb;
          transition: 0.3s ease;
        }

        .add-more-card:hover .plus-icon-bg {
          background-color: #2563eb !important;
          transform: scale(1.1);
        }
        
        .add-more-card:hover :global(.plus-icon) {
          color: white !important;
        }

        .theme-btn:hover { background-color: #2563eb !important; color: white !important; }
        .logout-btn:hover { background-color: #ef4444 !important; color: white !important; }
      `}</style>
    </div>
  );
}