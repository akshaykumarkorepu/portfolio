"use client";

import React, { useRef } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const WORDS = "Building AI systems that turn ideas into useful products.".split(" ");

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    mouseX.set(clientX);
    mouseY.set(clientY);
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 pt-20"
    >
      {/* Sophisticated Background System */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-background" />

        {/* Subtle Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

        {/* Cursor-Reactive Glow */}
        <motion.div
          style={{
            x: springX,
            y: springY,
            translateX: "-50%",
            translateY: "-50%",
          }}
          className="absolute w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none"
        />
      </div>

      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* Text Content */}
        <div className="space-y-8 text-left">
          <div className="overflow-hidden">
            <motion.h1
              className="text-6xl md:text-8xl font-bold tracking-tighter leading-[1.05] text-foreground"
            >
              {WORDS.map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 100 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: i * 0.05,
                    ease: [0.2, 0.65, 0.3, 0.9]
                  }}
                  className="inline-block mr-3"
                >
                  {word === "AI" || word === "systems" || word === "products." ? (
                    <span className="text-primary">{word}</span>
                  ) : (
                    word
                  )}
                </motion.span>
              ))}
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed"
          >
            I&apos;m Akshay Kumar, a Mathematics & Computing student at NIT Warangal focused on AI Engineering, Generative AI, and intelligent systems.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-wrap gap-4"
          >
            <Link href="#projects">
              <Button size="lg" className="h-14 px-8 text-lg rounded-full transition-all hover:scale-105 group">
                View Projects
                <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="#contact">
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full transition-all hover:scale-105">
                Get in Touch
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Interactive AI System Visualization */}
        <div className="relative h-[500px] w-full flex items-center justify-center">
          <SystemVisualization />
        </div>
      </div>
    </section>
  );
}

function SystemVisualization() {
  const nodes = [
    { id: 'input', label: 'INPUT', y: -160 },
    { id: 'intel', label: 'INTELLIGENCE', y: -50 },
    { id: 'system', label: 'SYSTEM', y: 50 },
    { id: 'output', label: 'OUTPUT', y: 160 },
  ];

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ overflow: 'visible' }}>
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0" />
            <stop offset="50%" stopColor="var(--color-primary)" stopOpacity="1" />
            <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {nodes.map((node, i) => {
          if (i === nodes.length - 1) return null;
          const next = nodes[i + 1];
          return (
            <motion.line
              key={`line-${i}`}
              x1="50%" y1={`${50 + (node.y/500)*100}%`}
              x2="50%" y2={`${50 + (next.y/500)*100}%`}
              stroke="url(#lineGradient)"
              strokeWidth="2"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 2, delay: i * 0.5, repeat: Infinity, repeatType: "loop" }}
            />
          );
        })}
      </svg>

      <div className="relative w-full h-full">
        {nodes.map((node) => (
          <motion.div
            key={node.id}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center"
            style={{
              top: `calc(50% + ${node.y}px)`,
            }}
          >
            <div className="w-32 h-16 rounded-xl border border-primary/30 bg-card flex items-center justify-center text-center p-4 group hover:border-primary transition-colors cursor-default shadow-xl backdrop-blur-sm">
              <span className="text-[10px] font-bold tracking-widest text-muted-foreground group-hover:text-primary transition-colors uppercase">
                {node.label}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
