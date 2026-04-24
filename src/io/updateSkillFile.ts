import fs from "node:fs/promises";
import path from "node:path";
import { MANAGED_BLOCK_END, MANAGED_BLOCK_START } from "../config";

function extractManagedBlock(content: string): string | null {
  const startIdx = content.indexOf(MANAGED_BLOCK_START);
  const endIdx = content.indexOf(MANAGED_BLOCK_END);
  if (startIdx === -1 || endIdx === -1 || endIdx < startIdx) {
    return null;
  }
  return content.slice(startIdx, endIdx + MANAGED_BLOCK_END.length);
}

function extractFrontmatter(content: string): string | null {
  const match = content.match(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/);
  return match?.[0] ?? null;
}

function removeLeadingFrontmatter(content: string): string {
  const frontmatter = extractFrontmatter(content);
  if (!frontmatter) {
    return content;
  }
  return content.slice(frontmatter.length);
}

function applyFrontmatter(content: string, frontmatter: string): string {
  const withoutFrontmatter = removeLeadingFrontmatter(content).trimStart();
  const normalizedFrontmatter = frontmatter.trimEnd();
  if (!withoutFrontmatter) {
    return `${normalizedFrontmatter}\n`;
  }
  return `${normalizedFrontmatter}\n\n${withoutFrontmatter}`;
}

function mergeWithManagedBlock(existing: string, generatedBlock: string): string {
  const startIdx = existing.indexOf(MANAGED_BLOCK_START);
  const endIdx = existing.indexOf(MANAGED_BLOCK_END);

  if (startIdx === -1 || endIdx === -1 || endIdx < startIdx) {
    const base = existing.trimEnd();
    if (!base) {
      return `${generatedBlock}\n`;
    }
    return `${base}\n\n${generatedBlock}\n`;
  }

  const before = existing.slice(0, startIdx).trimEnd();
  const after = existing.slice(endIdx + MANAGED_BLOCK_END.length).trimStart();

  const merged = [before, generatedBlock, after].filter(Boolean).join("\n\n");
  return `${merged}\n`;
}

export async function upsertManagedSkillFile(
  projectRoot: string,
  relativePath: string,
  generatedContent: string,
  dryRun = false
): Promise<{ absPath: string; changed: boolean }> {
  const absPath = path.resolve(projectRoot, relativePath);
  await fs.mkdir(path.dirname(absPath), { recursive: true });

  let existing = "";
  try {
    existing = await fs.readFile(absPath, "utf8");
  } catch (error) {
    const e = error as NodeJS.ErrnoException;
    if (e.code !== "ENOENT") {
      throw error;
    }
  }

  const generatedBlock = extractManagedBlock(generatedContent) ?? generatedContent;
  const generatedFrontmatter = extractFrontmatter(generatedContent);

  let nextContent = mergeWithManagedBlock(existing, generatedBlock);
  if (generatedFrontmatter) {
    nextContent = applyFrontmatter(nextContent, generatedFrontmatter);
  }

  const changed = existing !== nextContent;

  if (!dryRun && changed) {
    await fs.writeFile(absPath, nextContent, "utf8");
  }

  return { absPath, changed };
}

export async function writeMarkdownFile(
  projectRoot: string,
  relativePath: string,
  content: string,
  dryRun = false
): Promise<{ absPath: string; changed: boolean }> {
  const absPath = path.resolve(projectRoot, relativePath);
  await fs.mkdir(path.dirname(absPath), { recursive: true });

  let existing = "";
  try {
    existing = await fs.readFile(absPath, "utf8");
  } catch (error) {
    const e = error as NodeJS.ErrnoException;
    if (e.code !== "ENOENT") {
      throw error;
    }
  }

  const nextContent = content.endsWith("\n") ? content : `${content}\n`;
  const changed = existing !== nextContent;

  if (!dryRun && changed) {
    await fs.writeFile(absPath, nextContent, "utf8");
  }

  return { absPath, changed };
}
