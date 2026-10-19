"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { githubUrl, linkedinUrl } from "@/data";
import { GitHubIcon, LinkedInIcon } from "./BrandIcons";

const NAV_LINKS = [
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Skills", href: "#skills" },
  { name: "Beyond", href: "#beyond" },
  { name: "Contact", href: "#contact" },
];

// LinkedIn stays hidden until a real profile URL is set in src/data.
const SOCIAL_LINKS = [
  { name: "GitHub", href: githubUrl, Icon: GitHubIcon },
  ...(linkedinUrl ? [{ name: "LinkedIn", href: linkedinUrl, Icon: LinkedInIcon }] : []),
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Active section tracking
      const sections = NAV_LINKS.map(link => link.href.substring(1));
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 py-4",
        scrolled
          ? "bg-background/70 backdrop-blur-xl border-b border-border py-3"
          : "bg-transparent py-6"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Brand */}
        <Link href="/" className="group flex items-center gap-2">
          <span className="text-lg font-bold tracking-tighter group-hover:text-primary transition-colors">
            AKSHAY KUMAR <span className="text-primary">KOREPU</span>
          </span>
        </Link>

        {/* Center: Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "px-4 py-2 text-sm font-medium transition-all duration-300 relative rounded-full",
                  isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {link.name}
                {isActive && (
                  <motion.div
                    layoutId="nav-active"
                    className="absolute inset-0 bg-primary/10 border border-primary/20 rounded-full -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Right: Socials */}
        <div className="flex items-center gap-1.5">
          {SOCIAL_LINKS.map(({ name, href, Icon }) => (
            <Link
              key={name}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${name} (opens in a new tab)`}
              className="group relative flex size-9 items-center justify-center rounded-full border border-transparent text-muted-foreground transition-all duration-300 hover:border-primary/30 hover:bg-primary/10 hover:text-foreground hover:shadow-[0_0_18px_-6px] hover:shadow-primary/60 focus-visible:border-primary/40 focus-visible:text-foreground focus-visible:outline-none"
            >
              <Icon className="size-[18px] transition-transform duration-300 group-hover:scale-110" />
              <span
                aria-hidden
                className="pointer-events-none absolute top-full right-0 mt-2 whitespace-nowrap rounded-md border border-border bg-card/95 px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground opacity-0 translate-y-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0 group-focus-visible:opacity-100 group-focus-visible:translate-y-0"
              >
                {name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </motion.nav>
  );
}
