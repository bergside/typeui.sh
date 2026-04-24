import fs from "node:fs/promises";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { upsertManagedSkillFile, writeMarkdownFile } from "../src/io/updateSkillFile";

const tmpDirs: string[] = [];
const localTmpRoot = path.join(process.cwd(), ".tmp-tests");

async function makeTmpDir(): Promise<string> {
  await fs.mkdir(localTmpRoot, { recursive: true });
  const dir = await fs.mkdtemp(path.join(localTmpRoot, "typeui-sh-test-"));
  tmpDirs.push(dir);
  return dir;
}

afterEach(async () => {
  await Promise.all(
    tmpDirs.splice(0).map(async (dir) => {
      await fs.rm(dir, { recursive: true, force: true });
    })
  );
});

describe("upsertManagedSkillFile", () => {
  it("creates a file when missing", async () => {
    const root = await makeTmpDir();
    const result = await upsertManagedSkillFile(
      root,
      "cursor/skills/design-system/SKILL.md",
      "<!-- TYPEUI_SH_MANAGED_START -->\nhello\n<!-- TYPEUI_SH_MANAGED_END -->"
    );
    expect(result.changed).toBe(true);
    const content = await fs.readFile(result.absPath, "utf8");
    expect(content).toContain("hello");
  });

  it("replaces only managed section on update", async () => {
    const root = await makeTmpDir();
    const rel = "cursor/skills/design-system/SKILL.md";
    const abs = path.join(root, rel);
    await fs.mkdir(path.dirname(abs), { recursive: true });
    await fs.writeFile(
      abs,
      [
        "# Manual Header",
        "",
        "<!-- TYPEUI_SH_MANAGED_START -->",
        "old content",
        "<!-- TYPEUI_SH_MANAGED_END -->",
        "",
        "Manual footer"
      ].join("\n"),
      "utf8"
    );

    const result = await upsertManagedSkillFile(
      root,
      rel,
      "<!-- TYPEUI_SH_MANAGED_START -->\nnew content\n<!-- TYPEUI_SH_MANAGED_END -->"
    );

    expect(result.changed).toBe(true);
    const content = await fs.readFile(abs, "utf8");
    expect(content).toContain("# Manual Header");
    expect(content).toContain("new content");
    expect(content).toContain("Manual footer");
    expect(content).not.toContain("old content");
  });

  it("writes frontmatter delimiters when generated content includes metadata", async () => {
    const root = await makeTmpDir();
    const result = await upsertManagedSkillFile(
      root,
      "cursor/skills/design-system/SKILL.md",
      [
        "---",
        'name: "next-best-practices"',
        'description: "Next.js best practices"',
        "---",
        "",
        "<!-- TYPEUI_SH_MANAGED_START -->",
        "hello",
        "<!-- TYPEUI_SH_MANAGED_END -->"
      ].join("\n")
    );

    expect(result.changed).toBe(true);
    const content = await fs.readFile(result.absPath, "utf8");
    expect(content.startsWith("---\n")).toBe(true);
    expect(content).toContain('name: "next-best-practices"');
    expect(content).toContain('description: "Next.js best practices"');
    expect(content).toContain("hello");
  });

  it("replaces existing frontmatter when generated content includes metadata", async () => {
    const root = await makeTmpDir();
    const rel = "cursor/skills/design-system/SKILL.md";
    const abs = path.join(root, rel);
    await fs.mkdir(path.dirname(abs), { recursive: true });
    await fs.writeFile(
      abs,
      [
        "---",
        'name: "old-skill"',
        'description: "Old description"',
        "---",
        "",
        "<!-- TYPEUI_SH_MANAGED_START -->",
        "old content",
        "<!-- TYPEUI_SH_MANAGED_END -->"
      ].join("\n"),
      "utf8"
    );

    await upsertManagedSkillFile(
      root,
      rel,
      [
        "---",
        'name: "new-skill"',
        'description: "New description"',
        "---",
        "",
        "<!-- TYPEUI_SH_MANAGED_START -->",
        "new content",
        "<!-- TYPEUI_SH_MANAGED_END -->"
      ].join("\n")
    );

    const content = await fs.readFile(abs, "utf8");
    expect(content).toContain('name: "new-skill"');
    expect(content).toContain('description: "New description"');
    expect(content).toContain("new content");
    expect(content).not.toContain("old-skill");
  });
});

describe("writeMarkdownFile", () => {
  it("creates a markdown file when missing", async () => {
    const root = await makeTmpDir();
    const result = await writeMarkdownFile(root, "cursor/skills/design-system/DESIGN.md", "# Hello");
    expect(result.changed).toBe(true);
    const content = await fs.readFile(result.absPath, "utf8");
    expect(content).toBe("# Hello\n");
  });

  it("replaces existing markdown content", async () => {
    const root = await makeTmpDir();
    const rel = "cursor/skills/design-system/DESIGN.md";
    const abs = path.join(root, rel);
    await fs.mkdir(path.dirname(abs), { recursive: true });
    await fs.writeFile(abs, "old\n", "utf8");

    const result = await writeMarkdownFile(root, rel, "new");
    expect(result.changed).toBe(true);

    const content = await fs.readFile(abs, "utf8");
    expect(content).toBe("new\n");
  });
});
