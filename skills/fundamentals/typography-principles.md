# Typography Principles

Universal typography principles covering foundations, hierarchy & scale, readability, accessibility, responsive type, and brand tone — the reasoning layer for typographic decisions.

---

## 0. How agents must use this document

1. **Treat each pillar as a lens.** Before generating or reviewing typography, scan all six pillars and identify which apply to the artifact. Most surfaces touch at least four (foundations, hierarchy, readability, accessibility).
2. **Foundations first.** Decide the typeface(s), the family count (1–2, never 3+), and the weights you'll use *before* writing any styles. Resist the urge to add another font later.
3. **Build the scale once.** Pick a modular ratio (`1.125`, `1.2`, `1.25`, `1.333`, `1.414`, `1.5`, `1.618`) and derive every size from the body base. Never set sizes "by eye."
4. **Validate readability before aesthetics.** A beautiful typeface that's unreadable at body size is a failure. Test at 16px, 14px, and zoomed-in 200%.
5. **Bake accessibility in from the first line of CSS** — contrast ratios, focus order on text controls, dynamic type, and `prefers-reduced-motion` for animated copy.
6. **Design for the smallest screen first.** Mobile is the majority of traffic. If type works at 360px wide it almost always works on desktop; the reverse is rarely true.
7. **Justify every deviation.** If you break a rule (e.g. shipping a third typeface, dropping below 14px on a control), name the rule, explain why, and document the compensating control.
8. **Font choice is yours; the rules are universal.** This document never mandates a specific typeface. Where typefaces are named anywhere below, they appear only as **illustrations of a category** (humanist sans, transitional serif, monospace, etc.). Every rule applies to whichever typeface(s) you and your team have already chosen.

---

# Pillar 1 — Type System Foundations

## 1.1 The vocabulary you must use precisely

| Term | Definition |
|---|---|
| **Typeface** (font family) | The named design that defines the shared visual style across every character, number, and symbol. A typeface is composed of multiple fonts. |
| **Font** | A specific weight/style instance within a typeface — e.g. the Regular, Bold, or Bold Italic *of whichever typeface you have chosen*. |
| **Weight** | Stroke thickness expressed numerically (100–900) or by name (Thin, Regular, Medium, Bold, Black). |
| **Style** | Upright (Roman) vs. Italic vs. Oblique. |
| **x-height** | Height of the lowercase `x`. Typefaces with a **high** x-height read better at small UI sizes; typefaces with a **low** x-height often suit long-form display use. |
| **Cap height** | Height of uppercase letters from the baseline. |
| **Ascender / Descender** | Strokes that rise above x-height (`h`, `b`) or descend below baseline (`g`, `p`). |
| **Counter** | The enclosed/open negative space inside a letter (`o`, `d`). Open counters improve legibility at small sizes. |
| **Tracking (letter-spacing)** | Uniform spacing across a run of text. Tighten for headlines, loosen for ALL CAPS labels. |
| **Kerning** | Adjustment between specific letter *pairs*. Mostly handled by the font; intervene only for display headlines. |
| **Leading (line-height)** | Vertical space between baselines of consecutive lines. |
| **Measure (line length)** | Number of characters per line. The single biggest readability lever after font size. |

## 1.2 Choosing typefaces

The rules below describe **categories and characteristics**. Pick any typeface that fits the category — what matters is the structural traits, not the specific name.

- **Default to system fonts** for performance and platform familiarity unless brand requires a custom face. A platform-aware system stack ships zero bytes, scales correctly with the user's OS settings, and supports every script.
- **Sans-serif for body on screen.** Sans-serif faces with a **high x-height** and **open counters** outperform serifs at typical body sizes on standard-density screens. Look for humanist sans-serifs with clearly differentiated letterforms.
- **Serif for editorial display.** Reserve serifs for headlines, pull quotes, or brand voice that calls for tradition. On high-DPI screens the legibility gap has narrowed, so serifs can also work for long-form body if the typeface is screen-tuned.
- **Monospace for code and tabular numerals.** Use any monospaced family for code blocks and terminal output. For data tables in any typeface, also enable `font-variant-numeric: tabular-nums` so digits align column-wise.
- **Avoid script and decorative typefaces for anything beyond a single logotype or hero word.** They collapse below ~24px regardless of which script face you choose.

### Selection process — choose a typeface in this order

1. **Scope the deliverable.** How is the content delivered (web app, marketing site, native app, email, print)? Who is the audience? What typefaces do competitors / category leaders use? Each delivery medium rewards different families.
2. **State the tone in one sentence** (e.g. "professional and approachable", "playful and energetic", "authoritative and editorial"). A typeface either reinforces that tone or undermines it.
3. **Shortlist 3–5 candidates** that fit the tone *and* the category constraints above. For most UI work, the shortlist will be high-x-height humanist sans-serifs.
4. **Test each candidate with real, representative content** at the actual sizes you'll ship — body, lead paragraph, heading, microcopy. Lorem ipsum hides legibility problems; copy from your actual product reveals them.
5. **Test each candidate with the brand colors** on both light and dark backgrounds. The same brand color sometimes loses contrast on light backgrounds while reading fine on dark ones (or vice-versa) and the typeface that survives both wins.
6. **Test the ambiguous-character set:** `Il1 O0 rn/m a/o cl/d`. The winning typeface differentiates these clearly at body size with no squinting.
7. **Confirm glyph coverage** for every script you'll ship (Latin Extended, CJK, Arabic, Cyrillic, etc.). Don't discover a missing glyph in production.
8. **Ship the variable-font version if it exists;** ship 2–4 static weights only if it doesn't.

