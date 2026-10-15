"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  Copy,
  Github,
  Sparkles,
  Zap,
} from "lucide-react";
import { GITHUB_URL, MKDIR_CMD } from "./constants";
import { AgentTerminal } from "./agent-terminal";
import { FileTree } from "./file-tree";

function useCopy() {
  const [copied, setCopied] = useState(false);
  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Fallback for older browsers
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };
  return { copied, copy };
}

export function Hero() {
  const { copied, copy } = useCopy();

  return (
    <section
      id="top"
      className="relative overflow-hidden pt-28 sm:pt-32 pb-16 sm:pb-24"
    >
      {/* Backdrop layers */}
      <div className="absolute inset-0 grid-backdrop" />
      <div className="absolute inset-0 dot-backdrop opacity-40" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[820px] h-[480px] rounded-full bg-emerald-500/[0.07] blur-[110px] float-slow pointer-events-none" />
      <div className="absolute top-24 -left-40 w-[420px] h-[420px] rounded-full bg-violet-600/[0.06] blur-[100px] float-slower pointer-events-none" />
      <div className="absolute top-64 -right-32 w-[460px] h-[460px] rounded-full bg-sky-500/[0.05] blur-[110px] float-slow pointer-events-none" />
      {/* Fade edges */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#090d16] to-transparent pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-14 items-start min-w-0">
          {/* Left — copy */}
          <div className="max-w-2xl min-w-0">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/[0.07] text-xs text-emerald-300/90 font-mono"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>
                Built for Agent Skills Open Standard
                <span className="text-slate-500"> (agentskills.io)</span>
              </span>
              <span className="text-slate-700">•</span>
              <span className="text-violet-300">Track 2</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08 }}
              className="mt-6 text-4xl sm:text-5xl lg:text-[3.4rem] font-semibold tracking-tight leading-[1.08] text-slate-100"
            >
              Autonomous Dependency
              <br className="hidden sm:block" />
              Maintenance Agent
              <br className="hidden sm:block" />
              for{" "}
              <span className="text-gradient-neon">
                Python
                <span className="font-mono text-[0.55em] align-middle text-emerald-400/90 ml-2">
                  3.12/3.13
                </span>
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.16 }}
              className="mt-5 text-slate-400 text-base sm:text-lg leading-relaxed max-w-xl"
            >
              An enterprise-grade, zero-dependency agent skill that scans
              repositories, maps AST call sites, runs isolated sandbox tests,
              and generates verified{" "}
              <span className="text-slate-200 font-medium">
                Dependency Exit Capsules
              </span>
              .
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.24 }}
              className="mt-8 flex flex-col sm:flex-row gap-3"
            >
              <button
                onClick={() => copy(MKDIR_CMD)}
                className="group relative inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-emerald-500 text-[#052018] font-semibold text-sm hover:bg-emerald-400 transition-all shadow-[0_8px_40px_-8px_rgba(16,185,129,0.55)] hover:shadow-[0_10px_48px_-6px_rgba(16,185,129,0.7)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400"
              >
                <Zap className="w-4 h-4" />
                {copied ? "Copied to clipboard" : "Install Agent Skill"}
                {copied ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity" />
                )}
              </button>

              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl border border-slate-700 bg-slate-900/60 text-slate-200 font-medium text-sm hover:border-slate-500 hover:bg-slate-800/70 transition-all glass-panel"
              >
                <Github className="w-4 h-4" />
                View on GitHub
                <ArrowRight className="w-4 h-4 opacity-50 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </motion.div>

            {/* Install snippet */}
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.32 }}
              className="mt-4 max-w-xl"
            >
              <button
                onClick={() => copy(MKDIR_CMD)}
                className="group w-full text-left flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-emerald-500/40 transition-colors font-mono text-xs sm:text-[13px]"
                aria-label="Copy install command"
              >
                <span className="text-emerald-400 select-none shrink-0">$</span>
                <span className="text-slate-300 truncate min-w-0 flex-1">{MKDIR_CMD}</span>
                <span className="ml-auto shrink-0 text-slate-600 group-hover:text-emerald-400 transition-colors">
                  {copied ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </span>
              </button>
              <p className="mt-2 text-[11px] text-slate-600 font-mono">
                drop the skill into any agent harness — it becomes globally
                discoverable
              </p>
            </motion.div>
          </div>

          {/* Right — terminal + file tree */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-col gap-5 lg:pt-2 min-w-0"
          >
            <AgentTerminal />
            <FileTree />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
