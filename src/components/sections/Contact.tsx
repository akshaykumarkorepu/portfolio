"use client";

import React from "react";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { email, githubUrl, gmailComposeHref, linkedinUrl } from "@/data";
import { GitHubIcon, LinkedInIcon } from "@/components/shared/BrandIcons";

export default function Contact() {
  return (
    <section id="contact" className="py-32 px-6 bg-background relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center space-y-16 relative z-10">
        <div className="space-y-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-8xl font-bold tracking-tighter"
          >
            Let&apos;s build something <span className="text-primary italic">interesting.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            If you&apos;re working on an interesting problem in AI, systems, or product engineering, I&apos;d love to hear about it.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <Button asChild variant="outline" size="lg" className="h-16 px-10 text-lg rounded-full w-full sm:w-auto transition-all hover:scale-105">
            <a
              href={gmailComposeHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Email ${email} in Gmail (opens in a new tab)`}
              className="group/social flex items-center gap-3"
            >
              <Mail className="size-5 transition-all duration-300 group-hover/social:-translate-y-0.5 group-hover/social:text-primary" aria-hidden />
              Email
            </a>
          </Button>
          {linkedinUrl && (
            <Button asChild variant="outline" size="lg" className="h-16 px-10 text-lg rounded-full w-full sm:w-auto transition-all hover:scale-105">
              <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="group/social flex items-center gap-3">
                <LinkedInIcon className="size-5 transition-all duration-300 group-hover/social:-translate-y-0.5 group-hover/social:text-primary" />
                LinkedIn
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </Button>
          )}
          <Button asChild variant="outline" size="lg" className="h-16 px-10 text-lg rounded-full w-full sm:w-auto transition-all hover:scale-105">
            <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="group/social flex items-center gap-3">
              <GitHubIcon className="size-5 transition-all duration-300 group-hover/social:-translate-y-0.5 group-hover/social:text-primary" />
              GitHub
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