## 1.3 Pairing rules

- **One family is always safe.** A well-designed family with Regular/Medium/Semibold/Bold weights covers 95% of needs.
- **If you pair, pair across classification.** One sans + one serif. Two sans-serifs that are visually similar create dissonance, not contrast.
- **Match x-heights when pairing for body + headline** so the visual weight matches across hierarchy levels.
- **Never exceed three families on a single product** (typically: brand display, UI sans, code mono).
- **Test the pair on a real layout** — pairing decisions should be validated on a representative page, not on isolated specimens.

## 1.4 Weight discipline

- **Ship 2–4 weights per family.** Typical ramp: Regular (400), Medium (500), Semibold (600), Bold (700). A well-designed family with these four covers ~95% of needs regardless of which family you've picked. Adding more weights bloats payload and tempts inconsistent use.
- **Body copy lives at 400 or 500.** Reserve 600+ for headings, emphasis, and key labels.
- **Avoid Thin (100) and Light (200/300) below 18px** — strokes thin out and contrast against the background drops below WCAG limits.
- **Avoid Black (900) at any UI size below 24px** — counters fill in and legibility drops.
- **Prefer variable fonts** when available: a single file delivers the full weight axis (and often width/optical-size), smaller than two static weights combined.

## 1.5 Loading and performance

- **Subset fonts** to the glyphs you actually need (Latin-1, Latin Extended, etc.). Never ship the full glyph set unless you use it.
- **Use `font-display: swap`** so text renders immediately in a fallback while the custom font loads. The brief Flash of Unstyled Text (FOUT) beats invisible text.
- **Preload the critical face** (headline + body Regular) with `<link rel="preload" as="font" crossorigin>` to prevent layout shift on hero text.
- **Pick a fallback that matches metrics.** CSS `size-adjust`, `ascent-override`, `descent-override` on `@font-face` can match the fallback to the loaded font and eliminate Cumulative Layout Shift.

## 1.6 Agent rules — foundations

- **DO** default to a system font stack unless the brief explicitly requires a custom face.
- **DO** keep family count to 1, push to 2 only with a justification, never reach 3+.
- **DO** declare 2–4 weights per family and stick to them.
- **DO** subset, preload, and use `font-display: swap`.
- **DO** use variable fonts when available.
- **DO NOT** introduce a new typeface mid-project to "spice up" a section. Reuse what exists.
- **DO NOT** ship Thin/Light weights below 18px or Black weights below 24px.
- **DO NOT** rely on Comic Sans, Papyrus, or any decorative face for system text.

## 1.7 Foundations checklist

- [ ] Typeface(s) chosen for the medium (screen vs. print, body vs. display).
- [ ] No more than 2 families used; 3rd only for code (mono).
- [ ] 2–4 weights per family declared.
- [ ] System-font fallback stack defined for every custom face.
- [ ] Variable font used where available.
- [ ] Glyph subsetting and `font-display: swap` configured.
- [ ] Critical fonts preloaded; fallback metrics matched.

---

# Pillar 2 — Hierarchy & Scale

## 2.1 Why hierarchy matters

Type hierarchy lets users *scan* before they *read*. Without it every word competes equally and the eye has nowhere to land. Strong hierarchy improves UX, scannability, and SEO (search engines weight heading semantics).

## 2.2 The modular scale

Pick **one** ratio and derive every size from a single base.

| Ratio | Use case |
|---|---|
| **1.125** (Major Second) | Dense data UIs, dashboards, admin panels — subtle steps preserve density. |
| **1.2** (Minor Third) | General product UI; the safe default. |
| **1.25** (Major Third) | Marketing sites with moderate hierarchy contrast. |
| **1.333** (Perfect Fourth) | Bold marketing/landing pages. |
| **1.414** (Augmented Fourth, √2) | Print-influenced editorial. |
| **1.5** (Perfect Fifth) | High-contrast hero typography. |
| **1.618** (Golden Ratio) | Editorial / brand-led pages where the headline must dominate. |

**Example with base 16px and ratio 1.25:**

| Step | Size | Use |
|---|---|---|
| -2 | 10.24px → round to 11–12px | Captions, micro-labels (use sparingly) |
| -1 | 12.8px → 13px | Small text, helper text |
| 0  | 16px | **Body** |
| +1 | 20px | Lead paragraph, large body |
| +2 | 25px | h4 |
| +3 | 31.25px | h3 |
| +4 | 39.06px | h2 |
| +5 | 48.83px | h1 |

## 2.3 Hierarchy beyond size

Size alone is brittle. Reinforce hierarchy with at least one of:

| Lever | When to use |
|---|---|
| **Weight** | Cheapest signal — Bold headings vs. Regular body. |
| **Color** | Primary heading dark; secondary copy mid-tone; tertiary muted. Reinforce, never replace, size. |
| **Letter-spacing / Case** | Tight tracking for large headings (`-0.02em`); positive tracking for ALL CAPS section labels (`0.08–0.15em`). |
| **Family** | Serif headline + sans body provides hierarchy through contrast. |
| **Position** | Centered hero vs. left-aligned body signals different roles. |

