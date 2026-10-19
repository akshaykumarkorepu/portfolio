import type { Metadata } from "next";
import "./globals.css";
import ClientLayout from "./layout-client";
import { fullName } from "@/data";

export const metadata: Metadata = {
  title: `${fullName} — AI Engineer & Builder`,
  description: `${fullName} is a Mathematics & Computing student at NIT Warangal building AI systems, intelligent applications, and developer-focused products.`,
  openGraph: {
    title: `${fullName} — AI Engineer & Builder`,
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
