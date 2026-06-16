"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, Terminal as TerminalIcon, FileText } from "lucide-react";

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
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
          <div className="hidden md:flex items-center gap-8">
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
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md text-xs font-mono font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-colors duration-200 shadow-md shadow-indigo-600/10"
            >
              Get in Touch
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
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
