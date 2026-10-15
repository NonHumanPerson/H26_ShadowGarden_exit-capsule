import type { Metadata } from "next";
import { Newsreader, Source_Sans_3, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const display = Newsreader({
  variable: "--font-display",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

const body = Source_Sans_3({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const mono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Exit Capsule — Dependency Maintenance Agent for Python",
  description:
    "An enterprise-grade, zero-dependency agent skill that scans repositories, maps AST call sites, runs isolated sandbox tests, and writes verified Exit Capsules. Built for the Agent Skills Open Standard.",
  keywords: [
    "exit capsule",
    "agent skills",
    "agentskills.io",
    "dependency management",
    "python",
    "PyPI",
    "AST",
    "pytest",
    "sandbox testing",
    "Hacktoberfest",
    "Abhyantriki KJSCE 2026",
  ],
  authors: [{ name: "Team ShadowGarden" }],
  openGraph: {
    title: "Exit Capsule",
    description:
      "Dependency maintenance agent for Python. Clone, scan, test, report — a verified Exit Capsule every run.",
    siteName: "Exit Capsule",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Exit Capsule",
    description:
      "Dependency maintenance agent for Python. Clone, scan, test, report.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${display.variable} ${body.variable} ${mono.variable} antialiased bg-background text-foreground font-sans`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
