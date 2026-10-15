# Dependency Exit Capsule

> **An automated Dependency Resilience & Maintenance Agent** that analyzes any Python repository, identifies at-risk dependencies using live PyPI metadata, maps exact code usage via AST, executes verifiable baseline and migration tests, and generates a comprehensive Exit Capsule report with strict separation between verified observations and AI recommendations.

---

## 🎯 Problem & Solution Overview

### The Problem

Python projects accumulate dependency risk silently:

| Risk Type | Example | Impact |
|-----------|---------|--------|
| **Abandoned packages** | `nose` (last release 2015), `webrtcvad` (2017) | Security vulnerabilities, incompatibility with new Python versions |
| **Missing metadata** | No `requires_python`, no recent releases | Pip installs broken versions, runtime failures |
| **False alarms** | `pytest` marked "Inactive" despite monthly releases | Wasted engineering effort on unnecessary migrations |
| **Blind migrations** | Replacing `toml` → `tomllib` without testing | Subtle API differences break production code |
| **No verification** | "Tests pass locally" ≠ "Migration works in CI" | Deploy-time surprises |

### The Solution

**Dependency Exit Capsule** automates the full maintenance lifecycle:

```
┌─────────────────────────────────────────────────────────────────────┐
│                        DEPENDENCY EXIT CAPSULE                       │
├─────────────────────────────────────────────────────────────────────┤
│  1. SCAN          │  repo_scanner.py  │  requirements.txt,         │
│                   │                   │  pyproject.toml,           │
│                   │                   │  setup.py → PyPI API       │
│                   │                   │  + AST import mapping      │
├───────────────────┼───────────────────┼────────────────────────────┤
│  2. BASELINE TEST │  test_runner.py   │  Install test deps →       │
│                   │                   │  pytest -v (verifiable)    │
├───────────────────┼───────────────────┼────────────────────────────┤
│  3. SWAP TEST     │  test_runner.py   │  pip uninstall old         │
│   (optional)      │  --mode swap      │  pip install new           │
│                   │                   │  pytest -v (verifiable)    │
├───────────────────┼───────────────────┼────────────────────────────┤
│  4. REPORT        │  run_capsule.py   │  EXIT_CAPSULE.md           │
│                   │                   │  [VERIFIED OBSERVATION]    │
│                   │                   │  vs [AI RECOMMENDATION]    │
└───────────────────┴───────────────────┴────────────────────────────┘
```

### Key Differentiators

| Feature | Typical Tools | Dependency Exit Capsule |
|---------|---------------|------------------------|
| **Data source** | Static `pip list --outdated` | Live PyPI JSON API + AST analysis |
| **Usage mapping** | None / grep-based | Exact file:line via `ast` module |
| **Test verification** | Manual | Automated, captured stdout/stderr/exit codes |
| **Migration validation** | None | Automated swap test with comparison |
| **Report format** | JSON / terminal | Rich Markdown with risk scoring, collapsible maps, actionable steps |
| **AI boundary** | Mixed/opaque | Strict `[VERIFIED OBSERVATION]` vs `[AI RECOMMENDATION]` |

---

## 🚀 Setup Instructions

### Prerequisites

| Requirement | Version | Purpose |
|-------------|---------|---------|
| **Python** | 3.12 or 3.13 | Runtime (strictly incompatible with 3.14+) |
| **Git** | 2.30+ | Clone GitHub repositories |
| **Internet** | Required | PyPI API queries (`https://pypi.org/pypi/<pkg>/json`) |
| **pytest** | 7.0+ | Test execution (auto-installed per-project) |

### Installation

```bash
# Clone the skill repository
git clone https://github.com/your-org/agentSkills.git
cd agentSkills

# Verify Python version
python --version  # Must be 3.12.x or 3.13.x

# Run self-test on a known repo
python .opencode/command/dependency-exit-capsule.py https://github.com/psf/requests
```

### Project Structure

```
agentSkills/
├── .opencode/
│   └── command/
│       ├── dependency-exit-capsule.md    # OpenCode command definition
│       └── dependency-exit-capsule.py    # Cross-platform wrapper
├── assets/
│   └── EXIT_CAPSULE_TEMPLATE.md          # Legacy template (reference)
├── scripts/
│   ├── repo_scanner.py       # Phase 1: Dependency scan + PyPI + AST
│   ├── test_runner.py        # Phase 2/3: Baseline & swap tests
│   └── run_capsule.py        # Orchestrator: clone → scan → test → report
├── SKILL.md                  # Skill metadata (OpenCode format)
└── README.md                 # This file
```

