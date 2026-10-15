"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  BrainCircuit,
  Braces,
  Check,
  FileSearch,
  FileText,
  FlaskConical,
  GitBranch,
  Package,
  ScanSearch,
  Workflow,
} from "lucide-react";
import { SectionHeading } from "./section-heading";

const reveal = (delay: number) => ({
  initial: { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const },
});

function CardShell({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`glass-panel glow-hover hud-corners rounded-xl p-5 sm:p-6 flex flex-col ${className}`}
    >
      {children}
    </div>
  );
}

function CardHeader({
  icon: Icon,
  title,
  file,
  color,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  file: string;
  color: {
    borderCls: string;
    iconCls: string;
  };
}) {
  return (
    <div className="flex items-start justify-between gap-3 mb-5">
      <div className="flex items-center gap-3">
        <span
          className={`flex items-center justify-center w-9 h-9 rounded-lg border bg-slate-900/60 ${color.borderCls}`}
        >
          <Icon className={`w-4.5 h-4.5 ${color.iconCls}`} />
        </span>
        <div>
          <h3 className="text-[15px] font-semibold text-slate-100 tracking-tight">
            {title}
          </h3>
          <span className="font-mono text-[10.5px] text-slate-500">
            {file}
          </span>
        </div>
      </div>
    </div>
  );
}

const emerald = {
  borderCls: "border-emerald-500/30",
  iconCls: "text-emerald-400",
};
const sky = { borderCls: "border-sky-500/30", iconCls: "text-sky-400" };
const violet = { borderCls: "border-violet-500/30", iconCls: "text-violet-400" };
const amber = { borderCls: "border-amber-500/30", iconCls: "text-amber-400" };

/* ---------- Mini visualizations ---------- */

function OrchestratorViz() {
  const stages = [
    { label: "clone", note: "git the target repo", icon: GitBranch },
    { label: "scan", note: "fan out to repo_scanner", icon: ScanSearch },
    { label: "test", note: "sandbox verification", icon: FlaskConical },
    { label: "report", note: "compose markdown", icon: FileText },
  ];
  return (
    <div className="flex-1 flex flex-col justify-center gap-4 min-h-0">
      <div className="flex flex-col">
        {stages.map((stage, i) => {
          const Icon = stage.icon;
          const isLast = i === stages.length - 1;
          return (
            <motion.div key={stage.label} {...reveal(0.15 + i * 0.12)}>
              <div className="flex items-center gap-3 py-1.5">
                <span className="font-mono text-[10px] text-slate-700 w-4 shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex items-center justify-center w-6 h-6 rounded-md border border-slate-800 bg-slate-900/70 shrink-0">
                  <Icon className="w-3 h-3 text-slate-300" />
                </span>
                <span className="font-mono text-xs text-slate-300">{stage.label}</span>
                <span className="text-[11px] text-slate-600 hidden sm:inline truncate min-w-0">
                  {stage.note}
                </span>
                {isLast && (
                  <span className="ml-auto font-mono text-[9px] uppercase tracking-widest text-emerald-400 border border-emerald-500/30 bg-emerald-500/10 rounded px-1.5 py-0.5 shrink-0">
                    output
                  </span>
                )}
              </div>
              {!isLast && (
                <div className="ml-[1.15rem] h-3 w-px bg-gradient-to-b from-slate-700 to-slate-800" />
              )}
            </motion.div>
          );
        })}
      </div>
      <div className="rounded-md bg-slate-950/70 border border-slate-800 px-3 py-2 font-mono text-[10.5px] text-slate-500">
        <span className="text-emerald-400">→</span> writes{" "}
        <span className="text-emerald-300">EXIT_CAPSULE.md</span>
      </div>
    </div>
  );
}

