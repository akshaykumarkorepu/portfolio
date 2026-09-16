"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, ChevronRight } from "lucide-react";
import { projects, githubUrl } from "@/data";
import { Button } from "@/components/ui/button";
import ProjectDetails from "./ProjectDetails";

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const project = projects.find((p) => p.id === selectedProject);

  return (
    <section id="projects" className="py-32 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-24 space-y-4">
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

function ProjectShowcase({ project, index, onSelect }: { project: any; index: number; onSelect: () => void }) {
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
          <span className="text-sm font-mono text-primary/50">0{index + 1}</span>
          <h3 className="text-4xl md:text-5xl font-bold tracking-tighter">{project.title}</h3>
          <p className="text-lg text-muted-foreground">{project.subtitle}</p>
        </div>

        <p className="text-muted-foreground leading-relaxed max-w-sm">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech: string) => (
            <span key={tech} className="text-[10px] uppercase font-bold px-2 py-1 rounded-md bg-muted text-muted-foreground border border-border">
              {tech}
            </span>
          ))}
        </div>

        <div className="pt-6 flex items-center gap-4">
          <Button
            variant="outline"
            className="rounded-full group h-12 px-6 transition-all hover:scale-105"
            onClick={onSelect}
          >
            Explore System
            <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
          </Button>
          <a
            href={project.links.github || githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 text-muted-foreground hover:text-foreground transition-colors"
          >
            <span className="text-xs font-bold">GH</span>
          </a>
        </div>
      </div>

      {/* Right: Visual Representation */}
      <div className="lg:col-span-8">
        <div className="relative p-8 rounded-3xl border border-border bg-card/30 backdrop-blur-sm overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />

          <div className="relative z-10">
            <SystemVisual project={project} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function SystemVisual({ project }: { project: any }) {
  return (
    <div className="flex flex-col items-center justify-center space-y-12 py-12">
      <div className="flex flex-wrap justify-center gap-8 items-center">
        {project.architecture.map((item: any, i: number) => (
          <React.Fragment key={item.step}>
            <div className="flex flex-col items-center gap-3 group/node">
              <div className="w-12 h-12 rounded-full border border-primary/30 bg-background flex items-center justify-center text-xs font-bold text-primary transition-all group-hover/node:scale-110 group-hover/node:border-primary group-hover/node:bg-primary group-hover/node:text-white">
                {i + 1}
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground group-hover/node:text-foreground transition-colors">
                {item.step}
              </span>
            </div>
            {i < project.architecture.length - 1 && (
              <div className="relative w-12 h-px bg-border group-hover/node:bg-primary/50 transition-colors">
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

      <div className="grid grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-2xl">
        {project.achievements.slice(0, 3).map((ach: string, i: number) => (
          <div key={i} className="text-center space-y-1">
            <div className="text-2xl font-bold text-foreground">{ach.split(' ')[0]}</div>
            <div className="text-[10px] uppercase font-medium text-muted-foreground leading-tight">
              {ach.substring(ach.indexOf(' ')) || ach}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