---

## 📖 Usage Instructions

### Quick Start

```bash
# Analyze any GitHub repository
python .opencode/command/dependency-exit-capsule.py https://github.com/owner/repo

# Analyze a local repository
python .opencode/command/dependency-exit-capsule.py /path/to/repo

# Validate a migration (swap test)
python .opencode/command/dependency-exit-capsule.py https://github.com/owner/repo --swap old-pkg new-pkg

# Keep cloned repo for inspection
python .opencode/command/dependency-exit-capsule.py https://github.com/owner/repo --keep-clone
```

### In OpenCode (Slash Command)

```
/dependency-exit-capsule https://github.com/rishrek/LinkWatch
/dependency-exit-capsule /local/path/to/project
/dependency-exit-capsule https://github.com/owner/repo --swap appdirs platformdirs
```

### Output Files

| File | Description |
|------|-------------|
| `scan_evidence.json` | Raw PyPI metadata + AST usage locations for every dependency |
| `baseline_results.json` | Baseline pytest execution (exit code, stdout, stderr, duration) |
| `swap_results.json` | Migration test results (if `--swap` used) |
| `EXIT_CAPSULE.md` | **Human-readable report** (primary deliverable) |

### Example: Scan → Migrate → Verify

```bash
# 1. Initial scan
/dependency-exit-capsule https://github.com/rishrek/LinkWatch

# 2. Review EXIT_CAPSULE.md → identify appdirs (HIGH risk) → platformdirs

# 3. Validate migration
/dependency-exit-capsule https://github.com/rishrek/LinkWatch --swap appdirs platformdirs

# 4. Compare Baseline vs Migration in report → ✅ Compatible → merge with confidence
```

---

## 🏗️ Architecture

### Component Diagram

```
┌──────────────────────────────────────────────────────────────────┐
│                        run_capsule.py                             │
│  (Orchestrator: clone → scan → test → report)                    │
└──────────────────────────┬───────────────────────────────────────┘
                           │
         ┌─────────────────┼─────────────────┐
         ▼                 ▼                 ▼
┌─────────────────┐ ┌───────────────┐ ┌─────────────────┐
│ repo_scanner.py │ │ test_runner.py │ │  AI Knowledge   │
│                 │ │               │ │  Base (built-in) │
│ • parse reqs    │ │ • install deps│ │                 │
│ • PyPI API      │ │ • pytest -v   │ │ • 20+ packages  │
│ • AST imports   │ │ • swap mode   │ │ • effort/steps  │
│ • risk scoring  │ │ • capture IO  │ │ • breaking chgs │
└────────┬────────┘ └───────┬───────┘ └────────┬────────┘
         │                  │                  │
         └──────────────────┼──────────────────┘
                            ▼
                   ┌─────────────────┐
                   │ EXIT_CAPSULE.md │
                   │ (Rich Markdown) │
                   └─────────────────┘
```

### Data Flow

```
GitHub URL / Local Path
         │
         ▼
   [Clone if URL] → Temporary Directory
         │
         ▼
   repo_scanner.py
   ├── parse_requirements() → requirements.txt, pyproject.toml, setup.py
   ├── check_pypi_metadata() → live PyPI JSON (version, upload_time, classifiers, requires_python)
   ├── find_ast_usages() → ast.walk() → {pkg: [{file, line, statement}]}
   └── calc_risk_score() → 0-100 based on staleness, classifiers, metadata
         │
         ▼
   scan_evidence.json
         │
         ▼
   test_runner.py (--mode baseline)
   ├── find_test_dependencies() → pyproject.toml [optional-dependencies], requirements-*.txt
   ├── pip install -e .[test] OR pip install deps
   ├── pytest -v → capture (exit_code, stdout, stderr, passed)
   └── baseline_results.json
         │
         ▼
   [Optional] test_runner.py (--mode swap --old-pkg X --new-pkg Y)
   ├── pip uninstall -y X
   ├── pip install Y
   ├── pytest -v → swap_results.json
         │
         ▼
   run_capsule.py → generate_exit_capsule()
   ├── Risk scoring & categorization (🔴≥70, 🟠40-69, 🟡20-39, 🟢<20)
   ├── Built-in MIGRATION_GUIDE lookup (20+ packages)
   ├── Executive summary + heatmap
   ├── Per-package deep dive with migration steps
   ├── Collapsible usage maps by directory
   ├── Healthy dependency table
   ├── Baseline vs Migration comparison table
   ├── Prioritized action items + checklist
   └── EXIT_CAPSULE.md
```