function ScannerViz() {
  const manifests = ["requirements.txt", "pyproject.toml", "setup.py"];
  const imports = [
    "listener.py:118",
    "tts.py:556",
    "screenshot.py:51",
    "hotkeys/*:6 files",
  ];
  return (
    <div className="flex-1 flex flex-col gap-4 min-h-0">
      {/* Manifest chips */}
      <div>
        <p className="font-mono text-[10px] uppercase tracking-widest text-slate-600 mb-2">
          parse reqs
        </p>
        <div className="flex flex-wrap gap-2">
          {manifests.map((m, i) => (
            <motion.span
              key={m}
              {...reveal(0.15 + i * 0.1)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900/70 border border-slate-800 font-mono text-[11px] text-sky-300"
            >
              <Braces className="w-3 h-3 text-sky-500" />
              {m}
            </motion.span>
          ))}
        </div>
      </div>

      {/* PyPI query */}
      <div className="rounded-lg bg-slate-950/70 border border-slate-800 p-3 font-mono text-[11px] leading-relaxed">
        <div className="flex items-center gap-2 text-slate-500 mb-1.5">
          <Package className="w-3.5 h-3.5 text-emerald-500" />
          <span>GET pypi.org/pypi/webrtcvad/json</span>
        </div>
        <div className="text-slate-600 pl-5">
          {"{ "}
          <span className="text-sky-300">&quot;last_release&quot;</span>
          {": "}
          <span className="text-amber-300">&quot;2017-01-07&quot;</span>
          {", "}
          <span className="text-sky-300">&quot;days_stale&quot;</span>
          {": "}
          <span className="text-rose-400">3567</span>
          {" }"}
        </div>
      </div>

      {/* AST import sites + risk scoring */}
      <div className="grid sm:grid-cols-[1.4fr_1fr] gap-3">
        <div className="min-w-0">
          <p className="font-mono text-[10px] uppercase tracking-widest text-slate-600 mb-2">
            AST import sites
          </p>
          <div className="flex flex-wrap gap-2">
            {imports.map((imp, i) => (
              <motion.span
                key={imp}
                {...reveal(0.3 + i * 0.1)}
                className="px-2.5 py-1 rounded-md bg-violet-500/[0.08] border border-violet-500/25 font-mono text-[11px] text-violet-300"
              >
                {imp}
              </motion.span>
            ))}
          </div>
        </div>
        <div className="rounded-lg border border-slate-800 bg-slate-950/70 px-3 py-2.5">
          <p className="font-mono text-[10px] uppercase tracking-widest text-slate-600">
            risk scoring
          </p>
          <p className="mt-1 font-mono text-[11.5px] text-slate-300">
            <span className="text-rose-400">12</span> high ·{" "}
            <span className="text-amber-300">8</span> med ·{" "}
            <span className="text-emerald-400">25</span> ok
          </p>
        </div>
      </div>
    </div>
  );
}

function TestRunnerViz() {
  const tests = [
    { name: "test_imports.py", status: "PASSED", ms: "0.42s" },
    { name: "test_patch_apply.py", status: "PASSED", ms: "1.10s" },
    { name: "test_regression.py", status: "PASSED", ms: "0.87s" },
  ];
  const features = ["install deps", "swap mode", "capture IO"];
  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div className="rounded-lg bg-slate-950/70 border border-slate-800 overflow-hidden">
        <div className="flex items-center justify-between px-3 py-2 border-b border-slate-800/80 bg-slate-900/40">
          <span className="font-mono text-[10px] text-slate-500 flex items-center gap-1.5">
            <GitBranch className="w-3 h-3 text-amber-400" />
            sbx://tmp/exit-capsule-sbx
          </span>
          <span className="font-mono text-[10px] text-emerald-400">
            pytest -v
          </span>
        </div>
        <div className="p-3 space-y-1.5 font-mono text-[11px]">
          {tests.map((t, i) => (
            <motion.div
              key={t.name}
              {...reveal(0.2 + i * 0.12)}
              className="flex items-center gap-2"
            >
              <Check className="w-3 h-3 text-emerald-400 shrink-0" />
              <span className="text-slate-400 truncate min-w-0">{t.name}</span>
              <span className="text-emerald-400 ml-auto shrink-0">
                {t.status}
              </span>
              <span className="text-slate-600 shrink-0">{t.ms}</span>
            </motion.div>
          ))}
          <div className="pt-1.5 mt-1.5 border-t border-slate-800/80 text-[10.5px] text-slate-500">
            <span className="text-emerald-400">3 passed</span> in 2.39s ·
            zero side-effects on host
          </div>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {features.map((f) => (
          <span
            key={f}
            className="px-2.5 py-1 rounded-md bg-emerald-500/[0.07] border border-emerald-500/25 font-mono text-[10.5px] text-emerald-300"
          >
            {f}
          </span>
        ))}
      </div>
    </div>
  );
}

