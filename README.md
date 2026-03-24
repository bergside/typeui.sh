```
████████╗██╗   ██╗██████╗ ███████╗██╗   ██╗██╗   ███████╗██╗  ██╗
╚══██╔══╝╚██╗ ██╔╝██╔══██╗██╔════╝██║   ██║██║   ██╔════╝██║  ██║
   ██║    ╚████╔╝ ██████╔╝█████╗  ██║   ██║██║   ███████╗███████║
   ██║     ╚██╔╝  ██╔═══╝ ██╔══╝  ██║   ██║██║   ╚════██║██╔══██║
   ██║      ██║   ██║     ███████╗╚██████╔╝██║██╗███████║██║  ██║
   ╚═╝      ╚═╝   ╚═╝     ╚══════╝ ╚═════╝ ╚═╝╚═╝╚══════╝╚═╝  ╚═╝

Design system skill generator for agentic tools (ie. Claude Code, Open Code, Codex, Cursor, etc)
```

[typeui.sh](https://www.typeui.sh) is an open-source command line interface (CLI) that generates, updates, and can download skill.md files with design system specifications to instruct agentic tools and LLM's to use a certain design when building interfaces.

## Getting started

You can start building with TypeUI by using the NPX command:

```bash
npx typeui.sh --help
```

## Design systems

Check out all [design systems](https://typeui.sh/design-skills) that can be pulled into your project.

## Available commands

| Command | Description |
| --- | --- |
| `generate` | Run the interactive design system prompts and generate skill files. |
| `update` | Update existing managed skill content in generated files. |
| `pull <slug>` | Pull a registry skill from `bergside/awesome-design-skills` and write it to selected provider paths. |
| `list` | Show available registry specs from `bergside/awesome-design-skills` (with typeui.sh preview links), then pull one automatically. |
| `verify` | Verify your license key (pro version) and cache local license status. |
| `license` | Show local cached license status. |
| `clear-cache` | Remove local cache state (`~/.typeui-sh`). |

Shared options for `generate` and `update`:

- `-p, --providers <providers>` (comma-separated provider keys)
- `--dry-run` (preview changes without writing files)

Shared options for `pull`:

- `-p, --providers <providers>` (comma-separated provider keys)
- `--dry-run` (preview changes without writing files)

Shared options for `list`:

- `-p, --providers <providers>` (comma-separated providers passed through to auto-pull)
- `--dry-run` (preview pull file changes without writing)

For local development:

```bash
npm install
npm run build
node dist/cli.js --help
```

## License

The CLI is open-source under the MIT License.

## Pro version

Get access to curated design system files by getting the [pro version](https://www.typeui.sh/#pricing) and supporting our work.

## Sponsors

If you'd like to become a sponsor of the project, please [contact us](https://www.bergside.com/contact) on our company website.
