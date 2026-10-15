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
  { action: "Cloning target repo", detail: "isair/jarvis", duration: 700 },
  {
    action: "Parsing manifests",
    detail: "requirements.txt · pyproject.toml",
    duration: 750,
  },
  {
    action: "PyPI API + AST import map",
    detail: "148 files · 45 packages",
    duration: 950,
  },
  { action: "Risk scoring", detail: "12 flagged at-risk", duration: 650 },
  {
    action: "Sandbox: install deps + pytest -v",
    detail: "baseline skipped — needs display/audio hw",
    duration: 900,
    skipped: true,
  },
  {
    action: "Composing capsule",
    detail: "EXIT_CAPSULE.md",
    duration: 650,
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
    <div className="panel-solid rounded-xl overflow-hidden">
      {/* Title bar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#2b261f] bg-[#161310]">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#a8625a]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#c99a4e]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#7e9a78]" />
          </div>
          <div className="flex items-center gap-2 text-[11px] font-mono text-[#7a7367]">
            <Terminal className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">run_capsule</span>
            <span className="text-[#453f36]">·</span>
            <span>zsh</span>
          </div>
        </div>
        <span
          className={`font-mono text-[10px] tracking-wider uppercase ${
            finished ? "text-[#93ab8d]" : "text-[#d3a05c]"
          }`}
        >
          {finished ? "capsule ready" : `run ${progress}%`}
        </span>
      </div>

      {/* Body */}
      <div
        ref={bodyRef}
        className="terminal-scroll relative h-[340px] sm:h-[380px] overflow-y-auto px-4 sm:px-5 py-4 font-mono text-[12px] sm:text-[13px] leading-relaxed bg-[#12100d]"
        aria-label="Animated terminal demo of the exit-capsule agent"
      >
        {/* Prompt + typed command */}
        <div className="flex items-start gap-2 mb-4">
          <span className="text-[#d3a05c] shrink-0 select-none">➜</span>
          <span className="text-[#93a6bd] shrink-0 select-none hidden sm:inline">
            ~/jarvis
          </span>
          <span className="text-[#5c554a] shrink-0 select-none hidden sm:inline">
            $
          </span>
          <span className="text-[#e9e4da] break-all">
            {SKILL_INVOCATION.slice(0, typed)}
            {typed < SKILL_INVOCATION.length || (!finished && stepIdx === 0) ? (
              <span className="cursor-blink text-[#d3a05c]">▋</span>
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
                      <span className="inline-block w-3 h-3 border-[1.5px] border-[#93a6bd]/70 border-t-transparent rounded-full animate-spin" />
                    ) : state === "skipped" ? (
                      <Minus className="w-3.5 h-3.5 text-[#c99a4e]" />
                    ) : (
                      <Check className="w-3.5 h-3.5 text-[#93ab8d]" />
                    )}
                  </span>
                  <span
                    className={
                      state === "pending" ? "text-[#7a7367]" : "text-[#cfc9bf]"
                    }
                  >
                    {step.action}
                    <span className="text-[#5c554a]"> … </span>
                    {state === "running" ? (
                      <span className="text-[#93a6bd]/80">streaming</span>
                    ) : (
                      <span
                        className={
                          state === "skipped"
                            ? "text-[#c99a4e]"
                            : "text-[#93ab8d]"
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
              <span className="text-[#93ab8d]">✓</span>
              <span className="text-[#e9e4da]">
                Done — capsule written for{" "}
                <span className="text-[#93a6bd]">isair/jarvis</span>
              </span>
            </div>
            <div className="mt-1.5 pl-6 text-[#7a7367]">
              <span className="text-[#93ab8d]">45</span> dependencies scanned
              · <span className="text-[#c9786b]">12</span> at-risk ·{" "}
              <span className="text-[#ad90a5]">0</span> unverified claims
            </div>
          </div>
        )}

        {/* Idle cursor at bottom */}
        {finished && (
          <div className="flex items-center gap-2 mt-4">
            <span className="text-[#d3a05c] select-none">➜</span>
            <span className="cursor-blink text-[#d3a05c]">▋</span>
          </div>
        )}
      </div>

      {/* Status footer */}
      <div className="flex items-center justify-between px-4 py-2 border-t border-[#2b261f] bg-[#161310] text-[10px] font-mono text-[#5c554a]">
        <span>
          skill: <span className="text-[#a29a8d]">exit-capsule</span>
        </span>
        <span className="hidden sm:inline">
          guardrails: <span className="text-[#93ab8d]">enforced</span>
        </span>
      </div>
    </div>
  );
}
