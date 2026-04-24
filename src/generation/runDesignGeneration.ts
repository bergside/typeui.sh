import { DesignSystemInput } from "../types";
import { writeMarkdownFile } from "../io/updateSkillFile";
import { createDesignMarkdownFile } from "../renderers/shared";

export interface DesignGenerationOptions {
  projectRoot: string;
  designSystem: DesignSystemInput;
  dryRun?: boolean;
}

export interface DesignGenerationResult {
  filePath: string;
  changed: boolean;
}

export async function runDesignGeneration(options: DesignGenerationOptions): Promise<DesignGenerationResult[]> {
  const content = createDesignMarkdownFile(options.designSystem);
  const result = await writeMarkdownFile(
    options.projectRoot,
    "DESIGN.md",
    content,
    options.dryRun ?? false
  );

  return [
    {
      filePath: result.absPath,
      changed: result.changed
    }
  ];
}
