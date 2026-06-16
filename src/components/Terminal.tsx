"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { Terminal as TerminalIcon, ShieldCheck, Cpu, Code2, Database, Volume2, VolumeX } from "lucide-react";
import { resumeData } from "@/data/resume";
import { audio } from "@/lib/audio";

interface HistoryItem {
  command: string;
  output: React.ReactNode;
  timestamp: string;
}

type ThemeName = "default" | "matrix" | "dracula" | "light";

interface ThemeStyle {
  wrapper: string;
  titleBar: string;
  logsSection: string;
  prompt: string;
  success: string;
  error: string;
  textMuted: string;
  commandText: string;
  inputBar: string;
  input: string;
  link: string;
}

const themeStyles: Record<ThemeName, ThemeStyle> = {
  default: {
    wrapper: "bg-[#0b0c10]/95 text-white border-border/80",
    titleBar: "bg-[#11121b] border-b border-border/80 text-gray-500",
    logsSection: "bg-[#0b0c10]/95",
    prompt: "text-indigo-400",
    success: "text-emerald-400 font-semibold",
    error: "text-rose-400",
    textMuted: "text-gray-400",
    commandText: "text-white",
    inputBar: "bg-[#0d0e15] border-t border-border/60",
    input: "text-white caret-indigo-400",
    link: "text-emerald-400 hover:underline",
  },
  matrix: {
    wrapper: "bg-black text-[#00ff00] border-[#00ff00]/40 shadow-[0_0_20px_rgba(0,255,0,0.15)]",
    titleBar: "bg-black border-b border-[#00ff00]/30 text-[#00ff00]/80",
    logsSection: "bg-black",
    prompt: "text-[#00ff00]/90",
    success: "text-[#00ff00] font-bold",
    error: "text-[#ff3333]",
    textMuted: "text-[#00ff00]/60",
    commandText: "text-[#00ff00] font-semibold",
    inputBar: "bg-black border-t border-[#00ff00]/30",
    input: "text-[#00ff00] caret-[#00ff00]",
    link: "text-[#00ff00] underline",
  },
  dracula: {
    wrapper: "bg-[#282a36] text-[#f8f8f2] border-[#44475a] shadow-2xl",
    titleBar: "bg-[#191a21] border-b border-[#44475a] text-[#6272a4]",
    logsSection: "bg-[#282a36]",
    prompt: "text-[#ff79c6]",
    success: "text-[#50fa7b] font-semibold",
    error: "text-[#ff5555]",
    textMuted: "text-[#6272a4]",
    commandText: "text-[#f8f8f2]",
    inputBar: "bg-[#191a21] border-t border-[#44475a]",
    input: "text-[#f8f8f2] caret-[#ff79c6]",
    link: "text-[#8be9fd] hover:underline",
  },
  light: {
    wrapper: "bg-[#f4f4f5] text-zinc-900 border-zinc-300 shadow-xl",
    titleBar: "bg-zinc-200 border-b border-zinc-300 text-zinc-600",
    logsSection: "bg-[#f4f4f5]",
    prompt: "text-indigo-600",
    success: "text-emerald-600 font-semibold",
    error: "text-rose-600",
    textMuted: "text-zinc-500",
    commandText: "text-zinc-800",
    inputBar: "bg-zinc-200/50 border-t border-zinc-300",
    input: "text-zinc-900 caret-indigo-600",
    link: "text-indigo-600 hover:underline",
  },
};

const quotes = [
  "Discipline is the bridge between goals and accomplishment. Strive to stay disciplined.",
  "Become 1% better each day. Small daily increments lead to massive long-term compound gains.",
  "Clean code always looks like it was written by someone who cares.",
  "Simplicity is the ultimate sophistication in software design. Avoid over-engineering.",
  "Consistent effort beats talent when talent doesn't work consistently.",
];

const bootLogs = [
  "BOOTING COLD-LOAD KERNEL [V1.0.3] ...",
  "Initializing C#/.NET Core CLR Execution Context... OK",
  "Mounting relational storage adapters (SQL Server, PostgreSQL)... OK",
  "Connecting non-relational document registry adapters (MongoDB)... OK",
  "Securing network route boundaries (Authentication: JWT)... OK",
  "Fetching candidate profiles registry (Core Module: JSeeker)... OK",
  "Loading algorithmic statistics (LeetCode index: 120+ Solved)... OK",
  "Ready. Redirecting logs stream to developer terminal shell."
];

