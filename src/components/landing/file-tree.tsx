"use client";

import { motion } from "framer-motion";
import {
  FileCog,
  FileSearch,
  FlaskConical,
  FolderGit2,
  Workflow,
} from "lucide-react";

interface TreeFile {
  name: string;
  role: string;
  detail: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  glowColor: string;
  meta: string;
}

const FILES: TreeFile[] = [
  {
    name: "SKILL.md",
    role: "Open-Standard Rulebook",
    detail: "Strict guardrails — separates AI proposals from verified facts",
    icon: FileCog,
    color: "text-violet-400",
    glowColor: "group-hover:border-violet-500/50",
    meta: "rules",
  },
  {
    name: "repo_scanner.py",
    role: "Universal Scout & AST Parser",
    detail: "Manifests · PyPI queries · import-site mapping",
    icon: FileSearch,
    color: "text-sky-400",
    glowColor: "group-hover:border-sky-500/50",
    meta: "scanner",
  },
  {
    name: "test_runner.py",
    role: "Isolated Sandbox Execution",
    detail: "Temp clones · patch application · real pytest runs",
    icon: FlaskConical,
    color: "text-emerald-400",
    glowColor: "group-hover:border-emerald-500/50",
    meta: "sandbox",
  },
  {
    name: "agent_orchestrator.py",
    role: "The Commander Loop",
    detail: "Scan → patch → verify → compose the Exit Capsule",
    icon: Workflow,
    color: "text-amber-400",
    glowColor: "group-hover:border-amber-500/50",
    meta: "loop",
  },
];

export function FileTree() {
  return (
    <div className="glass-panel rounded-xl p-4 sm:p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <FolderGit2 className="w-4 h-4 text-emerald-400" />
          <span className="font-mono text-xs text-slate-300">
            dependency-exit-capsule/
          </span>
        </div>
        <span className="font-mono text-[10px] text-slate-600 tracking-wider uppercase">
          4 core modules
        </span>
      </div>

      {/* Tree */}
      <div role="list" aria-label="Skill repository file tree">
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
              className={`group relative flex items-start gap-3 py-2.5 px-2.5 -mx-1.5 rounded-lg border border-transparent transition-all duration-300 hover:bg-slate-800/40 ${file.glowColor}`}
            >
              {/* Tree branch lines */}
              <span
                className="absolute left-[9px] top-0 bottom-0 w-px bg-slate-800"
                style={{
                  top: idx === 0 ? "1.4rem" : 0,
                  bottom: isLast ? "calc(100% - 1.4rem)" : 0,
                }}
              />
              <span className="font-mono text-slate-700 select-none shrink-0 pt-0.5">
                {isLast ? "└──" : "├──"}
              </span>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <Icon className={`w-4 h-4 shrink-0 ${file.color}`} />
                  <span
                    className={`font-mono text-[13px] ${file.color} transition-colors`}
                  >
                    {file.name}
                  </span>
                  <span className="ml-auto font-mono text-[9px] uppercase tracking-widest text-slate-600 border border-slate-800 rounded px-1.5 py-0.5">
                    {file.meta}
                  </span>
                </div>
                <p className="mt-1 text-[11.5px] text-slate-500 leading-snug pl-6 group-hover:text-slate-400 transition-colors">
                  <span className="text-slate-400">{file.role}</span>
                  <span className="text-slate-700"> — {file.detail}</span>
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Footer note */}
      <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center gap-2">
        <span className="live-dot w-1.5 h-1.5 rounded-full bg-emerald-500" />
        <span className="font-mono text-[10px] text-slate-600">
          zero runtime deps · Python 3.12 / 3.13
        </span>
      </div>
    </div>
  );
}
