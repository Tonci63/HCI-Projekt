"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (isLoggedIn) {
      router.push("/");
    }
  }, [router]);

  return <section className="bg-brand-fill-bg min-h-screen">{children}</section>;
}