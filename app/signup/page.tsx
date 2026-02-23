"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth/auth-client";
import { useTheme } from "../_components/ThemeWrapper"; 
export default function SignUpPage() {
  const router = useRouter();
  const { theme } = useTheme(); // Uzimamo trenutnu temu
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const isDark = theme === "dark";

  const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const { error } = await authClient.signUp.email({
      email,
      password,
      name: `${firstName} ${lastName}`,
    });

    if (error) {
      setError(error.message ?? "Registration failed.");
      setIsLoading(false);
    } else {
      router.push("/");
    }
  };

  return (
    <div 
      className="flex items-center justify-center px-4 min-h-screen transition-colors duration-300"
      style={{ backgroundColor: isDark ? "#121212" : "#f8fafc" }} // Pozadina cijelog screena
    >
      <div 
        className="w-full max-w-md rounded-3xl shadow-xl p-10 text-center transition-all duration-300"
        style={{ 
          backgroundColor: isDark ? "#1e1e1e" : "#ffffff", 
          borderColor: isDark ? "#333" : "#dbeafe",
          borderWidth: "1px",
          color: isDark ? "#ffffff" : "#1e293b"
        }}
      >
        <h1 className="text-3xl font-black text-blue-600 mb-2 uppercase tracking-tight">
          Join Us
        </h1>
        <p 
          className="mb-8 italic"
          style={{ color: isDark ? "#a1a1aa" : "#64748b" }}
        >
          Start your Croatian journey today
        </p>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-700 text-sm rounded-xl border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleSignUp} className="space-y-5 text-left">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-gray-400 mb-2 ml-1">
                First Name
              </label>
              <input
                name="firstName"
                type="text"
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
              <label className="block text-xs font-bold uppercase text-gray-400 mb-2 ml-1">
                Last Name
              </label>
              <input
                name="lastName"
                type="text"
                required
                className="w-full px-5 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-600 transition"
                style={{ 
                  backgroundColor: isDark ? "#262626" : "#ffffff",
                  borderColor: isDark ? "#444" : "#e2e8f0",
                  color: isDark ? "#ffffff" : "#000000"
                }}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-gray-400 mb-2 ml-1">
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
            <label className="block text-xs font-bold uppercase text-gray-400 mb-2 ml-1">
              Create Password
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
            className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold uppercase tracking-widest hover:bg-blue-700 transition active:scale-95"
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p 
          className="mt-8 text-sm"
          style={{ color: isDark ? "#a1a1aa" : "#64748b" }}
        >
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-blue-600 font-bold hover:underline"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}