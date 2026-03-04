export const SUPPORTED_PROVIDERS = ["codex", "cursor", "claude-code", "open-code"] as const;

export type Provider = (typeof SUPPORTED_PROVIDERS)[number];

export interface DesignSystemInput {
  productName: string;
  brandSummary: string;
  visualStyle: string;
  typographyScale: string;
  colorPalette: string;
  spacingScale: string;
  componentFamilies: string[];
  accessibilityRequirements: string;
  writingTone: string;
  doRules: string[];
  dontRules: string[];
}

export const DESIGN_SYSTEM_FIELDS = [
  "productName",
  "brandSummary",
  "visualStyle",
  "typographyScale",
  "colorPalette",
  "spacingScale",
  "componentFamilies",
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

export interface LicenseCacheRecord {
  productId: string;
  verifiedAt: string;
  expiresAt: string;
  licenseKeyFingerprint: string;
}
