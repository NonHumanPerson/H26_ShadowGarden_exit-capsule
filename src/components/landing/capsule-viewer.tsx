"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  BrainCircuit,
  FileCode2,
  FlaskConical,
  Layers,
  Lightbulb,
  ListChecks,
  ScanSearch,
  Sparkles,
} from "lucide-react";
import { SectionHeading } from "./section-heading";

/* ---------- Real data captured from an actual agent run on isair/jarvis ---------- */

interface AtRiskRow {
  pkg: string;
  lastRelease: string;
  stale: string;
  staleHot?: boolean;
  risk: string;
  usage: string;
}

const AT_RISK: AtRiskRow[] = [
  {
    pkg: "webrtcvad",
    lastRelease: "2017-01-07",
    stale: "3,567 · 9.7 yrs",
    staleHot: true,
    risk: "No releases, no Python constraints",
    usage: "listener.py:118 — VAD for wake word",
  },
  {
    pkg: "pytesseract",
    lastRelease: "2024-08-16",
    stale: "790",
    risk: "No releases",
    usage: "screenshot.py:51 — OCR",
  },
  {
    pkg: "pygame",
    lastRelease: "2024-09-29",
    stale: "745",
    risk: "Inactive classifier",
    usage: "tts.py:556 — audio playback",
  },
  {
    pkg: "pytest-repeat",
    lastRelease: "2025-04-07",
    stale: "555",
    risk: "No releases",
    usage: "Test dependency",
  },
  {
    pkg: "html2text",
    lastRelease: "2025-04-15",
    stale: "548",
    risk: "No releases",
    usage: "Not directly imported",
  },
  {
    pkg: "miniupnpc",
    lastRelease: "2025-05-26",
    stale: "506",
    risk: "No releases, no constraints",
    usage: "UPnP port mapping",
  },
  {
    pkg: "mlx-whisper",
    lastRelease: "2025-08-29",
    stale: "411",
    risk: "No releases",
    usage: "Apple Silicon Whisper (4 files)",
  },
  {
    pkg: "Pillow",
    lastRelease: "2026-07-01",
    stale: "105",
    risk: "Inactive classifier",
    usage: "Image processing",
  },
  {
    pkg: "pynput",
    lastRelease: "2026-05-12",
    stale: "155",
    risk: "No Python constraints",
    usage: "Global hotkeys (6 files)",
  },
];

const CLUSTERS = [
  {
    name: "Desktop UI",
    packages: ["PyQt6 · 300+ imports", "PyQt6-WebEngine"],
    purpose: "System tray, chat, wizard, settings",
  },
  {
    name: "Voice / Audio",
    packages: [
      "sounddevice",
      "faster-whisper",
      "mlx-whisper",
      "piper-tts",
      "webrtcvad",
      "pygame",
    ],
    purpose: "Listening, dictation, TTS",
  },
  {
    name: "ML / LLM",
    packages: ["numpy", "requests", "curl_cffi", "mcp", "pydantic"],
    purpose: "Ollama / OpenAI backends, MCP tools",
  },
  {
    name: "Web / Scraping",
    packages: ["beautifulsoup4", "lxml", "html2text", "flask"],
    purpose: "Web search, fetch, memory viewer",
  },
  {
    name: "System",
    packages: ["psutil", "geoip2", "pynput", "filelock"],
    purpose: "Process, location, hotkeys, locking",
  },
];

const MIGRATIONS = [
  {
    from: "webrtcvad",
    to: "silero-vad",
    alt: "or webrtcvad-wheels (maintained fork)",
    note: "wake-word VAD — oldest dep in repo",
  },
  {
    from: "pytesseract",
    to: "rapidocr",
    alt: "or paddleocr",
    note: "wraps tesseract binary; drop the system dep",
  },
  {
    from: "html2text",
    to: "markdownify",
    alt: "or built-in html.parser",
    note: "not directly imported — easy exit",
  },
  {
    from: "pynput",
    to: "fork w/ requires_python",
    alt: "or hotkey alternative",
    note: "global hotkeys across 6 files",
  },
  {
    from: "pytest",
    to: "verify classifier",
    alt: "report upstream",
    note: "classifier likely stale",
  },
  {
    from: "pygame",
    to: "pygame-ce",
    alt: "community edition",
    note: "actively maintained drop-in",
  },
];

