# Design System Skill Blueprint

Canonical source-of-truth blueprint for authoring reusable `skill.md` files for design systems across repositories.

## Purpose

Use this blueprint to keep design-system skills consistent, implementation-ready, and SEO-friendly when published or indexed in docs.

## Authoring Rules

- Keep language concise and operational.
- Prefer explicit rules over vague styling advice.
- Use measurable constraints (tokens, states, thresholds).
- Write in implementation-first order: foundations, components, accessibility, QA.
- Use consistent terminology across the entire file.

## Required `skill.md` Structure

```md
---
name: design-system-[brand-or-scope]
description: Creates implementation-ready design-system guidance with tokens, component behavior, and accessibility standards. Use when creating or updating UI rules, component specifications, or design-system documentation.
---

<!-- OPTIONAL MANAGED BLOCK MARKERS -->
<!-- TYPEUI_SH_MANAGED_START -->

# [Design System Name]

## Mission
One paragraph describing the system objective and target product experience.

## Brand
- Product/brand: [name]
- Audience: [primary users]
- Product surface: [web app, marketing site, dashboard, mobile web]

## Style Foundations
- Visual style: [keywords]
- Typography scale: [token list]
- Color palette: [semantic tokens + values]
- Spacing scale: [token list]
- Radius/shadow/motion tokens: [if applicable]

## Component Families
- buttons
- inputs
- forms
- navigation
- overlays
- feedback
- data display
- etc.

## Accessibility
- Target: WCAG 2.2 AA
- Keyboard-first interactions required
- Focus-visible rules required
- Contrast constraints required

## Writing Tone
concise, confident, implementation-focused

## Rules: Do
- Use semantic tokens, not raw hex values in component guidance.
- Define all required states: default, hover, focus-visible, active, disabled, loading, error.
- Specify responsive behavior and edge-case handling.

## Rules: Don't
- Do not allow low-contrast text or hidden focus indicators.
- Do not introduce one-off spacing or typography exceptions.
- Do not use ambiguous labels or non-descriptive actions.

## Guideline Authoring Workflow
1. Restate design intent in one sentence.
2. Define foundations and tokens.
3. Define component anatomy, variants, and interactions.
4. Add accessibility acceptance criteria.
5. Add anti-patterns and migration notes.
6. End with QA checklist.

## Required Output Structure
- Context and goals
- Design tokens and foundations
- Component-level rules (anatomy, variants, states, responsive behavior)
- Accessibility requirements and testable acceptance criteria
- Content and tone standards with examples
- Anti-patterns and prohibited implementations
- QA checklist

## Component Rule Expectations
- Include keyboard, pointer, and touch behavior.
- Include spacing and typography token requirements.
- Include long-content, overflow, and empty-state handling.

## Quality Gates
- Every non-negotiable rule uses "must".
- Every recommendation uses "should".
- Every accessibility rule is testable in implementation.
- Prefer system consistency over local visual exceptions.

<!-- TYPEUI_SH_MANAGED_END -->
```

## Repo-Specific Variables To Replace

- `[brand-or-scope]` in `name`
- System name and mission
- Token values (typography, colors, spacing, motion)
- Component family list based on product scope
- Any framework-specific implementation notes

## Optional Extensions

- `reference.md` for deep component specs and rationale
- `examples.md` for positive/negative UI examples
- `scripts/` for linting or validating generated guidance

## Acceptance Checklist

- Frontmatter exists with valid `name` and `description`.
- Guidance is under 500 lines for `skill.md` when possible.
- Accessibility and interaction states are explicitly documented.
- Rules are concrete, testable, and non-ambiguous.
- Output can be reused in other repositories with only variable replacement.
