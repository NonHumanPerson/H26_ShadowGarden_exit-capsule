"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Braces,
  BrainCircuit,
  Check,
  FileSearch,
  FileText,
  FlaskConical,
  GitBranch,
  Package,
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
      className={`panel card-hover rounded-xl p-5 sm:p-6 flex flex-col ${className}`}
    >
      {children}
    </div>
  );
}

function CardHeader({
  icon: Icon,
  title,
  file,
  tone,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  file: string;
  tone: string;
}) {
  return (
    <div className="flex items-start justify-between gap-3 mb-5">
      <div className="flex items-center gap-3">
        <span
          className="flex items-center justify-center w-9 h-9 rounded-lg border bg-[#1d1a15]"
          style={{ borderColor: `${tone}33` }}
        >
          <Icon className="w-4 h-4" style={{ color: tone }} />
        </span>
        <div>
          <h3 className="text-[15px] font-semibold text-[#e9e4da] tracking-tight">
            {title}
          </h3>
          <span className="font-mono text-[10.5px] text-[#7a7367]">
            {file}
          </span>
        </div>
      </div>
    </div>
  );
}

const AMBER = "#d3a05c";
const STEEL = "#93a6bd";
const SAGE = "#93ab8d";
const MAUVE = "#ad90a5";

/* ---------- Mini visualizations ---------- */

function OrchestratorViz() {
  const stages = [
    { label: "clone", note: "git target repo" },
    { label: "scan", note: "fan out to scanner" },
    { label: "test", note: "sandbox verification" },
    { label: "report", note: "compose markdown" },
  ];
  return (
    <div className="flex-1 flex flex-col justify-center gap-4 min-h-0">
      <div className="flex flex-col">
        {stages.map((stage, i) => (
          <motion.div key={stage.label} {...reveal(0.15 + i * 0.12)}>
            <div className="flex items-center gap-3 py-1.5">
              <span className="font-mono text-[10px] text-[#5c554a] w-4">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-mono text-xs text-[#cfc9bf] w-16">
                {stage.label}
              </span>
              <span className="text-[11px] text-[#7a7367]">{stage.note}</span>
            </div>
            {i < stages.length - 1 && (
              <div className="ml-[1.15rem] h-3 w-px bg-[#2b261f]" />
            )}
          </motion.div>
        ))}
      </div>
      <div className="rounded-md bg-[#12100d] border border-[#3a2f1f] px-3 py-2 font-mono text-[10.5px] text-[#7a7367]">
        <span className="text-[#d3a05c]">→</span> writes{" "}
        <span className="text-[#d3a05c]">EXIT_CAPSULE.md</span>
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
        <p className="font-mono text-[10px] uppercase tracking-widest text-[#5c554a] mb-2">
          parse reqs
        </p>
        <div className="flex flex-wrap gap-2">
          {manifests.map((m, i) => (
            <motion.span
              key={m}
              {...reveal(0.15 + i * 0.1)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#12100d] border border-[#2b261f] font-mono text-[11px] text-[#93a6bd]"
            >
              <Braces className="w-3 h-3" />
              {m}
            </motion.span>
          ))}
        </div>
      </div>

      {/* PyPI query */}
      <div className="rounded-lg bg-[#12100d] border border-[#2b261f] p-3 font-mono text-[11px] leading-relaxed">
        <div className="flex items-center gap-2 text-[#7a7367] mb-1.5">
          <Package className="w-3.5 h-3.5 text-[#93ab8d]" />
          <span>GET pypi.org/pypi/webrtcvad/json</span>
        </div>
        <div className="text-[#5c554a] pl-5">
          {"{ "}
          <span className="text-[#93a6bd]">&quot;last_release&quot;</span>
          {": "}
          <span className="text-[#c99a4e]">&quot;2017-01-07&quot;</span>
          {", "}
          <span className="text-[#93a6bd]">&quot;days_stale&quot;</span>
          {": "}
          <span className="text-[#c9786b]">3567</span>
          {" }"}
        </div>
      </div>

      {/* AST import sites + risk */}
      <div className="grid sm:grid-cols-[1.4fr_1fr] gap-3">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-[#5c554a] mb-2">
            AST imports
          </p>
          <div className="flex flex-wrap gap-2">
            {imports.map((imp, i) => (
              <motion.span
                key={imp}
                {...reveal(0.3 + i * 0.1)}
                className="px-2.5 py-1 rounded-md bg-[#221a24] border border-[#2b2629] font-mono text-[11px] text-[#ad90a5]"
              >
                {imp}
              </motion.span>
            ))}
          </div>
        </div>
        <div className="rounded-lg border border-[#2b261f] bg-[#12100d] px-3 py-2.5">
          <p className="font-mono text-[10px] uppercase tracking-widest text-[#5c554a]">
            risk scoring
          </p>
          <p className="mt-1 font-mono text-[11.5px] text-[#cfc9bf]">
            <span className="text-[#c9786b]">12</span> high ·{" "}
            <span className="text-[#c99a4e]">8</span> med ·{" "}
            <span className="text-[#93ab8d]">25</span> ok
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
      <div className="rounded-lg bg-[#12100d] border border-[#2b261f] overflow-hidden">
        <div className="flex items-center justify-between px-3 py-2 border-b border-[#2b261f] bg-[#161310]">
          <span className="font-mono text-[10px] text-[#7a7367] flex items-center gap-1.5">
            <GitBranch className="w-3 h-3 text-[#c99a4e]" />
            sbx://tmp/capsule-sbx
          </span>
          <span className="font-mono text-[10px] text-[#93ab8d]">
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
              <Check className="w-3 h-3 text-[#93ab8d] shrink-0" />
              <span className="text-[#a29a8d] truncate">{t.name}</span>
              <span className="text-[#93ab8d] ml-auto shrink-0">
                {t.status}
              </span>
              <span className="text-[#5c554a] shrink-0">{t.ms}</span>
            </motion.div>
          ))}
          <div className="pt-1.5 mt-1.5 border-t border-[#2b261f] text-[10.5px] text-[#7a7367]">
            <span className="text-[#93ab8d]">3 passed</span> in 2.39s ·
            zero side-effects on host
          </div>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {features.map((f) => (
          <span
            key={f}
            className="px-2.5 py-1 rounded-md bg-[#12100d] border border-[#2b261f] font-mono text-[10.5px] text-[#93ab8d]"
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
          className="rounded-lg border border-[#2b2629] bg-[#221a24] p-3"
        >
          <div className="flex items-center gap-2 font-mono text-[12px]">
            <span className="text-[#c9786b]">{e.from}</span>
            <ArrowRight className="w-3 h-3 text-[#5c554a]" />
            <span className="text-[#93ab8d]">{e.to}</span>
          </div>
          <p className="mt-1.5 font-mono text-[10px] text-[#7a7367]">
            effort: <span className="text-[#ad90a5]">{e.effort}</span> ·{" "}
            {e.steps} · breaking:{" "}
            <span className="text-[#93ab8d]">{e.breaking}</span>
          </p>
        </motion.div>
      ))}
      <p className="font-mono text-[10.5px] text-[#5c554a] pt-1">
        + 20 more curated package entries, bundled with the skill
      </p>
    </div>
  );
}

