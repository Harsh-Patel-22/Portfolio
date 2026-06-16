"use client";

import React from "react";
import { Briefcase, GraduationCap, Award, BookOpen } from "lucide-react";
import { resumeData } from "@/data/resume";

export default function Timeline() {
  return (
    <section id="timeline" className="w-full py-20 bg-background tech-grid-bg relative border-t border-border/40">
      <div className="absolute top-1/3 left-10 w-[300px] h-[300px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center space-y-3 mb-16">
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white font-mono">
            System.<span className="text-indigo-400">getTimeline()</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-xs md:text-sm">
            Professional milestones, research internships, and academic parameters.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Work Experience Timeline */}
          <div className="space-y-8">
            <div className="flex items-center gap-3 border-b border-border/60 pb-3 mb-6">
              <div className="p-2 rounded bg-indigo-500/10 text-indigo-400">
                <Briefcase className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold font-mono text-white">Work & Industry Experience</h3>
            </div>

            <div className="relative border-l border-border pl-6 space-y-8">
              {resumeData.experience.map((exp, idx) => (
                <div key={idx} className="relative">
                  {/* Bullet */}
                  <span className="absolute -left-[31px] top-1 w-2.5 h-2.5 rounded-full bg-indigo-500 border border-background shadow-md shadow-indigo-500/30" />
                  
                  <div className="space-y-2">
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[10px] font-mono text-indigo-300">
                      {exp.period}
                    </span>
                    <h4 className="text-sm md:text-base font-bold text-white font-mono leading-tight">
                      {exp.role}
                    </h4>
                    <p className="text-xs text-indigo-400 font-mono font-medium">{exp.company}</p>
                    
                    <ul className="space-y-1.5 mt-3 list-disc pl-4 text-xs text-gray-400 font-sans">
                      {exp.highlights.map((highlight, index) => (
                        <li key={index} className="leading-relaxed">
                          {highlight}
                        </li>
                      ))}
                    </ul>

                    {/* Skill Tags */}
                    <div className="flex flex-wrap gap-1 mt-3">
                      {exp.skills.map((skill) => (
                        <span key={skill} className="text-[9px] font-mono px-1.5 py-0.5 bg-gray-950 border border-border text-gray-500 rounded">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education Timeline */}
          <div className="space-y-8">
            <div className="flex items-center gap-3 border-b border-border/60 pb-3 mb-6">
              <div className="p-2 rounded bg-purple-500/10 text-purple-400">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold font-mono text-white">Academic Journey</h3>
            </div>

            <div className="relative border-l border-border pl-6 space-y-8">
              {resumeData.education.map((edu, idx) => (
                <div key={idx} className="relative">
                  {/* Bullet */}
                  <span className="absolute -left-[31px] top-1 w-2.5 h-2.5 rounded-full bg-purple-500 border border-background shadow-md shadow-purple-500/30" />

                  <div className="space-y-2">
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-[10px] font-mono text-purple-300">
                      {edu.period}
                    </span>
                    <h4 className="text-sm md:text-base font-bold text-white font-mono leading-tight">
                      {edu.degree}
                    </h4>
                    <p className="text-xs text-purple-400 font-mono font-medium">{edu.university}</p>
                    
                    {/* GPA indicator */}
                    <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-gray-950 border border-border text-xs font-mono">
                      <Award className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-gray-400">Cumulative GPA:</span>
                      <span className="text-emerald-400 font-bold">{edu.gpa}</span>
                    </div>

                    <div className="space-y-2 mt-4">
                      <h5 className="text-[10px] font-mono font-bold tracking-wider text-gray-500 uppercase flex items-center gap-1.5">
                        <BookOpen className="w-3 h-3 text-purple-400" /> Key Coursework
                      </h5>
                      <div className="flex flex-wrap gap-1.5">
                        {edu.coursework.map((course) => (
                          <span
                            key={course}
                            className="px-2 py-0.5 rounded bg-gray-950 border border-border/80 text-[10px] font-mono text-gray-400"
                          >
                            {course}
                          </span>
                        ))}
                      </div>
                    </div>

                    <ul className="space-y-1.5 mt-4 list-disc pl-4 text-xs text-gray-400 font-sans">
                      {edu.achievements.map((achievement, index) => (
                        <li key={index} className="leading-relaxed">
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
