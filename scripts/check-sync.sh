#!/usr/bin/env bash
# Verifies that the shared app.js is byte-identical in the three templates.
set -euo pipefail
cd "$(dirname "$0")/.."
ok=1
for t in ModernTVShows ModernCollections; do
  if ! cmp -s ModernMovies/app.js "$t/app.js"; then
    echo "ERROR: $t/app.js differs from ModernMovies/app.js (run scripts/sync-appjs.sh)" >&2
    ok=0
  fi
done
[ "$ok" = 1 ] && echo "app.js in sync"
[ "$ok" = 1 ]