/* ---------- Section ---------- */

export function BentoArchitecture() {
  return (
    <section id="architecture" className="relative py-20 sm:py-28">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          index="01"
          kicker="architecture"
          title="Clone, scan, test, report."
          description="run_capsule.py orchestrates three engines — the repo scanner, the sandbox test runner, and a built-in AI knowledge base — then composes everything into one rich markdown report: EXIT_CAPSULE.md."
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
                tone={AMBER}
              />
              <p className="text-[13px] text-[#a29a8d] leading-relaxed mb-4">
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
                tone={STEEL}
              />
              <p className="text-[13px] text-[#a29a8d] leading-relaxed mb-4">
                Parses any Python manifest, queries the live PyPI JSON API for
                ground-truth metadata, maps every AST import site across all{" "}
                <span className="font-mono text-[12px] text-[#93a6bd]">.py</span>{" "}
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
                tone={SAGE}
              />
              <p className="text-[13px] text-[#a29a8d] leading-relaxed mb-4">
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
                tone={MAUVE}
              />
              <p className="text-[13px] text-[#a29a8d] leading-relaxed mb-4">
                Curated migration intel for 20+ packages — effort estimates,
                step-by-step paths, and known breaking changes — so proposals
                come from knowledge, not guesses.
              </p>
              <KnowledgeViz />
            </CardShell>
          </motion.div>

          {/* Output strip */}
          <motion.div {...reveal(0.2)} className="lg:col-span-6 flex min-w-0">
            <div className="panel card-hover rounded-xl w-full px-5 sm:px-6 py-4 flex flex-wrap items-center gap-x-4 gap-y-2">
              <FileText className="w-4 h-4 text-[#d3a05c] shrink-0" />
              <span className="font-mono text-[13px] text-[#d3a05c]">
                EXIT_CAPSULE.md
              </span>
              <span className="text-[12px] text-[#7a7367]">
                — the rich markdown output: risk indicators pinned to import
                sites, labeled AI proposals, and verified pytest results
              </span>
              <span className="ml-auto font-mono text-[9px] uppercase tracking-widest text-[#5c554a] border border-[#2b261f] rounded px-1.5 py-0.5 shrink-0">
                every run
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
