"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check, Copy, Github, Sparkles } from "lucide-react";
import { GITHUB_URL, MKDIR_CMD } from "./constants";
import { AgentTerminal } from "./agent-terminal";
import { FileTree } from "./file-tree";

function useCopy() {
  const [copied, setCopied] = useState(false);
  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
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
      {/* Backdrop */}
      <div className="absolute inset-0 paper-grid" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#141210] to-transparent pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-14 items-start min-w-0">
          {/* Left — copy */}
          <div className="max-w-2xl min-w-0">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#2b261f] bg-[#1d1a15] text-xs text-[#cfc9bf] font-mono"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#d3a05c]" />
              <span>
                Built for Agent Skills Open Standard
                <span className="text-[#5c554a]"> (agentskills.io)</span>
              </span>
              <span className="text-[#453f36]">•</span>
              <span className="text-[#d3a05c]">Track 2</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08 }}
              className="mt-6 font-serif text-4xl sm:text-5xl lg:text-[3.4rem] font-medium tracking-tight leading-[1.12] text-[#e9e4da]"
            >
              Dependency Maintenance
              <br className="hidden sm:block" />
              Agent for{" "}
              <em className="italic text-[#d3a05c]">Python</em>
              <span className="font-mono text-[0.38em] align-middle text-[#a29a8d] ml-3 tracking-wide">
                3.12 / 3.13
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.16 }}
              className="mt-5 text-[#a29a8d] text-base sm:text-lg leading-relaxed max-w-xl"
            >
              An enterprise-grade, zero-dependency agent skill that scans
              repositories, maps AST call sites, runs isolated sandbox tests,
              and writes verified{" "}
              <span className="text-[#e9e4da] font-medium">
                Exit Capsules
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
                className="group relative inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#d3a05c] text-[#21190f] font-semibold text-sm hover:bg-[#dcae6e] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d3a05c]"
              >
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
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl border border-[#2b261f] bg-[#1d1a15] text-[#e9e4da] font-medium text-sm hover:border-[#4a3f2d] transition-colors"
              >
                <Github className="w-4 h-4" />
                View on GitHub
                <ArrowRight className="w-4 h-4 opacity-50" />
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
                className="group w-full text-left flex items-center gap-3 px-4 py-3 rounded-xl bg-[#12100d] border border-[#2b261f] hover:border-[#3a2f1f] transition-colors font-mono text-xs sm:text-[13px]"
                aria-label="Copy install command"
              >
                <span className="text-[#d3a05c] select-none shrink-0">$</span>
                <span className="text-[#cfc9bf] truncate min-w-0 flex-1">
                  {MKDIR_CMD}
                </span>
                <span className="ml-auto shrink-0 text-[#5c554a] group-hover:text-[#d3a05c] transition-colors">
                  {copied ? (
                    <Check className="w-4 h-4 text-[#93ab8d]" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </span>
              </button>
              <p className="mt-2 text-[11px] text-[#5c554a] font-mono">
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
