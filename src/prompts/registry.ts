type InquirerModule = typeof import("inquirer");
import { getDesignSystemUrl } from "../config";
import { RegistrySpec } from "../registry/registryClient";

async function loadInquirer(): Promise<InquirerModule["default"]> {
  const dynamicImport = new Function("specifier", "return import(specifier)") as (
    specifier: string
  ) => Promise<InquirerModule>;
  const inquirerModule = await dynamicImport("inquirer");
  return inquirerModule.default;
}

async function prompt<T>(questions: unknown): Promise<T> {
  const inquirer = await loadInquirer();
  return (await inquirer.prompt(questions as never)) as T;
}

export async function promptRegistrySpecSelection(specs: RegistrySpec[]): Promise<RegistrySpec> {
  const choices = specs.map((spec) => ({
    name: `${spec.name} (${getDesignSystemUrl(spec.slug).replace(/^https?:\/\//, "")})${
      spec.hasSkillMd ? "" : " - no skill markdown"
    }`,
    value: spec.slug,
    disabled: spec.hasSkillMd ? false : "No skill markdown available for pull."
  }));

  const answer = await prompt<{ selected: string[] }>([
    {
      type: "checkbox",
      name: "selected",
      message: "Select one registry spec to pull:",
      choices,
      validate: (value: unknown[]) => value.length === 1 || "Select exactly one spec."
    }
  ]);

  const selected = specs.find((spec) => spec.slug === answer.selected[0]);
  if (!selected) {
    throw new Error("Failed to resolve selected registry spec.");
  }
  return selected;
}
