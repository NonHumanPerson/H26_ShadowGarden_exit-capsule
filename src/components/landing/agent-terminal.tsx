"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Check, Minus, Terminal } from "lucide-react";
import { SKILL_INVOCATION } from "./constants";

type StepState = "pending" | "running" | "done" | "skipped";

interface Step {
  action: string;
  detail: string;
  duration: number;
  skipped?: boolean;
}

const STEPS: Step[] = [
  {
    action: "Parsing manifests",
    detail: "requirements.txt · pyproject.toml",
    duration: 750,
  },
  {
    action: "Mapping AST import sites",
    detail: "148 .py files · 45 packages",
    duration: 980,
  },
  {
    action: "Querying live PyPI JSON API",
    detail: "45/45 metadata resolved",
    duration: 900,
  },
  {
    action: "Spinning isolated sandbox",
    detail: "/tmp/exit-capsule-sbx-7f3a",
    duration: 820,
  },
  {
    action: "Running pytest verification",
    detail: "baseline skipped — needs display/audio hw",
    duration: 950,
    skipped: true,
  },
  {
    action: "Composing exit capsule",
    detail: "DEPENDENCY_EXIT_CAPSULE.md",
    duration: 700,
  },
];

const TYPING_JITTER = [38, 52, 30, 64, 41];

