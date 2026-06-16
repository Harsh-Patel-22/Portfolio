"use client";

import React, { useState, useRef, useEffect } from "react";
import { Terminal as TerminalIcon, ShieldCheck, Cpu, Code2, Database } from "lucide-react";
import { resumeData } from "@/data/resume";

interface HistoryItem {
  command: string;
  output: React.ReactNode;
  timestamp: string;
}

export default function Terminal() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const logsContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const welcomeMessage = (
    <div className="space-y-2 text-indigo-300 font-mono text-xs md:text-sm">
      <p className="text-emerald-400 font-bold flex items-center gap-2">
        <ShieldCheck className="w-4 h-4 text-emerald-400 animate-pulse" />
        System Core Online. Welcome to Harsh Patel's Interactive Shell.
      </p>
      <p className="text-gray-400">
        Type <span className="text-indigo-400 font-bold">`help`</span> to see the list of available commands and explore my technical details.
      </p>
    </div>
  );

  useEffect(() => {
    // Initial welcome
    setHistory([
      {
        command: "system-init",
        output: welcomeMessage,
        timestamp: new Date().toLocaleTimeString(),
      },
    ]);
  }, []);

  useEffect(() => {
    // Scroll logs container to bottom on history updates
    if (logsContainerRef.current) {
      logsContainerRef.current.scrollTop = logsContainerRef.current.scrollHeight;
    }
  }, [history]);

  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  const executeCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    let response: React.ReactNode = null;

    if (!trimmed) return;

    switch (trimmed) {
      case "help":
        response = (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-xs md:text-sm font-mono mt-1 text-gray-300">
            <div>
              <span className="text-emerald-400 font-bold">about</span> - Read brief personal summary & background
            </div>
            <div>
              <span className="text-emerald-400 font-bold">skills</span> - Display categorized engineering stack
            </div>
            <div>
              <span className="text-emerald-400 font-bold">projects</span> - Showcase deep technical projects
            </div>
            <div>
              <span className="text-emerald-400 font-bold">experience</span> - View professional intern timeline
            </div>
            <div>
              <span className="text-emerald-400 font-bold">education</span> - University, CGPA, and coursework details
            </div>
            <div>
              <span className="text-emerald-400 font-bold">achievements</span> - Show certifications & awards
            </div>
            <div>
              <span className="text-emerald-400 font-bold">contact</span> - Retrieve secure contact API coordinates
            </div>
            <div>
              <span className="text-emerald-400 font-bold">clear</span> - Flush current terminal session history
            </div>
          </div>
        );
        break;

      case "about":
        response = (
          <div className="space-y-2 text-xs md:text-sm text-gray-300 font-mono">
            <p className="text-indigo-400 font-bold text-sm">{resumeData.name} // {resumeData.role}</p>
            <p className="leading-relaxed">{resumeData.summary}</p>
            <p className="text-emerald-400 text-xs mt-1">
              💡 Technical Interests: Scalable API Architectures, Database Schema Optimization, Distributed Big Data, LeetCode problem solving.
            </p>
          </div>
        );
        break;

      case "skills":
        response = (
          <div className="space-y-4 text-xs md:text-sm text-gray-300 font-mono">
            <p className="text-indigo-400 font-bold">System Capabilities & Stack Profile:</p>
            {resumeData.skills.map((cat, idx) => (
              <div key={idx} className="space-y-1">
                <div className="text-emerald-400 font-semibold flex items-center gap-1">
                  {cat.category === "Programming Languages" && <Code2 className="w-3.5 h-3.5" />}
                  {cat.category === "Backend Frameworks" && <Cpu className="w-3.5 h-3.5" />}
                  {cat.category === "Databases & Caching" && <Database className="w-3.5 h-3.5" />}
                  {cat.category}
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 pl-4">
                  {cat.items.map((item, i) => (
                    <div key={i} className="flex justify-between border-b border-gray-800/40 pb-0.5">
                      <span className="text-gray-400">{item.name}</span>
                      <span className="text-indigo-300 font-semibold">{item.proficiency}%</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );
        break;

      case "projects":
        response = (
          <div className="space-y-4 text-xs md:text-sm text-gray-300 font-mono">
            <p className="text-indigo-400 font-bold">Deployed Core Modules:</p>
            {resumeData.projects.map((proj, idx) => (
              <div key={idx} className="border-l-2 border-indigo-500/50 pl-4 space-y-1">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                  <span className="text-emerald-400 font-bold text-sm">{proj.title} ({proj.subtitle})</span>
                  <span className="text-gray-500 text-xs">{proj.date}</span>
                </div>
                <p className="text-gray-400 text-xs">{proj.description}</p>
                <div className="text-xs">
                  <span className="text-indigo-300">Stack: </span>
                  <span className="text-gray-400">{proj.technologies.join(", ")}</span>
                </div>
                <div className="text-xs flex flex-wrap gap-x-4">
                  <div>
                    <span className="text-indigo-300">Source: </span>
                    <a href={proj.githubUrl} target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline">
                      Github ↗
                    </a>
                  </div>
                  {proj.hostedUrl && (
                    <div>
                      <span className="text-indigo-300">Hosted: </span>
                      <a href={proj.hostedUrl} target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline">
                        Live Demo ↗
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        );
        break;

      case "experience":
        response = (
          <div className="space-y-3 text-xs md:text-sm text-gray-300 font-mono">
            {resumeData.experience.map((exp, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-emerald-400 font-bold">{exp.role} @ {exp.company}</span>
                  <span className="text-gray-500 text-xs">{exp.period}</span>
                </div>
                <ul className="list-disc pl-5 space-y-1 text-gray-400 text-xs">
                  {exp.highlights.map((high, i) => (
                    <li key={i}>{high}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        );
        break;

      case "education":
        response = (
          <div className="space-y-2 text-xs md:text-sm text-gray-300 font-mono">
            {resumeData.education.map((edu, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between items-start md:items-center flex-col md:flex-row">
                  <span className="text-emerald-400 font-bold">{edu.degree}</span>
                  <span className="text-gray-500 text-xs">{edu.period}</span>
                </div>
                <p className="text-indigo-300">{edu.university} | CGPA: <span className="text-white font-bold">{edu.gpa}</span></p>
                <div className="text-xs mt-1">
                  <span className="text-indigo-400">Core Coursework:</span> {edu.coursework.join(", ")}
                </div>
              </div>
            ))}
          </div>
        );
        break;

      case "achievements":
        response = (
          <div className="space-y-2 text-xs md:text-sm text-gray-300 font-mono">
            {resumeData.achievements.map((ach, idx) => (
              <div key={idx} className="border-b border-gray-800/40 pb-1">
                <div className="flex justify-between">
                  <span className="text-emerald-400 font-semibold">{ach.title}</span>
                  <span className="text-gray-500 text-xs">{ach.date}</span>
                </div>
                <p className="text-gray-400 text-xs">{ach.description}</p>
              </div>
            ))}
          </div>
        );
        break;

      case "contact":
        response = (
          <div className="space-y-2 text-xs md:text-sm text-gray-300 font-mono">
            <p className="text-indigo-400 font-bold">Secure Connection Endpoints:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs pl-2">
              <div>
                <span className="text-gray-500">Email:</span>{" "}
                <a href={`mailto:${resumeData.email}`} className="text-emerald-400 hover:underline">
                  {resumeData.email}
                </a>
              </div>
              <div>
                <span className="text-gray-500">GitHub:</span>{" "}
                <a href={resumeData.github} target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline">
                  GitHub Profile
                </a>
              </div>
              <div>
                <span className="text-gray-500">LinkedIn:</span>{" "}
                <a href={resumeData.linkedin} target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline">
                  LinkedIn Profile
                </a>
              </div>
              <div>
                <span className="text-gray-500">LeetCode:</span>{" "}
                <a href={resumeData.leetcode} target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline">
                  LeetCode Profile
                </a>
              </div>
            </div>
          </div>
        );
        break;

      case "clear":
        setHistory([]);
        return;

      default:
        response = (
          <span className="text-rose-400 font-mono text-xs md:text-sm">
            Command not recognized: "{trimmed}". Type <span className="text-indigo-400 font-bold">`help`</span> for list of commands.
          </span>
        );
    }

    setHistory((prev) => [
      ...prev,
      {
        command: cmd,
        output: response,
        timestamp: new Date().toLocaleTimeString(),
      },
    ]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      executeCommand(input);
      setInput("");
    }
  };

  return (
    <div
      onClick={handleTerminalClick}
      className="w-full h-[360px] md:h-[450px] rounded-lg border border-border bg-[#0b0c10]/95 flex flex-col font-mono text-left shadow-2xl overflow-hidden glass-panel cursor-text"
    >
      {/* Title bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#11121b] border-b border-border/80 select-none">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-rose-500" />
          <span className="w-3 h-3 rounded-full bg-amber-500" />
          <span className="w-3 h-3 rounded-full bg-emerald-500" />
        </div>
        <div className="flex items-center gap-1.5 text-xs text-gray-500">
          <TerminalIcon className="w-3.5 h-3.5 text-indigo-400/80" />
          <span>harsh@dev-box: ~</span>
        </div>
        <div className="w-12" /> {/* Spacer */}
      </div>

      {/* Logs section */}
      <div ref={logsContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
        {history.map((item, idx) => (
          <div key={idx} className="space-y-1.5">
            {item.command !== "system-init" && (
              <div className="flex items-center gap-2 text-xs md:text-sm">
                <span className="text-indigo-400 font-semibold">harsh@dev-box:~$</span>
                <span className="text-white font-medium">{item.command}</span>
              </div>
            )}
            <div className="pl-2">{item.output}</div>
          </div>
        ))}
      </div>

      {/* Input bar */}
      <div className="flex items-center gap-2 px-4 py-3 bg-[#0d0e15] border-t border-border/60">
        <span className="text-indigo-400 font-semibold text-xs md:text-sm select-none">harsh@dev-box:~$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent text-white font-mono text-xs md:text-sm outline-none border-none caret-indigo-400 w-full"
          placeholder="Type 'help'..."
          aria-label="Terminal prompt input"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
        />
      </div>
    </div>
  );
}
