"use client";

import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import CustomCursor from "@/components/shared/CustomCursor";
import LoadingScreen from "@/components/shared/LoadingScreen";
import ScrollProgress from "@/components/shared/ScrollProgress";
import { IntroContext } from "@/lib/intro";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans bg-background text-foreground`}>
        <AnimatePresence>
          {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
        </AnimatePresence>

        <CustomCursor />
        <ScrollProgress />
        <Navbar />
        <IntroContext.Provider value={!isLoading}>
          <main className="overflow-x-clip">{children}</main>
        </IntroContext.Provider>
      </body>
    </html>
  );
}
