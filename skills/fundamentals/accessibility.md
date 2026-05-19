# Accessibility Principles — Color, Contrast, Perception & Interaction

Agent-ready accessibility rules derived from WCAG 2.1/2.2 (Level AA baseline, AAA where noted), covering contrast calculation, color accessibility, focus management, keyboard interaction, motion safety, text resizing, and target sizing. Every rule is testable. Every threshold is a number, not an adjective.

---

## 0. How agents must use this document

1. **Accessibility overrides everything.** When an accessibility rule conflicts with a visual preference or a brand guideline — accessibility wins. Always. Redesign the visual, not the constraint.
2. **Preserve the design system palette.** This file is design-system-agnostic. When a color token fails a contrast threshold, the agent must NOT replace it with an unrelated color or introduce hues outside the existing palette. Instead, **adjust the failing token along its own hue/saturation axis** — darken or lighten the same color family until it passes. The goal is to improve the design system's own colors, not override them. If a warm brand color fails as text on a light background, the fix is a deeper variant of that same warm color — not an unrelated hue, not grey, not an arbitrary hex. The palette's identity, warmth, and character must survive the accessibility fix.
3. **Test every color pairing.** Before shipping any text/background combination, compute the contrast ratio. "It looks fine" is not a measurement.
4. **Apply rules during generation, not after.** Building accessible and then auditing is cheaper than building pretty and then retrofitting. Load this file alongside the design system.
5. **AA is the floor, not the ceiling.** Every rule below states the AA minimum. Where AAA thresholds exist, they are noted as aspirational targets.
6. **Disabled is not exempt from perception.** WCAG exempts inactive components from contrast minimums, but users must still *perceive* the component exists and understand why it's unavailable. A disabled button nobody can see is a missing feature, not an accessible one.

---

## 1. Contrast — The Math

### 1.1 The formula

Contrast ratio = `(L1 + 0.05) / (L2 + 0.05)`

- `L1` = relative luminance of the lighter color
- `L2` = relative luminance of the darker color
- Result ranges from `1:1` (identical) to `21:1` (black on white)

### 1.2 Relative luminance