### Risk Scoring Algorithm

```python
def calc_risk_score(dep):
    score = 0
    days = dep.get("days_since_last_release", 0) or 0
    
    # Staleness (max 40)
    if days > 3650: score += 40      # 10+ years
    elif days > 1825: score += 30    # 5+ years
    elif days > 730: score += 20     # 2+ years
    elif days > 365: score += 10     # 1+ year
    
    # Classifiers (max 25)
    if any("Inactive" in r for r in reasons): score += 25
    
    # Missing metadata (max 15)
    if any("Missing explicit Python" in r for r in reasons): score += 15
    
    # PyPI unreachable (max 35)
    if any("Failed to verify" in r for r in reasons): score += 35
    
    return min(score, 100)
```

### Levels

| Score | Level | Action |
|-------|-------|--------|
| 70-100 | 🔴 CRITICAL | Immediate migration required |
| 40-69 | 🟠 HIGH | Plan migration this quarter |
| 20-39 | 🟡 MEDIUM | Monitor, schedule review |
| 0-19 | 🟢 LOW | No action needed |

---

## 📦 Dependencies

### Runtime Dependencies (Standard Library Only)

The skill uses **only Python standard library modules** — no external packages required for the scanner/orchestrator:

| Module | Purpose |
|--------|---------|
| `ast` | Parse Python source for import statements |
| `json` | Serialize scan/test evidence |
| `os`, `pathlib`, `tempfile`, `shutil` | Filesystem operations |
| `urllib.request`, `urllib.error` | PyPI API HTTP requests |
| `subprocess` | Run pip/pytest commands |
| `argparse` | CLI argument parsing |
| `datetime`, `timezone` | Timestamps |
| `re` | Version parsing |
| `tomllib` / `tomli` | pyproject.toml parsing (stdlib in 3.11+, backport for 3.10) |

### Test Dependencies (Per-Project, Auto-Installed)

| Source | Example Packages |
|--------|------------------|
| `pyproject.toml` `[project.optional-dependencies]` test/dev | `pytest`, `pytest-cov`, `pytest-mock`, `httpx` |
| `pyproject.toml` `[dependency-groups]` test | `pytest-xdist`, `coverage` |
| `requirements-dev.txt` / `requirements-test.txt` | `pytest`, `tox`, `nox` |
| `setup.py` `tests_require` | Legacy projects |

### External Services

| Service | Endpoint | Purpose |
|---------|----------|---------|
| **PyPI** | `https://pypi.org/pypi/<package>/json` | Live package metadata (version, upload time, classifiers, requires_python) |
| **GitHub** | `https://github.com/<owner>/<repo>.git` | Repository cloning (shallow, depth=1) |

---

## 🤖 AI Model Details

| Field | Value |
|-------|-------|
| **Model Name** | Nemotron 3 Ultra |
| **Model Version** | 550B-A55B (550 billion parameters, 55 billion active) |
| **Model ID** | `nvidia/nemotron-3-ultra-550b-a55b` |
| **Provider** | NVIDIA |
| **Provider ID** | `nvidia` |
| **Model Source** | Hosted via OpenCode's model provider infrastructure |
| **Access Method** | API inference through OpenCode harness (not direct API calls from skill) |
| **Applicable License / Usage Terms** | NVIDIA Nemotron 3 Ultra — Commercial use permitted under NVIDIA's model license. The skill itself is MIT licensed. |
| **Role in Project** | **The AI model does NOT execute any scanning, testing, or report generation.** The skill's Python scripts (`repo_scanner.py`, `test_runner.py`, `run_capsule.py`) perform all verifiable operations. The AI model is invoked by the *user/operator* to: (1) interpret the generated `EXIT_CAPSULE.md`, (2) fill in `[AI RECOMMENDATION]` sections for packages without built-in migration guides, (3) provide architectural advice on migration strategy, (4) answer follow-up questions about the report. The strict `[VERIFIED OBSERVATION]` vs `[AI RECOMMENDATION]` separation in the report ensures all factual data comes from executed code, not model hallucination. |

