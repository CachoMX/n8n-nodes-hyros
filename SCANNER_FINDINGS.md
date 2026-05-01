# Scanner & Verification Findings

Findings from running the local verification commands against the current `main` branch (commit `b4d7cb3`, version `2.7.0`). All issues below pre-exist the release-workflow setup work — none were introduced by the workflow / `package.json` / `RELEASING.md` / README changes. They are listed here so you can decide whether to fix or document them before cutting the first CI release.

---

## 1. CRITICAL — `npm run build` fails with `Cannot find name 'fetch'`

```
nodes/Hyros/GenericFunctions.ts(29,27): error TS2304: Cannot find name 'fetch'.
```

**What it is**

`GenericFunctions.ts` line 29 (introduced in commit `224d211` for v2.7.0) calls global `fetch()` directly to bypass n8n's HTTP layer for the PUT-with-body-and-qs workaround. The current `tsconfig.json` only includes `ES2019` in `lib`, and `@types/node` is not in `devDependencies`, so the TypeScript compiler doesn't know about the global `fetch` that ships in Node 18+.

**Why it matters now**

The release workflow runs `npm run build` before publishing. With the build broken, the CI release will fail. Whatever local environment was used to build v2.7.0 must have had `@types/node` cached transitively — a clean `npm install` on a fresh machine (which is exactly what the workflow does) reproduces the error.

**Suggested fix (build/release infrastructure only — no code changes in `nodes/Hyros/`):**

Add `@types/node` to `devDependencies`:

```bash
npm install --save-dev @types/node@^20.0.0
```

That alone makes the global `fetch` typed and resolves the error. No other change required.

I did **not** apply this fix because it adds a new dependency — please confirm before adding.

---

## 2. HIGH — `npm run lint` fails: pattern `nodes` matches no files, plus 21 unknown-rule errors

Running `npm run lint` (which is `eslint nodes credentials package.json`) on the current ESLint 8 fails immediately:

```
ESLint: 8.57.1
No files matching the pattern "nodes" were found.
```

ESLint 8's CLI no longer infers `.ts` from a directory argument by default. Running with `--ext .ts` reveals 21 additional pre-existing errors of the form:

```
Definition for rule 'n8n-nodes-base/node-param-display-name-excess-whitespace' was not found
```

These rules are referenced in `.eslintrc.js` but have been removed/renamed in the installed `eslint-plugin-n8n-nodes-base` version.

**Why it matters now**

The release workflow runs `npm run lint` between build and publish. It will fail.

**Suggested fix (build/release infrastructure only):**

Two changes — both in `package.json` and `.eslintrc.js`, neither touches `nodes/` or `credentials/` source:

1. Update the `lint` script to include the extension:
   ```json
   "lint": "eslint --ext .ts nodes credentials && eslint package.json"
   ```
2. In `.eslintrc.js`, drop or rename the four rules whose definitions no longer exist (`node-param-display-name-miscased`, `node-param-display-name-excess-whitespace`, `node-param-description-excess-final-period`, `node-param-description-excess-inner-whitespace`, `node-param-description-identical-to-display-name`) — verify each against the current `eslint-plugin-n8n-nodes-base` rule list.

I did **not** apply these fixes — please confirm before changing the lint config.

---

## 3. HIGH — No `package-lock.json` is committed (it is in `.gitignore`)

`.gitignore` contains:

```
package-lock.json
```

The release workflow uses `npm ci`, which **requires** a committed lockfile. With the current `.gitignore`, `npm ci` fails with `EUSAGE`.

**Why it matters now**

Both the deterministic-build guarantee and npm provenance benefit from a pinned dependency tree. `npm ci` is the right choice for a release workflow; `npm install` would resolve fresh versions on every CI run, which weakens the provenance signal.

**Suggested fix**

1. Remove the `package-lock.json` line from `.gitignore`.
2. Run `npm install` once locally to regenerate the lockfile.
3. Commit `package-lock.json` to `main` *before* tagging the first CI release.

If you'd rather not commit a lockfile, change the workflow's `npm ci` to `npm install` — but you lose reproducibility. I left `npm ci` in place since that was the spec.

---

## 4. INFO — `npm install` reports vulnerabilities in dev dependencies

```
13 vulnerabilities (7 moderate, 4 high, 2 critical)
```

These come entirely from the dev-dependency tree (gulp 4 chain, eslint 8 chain). They do **not** ship to runtime — `dependencies` is empty and `files` only includes `dist/`. They will not affect users of the published package, but they may show up on the n8n Creator Portal scan.

**Suggested fix (deferred — your call)**

- `npm audit fix` for the non-breaking ones
- For the breaking ones (gulp 5, eslint 9), schedule a separate dev-dependency upgrade PR

---

## 5. INFO — `@n8n/scan-community-package` produced no output on Windows

Running `npm run scan` (the new script) downloaded `@n8n/scan-community-package@0.15.0` via npx but exited with code `1` and produced **no diagnostic output** on this Windows machine. There were also `EPERM` cleanup warnings from npm's `_npx` cache, suggesting a Windows-specific tooling problem rather than scanner findings.

**What this means**

I cannot give you a list of scanner findings from local execution. Two paths forward:

1. **Run the scan from CI / WSL / Linux.** The official scanner is intended to be run in the same kind of clean Linux environment the n8n Creator Portal uses. I recommend either:
   - Running it in WSL locally, or
   - Adding a `scan` job to the release workflow that runs after publish (so it scans the actual published artifact)
2. **Run it after the lockfile/build/lint issues above are fixed.** The scanner downloads the published package from npm; some of its checks may depend on a working `npm pack` of the source.

The scanner script itself is correctly wired (`npm run scan` invokes the right tool with the right package name) — just not producing usable output here.

---

## Suggested order of operations to unblock the first CI release (v2.7.1)

1. Add `@types/node` to `devDependencies` (fixes #1)
2. Update `lint` script and prune obsolete rules from `.eslintrc.js` (fixes #2)
3. Remove `package-lock.json` from `.gitignore`, regenerate it, commit it (fixes #3)
4. Run `npm run release:check` locally to confirm a green build + lint
5. Run the n8n scanner in WSL or Linux to confirm no real findings (#5)
6. Bump version → tag → push → CI publishes with provenance (steps in `RELEASING.md`)

Items #4 (audit) and any scanner findings from #5 can be addressed before or after the first verified release, depending on severity.
