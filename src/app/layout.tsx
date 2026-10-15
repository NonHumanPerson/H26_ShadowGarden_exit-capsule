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
  title: "exit-capsule — Dependency Maintenance Agent for Python",
  description:
    "A zero-dependency agent skill that clones repositories, scans manifests, queries live PyPI data, runs sandbox pytest verification, and writes a rich markdown Exit Capsule. Built for the Agent Skills Open Standard.",
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
    title: "exit-capsule",
    description:
      "Dependency Maintenance Agent for Python. Clone. Scan. Test. Report. Writes EXIT_CAPSULE.md.",
    siteName: "exit-capsule",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "exit-capsule",
    description:
      "Dependency Maintenance Agent for Python. Clone. Scan. Test. Report.",
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
