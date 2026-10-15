"use client";

import { motion } from "framer-motion";
import {
  BrainCircuit,
  FileSearch,
  FileText,
  FlaskConical,
  FolderGit2,
  Workflow,
} from "lucide-react";

interface TreeFile {
  name: string;
  role: string;
  detail: string;
  icon: React.ComponentType<{ className?: string }>;
  tone: string;
  meta: string;
}

const TONES: Record<string, string> = {
  amber: "#d3a05c",
  steel: "#93a6bd",
  sage: "#93ab8d",
  mauve: "#ad90a5",
};

const FILES: TreeFile[] = [
  {
    name: "run_capsule.py",
    role: "Orchestrator",
    detail: "clone → scan → test → report",
    icon: Workflow,
    tone: "amber",
    meta: "orchestrator",
  },
  {
    name: "repo_scanner.py",
    role: "Repo Scout",
    detail: "parse reqs · PyPI API · AST imports · risk scoring",
    icon: FileSearch,
    tone: "steel",
    meta: "scanner",
  },
  {
    name: "test_runner.py",
    role: "Sandbox Execution",
    detail: "install deps · pytest -v · swap mode · capture IO",
    icon: FlaskConical,
    tone: "sage",
    meta: "sandbox",
  },
  {
    name: "AI Knowledge Base",
    role: "Built-in",
    detail: "20+ packages · effort/steps · breaking changes",
    icon: BrainCircuit,
    tone: "mauve",
    meta: "built-in",
  },
];

export function FileTree() {
  return (
    <div className="panel rounded-xl p-4 sm:p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#2b261f]">
        <div className="flex items-center gap-2">
          <FolderGit2 className="w-4 h-4 text-[#d3a05c]" />
          <span className="font-mono text-xs text-[#cfc9bf]">
            exit-capsule/
          </span>
        </div>
        <span className="font-mono text-[10px] text-[#5c554a] tracking-wider uppercase">
          4 parts · 1 output
        </span>
      </div>

      {/* Tree */}
      <div role="list" aria-label="Skill architecture file tree">
        {FILES.map((file, idx) => {
          const Icon = file.icon;
          const isLast = idx === FILES.length - 1;
          return (
            <motion.div
              key={file.name}
              initial={{ opacity: 0, x: -14 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: 0.35 + idx * 0.14,
                duration: 0.45,
                ease: "easeOut",
              }}
              role="listitem"
              className="group relative flex items-start gap-3 py-2.5 px-2.5 -mx-1.5 rounded-lg border border-transparent transition-colors duration-300 hover:bg-[#211d18]"
            >
              {/* Tree branch lines */}
              <span
                className="absolute left-[9px] top-0 bottom-0 w-px bg-[#2b261f]"
                style={{
                  top: idx === 0 ? "1.4rem" : 0,
                  bottom: isLast ? "calc(100% - 1.4rem)" : 0,
                }}
              />
              <span className="font-mono text-[#5c554a] select-none shrink-0 pt-0.5">
                {isLast ? "└──" : "├──"}
              </span>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <Icon
                    className="w-4 h-4 shrink-0"
                    style={{ color: TONES[file.tone] }}
                  />
                  <span
                    className="font-mono text-[13px] transition-colors"
                    style={{ color: TONES[file.tone] }}
                  >
                    {file.name}
                  </span>
                  <span className="ml-auto font-mono text-[9px] uppercase tracking-widest text-[#5c554a] border border-[#2b261f] rounded px-1.5 py-0.5">
                    {file.meta}
                  </span>
                </div>
                <p className="mt-1 text-[11.5px] text-[#7a7367] leading-snug pl-6 group-hover:text-[#a29a8d] transition-colors">
                  <span className="text-[#a29a8d]">{file.role}</span>
                  <span className="text-[#453f36]"> — {file.detail}</span>
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Output */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.95, duration: 0.45 }}
        className="mt-3 pt-3 border-t border-[#2b261f]"
      >
        <div className="flex items-center gap-2.5 rounded-lg border border-[#3a2f1f] bg-[#221c12] px-3 py-2.5">
          <FileText className="w-4 h-4 text-[#d3a05c] shrink-0" />
          <span className="font-mono text-[12px] text-[#d3a05c]">
            EXIT_CAPSULE.md
          </span>
          <span className="ml-auto font-mono text-[10px] text-[#7a7367] hidden sm:inline">
            rich markdown · the output
          </span>
        </div>
        <p className="mt-2.5 font-mono text-[10px] text-[#5c554a] flex items-center gap-2">
          <span className="text-[#d3a05c]">↓</span>
          every run ends in a verified report
        </p>
      </motion.div>

      {/* Footer note */}
      <div className="mt-3 pt-3 border-t border-[#2b261f] flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[#93ab8d]" />
        <span className="font-mono text-[10px] text-[#5c554a]">
          zero runtime deps · Python 3.12 / 3.13
        </span>
      </div>
    </div>
  );
}
