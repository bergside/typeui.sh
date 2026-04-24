#!/usr/bin/env node
import path from "node:path";
import { Command } from "commander";
import {
  promptDesignSystem,
  promptDesignSystemFields,
  promptDesignSystemUpdates,
  promptProviders,
  promptSkillMetadata
} from "./prompts/designSystem";
import { promptPullFormatSelection, promptRegistrySpecSelection } from "./prompts/registry";
import { PullFormatSchema, RegistrySlugSchema } from "./domain/designSystemSchema";
import { loadExistingDesignMarkdown, loadExistingDesignSystem } from "./generation/existingDesignSystem";
import { generateRandomDesignSystem } from "./generation/randomDesignSystem";
import { runDesignGeneration } from "./generation/runDesignGeneration";
import { runGeneration } from "./generation/runGeneration";
import { runPull } from "./generation/runPull";
import { listRegistrySpecs, pullRegistryMarkdown } from "./registry/registryClient";
import { ALWAYS_INCLUDED_PROVIDERS, DesignSystemInput, Provider, PullFormat, SUPPORTED_PROVIDERS } from "./types";
import { printBanner } from "./ui/banner";
import { buildDefaultSkillMetadata } from "./skillMetadata";

function parseProviderOption(raw?: string): Provider[] | null {
  if (!raw) {
    return null;
  }
  const values = raw
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);

  if (values.length === 0) {
    return null;
  }

  const invalid = values.filter((provider) => !SUPPORTED_PROVIDERS.includes(provider as Provider));
  if (invalid.length > 0) {
    throw new Error(
      `Unsupported providers: ${invalid.join(", ")}. Supported: ${SUPPORTED_PROVIDERS.join(", ")}.`
    );
  }

  return values as Provider[];
}

function parsePullFormatOption(raw?: string): PullFormat {
  const parsed = PullFormatSchema.safeParse(raw ?? "skill");
  if (!parsed.success) {
    throw new Error("Unsupported format. Supported: skill, design.");
  }
  return parsed.data;
}

async function resolvePullFormatOption(raw?: string): Promise<PullFormat> {
  if (raw) {
    return parsePullFormatOption(raw);
  }
  return promptPullFormatSelection();
}

function printResults(
  mode: "generated" | "updated" | "preview" | "pulled" | "randomized",
  results: Array<{ filePath: string; changed: boolean }>
) {
  console.log("");
  for (const result of results) {
    const state = result.changed ? mode : "unchanged";
    console.log(`${state}: ${path.relative(process.cwd(), result.filePath) || result.filePath}`);
  }
}

async function randomizeLike(options: { providers?: string; format?: string; dryRun?: boolean }) {
  const format = await resolvePullFormatOption(options.format);
  const designSystem = generateRandomDesignSystem();

  if (format === "design") {
    const results = await runDesignGeneration({
      projectRoot: process.cwd(),
      designSystem,
      dryRun: Boolean(options.dryRun)
    });
    printResults(options.dryRun ? "preview" : "randomized", results);
    return;
  }

  const selectedProviders = parseProviderOption(options.providers) ?? (await promptProviders());
  const providers = [...new Set<Provider>([...ALWAYS_INCLUDED_PROVIDERS, ...selectedProviders])];
  const results = await runGeneration({
    projectRoot: process.cwd(),
    providers,
    designSystem,
    metadata: buildDefaultSkillMetadata(designSystem.productName),
    dryRun: Boolean(options.dryRun)
  });
  printResults(options.dryRun ? "preview" : "randomized", results);
}

async function generateLike(
  action: "generate" | "update",
  mode: "generated" | "updated" | "preview",
  options: { providers?: string; format?: string; dryRun?: boolean }
) {
  const format = await resolvePullFormatOption(options.format);
  let designSystem: DesignSystemInput;

  if (format === "design") {
    if (action === "update") {
      const existing = await loadExistingDesignMarkdown(process.cwd());
      if (!existing) {
        throw new Error(
          "No existing DESIGN.md found in the project root. Run `typeui.sh generate` first."
        );
      }
      const fields = await promptDesignSystemFields();
      const updates = await promptDesignSystemUpdates(existing, fields);
      designSystem = { ...existing, ...updates };
    } else {
      designSystem = await promptDesignSystem("typeui.sh");
    }

    const results = await runDesignGeneration({
      projectRoot: process.cwd(),
      designSystem,
      dryRun: Boolean(options.dryRun)
    });
    printResults(mode, results);
    return;
  }

  const selectedProviders = parseProviderOption(options.providers) ?? (await promptProviders());
  const providers = [...new Set<Provider>([...ALWAYS_INCLUDED_PROVIDERS, ...selectedProviders])];
  let metadata = buildDefaultSkillMetadata("typeui.sh");

  if (action === "update") {
    const existing = await loadExistingDesignSystem(process.cwd(), providers);
    if (!existing) {
      throw new Error(
        "No existing managed design system found for the selected providers. Run `typeui.sh generate` first."
      );
    }

    metadata = await promptSkillMetadata(existing.metadata);
    const fields = await promptDesignSystemFields();
    const updates = await promptDesignSystemUpdates(existing.designSystem, fields);
    designSystem = { ...existing.designSystem, ...updates };
  } else {
    designSystem = await promptDesignSystem("typeui.sh");
    metadata = await promptSkillMetadata(buildDefaultSkillMetadata(designSystem.productName));
  }

  const results = await runGeneration({
    projectRoot: process.cwd(),
    providers,
    designSystem,
    metadata,
    dryRun: Boolean(options.dryRun)
  });
  printResults(mode, results);
}

