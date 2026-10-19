"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { exploringTopics } from "@/data";

export default function About() {
  const [hoveredTopic, setHoveredTopic] = useState<string | null>(null);

  return (
    <section id="about" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">

          {/* Left Column: Intro */}
          <div className="lg:col-span-6 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">
                Deep dive into the <span className="text-primary italic">systems.</span>
              </h2>

              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  I like understanding how things work underneath the abstraction layer.
                  My work sits at the intersection of software engineering, machine learning, and AI systems.
                </p>
                <p>
                  I enjoy taking an idea from a rough concept, designing the underlying architecture,
                  building the system, and evaluating whether it actually works.
                </p>
                <p>
                  Currently pursuing my B.Tech in <span className="text-foreground font-medium underline decoration-primary/30 underline-offset-4">Mathematics & Computing at NIT Warangal</span>,
                  where I combine theoretical rigor with a builder&apos;s mindset.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Interactive Interests */}
          <div className="lg:col-span-6 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative p-12 rounded-3xl border border-border bg-card/50 backdrop-blur-sm overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />

              <div className="relative z-10 space-y-8">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold tracking-tight flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    Currently exploring
                  </h3>
                  <Sparkles size={20} className="text-primary/50" />
                </div>

                <div className="relative">
                  <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4">
                    AI Engineering
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {exploringTopics.map((topic) => (
                      <motion.span
                        key={topic}
                        onMouseEnter={() => setHoveredTopic(topic)}
                        onMouseLeave={() => setHoveredTopic(null)}
                        whileHover={{ scale: 1.05, y: -2 }}
                        className={cn(
                          "px-4 py-2 rounded-xl border text-sm transition-all duration-300 cursor-default",
                          hoveredTopic === topic
                            ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20"
                            : "bg-muted/50 text-muted-foreground border-border hover:border-primary/50"
                        )}
                      >
                        {topic}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Subtle background decoration */}
              <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-colors" />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}
