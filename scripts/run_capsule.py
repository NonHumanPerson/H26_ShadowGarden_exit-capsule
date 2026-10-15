#!/usr/bin/env python3
"""
Dependency Exit Capsule - Main Orchestrator

Usage:
    python scripts/run_capsule.py --github-url https://github.com/owner/repo
    python scripts/run_capsule.py --repo-path /local/path/to/repo

This script:
1. Clones the GitHub repo (if URL provided) or uses local path
2. Runs repo_scanner.py to generate scan_evidence.json
3. Runs test_runner.py in baseline mode to generate baseline_results.json
4. Optionally runs swap tests for at-risk dependencies
5. Generates the final EXIT_CAPSULE.md report
"""

import argparse
import json
import os
import shutil
import subprocess
import sys
import tempfile
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import urlparse

# Add scripts directory to path for imports
SCRIPTS_DIR = Path(__file__).parent
sys.path.insert(0, str(SCRIPTS_DIR))

from repo_scanner import main as scan_main
from test_runner import main as test_main


def clone_github_repo(github_url: str, target_dir: str) -> str:
    """Clone a GitHub repository to target directory."""
    parsed = urlparse(github_url)
    if parsed.netloc != "github.com":
        raise ValueError("Only github.com URLs are supported")
    
    # Extract owner/repo from path
    path_parts = parsed.path.strip("/").split("/")
    if len(path_parts) < 2:
        raise ValueError("Invalid GitHub URL format. Expected: https://github.com/owner/repo")
    
    owner, repo = path_parts[0], path_parts[1]
    if repo.endswith(".git"):
        repo = repo[:-4]
    
    repo_dir = os.path.join(target_dir, repo)
    
    print(f"[VERIFIED] Cloning {owner}/{repo} to {repo_dir}")
    result = subprocess.run(
        ["git", "clone", "--depth", "1", github_url, repo_dir],
        capture_output=True,
        text=True
    )
    
    if result.returncode != 0:
        raise RuntimeError(f"Failed to clone repo: {result.stderr}")
    
    print(f"[VERIFIED] Repository cloned successfully")
    return repo_dir


def run_scanner(repo_path: str, output_file: str):
    """Run the repo scanner."""
    print(f"[VERIFIED] Running dependency scanner on {repo_path}")
    sys.argv = ["repo_scanner.py", "--repo-path", repo_path, "--output", output_file]
    scan_main()


def run_baseline_tests(repo_path: str, output_file: str):
    """Run baseline tests."""
    print(f"[VERIFIED] Running baseline tests on {repo_path}")
    sys.argv = ["test_runner.py", "--repo-path", repo_path, "--mode", "baseline", "--output", output_file]
    test_main()


def run_swap_test(repo_path: str, old_pkg: str, new_pkg: str, output_file: str):
    """Run swap test for a specific package replacement."""
    print(f"[VERIFIED] Running swap test: {old_pkg} -> {new_pkg}")
    sys.argv = [
        "test_runner.py", 
        "--repo-path", repo_path, 
        "--mode", "swap",
        "--old-pkg", old_pkg,
        "--new-pkg", new_pkg,
        "--output", output_file
    ]
    test_main()


def load_json(filepath: str):
    """Load JSON file."""
    with open(filepath, "r", encoding="utf-8") as f:
        return json.load(f)


