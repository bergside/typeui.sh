import fs from "node:fs/promises";
import path from "node:path";
import { MANAGED_BLOCK_END, MANAGED_BLOCK_START } from "../config";
import { DesignSystemSchema } from "../domain/designSystemSchema";
import { DesignSystemInput, Provider } from "../types";

const providerSkillPaths: Record<Provider, string> = {
  codex: ".codex/skills/design-system/SKILL.md",
  cursor: ".cursor/skills/design-system/SKILL.md",
  "claude-code": ".claude/skills/design-system/SKILL.md",
  "open-code": ".opencode/skills/design-system/SKILL.md"
};

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function extractManagedBlock(content: string): string | null {
  const startIdx = content.indexOf(MANAGED_BLOCK_START);
  const endIdx = content.indexOf(MANAGED_BLOCK_END);
  if (startIdx === -1 || endIdx === -1 || endIdx < startIdx) {
    return null;
  }
  return content.slice(startIdx, endIdx + MANAGED_BLOCK_END.length);
}

function extractSection(body: string, title: string, nextTitle: string): string | null {
  const pattern = new RegExp(
    `${escapeRegExp(title)}\\n([\\s\\S]*?)\\n${escapeRegExp(nextTitle)}`,
    "m"
  );
  const match = body.match(pattern);
  return match?.[1]?.trim() ?? null;
}

function extractListSection(body: string, title: string, nextTitle: string): string[] | null {
  const text = extractSection(body, title, nextTitle);
  if (!text) {
    return null;
  }
  return text
    .split("\n")
    .map((line) => line.replace(/^- /, "").trim())
    .filter(Boolean);
}

function extractStyleValue(body: string, prefix: string): string | null {
  const match = body.match(new RegExp(`^- ${escapeRegExp(prefix)}: (.+)$`, "m"));
  return match?.[1]?.trim() ?? null;
}

export function parseManagedDesignSystem(content: string): DesignSystemInput | null {
  const managed = extractManagedBlock(content);
  if (!managed) {
    return null;
  }

  const productName = managed.match(/^# (.+?) Design System Skill \(/m)?.[1]?.trim();
  const brandSummary = extractSection(managed, "## Brand", "## Style Foundations");
  const visualStyle = extractStyleValue(managed, "Visual style");
  const typographyScale = extractStyleValue(managed, "Typography scale");
  const colorPalette = extractStyleValue(managed, "Color palette");
  const spacingScale = extractStyleValue(managed, "Spacing scale");
  const componentFamilies = extractListSection(managed, "## Component Families", "## Accessibility");
  const accessibilityRequirements = extractSection(managed, "## Accessibility", "## Writing Tone");
  const writingTone = extractSection(managed, "## Writing Tone", "## Rules: Do");
  const doRules = extractListSection(managed, "## Rules: Do", "## Rules: Don't");
  const dontRules = extractListSection(managed, "## Rules: Don't", "## Expected Behavior");

  if (
    !productName ||
    !brandSummary ||
    !visualStyle ||
    !typographyScale ||
    !colorPalette ||
    !spacingScale ||
    !componentFamilies ||
    !accessibilityRequirements ||
    !writingTone ||
    !doRules ||
    !dontRules
  ) {
    return null;
  }

  return DesignSystemSchema.parse({
    productName,
    brandSummary,
    visualStyle,
    typographyScale,
    colorPalette,
    spacingScale,
    componentFamilies,
    accessibilityRequirements,
    writingTone,
    doRules,
    dontRules
  });
}

export async function loadExistingDesignSystem(
  projectRoot: string,
  providers: Provider[]
): Promise<DesignSystemInput | null> {
  for (const provider of providers) {
    const absPath = path.resolve(projectRoot, providerSkillPaths[provider]);
    try {
      const content = await fs.readFile(absPath, "utf8");
      const parsed = parseManagedDesignSystem(content);
      if (parsed) {
        return parsed;
      }
    } catch (error) {
      const e = error as NodeJS.ErrnoException;
      if (e.code !== "ENOENT") {
        throw error;
      }
    }
  }
  return null;
}
