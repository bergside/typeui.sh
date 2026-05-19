# Interaction & Control Principles

Universal interaction principles covering cognitive laws (Fitts', Hick's, Gestalt), 30 UX laws, button/control state contracts, and form/feedback behavior — the reasoning layer for how users interact with interfaces.

---

# UX Laws

A consolidated, opinionated ruleset, written for AI agents and design tools so they can produce, review, or refactor user interfaces that are coherent, learnable, efficient, and respectful of human cognition.

This document is intentionally **stage-agnostic** (research, IA, wireframe, hi‑fi, build, QA) and **medium-agnostic** (web, mobile, desktop, kiosk, voice, watch, TV). Apply the rules at the level of granularity that fits the artifact in front of you.

---

## 0. How agents must use this document

1. **Treat each law as a constraint, not a suggestion.** When you generate, edit, or review UI, run the relevant rules from §3 against the artifact. If a rule is violated, fix it or surface the trade‑off explicitly.
2. **Always consider the whole list, not your favorite three.** Many real UX failures come from over‑applying one law (e.g., aggressive minimalism violating Tesler's Law). Use §4 to resolve conflicts.
3. **Prefer subtraction before addition.** Before adding components, copy, or color, check Occam's Razor, Hick's Law, Choice Overload, and Cognitive Load.
4. **Never invent novelty for its own sake.** Familiarity (Jakob's Law, Mental Models) beats cleverness for almost every primary flow.
5. **Justify every deviation.** If a generated design intentionally breaks a law, the agent must state which law, why, and what compensating control protects the user.
6. **Apply the Universal Checklist (§5) to every screen** before declaring a task done.
7. **Stay accessibility‑first.** None of these laws override WCAG, motion‑sensitivity, color‑contrast, or input‑modality requirements. Where a law and accessibility appear to conflict, accessibility wins and the visual treatment is re‑designed.

---

## 2. Universal Rules (TL;DR)

These are non-negotiable defaults. If the spec doesn't say otherwise, do these.

1. **One primary action per surface.** Make it visually dominant and reachable.
2. **Group related things; separate unrelated things.** Use proximity, common region, similarity, or connectedness — at least one, never zero.
3. **Limit choices in the critical path.** ≤ 5 options per decision point unless the task is comparison.
4. **Hide complexity, don't delete it.** Move advanced options behind progressive disclosure; do not amputate them (Tesler's Law).
5. **Match conventions first, innovate second.** If 80% of comparable apps put X in Y, do the same unless you have data.
6. **Provide feedback within 100 ms; complete or progress within 400 ms.** Below 1 s use a transient indicator, above 1 s use a determinate progress signal.
7. **Show progress, beginnings, and ends.** Every multi‑step flow has a visible map, a clear entry, and an unmistakable end state.
8. **Front-load and end-load delight.** Make the first impression and final moment of a flow noticeably good (Peak‑End Rule, Serial Position Effect).
9. **Reduce memory load.** Recognition over recall: keep prior choices, entered values, and contextual info visible across steps.
10. **Be liberal in what you accept, strict in what you emit.** Inputs forgive, outputs are clean and unambiguous.
11. **Never rely on color alone.** Encode meaning with at least two channels (color + icon, color + text, color + position).
12. **Respect motion-reduction, dark/light, locale, and input-modality preferences.** Always.

---

## 3. The 30 Laws

For each law: **Definition → Why it matters → Agent rules (do / do not) → When to apply → Concrete examples → Conflicts & trade‑offs → Quick checks.**

---

### 3.1 Aesthetic-Usability Effect

> Users perceive aesthetically pleasing designs as more usable, are more tolerant of minor issues, and overlook real defects when the surface is beautiful.

**Why it matters.** Visual quality buys you trust and patience, but it can also mask usability problems and bias user testing.

**Agent rules — DO**
- Apply a coherent type scale, spacing system, color palette, and elevation system on every surface.
- Polish the *first* and *primary* surface of every flow disproportionately well.
- Pair beauty with measured usability data (task success, time on task), not just satisfaction scores.

**Agent rules — DO NOT**
- Do not use polish to disguise broken information architecture.
- Do not assume positive user feedback equals usability — discount surveys when they conflict with task data.
- Do not ship visually inconsistent affordances (e.g., three button styles with the same role).

**Apply when** — Always; particularly on landing, onboarding, paywalls, and demo flows.

**Examples** — Use one button shape per role; align all card metadata to a baseline grid; pick a single icon family.

**Conflicts** — Can over‑rule Postel's Law if "beauty" leads to rejecting valid inputs (e.g., punishing users who type a phone number with spaces).

**Quick check** — Would a screenshot of this surface look intentional next to your top three reference apps?

---

### 3.2 Choice Overload

> Too many options at one decision point degrades decision quality, increases abandonment, and worsens the felt experience even when the user eventually picks.

**Agent rules — DO**
- Cap visible choices at a decision point to **≤ 5**; if more, group, paginate, filter, or recommend.
- Provide a default, "recommended", or "most popular" path.
- Enable side‑by‑side comparison only where comparison is the user's actual job (pricing, plans, products).

**Agent rules — DO NOT**
- Do not present a 12‑item plan grid on a pricing page; collapse to 3–4 tiers + "see all".
- Do not require the user to choose before they can do anything (e.g., persona pickers on first load).
- Do not equate "more options" with "more value".

**Apply when** — Pricing, settings, signup, onboarding personas, product galleries, search filters.

**Examples** — Three pricing tiers with one "Recommended" badge; a filter panel that collapses below the fold; a "Best for you" section above an exhaustive grid.

**Conflicts** — Tesler's Law (the choices may exist, but should be discoverable, not all visible at once).

**Quick check** — How many things can a user click that move the goal forward? If > 5, prune or group.

---

### 3.3 Chunking

> Grouping related items into meaningful units helps users scan, parse, and remember.

**Agent rules — DO**
- Break content into visually distinct groups with clear headings, separators, or containers.
- Group form fields by topic (account, address, payment), not by data type.
- Use 5–9 chunks per group; further nest if more.

**Agent rules — DO NOT**
- Do not present long unbroken lists, paragraphs > 4 lines, or forms > 8 fields without grouping.
- Do not chunk arbitrarily — every group must answer a user question or task.

**Apply when** — Forms, navigation, tables, long-form content, dashboards, settings.

**Examples** — Stepper for checkout (Shipping → Payment → Review); section headers in settings; collapsible groups in a long FAQ.

**Conflicts** — None core; works with Miller's Law and Cognitive Load.

**Quick check** — Can a user describe the page structure in 5 words after a 5‑second look?

---

### 3.4 Cognitive Bias

> Users employ mental shortcuts (heuristics) that systematically distort judgment. Designs can either exploit, accommodate, or counteract these biases.

**Agent rules — DO**
- Anticipate confirmation bias, anchoring, loss aversion, recency, and availability when designing copy, defaults, and comparisons.
- Use defaults responsibly — they are the most powerful design lever and must be in the user's interest.
- Surface evidence and trade‑offs for high‑stakes decisions (price, privacy, deletion).

**Agent rules — DO NOT**
- Do not design dark patterns (forced continuity, confirmshaming, sneaking, obstruction). They violate ethics and most consumer law.
- Do not anchor with fake "compare at" prices or fictitious scarcity.
- Do not preselect upgrades, add‑ons, or marketing consents without explicit opt‑in.

**Apply when** — Pricing, opt‑in flows, destructive actions, comparison UI, financial products.

**Examples** — A clearly labelled "default" plan; loss‑framed copy ("don't lose your data") only when honest; symmetrical confirm/cancel buttons for destructive actions.

**Conflicts** — Aesthetic‑Usability Effect can mask manipulative defaults; ethics override beauty.

**Quick check** — If the user later understood the bias used, would they thank you or sue you?

---

### 3.5 Cognitive Load

> The total mental work an interface demands. Cognitive load = intrinsic (the task itself) + extraneous (the design's noise) + germane (learning).

**Agent rules — DO**
- Strip extraneous load: redundant copy, decorative animation, look‑alike controls, unnecessary fields.
- Carry context across screens (selections, filters, entered data) so the user doesn't re‑build it.
- Use plain language at a 6th–8th grade reading level for primary copy.
- Replace jargon with concrete nouns and verbs.

**Agent rules — DO NOT**
- Do not introduce a new visual language mid‑flow.
- Do not require the user to remember IDs, codes, or values across steps.
- Do not couple form validation messages to fields the user has not yet visited.

**Apply when** — Always.

**Examples** — Sticky summary on checkout; "remember me"; pre‑filled fields from prior context; inline validation only after blur.

**Conflicts** — Tesler's Law (some load is irreducible — locate it intentionally).

**Quick check** — For each element on the screen, ask "what does this earn me toward the user's goal?" If the answer is "nothing", remove it.

---

### 3.6 Doherty Threshold

> Productivity surges when system response stays under ~400 ms. Faster is felt as "instant".

**Agent rules — DO**
- Acknowledge any user input within **100 ms** (focus state, ripple, spinner appearance).
- Complete or show determinate progress within **400 ms**.
- For operations > 1 s, show a determinate progress bar and label what is happening.
- Use optimistic UI for low‑risk mutations (likes, drag‑sort, toggles).
- Use skeleton screens, not blank states or unbounded spinners.

**Agent rules — DO NOT**
- Do not use indeterminate spinners for tasks that have measurable progress.
- Do not block the entire UI for non‑critical operations.
- Do not animate a fake delay just for "premium feel" unless trust calibration is the explicit goal (and even then, < 1 s).

**Apply when** — Every interactive element, every async operation.

**Examples** — Optimistic checkbox toggle; staged "Uploading 3 / 10 files…"; skeleton list while data loads.

**Conflicts** — Aesthetic‑Usability Effect — heavy animation can push you past the 400 ms threshold.

**Quick check** — Time the slowest path on the surface. If > 400 ms with no feedback, fix it.

---

### 3.7 Fitts's Law

> Time to acquire a target is proportional to the distance to it and inversely proportional to its size. Bigger and closer = faster.

**Agent rules — DO**
- Size primary touch targets at **≥ 44 × 44 px** (recommended minimum across platforms), with **≥ 8 px** spacing between adjacent targets.
- Place primary actions at screen edges or corners on desktop (infinite‑width edges) and within the thumb arc on mobile.
- Make the entire labeled row/card clickable, not just an inner button.
- Increase target size in proportion to the cost of mis‑clicking (delete = larger and farther from neighbors).

**Agent rules — DO NOT**
- Do not place destructive actions adjacent to primary actions of similar size.
- Do not require precise hover paths through nested menus without `safeArea`/intent detection.
- Do not depend on icon‑only controls < 24 px without a tooltip and a larger hit area.

**Apply when** — Every interactive control on every viewport.

**Examples** — Bottom‑bar primary CTA on mobile; expanded hit area for icon buttons; menu items that span the full menu width.

**Conflicts** — Choice Overload (large targets compete for attention — limit to one primary).

**Quick check** — Could a user with shaky hands or gloves hit every target without zooming?

---

### 3.8 Flow

> A state of energized focus where challenge matches skill. Interfaces should sustain it by giving feedback, removing friction, and avoiding boredom or frustration.

**Agent rules — DO**
- Provide continuous, low‑intrusion feedback (saving indicator, character count, autosave timestamp).
- Remove modal interruptions during creation tasks (writing, designing, coding).
- Match information density to the user's expertise: progressive disclosure for novices, dense layouts for experts.
- Allow keyboard‑first interaction for power flows.

**Agent rules — DO NOT**
- Do not interrupt with announcements, banners, or upgrade prompts during a focused task.
- Do not break the user's mental train with disruptive route changes mid‑flow.
- Do not auto‑advance the focus or scroll without the user's intent.

**Apply when** — Editors, dashboards, gameplay, design tools, terminal/IDE‑like UIs.

**Examples** — Distraction‑free writing mode; autosave with timestamp; keyboard shortcuts surfaced contextually.

**Conflicts** — Zeigarnik Effect (open loops drive return); Aesthetic‑Usability Effect (decorative motion may break flow).

**Quick check** — Can the expert user drive the surface without touching the mouse for two minutes?

---

### 3.9 Goal-Gradient Effect

> Users accelerate as they perceive themselves nearing a goal. Visible progress is fuel.

**Agent rules — DO**
- Show progress for any task with ≥ 3 steps, ≥ 30 s effort, or unknown duration.
- Pre‑seed progress when honest ("Step 1 of 4 — 25% complete" before the user does anything).
- Celebrate completion explicitly with a clear "done" state.

**Agent rules — DO NOT**
- Do not lie about progress (e.g., 90% then a long stall) — it destroys trust permanently.
- Do not hide remaining effort ("almost done" vs. "2 of 5 steps left").
- Do not reset progress on minor errors.

**Apply when** — Onboarding, checkout, profile completion, training, gamified flows, long uploads.

**Examples** — "Profile 60% complete — add a photo to reach 80%"; checkout breadcrumbs; "1 of 3 lessons" badges.

**Conflicts** — Cognitive Bias (avoid manipulative or fake progress).

**Quick check** — At any step, can the user answer "how much more?" in under 2 seconds?

---

### 3.10 Hick's Law

> Decision time grows with the number and complexity of options.

**Agent rules — DO**
- Reduce options at every branch in the critical path.
- Break complex choices into sequential simpler choices ("type" → "size" → "color").
- Recommend a default for every non‑trivial choice.
- Use progressive onboarding — introduce one feature at a time.

**Agent rules — DO NOT**
- Do not surface every preference, role, or plan on first launch.
- Do not place exploratory options on the critical path.
- Do not flatten a deep menu to a wide one without grouping.

**Apply when** — Navigation, onboarding, action menus, pricing, configurators.

**Examples** — A landing page with one primary CTA and one secondary; a configurator that asks for one choice per step; a "we recommend" badge.

**Conflicts** — Tesler's Law (reduce visible options, not actual capability).

**Quick check** — Count clickable destinations on the surface. If a novice cannot pick within 2 seconds, prune.

---

### 3.11 Jakob's Law

> Users spend most of their time on other products. They expect yours to behave like the ones they already know.

**Agent rules — DO**
- Use the platform's published interface conventions by default.
- Place common elements where the rest of the world places them: logo top‑left, account top‑right, primary nav at top or left, search top‑center or top‑right, footer at bottom.
- Use the standard names: "Sign in", "Cart", "Settings", "Help", "Profile".
- When changing convention, provide a transition path (preview, opt‑in, "switch back" link) for at least one release cycle.

**Agent rules — DO NOT**
- Do not invent new gestures, icons, or vocabulary for common actions.
- Do not reuse a familiar pattern with a different meaning (e.g., a hamburger that opens a profile).
- Do not assume your innovation is "obvious".

**Apply when** — Always, especially before novel UI ideas.

**Examples** — Cart icon at top‑right with a numeric badge; underlined link styling for inline links; native scroll behavior preserved.

**Conflicts** — Aesthetic‑Usability Effect can tempt brand‑driven divergence — keep brand expression in non‑critical surfaces.

**Quick check** — Could a first‑time user from a competitor's app complete the primary task without instruction?

---

### 3.12 Law of Common Region

> Elements perceived inside a clearly defined boundary are seen as a group.

**Agent rules — DO**
- Use cards, panels, backgrounds, or borders to group related controls.
- Make the container's edge meaningful (it implies "these belong together").
- Pair common region with proximity for stronger grouping.

**Agent rules — DO NOT**
- Do not put unrelated content in the same card (e.g., user info + unrelated CTA).
- Do not over‑draw borders — every line is cognitive cost.
- Do not nest more than two levels of region without a strong hierarchy reason.

**Apply when** — Cards, settings groups, dashboard widgets, notification toasts, tables of records.

**Examples** — A pricing card grouping plan name, price, features, CTA; a settings page with bordered sections per topic.

**Conflicts** — Cognitive Load (over‑bordering = noise).

**Quick check** — Are all elements inside each container conceptually one unit?

---

### 3.13 Law of Proximity

> Objects close together are perceived as related.

**Agent rules — DO**
- Place a label adjacent to its input, an icon adjacent to its action, an error message adjacent to its field.
- Use larger spacing between unrelated groups than between elements inside a group (typically a 2× ratio).
- Apply consistent spacing tokens (e.g., 4 / 8 / 12 / 16 / 24 / 32 / 48).

**Agent rules — DO NOT**
- Do not equalize spacing between all elements — it destroys hierarchy.
- Do not separate a label from its input by more than the label's own height.
- Do not center‑align long lists where proximity becomes ambiguous.

**Apply when** — Forms, lists, navigation, captions, metadata, headings + bodies.

**Examples** — Field labels touching their inputs; group spacing 24 px, internal spacing 8 px; section headings closer to following content than preceding.

**Conflicts** — None core; foundational.

**Quick check** — Squint at the surface. Do the visual groups match the conceptual groups?

---

### 3.14 Law of Prägnanz (Simplicity)

> The eye prefers and remembers the simplest interpretation of a shape.

**Agent rules — DO**
- Reduce shapes to their simplest meaningful form.
- Prefer regular geometry, repeated patterns, and aligned grids.
- Remove visual noise: unnecessary lines, gradients, shadows, ornaments.

**Agent rules — DO NOT**
- Do not use ambiguous icons that require legend lookups.
- Do not stylize controls beyond recognition (e.g., a "button" that looks like a tag).
- Do not use illustrations that compete with controls for attention.

**Apply when** — Iconography, illustrations, charts, layout grids.

**Examples** — Single‑line icons in a consistent grid; clean column‑aligned layout; flat fills over heavy bevels.

**Conflicts** — Aesthetic‑Usability Effect (decorative complexity may delight but should never compete with the primary task).

**Quick check** — Could you sketch this UI's structure in five rectangles?

---

### 3.15 Law of Similarity

> The eye groups visually similar elements regardless of their distance.

**Agent rules — DO**
- Use one visual style per semantic role (all primary buttons identical; all links the same color and weight; all destructive actions share an accent).
- Differentiate clickable elements from non‑clickable text.
- Reuse iconography across surfaces for the same meaning.

**Agent rules — DO NOT**
- Do not style two different roles identically (e.g., headings that look like buttons).
- Do not change a control's appearance without changing its meaning.
- Do not use color alone to convey similarity.

**Apply when** — Component libraries, design systems, navigation, lists, badges.

**Examples** — All "destructive" actions in a single red shade with an icon prefix; all status tags as pill shapes with role color.

**Conflicts** — Von Restorff Effect (intentionally break similarity to highlight one item).

**Quick check** — For every visual style on the surface, is there one and only one meaning attached to it?

---

### 3.16 Law of Uniform Connectedness

> Elements visually connected (by lines, frames, shared backgrounds, or paths) are perceived as more related than ungrouped elements.

**Agent rules — DO**
- Use connectors, brackets, or shared backgrounds to clarify relationships (e.g., timeline links, parent‑child trees).
- Use a row stripe or hover band to bind columns of a table row.
- Use a connecting underline for active tabs.

**Agent rules — DO NOT**
- Do not over‑connect — connections imply causation; spurious lines mislead.
- Do not connect items across unrelated sections.

**Apply when** — Tables, trees, flow diagrams, wizards, tabs, breadcrumbs.

**Examples** — Stepper with a line between steps; tab indicator bar; threaded comment indents.

**Conflicts** — Prägnanz (over‑connection = visual noise).

**Quick check** — Do all connecting lines correspond to a real relationship?

---

### 3.17 Mental Model

> Users carry mental models of how systems work, built from past experience. Designs that match the model feel intuitive.

**Agent rules — DO**
- Research existing conventions in the user's domain before inventing.
- Use the user's vocabulary (interview transcripts, support tickets, search queries) for labels.
- Mirror the structure of the underlying real‑world process when possible (e.g., checkout = real shopping; inbox = mailroom).
- When you must change the mental model, change one variable at a time, with explicit explanation.

**Agent rules — DO NOT**
- Do not borrow vocabulary from your internal database schema.
- Do not assume your mental model = the user's.
- Do not use abstractions ("workspace", "entity", "object") where concrete nouns exist.

**Apply when** — IA, taxonomy, naming, navigation, error messages, empty states.

**Examples** — Folder hierarchies in file managers; "Inbox / Sent / Drafts" in mail; reorder via drag.

**Conflicts** — Jakob's Law (reinforces mental model alignment).

**Quick check** — Ask three target users to describe what a label means without the UI in front of them.

---

### 3.18 Miller's Law

> Working memory holds about 7 (± 2) items. The exact number is less important than the *limit*.

**Agent rules — DO**
- Chunk lists, navs, and forms into 5–9 item groups.
- For longer lists, paginate, collapse, or filter.
- Show only the items needed for the current step.

**Agent rules — DO NOT**
- Do not cite "7 ± 2" as a hard cap on UI element counts — the law is about cognition, not visible items. (A 100‑row list is fine if scannable.)
- Do not split content arbitrarily to "look short".

**Apply when** — Menus, settings, tag lists, multi‑step flows, cards per row.

**Examples** — Top‑level nav with 5–7 items; a settings page split into 7 sections; a phone number field formatted as 3‑3‑4 chunks.

**Conflicts** — Tesler's Law (don't reduce capability to satisfy a memory rule).

**Quick check** — Within each group, is the count ≤ 9 *meaningful* items?

---

### 3.19 Occam's Razor

> Among equally functional solutions, prefer the one with the fewest parts.

**Agent rules — DO**
- Audit each surface for elements you can remove without losing function.
- Combine controls that always change together.
- Replace text + icon + tooltip stacks with the smallest sufficient combination.

**Agent rules — DO NOT**
- Do not equate minimalism with simplicity — empty surfaces with hidden essentials are *less* simple.
- Do not over‑abstract (e.g., one button that does seven things based on context).
- Do not delete error states, empty states, or confirmations because they "look extra".

**Apply when** — Component design, page layout, form design, copy.

**Examples** — A search field that auto‑submits on Enter (no separate button needed when context is unambiguous); a single field for "address" that parses, where appropriate.

**Conflicts** — Tesler's Law (minimum count, not minimum capability).

**Quick check** — For every element, ask "if I remove this, what breaks?" If "nothing", remove.

---

### 3.20 Paradox of the Active User

> Users start using software immediately and skip manuals, even when reading would save them time.

**Agent rules — DO**
- Make the product usable on first interaction with zero documentation.
- Embed help in context: tooltips, empty states, inline examples, placeholder text.
- Use just‑in‑time tutorials triggered by the user's first encounter with a feature.
- Provide undo for almost every action.

**Agent rules — DO NOT**
- Do not gate features behind multi‑step onboarding.
- Do not write paragraphs of help — write one‑liners next to the control.
- Do not assume the user has read the marketing site.

**Apply when** — All onboarding, all empty states, all new features.

**Examples** — Inline placeholder text showing format ("e.g., name@company.com"); coachmark on first hover of a new icon; "undo" snackbar after delete.

**Conflicts** — Choice Overload (in‑context help shouldn't add noise — show only when the user is at the relevant control).

**Quick check** — Could a user complete the core task without leaving the product to read docs?

---

### 3.21 Pareto Principle

> ~80% of effects come from ~20% of causes. A minority of features drives most usage.

**Agent rules — DO**
- Identify the top 20% of flows and surfaces by usage and design them disproportionately well.
- Defer polish on rarely‑used surfaces to ship faster.
- Use analytics to revisit the 20% list quarterly.

**Agent rules — DO NOT**
- Do not abandon the long tail — niche flows often serve power users and accessibility cases.
- Do not assume your intuition matches the data.
- Do not optimize a feature without measuring whether it's in the 20%.

**Apply when** — Roadmapping, scope decisions, performance budgets, support content.

**Examples** — A FAQ that ranks the top 10 questions; a homepage that surfaces the most common task as the primary CTA.

**Conflicts** — Tesler's Law (the long tail still exists).

**Quick check** — Can you name the three flows that account for most user value?

---

### 3.22 Parkinson's Law

> Tasks expand to fill the time available. Reducing perceived duration improves the experience.

**Agent rules — DO**
- Set realistic expectations ("Takes about 2 minutes") and beat them.
- Pre‑fill, autofill, smart‑defaults wherever data is known or guessable.
- Allow the user to skip non‑essential steps.

**Agent rules — DO NOT**
- Do not add "padding" steps just to appear thorough.
- Do not require fields the system can derive.
- Do not under‑promise then over‑run — set honest, beat‑able estimates.

**Apply when** — Onboarding, checkout, forms, setup wizards.

**Examples** — Address autocomplete; saved payment methods; one‑tap signup with SSO; "skip for now".

**Conflicts** — Goal‑Gradient Effect (some friction can be motivating if visible progress is shown).

**Quick check** — For each required field, can the system pre‑fill it?

---

### 3.23 Peak-End Rule

> People remember an experience by its emotional peak and its end, not its average.

**Agent rules — DO**
- Identify the natural peaks in your flow (purchase, upload complete, milestone reached) and design them to delight.
- Polish the end state of every flow (confirmation, success page, sign‑out).
- Remove friction at the end disproportionately — a smooth last 10% rescues a rough middle.

**Agent rules — DO NOT**
- Do not end a flow with a generic "OK" or a navigation dead‑end.
- Do not hide the moment of value behind interstitials, modals, or upsells.
- Do not let errors be the last thing the user sees.

**Apply when** — Checkout, onboarding completion, feature first use, error recovery, sign out.

**Examples** — A celebratory animation on first publish; a thoughtful empty state after deleting the last item; an upbeat confirmation page with a clear next action.

**Conflicts** — Cognitive Load (delight should not interrupt; keep peaks lightweight and skippable).

**Quick check** — What is the last frame of this flow? Would a user describe it positively?

---

### 3.24 Postel's Law

> Be liberal in what you accept, conservative in what you send.

**Agent rules — DO**
- Accept input in any reasonable format (phone with/without spaces, dates in any local format, URLs with/without protocol, capitalization‑insensitive emails).
- Normalize input silently after submission.
- Provide clear, specific feedback when input cannot be parsed.

**Agent rules — DO NOT**
- Do not reject inputs that differ only in whitespace, case, or punctuation.
- Do not show "invalid" before the user has finished typing.
- Do not require the user to format data the machine can format.

**Apply when** — Forms, search, command palettes, APIs, file imports.

**Examples** — Phone field accepts "+1 (415) 555 0100", "415‑555‑0100", "4155550100"; search tolerant of typos; URL field that prepends `https://`.

**Conflicts** — Aesthetic‑Usability Effect (don't over‑validate for the sake of "neat" data).

**Quick check** — For each input, list the three weirdest valid formats. Does your code accept them?

---

### 3.25 Selective Attention

> Users attend to a narrow subset of stimuli, usually goal‑related. Everything else is filtered out — including information you put in their face.

**Agent rules — DO**
- Reduce competing stimuli around the primary action.
- Use motion, color, or scale sparingly to draw attention only to what matters now.
- Test with first‑click and 5‑second tests; if users miss it, redesign.

**Agent rules — DO NOT**
- Do not place critical content where users have learned to ignore (banner blindness zones, ad slots, top‑right corners on content sites).
- Do not animate decorations that compete with the primary action.
- Do not rely on a single notification to communicate critical info.

**Apply when** — Calls to action, status messages, errors, important system events.

**Examples** — A single hero CTA with no competing motion; an error toast that uses color + icon + text; an empty state that points exactly at the next action.

**Conflicts** — Aesthetic‑Usability Effect (decorative motion vs. signal).

**Quick check** — In a 5‑second test, do users name the primary action?

---

### 3.26 Serial Position Effect

> Users best remember the first and last items in a list (primacy and recency); middle items fade.

**Agent rules — DO**
- Place the most important nav items, list items, or actions at the start and end.
- In a 7‑item nav, anchor "Home" at the start and "Sign in" / "Account" at the end.
- Lead with the most important content; close with a clear summary or CTA.

**Agent rules — DO NOT**
- Do not bury the primary CTA in the middle of a long page.
- Do not list items in a random order when ranking is possible.

**Apply when** — Navigation, lists, forms, content sequences, slide decks, emails.

**Examples** — A pricing page with the recommended plan first or last; a newsletter ending with a clear single CTA.

**Conflicts** — Choice Overload (a long list still suffers even if endpoints are well placed).

**Quick check** — What are the first and last items the user encounters? Do those match priority?

---

### 3.27 Tesler's Law (Conservation of Complexity)

> Every system has irreducible complexity. The only question is who carries it: the user or the product.

**Agent rules — DO**
- Absorb complexity in the system whenever feasible (smart defaults, parsing, automation).
- Surface unavoidable complexity in plain language with strong defaults.
- Choose explicit "advanced" surfaces over hidden modes for power features.

**Agent rules — DO NOT**
- Do not amputate functionality to "simplify" — power users will leave.
- Do not pretend complex problems are simple (e.g., GDPR consent without choice).
- Do not stack five wizards to hide complexity that needs one expert form.

**Apply when** — Settings, configurators, billing, data import, integrations, admin tools.

**Examples** — A "basic" view with smart defaults plus a clearly labelled "Advanced" panel; an importer that auto‑maps columns but lets the user override.

**Conflicts** — Hick's, Choice Overload, Occam's — Tesler's is the *check* on over‑application of those.

**Quick check** — Did simplification remove a real user need? If yes, restore it (somewhere).

---

### 3.28 Von Restorff Effect (Isolation)

> An item that breaks the pattern is remembered.

**Agent rules — DO**
- Style the primary action distinctively from secondaries (color + weight + position).
- Highlight one (and only one) recommended option in a comparison.
- Make destructive or irreversible actions visually distinct.

**Agent rules — DO NOT**
- Do not make many things "stand out" — if everything is highlighted, nothing is.
- Do not rely on color alone to isolate an item (use shape, size, position).
- Do not isolate items that don't merit attention (decorative emphasis = noise).

**Apply when** — CTAs, plan comparisons, dashboards, search results, error and success states.

**Examples** — One filled "Get started" button alongside ghost secondary buttons; a "Recommended" badge on a single plan; a destructive button in a unique color.

**Conflicts** — Similarity (intentional break, not accidental).

**Quick check** — On the surface, count visually emphasized items. If > 2 within one zone, prune.

---

### 3.29 Working Memory

> A small (~4 chunks), short‑lived (~20–30 s) buffer for what the user is currently holding in mind.

**Agent rules — DO**
- Carry context between steps — never make the user retype, re‑select, or remember.
- Show comparison data side‑by‑side, not sequentially.
- Persist filters, sort, and selection across pagination and route changes.
- Keep critical info visible: keep order summary on checkout, breadcrumbs on deep navigation.

**Agent rules — DO NOT**
- Do not show a code or token the user must remember and type into the next screen.
- Do not require the user to recall a value from a prior step to validate the next.
- Do not auto‑clear forms on validation errors.

**Apply when** — Multi‑step flows, comparisons, search‑then‑select, tables with filters.

**Examples** — A persistent cart summary; remembered filter state; a OTP input that auto‑pastes from clipboard.

**Conflicts** — None core; reinforces Cognitive Load and Mental Model.

**Quick check** — Could a user complete the task with a 30‑second attention span and no notes?

---

### 3.30 Zeigarnik Effect

> Users remember and feel pulled to complete unfinished tasks more than completed ones.

**Agent rules — DO**
- Show progress meters that hint at "what remains" — they pull the user forward.
- Use teaser content (cropped images, "and more…", "1 of 4 steps complete").
- Save and resume — never lose half‑finished state.
- Use friendly nudges to resume incomplete onboarding, drafts, or carts.

**Agent rules — DO NOT**
- Do not abandon partial progress on logout, refresh, or tab change.
- Do not weaponize the effect with manipulative reminders ("you forgot something!" with urgency lies).
- Do not nag — one well‑timed reminder beats five.

**Apply when** — Profile completion, drafts, carts, multi‑step setup, learning courses.

**Examples** — "Profile 60% complete" with a single missing item shown; "Pick up where you left off" on return; saved draft auto‑recovered.

**Conflicts** — Cognitive Bias / ethics — never use the effect to coerce.

**Quick check** — If a user leaves mid‑flow and returns tomorrow, can they resume in one click?

---

## 4. Resolving Conflicts Between Laws

Apply this priority order when laws collide:

1. **Accessibility & ethics** (WCAG, motion sensitivity, dark patterns) override everything.
2. **Mental Model & Jakob's Law** before stylistic differentiation.
3. **Tesler's Law** caps over‑simplification — never amputate capability.
4. **Cognitive Load & Selective Attention** beat Aesthetic‑Usability.
5. **Postel's Law** beats strict input validation when the user's intent is clear.
6. **Peak‑End Rule** trumps consistency at the start and end of flows (you may indulge a delightful exception).
7. **Von Restorff Effect** trumps Similarity *only* for the primary action — never for many.
8. **Pareto** drives prioritization but never excuses neglecting accessibility for the long tail.

When two equally weighted laws conflict, prefer the option that lowers cost for the user.

---

# Button & Control States

A focused, opinionated ruleset for the interactive states a button can occupy, written for AI agents and design tools so they can generate, review, or refactor button components that feel responsive, communicate system status, and remain accessible to every user.

This document is intentionally **stack-agnostic** and **medium-agnostic** (web, mobile, desktop, kiosk, watch). Apply the rules at the level of granularity that fits the artifact in front of you.

---

## 0. How agents must use this document

1. **Treat each rule as a constraint, not a suggestion.** When you generate, edit, or review a button (or any control that behaves like one), run the relevant rules from §4–§5 against the artifact. If a rule is violated, fix it or surface the trade-off explicitly.
2. **Always design states as a set, not in isolation.** A "button" is not one visual — it is a contract across all nine states in §4–§5. Shipping only the default state is shipping a broken component.
3. **Subtract before you add.** Before introducing a new visual treatment for a state, check whether an existing token (color, shadow, scale) can carry the meaning.
4. **Never suppress focus.** Removing the focus ring without a custom replacement is the single most common violation and the one that hurts users most.
5. **Justify every deviation.** If a generated component intentionally breaks a rule, name the rule, explain why, and state what compensating control protects the user.
6. **Apply the Universal Button States Checklist (§12) on every component** before declaring it done.
7. **Accessibility wins every conflict.** When a visual treatment and a WCAG requirement collide, accessibility wins and the visual is redesigned.
8. **Links are not buttons — do not turn them into buttons.** A navigation link (`<a href>`) that takes the user to another page or section is **not** a button. Do not apply button treatments (background fills, borders, padding blocks, scale transforms, box-shadows, `min-height` touch-target blocks, or `<button>` elements) to navigation links. Navigation links get **text-only styling**: a color change on hover, a color change on active, and `:focus-visible` for keyboard users. That's it. The full button-state contract (§4–§5) applies only to controls that **trigger actions** — submits, toggles, destructive operations, CTAs with distinct visual weight. When in doubt, ask: "Does clicking this *do* something, or *go* somewhere?" If it goes somewhere, it is a link — style it as text, not as a button.
9. **Underlines are reserved exclusively for inline content links.** Links inside navigation bars, footers, sidebars, and any link styled with button-role treatments (`.btn`, CTA styling) must **never** have `text-decoration: underline`. The underline convention signals "this is a clickable link embedded in running text" — it helps users scan body content for hyperlinks. Applying underlines to navigation or footer links adds visual noise without aiding discoverability (their position and context already communicate they are links). In CSS: set `text-decoration: none` on `nav a`, `footer a`, `header a`, and `.btn`. Reserve `text-decoration: underline` for `p a`, `li a`, `td a`, and similar inline-content contexts only.

---

## 2. Universal Rules (TL;DR)

These are non-negotiable defaults. If the spec doesn't say otherwise, do these.

1. **Every button has at least five states wired up: default, hover, active, focus, disabled.** Shipping only default is shipping a broken control.
2. **Focus is visible, always.** A 2–3 px ring with ≥ 3:1 contrast against the adjacent surface. Never `outline: none` without a custom replacement.
3. **Hover is subtle, active is firmer, focus is loudest.** Volume scales with intent: hover acknowledges, active confirms, focus orients.
4. **Disabled looks unavailable, not invisible.** Muted fill, ~40–60% opacity, `cursor: not-allowed`, and an inline reason whenever possible.
5. **Loading disables the button.** Always. Re-submitting a half-finished request is a bug, not a feature.
6. **Color is never the sole channel.** Pair every state's color shift with at least one of: icon, label change, border, position, motion.
7. **Transitions land between 100–200 ms.** Below 100 ms users miss the feedback; above 200 ms the UI feels sluggish.
8. **Touch targets are ≥ 44 × 44 px / 48 × 48 dp,** with ≥ 8 px spacing between adjacent buttons.
9. **A primary button is visually distinct from every secondary on the same surface.** If you can't tell which is primary in 1 second, the hierarchy has failed.
10. **State transitions are reversible.** Hovering off restores default; blurring restores default; cancelling a submission restores default — without page reload.
11. **Respect reduced-motion preferences.** Replace scale/translate animations with instant color swaps when `prefers-reduced-motion: reduce`.
12. **Document every state in the design system.** A component with five states defined in code but two in Figma will drift inside a sprint.

---

## 3. State vs. Style vs. Type

> Type, style, and state describe three independent dimensions of a button. Keep them straight.

| Dimension | What it answers          | Examples                                          |
| --------- | ------------------------ | ------------------------------------------------- |
| **Type**  | What does it do?         | Submit, reset, toggle, navigate, destructive, CTA |
| **Style** | How visually loud is it? | Primary, secondary, ghost, link, outlined         |
| **State** | What is it doing *now*?  | Default, hover, active, focus, disabled, loading, success, error, selected |

**Agent rules — DO**

- Treat each dimension as orthogonal: a *destructive submit button* in *primary style* can be in any of the nine states without its type or style changing.
- Name your design tokens and component variants along all three axes (e.g. `Button / Primary / Destructive / Loading`).
- When a stakeholder asks for a "new button", clarify: a new *type* (new behavior), a new *style* (new variant), or a new *state* (new feedback condition)?

**Agent rules — DO NOT**

- Do not invent a new style every time a new state is needed — the style stays put, the state changes.
- Do not encode functional differences into style alone (e.g. red color implies destructive — it must also be labeled).

**Quick check** — For every button on the surface, name its type, style, and current state in one breath. If any feels ambiguous, the component is under-specified.

---

## 4. The Five Core States

Every interactive button must define and ship all five.

---

### 4.1 Default

> The baseline state. What users see before any interaction has occurred. Every other state is a deviation from this one.

**Why it matters.** The default state is the affordance. If it doesn't look clickable, no later state can rescue the interaction.

**Agent rules — DO**

- Make the button **recognizable as interactive at rest** through shape, fill, label, or all three.
- Ensure **WCAG AA contrast** between label and fill (4.5:1 for normal text, 3:1 for large text).
- Use a clear, action-oriented label (verb-first: "Save changes", not "Changes").
- Keep the default padding generous enough to hit the **44 × 44 px** touch target without relying on the label's natural size.
- Place the default style in the design system as the single source of truth.

**Agent rules — DO NOT**

- Do not style a button as plain text — users will miss it ("mystery meat navigation").
- Do not rely on a hover state to reveal the button — hover does not exist on touchscreens.
- Do not use ambiguous labels ("OK", "Click here") where a verb fits.

**Apply when** — Always. Every button on every surface starts here.

**Examples** — A filled primary button with a 6 px radius, a 1 px transparent border, a 4.5:1 label/fill contrast, and 12 × 24 px padding.

**Conflicts** — Aesthetic minimalism can erase the affordance; if a "clean" button no longer reads as a button, it has failed.

**Quick check** — Show the screen to a first-time user with no hover or focus. Can they identify every clickable button in under 2 seconds?

---

### 4.2 Hover

> Activates when a pointer moves over the button. Confirms interactivity *before* the click.

**Why it matters.** Hover is the cheapest moment of feedback in any UI — a soft handshake that says "yes, I see you."

**Agent rules — DO**

- Pick **one or two** techniques from the Hover Technique Palette below — never stack more than two on the same button.
- Transition the change in **100–150 ms** with an `ease` or `ease-out` curve.
- Use the **same hover recipe** across every button of the same style — consistency teaches the user the rule. Different styles (primary, secondary, ghost) may use different recipes.
- Switch the cursor to `pointer` so the affordance reads on every input.
- When building a system with multiple button styles, **rotate techniques** across styles so each style has a distinct hover personality (e.g. primary uses fill-darken + lift, secondary uses border-shift + tint overlay, ghost uses underline-reveal).

#### Hover Technique Palette

Agents must select from this palette. Each technique is stack-agnostic — implement with whatever primitive the platform provides.

| # | Technique | Description | Intensity | Best for |
|---|-----------|-------------|-----------|----------|
| H1 | **Fill darken / lighten** | Shift the background color 1–2 steps darker (light mode) or lighter (dark mode) on the same hue scale. | Low | Primary, destructive — any filled button |
| H2 | **Elevation lift** | Add or increase a drop shadow (0 → 4–8 px vertical offset, soft spread) to create the illusion the button is lifting off the surface. | Low–Medium | Primary, CTA — adds depth without changing color |
| H3 | **Border color shift** | Transition the border from a neutral tone to the brand color or a stronger contrast value. | Low | Secondary, outlined — reinforces the outline as the defining trait |
| H4 | **Background tint overlay** | Layer a semi-transparent brand or neutral fill (4–8% opacity) behind the label. The button "fills in" on hover. | Low | Ghost, text-style, link-style buttons — reveals the hit area |
| H5 | **Underline reveal** | Animate a 2 px underline (or bottom border) sliding in from left, right, or center beneath the label. | Low | Link-style, text-style, nav links — classic editorial feel |
| H6 | **Icon nudge** | Translate an inline icon (arrow, chevron) 2–4 px in the action direction (typically right or down). The button itself stays still. | Low | CTA with trailing arrow — emphasizes forward motion |
| H7 | **Glow / brand shadow** | Add a soft outer shadow tinted with the brand color (e.g. 0 0 12 px brand at 20–30% opacity). | Medium | Primary, CTA on dark backgrounds — creates a "lit" feeling |
| H8 | **Gradient angle shift** | Rotate the background gradient by 15–30° so the color distribution subtly moves. | Low | Gradient-filled buttons — adds life without changing palette |
| H9 | **Outline appearance** | Transition from transparent or hidden border to a visible 1–2 px outline around the button. | Low | Ghost buttons — makes the boundary explicit on hover |
| H10 | **Fill swap (inverse)** | Swap foreground and background — e.g. an outlined button fills in with the brand color and the label turns white. | Medium–High | Secondary / outlined on hover — strong visual commitment |
| H11 | **Brightness / contrast filter** | Apply a subtle brightness boost (105–110%) or contrast shift to the entire button. | Low | Any style — useful as a secondary layer on top of another technique |
| H12 | **Background scale (inner)** | Scale an inner pseudo-element or background layer from 0 → 100%, creating a "fill-in" reveal. The button's outer box stays fixed. | Medium | Ghost, outlined — dramatic but contained within the bounds |

**Combining techniques** — Pick at most **two** from the palette per button style. Pair a *color/fill* technique (H1, H4, H10, H11) with a *spatial/motion* technique (H2, H5, H6, H8, H12). Never pair two spatial techniques (jittery) or two high-intensity techniques (overwrought).

**Agent rules — DO NOT**

- Do not change *meaning* on hover — a button that shows different copy or icon on hover hides information from touch and keyboard users.
- Do not use hover as the *only* affordance — touchscreens have no hover.
- Do not overdo the effect (full rotation, dramatic color swap, audio cue) — it draws focus away from the task.
- Do not delay hover feedback past 150 ms — it stops feeling responsive.
- Do not use more than two palette techniques on the same button.
- Do not use the same hover recipe for all button styles — differentiate styles through different technique combinations.

**Apply when** — Pointer-capable surfaces (desktop web, hybrid devices). On pure-touch UIs, treat hover as a no-op and rely on active and focus.

**Examples**

- *Primary filled:* H1 (fill darken one step) + H2 (4 px shadow lift) over 150 ms.
- *Secondary outlined:* H3 (border shifts to brand) + H4 (6% brand tint fills the background).
- *Ghost / text button:* H5 (underline slides in from left) alone, or H4 (background tint) + H6 (arrow nudges 3 px right).
- *CTA on dark surface:* H7 (brand-colored glow) + H1 (fill lightens one step).
- *Gradient button:* H8 (gradient rotates 20°) + H2 (shadow lift).

**Conflicts** — Touch parity (don't rely on hover); reduced-motion (replace spatial techniques H2, H5, H6, H8, H12 with instant color swaps from H1, H4, H10, H11).

**Quick check** — On a phone, does the button still communicate its role? If the answer is "only after I tap", redesign.

---

### 4.3 Active (Pressed)

> Fires the moment the user presses the button — mouse down, finger touch, Enter/Space on focus.

**Why it matters.** Without an active state, the user has no proof the input registered. The brain expects tactile feedback even on a flat screen.

**Agent rules — DO**

- Pick **one or two** techniques from the Active Technique Palette below. The active state must feel **firmer** than whatever hover does — if hover lifts, active presses down; if hover lightens, active darkens further.
- Fire the state on **both** mouse and touch (`:active` handles both natively).
- Pair with a keyboard analogue — pressing Space/Enter on a focused button should trigger the same visual.
- Keep the transition snappy — **80–120 ms**, faster than hover.
- The active recipe should **logically invert or deepen** the hover recipe. If hover lifts the button up (H2), active should push it down (A2 or A3). If hover fills in a ghost button (H10), active should deepen that fill (A1) or compress it (A4).

#### Active Technique Palette

Each technique is stack-agnostic. The active state should always read as "pressed in" or "confirmed" — the opposite energy of hover's "lifted / inviting."

| # | Technique | Description | Intensity | Best for |
|---|-----------|-------------|-----------|----------|
| A1 | **Fill deepen** | Darken the background 2–3 steps beyond default (or beyond hover). On dark mode, lighten equivalently. The strongest color the button will ever show. | Medium | Primary, destructive — any filled button |
| A2 | **Scale down** | Shrink the button by 2–4% (scale 0.96–0.98). Creates a "press into the surface" feeling. Must not push the button out of its layout cell. | Medium | Any style — universal press feedback |
| A3 | **Inset shadow** | Replace any outer shadow with an inner/inset shadow (e.g. inset 0 2–3 px 6 px dark at 15–25% opacity). The button looks physically pushed in. | Medium | Primary, secondary — tactile depth cue |
| A4 | **Elevation drop** | Remove or flatten any shadow that hover added. If hover lifted the button to 8 px elevation, active drops it to 0. Pairs naturally with H2 hover. | Low–Medium | Elevated buttons — undoes the hover lift |
| A5 | **Border thicken / inset** | Increase border width by 1 px or shift the border inward (so the content area compresses by 1 px on each side), creating a tightening feel. | Low | Outlined, secondary — border-defined buttons |
| A6 | **Background opacity increase** | If hover added a tint overlay (H4), increase its opacity from 6–8% to 15–20%. The fill "confirms" by becoming more present. | Low–Medium | Ghost, text-style buttons — deepens the hover hint |
| A7 | **Brightness / contrast dim** | Reduce brightness to 90–95% or increase contrast slightly. The button momentarily looks "heavier." | Low | Any style — subtle, works as a secondary layer |
| A8 | **Translate Y down** | Move the button 1–2 px downward. The inverse of a hover lift (H2). Feels like pressing a physical key. Must snap back on release. | Low | Primary, CTA — paired with hover lift |
| A9 | **Fill inversion (momentary)** | Briefly swap foreground and background colors. If the button is filled brand with white text, it becomes white with brand text for the press duration. | High | Secondary, outlined — strong confirmation signal |
| A10 | **Outline constrict** | If the button has a visible outline or border, animate it 1–2 px inward (shrink the offset or reduce border-radius by 1–2 px). Creates a "squeeze" feel. | Low | Outlined, pill-shaped — subtle spatial compression |
| A11 | **Inner glow collapse** | If hover added a glow (H7), pull it inward — reduce spread, increase intensity, shift color slightly darker. The glow "absorbs" into the button. | Medium | CTA on dark backgrounds — dramatic confirmation |
| A12 | **Underline thicken** | If hover revealed an underline (H5), increase its weight from 2 px to 3–4 px or change its color to the active/strong brand value. | Low | Link-style, text-style buttons — deepens the hover hint |

**Combining techniques** — Pick at most **two**. Pair a *color/fill* technique (A1, A6, A7, A9) with a *spatial/motion* technique (A2, A3, A4, A5, A8, A10). The result must feel like a single coherent "press", not a sequence of effects.

**Hover → Active continuity** — The active recipe must feel like the natural next beat after hover. Use this mapping as a starting point:

| If hover uses… | Active should use… | Why |
|---|---|---|
| H1 (fill darken) | A1 (deepen further) or A3 (inset shadow) | Same channel, more intensity |
| H2 (elevation lift) | A4 (elevation drop) + A8 (translate down) | Lift → press = physical metaphor |
| H3 (border shift) | A5 (border thicken) or A10 (outline constrict) | Border is the defining trait, so active deepens it |
| H4 (tint overlay) | A6 (opacity increase) or A1 (fill deepen) | Overlay "solidifies" on press |
| H5 (underline reveal) | A12 (underline thicken) | Same element, stronger |
| H6 (icon nudge) | A2 (scale down) | Icon was spatial; press is whole-button spatial |
| H7 (brand glow) | A11 (glow collapse) + A1 (fill deepen) | Glow pulls in, button absorbs the energy |
| H10 (fill swap) | A1 (deepen the swapped fill) or A3 (inset shadow) | Swap is already high-intensity; just deepen |

**Agent rules — DO NOT**

- Do not delay the active feedback — it must appear within the Doherty threshold (~100 ms).
- Do not skip the active state on touch — it is the *only* feedback before the action completes.
- Do not let `transform: scale()` push the button out of its grid cell or overlap neighbors.
- Do not use more than two palette techniques on the same button.
- Do not pick an active recipe that contradicts the hover direction (e.g. hover darkens, active lightens — this reads as a glitch).
- Do not use A9 (fill inversion) on a primary CTA — the flash is too distracting for the highest-traffic button.

**Apply when** — Every clickable/tappable control, every input device.

**Examples**

- *Primary filled (hover: H1 + H2):* A1 (fill deepens two more steps) + A4 (shadow flattens to 0). The button darkens and drops back to the surface.
- *Secondary outlined (hover: H3 + H4):* A5 (border thickens by 1 px) + A6 (tint overlay jumps to 18% opacity). The outline tightens and the fill commits.
- *Ghost / text button (hover: H4 + H6):* A2 (scale 0.97) + A6 (overlay opacity to 20%). The button compresses and the background solidifies.
- *CTA on dark surface (hover: H7 + H1):* A11 (glow collapses inward) + A1 (fill deepens). The glow is "absorbed" on press.
- *Link-style (hover: H5):* A12 (underline thickens to 3 px and shifts to active brand color). Minimal, contained.

**Conflicts** — Reduced-motion: replace spatial techniques (A2, A3, A4, A5, A8, A10, A11) with instant color-only techniques (A1, A6, A7, A9). The press must still be perceivable.

**Quick check** — Press the button slowly. Is there a visible moment between mouse-down and mouse-up that confirms the press? Does the active state feel like the natural "next step" after hover, not a separate unrelated effect?

---

### 4.4 Focus

> Appears when the button receives keyboard focus (Tab, Shift-Tab, programmatic focus). The single most important state for accessibility.

**Why it matters.** For keyboard, switch, screen-reader, and voice-control users, focus *is* the cursor. Suppressing it cuts them off from the product entirely.

**Agent rules — DO**

- Use `:focus-visible` (not bare `:focus`) so mouse users don't see a focus ring after a click, but keyboard users do.
- Make the ring **clearly visible**: 2–3 px outline, ≥ 2 px offset, ≥ 3:1 contrast against both the button and the page background.
- Keep the ring **consistent** across every button style — focus is system feedback, not brand expression.
- Ensure the ring survives on every background, including hover and active fills.
- Restore focus styling if you use `outline: none` to remove the browser default — `outline: none` without a replacement is a bug.

**Agent rules — DO NOT**

- Do not use only a color shift as the focus indicator — pair with outline, shadow, or border weight.
- Do not animate the focus ring's appearance — it must be instant for orientation.
- Do not lose focus on programmatic re-renders (React Server Components, route changes) without restoring it.
- Do not rely on the operating-system default if your custom button hides it — implement the ring yourself.

**Apply when** — Always. Every interactive element on every surface.

**Examples** — `outline: 3px solid var(--focus-ring); outline-offset: 2px;` rendered on `:focus-visible`. WCAG 2.2 specifies minimum focus indicator size and contrast — meet or exceed both.

**Conflicts** — Aesthetic minimalism. Resolve by designing the focus ring *into* the brand from the start, not bolting it on later.

**Quick check** — Unplug the mouse. Can you reach and operate every button using only Tab and Enter? If you cannot see where you are at every step, the focus state has failed.

---

### 4.5 Disabled

> Signals that the action exists but is not available right now. The button stays visible so the user can discover the path forward.

**Why it matters.** Disabled is the most-abused state. Done well, it teaches; done badly, it stonewalls.

**Agent rules — DO**

- Reduce contrast: muted fill (often `--neutral-tertiary` or the same hue at ~40–60% opacity), softer label color, `cursor: not-allowed`.
- Pair the disabled visual with a **reason** — inline text, tooltip on focus/hover, or an adjacent validation message ("Add an email to continue").
- Keep the button **discoverable** — never hide it entirely, or the user will not know the action is possible at all.
- Set `aria-disabled="true"` on non-native elements; use the native `disabled` attribute on `<button>`/`<input>`.
- Maintain a ≥ 3:1 contrast for the label (WCAG 1.4.11 non-text contrast does not exempt disabled buttons in practice — they must still be perceivable).

**Agent rules — DO NOT**

- Do not gray out a button with no explanation — the user will keep clicking and rage-quit.
- Do not use `pointer-events: none` without `aria-disabled` — assistive tech needs to announce the state.
- Do not disable the *primary* CTA on a marketing page; if the form is incomplete, route the click to the missing field instead.
- Do not use disabled to enforce business rules silently — surface the rule.

**Apply when** — Form submits before validation passes; gated features awaiting payment; rate-limited actions; loading siblings.

**Examples** — A "Submit" button stays disabled until the email field is valid; the tooltip on hover reads "Enter an email to submit."

**Conflicts** — Paradox of the Active User — users skip help, so the disabled reason must be inline, not buried in docs.

**Quick check** — When the button is disabled, can the user answer "what would unblock this?" within 2 seconds?

---

## 5. The Four Functional States

States that fire in response to system status, not direct user input. Required for any flow that involves a network request, a long task, or a toggleable choice.

---

### 5.1 Loading

> The button has been pressed; the system is working. Communicates that the input was registered and prevents duplicate submission.

**Why it matters.** Without a loading state, users press again. Without disabling during loading, the server processes the same action twice.

**Agent rules — DO**

- **Disable** the button for the duration of the request (`pointer-events: none`, `aria-busy="true"`).
- Replace or accompany the label with a **spinner** (indeterminate work, < 1 s expected) or a **progress bar** (measurable work, > 1 s expected).
- Keep the button **the same width** as default — don't reflow the layout on press.
- Announce the state to assistive tech with `aria-live="polite"` or `aria-busy="true"`.
- Restore the default state immediately on success/error — never leave the spinner running.

**Agent rules — DO NOT**

- Do not allow re-clicks during loading — the most common cause of duplicate orders and double-charges.
- Do not use an indeterminate spinner for a task with measurable progress.
- Do not animate the spinner past `prefers-reduced-motion: reduce` — fade in a static "Loading…" label instead.
- Do not show a loading state for an action that completes in < 100 ms — the flash is worse than the absence.

**Apply when** — Form submission, async fetch, file upload, payment processing, any user-triggered server call.

**Examples** — A primary button labeled "Save changes" becomes a disabled button with a spinner and "Saving…" label for ~600 ms, then transitions to success.

**Conflicts** — Doherty Threshold — under 100 ms, show no loading state; between 100 ms and 1 s, a spinner; over 1 s, a determinate progress indicator.

**Quick check** — Press the button on a slow network. Is it impossible to press a second time? Is the system status visible the whole time?

---

### 5.2 Success / Complete

> Confirms the action completed as expected. A moment of closure that should feel immediate and unambiguous.

**Why it matters.** Success states are the natural emotional peak of an interaction. A clean success state buys forgiveness for friction elsewhere in the flow.

**Agent rules — DO**

- Use a **green or brand-accent** fill paired with a **checkmark icon** and a clear past-tense label ("Saved", "Sent", "Subscribed").
- Keep the state visible for **1.5–3 seconds**, then return to default — or transform the button into the next logical action ("View receipt").
- Animate the transition into success with a brief **ease-out** (150–250 ms). Out-of-state animations can be marginally longer than in-state.
- Announce to assistive tech with `aria-live="polite"`.

**Agent rules — DO NOT**

- Do not use a generic "Success" label — past-tense verbs land better.
- Do not keep the success state forever — it loses meaning and blocks the next action.
- Do not over-celebrate (confetti, sound) for routine actions — reserve delight for true milestones.

**Apply when** — Save, submit, send, subscribe, complete purchase, mark done.

**Examples** — A "Subscribe" button becomes "Subscribed ✓" in green for 2 s, then returns to default with new state ("Manage subscription").

**Conflicts** — Cognitive Load — don't over-animate; the success should land instantly and step out of the way.

**Quick check** — After the button completes its action, can the user describe what happened in one word ("saved", "sent")?

---

### 5.3 Error

> Signals that the action failed. The recovery path is more important than the visual treatment.

**Why it matters.** Errors are the user's worst moments. A vague red button without context turns frustration into abandonment.

**Agent rules — DO**

- Pair a **red fill, border, or icon** with **inline text** explaining what went wrong *and what to do next*.
- Reset the button to a **clickable state** so the user can retry — never trap them in an error.
- Use specific, blameless copy: "Payment failed — check your card details and try again." Not "Error 4032."
- Announce to assistive tech with `role="alert"` or `aria-live="assertive"` (urgent) only when the error blocks progress; use `polite` otherwise.
- Differentiate from the destructive style — destructive is the button's *role*; error is a *state* of any button.

**Agent rules — DO NOT**

- Do not rely on red alone — pair with an icon and text. Color-blind users will not perceive the change.
- Do not blame the user ("invalid input") — describe the problem in their terms.
- Do not lock the user out of retry — every error state must offer an action.
- Do not show the error inside the button if the explanation is longer than ~3 words — surface it adjacent instead.

**Apply when** — Failed submit, expired session, network failure, validation block.

**Examples** — A "Pay $42" button shifts to a red outline with a `!` icon; below the button, "Card declined — try a different card or contact support."

**Conflicts** — Peak-End Rule — errors are remembered disproportionately. Polish the recovery flow.

**Quick check** — When the error appears, can the user retry without leaving the surface or re-entering data?

---

### 5.4 Selected / Toggled

> Indicates the button is actively on. Unlike the other states, it **persists** until the user toggles it off.

**Why it matters.** Selected is the right pattern for filters, toggles, segmented controls, and pin-to-favorites. Used for the wrong job, it confuses every user.

**Agent rules — DO**

- Use a **filled or inverted** style that clearly differs from default — don't rely on a subtle hue change.
- Reflect the state in the accessibility tree with `aria-pressed="true"` (toggle buttons) or `aria-checked="true"` (radio/checkbox semantics).
- Persist the state until the user explicitly turns it off — never auto-clear on hover-off or blur.
- Pair the visual change with a **label or icon change** when the meaning isn't obvious from context (e.g. heart-outline → heart-filled, "Follow" → "Following").
- For **destructive on-toggle** actions (mute, archive), add a tooltip or confirmation if the change isn't immediately visible to the user.

**Agent rules — DO NOT**

- Do not use selected for momentary actions (submit, save) — that's success, not selected.
- Do not confuse selected with active/pressed — pressed lasts a click, selected lasts until toggled off.
- Do not rely on color alone — a colorblind user must see the toggle change.

**Apply when** — Filters, tag pickers, segmented controls, like/follow buttons, view toggles.

**Examples** — A filter chip "Open issues" inverts (filled brand, white text) when selected; pressing it again returns to outlined.

**Conflicts** — Internal consistency — every toggle in the product uses the same selected treatment.

**Quick check** — Can a returning user tell which filters are on, without trial and error?

---

## 6. State Transitions & Motion

> The choreography between states is part of the design. Get the durations wrong and the button feels broken even when every static state is correct.

**Timing budgets**

| Transition          | Duration   | Curve        | Notes                                              |
| ------------------- | ---------- | ------------ | -------------------------------------------------- |
| Default → Hover     | 100–150 ms | ease-out     | Subtle, almost subliminal                          |
| Hover → Active      | 80–120 ms  | ease-out     | Faster than hover; the press should feel immediate |
| Any → Focus         | 0 ms       | instant      | Focus orients; never animate appearance            |
| Loading → Success   | 200–300 ms | ease-in-out  | Slight celebration; out-of-state can be longer     |
| Loading → Error     | 150–250 ms | ease-out     | Crisp; don't dwell                                 |
| Selected toggle     | 100–200 ms | ease-out     | Match the rest of the system                       |
| Default → Disabled  | 150 ms     | ease         | Fade, never animate label position                 |

**Agent rules — DO**

- Use the same easing curve family across all buttons in the product (typically `ease-out` for state-in, `ease-in` for state-out).
- Respect `prefers-reduced-motion: reduce` — drop transforms, keep color transitions instant or near-instant (≤ 50 ms).
- Animate **opacity, transform, background**, and **border** — properties the browser composites cheaply. Avoid animating `width`, `height`, `top/left` on press.

**Agent rules — DO NOT**

- Do not stack animations (color + transform + shadow + border) — pick at most two changes per transition.
- Do not animate state changes that block input (e.g. fading in a disabled state over 500 ms while accepting clicks).
- Do not use motion to *replace* a static state — the static state must work even with motion disabled.

**Quick check** — Toggle the OS's "Reduce motion" setting. Does every state still read correctly?

---

## 7. Cross-Platform & Input-Modality

> Mouse, touch, keyboard, voice, and switch users all encounter the same button. The relative weight of each state changes per modality.

**Mouse-driven (desktop)**

- All five core states fire. Hover carries meaningful weight.
- Focus ring may be hidden on click via `:focus-visible`.

**Touch (mobile, tablet)**

- **Hover does not exist.** Do not depend on it for any information.
- Active state carries the feedback weight hover normally would.
- Touch targets ≥ **44 × 44 px / 48 × 48 dp** are mandatory.
- Tap-and-hold should never trigger a destructive action without confirmation.

**Keyboard**

- Focus is the cursor. Focus state must be visible at all times.
- Space activates `<button>`; Enter activates both `<button>` and `<a>`.
- Tab order matches visual order; `tabindex="-1"` removes from order but keeps programmatically focusable.

**Voice & switch control**

- Every button must have an accessible name (visible label or `aria-label`).
- The accessible name should match the visible label — never use `aria-label` to replace what the eye sees.

**Agent rules — DO NOT**

- Do not gate any state behind a hover that has no touch equivalent.
- Do not use `pointerdown` without an equivalent `keydown` handler for keyboard parity.

**Quick check** — Disconnect each input modality in turn. Does the button still communicate every state in the modalities that remain?

---

## 8. State Implementation Contract

> What each state must produce, regardless of stack. The **contract** is the rule; the implementation is a detail. Platform mappings and a reference snippet follow.

For every state, four things must be true:

1. **Visual treatment** — the state has a defined appearance distinct from the others (color, elevation, opacity, label, icon).
2. **Trigger** — the event that enters the state is defined (pointer event, keyboard event, system response, programmatic toggle).
3. **Exit** — the event that returns the button to the previous (or next) state is defined.
4. **Accessibility hook** — the state is exposed to assistive technology through the platform's native semantics.

### 8.1 The state contract, per state

| State        | Required visual change                            | Required trigger                          | Required a11y hook                                              |
| ------------ | ------------------------------------------------- | ----------------------------------------- | --------------------------------------------------------------- |
| Default      | Distinct, recognizable-as-interactive             | Component mount; exit from any other state | Native button role                                              |
| Hover        | Subtle delta (color/elevation) — pointer-only     | Pointer enters bounds                     | None (pointer-only enhancement)                                 |
| Active       | Firmer delta (darker fill + ~2% scale-down)       | Pointer press, touch, or Space/Enter      | None (transient feedback)                                       |
| Focus        | Visible ring, ≥ 3:1 contrast, instant             | Keyboard focus (Tab, Shift-Tab, programmatic) | Native focus indicator preserved or replaced                |
| Disabled     | Muted fill, ≥ 3:1 label contrast, "not-allowed" cursor | Programmatic — gate, validation, rate-limit | Disabled semantic flag; reason exposed to AT                |
| Loading      | Spinner or progress; same width as default        | Action dispatched, awaiting response      | Busy semantic flag; live-region announcement                    |
| Success      | Success color + checkmark + past-tense label      | Action resolved positively                | Polite live-region announcement                                 |
| Error        | Error color + icon + inline recovery message      | Action resolved negatively                | Assertive (blocking) or polite (recoverable) live-region        |
| Selected     | Inverted/filled style, persists until toggled off | User toggles on                           | Pressed/checked semantic flag                                   |

### 8.2 Trigger and a11y hook by platform

The same state contract maps to different primitives in each stack. Pick the native primitive for the platform you're on — never re-invent the wheel.

| State    | What the platform must provide |
| -------- | ------------------------------ |
| Default  | The native button element or control in its base state. |
| Hover    | A pointer-only pseudo-state or effect. Not available on pure-touch platforms — do not depend on it. |
| Active   | A pressed/highlighted state that fires on pointer down, touch, and keyboard activation. |
| Focus    | A keyboard-only focus indicator (prefer "keyboard-only" detection APIs to skip the mouse-click flash). |
| Disabled | A native disabled attribute or flag, plus an accessibility property that exposes the disabled state to assistive tech. |
| Loading  | A custom busy/loading state that disables the control, shows progress feedback, and announces the state to assistive tech. |
| Success  | A custom state that announces completion to assistive tech via a non-urgent live region or equivalent. |
| Error    | A custom state that announces the failure to assistive tech via an urgent or polite announcement, depending on severity. |
| Selected | A toggled/pressed semantic flag exposed to assistive tech that persists until the user toggles it off. |

Every platform ships native APIs for these states. Use them. Consult the platform's published interface guidelines for the correct primitives — do not re-implement focus, disabled, or selected semantics from scratch when native equivalents exist.

### 8.3 Pointer- and input-event semantics

Stack-independent rules for which event triggers which state.

| Trigger              | Fires on                       | State produced | Notes                                                       |
| -------------------- | ------------------------------ | -------------- | ----------------------------------------------------------- |
| Pointer enter        | Mouse / trackpad / Apple Pencil hover | Hover     | **Never available on pure touch.** Do not depend on it.     |
| Pointer down / touch start / Space-Enter | Click, tap, keyboard activation | Active | Must fire on every input modality                       |
| Keyboard focus       | Tab, Shift-Tab, programmatic   | Focus          | **Prefer "keyboard-only" detection** (e.g. CSS `:focus-visible`, iOS focus engine) to skip the mouse-click flash |
| Programmatic disable | App logic, validation, gating  | Disabled       | Pair with an exposed reason                                 |
| Programmatic busy    | Async dispatch                 | Loading        | Always disable for the duration                             |
| Async resolution     | Promise/callback/observable    | Success / Error | Return to default within 1.5–3 s, or transform into next action |
| Toggle activation    | User selects                   | Selected       | Persists until toggled off                                  |


**Agent rules — DO**

- For every button you generate, **list which state contracts in §8.1 are wired up** and where (markup, styles, controller).
- Use **native platform primitives** before custom abstractions — `:focus-visible` on web, `UIControl.State.focused` on iOS, `state_focused` on Android. Custom focus tracking is a leak.
- Drive functional states (loading/success/error/selected) from **a single source of truth** — typically a state machine, store, or component prop — never from ad-hoc class toggles scattered across handlers.

**Agent rules — DO NOT**

- Do not port a CSS snippet wholesale into a stack it wasn't written for. Translate to the native primitive.
- Do not invent custom event tracking for states the platform already exposes.
- Do not couple visual treatment to event handlers — keep the state in the model, render the visual from the state.

**Quick check** — For the button you just generated, name the visual, the trigger, the exit, and the a11y hook for every state in scope. Any blank field is a missing piece of the contract.

---

## 9. State Diagrams & Screen Mapping

> The default flow through a button is the happy path. State diagrams document every other path.

**Why it matters.** Most defects come from the unhappy path — the failed submit, the expired session, the half-loaded form. Mapping every state up front catches the gaps before development.

**Agent rules — DO**

- For any button on the critical path, **explode** the screen into every combination of states the button can occupy. A submit button might have: default → loading → success | error → default.
- Document the **trigger** and the **next state** for each transition (e.g. "On click → loading; on 200 OK → success; on 4xx → error with inline message").
- Surface edge cases in writing: what happens if the user clicks while disabled? What if they leave the surface during loading?
- Use a flowchart, a state table, or component-variant grid — whichever your team reads fastest.

**Agent rules — DO NOT**

- Do not hand off "the button" without the full state set; engineers will ship the missing states their own way and the design system will drift.
- Do not skip the unhappy path because "errors are rare" — the day they happen, the user remembers.

**Quick check** — For the button you are designing, can you draw the full state diagram on one sheet of paper? If a transition is missing, the design is incomplete.

---

## 10. Accessibility — Non-Negotiable Baseline

WCAG 2.2 sets the floor. None of the rules below are stylistic preferences.

- **Contrast.** Label vs. fill ≥ **4.5:1** for normal text, **3:1** for large text, in **every** state (default, hover, active, focus, disabled, selected). Disabled is not exempt in practice — a label nobody can read is no label at all.
- **Focus indicator.** Visible, ≥ 2 px thick, ≥ 2 px offset, ≥ **3:1** contrast against both the button and the page background. WCAG 2.2 SC 2.4.11 (Focus Not Obscured) and 2.4.13 (Focus Appearance) apply.
- **Color is never the sole channel.** Pair every color shift with at least one of: icon, label change, border weight, position, motion (subject to reduced-motion).
- **Touch target.** ≥ **44 × 44 px** (Apple HIG) / **48 × 48 dp** (Material). WCAG 2.2 SC 2.5.8 (Target Size — Minimum) requires ≥ 24 × 24 px as an absolute floor; treat this as a hard fail, not a goal.
- **Keyboard parity.** Every state reachable and operable from the keyboard. Tab + Space/Enter never leaves a state stuck.
- **Assistive-tech semantics.**
  - `aria-disabled="true"` for non-native disabled.
  - `aria-busy="true"` and/or visually-hidden "Loading…" label during loading.
  - `aria-pressed="true|false"` for toggle buttons.
  - `aria-live="polite"` for non-urgent state changes (success); `assertive` only for blocking errors.
- **Reduced motion.** When `prefers-reduced-motion: reduce`, replace transform-based feedback with instant or near-instant color changes.
- **Don't suppress the system.** Never `outline: none` without a replacement; never override the native `disabled` semantics; never ship a button without an accessible name.

**Quick check** — Run a keyboard-only test, a screen-reader announcement test, and a contrast check on every state. All three must pass before ship.

---

## 14. Resolving Conflicts Between Rules

Apply this priority when two rules pull against each other:

1. **Accessibility & WCAG 2.2** override everything.
2. **Touch parity** before hover delight — never depend on hover alone.
3. **Focus visibility** before aesthetic restraint — design the ring into the brand, don't suppress it.
4. **Single primary per surface** before novelty — visual hierarchy beats decorative variation.
5. **Consistency across the system** before per-surface optimization — one rule per state, applied everywhere.
6. **Subtlety in feedback** before delight — hover/active are acknowledgments, not performances.
7. **Recovery in error states** before brand-safe copy — let the user retry first, polish the phrasing second.

When two equally-weighted rules conflict, prefer the option that costs the user less effort.

---

For interaction anti-patterns, see `anti-patterns.md`. For pre-ship checklists, see `preflight.md`.
