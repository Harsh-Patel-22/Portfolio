"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Search, Cpu, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { GithubIcon } from "@/components/BrandIcons";
import { resumeData, Project } from "@/data/resume";

export default function ProjectSection() {
  const [filter, setFilter] = useState<"all" | "backend" | "fullstack" | "bigdata">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { label: "All Modules", value: "all" },
    { label: "Fullstack Systems", value: "fullstack" },
    { label: "Backend Services", value: "backend" },
    { label: "Data Pipelines", value: "bigdata" },
  ] as const;

  const filteredProjects = useMemo(() => {
    return resumeData.projects.filter((project) => {
      const matchesCategory = filter === "all" || project.category === filter;
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch =
        project.title.toLowerCase().includes(searchLower) ||
        project.subtitle.toLowerCase().includes(searchLower) ||
        project.description.toLowerCase().includes(searchLower) ||
        project.technologies.some((tech) => tech.toLowerCase().includes(searchLower));

      return matchesCategory && matchesSearch;
    });
  }, [filter, searchQuery]);

  return (
    <section id="projects" className="w-full py-20 bg-background relative border-t border-border/40">
      <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center space-y-3 mb-12">
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white font-mono">
            System.<span className="text-indigo-400">getProjects()</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-xs md:text-sm">
            Engineering solutions designed for localized scalability, asynchronous processing, and deep backend integration.
          </p>
        </div>

        {/* Filter and Search controls */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8">
          {/* Tabs */}
          <div className="flex flex-wrap gap-1.5 p-1 bg-gray-950 border border-border/80 rounded-lg max-w-fit">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setFilter(cat.value)}
                className={`px-3.5 py-1.5 rounded-md text-[10px] md:text-xs font-mono font-medium transition-all duration-200 ${
                  filter === cat.value
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/10"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="relative flex-1 max-w-md">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-500" />
            </span>
            <input
              type="text"
              placeholder="Search stack, names, or key parameters..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 bg-[#09090f]/90 border border-border/80 rounded-md text-xs font-mono text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500/80 transition-all duration-200"
            />
          </div>
        </div>

        {/* Projects Grid */}
        <motion.div layout className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-[300px]">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project: Project) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35 }}
                key={project.title}
                className="glass-panel rounded-xl p-6 flex flex-col justify-between border border-border/80 hover:border-indigo-500/35 transition-all duration-300"
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="p-1 rounded bg-indigo-500/10 text-indigo-400">
                          <Cpu className="w-3.5 h-3.5" />
                        </span>
                        <h3 className="text-base md:text-lg font-bold text-white font-mono tracking-tight">
                          {project.title}
                        </h3>
                      </div>
                      <p className="text-xs text-indigo-300/95 font-mono">{project.subtitle}</p>
                    </div>
                    <span className="text-[10px] font-mono text-gray-500">{project.date}</span>
                  </div>

                  <p className="text-xs md:text-sm text-gray-400 leading-relaxed font-sans">
                    {project.description}
                  </p>

                  <div className="space-y-2">
                    <h4 className="text-[10px] font-mono font-bold tracking-wider text-gray-500 uppercase">
                      Core Metrics & Milestones
                    </h4>
                    <ul className="space-y-1.5 pl-1">
                      {project.achievements.map((ach, i) => (
                        <li key={i} className="text-xs text-gray-300 flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500/80 shrink-0 mt-0.5" />
                          <span className="leading-snug">{ach}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-border/40 space-y-4">
                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded bg-gray-950 border border-border/80 text-[10px] font-mono text-gray-400"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-gray-950 border border-border/80 text-[11px] font-mono font-medium text-gray-300 hover:text-white hover:border-gray-700 transition-colors"
                    >
                      <GithubIcon className="w-3.5 h-3.5" />
                      Codebase
                    </a>
                    {project.hostedUrl && (
                      <a
                        href={project.hostedUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-indigo-600/10 text-[11px] font-mono font-medium text-indigo-400 hover:bg-indigo-600 hover:text-white transition-all"
                      >
                        Live Demo
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredProjects.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center py-16 text-center border border-dashed border-border/60 rounded-xl bg-gray-950/20">
              <span className="text-xs font-mono text-gray-500">
                No matching pipelines found in current query space.
              </span>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
