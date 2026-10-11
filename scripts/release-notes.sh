#!/usr/bin/env bash
# Prints the CHANGELOG.md section of the given version (e.g. 0.24.0).
set -euo pipefail
cd "$(dirname "$0")/.."
awk -v v="$1" '
  $0 ~ "^## \\[" v "\\]" {on=1; next}
  on && /^## \[/ {exit}
  on && /^---$/ {next}
  on {print}
' CHANGELOG.md