/* ---------- Tabs ---------- */

type TabKey = "summary" | "risk" | "clusters" | "migration";

const TABS: { key: TabKey; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { key: "summary", label: "Summary", icon: ScanSearch },
  { key: "risk", label: "At-Risk Deps", icon: AlertTriangle },
  { key: "clusters", label: "Clusters", icon: Layers },
  { key: "migration", label: "Migration Plan", icon: ListChecks },
];

function StatChip({
  value,
  label,
  tone,
}: {
  value: string;
  label: string;
  tone: "emerald" | "rose" | "violet";
}) {
  const tones = {
    emerald: "text-emerald-400 border-emerald-500/30 bg-emerald-500/[0.07]",
    rose: "text-rose-400 border-rose-500/30 bg-rose-500/[0.07]",
    violet: "text-violet-300 border-violet-500/30 bg-violet-500/[0.07]",
  };
  return (
    <div className={`rounded-lg border px-4 py-3 ${tones[tone]}`}>
      <p className="font-mono text-xl font-semibold">{value}</p>
      <p className="mt-0.5 text-[11px] text-slate-500">{label}</p>
    </div>
  );
}

export function CapsuleViewer() {
  const [tab, setTab] = useState<TabKey>("risk");

  return (
    <section id="capsule" className="relative py-20 sm:py-28">
      <div className="absolute inset-0 dot-backdrop opacity-25 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[400px] rounded-full bg-violet-600/[0.05] blur-[110px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          index="03"
          kicker="the deliverable"
          accent="purple"
          title="The Dependency Exit Capsule"
          description="Every run concludes with a verifiable markdown artifact — EXIT_CAPSULE.md. Risk indicators are pinned to import sites, AI proposals are clearly labeled, and verification results are execution-backed. This is real output from a live run against isair/jarvis."
        />

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap gap-2.5 mb-6"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-rose-500/25 bg-rose-500/[0.06] text-[11px] font-mono text-rose-300">
            <AlertTriangle className="w-3 h-3" /> risk indicators — PyPI
            ground truth
          </span>
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-violet-500/25 bg-violet-500/[0.06] text-[11px] font-mono text-violet-300">
            <Lightbulb className="w-3 h-3" /> AI proposals — clearly labeled
            suggestions
          </span>
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/[0.06] text-[11px] font-mono text-emerald-300">
            <BadgeCheck className="w-3 h-3" /> verified results — sandbox
            pytest only
          </span>
        </motion.div>

        {/* Document viewer frame */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="glass-panel hud-corners rounded-xl overflow-hidden shadow-[0_28px_90px_-30px_rgba(139,92,246,0.28)]"
        >
          {/* File header */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 px-4 sm:px-5 py-3.5 border-b border-slate-800/80 bg-slate-950/60">
            <div className="flex items-center gap-2.5">
              <FileCode2 className="w-4 h-4 text-violet-400" />
              <span className="font-mono text-[13px] text-slate-200">
                EXIT_CAPSULE.md
              </span>
            </div>
            <span className="font-mono text-[10px] text-slate-600 hidden sm:inline">
              repo: isair/jarvis · generated by exit-capsule
            </span>
            <span className="ml-auto inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-emerald-400 border border-emerald-500/30 bg-emerald-500/10 rounded-full px-2.5 py-1">
              <span className="live-dot w-1.5 h-1.5 rounded-full bg-emerald-400" />
              verified artifact
            </span>
          </div>

          {/* Tabs */}
          <div
            className="flex gap-1 px-3 sm:px-4 pt-3 border-b border-slate-800/80 overflow-x-auto terminal-scroll"
            role="tablist"
            aria-label="Capsule sections"
          >
            {TABS.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                role="tab"
                aria-selected={tab === key}
                onClick={() => setTab(key)}
                className={`inline-flex items-center gap-2 px-3.5 py-2.5 text-[12.5px] font-medium rounded-t-lg border-b-2 -mb-px transition-colors whitespace-nowrap ${
                  tab === key
                    ? "border-emerald-400 text-emerald-300 bg-emerald-500/[0.06]"
                    : "border-transparent text-slate-500 hover:text-slate-300"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="p-4 sm:p-6 min-h-[420px]">
            <AnimatePresence mode="wait">
              {/* ---- SUMMARY ---- */}
              {tab === "summary" && (
                <motion.div
                  key="summary"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-5"
                >
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <StatChip value="45" label="dependencies scanned" tone="emerald" />
                    <StatChip value="12" label="flagged at-risk" tone="rose" />
                    <StatChip value="148" label=".py files mapped" tone="violet" />
                    <StatChip value="5" label="architecture clusters" tone="emerald" />
                  </div>

                  <div className="rounded-lg border border-slate-800 bg-slate-950/60 p-4">
                    <p className="font-mono text-[10px] uppercase tracking-widest text-slate-600 mb-2">
                      capsule summary line
                    </p>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      Massive{" "}
                      <span className="text-sky-300 font-medium">PyQt6</span>{" "}
                      desktop app + voice/ML stack. Critical staleness
                      concentrated in the audio path —{" "}
                      <span className="text-rose-300 font-mono text-[13px]">
                        webrtcvad
                      </span>{" "}
                      has not shipped a release since{" "}
                      <span className="font-mono text-[13px]">2017</span>,
                      while the rest of the stack tracks modern releases.
                    </p>
                  </div>

                  <div className="rounded-lg border border-amber-500/25 bg-amber-500/[0.05] p-4">
                    <div className="flex items-center gap-2 mb-1.5">
                      <FlaskConical className="w-3.5 h-3.5 text-amber-400" />
                      <span className="font-mono text-[10px] uppercase tracking-widest text-amber-300">
                        verification status
                      </span>
                    </div>
                    <p className="text-[13px] text-slate-400 leading-relaxed">
                      Baseline <span className="font-mono text-[12px] text-slate-300">pytest</span>{" "}
                      skipped — heavy desktop deps (PyQt6, audio, CUDA)
                      require display/audio hardware. Tests need micromamba
                      env with <span className="font-mono text-[12px]">.mamba_env</span>{" "}
                      activation, per repo AGENTS.md. The capsule reports this
                      honestly instead of fabricating a green checkmark.
                    </p>
                  </div>
                </motion.div>
              )}

              {/* ---- AT-RISK TABLE ---- */}
              {tab === "risk" && (
                <motion.div
                  key="risk"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="terminal-scroll overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[760px]">
                      <thead>
                        <tr className="border-b border-slate-800">
                          {[
                            "package",
                            "last release",
                            "days stale",
                            "risk signal",
                            "usage (AST-pinned)",
                          ].map((h) => (
                            <th
                              key={h}
                              className="py-2.5 pr-4 font-mono text-[10px] uppercase tracking-widest text-slate-600 font-medium"
                            >
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {AT_RISK.map((row) => (
                          <tr
                            key={row.pkg}
                            className="border-b border-slate-800/60 hover:bg-slate-900/40 transition-colors"
                          >
                            <td className="py-3 pr-4 font-mono text-[13px] text-rose-300 whitespace-nowrap">
                              {row.pkg}
                            </td>
                            <td className="py-3 pr-4 font-mono text-[12px] text-slate-500 whitespace-nowrap">
                              {row.lastRelease}
                            </td>
                            <td className="py-3 pr-4 font-mono text-[12px] whitespace-nowrap">
                              <span
                                className={
                                  row.staleHot
                                    ? "text-rose-400 font-semibold"
                                    : "text-amber-300"
                                }
                              >
                                {row.stale}
                              </span>
                              {row.staleHot && (
                                <span className="ml-2 text-[10px] text-rose-400/80">
                                  ⚠ 9.7 years
                                </span>
                              )}
                            </td>
                            <td className="py-3 pr-4 text-[12.5px] text-slate-400">
                              {row.risk}
                            </td>
                            <td className="py-3 pr-2 text-[12.5px] text-slate-500 font-mono text-[12px]">
                              {row.usage}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="mt-3 text-[11px] text-slate-600 font-mono">
                    + 3 more lower-severity entries in the full capsule ·
                    every row traced to a PyPI JSON API response
                  </p>
                </motion.div>
              )}

              {/* ---- CLUSTERS ---- */}
              {tab === "clusters" && (
                <motion.div
                  key="clusters"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="grid sm:grid-cols-2 gap-3"
                >
                  {CLUSTERS.map((cluster) => (
                    <div
                      key={cluster.name}
                      className="rounded-lg border border-slate-800 bg-slate-950/60 p-4 hover:border-slate-700 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-2.5">
                        <h4 className="text-[13.5px] font-semibold text-slate-200">
                          {cluster.name}
                        </h4>
                        <Layers className="w-3.5 h-3.5 text-slate-600" />
                      </div>
                      <div className="flex flex-wrap gap-1.5 mb-2.5">
                        {cluster.packages.map((p) => (
                          <span
                            key={p}
                            className="px-2 py-0.5 rounded bg-slate-900/80 border border-slate-800 font-mono text-[10.5px] text-sky-300/90"
                          >
                            {p}
                          </span>
                        ))}
                      </div>
                      <p className="text-[12px] text-slate-500">
                        {cluster.purpose}
                      </p>
                    </div>
                  ))}
                </motion.div>
              )}

              {/* ---- MIGRATION ---- */}
              {tab === "migration" && (
                <motion.div
                  key="migration"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-2.5"
                >
                  {MIGRATIONS.map((m, i) => (
                    <div
                      key={m.from}
                      className="flex flex-wrap items-center gap-x-3 gap-y-1.5 rounded-lg border border-slate-800 bg-slate-950/60 px-4 py-3 hover:border-violet-500/30 transition-colors"
                    >
                      <span className="font-mono text-[10px] text-slate-700 w-5 shrink-0">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-mono text-[13px] text-rose-300">
                        {m.from}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                      <span className="font-mono text-[13px] text-emerald-300">
                        {m.to}
                      </span>
                      <span className="text-[11.5px] text-slate-600 font-mono">
                        {m.alt}
                      </span>
                      <span className="ml-auto inline-flex items-center gap-1.5 text-[11px] text-slate-500 basis-full sm:basis-auto">
                        <BrainCircuit className="w-3 h-3 text-violet-400" />
                        {m.note}
                      </span>
                    </div>
                  ))}
                  <p className="pt-2 text-[11px] text-slate-600 font-mono flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-violet-400" />
                    proposals are AI-generated and labeled as such — none ship
                    as fact until sandbox pytest passes
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 px-4 sm:px-5 py-3 border-t border-slate-800/80 bg-slate-950/60 font-mono text-[10px] text-slate-600">
            <span>
              format: <span className="text-slate-400">markdown</span>
            </span>
            <span className="hidden sm:inline">
              checks: <span className="text-emerald-500/90">re-runnable</span>
            </span>
            <span className="ml-auto flex items-center gap-1.5">
              <BadgeCheck className="w-3 h-3 text-emerald-500" />
              guardrail: no unverified claim reaches the capsule
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
