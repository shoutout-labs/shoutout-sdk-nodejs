#!/usr/bin/env bash
# Publish the package to npm with public access.
# Usage: scripts/publish.sh <otp>
set -euo pipefail

OTP="${1:-}"
if [ -z "$OTP" ]; then
  echo "Usage: scripts/publish.sh <otp>" >&2
  exit 1
fi

cd "$(dirname "$0")/.."

if [ -n "$(git status --porcelain)" ]; then
  echo "Working tree is not clean. Commit or stash changes before publishing." >&2
  exit 1
fi

VERSION="$(node -p "require('./package.json').version")"
NAME="$(node -p "require('./package.json').name")"

if npm view "$NAME@$VERSION" version >/dev/null 2>&1; then
  echo "$NAME@$VERSION is already published." >&2
  exit 1
fi

npm publish --access public --otp="$OTP"

git tag "v$VERSION"
git push origin "v$VERSION"

echo "Published $NAME@$VERSION and pushed tag v$VERSION"
