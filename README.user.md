# typeui.sh User Guide

This guide is for end users who run the `typeui.sh` CLI in a project to generate and maintain design-system skill files.

## What typeui.sh does

`typeui.sh` asks you a series of interactive questions about your design system, then generates `SKILL.md` files for coding agents.

- Universal target is always generated: `.agents/skills/design-system/SKILL.md`
- You can optionally generate additional agent-specific files during the provider selection step.

## Before you start

- Node.js 18+ recommended
- A valid license key from your Polar purchase
- Internet access to reach `https://typeui.sh/api/license/verify`

## Install and run

Use the published CLI (recommended for end users):

```bash
npx typeui.sh --help
```

Or if the package is already installed globally:

```bash
typeui.sh --help
```

## License key activation (Polar purchase)

### 1) Get your license key

After purchase, Polar provides your license key. Copy it exactly.

### 2) Verify against the default endpoint

`typeui.sh` verifies your key directly with:

- `https://typeui.sh/api/license/verify`

### 3) Activate in CLI

Run:

```bash
npx typeui.sh verify
```

You will be prompted for:

- `License key:` (hidden input)

If valid, the CLI caches your license locally in:

- `~/.typeui-sh/license.json`

Useful license commands:

- `npx typeui.sh license` - show cached license status
- `npx typeui.sh clear-cache` - clear local cache and force re-verification

## Generate design-system skills

Run:

```bash
npx typeui.sh generate
```

### Provider selection behavior

At the start of the flow:

- `.agents/skills` is included automatically
- A short list is shown so you know which agents are covered by the universal target
- You can select additional optional provider targets

### Design-system interview flow

You will be prompted for:

1. Product basics
   - Product name
   - Brand summary
2. Visual style directions
   - Multi-select preset list (+ optional custom values)
3. Typography
   - Typography scale strategy (exactly one selected)
   - Primary UI font family (Google Fonts, choose one)
   - Display/heading font family (Google Fonts, choose one)
   - Monospace font family (Google Fonts, choose one)
   - Core font weights (checkbox list, all selected by default)
4. Color palette
   - Palette guidance presets (+ optional custom values)
   - Token values for primary, secondary, success, warning, danger, surface, text
5. Spacing
   - Spacing scale guidance (exactly one selected)
6. Component families
   - Multi-select list (+ optional custom values)
7. Accessibility requirements
   - Multi-select list (+ optional custom values)
8. Writing tone
   - Multi-select list (+ optional custom values)
9. Rules
   - Design DO rules (multi-select + optional custom)
   - Design DON'T rules (multi-select + optional custom)

## Update existing skill files

If files already exist, you can update selected design-system fields:

```bash
npx typeui.sh update
```

The CLI will:

- Read existing managed content
- Ask which fields to update
- Rewrite only the managed block in each `SKILL.md`

## Preview changes without writing files

Use `--dry-run` with generate or update:

```bash
npx typeui.sh generate --dry-run
npx typeui.sh update --dry-run
```

## Select providers from CLI options

You can bypass interactive provider selection:

```bash
npx typeui.sh generate --providers cursor,claude-code,mistral-vibe
```

Notes:

- Provider keys are comma-separated.
- Universal target (`.agents/skills`) is still included automatically.

## Where files are written

Every generated target writes:

- `.../skills/design-system/SKILL.md`

Examples:

- `.agents/skills/design-system/SKILL.md` (always)
- `.cursor/skills/design-system/SKILL.md`
- `.claude/skills/design-system/SKILL.md`
- `.codex/skills/design-system/SKILL.md`
- `.opencode/skills/design-system/SKILL.md`

## Troubleshooting

- **"License verification failed"**
  - Check your key.
  - Confirm you can reach `https://typeui.sh/api/license/verify`.
- **"No cached license"**
  - Run `npx typeui.sh verify`.
- **"No existing managed design system found" on update**
  - Run `npx typeui.sh generate` first.
- **Wrong files generated**
  - Re-run with `--dry-run` to verify target paths before writing.
