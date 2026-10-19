"use client";

import React from "react";
import Image from "next/image";
import { motion, useSpring, useTransform, type MotionValue } from "framer-motion";
import { fullName, portraitSrc } from "@/data";

const EASE = [0.22, 1, 0.36, 1] as const;
const NODES = ["Input", "Intelligence", "System", "Output"];
const CORNERS = [
  "-left-3 -top-3 border-l border-t",
  "-right-3 -top-3 border-r border-t",
  "-left-3 -bottom-3 border-l border-b",
  "-right-3 -bottom-3 border-r border-b",
];

interface HeroPortraitProps {
  /** Pointer position within the hero, normalised to -0.5..0.5. Stays at 0 when parallax is off. */
  pointerX: MotionValue<number>;
  pointerY: MotionValue<number>;
  /** Start the entrance once the intro loader has cleared. */
  ready: boolean;
  reduceMotion: boolean;
}

export default function HeroPortrait({ pointerX, pointerY, ready, reduceMotion }: HeroPortraitProps) {
  const spring = { stiffness: 70, damping: 20, mass: 0.6 };
  const px = useSpring(pointerX, spring);
  const py = useSpring(pointerY, spring);

  // Each layer moves a different amount, which reads as depth.
  const tiltX = useTransform(py, (v) => v * -6);
  const tiltY = useTransform(px, (v) => v * 8);
  const frameX = useTransform(px, (v) => v * 16);
  const frameY = useTransform(py, (v) => v * 16);
  const imageX = useTransform(px, (v) => v * -14);
  const imageY = useTransform(py, (v) => v * -14);
  const glowX = useTransform(px, (v) => v * 40);
  const glowY = useTransform(py, (v) => v * 40);
  const railX = useTransform(px, (v) => v * 28);
  const railY = useTransform(py, (v) => v * 28);

  const enter = (delay: number, duration: number) =>
    reduceMotion ? { duration: 0 } : { duration, delay, ease: EASE };

  return (
    <div className="group relative ml-auto mr-[2%] w-[80%] max-w-[360px] [perspective:1200px] sm:mr-[10%] lg:mr-0 lg:w-full lg:max-w-[420px]">
      {/* Slow geometric ring behind the frame */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-4 -top-8 size-28 rounded-full border border-dashed border-primary/20 sm:-right-12 sm:-top-12 sm:size-44"
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1, rotate: reduceMotion ? 0 : 360 } : undefined}
        transition={{
          opacity: enter(1, 1.2),
          rotate: { duration: 90, repeat: Infinity, ease: "linear" },
        }}
      />

      {/* Blue atmosphere behind the portrait */}
      <motion.div
        aria-hidden
        style={{ x: glowX, y: glowY }}
        className="pointer-events-none absolute -inset-8"
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : undefined}
        transition={enter(0.6, 1.4)}
      >
        <motion.div
          className="size-full rounded-[2.5rem] bg-primary/25 blur-3xl transition-colors duration-700 group-hover:bg-primary/35"
          animate={reduceMotion ? undefined : { opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      <motion.div style={{ x: frameX, y: frameY, rotateX: tiltX, rotateY: tiltY }} className="relative">
        {/* Editorial crop marks */}
        {CORNERS.map((position, i) => (
          <motion.span
            key={position}
            aria-hidden
            className={`pointer-events-none absolute size-4 border-primary/50 ${position}`}
            initial={{ opacity: 0 }}
            animate={ready ? { opacity: 1 } : undefined}
            transition={enter(1.2 + i * 0.08, 0.6)}
          />
        ))}

        <motion.div
          className="interactive group/frame relative aspect-[4/5] overflow-hidden rounded-[1.75rem] border border-primary/20 bg-card shadow-[0_40px_100px_-30px_oklch(0.7_0.1_250/0.45)]"
          initial={{ clipPath: "inset(100% 0% 0% 0% round 28px)", opacity: 0 }}
          animate={ready ? { clipPath: "inset(0% 0% 0% 0% round 28px)", opacity: 1 } : undefined}
          transition={enter(0.35, 1.4)}
          whileHover={reduceMotion ? undefined : { y: -6, transition: { duration: 0.5, ease: EASE } }}
        >
          <motion.div className="absolute -inset-5" style={{ x: imageX, y: imageY }}>
            <motion.div
              className="relative size-full origin-[62%_0%]"
              initial={{ scale: reduceMotion ? 1.12 : 1.3 }}
              animate={ready ? { scale: 1.12 } : undefined}
              transition={enter(0.35, 1.8)}
            >
              <Image
                src={portraitSrc}
                alt={fullName}
                fill
                loading="eager"
                fetchPriority="high"
                sizes="(min-width: 1024px) 520px, 90vw"
                className="object-cover object-[62%_0%] brightness-[0.78] contrast-[1.08] saturate-[0.6] transition-[filter] duration-700 group-hover/frame:brightness-[0.9] group-hover/frame:saturate-[0.8]"
              />
            </motion.div>
          </motion.div>

          {/* Colour grade: cool the scene and sink its edges into the page */}
          <div aria-hidden className="absolute inset-0 bg-primary/25 mix-blend-color" />
          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,transparent_35%,oklch(0.12_0_0/0.75)_100%)]"
          />
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-background via-background/60 to-transparent"
          />

          {/* Rim light */}
          <div
            aria-hidden
            className="absolute inset-0 rounded-[inherit] shadow-[inset_0_1px_0_0_oklch(1_0_0/0.12),inset_0_0_60px_0_oklch(0.7_0.1_250/0.2)]"
          />
          <motion.div
            aria-hidden
            className="absolute right-0 top-[10%] h-[55%] w-px bg-gradient-to-b from-transparent via-primary to-transparent"
            initial={{ opacity: 0 }}
            animate={ready ? { opacity: reduceMotion ? 0.7 : [0.4, 0.9, 0.4] } : undefined}
            transition={
              reduceMotion ? { duration: 0 } : { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.6 }
            }
          />

          {/* Light sweep */}
          {!reduceMotion && (
            <motion.div
              aria-hidden
              className="pointer-events-none absolute -inset-y-1/4 left-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-[oklch(0.85_0.06_250/0.14)] to-transparent"
              initial={{ x: "-150%" }}
              animate={ready ? { x: "450%" } : undefined}
              transition={{ duration: 2.4, ease: "easeInOut", delay: 1.8, repeat: Infinity, repeatDelay: 6 }}
            />
          )}

          <motion.div
            className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3 whitespace-nowrap font-mono text-[9px] uppercase tracking-wider text-muted-foreground sm:inset-x-5 sm:bottom-5 sm:text-[10px] sm:tracking-widest"
            initial={{ opacity: 0, y: 8 }}
            animate={ready ? { opacity: 1, y: 0 } : undefined}
            transition={enter(1.3, 0.8)}
          >
            <span>Mathematics &amp; Computing</span>
            <span className="text-primary/80">NIT Warangal</span>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* System rail along the portrait's edge (desktop) */}
      <motion.div
        aria-hidden
        style={{ x: railX, y: railY }}
        className="absolute -left-14 bottom-[24%] top-[12%] z-10 hidden w-28 flex-col items-center justify-between lg:flex"
      >
        <div className="absolute bottom-4 left-1/2 top-4 w-px -translate-x-1/2 bg-gradient-to-b from-primary/0 via-primary/40 to-primary/0" />
        {!reduceMotion && (
          <motion.span
            className="absolute left-1/2 size-1.5 -translate-x-1/2 rounded-full bg-primary shadow-[0_0_12px_2px] shadow-primary/60"
            initial={{ top: "4%", opacity: 0 }}
            animate={ready ? { top: ["4%", "96%"], opacity: [0, 1, 1, 0] } : undefined}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 2, repeatDelay: 0.8 }}
          />
        )}
        {NODES.map((label, i) => (
          <motion.div
            key={label}
            className="relative rounded-lg border border-primary/30 bg-card/80 px-3 py-2 shadow-xl backdrop-blur-md"
            initial={{ opacity: 0, x: -16 }}
            animate={ready ? { opacity: 1, x: 0 } : undefined}
            transition={enter(1 + i * 0.12, 0.6)}
          >
            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{label}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* The same flow as a strip under the portrait (mobile and tablet) */}
      <motion.div
        aria-hidden
        className="mt-6 flex items-center gap-1 sm:gap-1.5 lg:hidden"
        initial={{ opacity: 0, y: 10 }}
        animate={ready ? { opacity: 1, y: 0 } : undefined}
        transition={enter(1.2, 0.6)}
      >
        {NODES.map((label, i) => (
          <React.Fragment key={label}>
            <span className="rounded-md border border-primary/30 bg-card/80 px-1.5 py-1 text-[8px] font-bold uppercase tracking-wide text-muted-foreground sm:px-2 sm:text-[9px] sm:tracking-wider">
              {label}
            </span>
            {i < NODES.length - 1 && <span className="h-px min-w-1.5 flex-1 bg-primary/30" />}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
}
