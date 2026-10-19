"use client";

import React from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { githubUrl } from "@/data";

// Decorative bars with fixed heights; random values would differ between server and client renders.
const BAR_HEIGHTS = [
  42, 68, 25, 90, 55, 33, 77, 61, 18, 84, 47, 70, 29, 95, 52,
  38, 81, 64, 22, 73, 58, 35, 88, 44, 66, 27, 79, 50, 31, 86,
];

export default function GithubActivity() {
  return (
    <section id="github" className="py-32 px-6 bg-background relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="mb-24 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-3 py-1 rounded-full border border-primary/20 bg-primary/10 text-primary text-xs font-medium uppercase tracking-wider"
          >
            Open Source
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tighter"
          >
            More things I&apos;ve <span className="text-primary italic">built.</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <p className="text-xl text-muted-foreground leading-relaxed">
              I believe in building in public and contributing to the ecosystem.
              My GitHub is where I experiment with new architectures,
              test AI theories, and maintain my project codebase.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild className="rounded-full h-14 px-8 text-lg transition-all hover:scale-105 group">
                <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  Explore GitHub
                  <ExternalLink size={20} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="relative p-12 rounded-3xl border border-border bg-card/30 backdrop-blur-sm overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center text-center space-y-8">
              <div className="p-6 rounded-full bg-muted text-muted-foreground group-hover:text-primary transition-colors border border-border">
                <span className="text-2xl font-black">GH</span>
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold tracking-tight">Build Activity</h3>
                <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                  Real-time contribution metrics and public repository data.
                </p>
              </div>

              <div className="w-full h-32 flex items-end gap-2 justify-center opacity-30">
                {BAR_HEIGHTS.map((height, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    whileInView={{ height: `${height}%` }}
                    transition={{ duration: 1, delay: i * 0.03 }}
                    className="w-2 bg-primary rounded-t-sm"
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
