# Supply-Chain Preflight Review: solace-dev-tutorials

**Verdict:** NOT YET — 3 blocking issues
**Scope:** Readiness to enable GitHub Actions; focus on supply-chain worm resistance.

## TL;DR
No active compromise or IOC signatures detected. The main gap is that every action in both workflows is pinned to a mutable ref (branch or tag), meaning a compromised upstream action auto-propagates into CI. Missing `permissions:` blocks leave the default token scope wider than needed.

## Gating decision
Fix the three HIGH findings (pin all actions to commit SHAs) before enabling. The two MEDIUM findings (add `permissions:` blocks and `persist-credentials: false`) should follow immediately — they take five minutes and meaningfully shrink blast radius. The LOW items (Dependabot, CODEOWNERS) can come after Actions is running.

## ✅ Already solid
- No IOC signatures matched (no exfil URLs, `curl | sh`, TruffleHog, `eval(atob`)
- No npm `postinstall`/`preinstall`/`prepare` lifecycle scripts in any `package.json`
- Zero committed `node_modules/` files — `.gitignore` already excludes them
- No committed `.env` files or hardcoded secrets in tracked source
- All `^`/`~` dep ranges in `package.json` are backed by committed lockfiles (`package-lock.json`, `gatsby-source-git/package-lock.json`) — blunts the floating-range risk
- `pull_request_target` not used — `brokenlinks_PR.yml` correctly uses the plain `pull_request` trigger, so fork-PR code runs without base-repo secrets in scope
- `github.event.pull_request.number` interpolated as an action `with:` input (not into a `run:` bash script), and PR numbers are integers — not a shell-injection path

## 🔴 Findings (prioritized)

### 1. (HIGH) All five action uses pinned to mutable refs
**Where:**
- `.github/workflows/brokenlinks.yml:13` — `actions/checkout@master`
- `.github/workflows/brokenlinks.yml:14` — `gaurav-nelson/github-action-markdown-link-check@v1`
- `.github/workflows/brokenlinks_PR.yml:9` — `actions/checkout@master`
- `.github/workflows/brokenlinks_PR.yml:11` — `dawidd6/action-checkout-pr@v1`
- `.github/workflows/brokenlinks_PR.yml:14` — `gaurav-nelson/github-action-markdown-link-check@v1`

**Why it matters:** Tags and branches are mutable — a compromised upstream maintainer can silently repoint them to attacker code. The push/schedule workflow (`brokenlinks.yml`) runs in a secrets-bearing context; a trojanized action can steal `GITHUB_TOKEN` and use it to push malicious workflows. `@master` is a branch reference, the most mutable form of all. The two third-party actions (`gaurav-nelson/`, `dawidd6/`) are the highest concern.

**Fix:** Resolve each tag/branch to its full 40-char commit SHA and pin to that. Keep the human-readable ref as a comment.

```bash
# Resolve SHAs (run these, then paste the output into the workflow files)
gh api repos/actions/checkout/git/refs/heads/master --jq .object.sha
gh api repos/gaurav-nelson/github-action-markdown-link-check/git/refs/tags/v1 --jq .object.sha
gh api repos/dawidd6/action-checkout-pr/git/refs/tags/v1 --jq .object.sha
```

Example result in workflow:
```yaml
- uses: actions/checkout@<40-char-sha>  # master
- uses: gaurav-nelson/github-action-markdown-link-check@<40-char-sha>  # v1
```

---

### 2. (MEDIUM) Both workflows missing top-level `permissions:` block
**Where:** `.github/workflows/brokenlinks.yml`, `.github/workflows/brokenlinks_PR.yml` (entire files)

**Why it matters:** Without an explicit `permissions:` block, the workflow inherits the repo/org default `GITHUB_TOKEN` scope — commonly `contents: write`. A worm that exfils this token can push commits and create or modify workflows.

**Fix:** Add least-privilege permissions at the top of each workflow file. These workflows only read the repo and check links — they need no write scope at all.

```yaml
permissions:
  contents: read
```

---

### 3. (MEDIUM) `actions/checkout` steps missing `persist-credentials: false`
**Where:**
- `.github/workflows/brokenlinks.yml:13`
- `.github/workflows/brokenlinks_PR.yml:9`

**Why it matters:** By default, `actions/checkout` writes `GITHUB_TOKEN` into `.git/config`. Any subsequent step (including a compromised action) can read that token from the filesystem, even if it's not passed via env vars.

**Fix:** Neither workflow needs to push or authenticate after checkout, so disable credential persistence:

```yaml
- uses: actions/checkout@<sha>  # master
  with:
    persist-credentials: false
```

---

### 4. (LOW) No Dependabot configuration
**Where:** `.github/dependabot.yml` — absent

**Why it matters:** Without Dependabot, compromised or yanked package versions aren't flagged automatically, and SHA-pinned actions will never receive automated update PRs.

**Fix:** Add `.github/dependabot.yml`:

```yaml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule: {interval: "weekly"}
  - package-ecosystem: "github-actions"
    directory: "/"
    schedule: {interval: "weekly"}
```

---

### 5. (LOW) No CODEOWNERS file
**Where:** `.github/CODEOWNERS` — absent

**Why it matters:** Without CODEOWNERS, any contributor with merge rights can silently modify `.github/workflows/` without a designated reviewer. Combined with a stolen contributor token, this is the workflow-injection path.

**Fix:** Add `.github/CODEOWNERS` requiring a review from a trusted owner on workflow changes:

```
.github/workflows/ @<your-github-org-or-team>
```

---

## GitHub org/repo settings to configure when enabling Actions

These are outside the code — set them in GitHub repository/org Settings:

- **Settings → Actions → General → Workflow permissions** → set to "Read repository contents and packages permissions" (read-only default token)
- **Allowed actions** → "Allow select actions" + require actions to be pinned to a full-length commit SHA
- **Fork pull request workflows** → require approval for all outside collaborators before workflows run
- **Branch protection on `master`** + required review on `.github/workflows/**` via CODEOWNERS
- Enable **Dependabot alerts**, **secret scanning**, and **push protection**

## Next steps

1. **Immediately:** Pin all five action uses to commit SHAs (Finding 1) — this is the blocking gate.
2. **Same PR:** Add `permissions: contents: read` to both workflows and set `persist-credentials: false` on checkout steps (Findings 2 & 3).
3. **Follow-up PR:** Add `dependabot.yml` and `CODEOWNERS` (Findings 4 & 5).
4. After merging those fixes, configure the GitHub org/repo settings listed above.

Would you like me to implement the Critical/High fixes on a branch and open a PR?
