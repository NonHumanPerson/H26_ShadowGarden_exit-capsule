"use client";

import { useEffect, useState } from "react";
import { Github, Menu, X, Pill } from "lucide-react";
import { GITHUB_URL, NAV_SECTIONS } from "./constants";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#090d16]/85 backdrop-blur-xl border-b border-slate-800/70"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#top" className="flex items-center gap-2.5 group">
          <span className="relative flex items-center justify-center w-8 h-8 rounded-lg border border-emerald-500/40 bg-emerald-500/10">
            <Pill className="w-4 h-4 text-emerald-400" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 live-dot" />
          </span>
          <span className="font-mono text-sm text-slate-200 tracking-tight">
            exit<span className="text-emerald-400">-capsule</span>
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_SECTIONS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="px-3 py-1.5 text-sm text-slate-400 hover:text-slate-100 rounded-md hover:bg-slate-800/60 transition-colors"
            >
              {item.label}
            </a>
          ))}
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-3 inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-slate-200 border border-slate-700 bg-slate-800/50 hover:border-emerald-500/50 hover:bg-emerald-500/10 hover:text-emerald-300 transition-all"
          >
            <Github className="w-4 h-4" />
            GitHub
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 text-slate-400 hover:text-slate-100"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-slate-800/70 bg-[#090d16]/95 backdrop-blur-xl">
          <div className="px-4 py-3 flex flex-col gap-1">
            {NAV_SECTIONS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="px-3 py-2.5 text-sm text-slate-300 hover:bg-slate-800/60 rounded-md"
              >
                {item.label}
              </a>
            ))}
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-flex items-center gap-2 px-3 py-2.5 text-sm text-emerald-300 hover:bg-emerald-500/10 rounded-md"
            >
              <Github className="w-4 h-4" /> View on GitHub
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
