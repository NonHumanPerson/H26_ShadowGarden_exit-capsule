---
name: dependency-exit-capsule
description: Generate a Dependency Exit Capsule for any Python repository. Analyzes dependencies for maintenance risks, maps AST usage, runs baseline tests, and produces a verifiable report.
arguments:
  - name: repo
    description: GitHub URL (https://github.com/owner/repo) or local path to repository
    required: true
  - name: swap
    description: Optional package swap test as two args: old-pkg new-pkg
    required: false
  - name: keep-clone
    description: Keep cloned repository after analysis
    required: false
    default: false
command: python .opencode/command/dependency-exit-capsule.py
---

# Dependency Exit Capsule Command

Generate a full Dependency Exit Capsule report for any Python repository.

## Usage

```
/dependency-exit-capsule https://github.com/owner/repo
/dependency-exit-capsule /local/path/to/repo
/dependency-exit-capsule https://github.com/owner/repo --swap old-pkg new-pkg
```

## What It Does

1. **Clones/locates** the repository
2. **Scans** `requirements.txt`, `pyproject.toml`, `requirements-dev.txt` for dependencies
3. **Queries PyPI** for live metadata (release dates, staleness, classifiers, Python constraints)
4. **Maps AST imports** - exact file/line locations for every dependency usage
5. **Runs baseline tests** - installs test deps, executes pytest
6. **Optional swap test** - uninstalls old package, installs replacement, re-runs tests
7. **Generates EXIT_CAPSULE.md** with strict [VERIFIED OBSERVATION] vs [AI RECOMMENDATION] sections

## Output Files

- `scan_evidence.json` - Verified dependency metadata + AST usage map
- `baseline_results.json` - Baseline pytest execution results
- `swap_results.json` - (Optional) Swap test results
- `EXIT_CAPSULE.md` - Final human-readable report

## Example

```
/dependency-exit-capsule https://github.com/psf/requests
```

Produces a report identifying at-risk dependencies like:
- `trustme` - No release in 651 days
- `PySocks` - No release in 2582 days  
- `pytest-httpbin` - No release in 756 days
- `pytest-xdist` - No release in 470 days
- `PyOpenSSL` - Marked Inactive in PyPI classifiers
- `pytest` - Marked Inactive in PyPI classifiers

With exact usage locations mapped across the codebase.