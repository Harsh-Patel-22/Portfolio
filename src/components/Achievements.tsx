"use client";

import React from "react";
import { Award, Zap, Code, Shield } from "lucide-react";
import { resumeData } from "@/data/resume";

const iconMap = [
  <Code key="code" className="w-5 h-5 text-indigo-400" />,
  <Shield key="shield" className="w-5 h-5 text-purple-400" />,
  <Award key="award" className="w-5 h-5 text-emerald-400" />,
];

export default function Achievements() {
  return (
    <section className="w-full py-20 bg-background relative border-t border-border/40">
      <div className="absolute top-1/2 left-1/4 w-[350px] h-[350px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center space-y-3 mb-16">
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white font-mono">
            System.<span className="text-indigo-400">getAchievements()</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-xs md:text-sm">
            Core honors, security credentials, and problem-solving benchmarks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resumeData.achievements.map((ach, idx) => (
            <div
              key={idx}
              className="glass-panel glass-panel-hover rounded-xl p-6 flex flex-col justify-between border border-border/80"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div className="p-2.5 rounded-lg bg-gray-900/80 border border-border/80">
                    {iconMap[idx % iconMap.length]}
                  </div>
                  <span className="text-[10px] font-mono text-gray-500">{ach.date}</span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-sm md:text-base font-bold font-mono text-white tracking-tight leading-snug">
                    {ach.title}
                  </h3>
                  <p className="text-xs text-indigo-400 font-mono">Verification Verified</p>
                </div>

                <p className="text-xs md:text-sm text-gray-400 leading-relaxed font-sans">
                  {ach.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-border/40 flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-mono text-gray-500">Credential Status: Active</span>
                </div>
                <Zap className="w-3.5 h-3.5 text-indigo-400/80" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
