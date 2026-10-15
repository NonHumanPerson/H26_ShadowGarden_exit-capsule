"use client";

import { useEffect, useState } from "react";
import { Github, Menu, Pill, X } from "lucide-react";
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
          ? "bg-[#141210]/90 backdrop-blur-md border-b border-[#2b261f]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#top" className="flex items-center gap-2.5 group">
          <span className="flex items-center justify-center w-8 h-8 rounded-lg border border-[#3a2f1f] bg-[#221c12]">
            <Pill className="w-4 h-4 text-[#d3a05c]" />
          </span>
          <span className="font-mono text-sm text-[#e9e4da] tracking-tight">
            exit<span className="text-[#d3a05c]">-capsule</span>
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_SECTIONS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="px-3 py-1.5 text-sm text-[#a29a8d] hover:text-[#e9e4da] rounded-md hover:bg-[#211d18] transition-colors"
            >
              {item.label}
            </a>
          ))}
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-3 inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-[#e9e4da] border border-[#2b261f] bg-[#1d1a15] hover:border-[#4a3f2d] transition-colors"
          >
            <Github className="w-4 h-4" />
            GitHub
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 text-[#a29a8d] hover:text-[#e9e4da]"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-[#2b261f] bg-[#141210]/95 backdrop-blur-md">
          <div className="px-4 py-3 flex flex-col gap-1">
            {NAV_SECTIONS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="px-3 py-2.5 text-sm text-[#cfc9bf] hover:bg-[#211d18] rounded-md"
              >
                {item.label}
              </a>
            ))}
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-flex items-center gap-2 px-3 py-2.5 text-sm text-[#d3a05c] hover:bg-[#211d18] rounded-md"
            >
              <Github className="w-4 h-4" /> View on GitHub
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
