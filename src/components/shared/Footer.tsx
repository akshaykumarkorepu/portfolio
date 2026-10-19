import React from "react";
import Link from "next/link";
import { emailHref, fullName, githubUrl, linkedinUrl } from "@/data";

export default function Footer() {
  return (
    <footer className="py-16 px-6 border-t border-border bg-background">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="space-y-4 text-center md:text-left">
          <p className="font-bold tracking-tighter text-xl">{fullName}</p>
          <p className="text-sm text-muted-foreground max-w-xs">
            Mathematics & Computing student at NIT Warangal focused on AI systems and product engineering.
          </p>
        </div>

        <div className="flex items-center gap-6">
          <Link href={githubUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors text-xs font-bold tracking-widest uppercase">
            GitHub
          </Link>
          {linkedinUrl && (
            <Link href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors text-xs font-bold tracking-widest uppercase">
              LinkedIn
            </Link>
          )}
          <Link href={emailHref} className="text-muted-foreground hover:text-foreground transition-colors text-xs font-bold tracking-widest uppercase">
            Email
          </Link>
        </div>

        <p className="text-xs text-muted-foreground font-mono">
          © 2026 {fullName.toUpperCase()}
        </p>
      </div>
    </footer>
  );
}
