# Registry Source (GitHub)

This document captures how CLI registry commands resolve data from the GitHub repository:

- [https://github.com/bergside/awesome-design-skills](https://github.com/bergside/awesome-design-skills)

## Index source used by `list` and `pull`

Both commands read:

- `GET https://raw.githubusercontent.com/bergside/awesome-design-skills/main/skills/index.json`

Expected shape:

```json
{
  "paper": {
    "slug": "paper",
    "name": "Paper",
    "skillPath": "skills/paper/SKILL.md",
    "designPath": "skills/paper/DESIGN.md"
  }
}
```

`designPath` is optional. If omitted, CLI infers it from `skillPath` by replacing `SKILL.md` with `DESIGN.md`.

The CLI maps each index entry to:

- `name` -> display name
- `slug` -> selection and pull key
- `previewUrl` -> repository page (`/tree/main/skills/<slug>`)
- `hasSkillMd` -> `true` when `skillPath` is non-empty
- `hasDesignMd` -> `true` when `designPath` is non-empty, or when inferred from `skillPath`

## Pull behavior

For `pull <slug> --format skill`:

1. Validate slug format locally.
2. Read `skills/index.json`.
3. Resolve `index[slug].skillPath`.
4. Fetch markdown from raw GitHub URL:
   - `GET https://raw.githubusercontent.com/bergside/awesome-design-skills/main/<skillPath>`

For `pull <slug> --format design`:

1. Validate slug format locally.
2. Read `skills/index.json`.
3. Resolve `index[slug].designPath` (or infer from `skillPath` when omitted).
4. Fetch markdown from raw GitHub URL:
   - `GET https://raw.githubusercontent.com/bergside/awesome-design-skills/main/<designPath>`

On success, response is markdown text (`text/markdown` or plain text accepted).

Common failure reasons surfaced by CLI:

- `not_found` (missing slug in index or missing markdown file)
- invalid index JSON/shape
- network/unreachable raw GitHub URLs
