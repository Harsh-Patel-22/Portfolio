"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Command, ArrowRight, CornerDownLeft, Eye, Volume2, VolumeX, Shield, FileText, ExternalLink } from "lucide-react";
import { audio } from "@/lib/audio";

interface CommandItem {
  id: string;
  title: string;
  subtitle: string;
  category: "Navigation" | "Terminal Controls" | "Direct Shell Run" | "Resources";
  icon: React.ReactNode;
  action: () => void;
}

export default function CommandMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(() => typeof window !== "undefined" && audio ? audio.isEnabled() : false);
  const [mounted, setMounted] = useState(false);

  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Sync sound status
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);

    const handleSoundToggle = (e: Event) => {
      const customEvent = e as CustomEvent<boolean>;
      setSoundEnabled(customEvent.detail);
    };

    const handleOpenMenu = () => {
      setIsOpen(true);
    };

    window.addEventListener("terminal-sound-toggle", handleSoundToggle);
    window.addEventListener("open-command-menu", handleOpenMenu);
    return () => {
      window.removeEventListener("terminal-sound-toggle", handleSoundToggle);
      window.removeEventListener("open-command-menu", handleOpenMenu);
    };
  }, []);

  // Handle Ctrl+K/Cmd+K shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Focus search input when menu is open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        setSearch("");
        setSelectedIndex(0);
        inputRef.current?.focus();
      }, 80);
    }
  }, [isOpen]);

  const dispatchTheme = (theme: string) => {
    window.dispatchEvent(new CustomEvent("terminal-theme-change", { detail: theme }));
  };

  const dispatchCommand = (cmd: string) => {
    window.dispatchEvent(new CustomEvent("terminal-trigger-command", { detail: cmd }));
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const items: CommandItem[] = useMemo(() => [
    // Navigation
    {
      id: "nav-home",
      title: "Navigate to Home",
      subtitle: "Jump back to top headline",
      category: "Navigation",
      icon: <ArrowRight className="w-4 h-4 text-indigo-400" />,
      action: () => scrollToSection("home"),
    },
    {
      id: "nav-about",
      title: "Navigate to About Section",
      subtitle: "Overview biography bento block",
      category: "Navigation",
      icon: <ArrowRight className="w-4 h-4 text-indigo-400" />,
      action: () => scrollToSection("about"),
    },
    {
      id: "nav-skills",
      title: "Navigate to Skills Module",
      subtitle: "Categorized language engineering scores",
      category: "Navigation",
      icon: <ArrowRight className="w-4 h-4 text-indigo-400" />,
      action: () => scrollToSection("skills"),
    },
    {
      id: "nav-projects",
      title: "Navigate to Project Grid",
      subtitle: "ASP.NET and database pipelines",
      category: "Navigation",
      icon: <ArrowRight className="w-4 h-4 text-indigo-400" />,
      action: () => scrollToSection("projects"),
    },
    {
      id: "nav-timeline",
      title: "Navigate to Timeline",
      subtitle: "Academic and internship chronology",
      category: "Navigation",
      icon: <ArrowRight className="w-4 h-4 text-indigo-400" />,
      action: () => scrollToSection("timeline"),
    },
    {
      id: "nav-contact",
      title: "Navigate to Contact Desk",
      subtitle: "Secure connection form pipeline",
      category: "Navigation",
      icon: <ArrowRight className="w-4 h-4 text-indigo-400" />,
      action: () => scrollToSection("contact"),
    },
    // Terminal Theme Controls
    {
      id: "theme-default",
      title: "Terminal Skin: Classic Indigo",
      subtitle: "Clean professional developer mode",
      category: "Terminal Controls",
      icon: <Shield className="w-4 h-4 text-blue-400" />,
      action: () => dispatchTheme("default"),
    },
    {
      id: "theme-matrix",
      title: "Terminal Skin: Matrix Green",
      subtitle: "Retro neon CRT screen emulator",
      category: "Terminal Controls",
      icon: <Shield className="w-4 h-4 text-emerald-400" />,
      action: () => dispatchTheme("matrix"),
    },
    {
      id: "theme-dracula",
      title: "Terminal Skin: Dracula Purple",
      subtitle: "High contrast dark designer palette",
      category: "Terminal Controls",
      icon: <Shield className="w-4 h-4 text-purple-400" />,
      action: () => dispatchTheme("dracula"),
    },
    {
      id: "theme-light",
      title: "Terminal Skin: Light Zinc",
      subtitle: "High contrast clean daylight canvas",
      category: "Terminal Controls",
      icon: <Shield className="w-4 h-4 text-gray-400" />,
      action: () => dispatchTheme("light"),
    },
    {
      id: "toggle-sound",
      title: `Toggle Audio Keystrokes: ${mounted && soundEnabled ? "DISABLE" : "ENABLE"}`,
      subtitle: "Web Audio mechanical switch feedback",
      category: "Terminal Controls",
      icon: mounted && soundEnabled ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />,
      action: () => {
        if (audio) {
          audio.toggleSound();
        }
      },
    },
    // Direct Shell Commands
    {
      id: "shell-help",
      title: "Execute Shell Command: `help`",
      subtitle: "Show command manual inside terminal",
      category: "Direct Shell Run",
      icon: <Eye className="w-4 h-4 text-amber-400" />,
      action: () => dispatchCommand("help"),
    },
    {
      id: "shell-quote",
      title: "Execute Shell Command: `quote`",
      subtitle: "Fetch daily discipline motivational message",
      category: "Direct Shell Run",
      icon: <Eye className="w-4 h-4 text-amber-400" />,
      action: () => dispatchCommand("quote"),
    },
    {
      id: "shell-ascii",
      title: "Execute Shell Command: `ascii`",
      subtitle: "Print retro code logo signature",
      category: "Direct Shell Run",
      icon: <Eye className="w-4 h-4 text-amber-400" />,
      action: () => dispatchCommand("ascii"),
    },
    {
      id: "shell-clear",
      title: "Execute Shell Command: `clear`",
      subtitle: "Flush active logs stack history",
      category: "Direct Shell Run",
      icon: <Eye className="w-4 h-4 text-amber-400" />,
      action: () => dispatchCommand("clear"),
    },
    // Resources & Spec Links
    {
      id: "download-resume",
      title: "Download Spec Resume PDF",
      subtitle: "Harsh_Patel_Resume.pdf spec file",
      category: "Resources",
      icon: <FileText className="w-4 h-4 text-rose-400" />,
      action: () => {
        const link = document.createElement("a");
        link.href = "/Harsh_Patel_Resume.pdf";
        link.download = "Harsh_Patel_Resume.pdf";
        link.click();
      },
    },
    {
      id: "link-github",
      title: "Launch GitHub Profile",
      subtitle: "Review source code modules and commits",
      category: "Resources",
      icon: <ExternalLink className="w-4 h-4 text-gray-400" />,
      action: () => window.open("https://github.com/Harsh-Patel-22", "_blank"),
    },
    {
      id: "link-linkedin",
      title: "Launch LinkedIn Connection",
      subtitle: "Establish messaging channel",
      category: "Resources",
      icon: <ExternalLink className="w-4 h-4 text-gray-400" />,
      action: () => window.open("https://linkedin.com/in/harsh-patel-22", "_blank"),
    },
  ], [soundEnabled, mounted]);

  // Fuzzy filter based on search
  const filtered = useMemo(() => {
    if (!search.trim()) return items;
    const s = search.toLowerCase();
    return items.filter(
      (item) =>
        item.title.toLowerCase().includes(s) ||
        item.subtitle.toLowerCase().includes(s) ||
        item.category.toLowerCase().includes(s)
    );
  }, [search, items]);

  // Handle navigating up/down in filter
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filtered.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filtered[selectedIndex]) {
        const selectedAction = filtered[selectedIndex].action;
        setIsOpen(false);
        setTimeout(() => {
          selectedAction();
        }, 150);
      }
    }
  };

  // Keep selected item visible while scrolling
  useEffect(() => {
    if (listRef.current) {
      const selectedElement = listRef.current.querySelector(`[data-index="${selectedIndex}"]`) as HTMLElement;
      if (selectedElement) {
        selectedElement.scrollIntoView({ block: "nearest" });
      }
    }
  }, [selectedIndex]);

  // Category sorting map
  const grouped = useMemo(() => {
    const map: Record<string, typeof filtered> = {};
    filtered.forEach((item) => {
      if (!map[item.category]) map[item.category] = [];
      map[item.category].push(item);
    });
    return map;
  }, [filtered]);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 md:pt-32 px-4 select-none">
            {/* Dark blur backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-[#040407]/75 backdrop-blur-[5px]"
            />

            {/* Modal Dialog container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="relative w-full max-w-xl rounded-xl border border-indigo-500/20 bg-[#09090f]/95 shadow-2xl overflow-hidden font-mono flex flex-col max-h-[420px]"
            >
              {/* Input header row */}
              <div className="flex items-center gap-3 px-4 py-3.5 border-b border-border/80 relative">
                <Search className="w-4 h-4 text-gray-500 shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Type an administrative parameter or jump navigation..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setSelectedIndex(0);
                  }}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent border-none outline-none text-xs text-white placeholder-gray-500 focus:ring-0 focus:outline-none"
                  aria-label="Command search prompt"
                />
                <div className="flex items-center gap-1 shrink-0">
                  <span className="px-1.5 py-0.5 rounded bg-gray-950 border border-border text-[9px] text-gray-500">Esc</span>
                </div>
              </div>

              {/* Scrollable list */}
              <div
                ref={listRef}
                className="flex-1 overflow-y-auto px-2 py-3 space-y-4 scrollbar-thin max-h-[300px]"
              >
                {filtered.length === 0 ? (
                  <div className="text-center py-10 text-xs text-gray-500">
                    No registry parameters found.
                  </div>
                ) : (
                  Object.keys(grouped).map((cat) => (
                    <div key={cat} className="space-y-1">
                      <div className="px-3 text-[9px] font-bold text-gray-500 uppercase tracking-widest font-sans">
                        {cat}
                      </div>
                      <div className="space-y-0.5">
                        {grouped[cat].map((item) => {
                          const overallIndex = filtered.findIndex((f) => f.id === item.id);
                          const isSel = overallIndex === selectedIndex;
                          return (
                            <button
                              key={item.id}
                              data-index={overallIndex}
                              onClick={() => {
                                const selectedAction = item.action;
                                setIsOpen(false);
                                setTimeout(() => {
                                  selectedAction();
                                }, 150);
                              }}
                              onMouseEnter={() => setSelectedIndex(overallIndex)}
                              className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-left transition-all cursor-pointer ${
                                isSel
                                  ? "bg-indigo-600 text-white"
                                  : "text-gray-400 hover:bg-gray-950 hover:text-white"
                              }`}
                            >
                              <div className="flex items-center gap-3 min-w-0">
                                <span className={isSel ? "text-white" : "text-gray-500"}>
                                  {item.icon}
                                </span>
                                <div className="truncate">
                                  <div className={`text-xs ${isSel ? "text-white font-bold" : "text-white"}`}>
                                    {item.title}
                                  </div>
                                  <div className={`text-[10px] truncate ${isSel ? "text-indigo-200" : "text-gray-500"}`}>
                                    {item.subtitle}
                                  </div>
                                </div>
                              </div>
                              {isSel && (
                                <div className="flex items-center gap-1 shrink-0 text-[10px] text-indigo-200">
                                  <span>Execute</span>
                                  <CornerDownLeft className="w-3 h-3" />
                                </div>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer status tip */}
              <div className="px-4 py-2 bg-[#06060c] border-t border-border/40 text-[9px] text-gray-500 flex items-center justify-between">
                <span className="flex items-center gap-1">
                  <Command className="w-3 h-3" />
                  <span>Use ↑↓ keys to cycle and Enter to run</span>
                </span>
                <span>CTRL + K to close</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
