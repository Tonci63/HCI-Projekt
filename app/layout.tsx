import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { Navigation } from "./_components/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ViaCroatia",
  description: "Your Croatia Travel Guide",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen bg-white text-gray-900`}
      >
        {/* ←←← ADD YOUR NAVIGATION HERE */}
        <Navigation />

        {/* ←←← WRAP CHILDREN IN MAIN (keeps content below nav) */}
        <main className="grow">{children}</main>

        {/* Optional: simple footer (you can remove or style later) */}
        <footer className="bg-white text-gray-500 py-6 text-center text-sm border-t">
            © 2025 ViaCroatia. All rights reserved.
        </footer>

      </body>
    </html>
  );
}
