"use client";

import React from "react";
import { motion } from "framer-motion";

const BUILDING = [
  {
    title: "AI Engineering",
    desc: "Exploring production-grade AI systems and agentic workflows.",
    status: "Exploring",
  },
  {
    title: "AI Agents",
    desc: "Experimenting with multi-agent architectures and orchestration.",
    status: "Building",
  },
  {
    title: "AI Automation",
    desc: "Building workflows using AI + automation tools.",
    status: "Exploring",
  },
];

export default function CurrentlyBuilding() {
  return (
    <section className="py-32 px-6 bg-background relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="mb-24 space-y-4 text-center">
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
          {BUILDING.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-10 rounded-3xl border border-border bg-card/50 backdrop-blur-sm group hover:border-primary/40 transition-all duration-500 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-10 transition-opacity">
                <div className="w-24 h-24 bg-primary rounded-full blur-3xl" />
              </div>

              <div className="relative z-10 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold tracking-tight">{item.title}</h3>
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-muted/50 border border-border">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    <span className="text-[10px] uppercase font-bold text-muted-foreground">{item.status}</span>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Subtle background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
    </section>
  );
}
