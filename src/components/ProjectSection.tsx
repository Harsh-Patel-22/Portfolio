"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Cpu, ArrowUpRight, CheckCircle2, Terminal as TerminalIcon, X as CloseIcon } from "lucide-react";
import { GithubIcon } from "@/components/BrandIcons";
import { resumeData, Project } from "@/data/resume";
import SpotlightCard from "@/components/SpotlightCard";

const HttpHeadersCode = () => (
  <pre className="text-[11px] font-mono leading-relaxed text-gray-300 overflow-x-auto select-all">
    <code>
      <span className="text-green-400 font-bold">HTTP/1.1 200 OK</span>{"\n"}
      <span className="text-gray-500">Content-Type:</span> <span className="text-cyan-400">application/json; charset=utf-8</span>{"\n"}
      <span className="text-gray-500">Server:</span> <span className="text-indigo-400">Kestrel (ASP.NET Core / .NET 9.0)</span>{"\n"}
      <span className="text-gray-500">X-Cache-Lookup:</span> <span className="text-emerald-400">HIT from Redis Cache (ttl: 298s)</span>{"\n"}
      <span className="text-gray-500">X-Database-Query:</span> <span className="text-yellow-400">INDEX SEEK [IX_Users_Location] (Elapsed: 4.2ms)</span>{"\n"}
      <span className="text-gray-500">X-Routing-Path:</span> <span className="text-purple-400">{"GCP-VPC-Internal -> CloudRun-US-Central"}</span>{"\n"}
      <span className="text-gray-500">X-Request-ID:</span> <span className="text-pink-400">req-7f9a2b8e-cf04-4b55-a083-d922a912e84d</span>{"\n"}
      <span className="text-gray-500">Strict-Transport-Security:</span> <span className="text-white">max-age=31536000; includeSubDomains</span>{"\n"}
      <span className="text-gray-500">Access-Control-Allow-Origin:</span> <span className="text-white">*</span>{"\n"}
      <span className="text-gray-500">X-RateLimit-Limit:</span> <span className="text-white">100</span>{"\n"}
      <span className="text-gray-500">X-RateLimit-Remaining:</span> <span className="text-white">99</span>{"\n"}
      <span className="text-gray-500">X-RateLimit-Reset:</span> <span className="text-white">1718568455</span>{"\n"}
      {"\n"}
      <span className="text-gray-400 font-semibold">{"{"}</span>{"\n"}
      {"  "}<span className="text-orange-400">{"\"status\""}</span>: <span className="text-cyan-400">{"\"healthy\""}</span>,{"\n"}
      {"  "}<span className="text-orange-400">{"\"service\""}</span>: <span className="text-cyan-400">{"\"JSeeker Backend\""}</span>,{"\n"}
      {"  "}<span className="text-orange-400">{"\"version\""}</span>: <span className="text-cyan-400">{"\"v2.1.0-release\""}</span>,{"\n"}
      {"  "}<span className="text-orange-400">{"\"telemetry\""}</span>: <span className="text-gray-400">{"{"}</span>{"\n"}
      {"    "}<span className="text-orange-400">{"\"activeConnections\""}</span>: <span className="text-purple-400">142</span>,{"\n"}
      {"    "}<span className="text-orange-400">{"\"cpuUsage\""}</span>: <span className="text-purple-400">1.8</span>,{"\n"}
      {"    "}<span className="text-orange-400">{"\"memoryAllocatedMb\""}</span>: <span className="text-purple-400">76.4</span>{"\n"}
      {"  "}<span className="text-gray-400">{"}"}</span>{"\n"}
      <span className="text-gray-400 font-semibold">{"}"}</span>
    </code>
  </pre>
);

