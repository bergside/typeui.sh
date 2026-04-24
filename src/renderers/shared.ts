import { MANAGED_BLOCK_END, MANAGED_BLOCK_START } from "../config";
import { SKILL_AUTHOR } from "../skillMetadata";
import { DesignSystemInput, SkillMetadata } from "../types";

function list(items: string[]): string {
  return items.map((item) => `- ${item}`).join("\n");
}

export function createManagedSkillBody(providerTitle: string, design: DesignSystemInput): string {
  return [
    MANAGED_BLOCK_START,
    `# ${design.productName} Design System Skill (${providerTitle})`,
    "",
    "## Mission",
    `You are an expert design-system guideline author for ${design.productName}.`,
    "Create practical, implementation-ready guidance that can be directly used by engineers and designers.",
    "",
    "## Brand",
    design.brandSummary,
    "",
    "## Style Foundations",
    `- Visual style: ${design.visualStyle}`,
    `- Typography scale: ${design.typographyScale}`,
    `- Color palette: ${design.colorPalette}`,
    `- Spacing scale: ${design.spacingScale}`,
    "",
    "## Accessibility",
    design.accessibilityRequirements,
    "",
    "## Writing Tone",
    design.writingTone,
    "",
    "## Rules: Do",
    list(design.doRules),
    "",
    "## Rules: Don't",
    list(design.dontRules),
    "",
    "## Expected Behavior",
    "- Follow the foundations first, then component consistency.",
    "- When uncertain, prioritize accessibility and clarity over novelty.",
    "- Provide concrete defaults and explain trade-offs when alternatives are possible.",
    "- Keep guidance opinionated, concise, and implementation-focused.",
    "",
    "## Guideline Authoring Workflow",
    "1. Restate the design intent in one sentence before proposing rules.",
    "2. Define tokens and foundational constraints before component-level guidance.",
    "3. Specify component anatomy, states, variants, and interaction behavior.",
    "4. Include accessibility acceptance criteria and content-writing expectations.",
    "5. Add anti-patterns and migration notes for existing inconsistent UI.",
    "6. End with a QA checklist that can be executed in code review.",
    "",
    "## Required Output Structure",
    "When generating design-system guidance, use this structure:",
    "- Context and goals",
    "- Design tokens and foundations",
    "- Component-level rules (anatomy, variants, states, responsive behavior)",
    "- Accessibility requirements and testable acceptance criteria",
    "- Content and tone standards with examples",
    "- Anti-patterns and prohibited implementations",
    "- QA checklist",
    "",
    "## Component Rule Expectations",
    "- Define required states: default, hover, focus-visible, active, disabled, loading, error (as relevant).",
    "- Describe interaction behavior for keyboard, pointer, and touch.",
    "- State spacing, typography, and color-token usage explicitly.",
    "- Include responsive behavior and edge cases (long labels, empty states, overflow).",
    "",
    "## Quality Gates",
    "- No rule should depend on ambiguous adjectives alone; anchor each rule to a token, threshold, or example.",
    "- Every accessibility statement must be testable in implementation.",
    "- Prefer system consistency over one-off local optimizations.",
    "- Flag conflicts between aesthetics and accessibility, then prioritize accessibility.",
    "",
    "## Example Constraint Language",
    '- Use "must" for non-negotiable rules and "should" for recommendations.',
    "- Pair every do-rule with at least one concrete don't-example.",
    "- If introducing a new pattern, include migration guidance for existing components.",
    "",
    MANAGED_BLOCK_END
  ].join("\n");
}

function escapeYamlString(value: string): string {
  return value.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

function parseKeyValuePairs(value: string): Record<string, string> {
  return value
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean)
    .reduce<Record<string, string>>((acc, part) => {
      const [rawKey, ...rawValueParts] = part.split("=");
      const key = rawKey?.trim().toLowerCase();
      const rawValue = rawValueParts.join("=").trim();
      if (key && rawValue) {
        acc[key] = rawValue;
      }
      return acc;
    }, {});
}

function parseTypographyMetadata(typographyScale: string): {
  sourceScale: string;
  primary: string;
  display: string;
  mono: string;
  weights: string;
} {
  const sourceScale = typographyScale.split("|")[0]?.trim() || "12/14/16/20/24/32";
  const fontsMatch = typographyScale.match(/\|\s*Fonts:\s*([^|]+)/i);
  const fontPairs = parseKeyValuePairs(fontsMatch?.[1] ?? "");
  const weightsMatch = typographyScale.match(/weights\s*=\s*([^|]+)/i);

  return {
    sourceScale,
    primary: fontPairs.primary ?? "Public Sans",
    display: fontPairs.display ?? fontPairs.primary ?? "Public Sans",
    mono: fontPairs.mono ?? "Space Grotesk",
    weights: weightsMatch?.[1]?.trim() ?? "400, 500, 600, 700"
  };
}

