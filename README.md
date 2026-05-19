# TypeUI - Design skills for agentic tools

<img width="1448" height="1151" alt="Screenshot 2026-04-28 at 14 24 05" src="https://github.com/user-attachments/assets/b2bb4b43-5e56-4af4-bb28-71e0eb91f75c" />

<br />

[TypeUI](https://www.typeui.sh) is an open-source command line interface (CLI) that generates, updates, and can download `SKILL.md` or `DESIGN.md` files with design system specifications to instruct agentic tools and LLM's to use a certain design when building interfaces.

## Getting started

You can start building with TypeUI by using the NPX command:

```bash
npx typeui.sh --help
```

## Design skills

Check out all [design skills](https://www.typeui.sh/design-skills) that can be pulled into your project. Available in both `DESIGN.md` and `SKILL.md` formats.

## UI design prompts

Browse all major UI prompt categories from [typeui.sh/prompts](https://www.typeui.sh/prompts).

| Prompt category | SVG preview | Link |
| --- | --- | --- |
| Hero Sections | ![Hero Sections preview](https://www.typeui.sh/prompts/marketing/hero/1-centered-stack-with-big-image-below.svg) | [Hero Sections](https://www.typeui.sh/prompts/hero) |
| Pricing Sections | ![Pricing Sections preview](https://www.typeui.sh/prompts/marketing/pricing/1-three-pricing-cards-in-a-row.svg) | [Pricing Sections](https://www.typeui.sh/prompts/pricing) |
| Feature Sections | ![Feature Sections preview](https://www.typeui.sh/prompts/marketing/feature/1-left-aligned-intro-with-six-up-icon-grid.svg) | [Feature Sections](https://www.typeui.sh/prompts/feature) |
| CTA Sections | ![CTA Sections preview](https://www.typeui.sh/prompts/marketing/cta/2-centered-headline-paragraph-and-dual-rounded-buttons.svg) | [CTA Sections](https://www.typeui.sh/prompts/cta) |
| Content Sections | ![Content Sections preview](https://www.typeui.sh/prompts/marketing/content/1-two-column-split-copy-and-ctas-left-video-placeholder-right.svg) | [Content Sections](https://www.typeui.sh/prompts/content) |
| Contact Sections | ![Contact Sections preview](https://www.typeui.sh/prompts/marketing/contact/1-centered-heading-supporting-copy-and-stacked-form-with-dual-actions.svg) | [Contact Sections](https://www.typeui.sh/prompts/contact) |
| Customer Logo Sections | ![Customer Logo Sections preview](https://www.typeui.sh/prompts/marketing/customer-logo/1-centered-kicker-and-single-wrapping-logo-row.svg) | [Customer Logo Sections](https://www.typeui.sh/prompts/customer-logo) |
| Team Sections | ![Team Sections preview](https://www.typeui.sh/prompts/marketing/team/1-four-column-grid-with-badge-role-and-contact-action.svg) | [Team Sections](https://www.typeui.sh/prompts/team) |
| Social Proof Sections | ![Social Proof Sections preview](https://www.typeui.sh/prompts/marketing/social-proof/1-centered-inline-stat-row.svg) | [Social Proof Sections](https://www.typeui.sh/prompts/social-proof) |
| FAQ Sections | ![FAQ Sections preview](https://www.typeui.sh/prompts/marketing/faq/1-centered-heading-with-single-column-accordion.svg) | [FAQ Sections](https://www.typeui.sh/prompts/faq) |
| Testimonials | ![Testimonials preview](https://www.typeui.sh/prompts/marketing/testimonials/1-centered-single-testimonial-with-decorative-quote-mark.svg) | [Testimonials](https://www.typeui.sh/prompts/testimonials) |
| Blog Sections | ![Blog Sections preview](https://www.typeui.sh/prompts/marketing/blog/2-trending-topics-categorized-link-columns.svg) | [Blog Sections](https://www.typeui.sh/prompts/blog) |
| Portfolio Sections | ![Portfolio Sections preview](https://www.typeui.sh/prompts/marketing/portfolio/2-uniform-six-card-grid.svg) | [Portfolio Sections](https://www.typeui.sh/prompts/portfolio) |
| Newsletter Sections | ![Newsletter Sections preview](https://www.typeui.sh/prompts/marketing/newsletter/1-centered-stack-with-floating-avatar-portraits.svg) | [Newsletter Sections](https://www.typeui.sh/prompts/newsletter) |
| Event Schedule Sections | ![Event Schedule Sections preview](https://www.typeui.sh/prompts/marketing/event-schedule/2-centered-single-day-ruled-timeline.svg) | [Event Schedule Sections](https://www.typeui.sh/prompts/events) |
| Footer Sections | ![Footer Sections preview](https://www.typeui.sh/prompts/marketing/footer/1-logo-links-and-copyright-centered-stack.svg) | [Footer Sections](https://www.typeui.sh/prompts/footer) |
| Login Pages | ![Login Pages preview](https://www.typeui.sh/prompts/application/login/2-default-centered-card.svg) | [Login Pages](https://www.typeui.sh/prompts/login) |
| Register Pages | ![Register Pages preview](https://www.typeui.sh/prompts/application/register/1-default-centered-card.svg) | [Register Pages](https://www.typeui.sh/prompts/register) |

## CLI commands

| Command | Description |
| --- | --- |
| `generate` | Run interactive prompts, choose `SKILL.md` or `DESIGN.md`, then generate output files. |
| `update` | Run interactive prompts, choose `SKILL.md` or `DESIGN.md`, then update existing output files. |
| `pull <slug>` | Pull a registry markdown file from `bergside/awesome-design-skills` (`SKILL.md` -> provider paths, `DESIGN.md` -> project root `DESIGN.md`). |
| `list` | Show available registry specs from `bergside/awesome-design-skills` (with typeui.sh preview links), then pull one automatically. |
| `randomize` | Generate a fully randomized local design system and write `SKILL.md` or `DESIGN.md` outputs. |

## Local development

If you want to use this locally these are the commands you need to run:

```bash
npm install
npm run build
```

Then use the commands in your terminal:

```
node dist/cli.js --help
node dist/cli.js generate
node dist/cli.js generate --format design
node dist/cli.js randomize
node dist/cli.js randomize --format design
node dist/cli.js list
node dist/cli.js pull [slug]
node dist/cli.js pull [slug] --format design
node dist/cli.js list --format design
```

## License

The CLI and public registry is open-source under the MIT License.

## Pro version

Get access to enhanched design skill files and a private Discord community by getting the [pro version](https://www.typeui.sh/#pricing) and thus supporting our open-source work.

## Sponsors

If you'd like to become a sponsor of the project, please check out the [sponsorship page](https://www.typeui.sh/sponsor) on our website.