const LinqQueryCode = () => (
  <pre className="text-[11px] font-mono leading-relaxed text-gray-300 overflow-x-auto select-all">
    <code>
      <span className="text-gray-500">{"// Query JSeekers within a defined geographic radius"}</span>{"\n"}
      <span className="text-blue-400">public async</span> <span className="text-green-400">Task</span>{"<"}<span className="text-green-400">List</span>{"<"}<span className="text-green-400">UserDto</span>{">"}{">"} <span className="text-yellow-400">GetNearbyTalentAsync</span>(<span className="text-blue-400">double</span> latitude, <span className="text-blue-400">double</span> longitude, <span className="text-blue-400">double</span> radiusInKm){"\n"}
      {"{"}{"\n"}
      {"    "}<span className="text-blue-400">var</span> myLocation = <span className="text-blue-400">new</span> <span className="text-green-400">Point</span>(longitude, latitude) {"{"} SRID = 4326 {"}"}; <span className="text-gray-500">{"// WGS 84"}</span>{"\n"}
      {"    "}{"\n"}
      {"    "}<span className="text-blue-400">return await</span> _context.Users{"\n"}
      {"        "}.<span className="text-yellow-400">AsNoTracking</span>(){"\n"}
      {"        "}.<span className="text-yellow-400">Where</span>(u ={"=>"} u.Role == <span className="text-green-400">UserRole</span>.Candidate && u.IsActive){"\n"}
      {"        "}.<span className="text-yellow-400">Where</span>(u ={"=>"} u.Location.<span className="text-yellow-400">Distance</span>(myLocation) {"<="} radiusInKm * 1000) <span className="text-gray-500">{"// SQL spatial index seek"}</span>{"\n"}
      {"        "}.<span className="text-yellow-400">OrderBy</span>(u ={"=>"} u.Location.<span className="text-yellow-400">Distance</span>(myLocation)){"\n"}
      {"        "}.<span className="text-yellow-400">Select</span>(u ={"=>"} <span className="text-blue-400">new</span> <span className="text-green-400">UserDto</span>{"\n"}
      {"        "}{"{"}{"\n"}
      {"            "}Id = u.Id,{"\n"}
      {"            "}Name = u.Name,{"\n"}
      {"            "}GithubUsername = u.GithubUsername,{"\n"}
      {"            "}Skills = u.Skills.<span className="text-yellow-400">Select</span>(s ={"=>"} s.Name).<span className="text-yellow-400">ToList</span>(),{"\n"}
      {"            "}DistanceKm = <span className="text-green-400">Math</span>.<span className="text-yellow-400">Round</span>(u.Location.<span className="text-yellow-400">Distance</span>(myLocation) / 1000, 2){"\n"}
      {"        "}{"}"}){"\n"}
      {"        "}.<span className="text-yellow-400">ToListAsync</span>();{"\n"}
      {"}"}
    </code>
  </pre>
);

const JwtValidatorCode = () => (
  <pre className="text-[11px] font-mono leading-relaxed text-gray-300 overflow-x-auto select-all">
    <code>
      <span className="text-gray-500">{"// Validates JWT bearer tokens and extracts core claim permissions"}</span>{"\n"}
      <span className="text-blue-400">public</span> <span className="text-green-400">ClaimsPrincipal</span> <span className="text-yellow-400">ValidateToken</span>(<span className="text-blue-400">string</span> token){"\n"}
      {"{"}{"\n"}
      {"    "}<span className="text-blue-400">var</span> tokenHandler = <span className="text-blue-400">new</span> <span className="text-green-400">JwtSecurityTokenHandler</span>();{"\n"}
      {"    "}<span className="text-blue-400">var</span> key = <span className="text-green-400">Encoding</span>.ASCII.<span className="text-yellow-400">GetBytes</span>(_config[{"\"Jwt:Secret\""}]);{"\n"}
      {"    "}{"\n"}
      {"    "}<span className="text-blue-400">try</span>{"\n"}
      {"    "}{"{"}{"\n"}
      {"        "}tokenHandler.<span className="text-yellow-400">ValidateToken</span>(token, <span className="text-blue-400">new</span> <span className="text-green-400">TokenValidationParameters</span>{"\n"}
      {"        "}{"{"}{"\n"}
      {"            "}ValidateIssuerSigningKey = <span className="text-blue-400">true</span>,{"\n"}
      {"            "}IssuerSigningKey = <span className="text-blue-400">new</span> <span className="text-green-400">SymmetricSecurityKey</span>(key),{"\n"}
      {"            "}ValidateIssuer = <span className="text-blue-400">true</span>,{"\n"}
      {"            "}ValidIssuer = _config[{"\"Jwt:Issuer\""}],{"\n"}
      {"            "}ValidateAudience = <span className="text-blue-400">true</span>,{"\n"}
      {"            "}ValidAudience = _config[{"\"Jwt:Audience\""}],{"\n"}
      {"            "}ClockSkew = <span className="text-green-400">TimeSpan</span>.Zero{"\n"}
      {"        "}{"}"}, <span className="text-blue-400">out</span> <span className="text-green-400">SecurityToken</span> validatedToken);{"\n"}
      {"        "}{"\n"}
      {"        "}<span className="text-blue-400">var</span> jwtToken = (<span className="text-green-400">JwtSecurityToken</span>)validatedToken;{"\n"}
      {"        "}<span className="text-blue-400">var</span> claimsIdentity = <span className="text-blue-400">new</span> <span className="text-green-400">ClaimsIdentity</span>(jwtToken.Claims, {"\"Jwt\""});{"\n"}
      {"        "}<span className="text-blue-400">return new</span> <span className="text-green-400">ClaimsPrincipal</span>(claimsIdentity);{"\n"}
      {"    "}{"}"}{"\n"}
      {"    "}<span className="text-blue-400">catch</span>{"\n"}
      {"    "}{"{"}{"\n"}
      {"        "}<span className="text-blue-400">throw new</span> <span className="text-green-400">SecurityTokenValidationException</span>({"\"Invalid signature or expired token.\""});{"\n"}
      {"    "}{"}"}{"\n"}
      {"}"}
    </code>
  </pre>
);

