export const PROVIDER_DETAILS = {
  universal: {
    title: "Universal",
    relativePath: ".agents/skills/design-system/SKILL.md",
    alwaysIncluded: true
  },
  antigravity: {
    title: "Antigravity",
    relativePath: ".agent/skills/design-system/SKILL.md"
  },
  augment: {
    title: "Augment",
    relativePath: ".augment/skills/design-system/SKILL.md"
  },
  "claude-code": {
    title: "Claude Code",
    relativePath: ".claude/skills/design-system/SKILL.md"
  },
  openclaw: {
    title: "OpenClaw",
    relativePath: "skills/design-system/SKILL.md"
  },
  codebuddy: {
    title: "CodeBuddy",
    relativePath: ".codebuddy/skills/design-system/SKILL.md"
  },
  codex: {
    title: "Codex",
    relativePath: ".codex/skills/design-system/SKILL.md"
  },
  "command-code": {
    title: "Command Code",
    relativePath: ".commandcode/skills/design-system/SKILL.md"
  },
  continue: {
    title: "Continue",
    relativePath: ".continue/skills/design-system/SKILL.md"
  },
  cortex: {
    title: "Cortex Code",
    relativePath: ".cortex/skills/design-system/SKILL.md"
  },
  crush: {
    title: "Crush",
    relativePath: ".crush/skills/design-system/SKILL.md"
  },
  cursor: {
    title: "Cursor",
    relativePath: ".cursor/skills/design-system/SKILL.md"
  },
  droid: {
    title: "Droid",
    relativePath: ".factory/skills/design-system/SKILL.md"
  },
  "iflow-cli": {
    title: "iFlow CLI",
    relativePath: ".iflow/skills/design-system/SKILL.md"
  },
  goose: {
    title: "Goose",
    relativePath: ".goose/skills/design-system/SKILL.md"
  },
  junie: {
    title: "Junie",
    relativePath: ".junie/skills/design-system/SKILL.md"
  },
  kilo: {
    title: "Kilo Code",
    relativePath: ".kilocode/skills/design-system/SKILL.md"
  },
  "kiro-cli": {
    title: "Kiro CLI",
    relativePath: ".kiro/skills/design-system/SKILL.md"
  },
  kode: {
    title: "Kode",
    relativePath: ".kode/skills/design-system/SKILL.md"
  },
  mcpjam: {
    title: "MCPJam",
    relativePath: ".mcpjam/skills/design-system/SKILL.md"
  },
  "mistral-vibe": {
    title: "Mistral Vibe",
    relativePath: ".vibe/skills/design-system/SKILL.md"
  },
  mux: {
    title: "Mux",
    relativePath: ".mux/skills/design-system/SKILL.md"
  },
  "open-code": {
    title: "Open Code",
    relativePath: ".opencode/skills/design-system/SKILL.md"
  },
  openhands: {
    title: "OpenHands",
    relativePath: ".openhands/skills/design-system/SKILL.md"
  },
  pi: {
    title: "Pi",
    relativePath: ".pi/skills/design-system/SKILL.md"
  },
  qoder: {
    title: "Qoder",
    relativePath: ".qoder/skills/design-system/SKILL.md"
  },
  "qwen-code": {
    title: "Qwen Code",
    relativePath: ".qwen/skills/design-system/SKILL.md"
  },
  roo: {
    title: "Roo Code",
    relativePath: ".roo/skills/design-system/SKILL.md"
  },
  trae: {
    title: "Trae",
    relativePath: ".trae/skills/design-system/SKILL.md"
  },
  "trae-cn": {
    title: "Trae CN",
    relativePath: ".trae/skills/design-system/SKILL.md"
  },
  windsurf: {
    title: "Windsurf",
    relativePath: ".windsurf/skills/design-system/SKILL.md"
  },
  zencoder: {
    title: "Zencoder",
    relativePath: ".zencoder/skills/design-system/SKILL.md"
  },
  neovate: {
    title: "Neovate",
    relativePath: ".neovate/skills/design-system/SKILL.md"
  },
  pochi: {
    title: "Pochi",
    relativePath: ".pochi/skills/design-system/SKILL.md"
  },
  adal: {
    title: "AdaL",
    relativePath: ".adal/skills/design-system/SKILL.md"
  }
} as const;

export type Provider = keyof typeof PROVIDER_DETAILS;
export type PullFormat = "skill" | "design";
export const SUPPORTED_PROVIDERS = Object.keys(PROVIDER_DETAILS) as Provider[];
export const ALWAYS_INCLUDED_PROVIDERS = SUPPORTED_PROVIDERS.filter(
  (provider) => Boolean((PROVIDER_DETAILS[provider] as { alwaysIncluded?: boolean }).alwaysIncluded)
) as Provider[];
export const OPTIONAL_PROVIDERS = SUPPORTED_PROVIDERS.filter(
  (provider) => !Boolean((PROVIDER_DETAILS[provider] as { alwaysIncluded?: boolean }).alwaysIncluded)
) as Provider[];

export function getProviderOutputPath(provider: Provider, format: PullFormat): string {
  const skillPath = PROVIDER_DETAILS[provider].relativePath;
  if (format === "skill") {
    return skillPath;
  }
  return skillPath.replace(/\/SKILL\.md$/, "/DESIGN.md");
}

export interface DesignSystemInput {
  productName: string;
  brandSummary: string;
  visualStyle: string;
  typographyScale: string;
  colorPalette: string;
  spacingScale: string;
  accessibilityRequirements: string;
  writingTone: string;
  doRules: string[];
  dontRules: string[];
}

export interface SkillMetadata {
  name: string;
  description: string;
}

export const DESIGN_SYSTEM_FIELDS = [
  "productName",
  "brandSummary",
  "visualStyle",
  "typographyScale",
  "colorPalette",
  "spacingScale",
  "accessibilityRequirements",
  "writingTone",
  "doRules",
  "dontRules"
] as const;

export type DesignSystemField = (typeof DESIGN_SYSTEM_FIELDS)[number];

export interface ProviderFile {
  provider: Provider;
  relativePath: string;
  content: string;
}
