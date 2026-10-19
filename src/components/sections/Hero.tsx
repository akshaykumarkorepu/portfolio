"use client";

import React, { useRef } from "react";
import {
  MotionConfig,
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { fullName } from "@/data";
import { useIntroComplete } from "@/lib/intro";
import { useMediaQuery } from "@/lib/use-media-query";
import HeroPortrait from "./HeroPortrait";

const WORDS = "Building AI systems that turn ideas into useful products.".split(" ");

// Fixed positions so the server and client render the same particles.
const PARTICLES = [
  { left: "6%", top: "22%", size: 2, duration: 13, delay: 0 },
  { left: "14%", top: "78%", size: 3, duration: 16, delay: 3 },
  { left: "27%", top: "12%", size: 2, duration: 18, delay: 6 },
  { left: "38%", top: "88%", size: 2, duration: 14, delay: 2 },
  { left: "49%", top: "30%", size: 2, duration: 17, delay: 8 },
  { left: "57%", top: "70%", size: 3, duration: 15, delay: 4 },
  { left: "66%", top: "16%", size: 2, duration: 19, delay: 1 },
  { left: "74%", top: "84%", size: 2, duration: 13, delay: 7 },
  { left: "83%", top: "40%", size: 3, duration: 16, delay: 5 },
  { left: "91%", top: "64%", size: 2, duration: 18, delay: 9 },
  { left: "95%", top: "18%", size: 2, duration: 14, delay: 3 },
];

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const introDone = useIntroComplete();
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const finePointer = useMediaQuery("(hover: hover) and (pointer: fine)");
  const parallax = finePointer && !reduceMotion;

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  // Pointer position within the hero, normalised to -0.5..0.5, for the portrait parallax.
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const textY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const portraitScale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const portraitOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const { clientX, clientY } = e;
    mouseX.set(clientX);
    mouseY.set(clientY);

    if (!parallax) return;
    const rect = e.currentTarget.getBoundingClientRect();
    pointerX.set((clientX - rect.left) / rect.width - 0.5);
    pointerY.set((clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <MotionConfig reducedMotion="user">
      <section
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 pt-28 pb-20 lg:pt-20 lg:pb-0"
      >
        {/* Sophisticated Background System */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-background" />

          {/* Subtle Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

          {/* Sparse drifting particles */}
          {PARTICLES.map((p) => (
            <motion.span
              key={`${p.left}-${p.top}`}
              aria-hidden
              className="absolute rounded-full bg-primary"
              style={{ left: p.left, top: p.top, width: p.size, height: p.size }}
              initial={{ opacity: 0 }}
              animate={reduceMotion ? { opacity: 0.25 } : { opacity: [0, 0.5, 0], y: [0, -28] }}
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : { duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }
              }
            />
          ))}

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

        <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-center">

          {/* Text Content */}
          <motion.div
            style={reduceMotion ? undefined : { y: textY, opacity: textOpacity }}
            className="space-y-8 text-left lg:col-span-7"
          >
            <div className="overflow-hidden">
              <motion.h1
                className="text-6xl md:text-8xl font-bold tracking-tighter leading-[1.05] text-foreground"
              >
                {WORDS.map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 100 }}
                    animate={introDone ? { opacity: 1, y: 0 } : undefined}
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
              animate={introDone ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed"
            >
              I&apos;m {fullName}, a Mathematics & Computing student at NIT Warangal focused on AI Engineering, Generative AI, and intelligent systems.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={introDone ? { opacity: 1, y: 0 } : undefined}
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
          </motion.div>

          {/* Portrait */}
          <motion.div
            style={reduceMotion ? undefined : { y: portraitY, scale: portraitScale, opacity: portraitOpacity }}
            className="lg:col-span-5"
          >
            <HeroPortrait
              pointerX={pointerX}
              pointerY={pointerY}
              ready={introDone}
              reduceMotion={reduceMotion}
            />
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
}
