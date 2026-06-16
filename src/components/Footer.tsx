"use client";

import React from "react";
import { Mail, ExternalLink, Code2 } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/BrandIcons";
import { resumeData } from "@/data/resume";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#030306] border-t border-border/60 py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start gap-1">
            <div className="flex items-center gap-2 text-white font-mono font-bold text-sm">
              <Code2 className="w-4 h-4 text-indigo-400" />
              <span>Harsh Patel</span>
            </div>
            <p className="text-gray-500 text-xs mt-1">
              Backend Systems & Distributed Engineering. Built with Next.js & Tailwind.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={resumeData.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-md bg-[#0f0f15] border border-border/80 text-gray-400 hover:text-white hover:border-indigo-500/50 transition-all duration-200"
              aria-label="GitHub Profile"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href={resumeData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-md bg-[#0f0f15] border border-border/80 text-gray-400 hover:text-white hover:border-indigo-500/50 transition-all duration-200"
              aria-label="LinkedIn Profile"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${resumeData.email}`}
              className="p-2 rounded-md bg-[#0f0f15] border border-border/80 text-gray-400 hover:text-white hover:border-indigo-500/50 transition-all duration-200"
              aria-label="Send Email"
            >
              <Mail className="w-4 h-4" />
            </a>
            <a
              href={resumeData.leetcode}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-md bg-[#0f0f15] border border-border/80 text-gray-400 hover:text-indigo-400 hover:border-indigo-500/50 transition-all duration-200 flex items-center gap-1 text-[10px] font-mono text-gray-400 px-3"
            >
              LeetCode <ExternalLink className="w-2.5 h-2.5" />
            </a>
          </div>
        </div>

        <div className="mt-8 border-t border-border/30 pt-6 flex flex-col md:flex-row justify-between items-center text-[11px] text-gray-600 font-mono gap-4">
          <p>© {currentYear} Harsh Patel. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#home" className="hover:text-gray-400 transition-colors">Home</a>
            <a href="#about" className="hover:text-gray-400 transition-colors">About</a>
            <a href="#skills" className="hover:text-gray-400 transition-colors">Skills</a>
            <a href="#projects" className="hover:text-gray-400 transition-colors">Projects</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
