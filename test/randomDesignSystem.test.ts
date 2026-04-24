import { describe, expect, it } from "vitest";
import { generateRandomDesignSystem } from "../src/generation/randomDesignSystem";

describe("generateRandomDesignSystem", () => {
  it("returns a valid randomized design system payload", () => {
    const design = generateRandomDesignSystem();

    expect(design.productName.length).toBeGreaterThan(2);
    expect(design.brandSummary.length).toBeGreaterThan(10);
    expect(design.visualStyle).toContain(",");
    expect(design.typographyScale).toContain("Fonts:");
    expect(design.typographyScale).toContain("weights=");
    expect(design.colorPalette).toContain("Tokens:");
    expect(design.colorPalette).toContain("primary=#");
    expect(design.accessibilityRequirements.length).toBeGreaterThan(10);
    expect(design.writingTone.length).toBeGreaterThan(5);
    expect(design.doRules.length).toBeGreaterThanOrEqual(3);
    expect(design.dontRules.length).toBeGreaterThanOrEqual(3);
  });
});
