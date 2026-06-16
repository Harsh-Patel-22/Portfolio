"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Cpu, Server, HardDrive, ShieldCheck, Database } from "lucide-react";

export default function TelemetryTicker() {
  const [isOpen, setIsOpen] = useState(false);
  const [metrics, setMetrics] = useState({
    latency: 24,
    cpu: 1.4,
    ram: 42.8,
  });

  // Simulate server fluctuations
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) => {
        // Random walks for authentic system simulation
        const latencyDelta = Math.random() > 0.5 ? 1 : -1;
        const newLatency = Math.max(18, Math.min(45, prev.latency + latencyDelta * Math.floor(Math.random() * 4)));

        const cpuDelta = Math.random() > 0.55 ? 0.2 : -0.2;
        const newCpu = Math.max(0.8, Math.min(4.8, parseFloat((prev.cpu + cpuDelta * Math.random()).toFixed(1))));

        const ramDelta = Math.random() > 0.5 ? 0.05 : -0.05;
        const newRam = Math.max(41.5, Math.min(44.2, parseFloat((prev.ram + ramDelta).toFixed(2))));

        return {
          latency: newLatency,
          cpu: newCpu,
          ram: newRam,
        };
      });
    }, 1800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-4 left-4 z-40 font-mono text-left select-none">
      <AnimatePresence mode="wait">
        {!isOpen ? (
          /* Collapsed State Toggle Pill */
          <motion.button
            key="collapsed"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-500/30 bg-[#06060c]/90 text-indigo-400 text-[10px] shadow-lg hover:border-indigo-500/60 hover:bg-[#090915] transition-all duration-200"
            aria-label="Expand system diagnostics"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>SYS_MONITOR: ACTIVE</span>
            <span className="text-gray-600">|</span>
            <span className="text-gray-400">{metrics.latency}ms</span>
          </motion.button>
        ) : (
          /* Expanded Diagnostics Console */
          <motion.div
            key="expanded"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 20, stiffness: 250 }}
            className="w-[280px] md:w-[320px] rounded-xl border border-indigo-500/20 bg-[#06060c]/95 p-4 shadow-2xl backdrop-blur-md"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-border/40">
              <div className="flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-indigo-400 animate-pulse" />
                <span className="text-xs font-bold text-white">SYSTEM DIAGNOSTICS</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-[10px] text-gray-500 hover:text-white border border-border/60 rounded px-1.5 py-0.5 hover:border-gray-500 transition-all cursor-pointer"
              >
                Hide
              </button>
            </div>

            {/* Metrics List */}
            <div className="space-y-2.5 text-[11px] text-gray-400">
              {/* Metric 1 */}
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-gray-500" />
                  Virtual CPU Load:
                </span>
                <span className="text-white font-semibold flex items-center gap-1">
                  <span className="inline-block w-8 text-right">{metrics.cpu}%</span>
                  <span className="text-gray-600">/ 100%</span>
                </span>
              </div>

              {/* Metric 2 */}
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Server className="w-3.5 h-3.5 text-gray-500" />
                  API Latency:
                </span>
                <span className="text-white font-semibold">
                  <span className="text-indigo-400">{metrics.latency}</span> ms
                </span>
              </div>

              {/* Metric 3 */}
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <HardDrive className="w-3.5 h-3.5 text-gray-500" />
                  Virtual RAM CLR:
                </span>
                <span className="text-white font-semibold flex items-center gap-1">
                  <span>{metrics.ram} MB</span>
                  <span className="text-gray-600">/ 512MB</span>
                </span>
              </div>

              <div className="h-[1px] bg-border/40 my-2" />

              {/* Metric 4 */}
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Database className="w-3.5 h-3.5 text-gray-500" />
                  DB Link Status:
                </span>
                <span className="text-emerald-400 font-bold">SQL_SERVER [OK]</span>
              </div>

              {/* Metric 5 */}
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-gray-500" />
                  Backend Version:
                </span>
                <span className="text-white">ASP.NET 9.0 CLR</span>
              </div>
            </div>

            {/* Simulated graph lines animation */}
            <div className="mt-4 flex gap-1 h-6 items-end justify-between px-1 select-none overflow-hidden">
              {Array.from({ length: 24 }).map((_, idx) => {
                const height = Math.floor(Math.sin((idx + metrics.latency) * 0.4) * 8) + 12;
                return (
                  <span
                    key={idx}
                    className="w-[3px] bg-indigo-500/35 rounded-t transition-all duration-500"
                    style={{
                      height: `${height}px`,
                      backgroundColor: idx === 23 ? "rgba(99, 102, 241, 0.8)" : undefined,
                    }}
                  />
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
