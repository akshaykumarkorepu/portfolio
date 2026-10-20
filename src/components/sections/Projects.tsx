"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ExternalLink } from "lucide-react";
import { projects, type Project } from "@/data";
import { Button } from "@/components/ui/button";
import ProjectDetails from "./ProjectDetails";
import ProjectImage from "./ProjectImage";

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const project = projects.find((p) => p.id === selectedProject);

  return (
    <section id="projects" className="py-20 md:py-32 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12 md:mb-24 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-3 py-1 rounded-full border border-primary/20 bg-primary/10 text-primary text-xs font-medium uppercase tracking-wider"
          >
            Engineering Proof
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tighter"
          >
            Built with <span className="text-primary italic">intention.</span>
          </motion.h2>
        </div>

        {/* Project Showcases */}
        <div className="space-y-32">
          {projects.map((project, idx) => (
            <ProjectShowcase
              key={project.id}
              project={project}
              index={idx}
              onSelect={() => setSelectedProject(project.id)}
            />
          ))}
        </div>

        {/* Detail Modal */}
        <AnimatePresence>
          {selectedProject && project && (
            <ProjectDetails
              project={project}
              onClose={() => setSelectedProject(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

function ProjectShowcase({ project, index, onSelect }: { project: Project; index: number; onSelect: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.1 }}
      className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
    >
      {/* Left: Metadata */}
      <div className="lg:col-span-4 space-y-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <span className="text-sm font-mono text-primary/50">0{index + 1}</span>
            {project.status && (
              <span className="px-2 py-0.5 rounded-full border border-primary/20 bg-primary/10 text-primary text-[11px] sm:text-[10px] font-bold uppercase tracking-wider">
                {project.status}
              </span>
            )}
          </div>
          <h3 className="text-4xl md:text-5xl font-bold tracking-tighter">{project.title}</h3>
          <p className="text-lg text-muted-foreground">{project.subtitle}</p>
          {project.team && (
            <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
              {project.team.name}
              {project.team.tagline && <span className="text-primary/70"> · {project.team.tagline}</span>}
            </p>
          )}
        </div>

        <p className="text-muted-foreground leading-relaxed max-w-sm">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span key={tech} className="text-[11px] sm:text-[10px] uppercase font-bold px-2 py-1 rounded-md bg-muted text-muted-foreground border border-border">
              {tech}
            </span>
          ))}
        </div>

        <div className="pt-6 flex flex-wrap items-center gap-4">
          <Button
            variant="outline"
            className="rounded-full group h-12 px-6 transition-all hover:scale-105"
            onClick={onSelect}
          >
            Explore System
            <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
          </Button>
          {project.links.demo && (
            <a
              href={project.links.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="group/demo inline-flex items-center gap-2 h-12 px-6 rounded-full border border-primary/30 bg-primary/10 text-sm font-medium text-primary transition-all hover:scale-105 hover:border-primary/50 hover:bg-primary/20 hover:text-foreground"
            >
              Live Demo
              <ExternalLink size={14} className="transition-transform group-hover/demo:-translate-y-0.5 group-hover/demo:translate-x-0.5" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          )}
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} on GitHub`}
              className="inline-flex min-h-11 min-w-11 items-center justify-center lg:block lg:min-h-0 lg:min-w-0 p-3 text-muted-foreground hover:text-foreground transition-colors"
            >
              <span className="text-xs font-bold">GH</span>
            </a>
          )}
        </div>
      </div>

      {/* Right: Visual Representation */}
      <div className="lg:col-span-8">
        <div className="relative p-4 sm:p-8 rounded-3xl border border-border bg-card/30 backdrop-blur-sm overflow-hidden group transition-all duration-500 hover:-translate-y-1 hover:border-primary/30">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />

          <div className="relative z-10">
            <ProjectImage project={project} />
            <SystemVisual project={project} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function SystemVisual({ project }: { project: Project }) {
  const metrics = project.metrics ?? [];

  return (
    <div className="flex flex-col items-center justify-center space-y-8 py-8 sm:space-y-12 sm:py-12">
      <div className="grid w-full grid-cols-3 gap-x-2 gap-y-6 sm:flex sm:w-auto sm:flex-wrap sm:justify-center sm:gap-8 items-start sm:items-center">
        {project.architecture.map((item, i) => (
          <React.Fragment key={item.step}>
            <div className="flex flex-col items-center gap-3 group/node">
              <div className="w-12 h-12 rounded-full border border-primary/30 bg-background flex items-center justify-center text-xs font-bold text-primary transition-all group-hover/node:scale-110 group-hover/node:border-primary group-hover/node:bg-primary group-hover/node:text-white">
                {i + 1}
              </div>
              <span className="text-center text-[11px] sm:text-[10px] font-bold uppercase tracking-wider text-muted-foreground group-hover/node:text-foreground transition-colors">
                {item.step}
              </span>
            </div>
            {i < project.architecture.length - 1 && (
              <div className="relative hidden sm:block w-12 h-px bg-border group-hover/node:bg-primary/50 transition-colors">
                <motion.div
                  animate={{ x: [0, 48] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="absolute top-1/2 -translate-y-1/2 w-1 h-1 bg-primary rounded-full"
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      {metrics.length > 0 && (
        <div
          className={`grid gap-8 w-full max-w-2xl ${
            metrics.length === 3 ? "grid-cols-2 md:grid-cols-3" : "grid-cols-2"
          }`}
        >
          {metrics.map((metric) => (
            <div key={metric.label} className="text-center space-y-1">
              <div className="text-2xl font-bold text-foreground">{metric.value}</div>
              <div className="text-[11px] sm:text-[10px] uppercase font-medium text-muted-foreground leading-tight">
                {metric.label}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
