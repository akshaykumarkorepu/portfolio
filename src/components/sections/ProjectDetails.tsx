"use client";

import React from "react";
import { motion } from "framer-motion";
import { X, ExternalLink, CheckCircle2, ArrowRight } from "lucide-react";
import { Project } from "@/data";
import { Button } from "@/components/ui/button";

interface ProjectDetailsProps {
  project: Project;
  onClose: () => void;
}

export default function ProjectDetails({ project, onClose }: ProjectDetailsProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-xl"
        onClick={onClose}
      />

      {/* Modal Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-card border border-border rounded-3xl shadow-2xl"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-10 p-2 rounded-full bg-muted text-muted-foreground hover:text-foreground transition-colors"
        >
          <X size={20} />
        </button>

        <div className="p-8 md:p-12 space-y-12">
          {/* Hero Section of Modal */}
          <div className="space-y-6">
            <div className="space-y-2">
              {project.status && (
                <span className="inline-block px-2 py-0.5 rounded-full border border-primary/20 bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider">
                  {project.status}
                </span>
              )}
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                {project.title}
              </h2>
              <p className="text-xl text-muted-foreground">{project.subtitle}</p>
            </div>

            {(project.team || project.role) && (
              <div className="space-y-2 text-sm text-muted-foreground leading-relaxed max-w-3xl">
                {project.team && (
                  <p>
                    <span className="text-foreground font-medium">{project.team.name}</span>
                    {project.team.tagline && <span className="text-primary"> · {project.team.tagline}</span>}
                    <span> · {project.team.members.join(", ")}</span>
                  </p>
                )}
                {project.role && (
                  <p>
                    <span className="text-foreground font-medium">My role:</span> {project.role}
                  </p>
                )}
              </div>
            )}

            <div className="flex flex-wrap gap-3">
              {project.techStack.map((tech) => (
                <span key={tech} className="px-3 py-1 text-xs rounded-full border border-border bg-muted/50 text-muted-foreground">
                  {tech}
                </span>
              ))}
            </div>

            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
              {project.fullDescription}
            </p>
          </div>

          {/* Architecture Pipeline */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold tracking-tight">System Architecture</h3>
            <div className="flex flex-wrap items-center gap-4 p-6 rounded-2xl bg-background border border-border">
              {project.architecture.map((item, idx) => (
                <React.Fragment key={item.step}>
                  <div className="flex flex-col items-center text-center max-w-[120px] space-y-2">
                    <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm border border-primary/20">
                      {idx + 1}
                    </div>
                    <span className="text-sm font-semibold">{item.step}</span>
                    <span className="text-xs text-muted-foreground line-clamp-2">{item.description}</span>
                  </div>
                  {idx < project.architecture.length - 1 && (
                    <ArrowRight size={20} className="text-muted-foreground hidden sm:block" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Deep Dive Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <section className="space-y-3">
                <h4 className="text-lg font-semibold flex items-center gap-2">
                  The Problem
                </h4>
                <p className="text-muted-foreground leading-relaxed">
                  {project.details.problem}
                </p>
              </section>

              <section className="space-y-3">
                <h4 className="text-lg font-semibold flex items-center gap-2">
                  The Solution
                </h4>
                <p className="text-muted-foreground leading-relaxed">
                  {project.details.solution}
                </p>
              </section>

              {project.details.challenges.length > 0 && (
                <section className="space-y-3">
                  <h4 className="text-lg font-semibold">Challenges</h4>
                  <ul className="space-y-2">
                    {project.details.challenges.map((challenge, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="mt-2 w-1 h-1 rounded-full bg-primary shrink-0" />
                        {challenge}
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </div>

            <div className="space-y-8">
              <section className="space-y-3">
                <h4 className="text-lg font-semibold">Engineering Decisions</h4>
                <ul className="space-y-2">
                  {project.details.engineeringDecisions.map((decision, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 size={16} className="text-primary mt-1 shrink-0" />
                      {decision}
                    </li>
                  ))}
                </ul>
              </section>

              <section className="space-y-3">
                <h4 className="text-lg font-semibold">Key Results</h4>
                <ul className="space-y-2">
                  {project.achievements.map((achievement, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 size={16} className="text-primary mt-1 shrink-0" />
                      {achievement}
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="flex items-center justify-between gap-4 pt-8 border-t border-border">
            <div className="flex flex-wrap gap-4">
              {project.links.github && (
                <Button variant="outline" asChild className="rounded-full">
                  <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                    <span className="text-xs font-bold">GH</span>
                    GitHub
                  </a>
                </Button>
              )}
              {project.links.demo && (
                <Button variant="outline" asChild className="rounded-full">
                  <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                    <ExternalLink size={18} />
                    Live Demo
                  </a>
                </Button>
              )}
            </div>
            <Button onClick={onClose} variant="ghost" className="rounded-full">
              Close
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
