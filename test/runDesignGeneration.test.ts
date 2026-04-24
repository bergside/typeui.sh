import fs from "node:fs/promises";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { runDesignGeneration } from "../src/generation/runDesignGeneration";
import { DesignSystemInput } from "../src/types";

const tmpDirs: string[] = [];
const localTmpRoot = path.join(process.cwd(), ".tmp-tests");

const sampleDesign: DesignSystemInput = {
  productName: "typeui.sh",
  brandSummary: "Developer-first UI guidance.",
  visualStyle: "modern and clean",
  typographyScale: "12/14/16/20/24/32",
  colorPalette: "primary, neutral, semantic",
  spacingScale: "4/8/12/16/24/32",
  accessibilityRequirements: "WCAG 2.2 AA",
  writingTone: "clear and direct",
  doRules: ["use semantic tokens", "preserve hierarchy"],
  dontRules: ["use low contrast", "break spacing rhythm"]
};

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

describe("runDesignGeneration", () => {
  it("writes DESIGN.md in project root", async () => {
    const root = await makeTmpDir();
    const results = await runDesignGeneration({
      projectRoot: root,
      designSystem: sampleDesign
    });

    expect(results).toHaveLength(1);
    const content = await fs.readFile(path.join(root, "DESIGN.md"), "utf8");
    expect(content).toContain('name: "typeui.sh"');
    expect(content).toContain("## Overview");
    expect(content).toContain("Developer-first UI guidance.");
  });
});
