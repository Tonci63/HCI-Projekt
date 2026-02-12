"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "../_components/ThemeWrapper";

export default function ProfilePage() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (!loggedIn) {
      router.push("/login");
    } else {
      setUserEmail(localStorage.getItem("userEmail") || "traveler@example.com");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
    router.push("/login");
  };

  const isDark = theme === "dark";
  const textColor = isDark ? "#ffffff" : "#171717";
  const subTextColor = isDark ? "#a1a1aa" : "#666";
  const cardBg = isDark ? "#1f1f1f" : "#ffffff";
  const borderColor = isDark ? "#333" : "#e5e7eb";
  const pageBg = isDark ? "#0a0a0a" : "#ffffff";

  return (
    <div style={{ 
      backgroundColor: pageBg, 
      minHeight: "100vh", 
      color: textColor, 
      transition: "all 0.3s ease",
      padding: "4rem 2rem" 
    }}>
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        
        {/* HEADER SECTION */}
        <section style={{ textAlign: "center", marginBottom: "3rem" }}>
          <div style={{ 
            width: "100px", height: "100px", 
            backgroundColor: "#2563eb", 
            borderRadius: "50%", 
            margin: "0 auto 1.5rem", 
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "white", fontSize: "2.5rem", fontWeight: "bold",
            boxShadow: "0 10px 25px -5px rgba(37, 99, 235, 0.4)"
          }}>
            {userEmail?.charAt(0).toUpperCase()}
          </div>
          <h1 style={{ fontSize: "2rem", fontWeight: "800", marginBottom: "0.5rem" }}>
            {userEmail?.split('@')[0]}
          </h1>
          <p style={{ color: subTextColor, fontSize: "1rem" }}>{userEmail}</p>
        </section>

        <div style={{ display: "grid", gap: "1.5rem" }}>
          
          {/* APPEARANCE SETTINGS */}
          <section style={{ 
            padding: "1.5rem", 
            backgroundColor: cardBg, 
            border: `1px solid ${borderColor}`, 
            borderRadius: "20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}>
            <div>
              <h3 style={{ fontWeight: "bold", marginBottom: "0.2rem" }}>Appearance</h3>
              <p style={{ fontSize: "0.85rem", color: subTextColor }}>Switch between light and dark theme</p>
            </div>
            <button 
              onClick={toggleTheme} 
              style={{ 
                padding: "10px 20px", 
                borderRadius: "12px", 
                border: `1px solid ${borderColor}`,
                cursor: "pointer", 
                backgroundColor: isDark ? "#333" : "#f3f4f6", 
                color: textColor, 
                fontWeight: "600",
                transition: "all 0.2s"
              }}
            >
              {isDark ? "🌙 Dark" : "☀️ Light"}
            </button>
          </section>

          {/* STATS SECTION */}
          <section style={{ 
            padding: "1.5rem", 
            backgroundColor: cardBg, 
            border: `1px solid ${borderColor}`, 
            borderRadius: "20px" 
          }}>
            <h3 style={{ fontWeight: "bold", marginBottom: "1.2rem" }}>My Activity</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div style={{ padding: "1rem", backgroundColor: isDark ? "#262626" : "#f9fafb", borderRadius: "14px", textAlign: "center" }}>
                <span style={{ display: "block", color: "#2563eb", fontSize: "1.5rem", fontWeight: "bold" }}>12</span>
                <span style={{ fontSize: "0.7rem", fontWeight: "bold", color: subTextColor, textTransform: "uppercase" }}>Saved Trips</span>
              </div>
              <div style={{ padding: "1rem", backgroundColor: isDark ? "#262626" : "#f9fafb", borderRadius: "14px", textAlign: "center" }}>
                <span style={{ display: "block", color: "#2563eb", fontSize: "1.5rem", fontWeight: "bold" }}>4</span>
                <span style={{ fontSize: "0.7rem", fontWeight: "bold", color: subTextColor, textTransform: "uppercase" }}>Reviews</span>
              </div>
            </div>
          </section>

          {/* LOGOUT BUTTON */}
          <button 
            onClick={handleLogout} 
            style={{ 
              marginTop: "1rem",
              padding: "1.2rem", 
              backgroundColor: "transparent", 
              color: "#ef4444", 
              border: "2px solid #ef4444", 
              borderRadius: "16px", 
              fontWeight: "bold", 
              cursor: "pointer",
              transition: "all 0.2s"
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = "#ef4444";
              e.currentTarget.style.color = "white";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = "#ef4444";
            }}
          >
            Sign Out
          </button>

        </div>
      </div>
    </div>
  );
}