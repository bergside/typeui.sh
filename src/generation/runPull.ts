import { upsertManagedSkillFile, writeMarkdownFile } from "../io/updateSkillFile";
import { getProviderOutputPath, Provider, PullFormat } from "../types";

export interface PullWriteOptions {
  projectRoot: string;
  providers?: Provider[];
  markdown: string;
  format?: PullFormat;
  dryRun?: boolean;
}

export interface PullWriteResult {
  filePath: string;
  changed: boolean;
}

export async function runPull(options: PullWriteOptions): Promise<PullWriteResult[]> {
  const format = options.format ?? "skill";

  if (format === "design") {
    const result = await writeMarkdownFile(
      options.projectRoot,
      "DESIGN.md",
      options.markdown,
      options.dryRun ?? false
    );
    return [
      {
        filePath: result.absPath,
        changed: result.changed
      }
    ];
  }

  const providers = options.providers ?? [];
  if (providers.length === 0) {
    throw new Error("No providers selected for skill format.");
  }

  const results: PullWriteResult[] = [];
  const seenPaths = new Set<string>();

  for (const provider of providers) {
    const relativePath = getProviderOutputPath(provider, format);
    if (seenPaths.has(relativePath)) {
      continue;
    }
    seenPaths.add(relativePath);
    const result = await upsertManagedSkillFile(
      options.projectRoot,
      relativePath,
      options.markdown,
      options.dryRun ?? false
    );
    results.push({
      filePath: result.absPath,
      changed: result.changed
    });
  }

  return results;
}
