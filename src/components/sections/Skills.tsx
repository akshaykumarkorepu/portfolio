"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { skills } from "@/data";

export default function Skills() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  // Simple relationship map for highlighting
  const relationships: Record<string, string[]> = {
    "Generative AI": ["RAG", "LLM applications", "LangChain", "LangGraph"],
    "RAG": ["Generative AI", "LLM applications", "ChromaDB", "LangChain"],
    "LLM applications": ["Generative AI", "RAG", "LangChain", "FastAPI"],
    "LangChain": ["Generative AI", "RAG", "LLM applications", "LangGraph"],
    "LangGraph": ["LangChain", "Generative AI", "AI Agents"],
    "Python": ["FastAPI", "LangChain", "Machine Learning", "Computer Vision"],
    "TypeScript": ["Next.js", "Frontend"],
    "Next.js": ["TypeScript", "Frontend", "REST APIs"],
    "FastAPI": ["Python", "REST APIs", "SQL"],
    "SQL": ["FastAPI", "SQLite"],
    "SQLite": ["SQL", "FastAPI"],
    "ChromaDB": ["RAG", "Vector Search"],
  };

  const isRelated = (skill: string) => {
    if (!hoveredSkill) return false;
    return (
      hoveredSkill === skill ||
      (relationships[hoveredSkill] && relationships[hoveredSkill].includes(skill)) ||
      (relationships[skill] && relationships[skill].includes(hoveredSkill))
    );
  };

  return (
    <section id="skills" className="py-20 md:py-32 px-6 bg-background/50">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 md:mb-24 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-3 py-1 rounded-full border border-primary/20 bg-primary/10 text-primary text-xs font-medium uppercase tracking-wider"
          >
            Technical Stack
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tighter"
          >
            The <span className="text-primary italic">toolbelt.</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {skills.map((group, idx) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              className="space-y-8"
            >
              <div className="flex items-center justify-between border-b border-border pb-4">
                <h3 className="text-2xl font-bold tracking-tight">{group.category}</h3>
                <span className="text-xs font-mono text-muted-foreground">{group.items.length} skills</span>
              </div>

              <div className="flex flex-wrap gap-3">
                {group.items.map((item) => (
                  <motion.span
                    key={item}
                    onMouseEnter={() => setHoveredSkill(item)}
                    onMouseLeave={() => setHoveredSkill(null)}
                    whileHover={{ scale: 1.05 }}
                    className={cn(
                      "px-4 py-2 rounded-xl border text-sm transition-all duration-300 cursor-default",
                      isRelated(item)
                        ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20 z-10"
                        : "bg-muted/50 text-muted-foreground border-border hover:border-primary/50"
                    )}
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
