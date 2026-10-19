"use client";

import React, { useState } from "react";
import { MotionConfig, motion } from "framer-motion";
import {
  Aperture,
  Clapperboard,
  Compass,
  Crosshair,
  Feather,
  Gamepad2,
  Goal,
  Hammer,
  Headphones,
  MapPin,
  Play,
  Rocket,
  Sparkles,
  Telescope,
  Users,
  Waves,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { beyondTheCode as content } from "@/data";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/lib/use-media-query";

const EASE = [0.22, 1, 0.36, 1] as const;

type IconProps = React.SVGProps<SVGSVGElement> & { size?: number };

// lucide has no cricket or table-tennis glyphs; these match its stroke style.
function CricketIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M13.5 3.5 20.5 10.5 11 20a1.5 1.5 0 0 1-2.1 0L4 15.1a1.5 1.5 0 0 1 0-2.1z" />
      <path d="m4.5 19.5-2 2" />
      <circle cx="18.5" cy="19" r="2" />
    </svg>
  );
}

function TableTennisIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <circle cx="10" cy="10" r="6.5" />
      <path d="m14.6 14.6 5.4 5.4" />
      <circle cx="19.5" cy="4.5" r="1.5" />
    </svg>
  );
}

const SPORT_ICONS: Record<string, LucideIcon | ((props: IconProps) => React.ReactElement)> = {
  Cricket: CricketIcon,
  Football: Goal,
  Badminton: Feather,
  "Table tennis": TableTennisIcon,
  Swimming: Waves,
};

const MORE_ICONS = [Zap, Rocket, Telescope, Users, Hammer];

// Fixed bar heights so the server and client render the same waveform.
const WAVE = [
  0.35, 0.6, 0.85, 0.5, 0.95, 0.7, 0.4, 0.8, 0.55, 0.9, 0.45, 0.75, 0.6, 1,
  0.5, 0.7, 0.85, 0.4, 0.65, 0.9, 0.55, 0.8, 0.45, 0.7, 0.6, 0.35, 0.5, 0.75,
];

/* -------------------------------------------------------------------------- */
/* Shared card shell                                                          */
/* -------------------------------------------------------------------------- */

interface CardProps {
  className?: string;
  delay?: number;
  label: string;
  children: (active: boolean) => React.ReactNode;
}

/**
 * Tracks "active" from mouse hover, and from taps on touch screens, so every
 * card's interaction also works without a mouse. Content never depends on it.
 */
function Card({ className, delay = 0, label, children }: CardProps) {
  const [active, setActive] = useState(false);

  const handleTap = (event: MouseEvent | TouchEvent | PointerEvent) => {
    if ("pointerType" in event && event.pointerType === "mouse") return;
    setActive((value) => !value);
  };

  return (
    <motion.article
      aria-label={label}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: EASE }}
      onHoverStart={() => setActive(true)}
      onHoverEnd={() => setActive(false)}
      onTap={handleTap}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card/50 backdrop-blur-sm transition-colors duration-500 hover:border-primary/40",
        className
      )}
    >
      {children(active)}
    </motion.article>
  );
}

