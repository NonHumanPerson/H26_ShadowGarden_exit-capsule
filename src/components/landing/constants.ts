export const GITHUB_URL =
  "https://github.com/NonHumanPerson/H26_ShadowGarden_exit-capsule";

export const SKILL_DIR = "~/.agents/skills/exit-capsule/";

export const MKDIR_CMD = "mkdir -p ~/.agents/skills/exit-capsule/";

export const CLONE_CMD =
  "git clone https://github.com/NonHumanPerson/H26_ShadowGarden_exit-capsule ~/.agents/skills/exit-capsule";

export const SKILL_INVOCATION =
  "/exit-capsule https://github.com/isair/jarvis.git";

export const NAV_SECTIONS = [
  { href: "#architecture", label: "Architecture" },
  { href: "#portability", label: "Portability" },
  { href: "#capsule", label: "Exit Capsule" },
] as const;
