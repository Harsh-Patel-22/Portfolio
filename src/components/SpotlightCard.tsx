"use client";

import React, { useState, useRef } from "react";
import { cn } from "@/lib/utils";

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  borderColor?: string;
  size?: number;
}

export default function SpotlightCard({
  children,
  className,
  glowColor = "rgba(99, 102, 241, 0.08)",
  borderColor = "rgba(99, 102, 241, 0.35)",
  size = 300,
  ...props
}: SpotlightCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardPosRef = useRef({ left: 0, top: 0 });

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      cardPosRef.current = {
        left: rect.left + (typeof window !== "undefined" ? window.scrollX : 0),
        top: rect.top + (typeof window !== "undefined" ? window.scrollY : 0),
      };
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setCoords({
      x: e.pageX - cardPosRef.current.left,
      y: e.pageY - cardPosRef.current.top,
    });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "relative rounded-xl overflow-hidden border border-border/80 bg-[#0c0c12]/75 backdrop-blur-md transition-all duration-300",
        className
      )}
      {...props}
    >
      {/* Background Radial Glow */}
      {isHovered && (
        <div
          className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
          style={{
            background: `radial-gradient(${size}px circle at ${coords.x}px ${coords.y}px, ${glowColor}, transparent)`,
          }}
        />
      )}

      {/* Border Radial Glow Overlay */}
      {isHovered && (
        <div
          className="pointer-events-none absolute -inset-[1px] z-10 rounded-xl border border-transparent transition-opacity duration-300"
          style={{
            background: `radial-gradient(${size * 0.75}px circle at ${coords.x}px ${coords.y}px, ${borderColor}, transparent) border-box`,
            WebkitMask: "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        />
      )}

      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
}
