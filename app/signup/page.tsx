"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignUpPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulacija registracije
    setTimeout(() => {
      localStorage.setItem("isLoggedIn", "true");
      router.push("/");
      router.refresh();
      window.dispatchEvent(new Event("storage"));
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-blue-50">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-10 border border-blue-100 text-center">
        <h1 className="text-3xl font-black text-blue-600 mb-2 uppercase tracking-tight">Join Us</h1>
        <p className="text-gray-500 mb-8 italic">Start your Croatian journey today</p>

        <form onSubmit={handleSignUp} className="space-y-5 text-left">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-gray-400 mb-2 ml-1">First Name</label>
              <input type="text" required className="w-full px-5 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-600 transition" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-gray-400 mb-2 ml-1">Last Name</label>
              <input type="text" required className="w-full px-5 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-600 transition" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-gray-400 mb-2 ml-1">Email</label>
            <input type="email" required className="w-full px-5 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-600 transition" />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-gray-400 mb-2 ml-1">Create Password</label>
            <input type="password" required className="w-full px-5 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-600 transition" />
          </div>
          <button type="submit" disabled={isLoading} className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold uppercase tracking-widest hover:bg-blue-700 transition active:scale-95">
            {isLoading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p className="mt-8 text-sm text-gray-500">
          Already have an account? <Link href="/login" className="text-blue-600 font-bold hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
}