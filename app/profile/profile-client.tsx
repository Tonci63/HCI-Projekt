"use client";

import { authClient } from "@/lib/auth/auth-client";
import { useTheme } from "../_components/ThemeWrapper";

type Props = {
  user: {
    name?: string | null;
    email?: string | null;
  };
};

export default function ProfileClient({ user }: Props) {
  const { theme, toggleTheme } = useTheme();

  const handleLogout = async () => {
    await authClient.signOut();
    window.location.href = "/login";
  };

  const isDark = theme === "dark";
  const textColor = isDark ? "#ffffff" : "#171717";
  const subTextColor = isDark ? "#a1a1aa" : "#666";
  const cardBg = isDark ? "#1f1f1f" : "#ffffff";
  const borderColor = isDark ? "#333" : "#e5e7eb";
  const pageBg = isDark ? "#0a0a0a" : "#ffffff";

  const email = user.email ?? "";
  const name = user.name ?? email.split("@")[0];

  return (
    <div
      style={{
        backgroundColor: pageBg,
        minHeight: "100vh",
        color: textColor,
        transition: "all 0.3s ease",
        padding: "4rem 2rem",
      }}
    >
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        {/* HEADER */}
        <section style={{ textAlign: "center", marginBottom: "3rem" }}>
          <div
            style={{
              width: "100px",
              height: "100px",
              backgroundColor: "#2563eb",
              borderRadius: "50%",
              margin: "0 auto 1.5rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "2.5rem",
              fontWeight: "bold",
              boxShadow: "0 10px 25px -5px rgba(37, 99, 235, 0.4)",
            }}
          >
            {email.charAt(0).toUpperCase()}
          </div>

          <h1 style={{ fontSize: "2rem", fontWeight: "800" }}>{name}</h1>
          <p style={{ color: subTextColor }}>{email}</p>
        </section>

        <div style={{ display: "grid", gap: "1.5rem" }}>
          {/* APPEARANCE */}
          <section
            style={{
              padding: "1.5rem",
              backgroundColor: cardBg,
              border: `1px solid ${borderColor}`,
              borderRadius: "20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <h3 style={{ fontWeight: "bold" }}>Appearance</h3>
              <p style={{ fontSize: "0.85rem", color: subTextColor }}>
                Switch between light and dark theme
              </p>
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
              }}
            >
              {isDark ? "🌙 Dark" : "☀️ Light"}
            </button>
          </section>

          {/* LOGOUT */}
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
            }}
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
