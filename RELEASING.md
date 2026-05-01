# Releasing n8n-nodes-hyros

This package is published to npm exclusively from GitHub Actions with an [npm provenance statement](https://docs.npmjs.com/generating-provenance-statements). Local `npm publish` is **not used** — the n8n Creator Portal verification process requires every release to be traceable to a CI build.

## Prerequisites (one-time setup)

### 1. NPM access token

The release workflow authenticates to npm using a token stored in the repository secret `NPM_TOKEN`.

Provenance requires either OIDC trusted publishing or a **granular access token** — classic automation tokens are not accepted.

1. Sign in to [npmjs.com](https://www.npmjs.com/) as the package maintainer.
2. Go to **Access Tokens → Generate New Token → Granular Access Token**.
3. Configure:
   - **Token name:** `n8n-nodes-hyros GitHub Actions`
   - **Expiration:** 90 days (rotate before expiry)
   - **Permissions:** `Read and write`
   - **Packages and scopes:** Only select packages → `n8n-nodes-hyros`
4. Copy the token (shown only once).
5. In GitHub: **Settings → Secrets and variables → Actions → New repository secret**
   - Name: `NPM_TOKEN`
   - Value: paste the token

### 2. Workflow permissions

The workflow already declares `id-token: write` in its `permissions:` block (required so npm can verify the build provenance via OIDC). No repo-level setting needs to be changed for this to work.

## Release steps

Replace `X.Y.Z` with the new version (semver — e.g. `2.7.1` for a patch).

1. Make sure `main` is clean and up to date locally.

2. Bump the version (no tag yet — we tag after committing the README/changelog):

   ```bash
   npm version X.Y.Z --no-git-tag-version
   ```

3. Update the **Version History** section of `README.md` with the changes for this release.

4. Stage and commit:

   ```bash
   git add package.json package-lock.json README.md
   git commit -m "chore: release vX.Y.Z"
   ```

5. Tag and push (the tag is what triggers the workflow):

   ```bash
   git tag vX.Y.Z
   git push origin main --tags
   ```

6. Watch the workflow run at **GitHub → Actions → Release**. It will:
   - Verify the `package.json` version matches the tag
   - Run `npm ci`, `npm run build`, `npm run lint`
   - Publish with `npm publish --provenance --access public`

7. After the workflow succeeds, verify the result on npm:
   - Visit https://www.npmjs.com/package/n8n-nodes-hyros
   - Confirm the new version is listed
   - Confirm the **Provenance** badge appears on the version page

## Pre-release sanity check (local, optional but recommended)

Before tagging, run the same checks the workflow runs, plus the official n8n community package scanner:

```bash
npm ci
npm run release:check    # lint + build + n8n scan
```

If `npm run scan` reports issues, address them (or document them) **before** tagging.

## Manual workflow run (recovery)

If a tag was pushed but the workflow failed for a transient reason (e.g. npm registry hiccup), you can re-run it without re-tagging:

- Go to **Actions → Release → Run workflow**
- Provide the existing tag (e.g. `v2.7.1`) as the input

The version-vs-tag check still runs, so you cannot accidentally publish a mismatched build.

## Troubleshooting

| Symptom | Cause | Fix |
|---|---|---|
| Workflow fails at "Verify package.json version matches git tag" | You tagged before bumping `package.json`, or bumped to a different version | Delete the bad tag (`git tag -d vX.Y.Z && git push origin :refs/tags/vX.Y.Z`), fix `package.json`, re-tag |
| `npm publish` fails with `403 Forbidden` | `NPM_TOKEN` is missing, expired, or lacks write access to `n8n-nodes-hyros` | Regenerate a granular token and update the `NPM_TOKEN` secret |
| Provenance badge does not appear on npmjs.com | Token was a classic automation token instead of granular, or `id-token: write` permission was removed | Confirm both, then re-publish a new patch version |
| `npm ERR! code EPUBLISHCONFLICT` | The version already exists on npm | Bump to the next patch and re-tag — published versions cannot be overwritten |
