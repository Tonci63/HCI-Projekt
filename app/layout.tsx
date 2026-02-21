import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navigation } from "./_components/navigation";
import ThemeWrapper from "./_components/ThemeWrapper"; 
import Link from "next/link";

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
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeWrapper>
          <div className="flex flex-col min-h-screen">
            <Navigation />
            
            {/* OVA LINIJA ISPOD JE KLJUČNA DA SE VRATI SADRŽAJ */}
            <main className="grow">{children}</main>
            
            <footer className="py-10 text-center border-t border-gray-200 dark:border-gray-800">
              <div className="flex flex-wrap justify-center gap-6 mb-4 text-sm font-medium opacity-70">
                <Link href="/about" className="hover:text-blue-600 transition-colors">About Us</Link>
                <Link href="/contact" className="hover:text-blue-600 transition-colors">Contact</Link>
                <Link href="/privacy" className="hover:text-blue-600 transition-colors">Privacy Policy</Link>
                <Link href="/terms" className="hover:text-blue-600 transition-colors">Terms of Service</Link>
              </div>
              <p className="text-xs opacity-40">
                © 2026 ViaCroatia. All rights reserved.
              </p>
            </footer>
          </div>
        </ThemeWrapper>
      </body>
    </html>
  );
}