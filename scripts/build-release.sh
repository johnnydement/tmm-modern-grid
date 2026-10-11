#!/usr/bin/env bash
# Builds the release zips into dist/.
#   Usage: scripts/build-release.sh [version]     (default: taken from CHANGELOG.md)
set -euo pipefail
cd "$(dirname "$0")/.."
command -v zip >/dev/null || { echo "zip is required" >&2; exit 1; }
bash scripts/check-sync.sh

version="${1:-$(grep -m1 -oE '^## \[[0-9]+\.[0-9]+\.[0-9]+\]' CHANGELOG.md | grep -oE '[0-9]+\.[0-9]+\.[0-9]+')}"
rm -rf dist && mkdir -p dist
tmp="$(mktemp -d)"; trap 'rm -rf "$tmp"' EXIT

for t in ModernMovies ModernTVShows ModernCollections; do
  zip -qr "dist/$t.zip" "$t" -x '*.DS_Store'
done

# Landing page: files that go in the ROOT of the site.
zip -qj dist/ModernGrid-Home.zip Home/index.html Home/stats.html Home/config.js

# Everything, with a hint of where each part goes.
mkdir -p "$tmp/ModernGrid-all/tmm-templates" "$tmp/ModernGrid-all/site-root"
cp -r ModernMovies ModernTVShows ModernCollections "$tmp/ModernGrid-all/tmm-templates/"
cp Home/index.html Home/stats.html Home/config.js "$tmp/ModernGrid-all/site-root/"
cp README.md CHANGELOG.md LICENSE "$tmp/ModernGrid-all/"
(cd "$tmp" && zip -qr "$OLDPWD/dist/ModernGrid-all.zip" ModernGrid-all -x '*.DS_Store')

echo "Built version $version:"; ls -l dist
