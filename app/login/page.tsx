"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth/auth-client";
import { useTheme } from "../_components/ThemeWrapper"; 

export default function LoginPage() {
  const router = useRouter();
  const { theme } = useTheme();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const isDark = theme === "dark";

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const { error } = await authClient.signIn.email({
      email,
      password,
    });

    if (error) {
      setError(error.message ?? "Invalid email or password.");
      setIsLoading(false);
    } else {
      router.push("/");
    }
  };

  return (
    <div 
      className="flex items-center justify-center px-4 min-h-screen transition-colors duration-300"
      style={{ backgroundColor: isDark ? "#121212" : "#f8fafc" }}
    >
      <div 
        className="w-full max-w-md rounded-3xl shadow-xl p-10 text-center transition-all duration-300"
        style={{ 
          backgroundColor: isDark ? "#1e1e1e" : "#ffffff", 
          borderColor: isDark ? "#333" : "#f1f5f9",
          borderWidth: "1px",
          color: isDark ? "#ffffff" : "#1e293b"
        }}
      >
        <h1 
          className="text-3xl font-black mb-2 uppercase tracking-tight"
          style={{ color: isDark ? "#ffffff" : "#0f172a" }}
        >
          Welcome Back
        </h1>
        <p 
          className="mb-8 italic"
          style={{ color: isDark ? "#a1a1aa" : "#64748b" }}
        >
          Continue planning your adventure
        </p>

        {error && (
          <div 
            className="mb-6 p-4 text-sm rounded-xl border"
            style={{ 
              backgroundColor: isDark ? "rgba(239, 68, 68, 0.1)" : "#fef2f2",
              color: "#ef4444",
              borderColor: "rgba(239, 68, 68, 0.2)"
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5 text-left">
          <div>
            <label className="block text-xs font-bold uppercase text-gray-400 mb-2 ml-1 tracking-widest">
              Email
            </label>
            <input
              name="email"
              type="email"
              required
              className="w-full px-5 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-600 transition"
              style={{ 
                backgroundColor: isDark ? "#262626" : "#ffffff",
                borderColor: isDark ? "#444" : "#e2e8f0",
                color: isDark ? "#ffffff" : "#000000"
              }}
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-gray-400 mb-2 ml-1 tracking-widest">
              Password
            </label>
            <input
              name="password"
              type="password"
              required
              className="w-full px-5 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-600 transition"
              style={{ 
                backgroundColor: isDark ? "#262626" : "#ffffff",
                borderColor: isDark ? "#444" : "#e2e8f0",
                color: isDark ? "#ffffff" : "#000000"
              }}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold uppercase tracking-widest hover:bg-blue-700 transition active:scale-95 shadow-lg"
            style={{ boxShadow: isDark ? "none" : "0 10px 15px -3px rgba(37, 99, 235, 0.2)" }}
          >
            {isLoading ? "Logging in..." : "Log In"}
          </button>
        </form>

        <p 
          className="mt-8 text-sm"
          style={{ color: isDark ? "#a1a1aa" : "#64748b" }}
        >
          Don't have an account?{" "}
          <Link
            href="/signup"
            className="text-blue-600 font-bold hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}