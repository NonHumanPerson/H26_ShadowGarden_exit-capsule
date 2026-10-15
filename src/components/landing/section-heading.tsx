"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  index: string;
  kicker: string;
  title: string;
  description?: string;
}

export function SectionHeading({
  index,
  kicker,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="mb-10 md:mb-14"
    >
      <div className="flex items-center gap-3 mb-4">
        <span className="font-mono text-[11px] tracking-widest uppercase px-2.5 py-1 rounded-md border border-[#2b261f] bg-[#1d1a15] text-[#d3a05c]">
          {index}
        </span>
        <span className="font-mono text-[11px] tracking-widest uppercase text-[#7a7367]">
          {kicker}
        </span>
        <span className="hidden sm:block h-px flex-1 max-w-24 bg-[#2b261f]" />
      </div>
      <h2 className="font-serif text-2xl sm:text-3xl md:text-[2.35rem] font-medium tracking-tight text-[#e9e4da] max-w-3xl leading-snug">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-[#a29a8d] max-w-2xl text-sm sm:text-base leading-relaxed">
          {description}
        </p>
      ) : null}
    </motion.div>
  );
}
