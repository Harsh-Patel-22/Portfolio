"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { Code2, Cpu, Database, Server, Settings } from "lucide-react";
import { resumeData } from "@/data/resume";

const iconMap: Record<string, React.ReactNode> = {
  "Programming Languages": <Code2 className="w-5 h-5 text-indigo-400" />,
  "Backend Frameworks": <Cpu className="w-5 h-5 text-purple-400" />,
  "Databases & Caching": <Database className="w-5 h-5 text-teal-400" />,
  "Big Data & Engineering": <Server className="w-5 h-5 text-emerald-400" />,
  "DevOps & Tools": <Settings className="w-5 h-5 text-amber-400" />,
};

export default function SkillsSection() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section id="skills" className="w-full py-20 bg-background tech-grid-bg relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center space-y-3 mb-16">
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white font-mono">
            System.<span className="text-indigo-400">getCapabilities()</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-xs md:text-sm">
            A specialized stack focused on backend infrastructure, database scalability, and big data orchestration.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {resumeData.skills.map((cat, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              className="glass-panel glass-panel-hover rounded-xl p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-6 pb-3 border-b border-border/60">
                  <div className="p-2 rounded-lg bg-gray-900/80 border border-border/80">
                    {iconMap[cat.category] || <Code2 className="w-5 h-5 text-indigo-400" />}
                  </div>
                  <h3 className="text-sm md:text-base font-bold font-mono text-white">
                    {cat.category}
                  </h3>
                </div>

                <div className="space-y-4">
                  {cat.items.map((skill, index) => (
                    <div key={index} className="space-y-1.5">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-gray-300 font-semibold">{skill.name}</span>
                        <span className="text-indigo-400">{skill.proficiency}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-gray-950 rounded-full overflow-hidden border border-border/30">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.proficiency}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
