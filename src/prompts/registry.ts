type InquirerModule = typeof import("inquirer");
import { getDesignSystemPreviewUrl } from "../config";
import { RegistrySpec } from "../registry/registryClient";
import { PullFormat } from "../types";

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

export async function promptPullFormatSelection(): Promise<PullFormat> {
  const answer = await prompt<{ format: PullFormat }>([
    {
      type: "list",
      name: "format",
      message: "Select output format:",
      choices: [
        {
          name: "SKILL.md (provider-specific paths)",
          value: "skill"
        },
        {
          name: "DESIGN.md (project root)",
          value: "design"
        }
      ]
    }
  ]);

  return answer.format;
}

export async function promptRegistrySpecSelection(specs: RegistrySpec[], format: PullFormat): Promise<RegistrySpec> {
  const choices = specs.map((spec) => ({
    name: `${spec.name} (${getDesignSystemPreviewUrl(spec.slug).replace(/^https?:\/\//, "")})${
      (format === "skill" ? spec.hasSkillMd : spec.hasDesignMd) ? "" : ` - no ${format} markdown`
    }`,
    value: spec.slug,
    disabled:
      format === "skill"
        ? spec.hasSkillMd
          ? false
          : "No skill markdown available for pull."
        : spec.hasDesignMd
          ? false
          : "No design markdown available for pull."
  }));

  const answer = await prompt<{ selected: string[] }>([
    {
      type: "checkbox",
      name: "selected",
      message: `Select one registry spec to pull (${format}):`,
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
