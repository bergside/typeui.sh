import fs from "node:fs/promises";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { runPull } from "../src/generation/runPull";

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

describe("runPull", () => {
  it("writes pulled markdown to selected provider targets", async () => {
    const root = await makeTmpDir();
    const results = await runPull({
      projectRoot: root,
      providers: ["openclaw", "open-code"],
      markdown: "<!-- TYPEUI_SH_MANAGED_START -->\npulled\n<!-- TYPEUI_SH_MANAGED_END -->"
    });

    expect(results).toHaveLength(2);
    const openclawContent = await fs.readFile(path.join(root, "skills/design-system/SKILL.md"), "utf8");
    const opencodeContent = await fs.readFile(path.join(root, ".opencode/skills/design-system/SKILL.md"), "utf8");
    expect(openclawContent).toContain("pulled");
    expect(opencodeContent).toContain("pulled");
  });

  it("deduplicates writes when providers share same output path", async () => {
    const root = await makeTmpDir();
    const results = await runPull({
      projectRoot: root,
      providers: ["trae", "trae-cn"],
      markdown: "<!-- TYPEUI_SH_MANAGED_START -->\ndeduped\n<!-- TYPEUI_SH_MANAGED_END -->"
    });

    expect(results).toHaveLength(1);
    const content = await fs.readFile(path.join(root, ".trae/skills/design-system/SKILL.md"), "utf8");
    expect(content).toContain("deduped");
  });

  it("writes design markdown to DESIGN.md when format is design", async () => {
    const root = await makeTmpDir();
    const markdown = [
      "---",
      "name: Paper",
      "---",
      "",
      "## Overview",
      "",
      "Hello design"
    ].join("\n");

    const results = await runPull({
      projectRoot: root,
      markdown,
      format: "design"
    });

    expect(results).toHaveLength(1);
    const designContent = await fs.readFile(path.join(root, "DESIGN.md"), "utf8");
    expect(designContent).toContain("## Overview");
    expect(designContent).toContain("Hello design");
  });

  it("ignores providers and writes design markdown once", async () => {
    const root = await makeTmpDir();
    const results = await runPull({
      projectRoot: root,
      providers: ["trae", "trae-cn"],
      markdown: "# Design",
      format: "design"
    });

    expect(results).toHaveLength(1);
    const content = await fs.readFile(path.join(root, "DESIGN.md"), "utf8");
    expect(content).toContain("# Design");
  });
});
