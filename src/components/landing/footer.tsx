"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Pill,
  Check,
  Copy,
  Github,
  Heart,
  Scale,
  Sparkles,
} from "lucide-react";
import { CLONE_CMD, GITHUB_URL } from "./constants";

function FinalCTA() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(CLONE_CMD);
    } catch {
      /* clipboard unavailable */
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-emerald-500/20 bg-gradient-to-b from-slate-900/80 to-[#0b1120] px-6 sm:px-10 py-12 sm:py-16 text-center">
      <div className="absolute inset-0 grid-backdrop opacity-70 pointer-events-none" />
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[560px] h-[280px] bg-emerald-500/[0.08] blur-[90px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.55 }}
        className="relative"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-500/25 bg-violet-500/[0.07] font-mono text-[11px] text-violet-300 mb-5">
          <Sparkles className="w-3 h-3" />
          PRs welcome · good first issues available
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-slate-100 max-w-2xl mx-auto leading-tight">
          Ship your first{" "}
          <span className="text-gradient-neon">Dependency Exit Capsule</span>{" "}
          in 60 seconds
        </h2>
        <p className="mt-4 text-slate-400 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
          Clone the skill, point it at any Python repository, and watch it
          scan manifests, map AST call sites, query live PyPI data, and run
          sandbox verification — all inside your favorite agent harness.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={copy}
            className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-emerald-500 text-[#052018] font-semibold text-sm hover:bg-emerald-400 transition-all shadow-[0_8px_40px_-8px_rgba(16,185,129,0.55)]"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" /> Command copied
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 opacity-70 group-hover:opacity-100" />
                Clone the skill
              </>
            )}
          </button>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl border border-slate-700 bg-slate-900/60 glass-panel text-slate-200 font-medium text-sm hover:border-emerald-500/40 transition-all"
          >
            <Github className="w-4 h-4" />
            Star on GitHub
            <ArrowRight className="w-4 h-4 opacity-50" />
          </a>
        </div>
      </motion.div>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="relative mt-8 border-t border-slate-800/70 bg-[#070a12]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-14 pb-8 flex flex-col">
        <FinalCTA />

        {/* Footer body */}
        <div className="mt-14 grid md:grid-cols-[1.4fr_1fr_1fr] gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg border border-emerald-500/40 bg-emerald-500/10">
                <Pill className="w-4 h-4 text-emerald-400" />
              </span>
              <span className="font-mono text-sm text-slate-300">
                exit<span className="text-emerald-400">-capsule</span>
              </span>
            </div>
            <p className="mt-3.5 text-[13px] text-slate-500 leading-relaxed max-w-sm">
              A dependency maintenance agent skill for Python — built to
              the Agent Skills Open Standard, verified through isolated
              sandbox execution.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-slate-800 bg-slate-900/60 font-mono text-[10.5px] text-slate-400">
                <Scale className="w-3 h-3 text-emerald-400" />
                MIT License
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-slate-800 bg-slate-900/60 font-mono text-[10.5px] text-slate-400">
                Python 3.12 · 3.13
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-slate-800 bg-slate-900/60 font-mono text-[10.5px] text-slate-400">
                zero-dep core
              </span>
            </div>
          </div>

          {/* Event tags */}
          <div>
            <h3 className="font-mono text-[10px] uppercase tracking-widest text-slate-600 mb-4">
              built for
            </h3>
            <div className="space-y-2.5">
              <a
                href="https://hacktoberfest.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 rounded-lg border border-slate-800 bg-slate-900/40 px-3 py-2.5 hover:border-violet-500/40 transition-colors group"
              >
                <span className="text-lg leading-none">🎃</span>
                <div>
                  <p className="text-[13px] text-slate-300 group-hover:text-violet-300 transition-colors">
                    Hacktoberfest 2026
                  </p>
                  <p className="font-mono text-[10px] text-slate-600">
                    open-source · october
                  </p>
                </div>
              </a>
              <a
                href="https://abhyantriki.in"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 rounded-lg border border-slate-800 bg-slate-900/40 px-3 py-2.5 hover:border-emerald-500/40 transition-colors group"
              >
                <span className="text-lg leading-none">⚙️</span>
                <div>
                  <p className="text-[13px] text-slate-300 group-hover:text-emerald-300 transition-colors">
                    Abhyantriki KJSCE 2026
                  </p>
                  <p className="font-mono text-[10px] text-slate-600">
                    track 2 · agent skills
                  </p>
                </div>
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-mono text-[10px] uppercase tracking-widest text-slate-600 mb-4">
              links
            </h3>
            <ul className="space-y-2.5 text-[13px]">
              <li>
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-emerald-300 transition-colors inline-flex items-center gap-2"
                >
                  <Github className="w-3.5 h-3.5" /> GitHub repository
                </a>
              </li>
              <li>
                <a
                  href="https://agentskills.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-emerald-300 transition-colors inline-flex items-center gap-2"
                >
                  <Sparkles className="w-3.5 h-3.5" /> Agent Skills Standard
                </a>
              </li>
              <li>
                <a
                  href="https://pypi.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-emerald-300 transition-colors inline-flex items-center gap-2"
                >
                  <Pill className="w-3.5 h-3.5" /> PyPI JSON API
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-mono text-[11px] text-slate-600">
            © 2026 Team ShadowGarden — crafted with{" "}
            <Heart className="w-3 h-3 inline text-rose-500/70" /> for
            maintainers everywhere
          </p>
          <p className="font-mono text-[11px] text-slate-700">
            H26_ShadowGarden · exit-capsule
          </p>
        </div>
      </div>
    </footer>
  );
}
