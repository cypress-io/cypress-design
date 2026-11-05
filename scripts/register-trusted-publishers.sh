#!/usr/bin/env bash
# Registers the npm trusted publisher (GitHub Actions, workflow.yml) for every
# public package in this repo. One-off: run it once, by hand, from the repo root.
#
#   npm login                                  # an account that can publish @cypress-design
#   DRY_RUN=1 scripts/register-trusted-publishers.sh   # print the commands only
#   scripts/register-trusted-publishers.sh
#
# Each package needs its own 2FA approval in the browser, so expect one prompt per
# package. If it stops partway, resume with START_AT=<package name>.
# Needs npm >= 11.15 (for `npm trust`) and Node >= 22.
set -uo pipefail

repo=cypress-io/cypress-design
# npm checks the calling workflow, and release.yml / release-next.yml are both
# called from workflow.yml
file=workflow.yml

cd "$(dirname "$0")/.." || exit 1

if [ -z "${DRY_RUN:-}" ]; then
  npm whoami >/dev/null 2>&1 || { echo "run npm login first" >&2; exit 1; }
fi

packages=$(node -e '
const fs = require("node:fs"), path = require("node:path")
for (const w of require("./package.json").workspaces) {
  for (const d of fs.globSync(w)) {
    const f = path.join(d, "package.json")
    if (!fs.existsSync(f)) continue
    const p = JSON.parse(fs.readFileSync(f, "utf8"))
    if (!p.private) console.log(p.name)
  }
}' | sort)

total=$(wc -l <<<"$packages" | tr -d ' ')
echo "registering $total packages: repo=$repo file=$file"

started=${START_AT:+no}
i=0
failed=()
for pkg in $packages; do
  i=$((i + 1))
  if [ "${started:-yes}" = no ]; then
    [ "$pkg" = "$START_AT" ] || continue
    started=yes
  fi
  echo; echo "== [$i/$total] $pkg"
  cmd=(npm trust github "$pkg" --file "$file" --repo "$repo" --allow-publish -y)
  if [ -n "${DRY_RUN:-}" ]; then echo "${cmd[*]}"; continue; fi
  "${cmd[@]}" || failed+=("$pkg")
done

if [ "${#failed[@]}" -gt 0 ]; then
  echo; echo "FAILED (rerun each with START_AT, or by hand):" >&2
  printf '  %s\n' "${failed[@]}" >&2
  exit 1
fi
echo; echo "done"
