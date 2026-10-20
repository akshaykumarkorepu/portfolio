"use client";

import React from "react";
import { motion } from "framer-motion";
import { exploringAreas, exploringFocus } from "@/data";

export default function CurrentlyBuilding() {
  return (
    <section className="py-20 md:py-32 px-6 bg-background relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="mb-12 md:mb-24 space-y-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-3 py-1 rounded-full border border-primary/20 bg-primary/10 text-primary text-xs font-medium uppercase tracking-wider"
          >
            Now
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tighter"
          >
            Currently <span className="text-primary italic">exploring.</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {exploringAreas.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-7 sm:p-10 rounded-3xl border border-border bg-card/50 backdrop-blur-sm group hover:border-primary/40 transition-all duration-500 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-10 transition-opacity">
                <div className="w-24 h-24 bg-primary rounded-full blur-3xl" />
              </div>

              <div className="relative z-10 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold tracking-tight">{item.title}</h3>
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-muted/50 border border-border">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    <span className="text-[11px] sm:text-[10px] uppercase font-bold text-muted-foreground">{item.status}</span>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}

          {/* Wider card for the area with the most to say */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: exploringAreas.length * 0.1 }}
            className="md:col-span-3 p-7 sm:p-10 rounded-3xl border border-border bg-card/50 backdrop-blur-sm group hover:border-primary/40 transition-all duration-500 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-10 transition-opacity">
              <div className="w-24 h-24 bg-primary rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
              <div className="lg:col-span-5 space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <h3 className="text-2xl font-bold tracking-tight">{exploringFocus.title}</h3>
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-muted/50 border border-border">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    <span className="text-[11px] sm:text-[10px] uppercase font-bold text-muted-foreground">{exploringFocus.status}</span>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {exploringFocus.desc}
                </p>
              </div>

              <ul className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {exploringFocus.themes.map((theme) => (
                  <li
                    key={theme}
                    className="flex items-start gap-3 p-4 rounded-2xl border border-border bg-muted/30 text-sm text-muted-foreground leading-relaxed"
                  >
                    <span className="mt-2 w-1 h-1 rounded-full bg-primary shrink-0" />
                    {theme}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Subtle background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
    </section>
  );
}
