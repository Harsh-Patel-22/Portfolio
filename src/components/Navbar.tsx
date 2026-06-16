"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, Terminal as TerminalIcon, Search } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Timeline", href: "#timeline" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
          ? "bg-[#050508]/80 backdrop-blur-md border-b border-border/80 py-3"
          : "bg-transparent py-5"
        }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TerminalIcon className="w-5 h-5 text-indigo-400" />
            <a href="#home" className="text-white font-mono font-bold tracking-tight text-sm md:text-base">
              harsh<span className="text-indigo-400">.patel()</span>
            </a>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-6">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-gray-400 hover:text-white font-mono text-xs transition-colors duration-200"
                >
                  {item.label}
                </a>
              ))}
            </div>

            <button
              onClick={() => window.dispatchEvent(new CustomEvent("open-command-menu"))}
              className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#0a0a0f] border border-border/80 text-[10px] font-mono text-gray-500 hover:text-white hover:border-indigo-500/50 transition-all duration-200 cursor-pointer select-none"
              aria-label="Open command menu"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Search...</span>
              <kbd className="px-1.5 py-0.5 rounded bg-gray-955 border border-border text-[8px] text-gray-600">Ctrl K</kbd>
            </button>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md text-xs font-mono font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-colors duration-200 shadow-md shadow-indigo-600/10"
            >
              Get in Touch
            </a>
          </div>

          {/* Mobile Menu & Search Actions */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => window.dispatchEvent(new CustomEvent("open-command-menu"))}
              className="p-2 text-gray-400 hover:text-white focus:outline-none cursor-pointer"
              aria-label="Open search menu"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-400 hover:text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden bg-[#07070c] border-b border-border py-4 px-4 space-y-3">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="block text-gray-300 hover:text-white font-mono text-xs py-2 border-b border-border/40"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setIsOpen(false)}
            className="block text-center px-4 py-2 rounded-md text-xs font-mono font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-colors duration-200"
          >
            Get in Touch
          </a>
        </div>
      )}
    </nav>
  );
}
