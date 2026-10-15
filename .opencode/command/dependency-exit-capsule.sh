#!/usr/bin/env bash
# Dependency Exit Capsule - OpenCode Command Wrapper

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SKILL_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"

# Parse arguments
REPO=""
SWAP_OLD=""
SWAP_NEW=""
KEEP_CLONE=false

while [[ $# -gt 0 ]]; do
    case $1 in
        --swap)
            SWAP_OLD="$2"
            SWAP_NEW="$3"
            shift 3
            ;;
        --keep-clone)
            KEEP_CLONE=true
            shift
            ;;
        -*)
            echo "Unknown option: $1"
            exit 1
            ;;
        *)
            if [[ -z "$REPO" ]]; then
                REPO="$1"
            else
                echo "Multiple repo arguments provided"
                exit 1
            fi
            shift
            ;;
    esac
done

if [[ -z "$REPO" ]]; then
    echo "Usage: $0 <github-url|local-path> [--swap old-pkg new-pkg] [--keep-clone]"
    exit 1
fi

# Build command
CMD=(python "$SKILL_ROOT/scripts/run_capsule.py")

if [[ "$REPO" =~ ^https://github\.com/ ]]; then
    CMD+=(--github-url "$REPO")
else
    CMD+=(--repo-path "$REPO")
fi

if [[ -n "$SWAP_OLD" && -n "$SWAP_NEW" ]]; then
    CMD+=(--swap "$SWAP_OLD" "$SWAP_NEW")
fi

if [[ "$KEEP_CLONE" == true ]]; then
    CMD+=(--keep-clone)
fi

# Run from skill root so outputs go to current working directory
cd "$SKILL_ROOT"
exec "${CMD[@]}"