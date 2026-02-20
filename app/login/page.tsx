"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth/auth-client";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
    <div className="flex items-center justify-center px-4 min-h-screen">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-10 border border-gray-100 text-center">
        <h1 className="text-3xl font-black text-gray-900 mb-2 uppercase tracking-tight">
          Welcome Back
        </h1>
        <p className="text-gray-500 mb-8 italic">
          Continue planning your adventure
        </p>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-700 text-sm rounded-xl border border-red-100">
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
              className="w-full px-5 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none transition"
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
              className="w-full px-5 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none transition"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold uppercase tracking-widest hover:bg-blue-700 transition active:scale-95 shadow-lg shadow-blue-100"
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="mt-8 text-sm text-gray-500">
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
