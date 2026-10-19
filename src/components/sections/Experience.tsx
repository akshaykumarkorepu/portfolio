"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { experiences, type Experience as ExperienceEntry } from "@/data";

const CATEGORY_STYLES: Record<ExperienceEntry["category"], string> = {
  leadership: "border-primary/30 bg-primary/10 text-primary",
  technical: "border-border bg-muted/50 text-foreground",
  community: "border-border bg-muted/30 text-muted-foreground",
};

export default function Experience() {
  return (
    <section id="experience" className="py-32 px-6 bg-background relative overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="mb-24 space-y-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-3 py-1 rounded-full border border-primary/20 bg-primary/10 text-primary text-xs font-medium uppercase tracking-wider"
          >
            The Journey
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tighter"
          >
            Growth & <span className="text-primary italic">impact.</span>
          </motion.h2>
        </div>

        <div className="relative space-y-24">
          {/* Vertical Path */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2">
            <motion.div
              initial={{ height: 0 }}
              whileInView={{ height: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="w-full bg-primary origin-top"
            />
          </div>

          {experiences.map((exp, idx) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className={cn(
                "relative flex flex-col md:flex-row items-center gap-12",
                idx % 2 === 0 ? "md:flex-row-reverse" : ""
              )}
            >
              {/* Timeline Marker */}
              <div className="absolute left-4 md:left-1/2 top-10 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-primary bg-background z-10" />

              <div className="flex-1 pl-12 md:pl-0 space-y-4">
                <div className="space-y-1">
                  <span
                    className={cn(
                      "inline-block mb-2 px-2 py-0.5 rounded-full border text-[10px] font-bold uppercase tracking-wider",
                      CATEGORY_STYLES[exp.category]
                    )}
                  >
                    {exp.category}
                  </span>
                  <h3 className="text-2xl font-bold tracking-tight">{exp.organization}</h3>
                  {exp.previousRoles?.map((previous) => (
                    <div key={previous} className="text-sm text-muted-foreground">
                      <p>{previous}</p>
                      <ArrowDown size={14} className="my-1 text-primary/60" aria-label="then" />
                    </div>
                  ))}
                  <p className="text-primary font-medium">{exp.role}</p>
                  {exp.duration && (
                    <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">{exp.duration}</span>
                  )}
                </div>

                {exp.description.length > 0 && (
                  <ul className="space-y-3">
                    {exp.description.map((item, i) => (
                      <li key={i} className="text-muted-foreground leading-relaxed text-sm flex items-start gap-3">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-primary shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="hidden md:block flex-1" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/5 rounded-full blur-[150px] pointer-events-none" />
    </section>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}