## 2.4 The four-level rule

- **Limit any single surface to 3–4 hierarchy levels.** Beyond that the hierarchy collapses into noise.
- **One element dominates per surface.** Identify the single most important word/sentence and make it visually unmistakable.
- **Squint test.** Reduce the design to ~25% size or blur it. The primary element should still be the first thing the eye finds.

## 2.5 Heading semantics

- **One `<h1>` per page.** Reserve it for the page's primary subject.
- **Never skip levels** (`<h2>` → `<h4>`) — assistive tech relies on the heading outline. Restyle visually if you need a smaller-looking heading; preserve the level semantically.
- **`<h1>`–`<h6>` should match the visual hierarchy.** A "section title" styled to look like an h2 should *be* an h2, not a styled `<div>`.

## 2.6 Heading size ≠ heading level (anti-inflation rule)

A common and damaging failure mode: agents and developers conflate **semantic level** (`<h1>`–`<h6>`) with **visual size**. The result is footer column titles set as `<h2>` at 32px, card titles at 28px competing with the page hero, and FAQ questions rendered as display headlines. The page hierarchy collapses because every "title" looks like a section opener.

**The principle:** semantic level is set by the **document outline**; visual size is set by the **role of the heading on its surface**. The two are independent decisions and must be made independently.

### Visual size by role

| Role | Typical level | Typical size (web) | Why this size |
|---|---|---|---|
| **Page hero / first impression** | `<h1>` | Largest in the scale (clamp ~36–72px) | One dominant element per page. |
| **Major section opener** | `<h2>` | Second-largest (clamp ~28–44px) | Anchors a section so users can scan the page outline. |
| **Sub-section opener** | `<h3>` | Third-largest (~22–32px) | Used only when an `<h2>` section has clearly distinct sub-topics. |
| **Card / tile title** | `<h3>` or `<h4>` | **16–20px** (often body size or one step above) | A card is one of many siblings — its title competes inside the card, not with the page. |
| **Modal / dialog title** | `<h2>` (within the dialog) | 18–24px | Anchors the dialog; never larger than the page hero behind it. |
| **Accordion / FAQ question** | `<h3>` | **16–18px** | Repeats many times — must stay scannable, not shouty. |
| **Footer column title** | `<h3>` or `<h4>` | **14–16px**, often uppercase with `letter-spacing: 0.06em+` | Functions as a list label, not a banner. |
| **Sidebar / nav group label** | `<h3>` or `<h4>` | **14-16px**, uppercase with tracking | A navigation cue, not a content opener. |
| **List-group label inline in body** | `<h4>` or `<h5>` | Body size or one step below | Quietly groups related items. |

### The two questions to ask before sizing any heading

1. **What is its level in the document outline?** → Determines the HTML tag.
2. **What is its visual role on the surface?** → Determines the CSS class and `font-size`.

A footer "Product" column title might be `<h3>` semantically (it sits inside `<footer>` after the page's `<h2>` section openers) and 14px visually (it's a list label, not a section opener). Both decisions are correct *and independent*. A card title might be `<h3>` semantically and 18px visually, while an `<h3>` opening a sub-section in long-form content might be 28px — same tag, different role, different size.

### Specific rules

- **Display-scale sizes (≥ 30px) belong only to the page hero `<h1>` and the *opening heading of a major page section* (`<h2>`).** Nothing else on the page should compete with them visually.
- **Card / tile titles never exceed ~20px** unless the card *is* the hero of the page (e.g. a single featured card layout). A card is a sibling of other cards; if its title is the same size as a section heading, the grid loses its identity as a group.
- **Card / tile titles and footer column titles must use `<h4>` or lower, never `<h2>` or `<h3>`.** Reserve `<h2>` exclusively for major page-section openers. Reserve `<h3>` for sub-sections of an `<h2>`. Using `<h2>` or `<h3>` inside a repeating component (card, list, footer column) inflates the heading size because base heading styles scale `<h2>` and `<h3>` to section-opener sizes. Cards and footer columns are containers of many siblings — their titles are list labels, not section openers. Use `<h4>` with explicit small sizing (14–20px via utility classes).
- **Footer column titles, sidebar group labels, nav group labels, and any "list-label" heading must be small** (typically 13–16px, frequently uppercase with letter-spacing). Their job is to label a list, not to open a section. Always use `<h4>` or `<h5>`, never `<h2>` or `<h3>`.
- **FAQ / accordion questions stay close to body size** (16–18px). They appear many times in a row; size them like list items, not like headlines.
- **Modal / dialog titles are larger than body but smaller than the page hero** (18–24px). The modal is a temporary surface, not the main story.
- **Stat / metric numerals are not headings.** A "99.99%" uptime figure is a *display number*, not an `<h2>`. Use a `<p>` (or `<span>`) with display-scale size and pair it with a small `<p>` label. Save heading tags for actual headings.
- **Define heading roles as named CSS classes** (e.g. `.heading-display`, `.heading-section`, `.heading-sub`, `.heading-card`, `.heading-label`) and apply them by *role*, not by tag. This stops the automatic mental map of `tag → size` and forces a deliberate role decision.

### Quick decision tree (use this every time you write a heading)

