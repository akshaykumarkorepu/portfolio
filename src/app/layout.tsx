import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientLayout from "./layout-client";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Akshay Kumar — AI Engineer & Builder",
  description: "Akshay Kumar is a Mathematics & Computing student at NIT Warangal building AI systems, intelligent applications, and developer-focused products.",
  openGraph: {
    title: "Akshay Kumar — AI Engineer & Builder",
    description: "Mathematics & Computing student at NIT Warangal focusing on AI Engineering and Generative AI.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClientLayout>
      {children}
    </ClientLayout>
  );
}
