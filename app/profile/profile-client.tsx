"use client";

import { authClient } from "@/lib/auth/auth-client";
import { useTheme } from "../_components/ThemeWrapper";
import { useState, useEffect } from "react";
import { Type } from "lucide-react";

interface ProfileClientProps {
  user: any;
}

export default function ProfileClient({ user }: ProfileClientProps) {
  const { theme, toggleTheme } = useTheme();
  
  // State za Large Font
  const [largeFont, setLargeFont] = useState(false);

  const isDark = theme === "dark";
  const textColor = isDark ? "#ffffff" : "#1e293b";
  const subTextColor = isDark ? "#a1a1aa" : "#64748b";
  const cardBg = isDark ? "#1e1e1e" : "#ffffff";
  const borderColor = isDark ? "#333" : "#e2e8f0";
  const pageBg = isDark ? "#121212" : "#ffffff";

  const handleLogout = async () => {
    await authClient.signOut();
    window.location.href = "/login";
  };

  useEffect(() => {
    // Učitaj Large Font postavku
    const isLarge = localStorage.getItem("large-font") === "true";
    setLargeFont(isLarge);
    if (isLarge) document.documentElement.classList.add("large-text");
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

  return (
    <div style={{ backgroundColor: pageBg, minHeight: "100vh", color: textColor, transition: "0.3s ease", padding: "4rem 1.5rem" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        
        {/* HEADER */}
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

        {/* SETTINGS SECTION (Appearance, Accessibility, Logout) */}
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

          <button className="logout-btn" onClick={handleLogout} style={{ 
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
        .theme-btn:hover { background-color: #2563eb !important; color: white !important; }
        .logout-btn:hover { background-color: #ef4444 !important; color: white !important; }
      `}</style>
    </div>
  );
}