def generate_exit_capsule(
    repo_path: str,
    scan_evidence: dict,
    baseline_results: dict,
    swap_results: dict = None,
    output_file: str = "EXIT_CAPSULE.md"
):
    """Generate the final Exit Capsule markdown report."""
    
    repo_name = os.path.basename(repo_path)
    timestamp = datetime.now(timezone.utc).isoformat()
    python_version = sys.version
    
    # Section 1: At-Risk Dependencies
    at_risk_deps = [d for d in scan_evidence.get("dependencies", []) if d.get("is_at_risk")]
    
    if at_risk_deps:
        dep_sections = []
        for dep in at_risk_deps:
            risk_indicators = "\n".join(f"    *   {r}" for r in dep.get("risk_indicators", []))
            dep_section = f"""### {dep['package']}
*   **Current / Latest Version:** `{dep.get('latest_version', 'Unknown')}`
*   **Last PyPI Release Date:** `{dep.get('last_release_date', 'Unknown')}` (`{dep.get('days_since_last_release', 'Unknown')}` days ago)
*   **Python Version Constraint:** `{dep.get('requires_python', 'Unspecified')}`
*   **Observed Risk Indicators:**
{risk_indicators}"""
            dep_sections.append(dep_section)
        section1 = "\n\n".join(dep_sections)
    else:
        section1 = "No at-risk dependencies detected."
    
    # Section 2: Usage Locations
    usage_sections = []
    for dep in scan_evidence.get("dependencies", []):
        usages = dep.get("usage_locations", [])
        if usages:
            usage_lines = []
            for u in usages:
                usage_lines.append(f"    *   `{u['file']}:Line {u['line']}` — `{u['statement']}`")
            usage_sections.append(f"### {dep['package']}\n" + "\n".join(usage_lines))
    
    section2 = "\n\n".join(usage_sections) if usage_sections else "No usage locations found."
    
    # Section 3: AI Recommendations (per at-risk dep)
    ai_sections = []
    for dep in at_risk_deps:
        ai_sections.append(f"""### {dep['package']} Migration Strategy
*   **Recommended Replacement Package:** `[AI TO FILL]`
*   **Why This Replacement Fits:** `[AI TO FILL]`
*   **Step-by-Step Migration Plan:**
    1.  `[AI TO FILL]`
    2.  `[AI TO FILL]`
    3.  `[AI TO FILL]`""")
    section3 = "\n\n".join(ai_sections) if ai_sections else "*   No at-risk dependencies requiring migration."
    
    # Section 4: Suggested Tests
    section4 = """*   Run full test suite after migration
*   Verify critical user-facing workflows
*   Check for runtime warnings or deprecation notices"""
    
    # Section 5: Test Results
    baseline_exit = baseline_results.get("steps", [])[-1].get("exit_code", "N/A") if baseline_results.get("steps") else "N/A"
    baseline_passed = baseline_results.get("overall_test_passed", False)
    baseline_summary = "PASSED" if baseline_passed else "FAILED"
    if baseline_results.get("steps"):
        last_step = baseline_results["steps"][-1]
        if last_step.get("stderr"):
            baseline_summary += f" — {last_step['stderr'][:300]}"
    
    swap_exit = "N/A"
    swap_summary = "Not executed"
    if swap_results:
        swap_exit = swap_results.get("steps", [])[-1].get("exit_code", "N/A") if swap_results.get("steps") else "N/A"
        swap_passed = swap_results.get("overall_test_passed", False)
        swap_summary = "PASSED" if swap_passed else "FAILED"
        if swap_results.get("steps"):
            last_step = swap_results["steps"][-1]
            if last_step.get("stderr"):
                swap_summary += f" — {last_step['stderr'][:300]}"
    
    section5 = f"""*   **Baseline Test Suite (`pytest` with original dependencies):**
    *   **Exit Code:** `{baseline_exit}`
    *   **Observed Output Summary:** `{baseline_summary}`
*   **Migration Test Suite (`pytest` after package swap/refactor):**
    *   **Exit Code:** `{swap_exit}`
    *   **Observed Output Summary:** `{swap_summary}`"""
    
    # Section 6: Compatibility Gaps
    section6 = """*   **Observed Breaking Changes (from test failure logs):** `[TO BE FILLED FROM SWAP TEST LOGS]`
*   **Open Concerns & Limitations:** `[AI TO FILL]`"""
    
    # Build complete report
    report = f"""# Dependency Exit Capsule: {repo_name}
**Generated Timestamp:** {timestamp}
**Python Runtime Environment:** {python_version}

---

## 1. Maintenance Problem & At-Risk Dependencies [VERIFIED OBSERVATION]
*Data extracted directly from repository manifests and live PyPI API metadata.*

{section1}

## 2. Repository Usage Locations [VERIFIED OBSERVATION]
*Static AST analysis of exact import statements and usage footprints across the codebase.*

{section2}

## 3. Proposed Replacement & Migration Strategy [AI RECOMMENDATION]
*AI-generated analysis based on observed usage patterns.*

{section3}

## 4. Suggested Verification Tests [AI RECOMMENDATION]
{section4}

## 5. Executed Test Results [VERIFIED OBSERVATION]
*Actual terminal execution results comparing the original dependency against the replacement.*

{section5}

## 6. Compatibility Gaps & Unresolved Risks [HYBRID ANALYSIS]
{section6}
"""
    
    # Write report
    with open(output_file, "w", encoding="utf-8") as f:
        f.write(report)
    
    print(f"[VERIFIED] Exit Capsule generated: {output_file}")
    return output_file


