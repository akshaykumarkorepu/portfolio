"use client";

import React, { useEffect, useRef } from "react";
import { MotionConfig, animate, motion, useInView, useMotionValue, useTransform } from "framer-motion";
import {
  ArrowUpRight,
  Bot,
  Code2,
  Footprints,
  Goal,
  GraduationCap,
  Medal,
  Rocket,
  Sigma,
  SpellCheck,
  Trophy,
  Users,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { achievements } from "@/data";
import { useMediaQuery } from "@/lib/use-media-query";

const EASE = [0.22, 1, 0.36, 1] as const;

const ICONS: Record<string, LucideIcon> = {
  trophy: Trophy,
  sigma: Sigma,
  spellcheck: SpellCheck,
  medal: Medal,
  goal: Goal,
  users: Users,
  footprints: Footprints,
  code: Code2,
  rocket: Rocket,
  graduation: GraduationCap,
  bot: Bot,
  wrench: Wrench,
};

const reveal = (i: number) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, delay: i * 0.08, ease: EASE },
});

function GroupLabel({ label, count }: { label: string; count: number }) {
  return (
    <div className="flex items-center justify-between border-b border-border pb-4 mb-8">
      <h3 className="text-xl md:text-2xl font-bold tracking-tight">{label}</h3>
      <span className="text-xs font-mono text-muted-foreground">
        {String(count).padStart(2, "0")}
      </span>
    </div>
  );
}

/** Counts up once when scrolled into view; shows the final value with reduced motion. */
function CountUp({ value, suffix, reduce }: { value: number; suffix: string; reduce: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v).toString());

  useEffect(() => {
    if (reduce) {
      count.set(value);
      return;
    }
    if (!inView) return;
    const controls = animate(count, value, { duration: 1.6, ease: EASE });
    return () => controls.stop();
  }, [inView, reduce, count, value]);

  return (
    <span ref={ref} aria-label={`${value}${suffix}`}>
      <motion.span aria-hidden>{rounded}</motion.span>
      <span aria-hidden>{suffix}</span>
    </span>
  );
}