function parseColorTokens(colorPalette: string): {
  primary: string;
  secondary: string;
  tertiary: string;
  neutral: string;
  success: string;
  warning: string;
  danger: string;
  surface: string;
  text: string;
} {
  const tokensMatch = colorPalette.match(/\|\s*Tokens:\s*([^|]+)/i);
  const tokenPairs = parseKeyValuePairs(tokensMatch?.[1] ?? "");
  const primary = tokenPairs.primary ?? "#1A1C1E";
  const secondary = tokenPairs.secondary ?? "#6C7278";
  const surface = tokenPairs.surface ?? "#F7F5F2";
  const text = tokenPairs.text ?? "#1A1C1E";

  return {
    primary,
    secondary,
    tertiary: tokenPairs.tertiary ?? secondary,
    neutral: tokenPairs.neutral ?? surface,
    success: tokenPairs.success ?? "#16A34A",
    warning: tokenPairs.warning ?? "#D97706",
    danger: tokenPairs.danger ?? "#DC2626",
    surface,
    text
  };
}

function deriveSpacingTokens(spacingScale: string): { sm: string; md: string } {
  const numericValues = spacingScale.match(/\d+/g)?.map((value) => Number(value)) ?? [];
  if (numericValues.length >= 2) {
    return {
      sm: `${numericValues[0]}px`,
      md: `${numericValues[1]}px`
    };
  }
  if (/compact/i.test(spacingScale)) {
    return { sm: "4px", md: "8px" };
  }
  if (/comfortable/i.test(spacingScale)) {
    return { sm: "8px", md: "16px" };
  }
  return { sm: "8px", md: "16px" };
}

export function createSkillFrontmatter(metadata: SkillMetadata): string {
  return [
    "---",
    `name: "${escapeYamlString(metadata.name)}"`,
    `description: "${escapeYamlString(metadata.description)}"`,
    "metadata:",
    `  author: ${escapeYamlString(SKILL_AUTHOR)}`,
    "---"
  ].join("\n");
}

export function createManagedSkillFile(
  providerTitle: string,
  design: DesignSystemInput,
  metadata: SkillMetadata
): string {
  return `${createSkillFrontmatter(metadata)}\n\n${createManagedSkillBody(providerTitle, design)}`;
}

export function createDesignMarkdownFile(design: DesignSystemInput): string {
  const typography = parseTypographyMetadata(design.typographyScale);
  const colors = parseColorTokens(design.colorPalette);
  const spacing = deriveSpacingTokens(design.spacingScale);

  return [
    "---",
    `name: "${escapeYamlString(design.productName)}"`,
    "colors:",
    `  primary: "${colors.primary}"`,
    `  secondary: "${colors.secondary}"`,
    `  tertiary: "${colors.tertiary}"`,
    `  neutral: "${colors.neutral}"`,
    `  success: "${colors.success}"`,
    `  warning: "${colors.warning}"`,
    `  danger: "${colors.danger}"`,
    `  surface: "${colors.surface}"`,
    `  text: "${colors.text}"`,
    "typography:",
    "  h1:",
    `    fontFamily: "${escapeYamlString(typography.display)}"`,
    "    fontSize: 3rem",
    "  body-md:",
    `    fontFamily: "${escapeYamlString(typography.primary)}"`,
    "    fontSize: 1rem",
    "  label-caps:",
    `    fontFamily: "${escapeYamlString(typography.mono)}"`,
    "    fontSize: 0.75rem",
    `  sourceScale: "${escapeYamlString(typography.sourceScale)}"`,
    `  weights: "${escapeYamlString(typography.weights)}"`,
    "rounded:",
    "  sm: 4px",
    "  md: 8px",
    "spacing:",
    `  sm: ${spacing.sm}`,
    `  md: ${spacing.md}`,
    `  sourceScale: "${escapeYamlString(design.spacingScale)}"`,
    "---",
    "",
    "## Overview",
    design.brandSummary,
    "",
    "## Style Foundations",
    `- **Visual style:** ${design.visualStyle}`,
    `- **Typography scale:** ${design.typographyScale}`,
    `- **Color palette:** ${design.colorPalette}`,
    `- **Spacing scale:** ${design.spacingScale}`,
    "",
    "## Accessibility",
    design.accessibilityRequirements,
    "",
    "## Writing Tone",
    design.writingTone,
    "",
    "## Rules: Do",
    list(design.doRules),
    "",
    "## Rules: Don't",
    list(design.dontRules)
  ].join("\n");
}
