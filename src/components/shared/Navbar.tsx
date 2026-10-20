"use client";

import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
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
  const [menuOpen, setMenuOpen] = useState(false);

  // Close the mobile menu on Escape, a tap outside it, or the viewport growing past the menu breakpoint.
  const navRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    const onPointer = (e: PointerEvent) => {
      if (!navRef.current?.contains(e.target as Node)) setMenuOpen(false);
    };
    const wide = window.matchMedia("(min-width: 1024px)");
    const onResize = () => wide.matches && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    wide.addEventListener("change", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
      wide.removeEventListener("change", onResize);
    };
  }, [menuOpen]);

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
      ref={navRef}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-4 sm:px-6 py-4",
        menuOpen
          ? "bg-background/95 backdrop-blur-xl border-b border-border py-3"
          : scrolled
          ? "bg-background/70 backdrop-blur-xl border-b border-border py-3"
          : "bg-transparent py-6"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Brand */}
        <Link href="/" onClick={() => setMenuOpen(false)} className="group flex min-h-11 lg:min-h-0 items-center gap-2">
          <span className="whitespace-nowrap text-base sm:text-lg font-bold tracking-tighter group-hover:text-primary transition-colors">
            AKSHAY KUMAR <span className="text-primary">KOREPU</span>
          </span>
        </Link>

        {/* Center: Navigation */}
        <div className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "px-4 py-2 pointer-coarse:py-3 text-sm font-medium transition-all duration-300 relative rounded-full",
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

        {/* Right: Socials (lg+) */}
        <div className="hidden lg:flex items-center gap-1.5">
          {SOCIAL_LINKS.map(({ name, href, Icon }) => (
            <Link
              key={name}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${name} (opens in a new tab)`}
              className="group relative flex size-9 pointer-coarse:size-11 items-center justify-center rounded-full border border-transparent text-muted-foreground transition-all duration-300 hover:border-primary/30 hover:bg-primary/10 hover:text-foreground hover:shadow-[0_0_18px_-6px] hover:shadow-primary/60 focus-visible:border-primary/40 focus-visible:text-foreground focus-visible:outline-none"
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

        {/* Right: Menu button (below lg) */}
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className="lg:hidden flex size-11 items-center justify-center rounded-full border border-border bg-card/60 text-foreground backdrop-blur-md transition-colors hover:border-primary/40 active:bg-primary/10"
        >
          <motion.span
            key={menuOpen ? "close" : "open"}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </motion.span>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
            <motion.div
              id="mobile-menu"
              className="lg:hidden overflow-hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <ul className="pt-4 pb-2 space-y-1">
                {NAV_LINKS.map((link, i) => {
                  const isActive = activeSection === link.href.substring(1);
                  return (
                    <motion.li
                      key={link.name}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.04 * i, duration: 0.25 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setMenuOpen(false)}
                        className={cn(
                          "flex min-h-12 items-center justify-between rounded-2xl px-4 text-lg font-medium tracking-tight transition-colors",
                          isActive
                            ? "bg-primary/10 border border-primary/20 text-foreground"
                            : "border border-transparent text-muted-foreground active:bg-muted/50 hover:text-foreground"
                        )}
                      >
                        {link.name}
                        {isActive && <span className="w-1.5 h-1.5 rounded-full bg-primary" aria-hidden />}
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
              <div className="flex items-center gap-2 border-t border-border pt-4 pb-2 mt-2">
                {SOCIAL_LINKS.map(({ name, href, Icon }) => (
                  <Link
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-11 flex-1 items-center justify-center gap-2 rounded-full border border-border bg-card/60 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:border-primary/40"
                  >
                    <Icon className="size-[18px]" />
                    {name}
                    <span className="sr-only">(opens in a new tab)</span>
                  </Link>
                ))}
              </div>
            </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