function IconBadge({ icon: Icon, active, spin = 0 }: { icon: LucideIcon; active: boolean; spin?: number }) {
  return (
    <motion.div
      animate={{ rotate: active ? spin : 0, scale: active ? 1.08 : 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
      className="p-2.5 rounded-xl bg-primary/10 text-primary border border-primary/20"
    >
      <Icon size={20} aria-hidden />
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/* AI Tools & Experimentation                                                 */
/* -------------------------------------------------------------------------- */

const TERMINAL = [
  { prompt: "idea", text: "something worth building", tone: "text-muted-foreground" },
  { prompt: "claude", text: "let's prototype it", tone: "text-primary" },
  { prompt: "build", text: "", bar: true, tone: "text-muted-foreground" },
  { prompt: "✓", text: "working prototype", tone: "text-foreground" },
];
const CYCLE = 8;

function AiCard({ reduce }: { reduce: boolean }) {
  return (
    <Card label={content.ai.title} className="md:col-span-2 lg:col-span-2 border-primary/25 bg-card/60" delay={0}>
      {(active) => (
        <>
          {/* Atmosphere */}
          <div className="absolute inset-0 bg-[radial-gradient(oklch(1_0_0/0.06)_1px,transparent_1px)] bg-[size:18px_18px] [mask-image:radial-gradient(ellipse_at_70%_40%,#000_20%,transparent_70%)] pointer-events-none" />
          <motion.div
            aria-hidden
            className="absolute -top-24 -right-16 w-80 h-80 rounded-full bg-primary/20 blur-3xl pointer-events-none"
            animate={reduce ? undefined : { scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10 p-8 md:p-10">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <IconBadge icon={Sparkles} active={active} spin={20} />
                <span className="text-[10px] font-mono uppercase tracking-widest text-primary">Building in the AI era</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold tracking-tight">{content.ai.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{content.ai.desc}</p>
              <ul className="space-y-2.5">
                {content.ai.items.map((item, i) => (
                  <motion.li
                    key={item}
                    animate={{ x: active ? 4 : 0 }}
                    transition={{ duration: 0.3, delay: i * 0.04 }}
                    className="flex items-start gap-3 text-sm text-muted-foreground"
                  >
                    <Sparkles size={14} className="mt-0.5 shrink-0 text-primary" aria-hidden />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Idea → prototype loop */}
            <div className="self-center rounded-2xl border border-border bg-background/80 shadow-2xl shadow-primary/10 overflow-hidden" aria-hidden>
              <div className="flex items-center gap-1.5 px-4 py-3 border-b border-border">
                <span className="w-2.5 h-2.5 rounded-full bg-muted-foreground/30" />
                <span className="w-2.5 h-2.5 rounded-full bg-muted-foreground/30" />
                <span className="w-2.5 h-2.5 rounded-full bg-primary/60" />
                <span className="ml-3 text-[10px] font-mono text-muted-foreground">~/experiments</span>
              </div>
              <div className="p-5 space-y-3 font-mono text-xs min-h-[168px]">
                {TERMINAL.map((line, i) => {
                  const start = (i * 1.3) / CYCLE;
                  const times = [0, start, Math.min(start + 0.04, 0.85), 0.88, 1];
                  return (
                    <motion.div
                      key={line.prompt}
                      className={cn("flex items-center gap-2", line.tone)}
                      initial={{ opacity: reduce ? 1 : 0 }}
                      animate={reduce ? { opacity: 1 } : { opacity: [0, 0, 1, 1, 0] }}
                      transition={reduce ? { duration: 0 } : { duration: CYCLE, times, repeat: Infinity }}
                    >
                      <span className="text-primary/70">{line.prompt === "✓" ? "✓" : "›"}</span>
                      {line.prompt !== "✓" && <span className="text-muted-foreground/70">{line.prompt}</span>}
                      {line.bar ? (
                        <span className="relative h-1.5 flex-1 rounded-full bg-muted overflow-hidden">
                          <motion.span
                            className="absolute inset-y-0 left-0 rounded-full bg-primary"
                            initial={{ width: reduce ? "100%" : "0%" }}
                            animate={reduce ? { width: "100%" } : { width: ["0%", "0%", "100%", "100%", "0%"] }}
                            transition={
                              reduce
                                ? { duration: 0 }
                                : { duration: CYCLE, times: [0, start, start + 0.14, 0.88, 1], repeat: Infinity }
                            }
                          />
                        </span>
                      ) : (
                        <span>{line.text}</span>
                      )}
                    </motion.div>
                  );
                })}
                <motion.span
                  className="inline-block w-2 h-4 bg-primary/80 align-middle"
                  animate={reduce ? undefined : { opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </Card>
  );
}

/* -------------------------------------------------------------------------- */
/* Sports                                                                     */
/* -------------------------------------------------------------------------- */

function SportsCard() {
  return (
    <Card label={content.sports.title} delay={0.08}>
      {(active) => (
        <>
          <motion.div
            aria-hidden
            className="absolute -inset-x-16 inset-y-0 bg-[repeating-linear-gradient(115deg,transparent_0_22px,oklch(0.7_0.1_250/0.06)_22px_24px)] pointer-events-none"
            animate={{ x: active ? 32 : 0 }}
            transition={{ duration: 0.9, ease: EASE }}
          />
          <div className="relative z-10 flex flex-1 flex-col gap-6 p-8">
            <div className="flex items-center justify-between">
              <div className="p-2.5 rounded-xl bg-primary/10 text-primary border border-primary/20">
                <Zap size={20} aria-hidden />
              </div>
              <span className="text-4xl font-black tracking-tighter text-primary/20 group-hover:text-primary/40 transition-colors" aria-hidden>
                0{content.sports.items.length}
              </span>
            </div>
            <div className="space-y-3">
              <h3 className="text-2xl font-bold tracking-tight">{content.sports.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{content.sports.desc}</p>
            </div>
            <ul className="mt-auto grid grid-cols-2 gap-2">
              {content.sports.items.map((sport, i) => {
                const Icon = SPORT_ICONS[sport];
                return (
                  <motion.li
                    key={sport}
                    whileHover={{ y: -3 }}
                    className="flex flex-col items-start gap-3 p-4 rounded-2xl border border-border bg-muted/40 text-sm font-medium text-muted-foreground transition-colors duration-300 group-hover:border-primary/30 hover:text-foreground last:col-span-2"
                  >
                    <motion.span
                      className="text-primary"
                      animate={active ? { y: [0, -6, 0], rotate: [0, -14, 0] } : { y: 0, rotate: 0 }}
                      transition={{ duration: 0.5, delay: i * 0.07, ease: "easeOut" }}
                    >
                      <Icon size={22} aria-hidden />
                    </motion.span>
                    {sport}
                  </motion.li>
                );
              })}
            </ul>
          </div>
        </>
      )}
    </Card>
  );
}

/* -------------------------------------------------------------------------- */
/* Gaming                                                                     */
/* -------------------------------------------------------------------------- */

const HUD_CORNERS = [
  "top-0 left-0 border-l-2 border-t-2",
  "top-0 right-0 border-r-2 border-t-2",
  "bottom-0 left-0 border-l-2 border-b-2",
  "bottom-0 right-0 border-r-2 border-b-2",
];

function GamingCard({ reduce }: { reduce: boolean }) {
  return (
    <Card label={content.gaming.title} delay={0.12}>
      {(active) => (
        <>
          {/* Scanlines */}
          <div aria-hidden className="absolute inset-0 bg-[repeating-linear-gradient(0deg,oklch(1_0_0/0.025)_0_1px,transparent_1px_3px)] pointer-events-none" />
          {/* HUD frame tightens on hover */}
          <motion.div
            aria-hidden
            className="absolute pointer-events-none"
            animate={{ inset: active ? 10 : 16 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
          >
            {HUD_CORNERS.map((corner) => (
              <span key={corner} className={cn("absolute w-4 h-4 border-primary/50 group-hover:border-primary transition-colors", corner)} />
            ))}
          </motion.div>

          <div className="relative z-10 p-8 space-y-6">
            <div className="flex items-center justify-between">
              <IconBadge icon={Gamepad2} active={active} spin={-10} />
              <motion.span
                aria-hidden
                className="text-primary/60"
                animate={{ rotate: active ? 90 : 0, scale: active ? 1.15 : 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
              >
                <Crosshair size={22} />
              </motion.span>
            </div>
            <div className="space-y-3">
              <h3 className="text-2xl font-bold tracking-tight">{content.gaming.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{content.gaming.desc}</p>
            </div>

            <div className="space-y-2">
              <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Loadout</p>
              <ul className="space-y-2">
                {content.gaming.items.map((game, i) => (
                  <li key={game} className="relative flex items-center gap-3 px-3 py-2 rounded-lg border border-border bg-background/60 overflow-hidden">
                    <motion.span
                      aria-hidden
                      className="absolute inset-y-0 left-0 bg-primary/10 origin-left"
                      initial={false}
                      animate={{ scaleX: active ? 1 : 0 }}
                      transition={{ duration: 0.45, delay: i * 0.08, ease: EASE }}
                      style={{ width: "100%" }}
                    />
                    <span className="relative font-mono text-[10px] text-primary/70">0{i + 1}</span>
                    <span className="relative text-sm font-bold tracking-wide">
                      {game === content.gaming.itemNames[i] ? game : <abbr title={content.gaming.itemNames[i]} className="no-underline">{game}</abbr>}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground" aria-hidden>
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Status: {active ? "in game" : "ready"}
              <motion.span
                className="inline-block w-1.5 h-3 bg-primary/70"
                animate={reduce ? undefined : { opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            </div>
          </div>
        </>
      )}
    </Card>
  );
}

/* -------------------------------------------------------------------------- */
/* Photography & Videography                                                  */
/* -------------------------------------------------------------------------- */

function PhotographyCard({ reduce }: { reduce: boolean }) {
  return (
    <Card label={content.photography.title} className="md:col-span-2 lg:col-span-2" delay={0.16}>
      {(active) => (
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10 p-8 md:p-10 items-center">
          {/* Viewfinder */}
          <div
            aria-hidden
            className="relative aspect-video rounded-2xl border border-border overflow-hidden"
            style={{
              backgroundColor: "oklch(0.14 0 0)",
              backgroundImage:
                "radial-gradient(ellipse at 30% 70%, oklch(0.32 0.07 250), transparent 60%), radial-gradient(ellipse at 75% 30%, oklch(0.26 0.05 230), transparent 55%)",
            }}
          >
            {/* Rule of thirds */}
            <div className="absolute inset-0 grid grid-cols-3 grid-rows-3">
              {Array.from({ length: 9 }).map((_, i) => (
                <span key={i} className="border-[0.5px] border-white/[0.07]" />
              ))}
            </div>

            {/* Cinematic letterbox */}
            <motion.div className="absolute inset-x-0 top-0 bg-black" animate={{ height: active ? "12%" : "0%" }} transition={{ duration: 0.5, ease: EASE }} />
            <motion.div className="absolute inset-x-0 bottom-0 bg-black" animate={{ height: active ? "12%" : "0%" }} transition={{ duration: 0.5, ease: EASE }} />

            {/* Focus box snaps in */}
            <motion.div
              className="absolute left-1/2 top-1/2 w-16 h-12 -translate-x-1/2 -translate-y-1/2 border-2 rounded-sm"
              animate={{
                scale: active ? 1 : 1.35,
                borderColor: active ? "oklch(0.7 0.1 250)" : "oklch(1 0 0 / 0.35)",
              }}
              transition={{ type: "spring", stiffness: 380, damping: 16 }}
            />

            {/* Shutter flash each time the card activates */}
            {active && !reduce && (
              <motion.div className="absolute inset-0 bg-white" initial={{ opacity: 0.35 }} animate={{ opacity: 0 }} transition={{ duration: 0.4 }} />
            )}

            {/* Viewfinder HUD */}
            {["top-3 left-3 border-l-2 border-t-2", "top-3 right-3 border-r-2 border-t-2", "bottom-3 left-3 border-l-2 border-b-2", "bottom-3 right-3 border-r-2 border-b-2"].map((corner) => (
              <span key={corner} className={cn("absolute w-5 h-5 border-white/50", corner)} />
            ))}
            <div className="absolute top-4 left-10 flex items-center gap-1.5 font-mono text-[10px] text-white/70">
              <motion.span
                className="w-1.5 h-1.5 rounded-full bg-destructive"
                animate={reduce ? undefined : { opacity: [1, 0.2, 1] }}
                transition={{ duration: 1.4, repeat: Infinity }}
              />
              REC
            </div>
            <span className="absolute top-4 right-10 font-mono text-[10px] text-white/60">16:9</span>
            <span className="absolute bottom-4 left-10 font-mono text-[10px] text-white/60">AF</span>
            <motion.span
              className="absolute bottom-4 right-10 font-mono text-[10px]"
              animate={{ color: active ? "oklch(0.7 0.1 250)" : "oklch(1 0 0 / 0.6)" }}
            >
              {active ? "● FOCUS" : "○ FOCUS"}
            </motion.span>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <IconBadge icon={Aperture} active={active} spin={60} />
              <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-muted/50 border border-border">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span className="text-[10px] uppercase font-bold text-muted-foreground">Learning</span>
              </span>
            </div>
            <div className="space-y-3">
              <h3 className="text-2xl md:text-3xl font-bold tracking-tight">{content.photography.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{content.photography.desc}</p>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {content.photography.items.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                  <span className="mt-[7px] w-1 h-1 rounded-full bg-primary shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </Card>
  );
}

/* -------------------------------------------------------------------------- */
/* Movies & Music                                                             */
/* -------------------------------------------------------------------------- */

function FilmStrip({ reduce, reverse = false }: { reduce: boolean; reverse?: boolean }) {
  return (
    <div aria-hidden className="relative h-5 overflow-hidden bg-background/70 border-border">
      <motion.div
        className="absolute inset-y-1 -left-5 right-0 bg-[repeating-linear-gradient(90deg,transparent_0_6px,oklch(1_0_0/0.14)_6px_14px,transparent_14px_20px)] rounded-[1px]"
        animate={reduce ? undefined : { x: reverse ? [-20, 0] : [0, -20] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}

function CinemaCard({ reduce }: { reduce: boolean }) {
  return (
    <Card label={content.cinema.title} delay={0.2} className="flex flex-col">
      {(active) => (
        <>
          <FilmStrip reduce={reduce} />
          <div className="relative z-10 flex flex-1 flex-col gap-6 p-8">
            <div className="flex items-center gap-2">
              <IconBadge icon={Clapperboard} active={active} spin={-12} />
              <IconBadge icon={Headphones} active={active} spin={8} />
            </div>
            <div className="space-y-3">
              <h3 className="text-2xl font-bold tracking-tight">{content.cinema.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{content.cinema.desc}</p>
            </div>

            {/* Waveform */}
            <div aria-hidden className="mt-auto flex items-end gap-[3px] h-14">
              {WAVE.map((h, i) => (
                <motion.span
                  key={i}
                  className="flex-1 h-full rounded-full bg-primary/60 group-hover:bg-primary origin-bottom transition-colors"
                  style={{ scaleY: h }}
                  animate={reduce ? undefined : { scaleY: [h, h * (active ? 0.25 : 0.55), h] }}
                  transition={{ duration: (active ? 0.6 : 1.4) + (i % 5) * 0.15, repeat: Infinity, ease: "easeInOut", delay: (i % 7) * 0.05 }}
                />
              ))}
            </div>

            {/* Progress */}
            <div aria-hidden className="space-y-2">
              <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                <Play size={10} className="text-primary fill-primary" />
                Now playing · whatever fits the mood
              </div>
              <div className="relative h-1 rounded-full bg-muted overflow-hidden">
                <motion.span
                  className="absolute inset-y-0 left-0 rounded-full bg-primary"
                  initial={{ width: reduce ? "40%" : "0%" }}
                  animate={reduce ? { width: "40%" } : { width: ["0%", "100%"] }}
                  transition={reduce ? { duration: 0 } : { duration: 16, repeat: Infinity, ease: "linear" }}
                />
              </div>
            </div>
          </div>
          <FilmStrip reduce={reduce} reverse />
        </>
      )}
    </Card>
  );
}

/* -------------------------------------------------------------------------- */
/* Travel & Exploration                                                       */
/* -------------------------------------------------------------------------- */

const ROUTE = "M12 98 C 60 20, 110 112, 150 62 S 238 8, 288 38";
const STOPS = [
  { left: "4%", top: "82%" },
  { left: "50%", top: "52%" },
  { left: "96%", top: "32%" },
];

function TravelCard({ reduce }: { reduce: boolean }) {
  return (
    <Card label={content.travel.title} delay={0.24}>
      {(active) => (
        <div className="relative z-10 flex flex-1 flex-col gap-6 p-8">
          <div className="flex items-center justify-between">
            <IconBadge icon={MapPin} active={active} spin={-8} />
            <motion.span
              aria-hidden
              className="text-primary/60"
              animate={{ rotate: active ? 225 : 0 }}
              transition={{ type: "spring", stiffness: 60, damping: 10 }}
            >
              <Compass size={24} />
            </motion.span>
          </div>
          <div className="space-y-3">
            <h3 className="text-2xl font-bold tracking-tight">{content.travel.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{content.travel.desc}</p>
          </div>

          {/* Map */}
          <div
            aria-hidden
            className="relative mt-auto h-36 rounded-2xl border border-border bg-background/60 bg-[radial-gradient(oklch(1_0_0/0.08)_1px,transparent_1px)] bg-[size:14px_14px] overflow-hidden"
          >
            <svg viewBox="0 0 300 120" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
              <path d={ROUTE} fill="none" stroke="oklch(1 0 0 / 0.08)" strokeWidth="2" />
              <motion.path
                d={ROUTE}
                fill="none"
                stroke="oklch(0.7 0.1 250)"
                strokeWidth="2"
                strokeDasharray="6 6"
                strokeLinecap="round"
                initial={{ pathLength: reduce ? 1 : 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.8, ease: "easeInOut", delay: 0.4 }}
              />
            </svg>
            {STOPS.map((stop, i) => {
              const last = i === STOPS.length - 1;
              return (
                <motion.div
                  key={stop.left}
                  className="absolute -translate-x-1/2 -translate-y-full"
                  style={{ left: stop.left, top: stop.top }}
                  initial={{ opacity: 0, y: -8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.5 + i * 0.6, ease: EASE }}
                >
                  <motion.div animate={{ y: active ? -4 : 0 }} transition={{ type: "spring", stiffness: 300, damping: 12, delay: i * 0.05 }}>
                    <MapPin size={18} className={last ? "text-primary fill-primary/20" : "text-muted-foreground"} />
                  </motion.div>
                  {last && !reduce && (
                    <motion.span
                      className="absolute left-1/2 top-full -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full border border-primary"
                      animate={{ scale: [0.6, 1.8], opacity: [0.8, 0] }}
                      transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
                    />
                  )}
                </motion.div>
              );
            })}
            <span className="absolute bottom-2 right-3 font-mono text-[9px] uppercase tracking-widest text-primary/80">next stop?</span>
          </div>

          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Field notes · still collecting
          </p>
        </div>
      )}
    </Card>
  );
}

/* -------------------------------------------------------------------------- */
/* A few more things                                                          */
/* -------------------------------------------------------------------------- */

function MoreCard() {
  return (
    <Card label="A few more things about me" className="md:col-span-2 lg:col-span-1" delay={0.28}>
      {() => (
        <div className="relative z-10 p-8 space-y-6">
          <h3 className="text-2xl font-bold tracking-tight">
            A few more things <span className="text-primary italic">about me.</span>
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
            {content.more.map((item, i) => {
              const Icon = MORE_ICONS[i];
              return (
                <li key={item.title} className="group/item flex items-start gap-3">
                  <span className="mt-0.5 p-1.5 rounded-lg border border-border bg-muted/40 text-muted-foreground transition-all duration-300 group-hover/item:border-primary/40 group-hover/item:bg-primary/10 group-hover/item:text-primary group-hover/item:-rotate-6">
                    <Icon size={14} aria-hidden />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{item.title}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </Card>
  );
}

/* -------------------------------------------------------------------------- */
/* Section                                                                    */
/* -------------------------------------------------------------------------- */

export default function BeyondTheCode() {
  const reduce = useMediaQuery("(prefers-reduced-motion: reduce)");

  return (
    <MotionConfig reducedMotion="user">
      <section id="beyond" className="py-32 px-6 bg-background relative overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-full h-2/3 bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="mb-20 space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block px-3 py-1 rounded-full border border-primary/20 bg-primary/10 text-primary text-xs font-medium uppercase tracking-wider"
            >
              Off the clock
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold tracking-tighter"
            >
              Beyond the <span className="text-primary italic">code.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground italic max-w-2xl leading-relaxed"
            >
              {content.subtitle}
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AiCard reduce={reduce} />
            <SportsCard />
            <GamingCard reduce={reduce} />
            <PhotographyCard reduce={reduce} />
            <CinemaCard reduce={reduce} />
            <TravelCard reduce={reduce} />
            <MoreCard />
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