export default function Achievements() {
  const { recognition, athletics, milestones, selections, workshops } = achievements;
  const reduce = useMediaQuery("(prefers-reduced-motion: reduce)");
  const featured = recognition.filter((item) => item.featured);
  const compact = recognition.filter((item) => !item.featured);

  return (
    <MotionConfig reducedMotion="user">
      <section id="achievements" className="py-20 md:py-32 px-6 bg-background relative overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full h-1/2 bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="mb-12 md:mb-20 space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block px-3 py-1 rounded-full border border-primary/20 bg-primary/10 text-primary text-xs font-medium uppercase tracking-wider"
            >
              Track record
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tighter"
            >
              Achievements & <span className="text-primary italic">milestones.</span>
            </motion.h2>
          </div>

          <div className="space-y-20">
            {/* 1. Achievements & Recognition */}
            <div>
              <GroupLabel label="Achievements & recognition" count={recognition.length} />
              <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {featured.map((item, i) => {
                  const Icon = ICONS[item.icon];
                  return (
                    <motion.li
                      key={item.id}
                      {...reveal(i)}
                      whileHover={{ y: -6 }}
                      className="group relative overflow-hidden rounded-3xl border border-primary/20 bg-card/60 p-6 sm:p-8 backdrop-blur-sm transition-colors duration-500 hover:border-primary/50"
                    >
                      <div
                        aria-hidden
                        className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-primary/10 blur-3xl transition-colors duration-500 group-hover:bg-primary/20 pointer-events-none"
                      />
                      <div className="relative z-10 space-y-6">
                        <div className="flex items-start justify-between gap-4">
                          <motion.div
                            className="flex size-14 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10 text-primary shadow-[0_0_30px_-8px] shadow-primary/50"
                            whileHover={{ rotate: -8, scale: 1.06 }}
                            transition={{ type: "spring", stiffness: 300, damping: 15 }}
                          >
                            <Icon size={26} aria-hidden />
                          </motion.div>
                          <span className="px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-[11px] sm:text-[10px] font-bold uppercase tracking-wider text-primary">
                            {item.result}
                          </span>
                        </div>
                        <div className="space-y-2">
                          <h4 className="text-xl font-bold tracking-tight leading-snug">{item.title}</h4>
                          <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground">{item.context}</p>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                      </div>
                    </motion.li>
                  );
                })}
                {compact.map((item, i) => {
                  const Icon = ICONS[item.icon];
                  return (
                    <motion.li
                      key={item.id}
                      {...reveal(featured.length + i)}
                      className="group flex items-center gap-4 rounded-2xl border border-border bg-card/30 px-5 py-4 transition-colors duration-300 hover:border-primary/30"
                    >
                      <span className="shrink-0 p-2 rounded-lg border border-border bg-background/60 text-primary transition-transform duration-300 group-hover:-rotate-6">
                        <Icon size={18} aria-hidden />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-foreground">{item.title}</p>
                        <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground">{item.context}</p>
                      </div>
                      <span className="shrink-0 px-2.5 py-1 rounded-full border border-border bg-muted/40 text-[11px] sm:text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                        {item.result}
                      </span>
                    </motion.li>
                  );
                })}
              </ul>
            </div>

            {/* 2. Athletic Achievements */}
            <div>
              <GroupLabel label="Athletic achievements" count={athletics.length} />
              <ul className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {athletics.map((item, i) => {
                  const Icon = ICONS[item.icon];
                  return (
                    <motion.li
                      key={item.id}
                      {...reveal(i)}
                      whileHover={{ y: -4 }}
                      className="group relative overflow-hidden rounded-2xl border border-border bg-card/40 p-5 sm:p-6 transition-colors duration-300 hover:border-primary/40"
                    >
                      <div
                        aria-hidden
                        className="absolute inset-0 bg-[repeating-linear-gradient(115deg,transparent_0_18px,oklch(0.7_0.1_250/0.05)_18px_20px)] opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none"
                      />
                      <div className="relative z-10 space-y-4">
                        <motion.span
                          className="inline-flex p-2.5 rounded-xl border border-primary/20 bg-primary/10 text-primary"
                          whileHover={{ y: -3, rotate: -10 }}
                          transition={{ type: "spring", stiffness: 300, damping: 12 }}
                        >
                          <Icon size={20} aria-hidden />
                        </motion.span>
                        <div className="space-y-1">
                          <p className="text-[11px] sm:text-[10px] font-bold uppercase tracking-wider text-primary">{item.result}</p>
                          <p className="font-semibold text-foreground leading-snug">{item.title}</p>
                        </div>
                      </div>
                    </motion.li>
                  );
                })}
              </ul>
            </div>

            {/* 3. Technical Milestones */}
            <div>
              <GroupLabel label="Technical milestones" count={milestones.length} />
              <ul className="space-y-6">
                {milestones.map((item, i) => {
                  const Icon = ICONS[item.icon];
                  return (
                    <motion.li
                      key={item.id}
                      {...reveal(i)}
                      className="group relative overflow-hidden rounded-3xl border border-primary/20 bg-card/60 p-8 md:p-10 backdrop-blur-sm transition-colors duration-500 hover:border-primary/50"
                    >
                      <span
                        aria-hidden
                        className="pointer-events-none absolute -right-4 -bottom-10 font-mono text-[10rem] md:text-[14rem] font-bold leading-none text-primary/[0.04] select-none transition-colors duration-500 group-hover:text-primary/[0.07]"
                      >
                        {"</>"}
                      </span>
                      <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-center">
                        <div className="md:col-span-5 flex items-center gap-5">
                          <div className="shrink-0 flex size-14 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10 text-primary shadow-[0_0_30px_-8px] shadow-primary/50">
                            <Icon size={26} aria-hidden />
                          </div>
                          <p className="text-6xl sm:text-7xl md:text-8xl font-black tracking-tighter leading-none text-primary">
                            <CountUp value={item.value} suffix={item.suffix} reduce={reduce} />
                          </p>
                        </div>
                        <div className="md:col-span-7 space-y-2">
                          <h4 className="text-2xl font-bold tracking-tight">{item.title}</h4>
                          <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground">{item.context}</p>
                          <p className="pt-2 text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    </motion.li>
                  );
                })}
              </ul>
            </div>

            {/* 4. Programs & Selections: not competition results */}
            <div>
              <GroupLabel label="Programs & selections" count={selections.length} />
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {selections.map((selection, i) => {
                  const Icon = ICONS[selection.icon];
                  return (
                    <motion.li
                      key={selection.id}
                      {...reveal(i)}
                      className="group relative flex flex-col sm:flex-row gap-5 rounded-3xl border border-border bg-card/30 p-6 sm:p-8 transition-colors duration-500 hover:border-primary/40 hover:bg-card/50"
                    >
                      <div className="shrink-0 flex size-12 items-center justify-center rounded-xl border border-border bg-muted/40 text-primary transition-colors duration-500 group-hover:border-primary/30 group-hover:bg-primary/10">
                        <Icon size={22} aria-hidden />
                      </div>
                      <div className="min-w-0 space-y-3">
                        <span className="inline-flex items-center gap-2 text-[11px] sm:text-[10px] font-bold uppercase tracking-wider text-primary">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" aria-hidden />
                          {selection.status}
                        </span>
                        <h4 className="text-xl font-bold tracking-tight">{selection.title}</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">{selection.desc}</p>
                        {selection.url && (
                          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-1">
                            <a
                              href={selection.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group/link inline-flex min-h-11 lg:min-h-0 items-center gap-1.5 text-sm font-medium text-primary hover:text-foreground transition-colors"
                            >
                              Visit {selection.title}
                              <ArrowUpRight size={14} className="transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" aria-hidden />
                              <span className="sr-only">(opens in a new tab)</span>
                            </a>
                            <a
                              href={`#${selection.id}`}
                              className="inline-flex min-h-11 lg:min-h-0 items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
                            >
                              More above
                            </a>
                          </div>
                        )}
                      </div>
                    </motion.li>
                  );
                })}
              </ul>
            </div>

            {/* 5. Workshops & Learning: participation, not certification */}
            <div>
              <GroupLabel label="Workshops & learning" count={workshops.length} />
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {workshops.map((workshop, i) => {
                  const Icon = ICONS[workshop.icon];
                  return (
                    <motion.li
                      key={workshop.id}
                      {...reveal(i)}
                      className="group flex items-center gap-4 rounded-2xl border border-border bg-muted/20 px-5 py-4 transition-colors duration-300 hover:border-primary/30"
                    >
                      <span className="shrink-0 p-2 rounded-lg border border-border bg-background/60 text-muted-foreground transition-all duration-300 group-hover:text-primary group-hover:border-primary/30 group-hover:-rotate-6">
                        <Icon size={18} aria-hidden />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-foreground">{workshop.title}</p>
                        <p className="text-sm text-muted-foreground">{workshop.desc}</p>
                        <p className="sm:hidden mt-1 text-[11px] sm:text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Participant</p>
                      </div>
                      <span className="hidden sm:inline shrink-0 text-[11px] sm:text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                        Participant
                      </span>
                    </motion.li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