export default function ProjectSection() {
  const [filter, setFilter] = useState<"all" | "backend" | "fullstack" | "bigdata">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeInspectorProject, setActiveInspectorProject] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"headers" | "linq" | "jwt">("headers");

  const categories = [
    { label: "All Modules", value: "all" },
    { label: "Fullstack Systems", value: "fullstack" },
    { label: "Backend Services", value: "backend" },
    { label: "Data Pipelines", value: "bigdata" },
  ] as const;

  const filteredProjects = useMemo(() => {
    return resumeData.projects.filter((project) => {
      const matchesCategory = filter === "all" || project.category === filter;
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch =
        project.title.toLowerCase().includes(searchLower) ||
        project.subtitle.toLowerCase().includes(searchLower) ||
        project.description.toLowerCase().includes(searchLower) ||
        project.technologies.some((tech) => tech.toLowerCase().includes(searchLower));

      return matchesCategory && matchesSearch;
    });
  }, [filter, searchQuery]);

  return (
    <section id="projects" className="w-full py-20 bg-background relative border-t border-border/40">
      <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center space-y-3 mb-12">
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white font-mono">
            System.<span className="text-indigo-400">getProjects()</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-xs md:text-sm">
            Engineering solutions designed for localized scalability, asynchronous processing, and deep backend integration.
          </p>
        </div>

        {/* Filter and Search controls */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8">
          {/* Tabs */}
          <div className="flex flex-wrap gap-1.5 p-1 bg-gray-950 border border-border/80 rounded-lg max-w-fit">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setFilter(cat.value)}
                className={`px-3.5 py-1.5 rounded-md text-[10px] md:text-xs font-mono font-medium transition-all duration-200 ${filter === cat.value
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/10"
                    : "text-gray-400 hover:text-white"
                  }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="relative flex-1 max-w-md">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-500" />
            </span>
            <input
              type="text"
              placeholder="Search stack, names, or key parameters..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 bg-[#09090f]/90 border border-border/80 rounded-md text-xs font-mono text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500/80 transition-all duration-200"
            />
          </div>
        </div>

        {/* Center JSeeker Card Layout */}
        <motion.div layout className="flex flex-col items-center justify-center min-h-[300px] w-full max-w-3xl mx-auto gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project: Project) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35 }}
                key={project.title}
                className="w-full"
              >
                <SpotlightCard className="p-6 flex flex-col justify-between h-full min-h-[420px]">
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="p-1 rounded bg-indigo-500/10 text-indigo-400">
                            <Cpu className="w-3.5 h-3.5" />
                          </span>
                          <h3 className="text-base md:text-lg font-bold text-white font-mono tracking-tight">
                            {project.title}
                          </h3>
                        </div>
                        <p className="text-xs text-indigo-300/95 font-mono">{project.subtitle}</p>
                      </div>
                      <span className="text-[10px] font-mono text-gray-500">{project.date}</span>
                    </div>

                    <AnimatePresence mode="wait">
                      {activeInspectorProject === project.title ? (
                        <motion.div
                          key="inspector"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="space-y-4 w-full"
                        >
                          {/* Terminal Panel */}
                          <div className="rounded-lg border border-border/60 bg-black/60 overflow-hidden flex flex-col font-mono text-xs text-white">
                            {/* Terminal Top Bar */}
                            <div className="flex items-center justify-between px-3 py-2 bg-gray-950 border-b border-border/60">
                              <div className="flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-red-500/70" />
                                <span className="w-2 h-2 rounded-full bg-yellow-500/70" />
                                <span className="w-2 h-2 rounded-full bg-green-500/70" />
                                <span className="text-[10px] text-gray-500 ml-2">jseeker-telemetry-console</span>
                              </div>
                              <button
                                onClick={() => setActiveInspectorProject(null)}
                                className="text-gray-500 hover:text-white transition-colors"
                                title="Close Console"
                              >
                                <CloseIcon className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            {/* Tabs Header */}
                            <div className="flex bg-[#07070c] border-b border-border/40 overflow-x-auto">
                              <button
                                onClick={() => setActiveTab("headers")}
                                className={`px-4 py-2 text-[10px] md:text-xs font-mono font-medium border-r border-border/40 transition-all ${
                                  activeTab === "headers"
                                    ? "bg-black/40 text-indigo-400 border-b-2 border-b-indigo-500"
                                    : "text-gray-500 hover:text-gray-300"
                                }`}
                              >
                                HTTP Headers
                              </button>
                              <button
                                onClick={() => setActiveTab("linq")}
                                className={`px-4 py-2 text-[10px] md:text-xs font-mono font-medium border-r border-border/40 transition-all ${
                                  activeTab === "linq"
                                    ? "bg-black/40 text-indigo-400 border-b-2 border-b-indigo-500"
                                    : "text-gray-500 hover:text-gray-300"
                                }`}
                              >
                                C# LINQ Query
                              </button>
                              <button
                                onClick={() => setActiveTab("jwt")}
                                className={`px-4 py-2 text-[10px] md:text-xs font-mono font-medium border-r border-border/40 transition-all ${
                                  activeTab === "jwt"
                                    ? "bg-black/40 text-indigo-400 border-b-2 border-b-indigo-500"
                                    : "text-gray-500 hover:text-gray-300"
                                }`}
                              >
                                JWT Validator
                              </button>
                            </div>

                            {/* Console Body */}
                            <div className="p-4 bg-black/40 h-64 overflow-y-auto custom-scrollbar">
                              {activeTab === "headers" && <HttpHeadersCode />}
                              {activeTab === "linq" && <LinqQueryCode />}
                              {activeTab === "jwt" && <JwtValidatorCode />}
                            </div>
                          </div>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="overview"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="space-y-4"
                        >
                          <p className="text-xs md:text-sm text-gray-400 leading-relaxed font-sans">
                            {project.description}
                          </p>

                          <div className="space-y-2">
                            <h4 className="text-[10px] font-mono font-bold tracking-wider text-gray-500 uppercase">
                              Core Metrics & Milestones
                            </h4>
                            <ul className="space-y-1.5 pl-1">
                              {project.achievements.map((ach, i) => (
                                <li key={i} className="text-xs text-gray-300 flex items-start gap-2">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500/80 shrink-0 mt-0.5" />
                                  <span className="leading-snug">{ach}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="mt-6 pt-5 border-t border-border/40 space-y-4">
                    {/* Tech stack */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded bg-gray-950 border border-border/80 text-[10px] font-mono text-gray-400"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-gray-950 border border-border/80 text-[11px] font-mono font-medium text-gray-300 hover:text-white hover:border-gray-700 transition-colors"
                      >
                        <GithubIcon className="w-3.5 h-3.5" />
                        Codebase
                      </a>
                      {project.hostedUrl && (
                        <a
                          href={project.hostedUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-indigo-600/10 text-[11px] font-mono font-medium text-indigo-400 hover:bg-indigo-600 hover:text-white transition-all"
                        >
                          Live Demo
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      )}
                      
                      <button
                        onClick={() => {
                          setActiveInspectorProject(
                            activeInspectorProject === project.title ? null : project.title
                          );
                        }}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded border text-[11px] font-mono font-medium transition-all duration-200 cursor-pointer ${
                          activeInspectorProject === project.title
                            ? "bg-indigo-600 border-indigo-500 text-white shadow-md shadow-indigo-600/20"
                            : "bg-indigo-600/10 border-indigo-500/30 text-indigo-400 hover:bg-indigo-600 hover:text-white hover:border-indigo-500"
                        }`}
                      >
                        <TerminalIcon className="w-3.5 h-3.5" />
                        {activeInspectorProject === project.title ? "Close Console" : "Inspect Module"}
                      </button>
                    </div>
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredProjects.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center py-16 text-center border border-dashed border-border/60 rounded-xl bg-gray-950/20">
              <span className="text-xs font-mono text-gray-500">
                No matching pipelines found in current query space.
              </span>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
