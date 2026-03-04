# typeui.sh

`typeui.sh` is a paid CLI that interviews your team about design-system decisions and generates provider-specific skill markdown files for:

- Codex
- Cursor
- Claude Code
- Open Code

It can also update existing files in-place using a managed block so your manual notes are preserved.

## Install and run

For local development:

```bash
npm install
npm run build
node dist/cli.js --help
```

Published usage target:

```bash
npx typeui.sh init
```

## Commands

- `typeui.sh verify` - verify Polar purchase and cache a local license.
- `typeui.sh license` - show current cached license status.
- `typeui.sh clear-cache` - remove all local cache state (`~/.typeui-sh`).
- `typeui.sh init` - verify + prompt + generate files.
- `typeui.sh generate` - generate files after license verification.
- `typeui.sh update` - update existing files (managed section only).

Shared options:

- `--providers codex,cursor,claude-code,open-code`
- `--dry-run`

## License verification

This CLI is gated by purchase verification.

Verification endpoint:

- `https://typeui.sh/api/license/verify` (fixed)

For `npx` distribution, do not require shared secrets in the CLI. Instead:

- Keep the Polar API token only on your server.
- Let the CLI send the license key to your server over HTTPS.
- Have your server verify the key directly with Polar and return only a minimal verdict payload.
- Add server-side protections (rate limiting, request logging, abuse controls).

Expected verification request payload:

```json
{
  "licenseKey": "1C285B2D-6CE6-4BC7-B8BE-ADB6A7E304DA"
}
```

Expected verification response payload:

```json
{
  "valid": true,
  "reason": "active",
  "status": "granted"
}
```

On success, `typeui.sh` stores a minimal cache record at `~/.typeui-sh/license.json`.
The local verification cache is short-lived unless your server returns an explicit `expiresAt` or `expires_at`.

## Generated file paths

- `.codex/skills/design-system/SKILL.md`
- `.cursor/skills/design-system/SKILL.md`
- `.claude/skills/design-system/SKILL.md`
- `.opencode/skills/design-system/SKILL.md`

Each file uses these markers for safe updates:

- `<!-- TYPEUI_SH_MANAGED_START -->`
- `<!-- TYPEUI_SH_MANAGED_END -->`

Only content between markers is replaced during updates.

## Development

```bash
npm run typecheck
npm run test
npm run build
```
