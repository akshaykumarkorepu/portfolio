"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ImageOff } from "lucide-react";
import type { Project } from "@/data";
import { useMediaQuery } from "@/lib/use-media-query";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * A project screenshot with a viewport reveal, hover zoom, and a small
 * overlay that hints at what the project does. Each overlay only shows
 * behaviour the project actually has.
 */
export default function ProjectImage({ project }: { project: Project }) {
  const reduce = useMediaQuery("(prefers-reduced-motion: reduce)");
  const [failed, setFailed] = useState(false);

  // The in-view trigger sits on an unclipped wrapper: a fully clipped element
  // never counts as intersecting, so it could not trigger its own reveal.
  return (
    <motion.div initial="hidden" whileInView="shown" viewport={{ once: true, margin: "-40px" }}>
    <motion.figure
      variants={{
        hidden: { clipPath: reduce ? "inset(0% 0% 0% 0% round 16px)" : "inset(0% 0% 100% 0% round 16px)", opacity: reduce ? 1 : 0 },
        shown: { clipPath: "inset(0% 0% 0% 0% round 16px)", opacity: 1, transition: { duration: reduce ? 0 : 1.1, ease: EASE } },
      }}
      className="group/image relative aspect-[16/10] overflow-hidden rounded-2xl border border-border bg-muted/40 shadow-2xl shadow-black/40 transition-shadow duration-500 hover:shadow-primary/20"
    >
      {failed ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[radial-gradient(oklch(1_0_0/0.06)_1px,transparent_1px)] bg-[size:16px_16px] text-muted-foreground">
          <ImageOff size={22} aria-hidden />
          <span className="text-sm font-semibold text-foreground">{project.title}</span>
          <span className="text-[10px] font-mono uppercase tracking-widest">Preview unavailable</span>
        </div>
      ) : (
        <motion.div
          className="absolute inset-0"
          variants={{
            hidden: { scale: reduce ? 1 : 1.12 },
            shown: { scale: 1, transition: { duration: reduce ? 0 : 1.6, ease: EASE } },
          }}
        >
          <Image
            src={project.image.src}
            alt={project.image.alt}
            fill
            sizes="(min-width: 1024px) 720px, 100vw"
            onError={() => setFailed(true)}
            className="object-cover object-top transition-transform duration-700 ease-out group-hover/image:scale-[1.04]"
          />
        </motion.div>
      )}

      {/* Readability and depth */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/85 via-background/10 to-transparent" />
      <div aria-hidden className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/5 transition-all duration-500 group-hover/image:ring-primary/30" />

      {!failed && <ProjectOverlay id={project.id} reduce={reduce} />}

      <figcaption className="absolute bottom-3 left-3 right-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" aria-hidden />
        <span className="truncate">{project.image.caption}</span>
      </figcaption>
    </motion.figure>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */

const badge =
  "rounded-full border border-primary/30 bg-background/80 px-2 py-0.5 sm:px-2.5 sm:py-1 font-mono text-[8px] sm:text-[10px] uppercase tracking-wider text-primary backdrop-blur-md shadow-lg";

function ProjectOverlay({ id, reduce }: { id: string; reduce: boolean }) {
  switch (id) {
    case "bolveda":
      return <BolvedaOverlay reduce={reduce} />;
    case "placementiq":
      return <PlacementOverlay reduce={reduce} />;
    case "lokai":
      return <LokaiOverlay reduce={reduce} />;
    case "sahva":
      return <SahvaOverlay reduce={reduce} />;
    default:
      return null;
  }
}

/** Document → retrieval: a scan passes over the page, then the answer is marked grounded. */
function BolvedaOverlay({ reduce }: { reduce: boolean }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      {!reduce && (
        <motion.div
          className="absolute inset-x-0 h-16 bg-gradient-to-b from-transparent via-primary/15 to-transparent"
          initial={{ top: "-15%" }}
          animate={{ top: ["-15%", "100%"] }}
          transition={{ duration: 3.2, repeat: Infinity, repeatDelay: 2.5, ease: "easeInOut" }}
        />
      )}
      <motion.div
        className={`absolute top-3 right-3 ${badge}`}
        variants={{ hidden: { opacity: 0, y: -6 }, shown: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 1 } } }}
      >
        Grounded · 3 sources
      </motion.div>
    </div>
  );
}

