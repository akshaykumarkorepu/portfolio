"use client";

import React, { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Lightbulb, Cpu, Code2, Microscope } from "lucide-react";

const STAGES = [
  {
    step: "01",
    title: "IDEA",
    desc: "Define the problem and constraints. Research the domain and identify the core challenge.",
    icon: Lightbulb,
  },
  {
    step: "02",
    title: "SYSTEM",
    desc: "Design the architecture. Map out the interactions between components and data sources.",
    icon: Cpu,
  },
  {
    step: "03",
    title: "BUILD",
    desc: "Implement the product. Focus on robustness and modularity.",
    icon: Code2,
  },
  {
    step: "04",
    title: "EVALUATE",
    desc: "Measure whether the system actually works. Use metrics and evaluations to iterate.",
    icon: Microscope,
  },
];

export default function EngineeringMindset() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section id="engineering" className="py-20 md:py-32 px-6 bg-background relative overflow-hidden" ref={containerRef}>
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="mb-12 md:mb-24 space-y-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-3 py-1 rounded-full border border-primary/20 bg-primary/10 text-primary text-xs font-medium uppercase tracking-wider"
          >
            The Process
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tighter"
          >
            Idea <span className="text-primary">→</span> System <span className="text-primary">→</span> Evaluation
          </motion.h2>
        </div>

        <div className="relative flex flex-col gap-24">
          {/* Animated Connection Line */}
          <div className="absolute left-4 sm:left-8 top-0 bottom-0 w-px bg-border">
            <motion.div
              style={{ scaleY: scaleX }}
              className="absolute top-0 left-0 w-full h-full bg-primary origin-top"
            />
          </div>

          {STAGES.map((stage) => (
            <motion.div
              key={stage.step}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative pl-10 sm:pl-20 group"
            >
              {/* Dot on the line */}
              <div className="absolute left-4 sm:left-8 top-8 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-border bg-background group-hover:border-primary group-hover:bg-primary transition-all duration-300 z-10" />

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-3 space-y-2">
                  <div className="text-5xl font-black text-primary/10 group-hover:text-primary/30 transition-colors">
                    {stage.step}
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight">{stage.title}</h3>
                </div>

                <div className="md:col-span-6 p-6 sm:p-8 rounded-3xl border border-border bg-card/30 backdrop-blur-sm group-hover:border-primary/30 transition-all duration-500">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      <stage.icon size={24} />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                      Stage {stage.step}
                    </span>
                  </div>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {stage.desc}
                  </p>
                </div>

                <div className="md:col-span-3 hidden md:block">
                  <div className="h-px w-full bg-border group-hover:bg-primary/30 transition-colors" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Decorative background element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/5 rounded-full blur-[150px] pointer-events-none" />
    </section>
  );
}
