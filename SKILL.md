---
name: dependency-exit-capsule
description: Analyzes ANY Python repository (via GitHub URL or local path) to identify outdated, unmaintained, or at-risk dependencies, maps exact AST code usage, executes baseline and replacement test suites, and generates a verifiable Dependency Exit Capsule. Use when maintaining repositories, auditing requirements.txt or pyproject.toml, or planning package migrations.
license: MIT
compatibility: Requires Python 3.12 or 3.13 (strictly incompatible with Python 3.14), pytest, requests, git, and internet access for PyPI API inspection.
allowed-tools: Bash Read Write Edit Glob Grep
metadata:
  track: Track 2 - Maintenance Agent Skill
  standard-version: "1.0"
---

# Dependency Exit Capsule Skill

## Overview
You are an automated Dependency Resilience & Maintenance Agent. Your objective is to inspect a target Python repository, identify dependency maintenance risks using verifiable metadata, map code usage via Abstract Syntax Trees (AST), test proposed replacements in an isolated environment, and compile a **Dependency Exit Capsule**.

## Strict Guardrail: Observed Facts vs. AI Recommendations
You MUST maintain a strict boundary between:
1. **[VERIFIED OBSERVATION]**: Data directly returned by `scripts/repo_scanner.py`, `scripts/test_runner.py`, or raw terminal outputs (`pytest` logs, exit codes, PyPI timestamps). Never hallucinate or estimate these metrics.
2. **[AI RECOMMENDATION]**: Your proposed replacement libraries, refactoring strategies, migration code snippets, and architectural advice.

## Quick Start (One Command)

### Analyze any GitHub repository:
```bash
python scripts/run_capsule.py --github-url https://github.com/owner/repo
```

### Analyze a local repository:
```bash
python scripts/run_capsule.py --repo-path /path/to/repo
```

### With package swap test (migration validation):
```bash
python scripts/run_capsule.py --github-url https://github.com/owner/repo --swap old-package new-package
```

**Outputs generated:**
- `scan_evidence.json` — Verified dependency metadata + AST usage map
- `baseline_results.json` — Baseline pytest execution results
- `swap_results.json` — (Optional) Swap test results
- `EXIT_CAPSULE.md` — Final report with [VERIFIED OBSERVATION] vs [AI RECOMMENDATION] sections

---

## Step-by-Step Execution Workflow (Manual Mode)

### Phase 1: Repository & Dependency Inspection (Verified)
1. Locate dependency manifests (`requirements.txt`, `pyproject.toml`, or `setup.py`) in the target repository.
2. Run the bundled scanner script to fetch live PyPI metadata and map exact AST usage across the codebase:
   ```bash
   python3 scripts/repo_scanner.py --repo-path . --output scan_evidence.json
   ```

### Phase 2: Baseline Test Execution (Verified)
1. Ensure test dependencies are installed (`pip install -r requirements-dev.txt` or similar).
2. Run the test runner in baseline mode:
   ```bash
   python3 scripts/test_runner.py --repo-path . --mode baseline --output baseline_results.json
   ```

### Phase 3: Replacement Testing (Verified)
For each at-risk dependency identified in Phase 1:
1. Identify a candidate replacement package (AI recommendation).
2. Run the swap test:
   ```bash
   python3 scripts/test_runner.py --repo-path . --mode swap --old-pkg <at-risk-pkg> --new-pkg <replacement-pkg> --output swap_results.json
   ```

### Phase 4: Generate Exit Capsule (Hybrid)
1. Fill the `EXIT_CAPSULE_TEMPLATE.md` with:
   - [VERIFIED OBSERVATION] data from `scan_evidence.json` and test results
   - [AI RECOMMENDATION] sections for replacements, migration steps, and limitations

---

## Script Reference

| Script | Purpose | Key Arguments |
|--------|---------|---------------|
| `run_capsule.py` | **Main entry point** — clones repo, runs full pipeline | `--github-url`, `--repo-path`, `--swap`, `--output-dir`, `--keep-clone` |
| `repo_scanner.py` | Scans deps + PyPI metadata + AST imports | `--repo-path`, `--output` |
| `test_runner.py` | Runs pytest baseline/swap tests | `--repo-path`, `--mode`, `--old-pkg`, `--new-pkg`, `--output` |

---

## Output Formats

### scan_evidence.json
```json
{
  "scan_timestamp": "2026-10-15T...",
  "dependencies": [
    {
      "package": "requests",
      "latest_version": "2.31.0",
      "last_release_date": "2023-05-22",
      "days_since_last_release": 512,
      "requires_python": ">=3.7",
      "is_at_risk": true,
      "risk_indicators": ["No release in 512 days..."],
      "usage_locations": [
        {"file": "src/main.py", "line": 1, "statement": "import requests"}
      ]
    }
  ]
}
```

### baseline_results.json / swap_results.json
```json
{
  "execution_timestamp": "2026-10-15T...",
  "python_version": "3.12.0...",
  "mode": "baseline",
  "steps": [
    {"command": "python -m pytest -v", "exit_code": 0, "passed": true, "stdout": "...", "stderr": ""}
  ],
  "overall_test_passed": true
}
```

---

## Requirements
- Python 3.12 or 3.13
- `pytest` installed in target environment
- `git` available in PATH (for GitHub URL cloning)
- Internet access for PyPI API queries

---

## Example: Analyzing a Random Repo
```bash
# Clone and analyze in one go
python scripts/run_capsule.py --github-url https://github.com/psf/requests

# Outputs appear in current directory:
# scan_evidence.json, baseline_results.json, EXIT_CAPSULE.md
```