async function pullLike(slug: string, options: { providers?: string; format?: string; dryRun?: boolean }) {
  const parsedSlug = RegistrySlugSchema.safeParse(slug);
  if (!parsedSlug.success) {
    throw new Error(parsedSlug.error.issues[0]?.message ?? "Invalid slug.");
  }
  const format = await resolvePullFormatOption(options.format);
  const providers =
    format === "skill"
      ? [
          ...new Set<Provider>([
            ...ALWAYS_INCLUDED_PROVIDERS,
            ...(parseProviderOption(options.providers) ?? (await promptProviders()))
          ])
        ]
      : [];
  const pullResult = await pullRegistryMarkdown(parsedSlug.data, format);
  if (!pullResult.ok) {
    throw new Error(`Registry pull failed: ${pullResult.reason}`);
  }
  const results = await runPull({
    projectRoot: process.cwd(),
    providers,
    markdown: pullResult.markdown,
    format,
    dryRun: Boolean(options.dryRun)
  });
  printResults(options.dryRun ? "preview" : "pulled", results);
}

async function listLike(options: { providers?: string; format?: string; dryRun?: boolean }) {
  const format = await resolvePullFormatOption(options.format);
  const specsResult = await listRegistrySpecs();
  if (!specsResult.ok) {
    throw new Error(`Registry specs failed: ${specsResult.reason}`);
  }

  if (specsResult.specs.length === 0) {
    console.log("No registry specs available.");
    return;
  }

  const selectableSpecs = specsResult.specs.filter((spec) => (format === "skill" ? spec.hasSkillMd : spec.hasDesignMd));
  if (selectableSpecs.length === 0) {
    throw new Error(`No pullable registry specs available for format '${format}'.`);
  }

  const selected = await promptRegistrySpecSelection(specsResult.specs, format);
  await pullLike(selected.slug, { ...options, format });
}

const program = new Command();

const hasNoArgs = process.argv.length <= 2;
const wantsHelp = process.argv.includes("--help") || process.argv.includes("-h");
if (hasNoArgs || wantsHelp) {
  printBanner();
}

program
  .name("typeui.sh")
  .description("Generate and update design-system skill markdown files for AI providers.")
  .version("0.1.0");

program.hook("preAction", () => {
  printBanner();
});

program
  .command("generate")
  .description("Generate SKILL.md provider files or DESIGN.md in the current project.")
  .option("-p, --providers <providers>", "Comma-separated providers (skill format only)")
  .option("-f, --format <format>", "Output format (skill|design)")
  .option("--dry-run", "Preview file changes without writing")
  .action(async (options) => {
    await generateLike("generate", options.dryRun ? "preview" : "generated", options);
  });

program
  .command("update")
  .description("Update existing SKILL.md provider files or root DESIGN.md in the current project.")
  .option("-p, --providers <providers>", "Comma-separated providers (skill format only)")
  .option("-f, --format <format>", "Output format (skill|design)")
  .option("--dry-run", "Preview file changes without writing")
  .action(async (options) => {
    await generateLike("update", options.dryRun ? "preview" : "updated", options);
  });

program
  .command("pull <slug>")
  .description("Pull a registry markdown file by slug and write SKILL.md or DESIGN.md outputs.")
  .option("-p, --providers <providers>", "Comma-separated providers (skill format only)")
  .option("-f, --format <format>", "Registry file format (skill|design)")
  .option("--dry-run", "Preview file changes without writing")
  .action(async (slug, options) => {
    await pullLike(slug, options);
  });

program
  .command("list")
  .description("List available registry design system specs.")
  .option("-p, --providers <providers>", "Comma-separated providers (skill format only)")
  .option("-f, --format <format>", "Registry file format (skill|design)")
  .option("--dry-run", "Preview file changes without writing")
  .action(async (options) => {
    await listLike(options);
  });

program
  .command("randomize")
  .description("Generate a randomized local design system and write SKILL.md or DESIGN.md outputs.")
  .option("-p, --providers <providers>", "Comma-separated providers (skill format only)")
  .option("-f, --format <format>", "Output format (skill|design)")
  .option("--dry-run", "Preview file changes without writing")
  .action(async (options) => {
    await randomizeLike(options);
  });

program.parseAsync().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`typeui.sh error: ${message}`);
  process.exitCode = 1;
});
