import fs from "node:fs/promises";
import path from "node:path";
import { MANAGED_BLOCK_END, MANAGED_BLOCK_START } from "../config";
import { DesignSystemSchema, SkillMetadataSchema } from "../domain/designSystemSchema";
import { buildDefaultSkillMetadata } from "../skillMetadata";
import { DesignSystemInput, PROVIDER_DETAILS, Provider, SkillMetadata } from "../types";

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

function extractFrontmatter(content: string): string | null {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  return match?.[1] ?? null;
}

function parseFrontmatterField(frontmatter: string, key: string): string | undefined {
  const match = frontmatter.match(new RegExp(`^${escapeRegExp(key)}:\\s*(.+)$`, "m"));
  return match?.[1]?.trim();
}

function parseQuotedYamlValue(value: string): string {
  const trimmed = value.trim();
  if (trimmed.startsWith('"') && trimmed.endsWith('"')) {
    return trimmed
      .slice(1, -1)
      .replace(/\\(["\\])/g, "$1");
  }
  if (trimmed.startsWith("'") && trimmed.endsWith("'")) {
    return trimmed.slice(1, -1).replace(/''/g, "'");
  }
  return trimmed;
}

function extractSection(body: string, title: string, nextTitle: string): string | null {
  const pattern = new RegExp(
    `${escapeRegExp(title)}\\n([\\s\\S]*?)\\n${escapeRegExp(nextTitle)}`,
    "m"
  );
  const match = body.match(pattern);
  return match?.[1]?.trim() ?? null;
}

function extractSectionToEnd(body: string, title: string): string | null {
  const pattern = new RegExp(`${escapeRegExp(title)}\\n([\\s\\S]*)`);
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

function extractDesignStyleValue(body: string, label: string): string | null {
  const match = body.match(new RegExp(`^- \\*\\*${escapeRegExp(label)}:\\*\\* (.+)$`, "m"));
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
  const accessibilityRequirements = extractSection(managed, "## Accessibility", "## Writing Tone");
  const writingTone = extractSection(managed, "## Writing Tone", "## Rules: Do");
  const doRules = extractListSection(managed, "## Rules: Do", "## Rules: Don't");
  const dontRules = extractListSection(managed, "## Rules: Don't", "## Expected Behavior");

  if (
    !productName ||
    brandSummary === null ||
    !visualStyle ||
    !typographyScale ||
    !colorPalette ||
    !spacingScale ||
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
    accessibilityRequirements,
    writingTone,
    doRules,
    dontRules
  });
}

export function parseDesignMarkdown(content: string): DesignSystemInput | null {
  const frontmatter = extractFrontmatter(content);
  if (!frontmatter) {
    return null;
  }

  const productNameRaw = parseFrontmatterField(frontmatter, "name");
  const productName = productNameRaw ? parseQuotedYamlValue(productNameRaw) : "";
  const brandSummary = extractSection(content, "## Overview", "## Style Foundations");
  const visualStyle = extractDesignStyleValue(content, "Visual style");
  const typographyScale = extractDesignStyleValue(content, "Typography scale");
  const colorPalette = extractDesignStyleValue(content, "Color palette");
  const spacingScale = extractDesignStyleValue(content, "Spacing scale");
  const accessibilityRequirements = extractSection(content, "## Accessibility", "## Writing Tone");
  const writingTone = extractSection(content, "## Writing Tone", "## Rules: Do");
  const doRules = extractListSection(content, "## Rules: Do", "## Rules: Don't");
  const dontText = extractSectionToEnd(content, "## Rules: Don't");
  const dontRules = dontText
    ? dontText
        .split("\n")
        .map((line) => line.replace(/^- /, "").trim())
        .filter(Boolean)
    : null;

  const parsed = DesignSystemSchema.safeParse({
    productName,
    brandSummary: brandSummary ?? "",
    visualStyle: visualStyle ?? "",
    typographyScale: typographyScale ?? "",
    colorPalette: colorPalette ?? "",
    spacingScale: spacingScale ?? "",
    accessibilityRequirements: accessibilityRequirements ?? "",
    writingTone: writingTone ?? "",
    doRules: doRules ?? [],
    dontRules: dontRules ?? []
  });

  return parsed.success ? parsed.data : null;
}

export function parseSkillMetadata(content: string): SkillMetadata | null {
  const frontmatter = extractFrontmatter(content);
  if (!frontmatter) {
    return null;
  }

  const name = parseFrontmatterField(frontmatter, "name");
  const description = parseFrontmatterField(frontmatter, "description");
  if (!name || !description) {
    return null;
  }

  const parsed = SkillMetadataSchema.safeParse({
    name: parseQuotedYamlValue(name),
    description: parseQuotedYamlValue(description)
  });
  return parsed.success ? parsed.data : null;
}

export interface ExistingSkillState {
  designSystem: DesignSystemInput;
  metadata: SkillMetadata;
}

export async function loadExistingDesignSystem(
  projectRoot: string,
  providers: Provider[]
): Promise<ExistingSkillState | null> {
  for (const provider of providers) {
    const absPath = path.resolve(projectRoot, PROVIDER_DETAILS[provider].relativePath);
    try {
      const content = await fs.readFile(absPath, "utf8");
      const parsed = parseManagedDesignSystem(content);
      if (parsed) {
        const metadata = parseSkillMetadata(content) ?? buildDefaultSkillMetadata(parsed.productName);
        return {
          designSystem: parsed,
          metadata
        };
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

export async function loadExistingDesignMarkdown(projectRoot: string): Promise<DesignSystemInput | null> {
  const absPath = path.resolve(projectRoot, "DESIGN.md");
  try {
    const content = await fs.readFile(absPath, "utf8");
    return parseDesignMarkdown(content);
  } catch (error) {
    const e = error as NodeJS.ErrnoException;
    if (e.code !== "ENOENT") {
      throw error;
    }
  }
  return null;
}
