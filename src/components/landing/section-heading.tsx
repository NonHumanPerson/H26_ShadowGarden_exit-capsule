"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  index: string;
  kicker: string;
  title: string;
  description?: string;
  accent?: "emerald" | "blue" | "purple";
}

const accentMap = {
  emerald: {
    text: "text-emerald-400",
    border: "border-emerald-500/30",
    bg: "bg-emerald-500/10",
    line: "from-emerald-500/60",
  },
  blue: {
    text: "text-sky-400",
    border: "border-sky-500/30",
    bg: "bg-sky-500/10",
    line: "from-sky-500/60",
  },
  purple: {
    text: "text-violet-400",
    border: "border-violet-500/30",
    bg: "bg-violet-500/10",
    line: "from-violet-500/60",
  },
} as const;

export function SectionHeading({
  index,
  kicker,
  title,
  description,
  accent = "emerald",
}: SectionHeadingProps) {
  const a = accentMap[accent];
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="mb-10 md:mb-14"
    >
      <div className="flex items-center gap-3 mb-4">
        <span
          className={`font-mono text-[11px] tracking-widest uppercase px-2.5 py-1 rounded-md border ${a.border} ${a.bg} ${a.text}`}
        >
          {index}
        </span>
        <span className="font-mono text-[11px] tracking-widest uppercase text-slate-500">
          {kicker}
        </span>
        <span
          className={`hidden sm:block h-px flex-1 max-w-24 bg-gradient-to-r ${a.line} to-transparent`}
        />
      </div>
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-slate-100 max-w-3xl leading-tight">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-slate-400 max-w-2xl text-sm sm:text-base leading-relaxed">
          {description}
        </p>
      ) : null}
    </motion.div>
  );
}
