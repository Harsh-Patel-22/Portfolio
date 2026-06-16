"use client";

import React, { useState } from "react";
import { z } from "zod";
import { Send, Loader2, CheckCircle2, AlertCircle, Terminal } from "lucide-react";
import { resumeData } from "@/data/resume";

const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  subject: z.string().min(3, { message: "Subject must be at least 3 characters" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
});

type FormData = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [apiMessage, setApiMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (formErrors[name as keyof FormData]) {
      setFormErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormErrors({});
    setStatus("submitting");

    // Zod Validation
    const validation = contactSchema.safeParse(formData);
    if (!validation.success) {
      const errors: Partial<Record<keyof FormData, string>> = {};
      validation.error.issues.forEach((issue) => {
        const path = issue.path[0] as keyof FormData;
        errors[path] = issue.message;
      });
      setFormErrors(errors);
      setStatus("idle");
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
        setApiMessage(data.error || "Failed to dispatch payload to mail server.");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
      setApiMessage("A network interrupt occurred while dispatching email.");
    }
  };

  return (
    <section id="contact" className="w-full py-20 bg-background relative border-t border-border/40">
      <div className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center space-y-3 mb-12">
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white font-mono">
            System.<span className="text-indigo-400">connect()</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-xs md:text-sm">
            Ping my secure contact API handler to discuss backend opportunities, internships, or technical collaborations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Info Side */}
          <div className="space-y-6 md:col-span-1">
            <div className="glass-panel rounded-xl p-5 space-y-4 border border-border/80">
              <div className="flex items-center gap-2 text-indigo-400 font-mono font-semibold text-xs border-b border-border/40 pb-2">
                <Terminal className="w-3.5 h-3.5" />
                <span>Console Address Coordinates</span>
              </div>
              <div className="space-y-3 font-mono text-xs">
                <div>
                  <p className="text-gray-500">EMAIL</p>
                  <a href={`mailto:${resumeData.email}`} className="text-gray-300 hover:text-white hover:underline transition-all">
                    {resumeData.email}
                  </a>
                </div>
                <div>
                  <p className="text-gray-500">GITHUB</p>
                  <a href={resumeData.github} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white hover:underline transition-all">
                    github.com/Harsh-Patel-22
                  </a>
                </div>
                <div>
                  <p className="text-gray-500">LINKEDIN</p>
                  <a href={resumeData.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white hover:underline transition-all">
                    linkedin.com/in/harsh-patel-31ab6b2a2/
                  </a>
                </div>
                <div>
                  <p className="text-gray-500">LEETCODE</p>
                  <a href={resumeData.leetcode} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white hover:underline transition-all">
                    leetcode.com/u/Harsh-Patel-22/
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="md:col-span-2">
            <div className="glass-panel rounded-xl p-6 border border-border/80 relative">
              {status === "success" ? (
                <div className="py-12 flex flex-col items-center justify-center text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 animate-bounce" />
                  <h3 className="text-base font-bold font-mono text-white">Payload Dispatched Successfully</h3>
                  <p className="text-xs text-gray-400 font-mono max-w-sm">
                    Connection initialized. Thank you for writing. I will evaluate the request logs and respond shortly.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-4 px-4 py-1.5 rounded bg-indigo-600 hover:bg-indigo-500 font-mono text-xs text-white transition-all duration-200"
                  >
                    Send Another Payload
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {status === "error" && (
                    <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded flex items-start gap-2.5 text-xs text-rose-400 font-mono">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>{apiMessage}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="name" className="text-[10px] font-mono font-bold tracking-wider text-gray-500 uppercase">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        disabled={status === "submitting"}
                        className={`w-full px-3.5 py-2 bg-gray-950/80 border ${
                          formErrors.name ? "border-rose-500/50" : "border-border/80"
                        } rounded-md text-xs font-mono text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500 transition-colors`}
                        placeholder="John Doe"
                      />
                      {formErrors.name && (
                        <p className="text-[10px] text-rose-400 font-mono">{formErrors.name}</p>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="email" className="text-[10px] font-mono font-bold tracking-wider text-gray-500 uppercase">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={status === "submitting"}
                        className={`w-full px-3.5 py-2 bg-gray-950/80 border ${
                          formErrors.email ? "border-rose-500/50" : "border-border/80"
                        } rounded-md text-xs font-mono text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500 transition-colors`}
                        placeholder="john@example.com"
                      />
                      {formErrors.email && (
                        <p className="text-[10px] text-rose-400 font-mono">{formErrors.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="subject" className="text-[10px] font-mono font-bold tracking-wider text-gray-500 uppercase">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      disabled={status === "submitting"}
                      className={`w-full px-3.5 py-2 bg-gray-950/80 border ${
                        formErrors.subject ? "border-rose-500/50" : "border-border/80"
                      } rounded-md text-xs font-mono text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500 transition-colors`}
                      placeholder="Opportunity / Collaboration"
                    />
                    {formErrors.subject && (
                      <p className="text-[10px] text-rose-400 font-mono">{formErrors.subject}</p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="message" className="text-[10px] font-mono font-bold tracking-wider text-gray-500 uppercase">
                      Message Payload
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      disabled={status === "submitting"}
                      className={`w-full px-3.5 py-2 bg-gray-950/80 border ${
                        formErrors.message ? "border-rose-500/50" : "border-border/80"
                      } rounded-md text-xs font-mono text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500 transition-colors resize-none`}
                      placeholder="Specify project parameters or inquiry logs..."
                    />
                    {formErrors.message && (
                      <p className="text-[10px] text-rose-400 font-mono">{formErrors.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-md text-xs font-mono font-bold text-white bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-600/50 disabled:cursor-not-allowed transition-all duration-200 shadow-md shadow-indigo-600/10"
                  >
                    {status === "submitting" ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        Transmitting...
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        Submit Request
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
