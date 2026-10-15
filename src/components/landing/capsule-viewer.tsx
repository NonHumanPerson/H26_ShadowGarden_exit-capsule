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

const TABS: {
  key: TabKey;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
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
  tone: "amber" | "risk" | "mauve" | "sage";
}) {
  const tones = {
    amber: {
      value: "text-[#d3a05c]",
      cls: "border-[#3a2f1f] bg-[#221c12]",
    },
    risk: {
      value: "text-[#c9786b]",
      cls: "border-[#3a2622] bg-[#211614]",
    },
    mauve: {
      value: "text-[#ad90a5]",
      cls: "border-[#2b2629] bg-[#221a24]",
    },
    sage: {
      value: "text-[#93ab8d]",
      cls: "border-[#263026] bg-[#161c16]",
    },
  };
  const t = tones[tone];
  return (
    <div className={`rounded-lg border px-4 py-3 ${t.cls}`}>
      <p className={`font-mono text-xl font-semibold ${t.value}`}>{value}</p>
      <p className="mt-0.5 text-[11px] text-[#7a7367]">{label}</p>
    </div>
  );
}

export function CapsuleViewer() {
  const [tab, setTab] = useState<TabKey>("risk");

  return (
    <section id="capsule" className="relative py-20 sm:py-28">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          index="03"
          kicker="the deliverable"
          title="The Exit Capsule"
          description="Every run ends with a verifiable markdown artifact — EXIT_CAPSULE.md. Risk indicators are pinned to import sites, AI proposals are clearly labeled, and verification results are execution-backed. This is real output from a live run against isair/jarvis."
        />

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap gap-2.5 mb-6"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#3a2622] bg-[#211614] text-[11px] font-mono text-[#c9786b]">
            <AlertTriangle className="w-3 h-3" /> risk indicators — PyPI
            ground truth
          </span>
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#2b2629] bg-[#221a24] text-[11px] font-mono text-[#ad90a5]">
            <Lightbulb className="w-3 h-3" /> AI proposals — clearly labeled
            suggestions
          </span>
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#263026] bg-[#161c16] text-[11px] font-mono text-[#93ab8d]">
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
          className="panel rounded-xl overflow-hidden"
        >
          {/* File header */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 px-4 sm:px-5 py-3.5 border-b border-[#2b261f] bg-[#161310]">
            <div className="flex items-center gap-2.5">
              <FileCode2 className="w-4 h-4 text-[#d3a05c]" />
              <span className="font-mono text-[13px] text-[#e9e4da]">
                EXIT_CAPSULE.md
              </span>
            </div>
            <span className="font-mono text-[10px] text-[#5c554a] hidden sm:inline">
              repo: isair/jarvis · generated by exit-capsule
            </span>
            <span className="ml-auto inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-[#93ab8d] border border-[#263026] bg-[#161c16] rounded-full px-2.5 py-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#93ab8d]" />
              verified artifact
            </span>
          </div>

          {/* Tabs */}
          <div
            className="flex gap-1 px-3 sm:px-4 pt-3 border-b border-[#2b261f] overflow-x-auto terminal-scroll"
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
                    ? "border-[#d3a05c] text-[#d3a05c] bg-[#1f1a12]"
                    : "border-transparent text-[#7a7367] hover:text-[#a29a8d]"
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
                    <StatChip
                      value="45"
                      label="dependencies scanned"
                      tone="sage"
                    />
                    <StatChip value="12" label="flagged at-risk" tone="risk" />
                    <StatChip value="148" label=".py files mapped" tone="mauve" />
                    <StatChip
                      value="5"
                      label="architecture clusters"
                      tone="amber"
                    />
                  </div>

                  <div className="rounded-lg border border-[#2b261f] bg-[#12100d] p-4">
                    <p className="font-mono text-[10px] uppercase tracking-widest text-[#5c554a] mb-2">
                      capsule summary line
                    </p>
                    <p className="text-sm text-[#cfc9bf] leading-relaxed">
                      Massive{" "}
                      <span className="text-[#93a6bd] font-medium">PyQt6</span>{" "}
                      desktop app + voice/ML stack. Critical staleness
                      concentrated in the audio path —{" "}
                      <span className="text-[#c9786b] font-mono text-[13px]">
                        webrtcvad
                      </span>{" "}
                      has not shipped a release since{" "}
                      <span className="font-mono text-[13px]">2017</span>,
                      while the rest of the stack tracks modern releases.
                    </p>
                  </div>

                  <div className="rounded-lg border border-[#3a3222] bg-[#1c1912] p-4">
                    <div className="flex items-center gap-2 mb-1.5">
                      <FlaskConical className="w-3.5 h-3.5 text-[#c99a4e]" />
                      <span className="font-mono text-[10px] uppercase tracking-widest text-[#c99a4e]">
                        verification status
                      </span>
                    </div>
                    <p className="text-[13px] text-[#a29a8d] leading-relaxed">
                      Baseline{" "}
                      <span className="font-mono text-[12px] text-[#cfc9bf]">
                        pytest
                      </span>{" "}
                      skipped — heavy desktop deps (PyQt6, audio, CUDA)
                      require display/audio hardware. Tests need micromamba
                      env with{" "}
                      <span className="font-mono text-[12px]">.mamba_env</span>{" "}
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
                        <tr className="border-b border-[#2b261f]">
                          {[
                            "package",
                            "last release",
                            "days stale",
                            "risk signal",
                            "usage (AST-pinned)",
                          ].map((h) => (
                            <th
                              key={h}
                              className="py-2.5 pr-4 font-mono text-[10px] uppercase tracking-widest text-[#5c554a] font-medium"
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
                            className="border-b border-[#221f1a] hover:bg-[#1d1a15] transition-colors"
                          >
                            <td className="py-3 pr-4 font-mono text-[13px] text-[#c9786b] whitespace-nowrap">
                              {row.pkg}
                            </td>
                            <td className="py-3 pr-4 font-mono text-[12px] text-[#7a7367] whitespace-nowrap">
                              {row.lastRelease}
                            </td>
                            <td className="py-3 pr-4 font-mono text-[12px] whitespace-nowrap">
                              <span
                                className={
                                  row.staleHot
                                    ? "text-[#c9786b] font-semibold"
                                    : "text-[#c99a4e]"
                                }
                              >
                                {row.stale}
                              </span>
                              {row.staleHot && (
                                <span className="ml-2 text-[10px] text-[#c9786b]/80">
                                  ⚠ 9.7 years
                                </span>
                              )}
                            </td>
                            <td className="py-3 pr-4 text-[12.5px] text-[#a29a8d]">
                              {row.risk}
                            </td>
                            <td className="py-3 pr-2 font-mono text-[12px] text-[#7a7367]">
                              {row.usage}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="mt-3 text-[11px] text-[#5c554a] font-mono">
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
                      className="rounded-lg border border-[#2b261f] bg-[#12100d] p-4 hover:border-[#3a332a] transition-colors"
                    >
                      <div className="flex items-center justify-between mb-2.5">
                        <h4 className="text-[13.5px] font-semibold text-[#e9e4da]">
                          {cluster.name}
                        </h4>
                        <Layers className="w-3.5 h-3.5 text-[#5c554a]" />
                      </div>
                      <div className="flex flex-wrap gap-1.5 mb-2.5">
                        {cluster.packages.map((p) => (
                          <span
                            key={p}
                            className="px-2 py-0.5 rounded bg-[#1d1a15] border border-[#2b261f] font-mono text-[10.5px] text-[#93a6bd]"
                          >
                            {p}
                          </span>
                        ))}
                      </div>
                      <p className="text-[12px] text-[#7a7367]">
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
                      className="flex flex-wrap items-center gap-x-3 gap-y-1.5 rounded-lg border border-[#2b261f] bg-[#12100d] px-4 py-3 hover:border-[#3a332a] transition-colors"
                    >
                      <span className="font-mono text-[10px] text-[#5c554a] w-5 shrink-0">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-mono text-[13px] text-[#c9786b]">
                        {m.from}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#5c554a] shrink-0" />
                      <span className="font-mono text-[13px] text-[#93ab8d]">
                        {m.to}
                      </span>
                      <span className="text-[11.5px] text-[#5c554a] font-mono">
                        {m.alt}
                      </span>
                      <span className="ml-auto inline-flex items-center gap-1.5 text-[11px] text-[#7a7367] basis-full sm:basis-auto">
                        <BrainCircuit className="w-3 h-3 text-[#ad90a5]" />
                        {m.note}
                      </span>
                    </div>
                  ))}
                  <p className="pt-2 text-[11px] text-[#5c554a] font-mono flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-[#ad90a5]" />
                    proposals are AI-generated and labeled as such — none ship
                    as fact until sandbox pytest passes
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 px-4 sm:px-5 py-3 border-t border-[#2b261f] bg-[#161310] font-mono text-[10px] text-[#5c554a]">
            <span>
              format: <span className="text-[#a29a8d]">rich markdown</span>
            </span>
            <span className="hidden sm:inline">
              checks: <span className="text-[#93ab8d]">re-runnable</span>
            </span>
            <span className="ml-auto flex items-center gap-1.5">
              <BadgeCheck className="w-3 h-3 text-[#93ab8d]" />
              guardrail: no unverified claim reaches the capsule
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
