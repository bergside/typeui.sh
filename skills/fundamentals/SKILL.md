---
name: typeui-fundamentals
description: 
license: MIT
metadata:
  author: typeui.sh
---

# Design Fundamentals — Agent Instructions

Universal design principles that define **why** patterns work, **how** to apply them correctly, and **what** accessibility requirements are non-negotiable. These are timeless, design-system-agnostic foundations that apply to every surface regardless of vertical or workflow phase.

## Load order

Read these files **after** loading the design system (`SKILL.md` / `DESIGN.md` + token modules). The design system tells you *what* token to use; these files explain *why* that decision is correct and *how* to avoid common principle violations.

## Module index

| File | Purpose |
|---|---|
| [ui-principles.md](ui-principles.md) | Universal visual design principles — hierarchy, layout rhythm, typography placement, color theory, depth & layering, interaction design, responsive adaptation, component behavior |
| [ux-principles.md](ux-principles.md) | Interaction & control principles — 30 UX laws, button/control state contracts (9 states), hover/active technique palettes, touch targets, cognitive load, feedback loops |
| [typography-principles.md](typography-principles.md) | Typography-specific principles — type system foundations, scale & modular ratios, readability & measure, accessibility, responsive type, brand tone expression through type |
| [accessibility.md](accessibility.md) | WCAG 2.1/2.2 compliance — contrast ratios, color-as-information rules, focus visibility, keyboard navigation, motion safety, target sizes, text spacing, semantic structure, ARIA |

## What these files are NOT

These files do not define:
- **Workflow phases** (think → build → check → ship) — see `skills/vertical/SKILL.md`
- **Quality gates or audits** — see `skills/vertical/inspect.md`, `review.md`, `preflight.md`
- **Anti-pattern catalogs** — see `skills/vertical/anti-patterns.md`
- **Industry-specific content** — see `skills/vertical/team-social-saas.md`
- **Design tokens or component specs** — see `skills/design-system/SKILL.md`

## Conflict resolution

When sources disagree:

1. **Design system** wins for concrete values (colors, sizes, spacing tokens, component specs).
2. **Fundamentals** (this layer) win for structural principles (hierarchy, accessibility, motion logic).
3. **Vertical** wins for process decisions AND content architecture (section order, required sections, industry tone).

Accessibility is non-negotiable at every level — it overrides aesthetic preferences everywhere.

## When the design system is silent, these principles decide

Any design decision not covered by the system's tokens or component rules falls back to the principles here. Never contradict the design system — if a principle and a design-system rule conflict, the design system wins. Flag the conflict for review.
