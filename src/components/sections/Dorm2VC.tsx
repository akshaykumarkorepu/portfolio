"use client";

import React from "react";
import { MotionConfig, motion } from "framer-motion";
import { ArrowRight, CheckCircle2, ExternalLink } from "lucide-react";
import { dorm2vc } from "@/data";

export default function Dorm2VC() {
  return (
    <MotionConfig reducedMotion="user">
      <section id="dorm2vc" className="py-20 md:py-32 px-6 bg-background relative overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="mb-10 md:mb-16 space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block px-3 py-1 rounded-full border border-primary/20 bg-primary/10 text-primary text-xs font-medium uppercase tracking-wider"
            >
              Recognition
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold tracking-tighter"
            >
              Selected — {dorm2vc.name} <span className="text-primary italic">Cohort 1.</span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-3xl border border-primary/30 bg-card/50 backdrop-blur-sm overflow-hidden group shadow-[0_40px_120px_-40px_oklch(0.7_0.1_250/0.35)]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent pointer-events-none" />
            <div className="absolute -top-24 -left-24 w-72 h-72 bg-primary/15 rounded-full blur-3xl pointer-events-none group-hover:bg-primary/25 transition-colors duration-700" />

            {/* Light travelling along the top edge */}
            <div className="absolute inset-x-0 top-0 h-px overflow-hidden">
              <motion.div
                className="h-full w-1/3 bg-gradient-to-r from-transparent via-primary to-transparent"
                initial={{ x: "-100%" }}
                animate={{ x: "300%" }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", repeatDelay: 2 }}
              />
            </div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12">
              {/* Cohort designation */}
              <div className="lg:col-span-5 p-8 md:p-12 space-y-8 border-b lg:border-b-0 lg:border-r border-border">
                <div className="space-y-1">
                  <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                    {dorm2vc.name} · {dorm2vc.fullName}
                  </p>
                  <div className="flex items-end gap-4">
                    <span className="text-8xl md:text-9xl font-black tracking-tighter leading-none text-primary">01</span>
                    <span className="pb-3 text-sm font-mono uppercase tracking-widest text-muted-foreground">Cohort</span>
                  </div>
                </div>

                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  <span className="text-[11px] sm:text-[10px] uppercase font-bold tracking-wider text-primary">Selected · Inaugural cohort</span>
                </div>

                <dl className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
                  {dorm2vc.facts.map((fact) => (
                    <div key={fact.label} className="space-y-1">
                      <dt className="text-[11px] sm:text-[10px] uppercase font-medium tracking-wider text-muted-foreground">{fact.label}</dt>
                      <dd className="text-base sm:text-lg font-bold text-foreground leading-tight">{fact.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* What it is and what I'm doing with it */}
              <div className="lg:col-span-7 p-8 md:p-12 space-y-8">
                <p className="text-lg text-muted-foreground leading-relaxed">{dorm2vc.summary}</p>

                <ul className="space-y-4">
                  {dorm2vc.highlights.map((highlight, i) => (
                    <motion.li
                      key={highlight}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.3 + i * 0.08 }}
                      className="flex items-start gap-3 text-muted-foreground leading-relaxed"
                    >
                      <CheckCircle2 size={18} className="text-primary mt-1 shrink-0" />
                      {highlight}
                    </motion.li>
                  ))}
                </ul>

                <div className="flex flex-wrap items-center gap-x-8 gap-y-4 pt-2">
                  <a
                    href={dorm2vc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 lg:min-h-0 items-center gap-2 px-5 py-2.5 rounded-full border border-primary/30 bg-primary/10 text-sm font-medium text-primary hover:bg-primary/20 hover:border-primary/50 hover:text-foreground transition-all group/visit"
                  >
                    Visit Dorm2VC
                    <ExternalLink size={14} className="group-hover/visit:-translate-y-0.5 group-hover/visit:translate-x-0.5 transition-transform" />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                  <a
                    href="#projects"
                    className="inline-flex min-h-11 lg:min-h-0 items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group/link"
                  >
                    See what I&apos;m building with SAHVA
                    <ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
}
