#!/usr/bin/env python3
"""
Dependency Exit Capsule - OpenCode Command Wrapper (Python)
Cross-platform wrapper for the skill.
"""

import sys
import os
import subprocess
from pathlib import Path

def main():
    # Get skill root (parent of .opencode/command)
    skill_root = Path(__file__).parent.parent.parent
    
    # Parse arguments
    args = sys.argv[1:]
    
    if not args or args[0] in ("-h", "--help"):
        print("Usage: dependency-exit-capsule <github-url|local-path> [--swap old-pkg new-pkg] [--keep-clone]")
        print("")
        print("Examples:")
        print("  dependency-exit-capsule https://github.com/psf/requests")
        print("  dependency-exit-capsule /path/to/repo")
        print("  dependency-exit-capsule https://github.com/owner/repo --swap trustme pytest-trustme")
        sys.exit(0)
    
    repo = args[0]
    remaining = args[1:]
    
    swap_old = ""
    swap_new = ""
    keep_clone = False
    
    i = 0
    while i < len(remaining):
        if remaining[i] == "--swap" and i + 2 < len(remaining):
            swap_old = remaining[i + 1]
            swap_new = remaining[i + 2]
            i += 3
        elif remaining[i] == "--keep-clone":
            keep_clone = True
            i += 1
        else:
            print(f"Unknown argument: {remaining[i]}")
            sys.exit(1)
    
    # Build command
    cmd = [sys.executable, str(skill_root / "scripts" / "run_capsule.py")]
    
    if repo.startswith("https://github.com/"):
        cmd.extend(["--github-url", repo])
    else:
        cmd.extend(["--repo-path", repo])
    
    if swap_old and swap_new:
        cmd.extend(["--swap", swap_old, swap_new])
    
    if keep_clone:
        cmd.append("--keep-clone")
    
    # Run from skill root so outputs go to current working directory
    os.chdir(skill_root)
    result = subprocess.run(cmd)
    sys.exit(result.returncode)

if __name__ == "__main__":
    main()