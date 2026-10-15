import ast
import json
import os
import re
import argparse
from datetime import datetime, timezone
import urllib.request
import urllib.error

try:
    import tomllib
except ImportError:
    import tomli as tomllib

def parse_requirements(repo_path):
    """Extracts package names from requirements.txt, pyproject.toml, or setup.py."""
    packages = []
    
    # 1. requirements.txt
    req_file = os.path.join(repo_path, "requirements.txt")
    if os.path.exists(req_file):
        with open(req_file, "r", encoding="utf-8") as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith("#"):
                    pkg = re.split(r'[=<>!~;\[]', line)[0].strip()
                    if pkg:
                        packages.append(pkg)
    
    # 2. pyproject.toml - [project] dependencies and optional-dependencies
    pyproject_file = os.path.join(repo_path, "pyproject.toml")
    if os.path.exists(pyproject_file):
        try:
            with open(pyproject_file, "rb") as f:
                data = tomllib.load(f)
            
            # Main dependencies
            project = data.get("project", {})
            for dep in project.get("dependencies", []):
                pkg = re.split(r'[=<>!~;\[]', dep)[0].strip()
                if pkg:
                    packages.append(pkg)
            
            # Optional dependencies
            optional_deps = project.get("optional-dependencies", {})
            for extra_deps in optional_deps.values():
                for dep in extra_deps:
                    pkg = re.split(r'[=<>!~;\[]', dep)[0].strip()
                    if pkg:
                        packages.append(pkg)
            
            # Dependency groups (for test dependencies, etc.)
            dep_groups = data.get("dependency-groups", {})
            for group_deps in dep_groups.values():
                for dep in group_deps:
                    pkg = re.split(r'[=<>!~;\[]', dep)[0].strip()
                    if pkg:
                        packages.append(pkg)
        except Exception:
            pass
    
    # 3. requirements-dev.txt, requirements-test.txt, etc.
    for req_variant in ["requirements-dev.txt", "requirements-test.txt", "requirements-ci.txt", "dev-requirements.txt", "test-requirements.txt"]:
        req_file = os.path.join(repo_path, req_variant)
        if os.path.exists(req_file):
            with open(req_file, "r", encoding="utf-8") as f:
                for line in f:
                    line = line.strip()
                    if line and not line.startswith("#") and not line.startswith("-"):
                        pkg = re.split(r'[=<>!~;\[]', line)[0].strip()
                        if pkg:
                            packages.append(pkg)
    
    return list(set(packages))

def check_pypi_metadata(package_name):
    """Queries PyPI JSON API for verifiable release and health metadata."""
    url = f"https://pypi.org/pypi/{package_name}/json"
    req = urllib.request.Request(url, headers={"User-Agent": "MaintenanceAgentSkill/1.0"})
    try:
        with urllib.request.urlopen(req, timeout=10) as response:
            data = json.loads(response.read().decode("utf-8"))
            info = data.get("info", {})
            releases = data.get("releases", {})
            latest_ver = info.get("version", "")
            
            days_Stale = -1
            last_upload = "Unknown"
            if latest_ver and releases.get(latest_ver):
                upload_str = releases[latest_ver][0].get("upload_time_iso_8601")
                if upload_str:
                    upload_dt = datetime.fromisoformat(upload_str.replace("Z", "+00:00"))
                    days_Stale = (datetime.now(timezone.utc) - upload_dt).days
                    last_upload = upload_dt.strftime("%Y-%m-%d")

            classifiers = info.get("classifiers", [])
            is_inactive = any("Inactive" in c or "Mature" in c for c in classifiers)
            
            risk_reasons = []
            if days_Stale > 365:
                risk_reasons.append(f"No release in {days_Stale} days (Last: {last_upload})")
            if is_inactive:
                risk_reasons.append("Marked Inactive in PyPI classifiers")
            if not info.get("requires_python"):
                risk_reasons.append("Missing explicit Python version constraints (requires_python)")

            return {
                "package": package_name,
                "latest_version": latest_ver,
                "last_release_date": last_upload,
                "days_since_last_release": days_Stale,
                "requires_python": info.get("requires_python", "Unspecified"),
                "is_at_risk": len(risk_reasons) > 0,
                "risk_indicators": risk_reasons
            }
    except Exception as e:
        return {
            "package": package_name,
            "is_at_risk": True,
            "risk_indicators": [f"Failed to verify on PyPI: {str(e)}"]
        }

def find_ast_usages(repo_path):
    """Scans all .py files using AST to record exact import locations."""
    usages = {}
    for root, dirs, files in os.walk(repo_path):
        # Skip virtual environments and hidden folders
        dirs[:] = [d for d in dirs if not d.startswith(".") and d not in ("venv", "env", "__pycache__", "node_modules")]
        for file in files:
            if file.endswith(".py"):
                full_path = os.path.join(root, file)
                rel_path = os.path.relpath(full_path, repo_path)
                try:
                    with open(full_path, "r", encoding="utf-8") as f:
                        tree = ast.parse(f.read(), filename=rel_path)
                    for node in ast.walk(tree):
                        if isinstance(node, ast.Import):
                            for alias in node.names:
                                root_pkg = alias.name.split(".")[0].lower()
                                usages.setdefault(root_pkg, []).append({
                                    "file": rel_path,
                                    "line": node.lineno,
                                    "statement": f"import {alias.name}"
                                })
                        elif isinstance(node, ast.ImportFrom) and node.module:
                            root_pkg = node.module.split(".")[0].lower()
                            imported_items = ", ".join(a.name for a in node.names)
                            usages.setdefault(root_pkg, []).append({
                                "file": rel_path,
                                "line": node.lineno,
                                "statement": f"from {node.module} import {imported_items}"
                            })
                except Exception:
                    continue
    return usages

def main():
    parser = argparse.ArgumentParser(description="Scan repo dependencies and AST usages.")
    parser.add_argument("--repo-path", default=".", help="Path to target repository")
    parser.add_argument("--output", default="scan_evidence.json", help="Output JSON file")
    args = parser.parse_args()

    packages = parse_requirements(args.repo_path)
    ast_usages = find_ast_usages(args.repo_path)

    report = {
        "scan_timestamp": datetime.now(timezone.utc).isoformat(),
        "dependencies": []
    }

    for pkg in packages:
        meta = check_pypi_metadata(pkg)
        # Match package name normalized (e.g. beautifulsoup4 -> bs4 or direct match)
        norm_pkg = pkg.lower().replace("-", "_")
        meta["usage_locations"] = ast_usages.get(norm_pkg, [])
        report["dependencies"].append(meta)

    with open(args.output, "w", encoding="utf-8") as out_f:
        json.dump(report, out_f, indent=2)
    print(f"[VERIFIED] Scan saved to {args.output}")

if __name__ == "__main__":
    main()