export function AgentTerminal() {
  const [typed, setTyped] = useState(0);
  const [stepIdx, setStepIdx] = useState(0);
  const [stepStates, setStepStates] = useState<StepState[]>(
    STEPS.map(() => "pending")
  );
  const [finished, setFinished] = useState(false);
  const [cycle, setCycle] = useState(0);
  const bodyRef = useRef<HTMLDivElement>(null);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const reset = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    setTyped(0);
    setStepIdx(0);
    setStepStates(STEPS.map(() => "pending"));
    setFinished(false);
    setCycle((c) => c + 1);
  }, []);

  useEffect(() => {
    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const schedule = (fn: () => void, ms: number) => {
      const t = setTimeout(() => {
        if (!cancelled) fn();
      }, ms);
      timers.push(t);
    };

    // Phase 1 — type the invocation, char by char
    let delay = 500;
    for (let i = 1; i <= SKILL_INVOCATION.length; i++) {
      const jitter = TYPING_JITTER[i % TYPING_JITTER.length];
      const chars = i;
      schedule(() => setTyped(chars), delay);
      delay += jitter;
    }

    // Phase 2 — run each step
    delay += 420;
    STEPS.forEach((step, idx) => {
      schedule(() => {
        setStepIdx(idx + 1);
        setStepStates((prev) => {
          const next = [...prev];
          next[idx] = "running";
          return next;
        });
      }, delay);
      delay += step.duration;
      schedule(() => {
        setStepStates((prev) => {
          const next = [...prev];
          next[idx] = step.skipped ? "skipped" : "done";
          return next;
        });
      }, delay);
      delay += 240;
    });

    // Phase 3 — final line, hold, restart
    schedule(() => setFinished(true), delay + 260);
    delay += 5600;
    schedule(() => {
      setTyped(0);
      setStepIdx(0);
      setStepStates(STEPS.map(() => "pending"));
      setFinished(false);
    }, delay);
    delay += 700;
    schedule(() => setCycle((c) => c + 1), delay);

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [cycle]);

  // Auto-scroll to bottom as content grows
  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [typed, stepIdx, stepStates, finished]);

  const progress = Math.round(
    ((stepStates.filter((s) => s === "done" || s === "skipped").length) /
      STEPS.length) *
      100
  );

  return (
    <div className="glass-panel rounded-xl overflow-hidden shadow-[0_24px_80px_-24px_rgba(16,185,129,0.25)]">
      {/* Title bar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-800/80 bg-slate-950/60">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          </div>
          <div className="flex items-center gap-2 text-[11px] font-mono text-slate-500">
            <Terminal className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">agent-session</span>
            <span className="text-slate-700">·</span>
            <span className="text-emerald-500/90">zsh</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`font-mono text-[10px] tracking-wider uppercase ${
              finished ? "text-emerald-400" : "text-sky-400"
            }`}
          >
            {finished ? "capsule ready" : `run ${progress}%`}
          </span>
          <span className="live-dot w-1.5 h-1.5 rounded-full bg-emerald-500" />
        </div>
      </div>

      {/* Body */}
      <div
        ref={bodyRef}
        className="terminal-scroll relative h-[340px] sm:h-[380px] overflow-y-auto px-4 sm:px-5 py-4 font-mono text-[12px] sm:text-[13px] leading-relaxed"
        aria-label="Animated terminal demo of the Dependency Exit Capsule agent"
      >
        <div className="scanline" />
        {/* Prompt + typed command */}
        <div className="flex items-start gap-2 mb-4">
          <span className="text-violet-400 shrink-0 select-none">➜</span>
          <span className="text-sky-400 shrink-0 select-none hidden sm:inline">
            ~/ShadowGarden
          </span>
          <span className="text-slate-600 shrink-0 select-none hidden sm:inline">
            $
          </span>
          <span className="text-slate-200 break-all">
            {SKILL_INVOCATION.slice(0, typed)}
            {typed < SKILL_INVOCATION.length || (!finished && stepIdx === 0) ? (
              <span className="cursor-blink text-emerald-400">▋</span>
            ) : null}
          </span>
        </div>

        {/* Steps */}
        {stepIdx > 0 && (
          <div className="space-y-2.5">
            {STEPS.slice(0, stepIdx).map((step, idx) => {
              const state = stepStates[idx];
              return (
                <div
                  key={step.action}
                  className="flex items-start gap-2.5 animate-in fade-in slide-in-from-left-2 duration-300"
                >
                  <span className="shrink-0 w-4 flex justify-center mt-0.5">
                    {state === "running" ? (
                      <span className="inline-block w-3 h-3 border-[1.5px] border-sky-400/70 border-t-transparent rounded-full animate-spin" />
                    ) : state === "skipped" ? (
                      <Minus className="w-3.5 h-3.5 text-amber-400" />
                    ) : (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    )}
                  </span>
                  <span
                    className={
                      state === "pending"
                        ? "text-slate-500"
                        : "text-slate-300"
                    }
                  >
                    {step.action}
                    <span className="text-slate-600"> … </span>
                    {state === "running" ? (
                      <span className="text-sky-400/80">streaming</span>
                    ) : (
                      <span
                        className={
                          state === "skipped" ? "text-amber-300/90" : "text-emerald-300/90"
                        }
                      >
                        {step.detail}
                      </span>
                    )}
                  </span>
                </div>
              );
            })}
          </div>
        )}

        {/* Final line */}
        {finished && (
          <div className="mt-5 animate-in fade-in duration-500">
            <div className="flex items-center gap-2.5">
              <span className="text-emerald-400">✓</span>
              <span className="text-slate-200">
                Done — capsule written for{" "}
                <span className="text-sky-300">isair/jarvis</span>
              </span>
            </div>
            <div className="mt-1.5 pl-6 text-slate-500">
              <span className="text-emerald-400 font-semibold">45</span>{" "}
              dependencies scanned ·{" "}
              <span className="text-rose-400 font-semibold">12</span> at-risk ·{" "}
              <span className="text-violet-300">0</span> unverified claims
            </div>
          </div>
        )}

        {/* Idle cursor at bottom */}
        {finished && (
          <div className="flex items-center gap-2 mt-4">
            <span className="text-violet-400 select-none">➜</span>
            <span className="cursor-blink text-emerald-400">▋</span>
          </div>
        )}
      </div>

      {/* Status footer */}
      <div className="flex items-center justify-between px-4 py-2 border-t border-slate-800/80 bg-slate-950/60 text-[10px] font-mono text-slate-600">
        <span>
          skill: <span className="text-emerald-500/90">dependency-exit-capsule</span>
        </span>
        <span className="hidden sm:inline">
          guardrails: <span className="text-emerald-500/90">ENFORCED</span>
        </span>
      </div>
    </div>
  );
}
