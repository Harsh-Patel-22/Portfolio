import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Terminal from "@/components/Terminal";
import SkillsSection from "@/components/SkillsSection";
import ProjectSection from "@/components/ProjectSection";
import Timeline from "@/components/Timeline";
import Achievements from "@/components/Achievements";
import ContactForm from "@/components/ContactForm";
import SpotlightCard from "@/components/SpotlightCard";
import CommandMenu from "@/components/CommandMenu";
import TelemetryTicker from "@/components/TelemetryTicker";
import { Mail, FileDown, ArrowRight, Code2, Database, Sparkles } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/BrandIcons";
import { resumeData } from "@/data/resume";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="flex-1 w-full bg-background min-h-screen">
        {/* Hero Section */}
        <section
          id="home"
          className="w-full pt-32 pb-20 md:pt-40 md:pb-28 tech-grid-bg relative overflow-hidden flex items-center border-b border-border/40"
        >
          {/* Neon background glows */}
          <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-indigo-500/5 rounded-full blur-[140px] pointer-events-none animate-radial-pulse" />
          <div className="absolute bottom-10 left-10 w-[300px] h-[300px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />

          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Hero: Headline & CTAs */}
              <div className="lg:col-span-7 space-y-6 text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-500/20 text-indigo-400 text-[10px] md:text-xs font-mono">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Available for Backend Internships & Roles</span>
                </div>

                <div className="space-y-3">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white font-mono">
                    Harsh Patel
                  </h1>
                  <p className="text-lg md:text-xl font-bold font-mono tracking-tight text-indigo-400/90">
                    {resumeData.role}
                  </p>
                  <p className="text-sm md:text-base text-gray-400 font-sans max-w-xl leading-relaxed mt-2">
                    {resumeData.headline}
                  </p>
                </div>

                {/* Social links row */}
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
                  <span className="text-xs font-mono text-gray-600">|</span>
                  <a
                    href="https://leetcode.com/u/Harsh-Patel-22"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-gray-400 hover:text-indigo-400 transition-colors"
                  >
                    LeetCode Profile ↗
                  </a>
                </div>

                {/* CTA buttons */}
                <div className="flex flex-wrap gap-4 pt-2">
                  <a
                    href="#projects"
                    className="inline-flex items-center gap-1.5 px-4.5 py-2.5 rounded-md text-xs font-mono font-bold text-white bg-indigo-600 hover:bg-indigo-500 transition-all shadow-md shadow-indigo-600/10"
                  >
                    Explore Deployed Modules
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-1.5 px-4.5 py-2.5 rounded-md text-xs font-mono font-bold text-gray-300 bg-gray-950 border border-border hover:text-white hover:border-gray-700 transition-all"
                  >
                    Establish Secure Connect
                  </a>
                  {/* Styled download resume link pointing to a functional endpoint or fallback */}
                  <a
                    href="/Harsh_Patel_Resume.pdf"
                    download
                    className="inline-flex items-center gap-1.5 px-4.5 py-2.5 rounded-md text-xs font-mono font-bold text-gray-400 bg-transparent border border-dashed border-border hover:text-white hover:border-indigo-500/30 transition-all"
                  >
                    <FileDown className="w-3.5 h-3.5" />
                    Download Spec.pdf
                  </a>
                </div>
              </div>

              {/* Right Hero: Interactive Terminal */}
              <div className="lg:col-span-5 w-full">
                <Terminal />
              </div>

            </div>
          </div>
        </section>

        {/* About Bento Grid Section */}
        <section id="about" className="w-full py-20 bg-background relative border-b border-border/40">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-3 mb-16">
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white font-mono">
                System.<span className="text-indigo-400">getOverview()</span>
              </h2>
              <p className="text-gray-400 max-w-xl mx-auto text-xs md:text-sm">
                Compiling structural profile parameters, educational targets, and architectural methodologies.
              </p>
            </div>

            {/* Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Box 1: Core Bio */}
              <SpotlightCard className="md:col-span-8 p-6 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-indigo-400 font-mono text-xs font-semibold">
                    <Code2 className="w-4 h-4" />
                    <span>Profile Registry</span>
                  </div>
                  <h3 className="text-base md:text-lg font-bold font-mono text-white">
                    Who is harsh-patel?
                  </h3>
                  <p className="text-xs md:text-sm text-gray-400 leading-relaxed font-sans">
                    Currently pursuing a Bachelor of Technology in Computer Science & Engineering, I focus on building robust, well-architected backend architectures. My design philosophy centers on writing clean, self-documenting code, optimization of database indices, and design of secure JWT claim structures. My typical workflow combines C# API programming with Docker containers.
                  </p>
                </div>
                <div className="mt-6 border-t border-border/40 pt-4 flex justify-between items-center text-[10px] text-gray-500 font-mono">
                  <span>Stack priority: C# / ASP.NET / PostgreSQL</span>
                  <span>Location: Navrachana University</span>
                </div>
              </SpotlightCard>

              {/* Box 2: Academics Mini Card */}
              <SpotlightCard className="md:col-span-4 p-6 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-purple-400 font-mono text-xs font-semibold">
                    <Database className="w-4 h-4" />
                    <span>Academic Benchmarks</span>
                  </div>
                  <h3 className="text-base md:text-lg font-bold font-mono text-white">
                    CGPA Parameters
                  </h3>
                  <div className="py-2">
                    <span className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 font-mono">
                      9.24
                    </span>
                    <span className="text-xs text-gray-500 font-mono"> / 10.0</span>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed font-sans">
                    Top 5% batch ranking. Solid foundations in OOP design, relational schemas, and operating system kernels.
                  </p>
                </div>
                <div className="mt-4 border-t border-border/40 pt-4 text-[10px] text-purple-300 font-mono">
                  Navrachana Univ (2023 - 2027)
                </div>
              </SpotlightCard>

              {/* Box 3: Career Aspiration */}
              <SpotlightCard className="md:col-span-5 p-6 flex flex-col justify-between">
                <div className="space-y-4">
                  <h4 className="text-xs font-mono font-bold tracking-wider text-gray-500 uppercase">
                    Core Engineering Vision
                  </h4>
                  <p className="text-xs md:text-sm text-gray-400 leading-relaxed font-sans">
                    To architect scalable backend APIs and high-performance data systems. I aim to build high-availability microservices utilizing message queue buffers like Redis or RabbitMQ and deploy secure endpoints that protect client parameters and database transactions.
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-indigo-500" />
                  <span className="text-[10px] font-mono text-gray-500">Pipeline Target: Microservices</span>
                </div>
              </SpotlightCard>

              {/* Box 4: Interests / Hobbies */}
              <SpotlightCard className="md:col-span-7 p-6 flex flex-col justify-between">
                <div className="space-y-4">
                  <h4 className="text-xs font-mono font-bold tracking-wider text-gray-500 uppercase">
                    Discipline & Growth Mindset
                  </h4>
                  <p className="text-xs md:text-sm text-gray-400 leading-relaxed font-sans font-medium">
                    Driven by daily discipline and a structured growth mindset—aiming to become 1% better each day. Regular algorithmic problem-solving practice on LeetCode keeps my optimization cycles sharp, while brainstorming system layouts and exchanging technical learnings maintains consistent improvement.
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {["Growth Mindset", "Discipline", "Problem Solving", "Brainstorming", "Continuous Learning"].map((hobby) => (
                      <span
                        key={hobby}
                        className="px-2.5 py-1 rounded-full bg-gray-950 border border-border/80 text-[10px] font-mono text-gray-400"
                      >
                        {hobby}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-6 border-t border-border/40 pt-4 flex justify-between items-center text-[10px] text-gray-500 font-mono">
                  <span>Status: Daily Progress</span>
                  <span>Commitment: 1% Better Daily</span>
                </div>
              </SpotlightCard>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <SkillsSection />

        {/* Projects Section */}
        <ProjectSection />

        {/* Timeline (Experience + Education) */}
        <Timeline />

        {/* Achievements Section */}
        <Achievements />

        {/* Contact Form Section */}
        <ContactForm />
      </main>

      <Footer />
      <CommandMenu />
      <TelemetryTicker />
    </>
  );
}
