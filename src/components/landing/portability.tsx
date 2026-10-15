"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Check,
  Copy,
  FolderTree,
  Globe2,
  Plug,
  Rocket,
  Terminal,
} from "lucide-react";
import { SectionHeading } from "./section-heading";
import { CLONE_CMD, SKILL_INVOCATION } from "./constants";

const HARNESSES = [
  "Claude Code",
  "Cursor",
  "Windsurf",
  "OpenCode",
  "Aider",
  "Goose",
  "Cline",
  "Continue",
  "Codex CLI",
  "Amp",
  "Z.ai",
  "Any OSS harness",
];

function CopyRow({
  cmd,
  label,
  delay,
}: {
  cmd: string;
  label: string;
  delay: number;
}) {
  const [copied, setCopied] = useState(false);
  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(cmd);
    } catch {
      /* clipboard unavailable */
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <motion.button
      initial={{ opacity: 0, x: -18 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay }}
      onClick={onCopy}
      className="group w-full text-left flex items-center gap-3 rounded-lg bg-[#12100d] border border-[#2b261f] hover:border-[#3a2f1f] transition-colors px-3.5 py-3 focus-visible:outline-2 focus-visible:outline-[#d3a05c]"
      aria-label={`Copy ${label} command`}
    >
      <span className="font-mono text-[10px] uppercase tracking-widest text-[#5c554a] w-14 shrink-0">
        {label}
      </span>
      <span className="font-mono text-[12px] sm:text-[12.5px] text-[#93ab8d] truncate min-w-0 flex-1">
        {cmd}
      </span>
      <span className="ml-auto shrink-0 text-[#5c554a] group-hover:text-[#d3a05c] transition-colors">
        {copied ? (
          <Check className="w-4 h-4 text-[#93ab8d]" />
        ) : (
          <Copy className="w-4 h-4" />
        )}
      </span>
    </motion.button>
  );
}

export function Portability() {
  return (
    <section id="portability" className="relative py-20 sm:py-28">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          index="02"
          kicker="global portability"
          title="Install once. Every agent inherits it."
          description="The Agent Skills Open Standard defines a universal discovery convention: place a skill under ~/.agents/skills/ and any compliant harness — CLI agent, IDE extension, or autonomous pipeline — can invoke it as a native slash command."
        />

        <div className="grid lg:grid-cols-2 gap-4 sm:gap-5 items-stretch">
          {/* Left — install steps */}
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55 }}
            className="panel card-hover rounded-xl p-5 sm:p-6 min-w-0"
          >
            <div className="flex items-center gap-3 mb-5">
              <span className="flex items-center justify-center w-9 h-9 rounded-lg border border-[#3a2f1f] bg-[#1d1a15]">
                <Terminal className="w-4 h-4 text-[#d3a05c]" />
              </span>
              <div>
                <h3 className="text-[15px] font-semibold text-[#e9e4da]">
                  Three commands to superpowers
                </h3>
                <span className="font-mono text-[10.5px] text-[#7a7367]">
                  standard install path
                </span>
              </div>
            </div>

            <div className="space-y-2.5">
              <CopyRow cmd={CLONE_CMD} label="clone" delay={0.1} />
              <CopyRow
                cmd="ls ~/.agents/skills/exit-capsule"
                label="verify"
                delay={0.2}
              />
              <CopyRow cmd={SKILL_INVOCATION} label="invoke" delay={0.3} />
            </div>

            <div className="mt-5 flex items-center gap-2.5 rounded-lg border border-[#2b261f] bg-[#12100d] px-3.5 py-2.5">
              <FolderTree className="w-4 h-4 text-[#93a6bd] shrink-0" />
              <p className="font-mono text-[11px] text-[#7a7367] truncate min-w-0 flex-1">
                ~/.agents/skills/
                <span className="text-[#d3a05c]">exit-capsule</span>
                /SKILL.md
              </p>
              <span className="ml-auto shrink-0 font-mono text-[9px] uppercase tracking-widest text-[#5c554a] border border-[#2b261f] rounded px-1.5 py-0.5">
                discovered
              </span>
            </div>
          </motion.div>

          {/* Right — standard explainer */}
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="flex flex-col gap-4 sm:gap-5 min-w-0"
          >
            <div className="panel card-hover rounded-xl p-5 sm:p-6 flex-1">
              <div className="flex items-center gap-3 mb-4">
                <span className="flex items-center justify-center w-9 h-9 rounded-lg border border-[#2b2629] bg-[#1d1a15]">
                  <Globe2 className="w-4 h-4 text-[#ad90a5]" />
                </span>
                <div>
                  <h3 className="text-[15px] font-semibold text-[#e9e4da]">
                    One skill, every harness
                  </h3>
                  <span className="font-mono text-[10.5px] text-[#7a7367]">
                    agentskills.io open standard · track 2
                  </span>
                </div>
              </div>
              <p className="text-[13px] text-[#a29a8d] leading-relaxed">
                No vendor lock-in, no proprietary plugin format. The skill
                self-describes via{" "}
                <span className="font-mono text-[12px] text-[#ad90a5]">
                  SKILL.md
                </span>{" "}
                front-matter, so any agent that reads the standard learns the
                command surface, guardrails, and output contract — and can
                start producing capsules in the same session it was installed.
              </p>

              <div className="mt-4 grid grid-cols-3 gap-2.5">
                {[
                  { label: "CLI agents", value: "slash-native" },
                  { label: "IDE extensions", value: "tool-registry" },
                  { label: "CI pipelines", value: "headless" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-lg border border-[#2b261f] bg-[#12100d] px-3 py-2.5 text-center"
                  >
                    <p className="font-mono text-[10px] uppercase tracking-wider text-[#5c554a]">
                      {item.label}
                    </p>
                    <p className="mt-0.5 font-mono text-[11.5px] text-[#93ab8d]">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="panel card-hover rounded-xl p-5 sm:p-6">
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center w-9 h-9 rounded-lg border border-[#2b261f] bg-[#1d1a15]">
                  <Plug className="w-4 h-4 text-[#93a6bd]" />
                </span>
                <div>
                  <h3 className="text-[15px] font-semibold text-[#e9e4da]">
                    Zero-dependency core
                  </h3>
                  <span className="font-mono text-[10.5px] text-[#7a7367]">
                    stdlib only · python 3.12 / 3.13
                  </span>
                </div>
                <Rocket className="ml-auto w-4 h-4 text-[#5c554a]" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Harness marquee */}
      <div className="relative mt-12 sm:mt-16 border-y border-[#2b261f] bg-[#12100d] py-4 overflow-hidden">
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#141210] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#141210] to-transparent z-10 pointer-events-none" />
        <div className="flex w-max marquee-track">
          {[...HARNESSES, ...HARNESSES].map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="mx-5 flex items-center gap-2 font-mono text-xs text-[#7a7367] whitespace-nowrap"
            >
              <span className="w-1 h-1 rounded-full bg-[#d3a05c]/50" />
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