For sRGB (the web's default colorspace):

```
L = 0.2126 × R + 0.7152 × G + 0.0722 × B
```

Where R, G, B are linearized:

```
if sRGB_channel ≤ 0.04045:
    linear = sRGB_channel / 12.92
else:
    linear = ((sRGB_channel + 0.055) / 1.055) ^ 2.4
```

And `sRGB_channel = 8bit_value / 255`.

### 1.3 Why this matters for agents

Do not eyeball contrast. Compute it. The human eye is unreliable for contrast judgment, especially across hues. A vibrant orange text on a warm cream background *feels* readable but may fail the 4.5:1 threshold. Run the math or use a tool.

**Agent rule:** For every `color` + `background-color` pair in the output, compute the contrast ratio before shipping. If you cannot compute it, flag the pair for manual verification.

---

## 2. Text Contrast — SC 1.4.3 (AA) and SC 1.4.6 (AAA)

### 2.1 Minimum ratios

| Text type | AA minimum | AAA target | How to measure |
|---|---|---|---|
| **Normal text** (< 18pt regular, < 14pt bold) | **4.5 : 1** | **7 : 1** | Foreground color vs. background color |
| **Large text** (≥ 18pt regular / 24px, or ≥ 14pt bold / 18.5px) | **3 : 1** | **4.5 : 1** | Foreground color vs. background color |
| **Incidental text** (inactive UI, pure decoration, invisible, part of a photo) | No requirement | No requirement | — |
| **Logotype text** (part of a logo or brand name) | No requirement | No requirement | — |

### 2.2 What counts as "large text"

- **18pt regular** = **24px** at standard density
- **14pt bold** = **18.5px bold** at standard density
- The conversion: `1pt = 1.333px`
- For unusual or thin-stroke fonts, the threshold may need to be higher — thin strokes reduce effective contrast even when the color ratio passes.

### 2.3 Agent rules — text contrast

- **DO** verify every text/background pair against the table above.
- **DO** test on the *actual* background, including gradients, images, and patterns. Use the worst-case pixel when text overlays an image.
- **DO** add a scrim, text-shadow, or solid background when placing text over images to guarantee contrast at the worst-case point.
- **DO** treat placeholder text and tooltip text as real text — they need contrast too.
- **DO** use the foreground and background colors from the CSS, not the rendered pixel colors (anti-aliasing can shift perceived contrast).
- **DO NOT** round contrast ratios favorably — `4.499:1` fails the `4.5:1` threshold.
- **DO NOT** assume dark mode passes because light mode did. Recompute every pairing in both themes.
- **DO NOT** use pure white (#FFFFFF) on pure black (#000000) for body text — it causes halation (text appears to vibrate) for some users. Prefer near-white (#E6E6E6 – #F5F5F5) on near-black (#0A0A0A – #1A1A1A).

### 2.4 Common failure modes

| Failure | Why it fails | Fix |
|---|---|---|
| Light gray text on white | Ratio drops below 4.5:1 | Darken the text or darken the background |
| Brand-color text on a tinted background of the same hue | Same hue = low luminance difference | Shift the background to a contrasting hue or use a neutral |
| Text over a photograph | Contrast varies across the image | Add a semi-transparent overlay behind the text |
| Thin-weight font at small size | Strokes are too thin to maintain perceived contrast | Use Regular (400) weight minimum, or increase the contrast ratio beyond 4.5:1 |
| Specifying text color without background (or vice versa) | The user's default may not contrast with your color | Always specify both foreground and background |

---

## 3. Non-Text Contrast — SC 1.4.11 (AA)

### 3.1 What it covers

Visual information required to identify:

- **User interface components**: buttons, inputs, checkboxes, toggles, sliders, tabs — the visual boundary or indicator that identifies the component.
- **Component states**: focus rings, selected indicators, active states, error borders — the visual change that communicates the current state.
- **Graphical objects**: icons, charts, diagrams, infographics — any part of a graphic required to understand the content.

### 3.2 Minimum ratio

**3 : 1** against adjacent colors.

### 3.3 What is exempt

- Inactive (disabled) components where the appearance is determined by the user agent and not modified by the author.
- Graphics where a particular presentation is essential (a flag, a photograph, a heat map with a legend).

### 3.4 Agent rules — non-text contrast

- **DO** ensure every button border, input border, checkbox outline, toggle track, and slider thumb has ≥ 3:1 contrast against the adjacent surface.
- **DO** ensure focus indicators have ≥ 3:1 contrast against *both* the component and the page background.
- **DO** ensure icon strokes used for meaning (not decoration) have ≥ 3:1 contrast.
- **DO** ensure chart elements (bars, lines, pie segments) have ≥ 3:1 contrast against adjacent elements and the background.
- **DO NOT** rely on the CSS border alone — if the border is the same color as the background, the component boundary is invisible.
- **DO NOT** use subtle hover-only color changes as the sole affordance — they may fall below 3:1 on some monitors.

---

## 4. Color as Information — SC 1.4.1 (A)

### 4.1 The rule

Color must **never** be the only visual means of conveying information, indicating an action, prompting a response, or distinguishing a visual element.

This does not discourage the use of color — color is a powerful design asset. It only requires that color is never the *sole* channel.

### 4.2 The lightness loophole (and its limit)

WCAG acknowledges one nuance: if two colors differ not only in hue but also in **lightness** with a contrast ratio of **≥ 3:1 between them**, the lightness difference counts as an additional visual distinction. Example: light green (#6BA51F) vs. dark red (#8F2E00) differ in both hue and luminance — if their mutual contrast ≥ 3:1, they pass.

**However**, if the user must identify a *specific* color (not just "lighter vs. darker"), an additional non-color indicator is always required regardless of contrast. Example: "green means valid, red means invalid" fails even at 10:1 contrast between the two colors — because a protanopic user cannot distinguish *which* color they are seeing. Add an icon (✓ / ✕) or text label.

**Agent rule:** The lightness loophole is a minimum, not a design goal. Always provide a redundant channel. Use the 3:1 inter-color contrast as a safety net, not a strategy.

### 4.3 What this means in practice

| Situation | Color alone (fails) | Color + another channel (passes) |
|---|---|---|
| **Error state** | Red border on input | Red border + error icon + error text message |
| **Required field** | Red asterisk | Red asterisk + "(required)" label text |
| **Link in body text** | Blue text, no underline | Blue text + underline (or underline on hover + different weight) |
| **Chart series** | Different-colored lines | Different colors + different dash patterns + labels |
| **Status badge** | Green = success, red = error | Color + icon (✓, ✕) + label text ("Passed", "Failed") |
| **Selected state** | Blue background | Blue background + checkmark icon + `aria-selected` |
| **Navigation current page** | Bold + brand color | Bold + brand color + underline or sidebar indicator |
| **Form validation** | Green outline = valid, red outline = invalid | Color + icon inside the field + helper text below |
| **Data visualization** | Color-coded regions on a map | Color + pattern fills + text labels + legend with shapes |

### 4.4 Links deserve special attention

Links embedded in body text are the most common failure of SC 1.4.1. If the only visual difference between a link and surrounding text is color, users with color vision deficiency cannot find the link.

**Minimum:** Link text must have ≥ 3:1 contrast against surrounding non-link text, AND provide an additional visual cue on hover/focus (underline, bold, icon).

**Best practice:** Always underline body-text links. `text-decoration: underline` is the universal affordance. Reserve "no underline" for links that are already visually distinct by structure (navigation bars, card titles, buttons).

**Hard rule — underlines by context:**
- **Inline content links** (inside paragraphs, list items, table cells): MUST have `text-decoration: underline` at rest. This is the primary affordance that makes them discoverable.
- **Navigation links** (inside `<nav>`, `<header>`, or navigation components): MUST NOT have underlines. Their structural position (grouped in a bar, sidebar, or menu) already communicates they are links. Underlines add visual noise without aiding discoverability.
- **Footer links** (inside `<footer>`): MUST NOT have underlines. Same reasoning — position within a clearly-labelled navigation column is the affordance.
- **Button-role links** (any `<a>` with `.btn` class or button-like styling): MUST NOT have underlines. The button shape/fill is the affordance.
- **In CSS:** Set `nav a, footer a, header a:not(.btn) { text-decoration: none; color: inherit; }`. Apply underlines only to `p a`, `li a`, `td a`, and similar inline-content contexts.

### 4.5 Visited links (exemption)

Authors have almost no control over visited-link styling due to browser privacy restrictions (`:visited` only allows color changes, and browsers restrict querying visited state). For this reason, WCAG does not require authors to distinguish visited from unvisited links through non-color means. Color-only distinction between visited and unvisited links is **not** a failure of SC 1.4.1.

The author must still ensure all link text (visited or not) meets contrast minimums against the page background per SC 1.4.3.

### 4.6 Documented WCAG failure patterns

These are officially catalogued failures — treat them as hard rules:

| Failure ID | Description | Fix |
|---|---|---|
| **F13** | Image's text alternative omits information conveyed by color differences in the image | Include color-conveyed info in the alt text or provide a long description |
| **F73** | Links not visually evident without color vision (no underline, no icon, no weight change) | Add underline or other non-color visual cue to links |
| **F81** | Required or error fields identified by color differences only (red label, no icon/text) | Add "(required)" text or an error icon alongside the color change |

### 4.7 Agent rules — color as information

- **DO** pair every color-encoded meaning with at least one of: icon, text label, pattern, shape, position, weight change, underline.
- **DO** ensure any two colors used to encode *different* meanings have ≥ 3:1 contrast between each other (the lightness safety net).
- **DO** underline links in body text — or provide ≥ 3:1 contrast against surrounding text plus a non-color hover/focus cue.
- **DO** ensure navigation and footer links inherit their color from the parent container (not from a global link style) so they meet contrast against their actual background. A footer on a dark background needs white or light-colored links, not the body-text brand color.
- **DO** test with a color-blindness simulator (protanopia, deuteranopia, tritanopia) — if the meaning disappears, it relied on color alone.
- **DO** include color-conveyed information in image alt text (e.g., "pie chart: 60% blue = returning users, 40% orange = new users").
- **DO NOT** use red/green as the only distinction between success and error — even at high contrast.
- **DO NOT** identify required fields or errors by color alone — always add text or an icon.
- **DO NOT** assume "it's obvious from context" — always provide a redundant channel.
- **DO NOT** confuse "sufficient contrast between two colors" with "accessible" — a protanopic user may still see both colors as the same hue.

---

## 5. Focus Visibility — SC 2.4.7 (AA) and SC 2.4.11/2.4.13 (WCAG 2.2)

### 5.1 The rule

Any keyboard-operable interface must have a visible focus indicator. WCAG 2.2 adds:

- **SC 2.4.11 (Focus Not Obscured — Minimum)**: The focused component is not entirely hidden by author-created content.
- **SC 2.4.13 (Focus Appearance)**: The focus indicator has sufficient size and contrast.

### 5.2 Focus indicator requirements

| Property | Minimum |
|---|---|
| **Thickness** | ≥ 2px outline or equivalent |
| **Offset** | ≥ 2px from the component edge (so it doesn't overlap content) |
| **Contrast** | ≥ 3:1 against the adjacent background *and* the component's own surface |
| **Visibility** | Must not be obscured by sticky headers, footers, overlays, or tooltips |
| **Animation** | None — focus ring must appear instantly (0ms transition) |

### 5.3 Agent rules — focus

- **DO** use `:focus-visible` (not bare `:focus`) so mouse clicks don't show the ring, but keyboard navigation does.
- **DO** maintain a consistent focus ring across all interactive elements — focus is system feedback, not brand expression.
- **DO** test by tabbing through the entire page — every interactive element must show a visible indicator.
- **DO** ensure the focus ring survives when the element has hover, active, or selected styles applied.
- **DO NOT** use `outline: none` or `outline: 0` without providing a custom replacement. This is the single most common accessibility violation.
- **DO NOT** animate the focus ring's appearance — users need instant orientation.
- **DO NOT** lose focus on re-render, route change, or modal open/close — restore focus programmatically.

---

## 6. Keyboard Accessibility — SC 2.1.1 / 2.1.2 (A)

### 6.1 The rules

- **All functionality** must be operable through a keyboard interface.
- **No keyboard traps** — if focus can enter a component, it must be able to leave via keyboard.

### 6.2 Agent rules — keyboard

- **DO** ensure every interactive element is reachable via Tab / Shift+Tab.
- **DO** ensure buttons activate on Space and Enter; links activate on Enter.
- **DO** maintain logical tab order that matches the visual reading order.
- **DO** provide keyboard alternatives for any mouse-only interaction (drag-and-drop, hover menus, scroll-to-reveal).
- **DO** trap focus inside modals and dialogs (this is the *correct* use of a focus trap — focus stays in the dialog until it's dismissed, then returns to the trigger).
- **DO NOT** use `tabindex` values > 0 (they create unpredictable tab order).
- **DO NOT** rely on hover states for critical information — hover doesn't exist on keyboard or touch.
- **DO NOT** use `pointer-events: none` as a substitute for `disabled` — it hides the element from keyboard and assistive tech.

---

## 7. Motion and Animation Safety — SC 2.3.1 (A) / 2.3.3 (AAA)

### 7.1 The rules

- **No more than 3 flashes per second** in any area of the page — flashing can trigger seizures.
- **Animation from interactions** must be disableable (WCAG 2.2).
- **Moving, blinking, or scrolling content** that starts automatically and lasts > 5 seconds must have a pause/stop/hide mechanism (SC 2.2.2).

### 7.2 Agent rules — motion

- **DO** respect `prefers-reduced-motion: reduce` for all animations, transitions, and parallax effects.
- **DO** provide a static end-state for every animation — the content must be fully usable without motion.
- **DO** limit entrance animations to one orchestrated sequence per page load (brand surfaces only); product surfaces get no entrance choreography.
- **DO** keep state transitions between 100–250ms with `ease-out` easing.
- **DO** allow users to pause auto-playing carousels, marquees, and any auto-scrolling content.
- **DO NOT** use `animation-iteration-count: infinite` on content-bearing elements without a pause mechanism.
- **DO NOT** flash or strobe any element — even once per second is risky for photosensitive users.
- **DO NOT** use parallax scrolling without a reduced-motion fallback.
- **DO NOT** animate text content — body copy must be readable at rest.

---

## 8. Text Resizing — SC 1.4.4 (AA)

### 8.1 The rule

Text must be resizable up to **200%** without loss of content or functionality, without requiring assistive technology (i.e., using only browser zoom).

### 8.2 Agent rules — resizing

- **DO** use `rem` or `em` for font sizes — they scale with the user's browser font-size preference.
- **DO** test layouts at 200% browser zoom on a 1280px viewport — content must not overflow, overlap, or disappear.
- **DO** use `clamp()` for fluid typography so text scales smoothly between viewport sizes.
- **DO NOT** use `px` for body text font sizes — they don't scale with browser preferences.
- **DO NOT** disable pinch-to-zoom on mobile (`<meta name="viewport" content="... maximum-scale=1.0">` is a violation).
- **DO NOT** set `max-width` on containers using `px` values that prevent content from reflowing at 200% zoom.

---

## 9. Reflow — SC 1.4.10 (AA)

### 9.1 The rule

Content must be presentable without two-dimensional scrolling at:

- **320 CSS px** width for vertical-scrolling content (equivalent to 1280px at 400% zoom)
- **256 CSS px** height for horizontal-scrolling content

Exceptions: data tables, maps, diagrams, video, and interfaces requiring two-dimensional layout.

### 9.2 Agent rules — reflow

- **DO** design mobile-first — if it works at 320px, it almost always works at larger sizes.
- **DO** test at 320px viewport width — no horizontal scrollbar should appear on content.
- **DO** allow images to shrink (use `max-width: 100%` and `height: auto`).
- **DO NOT** use fixed-width layouts that force horizontal scrolling on narrow viewports.
- **DO NOT** clip or hide content at narrow widths — reflowed content must remain accessible.

---

## 10. Target Size — SC 2.5.5 (AAA) / SC 2.5.8 (AA, WCAG 2.2)

### 10.1 The thresholds

| Standard | Minimum target size | Notes |
|---|---|---|
| **WCAG 2.2 SC 2.5.8** (AA) | **24 × 24 px** | Absolute floor — hard fail below this |
| **Apple HIG** | **44 × 44 px** | Recommended for all touch targets |
| **Material Design** | **48 × 48 dp** | Recommended for all touch targets |
| **Best practice** | **44 × 44 px** minimum with **≥ 8px** spacing | What this standards system requires |

### 10.2 Agent rules — target size

- **DO** size all buttons, links, checkboxes, radio buttons, and other interactive elements at ≥ 44 × 44px on touch devices.
- **DO** add ≥ 8px spacing between adjacent interactive targets to prevent mis-taps.
- **DO** use padding (not just text size) to meet the target minimum — a 14px link with no padding is an inaccessible target.
- **DO NOT** place destructive actions adjacent to primary actions without sufficient spacing.
- **DO NOT** rely on icon-only buttons smaller than 24px without expanding the hit area via padding.

---

## 11. Text Spacing — SC 1.4.12 (AA)

### 11.1 The rule

Content must remain functional when the user overrides text spacing to:

- **Line height** ≥ 1.5× the font size
- **Paragraph spacing** ≥ 2× the font size
- **Letter spacing** ≥ 0.12× the font size
- **Word spacing** ≥ 0.16× the font size

### 11.2 Agent rules — text spacing

- **DO** use relative units for spacing (`em`, `rem`, `%`) so user overrides scale proportionally.
- **DO** test with a "text spacing override" bookmarklet or browser extension — content must not clip, overlap, or disappear.
- **DO NOT** set fixed `height` on text containers — when line-height increases, the container must grow.
- **DO NOT** use `overflow: hidden` on text containers without verifying behavior under increased spacing.

---

## 12. Content on Hover or Focus — SC 1.4.13 (AA)

### 12.1 The rule

When hover or focus triggers additional content (tooltips, dropdowns, popovers):

- **Dismissible**: the user can dismiss the content without moving the pointer or focus (typically via Escape).
- **Hoverable**: the user can move the pointer over the additional content without it disappearing.
- **Persistent**: the content stays visible until the user dismisses it, the trigger loses hover/focus, or the information is no longer valid.

### 12.2 Agent rules — hover/focus content

- **DO** keep tooltips visible when the user moves the pointer into the tooltip area.
- **DO** allow Escape to dismiss any hover/focus-triggered content.
- **DO** ensure hover-triggered content does not obscure the trigger element.
- **DO NOT** use `mouseout` to immediately hide a tooltip — add a delay or keep it visible while the pointer is in the tooltip area.
- **DO NOT** trigger content on hover that cannot be triggered on focus (keyboard parity).

---

## 13. Semantic Structure — SC 1.3.1 (A) / SC 2.4.6 (AA) / SC 2.4.10 (AAA)

### 13.1 The rules

- **Info and relationships** conveyed through presentation must also be programmatically determinable (SC 1.3.1).
- **Headings and labels** must describe topic or purpose (SC 2.4.6).
- **Section headings** should be used to organize content (SC 2.4.10).

### 13.2 Agent rules — structure

- **DO** use real `<h1>`–`<h6>` elements for headings, not styled `<div>`s or `<span>`s.
- **DO** use one `<h1>` per page. Never skip heading levels (`<h2>` → `<h4>` with no `<h3>`).
- **DO** use `<nav>`, `<main>`, `<header>`, `<footer>`, `<aside>`, and `<section>` landmark elements.
- **DO** label landmark regions when there are multiples (e.g., two `<nav>` elements — label them `aria-label="Main"` and `aria-label="Footer"`).
- **DO** use `<button>` for actions, `<a>` for navigation — never swap them.
- **DO** use `<label>` associated with every form `<input>` — `aria-label` is a fallback, not a replacement.
- **DO NOT** use `<div>` with `role="button"` when a real `<button>` element works.
- **DO NOT** break words across inline elements (`<span>Wel</span><span>come</span>`) — screen readers read this as two separate words.

---

## 14. Skip Navigation — SC 2.4.1 (A)

### 14.1 The rule

A mechanism must be available to bypass blocks of content repeated on multiple pages (navigation, headers, sidebars).

### 14.2 Implementation

```html
<a href="#main-content" class="sr-only focus:not-sr-only ...">
  Skip to main content
</a>
```

- The link is visually hidden but appears on keyboard focus.
- The target (`#main-content`) must be the `<main>` element or equivalent.

### 14.3 Agent rules — skip nav

- **DO** include a skip-to-content link as the first focusable element on every page.
- **DO** make it visible on `:focus` so keyboard users can see and use it.
- **DO NOT** hide it with `display: none` or `visibility: hidden` — those remove it from the focus order entirely.

---

## 15. Design System Contrast Audit Checklist

Run this checklist against every design system palette and every page surface.

### Text on backgrounds

- [ ] Body text on primary background — ≥ 4.5:1
- [ ] Body text on secondary background — ≥ 4.5:1
- [ ] Body text on brand/accent background — ≥ 4.5:1
- [ ] Heading text on primary background — ≥ 3:1 (large text) or ≥ 4.5:1 (normal)
- [ ] Muted/subtle text on all backgrounds — ≥ 4.5:1
- [ ] Link text on all backgrounds — ≥ 4.5:1
- [ ] Placeholder text — ≥ 4.5:1 (it is real text the user reads)
- [ ] Disabled text — ≥ 3:1 (perceivable, even if exempt from AA)
- [ ] Text on dark-mode surfaces — recomputed, not assumed

### Interactive elements

- [ ] Button label on button fill — ≥ 4.5:1
- [ ] Button border against adjacent background — ≥ 3:1
- [ ] Input border against background — ≥ 3:1
- [ ] Focus ring against component surface — ≥ 3:1
- [ ] Focus ring against page background — ≥ 3:1
- [ ] Selected state indicator — ≥ 3:1
- [ ] Error state border/icon — ≥ 3:1
- [ ] Hover state change — perceptible (not required to be ≥ 3:1 on its own, but the hover state itself must still meet text contrast)

### Graphical elements

- [ ] Icon strokes conveying meaning — ≥ 3:1
- [ ] Chart data elements against adjacent elements — ≥ 3:1
- [ ] Informational SVG strokes/fills — ≥ 3:1

---

## 16. Conflict Resolution

When accessibility rules conflict with other principles:

1. **Accessibility wins over aesthetics.** A beautiful button with 3:1 text contrast is a broken button. Fix the contrast, redesign the beauty.
2. **Accessibility wins over brand — but within the palette.** A brand color that fails contrast cannot be used *as-is* on text. The fix is to shift that color along its own hue axis (darker or lighter variant) until it passes — not to replace it with an unrelated hue. If no same-hue variant can pass, move the failing color to a decorative role (background, accent, illustration) and use a palette-consistent alternative for the text.
3. **Accessibility wins over consistency — improve the token, don't abandon it.** If the design system specifies a muted text color that fails 4.5:1, the token has a bug. Darken or lighten it within its color family until it passes. The palette's character must survive the fix.
4. **Accessibility wins over density.** If meeting target sizes (44×44px) requires more spacing, the spacing wins. Density is a preference; accessibility is a right.
5. **Never introduce foreign colors.** This file is agnostic to any specific design system. Agents must read the design system's color definitions first, then apply accessibility rules as constraints *on top of* that palette — never bypassing it. Every contrast fix must produce a color that belongs to the same family as the original token.

---

For anti-pattern detection related to accessibility, see `anti-patterns.md`. For the five-dimension technical audit that includes accessibility scoring, see `inspect.md`. For the pre-ship go/no-go that requires zero accessibility P0s, see `preflight.md`.
