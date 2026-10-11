#!/usr/bin/env bash
# Copies ModernMovies/app.js (the canonical copy) into the other two templates.
set -euo pipefail
cd "$(dirname "$0")/.."
for t in ModernTVShows ModernCollections; do cp ModernMovies/app.js "$t/app.js"; done
echo "app.js synced"