def main():
    parser = argparse.ArgumentParser(
        description="Dependency Exit Capsule - Analyze any Python repo for dependency risks",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  # Analyze a GitHub repository
  python scripts/run_capsule.py --github-url https://github.com/owner/repo
  
  # Analyze a local repository
  python scripts/run_capsule.py --repo-path /path/to/repo
  
  # Run with swap test for a specific package
  python scripts/run_capsule.py --github-url https://github.com/owner/repo --swap old-pkg new-pkg
"""
    )
    
    input_group = parser.add_mutually_exclusive_group(required=True)
    input_group.add_argument("--github-url", help="GitHub repository URL (e.g., https://github.com/owner/repo)")
    input_group.add_argument("--repo-path", help="Local path to repository")
    
    parser.add_argument("--swap", nargs=2, metavar=("OLD_PKG", "NEW_PKG"),
                        help="Run swap test: uninstall OLD_PKG, install NEW_PKG, then run tests")
    parser.add_argument("--output-dir", default=".", help="Output directory for reports (default: current dir)")
    parser.add_argument("--keep-clone", action="store_true", 
                        help="Keep cloned repository after analysis (default: cleanup temp dir)")
    
    args = parser.parse_args()
    
    # Determine repo path
    temp_dir = None
    repo_path = None
    
    try:
        if args.github_url:
            temp_dir = tempfile.mkdtemp(prefix="exit_capsule_")
            repo_path = clone_github_repo(args.github_url, temp_dir)
        else:
            repo_path = os.path.abspath(args.repo_path)
            if not os.path.exists(repo_path):
                raise ValueError(f"Repository path does not exist: {repo_path}")
        
        print(f"[VERIFIED] Analyzing repository: {repo_path}")
        
        # Define output paths
        output_dir = Path(args.output_dir).resolve()
        output_dir.mkdir(parents=True, exist_ok=True)
        
        scan_output = output_dir / "scan_evidence.json"
        baseline_output = output_dir / "baseline_results.json"
        swap_output = output_dir / "swap_results.json"
        capsule_output = output_dir / "EXIT_CAPSULE.md"
        
        # Phase 1: Scan
        run_scanner(repo_path, str(scan_output))
        scan_evidence = load_json(scan_output)
        
        # Phase 2: Baseline tests
        run_baseline_tests(repo_path, str(baseline_output))
        baseline_results = load_json(baseline_output)
        
        # Phase 3: Swap test (optional)
        swap_results = None
        if args.swap:
            old_pkg, new_pkg = args.swap
            run_swap_test(repo_path, old_pkg, new_pkg, str(swap_output))
            swap_results = load_json(swap_output)
        
        # Phase 4: Generate Exit Capsule
        generate_exit_capsule(
            repo_path=repo_path,
            scan_evidence=scan_evidence,
            baseline_results=baseline_results,
            swap_results=swap_results,
            output_file=str(capsule_output)
        )
        
        print("\n" + "="*60)
        print("DEPENDENCY EXIT CAPSULE COMPLETE")
        print("="*60)
        print(f"Scan Evidence:     {scan_output}")
        print(f"Baseline Results:  {baseline_output}")
        if swap_results:
            print(f"Swap Results:      {swap_output}")
        print(f"Exit Capsule:      {capsule_output}")
        
    finally:
        # Cleanup
        if temp_dir and not args.keep_clone:
            print(f"[VERIFIED] Cleaning up temporary directory: {temp_dir}")
            shutil.rmtree(temp_dir, ignore_errors=True)


if __name__ == "__main__":
    main()