```
Is this heading the FIRST IMPRESSION of the page?
├─ YES → <h1>, display-scale (36–72px clamp), unique on the page.
└─ NO  → Is it the OPENER of a major page section?
        ├─ YES → <h2>, large (28–44px clamp), one per major section.
        └─ NO  → Is it a SUB-section of an <h2> (NOT inside a repeating component)?
                ├─ YES → <h3>, medium (~22–32px).
                └─ NO  → Is it INSIDE a repeating component (card, pricing tier, footer column, sidebar, FAQ)?
                        ├─ YES → <h4> or <h5>, small (14–20px), uppercase + tracking for labels. NEVER <h2> or <h3>.
                        └─ NO  → Probably not a heading. Use <p> with the right class.
```

## 2.7 Agent rules — hierarchy

- **DO** pick a single modular ratio for the whole product and document it as a token (e.g. `--type-ratio: 1.25`).
- **DO** apply 3–4 levels per surface; collapse anything beyond that.
- **DO** establish one dominant element per view via size + weight + color combined.
- **DO** preserve heading semantics (`<h1>`–`<h6>`) regardless of visual restyling.
- **DO** match heading visual size to its **role** (hero / section opener / sub-section / card / list label), **not** to its HTML tag.
- **DO** restrict display-scale sizes (≥ 30px) to the page hero `<h1>` and major section `<h2>` openers.
- **DO** keep card/tile titles ≤ 20px and footer/sidebar/nav-group list-labels ≤ 16px.
- **DO** define named role classes (`.heading-section`, `.heading-card`, `.heading-label`, etc.) and apply by role.
- **DO NOT** create one-off type sizes. If you need 22px and the scale offers 20 or 25, pick one and refactor — don't add an off-scale value.
- **DO NOT** rely on color alone for hierarchy (fails for color-vision-deficient users).
- **DO NOT** use multiple `<h1>`s on a single page.
- **DO NOT** auto-size every `<h2>` as a "section heading" regardless of where it appears — an `<h2>` inside a modal or card needs its own role-appropriate size.
- **DO NOT** use display-scale type for repeating elements (cards, FAQ items, footer column titles, sidebar groups). If everything is a banner, nothing is.
- **DO NOT** wrap stat numerals or marketing slogans in `<h2>`/`<h3>` just because they're large — those are display *paragraphs*, not headings.

## 2.8 Hierarchy checklist

- [ ] One modular ratio chosen and applied across all sizes.
- [ ] Every size traceable to the base × ratio^n.
- [ ] Maximum 3–4 visible hierarchy levels per view.
- [ ] One dominant element per surface; squint test passes.
- [ ] Heading semantics correct; no skipped levels.
- [ ] Hierarchy reinforced by at least two signals (size + weight, or size + color).
- [ ] Display-scale sizes (≥ 30px) used **only** for the page hero `<h1>` and major section `<h2>` openers.
- [ ] Card / tile titles ≤ 20px.
- [ ] Footer column titles, sidebar/nav group labels ≤ 16px (typically 13–16px with tracking).
- [ ] FAQ / accordion questions in the 16–18px range.
- [ ] Modal titles smaller than the page hero behind them.
- [ ] No `<h2>`/`<h3>` wrapping pure stat numerals or non-heading display text.

---

# Pillar 3 — Readability & Legibility

## 3.1 The distinction

- **Legibility** = can the user *recognize* individual characters? (typeface design, x-height, counter shape, weight)
- **Readability** = can the user *comfortably read* extended passages? (size, line-height, line length, contrast, language clarity)

## 3.2 The readability triad: size · line-height · measure

These three values are coupled — change one and you must reconsider the others.

### Size

| Context | Recommended | Floor |
|---|---|---|
| **Web body** | 16–18px (1rem–1.125rem) | 14px (only for legitimate microcopy) |
| **Mobile native body** | iOS 17pt, Android 16sp | Don't go below |
| **Form labels & UI controls** | 14–16px | 12px never on interactive labels |
| **Headlines (h1)** | 32–72px depending on hero treatment | — |
| **Captions, footnotes** | 12–13px | 11px is the absolute floor; below this is unreadable for many users |

### Line-height (leading)

| Context | Recommended |
|---|---|
| **Body copy** | 1.4–1.6 (sweet spot is 1.5–1.6 for long-form) |
| **Headings** | 1.05–1.25 (tighter as size increases) |
| **UI labels and buttons** | 1.0–1.2 |
| **Multi-line captions** | 1.4 |

Larger type wants tighter leading; smaller type wants looser leading. This is not a "looks nice" preference — it's how the eye tracks lines.

### Measure (line length)

- **Desktop body**: 45–75 characters per line (CSS: `max-width: 65ch` is a reliable default).
- **Mobile body**: 30–45 characters per line is acceptable; the screen forces this.
- **Lines longer than 90 characters** force the eye to "find" the next line and reading speed drops sharply.
- **Lines shorter than ~30 characters** create too many line breaks per paragraph and disrupt rhythm.

## 3.3 Spacing micro-rules

- **Tracking on body**: leave it alone. The font designer set it correctly.
- **Tracking on display headlines**: tighten slightly (`-0.01em` to `-0.03em`) to compensate for visual looseness at large sizes.
- **Tracking on ALL CAPS labels**: open it up (`0.05em` to `0.15em`) so caps don't crash into each other.
- **Paragraph spacing**: prefer space *between* paragraphs (margin-bottom ≈ 1em) over indented first lines on screen.
- **No double spaces after a period.** Ever. Modern fonts handle this.