/** The structured fields PlacementIQ extracts from each interview experience. */
const PIQ_NODES = ["Company", "Round", "Topic", "Question"];

function PlacementOverlay({ reduce }: { reduce: boolean }) {
  return (
    <div aria-hidden className="pointer-events-none absolute top-3 right-3 flex items-center gap-1.5">
      {PIQ_NODES.map((node, i) => (
        <React.Fragment key={node}>
          <motion.span
            className={badge}
            initial={{ opacity: reduce ? 1 : 0.35 }}
            animate={reduce ? undefined : { opacity: [0.35, 1, 1, 0.35] }}
            transition={{ duration: 4, times: [0, 0.15, 0.7, 1], delay: i * 0.45, repeat: Infinity, repeatDelay: 1 }}
          >
            {node}
          </motion.span>
          {i < PIQ_NODES.length - 1 && <span className="hidden sm:block w-3 h-px bg-primary/50" />}
        </React.Fragment>
      ))}
    </div>
  );
}

/** Everything stays inside the machine: a boundary draws around the workbench. */
function LokaiOverlay({ reduce }: { reduce: boolean }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <svg className="absolute inset-2 h-[calc(100%-1rem)] w-[calc(100%-1rem)]" preserveAspectRatio="none" viewBox="0 0 100 100">
        <motion.rect
          x="0.5"
          y="0.5"
          width="99"
          height="99"
          rx="2"
          fill="none"
          stroke="oklch(0.7 0.1 250 / 0.6)"
          strokeWidth="0.4"
          strokeDasharray="1.5 1.5"
          vectorEffect="non-scaling-stroke"
          variants={{
            hidden: { pathLength: reduce ? 1 : 0 },
            shown: { pathLength: 1, transition: { duration: reduce ? 0 : 2, ease: "easeInOut", delay: 0.6 } },
          }}
        />
      </svg>
      <motion.div
        className={`absolute top-3 left-3 flex items-center gap-2 ${badge}`}
        variants={{ hidden: { opacity: 0, y: -6 }, shown: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 1.2 } } }}
      >
        <motion.span
          className="w-1.5 h-1.5 rounded-full bg-primary"
          animate={reduce ? undefined : { opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.6, repeat: Infinity }}
        />
        <span className="sm:hidden">Local</span>
        <span className="hidden sm:inline">Local inference · Ollama</span>
      </motion.div>
      <span className="absolute bottom-10 right-4 hidden sm:block font-mono text-[9px] uppercase tracking-widest text-primary/70">on-prem boundary</span>
    </div>
  );
}

/** Live availability: one open slot is taken by a booking. */
const SLOTS = ["10:30", "10:45", "11:00", "11:15"];

function SahvaOverlay({ reduce }: { reduce: boolean }) {
  const booked = 1;
  return (
    <div aria-hidden className="pointer-events-none absolute top-3 right-3 flex items-center gap-1.5">
      {SLOTS.map((slot, i) => (
        <span key={slot} className="relative overflow-hidden rounded-md border border-primary/30 bg-background/80 px-2 py-1 font-mono text-[10px] text-muted-foreground backdrop-blur-md shadow-lg">
          {i === booked && (
            <motion.span
              className="absolute inset-0 bg-primary"
              initial={{ scaleX: reduce ? 1 : 0 }}
              animate={reduce ? undefined : { scaleX: [0, 0, 1, 1, 0] }}
              transition={{ duration: 5, times: [0, 0.3, 0.45, 0.85, 1], repeat: Infinity }}
              style={{ originX: 0 }}
            />
          )}
          <span className={i === booked ? "relative mix-blend-difference text-white" : "relative"}>{slot}</span>
        </span>
      ))}
    </div>
  );
}