function KnowledgeViz() {
  const entries = [
    {
      from: "webrtcvad",
      to: "silero-vad",
      effort: "medium",
      steps: "4 steps",
      breaking: "low",
    },
    {
      from: "pygame",
      to: "pygame-ce",
      effort: "trivial",
      steps: "1 step",
      breaking: "none",
    },
  ];
  return (
    <div className="flex-1 flex flex-col gap-2.5 justify-center">
      {entries.map((e, i) => (
        <motion.div
          key={e.from}
          {...reveal(0.15 + i * 0.12)}
          className="rounded-lg border border-violet-500/25 bg-violet-500/[0.06] p-3"
        >
          <div className="flex items-center gap-2 font-mono text-[12px]">
            <span className="text-rose-300">{e.from}</span>
            <ArrowRight className="w-3 h-3 text-slate-600" />
            <span className="text-emerald-300">{e.to}</span>
          </div>
          <p className="mt-1.5 font-mono text-[10px] text-slate-500">
            effort: <span className="text-violet-300">{e.effort}</span> ·{" "}
            {e.steps} · breaking:{" "}
            <span className="text-amber-300">{e.breaking}</span>
          </p>
        </motion.div>
      ))}
      <p className="font-mono text-[10.5px] text-slate-600 pt-1">
        + 18 more curated package entries, bundled with the skill
      </p>
    </div>
  );
}

/* ---------- Section ---------- */

export function BentoArchitecture() {
  return (
    <section id="architecture" className="relative py-20 sm:py-28">
      <div className="absolute inset-0 dot-backdrop opacity-25 pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          index="01"
          kicker="architecture"
          accent="blue"
          title="Clone, scan, test, report."
          description="run_capsule.py orchestrates the whole pipeline — the repo scanner, the sandbox test runner, and a built-in AI knowledge base converge into one rich markdown report: EXIT_CAPSULE.md."
        />

        <div className="grid lg:grid-cols-6 gap-4 sm:gap-5">
          {/* Orchestrator — tall left */}
          <motion.div
            {...reveal(0)}
            className="lg:col-span-2 lg:row-span-2 flex min-w-0"
          >
            <CardShell className="w-full">
              <CardHeader
                icon={Workflow}
                title="The Orchestrator"
                file="run_capsule.py"
                color={amber}
              />
              <p className="text-[13px] text-slate-400 leading-relaxed mb-4">
                One entry point wires the whole pipeline: it clones the target
                repository, fans work out to the scanner and test runner,
                consults the knowledge base, and renders the final report.
              </p>
              <OrchestratorViz />
            </CardShell>
          </motion.div>

          {/* Repo Scanner — wide */}
          <motion.div {...reveal(0.08)} className="lg:col-span-4 flex min-w-0">
            <CardShell className="w-full">
              <CardHeader
                icon={FileSearch}
                title="Repo Scanner"
                file="repo_scanner.py"
                color={sky}
              />
              <p className="text-[13px] text-slate-400 leading-relaxed mb-4">
                Parses any Python manifest, queries the live PyPI JSON API for
                ground-truth metadata, maps every AST import site across all{" "}
                <span className="font-mono text-[12px] text-sky-300">.py</span>{" "}
                files, and scores each dependency for staleness and risk.
              </p>
              <ScannerViz />
            </CardShell>
          </motion.div>

          {/* Test Runner */}
          <motion.div {...reveal(0.12)} className="lg:col-span-2 flex min-w-0">
            <CardShell className="w-full">
              <CardHeader
                icon={FlaskConical}
                title="Sandbox Test Runner"
                file="test_runner.py"
                color={emerald}
              />
              <p className="text-[13px] text-slate-400 leading-relaxed mb-4">
                Installs dependencies in an isolated sandbox, swaps versions,
                captures IO, and executes real pytest — proof before the
                capsule ships.
              </p>
              <TestRunnerViz />
            </CardShell>
          </motion.div>

          {/* AI Knowledge Base */}
          <motion.div {...reveal(0.16)} className="lg:col-span-2 flex min-w-0">
            <CardShell className="w-full">
              <CardHeader
                icon={BrainCircuit}
                title="AI Knowledge Base"
                file="built-in · bundled"
                color={violet}
              />
              <p className="text-[13px] text-slate-400 leading-relaxed mb-4">
                Curated migration intel for 20+ packages — effort estimates,
                step-by-step paths, and known breaking changes — so proposals
                come from knowledge, not guesses.
              </p>
              <KnowledgeViz />
            </CardShell>
          </motion.div>

          {/* Output strip */}
          <motion.div {...reveal(0.2)} className="lg:col-span-6 flex min-w-0">
            <div className="glass-panel glow-hover hud-corners rounded-xl w-full px-5 sm:px-6 py-4 flex flex-wrap items-center gap-x-4 gap-y-2">
              <FileText className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="font-mono text-[13px] text-emerald-300">
                EXIT_CAPSULE.md
              </span>
              <span className="text-[12px] text-slate-500 min-w-0">
                — the rich markdown output: risk indicators pinned to import
                sites, labeled AI proposals, and verified pytest results
              </span>
              <span className="ml-auto font-mono text-[9px] uppercase tracking-widest text-slate-600 border border-slate-800 rounded px-1.5 py-0.5 shrink-0">
                every run
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