## 3.4 What hurts readability

| Anti-pattern | Why it hurts | Fix |
|---|---|---|
| ALL CAPS body paragraphs | Strips ascender/descender shape cues; reduces scannability ~13%. | Reserve caps for short labels (≤2 words). |
| Justified text without hyphenation | Creates "rivers" of white space. | Use left-align for screen, or enable `hyphens: auto`. |
| Italic body paragraphs | Slower to read for most users. | Use italic for emphasis, titles of works, foreign terms. |
| Centered multi-line paragraphs | Each line starts at a different position, forcing a "find" action. | Center only headlines and 1–2 line callouts. |
| Pure black on pure white at full brightness | High contrast can cause eye strain. | Use near-black (#1A1A1A) on near-white (#FAFAFA) — still meets contrast. |
| Decorative scripts at small size | Counters fill in, strokes blur. | Scripts only ≥24px and only for logos/hero. |
| Underlining non-link text | Trains users that *anything* underlined is a link, then underlining a link doesn't help. | Use bold or color for emphasis; reserve underline for links. |
| Thin/Light weight on thin background contrast | Drops below 4.5:1. | Use Regular weight or darker color. |

## 3.5 Long-form vs. UI text

- **Long-form (articles, docs)**: 18–20px body, 1.6 line-height, 65ch measure, generous paragraph spacing. Prioritize comfort over density.
- **UI (forms, lists, dashboards)**: 14–16px body, 1.4 line-height, density-driven measure. Prioritize scanning over reading.
- **Tables of numbers**: enable `font-variant-numeric: tabular-nums` so digits align column-wise. Right-align numeric columns; left-align text columns.

## 3.6 Letter case

Five case styles, each with a specific job. Pick the case by the role the text plays — never by aesthetic preference alone.

| Case | Pattern | Use for | Avoid for |
|---|---|---|---|
| **Sentence case** | First word capitalized, rest lowercase | Body paragraphs, button labels, form labels — almost everything. The default. | — |
| **Title Case** | All Major Words Capitalized (Articles, Short Prepositions, and Conjunctions Stay Lowercase) | Editorial headlines, page titles, navigation items, section headings in formal contexts. | Body text. Mid-sentence labels. |
| **ALL CAPS** | EVERY LETTER UPPERCASE | Short emphasis labels (≤ 2 words), category tags, eyebrow labels above headings, wordmarks. | Body text (drops scannability ~13% by removing ascender/descender shape cues). Long button labels. Conversational/chat UI (reads as yelling). |
| **Small caps** | Capital letterforms drawn at x-height | Distinguishing acronyms, abbreviations, or running heads from body without the visual weight of full caps. | Body text in any typeface that lacks proper small-cap glyphs — faux small caps look bad. |
| **all lowercase** | Every letter lowercase | Stylistic wordmarks, intentionally informal brand voice. | Anything users read for information. |

### Case rules

- **Default to sentence case** for buttons, links, form labels, and microcopy. It is faster to read, more accessible, and feels less shouty.
- **Always increase tracking on ALL CAPS** by `0.05em` to `0.15em`. Caps were never designed to sit next to each other and crash visually without spacing.
- **Avoid ALL CAPS in conversational interfaces** (chat, comments, social, support tickets) — readers parse it as yelling.
- **Use real small-cap glyphs only** (`font-variant-caps: small-caps` works only when the font ships small caps). If the font doesn't ship them, skip the effect entirely; faux small caps stretch a regular cap down and look broken.
- **Never set an entire paragraph in ALL CAPS** even for "emphasis." Use weight, color, or a higher heading level instead.
- **Avoid Title Case in conversational UI**; sentence case is the modern web default for buttons, dialog titles, and microcopy.

## 3.7 Text layout details — widows, orphans, the rag

The "boring" details that separate amateur typography from polished work. None of them require code changes most of the time — they require *attention*.

### Widows and orphans (a.k.a. "danglies")

- **Widow**: a single word or very short line stranded at the end of a paragraph or headline.
- **Orphan**: the first line of a paragraph stranded alone at the bottom of a column or page (the rest of the paragraph wraps to the next column).
- Both disrupt visual flow and create awkward white space. Some teams prefer the gentler term **"danglies"** to avoid the loaded language.

**Fix on the web:**

- Use `text-wrap: balance` on **headings** and short paragraphs to let the browser distribute words evenly across lines.
- Use `text-wrap: pretty` on **longer paragraphs** (where supported) to push the last line to a healthier length.
- Use a non-breaking space (`&nbsp;`) before the last word of a headline to drag it onto the previous line if it would otherwise dangle.
- Adjust the container width by a few characters — widening or narrowing often resolves a dangly without code changes.

### The rag

The "rag" is the uneven right edge of left-aligned text (or the left edge of right-aligned text). A **good rag** is gently uneven, with no dramatic jumps in line length; a **bad rag** has lines that vary wildly, creating zigzag visual noise.

- Adjust container width or `letter-spacing` slightly to soften a bad rag.
- For narrow columns where the rag is unavoidable, accept it — forcing tight widths into clean justification creates worse rivers.
- Hyphenation (`hyphens: auto`) tames the rag by allowing word breaks at line ends.

### Line length under pressure

- Body line length under ~30 characters loses rhythm; over ~75 characters loses the eye between line returns.
- If you must use a wide column, **increase line-height** (toward 1.7–1.8) to compensate.
- If you must use a narrow column, **reduce line-height slightly** (toward 1.4) so the text doesn't feel lonely.

### Justification — the four options

- **Left-aligned** (left-justified) — the default for body text on screen. Predictable starting point for every line; the rag accepts naturally varied line endings.
- **Right-aligned** — for tabular numerics or text paired with a strong vertical anchor on the right (e.g. timeline labels). Rarely for paragraphs.
- **Centered** — only for ≤ 2-line callouts, headlines, and quotes. Multi-line centered paragraphs force the eye to find each line's start.
- **Fully justified** — only with `hyphens: auto` enabled. Without hyphenation it produces "rivers" of white space inside the paragraph.

## 3.8 Agent rules — readability

- **DO** set body type at 16–18px on web, 17pt on iOS, 16sp on Android.
- **DO** target a measure of 45–75 characters; enforce with `max-width: 65ch`.
- **DO** set body line-height between 1.4 and 1.6.
- **DO** tighten line-height as font-size grows (headings often 1.05–1.25).
- **DO** use left-aligned, ragged-right text for paragraphs on screen.
- **DO** default to sentence case for UI labels, buttons, and microcopy.
- **DO** add `0.05em`–`0.15em` of tracking to any ALL CAPS run.
- **DO** apply `text-wrap: balance` to headings to prevent danglies.
- **DO** use `text-wrap: pretty` on long paragraphs where supported.
- **DO NOT** use ALL CAPS, italic, or centered text for body paragraphs.
- **DO NOT** use ALL CAPS in conversational interfaces (it reads as yelling).
- **DO NOT** justify text on screen unless `hyphens: auto` is also enabled.
- **DO NOT** drop interactive text below 14px or static body text below 14px.
- **DO NOT** override the font's built-in kerning on body copy.
- **DO NOT** ship faux small caps (only enable `small-caps` when the font has real small-cap glyphs).

## 3.9 Readability checklist

- [ ] Body type is 16–18px on web (or platform-equivalent).
- [ ] Body line-height is 1.4–1.6.
- [ ] Measure is 45–75 characters (60–65 ideal).
- [ ] Headings have tighter line-height than body.
- [ ] No ALL CAPS, italic, or centered body paragraphs.
- [ ] Paragraphs separated by space, not indent (on screen).
- [ ] Justified text only with hyphenation enabled.
- [ ] Tabular numerals on data tables.
- [ ] Sentence case used for UI; ALL CAPS reserved for short labels with positive tracking.
- [ ] Headings use `text-wrap: balance`; long paragraphs use `text-wrap: pretty` where supported.
- [ ] No widows / orphans / danglies in shipped headlines or hero copy.
- [ ] Rag is gentle, not zigzag.

---

# Pillar 4 — Accessibility

Typography accessibility is non-negotiable. Per the Conflict Resolution Priority (§8), accessibility wins over every other concern.

## 4.1 WCAG 2.2 contrast minimums

These are the floor values every text/background combination must meet. Aim higher whenever the design allows.

| Text type | Minimum contrast |
|---|---|
| **Body text** (< 18pt regular, < 14pt bold) | **4.5 : 1** against background |
| **Large text** (≥ 18pt regular / 24px, or ≥ 14pt bold / 18.5px bold) | **3 : 1** |
| **UI components & graphical objects** (focus rings, icons) | **3 : 1** |
| **AAA target body** | 7 : 1 (aspirational; required for some regulated contexts) |

- Test contrast on the *actual* background, including images and gradients behind text.
- For text over images, use a scrim/overlay or text-shadow to guarantee contrast at the worst-case pixel.
- **Disabled text is exempt** from contrast rules but must still be perceivable as disabled.

## 4.2 Resizing and Dynamic Type

- **Users must be able to resize text up to 200%** (WCAG 1.4.4) without loss of content or functionality.
- **Use `rem`/`em` units** for font-size — they scale with the user's browser preference. Avoid `px` for body text when possible.
- **On native mobile platforms, use the platform's dynamic/scaled text system.** The platform provides named text styles that automatically adjust to the user's preferred reading size, including larger accessibility sizes. Use these styles instead of hard-coding point values.
- **On native platforms, use scale-aware units for text** so font sizes honor the system-level font scale preference; use density-independent units for layout.
- **On the web, support `prefers-reduced-motion`** for any animated copy. Provide a static end-state.

## 4.3 Cognitive and visual accessibility

- **Accessibility-tuned typefaces** (designed specifically for reading ease and letter differentiation) measurably improve comprehension for some users. Even if you don't ship one as the default, choose a typeface with **high readability characteristics** — high x-height, open counters, clearly differentiated letterforms — over a high-contrast geometric face whose strokes vanish at small sizes.
- **Open counters and clear letter differentiation** (`I` vs `l` vs `1`, `O` vs `0`, `rn` vs `m`) reduce reading errors. Test your chosen typeface by typing those exact strings at body size and checking that each character is unambiguous.
- **Avoid "decorative" italics for body**; many dyslexic users find them harder to read than upright text.
- **Provide a maximum line length cap** even on wide screens — long lines are especially hard for users with low vision and cognitive disabilities.

## 4.4 Color & dark mode

- **Test contrast in both light and dark themes.** A token system that flips colors must re-verify ratios in dark mode (often a pure-black background pushes contrast *too* high; a near-black tone is easier on the eye).
- **Don't rely on color alone** to convey state (error, success, required). Pair color with an icon, text label, or weight change.
- **Pure white on pure black** can cause "halation" (text appears to vibrate) for some users. Prefer near-white text on a near-black background instead.

## 4.5 Localization & RTL

- **Test with the longest expected translation.** German is ~30% longer than English; Russian and Arabic vary too. Bake flex/wrap into headings.
- **RTL languages** (Arabic, Hebrew, Persian) flip the entire reading direction. Use logical CSS properties (`margin-inline-start` over `margin-left`, `text-align: start` over `text-align: left`).
- **Diacritics** (accents above/below letters) require slightly more line-height. Test at 1.5+ leading for accented Latin scripts and CJK.
- **CJK and Arabic require different font stacks.** Don't assume a Latin-only font has glyph coverage. Provide locale-specific font stacks (`font-family` per `:lang(...)` selector or via `unicode-range` in `@font-face`).

## 4.6 Screen-reader semantics

- **Use real headings** (`<h1>`–`<h6>`), not styled `<div>`s.
- **Don't break words across inline elements** (e.g. `<span>Wel</span><span>come</span>`) — screen readers read this as two separate words.
- **Decorative typography** (e.g. ASCII art, Unicode "fancy" characters like 𝓗𝓮𝓵𝓵𝓸) is announced literally by screen readers and is unreadable. Use real letters with CSS styling.
- **Provide `aria-label`** on icon-only buttons that contain visual letterforms (e.g. a "B" bold-toggle button).

## 4.7 Agent rules — accessibility

- **DO** verify contrast ratios in both light and dark themes before shipping any color/type combination.
- **DO** use `rem` for font-size and `em` for derived spacing so user zoom works.
- **DO** support the platform's dynamic/scaled text system on native mobile.
- **DO** test the layout at 200% browser zoom and at the largest accessibility text size on mobile.
- **DO** use logical CSS properties for RTL support.
- **DO** pair color signals with text or icon signals.
- **DO NOT** ship pure white on pure black for body text.
- **DO NOT** use Unicode "stylized" letters for visual effect.
- **DO NOT** style `<div>`s to look like headings — use real heading elements.
- **DO NOT** ignore the longest-translation case during layout.

## 4.8 Accessibility checklist

- [ ] Body text contrast ≥ 4.5:1 (large text ≥ 3:1) in both themes.
- [ ] All text in `rem`/`em` (or platform-equivalent scaling unit).
- [ ] Platform dynamic/scaled text supported on native platforms.
- [ ] Layout intact at 200% zoom and largest accessibility text size.
- [ ] No critical information conveyed by color alone.
- [ ] RTL rendered correctly via logical properties.
- [ ] Heading semantics (`<h1>`–`<h6>`) match visual hierarchy.
- [ ] Longest expected translation tested in headings and buttons.

---

# Pillar 5 — Responsive & Cross-Platform Typography

## 5.1 Why typography must be responsive

Users see your text on phones, tablets, laptops, ultra-wide monitors, watches, TVs, and AR/VR headsets. The same `48px` headline that anchors a desktop hero overwhelms a 360px-wide phone. Typography that doesn't adapt fails users on the device they actually have.

## 5.2 Fluid typography with `clamp()`

The modern way: let the browser interpolate between a min and max size based on viewport width.

```css
/* min 36px, fluid 5vw, max 72px */
h1 { font-size: clamp(2.25rem, 5vw, 4.5rem); }
h2 { font-size: clamp(1.875rem, 4vw, 2.75rem); }
h3 { font-size: clamp(1.375rem, 3vw, 1.75rem); }
p  { font-size: clamp(1rem, 0.95vw + 0.85rem, 1.125rem); }
```

- **Min value** = the smallest acceptable size (mobile floor — never below your accessibility floor).
- **Preferred value** = a viewport-relative expression that scales smoothly.
- **Max value** = the cap so text doesn't grow grotesquely on ultra-wide screens.

## 5.3 Breakpoint-based scale (when `clamp` isn't enough)

If you need different *ratios* at different breakpoints (e.g. the marketing hero uses ratio 1.618 on desktop but 1.25 on mobile to preserve mobile body density), define separate scales per breakpoint:

```css
:root { --type-ratio: 1.25; }
@media (min-width: 1024px) { :root { --type-ratio: 1.5; } }
```

Derive every size from the ratio token.

## 5.4 Platform conventions

| Platform category | Typical body size | Notes |
|---|---|---|
| **Phone / tablet** | 16–17pt | Use the platform's dynamic/scaled text system so the user's preferred reading size is respected. |
| **Desktop** | 13–16pt | Slightly smaller than phone due to greater viewing distance and higher input precision. |
| **Watch / small wearable** | 16pt | Compact widths; use the platform's compact typeface if one exists. |
| **TV / large screen** | 29pt+ | Much larger because TVs are viewed from across the room. |
| **Spatial / AR-VR** | Varies | Sized for the perceived distance of each window in the user's space. |
| **Web** | 16px body | `clamp()` for fluid scaling; system stack or web font. |

**The key insight**: text size is not just about screen pixels — it's about **the user's distance from the screen**. The same character must subtend roughly the same angle whether on a wearable (8 inches from the eye) or a TV (10 feet from the eye). That's why TV body type sits around 29pt and watch body type around 16pt despite the watch screen being far smaller in absolute pixels.

## 5.5 Container queries for component-level type

When the same component appears in multiple contexts (sidebar card, hero card, modal), use container queries so the component adapts to *its* width, not the viewport's:

```css
.card { container-type: inline-size; }
.card h3 { font-size: 1.25rem; }
@container (min-width: 480px) {
  .card h3 { font-size: 1.5rem; }
}
```

## 5.6 Agent rules — responsive

- **DO** use `clamp()` for fluid headings and large body type.
- **DO** define scale ratios as CSS custom properties so they can be swapped at breakpoints.
- **DO** test at 320px, 360px, 768px, 1024px, 1440px, and 1920px+ viewports.
- **DO** respect the native platform's published interface guidelines when building native apps.
- **DO** use container queries when a component must adapt to its own size, not the viewport.
- **DO NOT** ship a single fixed font-size for everything from mobile to ultra-wide.
- **DO NOT** use viewport units (`vw`/`vh`) without `clamp()` — text becomes unreadably small on phones and giant on TVs.
- **DO NOT** assume a desktop-first scale will "shrink down" gracefully. Design mobile-first.

## 5.7 Responsive checklist

- [ ] Headings use `clamp()` with sensible min/max.
- [ ] Body type fluid or stepped at breakpoints.
- [ ] Tested at 320px, 768px, 1440px viewports.
- [ ] Native platform conventions respected (per each platform's published guidelines).
- [ ] Container queries used for component-level adaptation where appropriate.
- [ ] Largest viewport doesn't blow type up to "billboard" sizes.

---

# Pillar 6 — Brand & Emotional Tone

## 6.1 Type carries voice

Typography is half your message. The same sentence — "We're hiring" — feels different depending on the **classification** of the typeface used. The categories below describe structural traits, not specific typefaces — substitute any face in the same classification and the principle holds.

- **Trust** — old-style and transitional **serifs** signal heritage; **neo-grotesque sans-serifs** signal precision.
- **Energy** — **geometric display** faces with wide, bold letterforms feel contemporary and commanding.
- **Approachability** — **humanist sans-serifs** with open counters and rounded terminals feel warm and human.
- **Playfulness** — **rounded sans-serifs** and soft geometric faces with circular shapes.
- **Authority / editorial** — **high-contrast (Didone) serifs** for fashion; **transitional serifs** for news and publishing.
- **Tech / utility** — any **monospaced** family signals code, precision, system feedback.

## 6.2 Brand pairing patterns

| Pattern | Pairing | Tone |
|---|---|---|
| **Editorial** | Display serif headline + sans body | Magazine, news, long-form blog. |
| **Modern minimal** | Single humanist sans, weight-driven hierarchy | Product UI, SaaS, B2B. |
| **Heritage / luxury** | Old-style serif everywhere | Watch brands, hotels, fashion. |
| **Tech / dev** | Geometric sans + monospace | Developer tools, infra. |
| **Friendly consumer** | Rounded sans + handwritten accent | Wellness, kids, lifestyle. |

## 6.3 Don't fight your audience

- **B2B users want efficiency.** Use a clean sans, conservative scale, dense layouts. Decorative type slows them down.
- **Long-form readers want comfort.** Use a serif or high-x-height sans, generous leading, ~65ch measure.
- **Discovery-driven users (e-commerce, media)** want hierarchy and personality. Display headlines earn attention.

## 6.4 Animated copy

- **Use sparingly.** A single moving headline anchors attention; ten compete with each other.
- **Respect `prefers-reduced-motion`.** Provide a static end-state.
- **Don't animate body copy.** It must be readable at rest.
- **Type-on transitions should not exceed ~600ms** for short headlines or users perceive the page as "loading."

## 6.5 Agent rules — brand

- **DO** match typeface mood to audience expectations.
- **DO** validate brand-driven choices against readability — beauty must coexist with usability.
- **DO** restrict expressive typography to display/headline roles; keep body neutral.
- **DO** provide static fallbacks for any animated copy.
- **DO NOT** chase typographic trends at the cost of legibility.
- **DO NOT** apply display faces to body copy "for character."
- **DO NOT** use brand colors that fail contrast on text — adjust the color, not the contrast rule.

## 6.6 Brand checklist

- [ ] Typeface choice aligns with brand voice and audience expectations.
- [ ] Display/expressive type confined to headlines, hero, callouts.
- [ ] Body remains neutral and readable.
- [ ] Animated copy has static fallback.
- [ ] Brand colors meet WCAG when used as text.

---

# §8 Conflict Resolution Priority

When typography rules pull against each other, resolve in this order:

1. **Accessibility** — non-negotiable; wins over everything else.
2. **Readability** — if users can't read it, the message fails.
3. **Hierarchy / scannability** — users must be able to find what they need.
4. **Performance** — large web-font payloads hurt LCP and Time-to-Read.
5. **Brand expression** — important, but never at the cost of the four above.
6. **Aesthetic preference** — last; "I like how it looks" is not a reason to ship.

---

For typography anti-patterns, see `anti-patterns.md`. For pre-ship checklists, see `preflight.md`.