> **Critical Design Principle**: The skill is **deterministic and verifiable**. All PyPI queries, AST analysis, test executions, and risk scores are produced by Python code with captured stdout/stderr/exit codes. The AI model only consumes the output — it never generates the evidence.

---

## ⚠️ Known Limitations

### Technical Limitations

| Limitation | Impact | Mitigation |
|------------|--------|------------|
| **Python 3.14+ incompatible** | Hard requirement on 3.12/3.13 | Use `pyenv`/`conda` to pin version |
| **Windows-only tested** | Path handling uses backslashes in AST output | Cross-platform paths work; display uses OS separator |
| **Shallow clone (depth=1)** | No git history for `git log` analysis | Sufficient for dependency manifests |
| **No private PyPI support** | Cannot scan packages on private indexes | Add `--index-url` support to `repo_scanner.py` |
| **Single-threaded PyPI queries** | Slow for 100+ dependencies | Add `asyncio`/`aiohttp` batching |
| **No virtualenv isolation** | Installs test deps in current environment | Run in container/venv for production use |

### Coverage Gaps

| Gap | Description |
|-----|-------------|
| **C extensions** | Cannot detect binary compatibility issues (e.g., `numpy<2` vs `numpy>=2`) |
| **Transitive deps** | Only scans declared dependencies, not full dependency tree |
| **Version constraints** | Parses `requires_python` but doesn't validate against current interpreter |
| **License scanning** | No license compliance checking (GPL, etc.) |
| **Supply chain** | No SBOM generation, no signature verification (sigstore) |
| **Monorepos** | Assumes single `requirements.txt`/`pyproject.toml` at root |

### Migration Guide Completeness

| Status | Packages |
|--------|----------|
| ✅ **Built-in guides (20+)** | `webrtcvad`, `pytesseract`, `html2text`, `pygame`, `pynput`, `pytest`, `miniupnpc`, `mlx-whisper`, `pytest-repeat`, `pyinstaller`, `Pillow`, `nose`, `appdirs`, `toml`, `python-dateutil`, `Jinja2`, `six` |
| 🟡 **Template fallback** | Any package not in `MIGRATION_GUIDE` gets generic `[AI TO FILL]` template |
| ❌ **No guide** | Highly specialized/internal packages |

### False Positives / Negatives

| Scenario | Why | Example |
|----------|-----|---------|
| **Active but stale classifier** | PyPI "Inactive" classifier not updated | `pytest`, `Pillow`, `pyinstaller` flagged despite recent releases |
| **Package renamed** | Old name abandoned, new name active | `toml` → `tomli`/`tomllib` (different import) |
| **Transitive only** | Flagged but not directly imported | `python-dateutil`, `six` often transitive |
| **Platform-specific** | Windows-only deps flagged on Linux | `tzdata`, `pywin32` |

### Test Execution Constraints

| Constraint | Impact |
|------------|--------|
| **Display/audio required** | PyQt, pygame, sounddevice tests fail in headless CI |
| **CUDA/GPU deps** | `nvidia-cudnn-cu12`, `torch` CUDA variants untestable without hardware |
| **macOS-only** | `mlx-whisper`, `pynput` Darwin paths untestable on Windows/Linux |
| **Timeout** | Large test suites may exceed default 120s (configurable) |

---

## 📄 License

**MIT License** — See [SKILL.md](SKILL.md) for skill metadata.

---

## 🤝 Contributing

```bash
# 1. Fork & clone
# 2. Add migration guide to MIGRATION_GUIDE in run_capsule.py
# 3. Test on a repo using that package
# 4. PR with before/after EXIT_CAPSULE.md
```

**Priority contributions:**
- New migration guides for common at-risk packages
- Async PyPI batching for large dependency sets
- Virtualenv isolation for test execution
- SBOM (CycloneDX/SPDX) output format
- GitHub Action / GitLab CI template

---

*Generated by Dependency Exit Capsule Skill v1.0 — [VERIFIED OBSERVATION] vs [AI RECOMMENDATION] separation enforced.*
