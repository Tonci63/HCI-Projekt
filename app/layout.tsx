import type { Metadata } from "next";

import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

import { Navigation } from "./_components/navigation";

import ThemeWrapper from "./_components/ThemeWrapper"; // Importaj ga



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

        {/* ThemeWrapper ide oko svega, ali unutar bodyja */}

        <ThemeWrapper>

          <div className="flex flex-col min-h-screen">

            <Navigation />

            <main className="grow">{children}</main>

            <footer className="py-6 text-center text-sm border-t opacity-50">

                © 2025 ViaCroatia. All rights reserved.

            </footer>

          </div>

        </ThemeWrapper>

      </body>

    </html>

  );

} 