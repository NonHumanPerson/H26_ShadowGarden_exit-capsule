import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dependency Exit Capsule Agent — Autonomous Dependency Maintenance for Python",
  description:
    "An enterprise-grade, zero-dependency agent skill that scans repositories, maps AST call sites, runs isolated sandbox tests, and generates verified Dependency Exit Capsules. Built for the Agent Skills Open Standard.",
  keywords: [
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
    "exit capsule",
  ],
  authors: [{ name: "Team ShadowGarden" }],
  openGraph: {
    title: "Dependency Exit Capsule Agent",
    description:
      "Autonomous Dependency Maintenance Agent for Python. Scan. Propose. Verify. Ship a Dependency Exit Capsule.",
    siteName: "Dependency Exit Capsule Agent",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dependency Exit Capsule Agent",
    description:
      "Autonomous Dependency Maintenance Agent for Python. Scan. Propose. Verify. Ship.",
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
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
