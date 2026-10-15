import subprocess
import json
import argparse
import sys
import os
import re
from datetime import datetime, timezone

try:
    import tomllib
except ImportError:
    import tomli as tomllib


def run_command(cmd, cwd):
    """Runs a shell command and captures verifiable stdout/stderr/exit_code."""
    proc = subprocess.run(cmd, cwd=cwd, capture_output=True, text=True)
    return {
        "command": " ".join(cmd),
        "exit_code": proc.returncode,
        "passed": proc.returncode == 0,
        "stdout": proc.stdout[-2000:],  # Keep last 2000 chars for clean reporting
        "stderr": proc.stderr[-2000:]
    }


def find_test_dependencies(repo_path):
    """Find test dependencies from pyproject.toml, requirements files, etc."""
    test_deps = []
    
    # 1. pyproject.toml - [project.optional-dependencies] test, [dependency-groups] test
    pyproject_file = os.path.join(repo_path, "pyproject.toml")
    if os.path.exists(pyproject_file):
        try:
            with open(pyproject_file, "rb") as f:
                data = tomllib.load(f)
            
            # Check [project.optional-dependencies] for test extras
            optional_deps = data.get("project", {}).get("optional-dependencies", {})
            for extra_name, deps in optional_deps.items():
                if "test" in extra_name.lower() or "dev" in extra_name.lower():
                    test_deps.extend(deps)
            
            # Check [dependency-groups] for test group
            dep_groups = data.get("dependency-groups", {})
            for group_name, deps in dep_groups.items():
                if "test" in group_name.lower():
                    test_deps.extend(deps)
        except Exception:
            pass
    
    # 2. requirements files
    for req_file in ["requirements-dev.txt", "requirements-test.txt", "requirements-ci.txt", 
                      "dev-requirements.txt", "test-requirements.txt", "requirements.txt"]:
        req_path = os.path.join(repo_path, req_file)
        if os.path.exists(req_path):
            with open(req_path, "r", encoding="utf-8") as f:
                for line in f:
                    line = line.strip()
                    if line and not line.startswith("#") and not line.startswith("-"):
                        pkg = re.split(r'[=<>!~;\[]', line)[0].strip()
                        if pkg:
                            test_deps.append(pkg)
    
    # 3. setup.py - tests_require
    setup_file = os.path.join(repo_path, "setup.py")
    if os.path.exists(setup_file):
        try:
            with open(setup_file, "r", encoding="utf-8") as f:
                content = f.read()
            # Simple regex to find tests_require
            import ast
            tree = ast.parse(content)
            for node in ast.walk(tree):
                if isinstance(node, ast.Call):
                    for kw in node.keywords:
                        if kw.arg == "tests_require" and isinstance(kw.value, ast.List):
                            for elt in kw.value.elts:
                                if isinstance(elt, ast.Constant):
                                    test_deps.append(elt.value)
        except Exception:
            pass
    
    return list(set(test_deps))


def install_test_dependencies(repo_path, results):
    """Install test dependencies if they exist."""
    test_deps = find_test_dependencies(repo_path)
    if test_deps:
        print(f"[VERIFIED] Installing test dependencies: {', '.join(test_deps)}")
        # Install the package in editable mode with test extras if pyproject.toml has them
        pyproject_file = os.path.join(repo_path, "pyproject.toml")
        has_test_extra = False
        if os.path.exists(pyproject_file):
            try:
                with open(pyproject_file, "rb") as f:
                    data = tomllib.load(f)
                optional_deps = data.get("project", {}).get("optional-dependencies", {})
                if "test" in optional_deps or "dev" in optional_deps:
                    has_test_extra = True
                    # Try to install with test extra
                    extra_name = "test" if "test" in optional_deps else "dev"
                    results["steps"].append(run_command(
                        [sys.executable, "-m", "pip", "install", "-e", f".[{extra_name}]"], repo_path))
            except Exception:
                pass
        
        if not has_test_extra:
            # Fallback: install individual test deps
            results["steps"].append(run_command(
                [sys.executable, "-m", "pip", "install"] + test_deps, repo_path))
    else:
        print("[VERIFIED] No test dependencies found to install")


def main():
    parser = argparse.ArgumentParser(description="Execute verifiable test runs.")
    parser.add_argument("--repo-path", default=".", help="Path to repository")
    parser.add_argument("--mode", choices=["baseline", "swap"], required=True)
    parser.add_argument("--old-pkg", help="Package to uninstall in swap mode")
    parser.add_argument("--new-pkg", help="Replacement package to install in swap mode")
    parser.add_argument("--output", default="test_results.json", help="Output JSON file")
    parser.add_argument("--skip-install", action="store_true", help="Skip test dependency installation")
    args = parser.parse_args()

    results = {
        "execution_timestamp": datetime.now(timezone.utc).isoformat(),
        "python_version": sys.version,
        "mode": args.mode,
        "steps": []
    }

    if args.mode == "swap" and args.old_pkg and args.new_pkg:
        # Uninstall old dependency and install candidate replacement
        results["steps"].append(run_command([sys.executable, "-m", "pip", "uninstall", "-y", args.old_pkg], args.repo_path))
        results["steps"].append(run_command([sys.executable, "-m", "pip", "install", args.new_pkg], args.repo_path))

    # Install test dependencies before running tests
    if not args.skip_install:
        install_test_dependencies(args.repo_path, results)

    # Run pytest
    pytest_res = run_command([sys.executable, "-m", "pytest", "-v"], args.repo_path)
    results["steps"].append(pytest_res)
    results["overall_test_passed"] = pytest_res["passed"]

    with open(args.output, "w", encoding="utf-8") as f:
        json.dump(results, f, indent=2)
    print(f"[VERIFIED] Test execution complete. Saved to {args.output}")


if __name__ == "__main__":
    main()