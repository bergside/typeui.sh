#!/usr/bin/env node
import path from "node:path";
import { Command } from "commander";
import {
  clearCachedLicenseState,
  ensureVerifiedAccess,
  getCachedLicenseSummary,
  verifyAndCacheLicenseFromPrompt
} from "./licensing/licenseService";
import {
  promptDesignSystem,
  promptDesignSystemFields,
  promptDesignSystemUpdates,
  promptProviders
} from "./prompts/designSystem";
import { loadExistingDesignSystem } from "./generation/existingDesignSystem";
import { runGeneration } from "./generation/runGeneration";
import { ALWAYS_INCLUDED_PROVIDERS, DesignSystemInput, Provider, SUPPORTED_PROVIDERS } from "./types";
import { printBanner } from "./ui/banner";

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

function printResults(mode: "generated" | "updated" | "preview", results: Array<{ filePath: string; changed: boolean }>) {
  console.log("");
  for (const result of results) {
    const state = result.changed ? mode : "unchanged";
    console.log(`${state}: ${path.relative(process.cwd(), result.filePath) || result.filePath}`);
  }
}

async function generateLike(mode: "generated" | "updated" | "preview", options: { providers?: string; dryRun?: boolean }) {
  await ensureVerifiedAccess();
  const selectedProviders = parseProviderOption(options.providers) ?? (await promptProviders());
  const providers = [...new Set<Provider>([...ALWAYS_INCLUDED_PROVIDERS, ...selectedProviders])];
  let designSystem: DesignSystemInput;

  if (mode === "updated") {
    const existing = await loadExistingDesignSystem(process.cwd(), providers);
    if (!existing) {
      throw new Error(
        "No existing managed design system found for the selected providers. Run `typeui.sh generate` first."
      );
    }

    const fields = await promptDesignSystemFields();
    const updates = await promptDesignSystemUpdates(existing, fields);
    designSystem = { ...existing, ...updates };
  } else {
    designSystem = await promptDesignSystem("typeui.sh");
  }

  const results = await runGeneration({
    projectRoot: process.cwd(),
    providers,
    designSystem,
    dryRun: Boolean(options.dryRun)
  });
  printResults(mode, results);
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
  .command("verify")
  .description("Verify your license key and cache local license status.")
  .action(async () => {
    const record = await verifyAndCacheLicenseFromPrompt();
    console.log(`License cached (${record.licenseKeyFingerprint}) until ${record.expiresAt}`);
  });

program
  .command("license")
  .description("Show local cached license status.")
  .action(async () => {
    console.log(await getCachedLicenseSummary());
  });

program
  .command("generate")
  .description("Generate provider skill files in the current project.")
  .option("-p, --providers <providers>", "Comma-separated providers")
  .option("--dry-run", "Preview file changes without writing")
  .action(async (options) => {
    await generateLike(options.dryRun ? "preview" : "generated", options);
  });

program
  .command("update")
  .description("Update existing provider skill files in the current project.")
  .option("-p, --providers <providers>", "Comma-separated providers")
  .option("--dry-run", "Preview file changes without writing")
  .action(async (options) => {
    await generateLike(options.dryRun ? "preview" : "updated", options);
  });

program
  .command("clear-cache")
  .description("Clear all local typeui.sh cache state.")
  .action(async () => {
    await clearCachedLicenseState();
    console.log("Cleared local cache state.");
  });

program.parseAsync().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`typeui.sh error: ${message}`);
  process.exitCode = 1;
});