export default function Terminal() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [theme, setTheme] = useState<ThemeName>("default");
  const [soundEnabled, setSoundEnabled] = useState(() => typeof window !== "undefined" && audio ? audio.isEnabled() : false);
  const [mounted, setMounted] = useState(false);

  // Boot sequence states
  const [isBooting, setIsBooting] = useState(true);
  const [showOverlay, setShowOverlay] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [bootLines, setBootLines] = useState<string[]>([]);

  const logsContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const styles = themeStyles[theme];

  const welcomeMessage = useMemo(() => (
    <div className={`space-y-2 font-mono text-xs md:text-sm ${styles.prompt}`}>
      <p className="flex items-center gap-2 font-bold">
        <ShieldCheck className="w-4 h-4 animate-pulse" />
        System Core Online. Welcome to {"Harsh Patel's"} Interactive Shell.
      </p>
      <p className={styles.textMuted}>
        Type <span className="font-bold underline">`help`</span> to see available commands, or <span className="font-bold underline">`theme`</span> to customize styles.
      </p>
    </div>
  ), [styles]);

  // Keep a reference to the latest executeCommand function
  const executeCommandRef = useRef<(cmd: string) => void>(() => { });
  useEffect(() => {
    executeCommandRef.current = executeCommand;
  });

  // Sync mechanical click sound status and custom terminal events
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);

    const handleSoundToggle = (e: Event) => {
      const customEvent = e as CustomEvent<boolean>;
      setSoundEnabled(customEvent.detail);
    };

    const handleThemeChange = (e: Event) => {
      const customEvent = e as CustomEvent<ThemeName>;
      if (themeStyles[customEvent.detail]) {
        setTheme(customEvent.detail);
      }
    };

    const handleTriggerCommand = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      executeCommandRef.current(customEvent.detail);
    };

    window.addEventListener("terminal-sound-toggle", handleSoundToggle);
    window.addEventListener("terminal-theme-change", handleThemeChange);
    window.addEventListener("terminal-trigger-command", handleTriggerCommand);

    return () => {
      window.removeEventListener("terminal-sound-toggle", handleSoundToggle);
      window.removeEventListener("terminal-theme-change", handleThemeChange);
      window.removeEventListener("terminal-trigger-command", handleTriggerCommand);
    };
  }, []);

  // Initialize the welcome message history immediately on mount
  useEffect(() => {
    setTimeout(() => {
      setHistory([
        {
          command: "system-init",
          output: welcomeMessage,
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
    }, 0);
  }, [theme, welcomeMessage]);

  // Play boot logs sequence
  useEffect(() => {
    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < bootLogs.length) {
        setBootLines((prev) => [...prev, bootLogs[currentLine]]);
        currentLine++;
      } else {
        clearInterval(interval);
        // Instant trigger of fadeout and enabling terminal controls
        setFadeOut(true);
        setIsBooting(false);
        // Clean up DOM after fade transition completes (400ms)
        setTimeout(() => {
          setShowOverlay(false);
        }, 400);
      }
    }, 200); // Snappy line delay speed

    return () => clearInterval(interval);
  }, []);

  // Auto-focus input when booting completes
  useEffect(() => {
    if (!isBooting) {
      inputRef.current?.focus();
    }
  }, [isBooting]);

  // Lock body scroll during boot overlay phase
  useEffect(() => {
    if (showOverlay) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showOverlay]);

  useEffect(() => {
    // Scroll logs container to bottom on history updates
    if (logsContainerRef.current) {
      logsContainerRef.current.scrollTop = logsContainerRef.current.scrollHeight;
    }
  }, [history]);

  const handleTerminalClick = () => {
    if (!isBooting) {
      inputRef.current?.focus();
    }
  };

  function executeCommand(cmd: string) {
    const trimmed = cmd.trim().toLowerCase();
    const parts = trimmed.split(" ");
    const primaryCmd = parts[0];
    const argument = parts.slice(1).join(" ");
    let response: React.ReactNode = null;

    if (!trimmed) return;

    // Save to execution history
    setCommandHistory((prev) => [...prev, cmd]);
    setHistoryIndex(-1);

    switch (primaryCmd) {
      case "help":
        response = (
          <div className={`grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-xs md:text-sm font-mono mt-1 ${styles.textMuted}`}>
            <div>
              <span className={`${styles.success} font-bold`}>about</span> - Read brief personal summary
            </div>
            <div>
              <span className={`${styles.success} font-bold`}>skills</span> - Display categorized engineering stack
            </div>
            <div>
              <span className={`${styles.success} font-bold`}>projects</span> - Showcase deep technical projects
            </div>
            <div>
              <span className={`${styles.success} font-bold`}>experience</span> - View professional intern timeline
            </div>
            <div>
              <span className={`${styles.success} font-bold`}>education</span> - CGPA and coursework details
            </div>
            <div>
              <span className={`${styles.success} font-bold`}>achievements</span> - Show certifications & awards
            </div>
            <div>
              <span className={`${styles.success} font-bold`}>theme [style]</span> - Customize terminal skin (matrix, dracula, light, default)
            </div>
            <div>
              <span className={`${styles.success} font-bold`}>quote</span> - Print motivational growth quote
            </div>
            <div>
              <span className={`${styles.success} font-bold`}>ascii</span> - Display custom ascii banner
            </div>
            <div>
              <span className={`${styles.success} font-bold`}>contact</span> - Retrieve contact API coordinates
            </div>
            <div>
              <span className={`${styles.success} font-bold`}>clear</span> - Flush terminal screen history
            </div>
          </div>
        );
        break;

      case "about":
        response = (
          <div className={`space-y-2 text-xs md:text-sm font-mono ${styles.textMuted}`}>
            <p className={`${styles.prompt} font-bold text-sm`}>{resumeData.name} {"//"} {resumeData.role}</p>
            <p className="leading-relaxed">{resumeData.summary}</p>
            <p className={`${styles.success} text-xs mt-1`}>
              💡 Technical Focus: Scalable APIs, Relational Schema Indexing, Backend Security, and 1% Better Daily Growth Mindset.
            </p>
          </div>
        );
        break;

      case "skills":
        response = (
          <div className={`space-y-4 text-xs md:text-sm font-mono ${styles.textMuted}`}>
            <p className={`${styles.prompt} font-bold`}>System Capabilities & Stack Profile:</p>
            {resumeData.skills.map((cat, idx) => (
              <div key={idx} className="space-y-1">
                <div className={`${styles.success} font-semibold flex items-center gap-1`}>
                  {cat.category?.includes("Languages") && <Code2 className="w-3.5 h-3.5" />}
                  {cat.category?.includes("Backend") && <Cpu className="w-3.5 h-3.5" />}
                  {cat.category?.includes("Databases") && <Database className="w-3.5 h-3.5" />}
                  {cat.category}
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 pl-4">
                  {cat.items.map((item, i) => (
                    <div key={i} className="flex justify-between border-b border-border/20 pb-0.5">
                      <span>{item.name}</span>
                      <span className={`${styles.prompt} font-semibold`}>{item.proficiency}%</span>
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
          <div className={`space-y-4 text-xs md:text-sm font-mono ${styles.textMuted}`}>
            <p className={`${styles.prompt} font-bold`}>Deployed Modules:</p>
            {resumeData.projects.map((proj, idx) => (
              <div key={idx} className="border-l-2 border-indigo-500/50 pl-4 space-y-1">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                  <span className={`${styles.success} font-bold text-sm`}>{proj.title} ({proj.subtitle})</span>
                  <span className="text-[10px] opacity-70">{proj.date}</span>
                </div>
                <p className="text-xs">{proj.description}</p>
                <div className="text-xs">
                  <span className={styles.prompt}>Stack: </span>
                  <span>{proj.technologies.join(", ")}</span>
                </div>
                <div className="text-xs flex flex-wrap gap-x-4">
                  <div>
                    <span className={styles.prompt}>Source: </span>
                    <a href={proj.githubUrl} target="_blank" rel="noopener noreferrer" className={styles.link}>
                      Github ↗
                    </a>
                  </div>
                  {proj.hostedUrl && (
                    <div>
                      <span className={styles.prompt}>Hosted: </span>
                      <a href={proj.hostedUrl} target="_blank" rel="noopener noreferrer" className={styles.link}>
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
          <div className={`space-y-3 text-xs md:text-sm font-mono ${styles.textMuted}`}>
            {resumeData.experience.map((exp, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className={styles.success}>{exp.role} @ {exp.company}</span>
                  <span className="text-[10px] opacity-70">{exp.period}</span>
                </div>
                <ul className="list-disc pl-5 space-y-1 text-xs">
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
          <div className={`space-y-2 text-xs md:text-sm font-mono ${styles.textMuted}`}>
            {resumeData.education.map((edu, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between items-start md:items-center flex-col md:flex-row">
                  <span className={styles.success}>{edu.degree}</span>
                  <span className="text-[10px] opacity-70">{edu.period}</span>
                </div>
                <p className={styles.prompt}>{edu.university} | CGPA: <span className="font-bold">{edu.gpa}</span></p>
                <div className="text-xs mt-1">
                  <span className="opacity-80">Coursework:</span> {edu.coursework.join(", ")}
                </div>
              </div>
            ))}
          </div>
        );
        break;

      case "achievements":
        response = (
          <div className={`space-y-2 text-xs md:text-sm font-mono ${styles.textMuted}`}>
            {resumeData.achievements.map((ach, idx) => (
              <div key={idx} className="border-b border-border/20 pb-1">
                <div className="flex justify-between">
                  <span className={styles.success}>{ach.title}</span>
                  <span className="text-[10px] opacity-70">{ach.date}</span>
                </div>
                <p className="text-xs">{ach.description}</p>
              </div>
            ))}
          </div>
        );
        break;

      case "theme":
        if (!argument) {
          response = (
            <div className={`text-xs font-mono ${styles.textMuted}`}>
              <p>Active Terminal Theme: <span className={`${styles.success} font-bold`}>{theme}</span></p>
              <p className="mt-1">Available skins: <span className={styles.prompt}>default, matrix, dracula, light</span></p>
              <p className="mt-1">Usage: <span className="underline">theme matrix</span></p>
            </div>
          );
        } else if (argument === "matrix" || argument === "default" || argument === "dracula" || argument === "light") {
          setTheme(argument as ThemeName);
          return;
        } else {
          response = (
            <span className={styles.error}>
              Error: Skin &quot;{argument}&quot; not found. Available: default, matrix, dracula, light.
            </span>
          );
        }
        break;

      case "quote":
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        response = (
          <p className={`italic font-mono text-xs md:text-sm ${styles.success}`}>
            💬 &quot;{randomQuote}&quot;
          </p>
        );
        break;

      case "ascii":
        response = (
          <pre className={`text-[10px] leading-tight font-mono font-bold ${styles.prompt} overflow-x-auto`}>
            {` _  _   _   ___  ___ _  _ 
| || | /_\\ | _ \\/ __| || |
| __ |/ _ \\|   /\\__ \\ __ |
|_||_/_/ \\_\\_|_\\|___/_||_|`}
          </pre>
        );
        break;

      case "contact":
        response = (
          <div className={`space-y-2 text-xs md:text-sm font-mono ${styles.textMuted}`}>
            <p className={`${styles.prompt} font-bold`}>Secure Connection Endpoints:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs pl-2">
              <div>
                <span className="opacity-60">Email:</span>{" "}
                <a href={`mailto:${resumeData.email}`} className={styles.link}>
                  {resumeData.email}
                </a>
              </div>
              <div>
                <span className="opacity-60">GitHub:</span>{" "}
                <a href={resumeData.github} target="_blank" rel="noopener noreferrer" className={styles.link}>
                  GitHub
                </a>
              </div>
              <div>
                <span className="opacity-60">LinkedIn:</span>{" "}
                <a href={resumeData.linkedin} target="_blank" rel="noopener noreferrer" className={styles.link}>
                  LinkedIn
                </a>
              </div>
              <div>
                <span className="opacity-60">LeetCode:</span>{" "}
                <a href={resumeData.leetcode} target="_blank" rel="noopener noreferrer" className={styles.link}>
                  LeetCode
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
          <span className={`${styles.error} font-mono text-xs md:text-sm`}>
            Command not recognized: &quot;{trimmed}&quot;. Type <span className={`${styles.prompt} font-bold`}>`help`</span> for instructions.
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
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Play tactile mechanical audio click feedback
    if (audio && soundEnabled) {
      if (e.key === "Enter" || e.key === "Backspace") {
        audio.playKey(e.key);
      } else if (e.key === " ") {
        audio.playKey(" ");
      } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
        audio.playKey(e.key);
      }
    }

    if (e.key === "Enter") {
      executeCommand(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const nextIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInput(commandHistory[nextIndex]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex === -1) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex >= commandHistory.length) {
        setHistoryIndex(-1);
        setInput("");
      } else {
        setHistoryIndex(nextIndex);
        setInput(commandHistory[nextIndex]);
      }
    }
  };

  return (
    <>
      {/* Booting screen overlay (dedicated viewport container) */}
      {showOverlay && (
        <div
          className={`fixed inset-0 z-50 bg-[#050508] p-6 md:p-16 flex flex-col justify-start overflow-y-auto w-screen h-screen transition-all duration-400 ease-in-out ${fadeOut ? "opacity-0 scale-95 pointer-events-none" : "opacity-100 scale-100"
            }`}
        >
          <div className="max-w-4xl mx-auto w-full flex-1 flex flex-col justify-start overflow-y-auto mt-6 font-mono text-white">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-border/30 select-none">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>
              <span className={`text-xs ${styles.prompt}`}>harsh-patel@boot-loader: ~ log-stream</span>
              <div className="w-12" />
            </div>
            <div className="space-y-2.5 text-xs md:text-sm leading-relaxed">
              {bootLines.map((line, idx) => {
                const isOk = line && (line.includes("OK") || line.includes("SUCCESS") || line.includes("Solved"));
                return (
                  <div key={idx} className="flex gap-2">
                    <span className={`${styles.textMuted} opacity-60 select-none`}>[{idx.toString().padStart(3, "0")}]</span>
                    <span className={isOk ? styles.success : styles.commandText}>
                      {line}
                    </span>
                  </div>
                );
              })}
              <span className={`inline-block w-2.5 h-4 animate-cursor-blink ml-1 ${theme === "matrix" ? "bg-[#00ff00]" : theme === "dracula" ? "bg-[#ff79c6]" : "bg-indigo-400"
                }`} />
            </div>
          </div>
        </div>
      )}

      {/* Standard interactive inline Terminal */}
      <div
        onClick={handleTerminalClick}
        className={`w-full h-[360px] md:h-[450px] relative rounded-lg border flex flex-col font-mono text-left shadow-2xl overflow-hidden glass-panel cursor-text ${styles.wrapper}`}
      >
        {/* Title bar */}
        <div className={`flex items-center justify-between px-4 py-3 select-none ${styles.titleBar}`}>
          <div className="flex items-center gap-1.5 select-none">
            <span className="w-3 h-3 rounded-full bg-rose-500/80" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
          </div>
          <div className="flex items-center gap-2 text-xs">
            <TerminalIcon className="w-3.5 h-3.5 text-indigo-400/80" />
            <span>harsh@dev-box: ~</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                audio?.toggleSound();
              }}
              className="p-1 rounded hover:bg-white/10 text-gray-500 hover:text-white transition-colors cursor-pointer ml-1.5"
              title={mounted && soundEnabled ? "Disable tactile sounds" : "Enable tactile sounds"}
              aria-label="Toggle terminal keystroke sounds"
            >
              {mounted && soundEnabled ? (
                <Volume2 className="w-3.5 h-3.5 text-indigo-400" />
              ) : (
                <VolumeX className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
          <div className="w-12" /> {/* Spacer */}
        </div>

        {/* Logs section */}
        <div ref={logsContainerRef} className={`flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin ${styles.logsSection}`}>
          {history.map((item, idx) => (
            <div key={idx} className="space-y-1.5">
              {item.command !== "system-init" && (
                <div className="flex items-center gap-2 text-xs md:text-sm">
                  <span className={`font-semibold ${styles.prompt}`}>harsh@dev-box:~$</span>
                  <span className={`font-medium ${styles.commandText}`}>{item.command}</span>
                </div>
              )}
              <div className="pl-2">{item.output}</div>
            </div>
          ))}
        </div>

        {/* Input bar */}
        <div className={`flex items-center gap-2 px-4 py-3 ${styles.inputBar}`}>
          <span className={`font-semibold text-xs md:text-sm select-none ${styles.prompt}`}>harsh@dev-box:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className={`flex-1 bg-transparent font-mono text-xs md:text-sm outline-none border-none w-full ${styles.input}`}
            placeholder="Type 'help'..."
            aria-label="Terminal prompt input"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
          />
        </div>
      </div>
    </>
  );
}
