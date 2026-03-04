import inquirer from "inquirer";
import {
  DesignSystemSchema,
  FlatDesignSystemPromptSchema,
  ProviderSelectionSchema
} from "../domain/designSystemSchema";
import {
  DesignSystemField,
  DesignSystemInput,
  Provider,
  SUPPORTED_PROVIDERS
} from "../types";

const providerChoices: { name: string; value: Provider }[] = [
  { name: "Codex", value: "codex" },
  { name: "Cursor", value: "cursor" },
  { name: "Claude Code", value: "claude-code" },
  { name: "Open Code", value: "open-code" }
];

const designFieldChoices: { name: string; value: DesignSystemField }[] = [
  { name: "Product name", value: "productName" },
  { name: "Brand summary", value: "brandSummary" },
  { name: "Visual style", value: "visualStyle" },
  { name: "Typography scale", value: "typographyScale" },
  { name: "Color palette", value: "colorPalette" },
  { name: "Spacing scale", value: "spacingScale" },
  { name: "Component families", value: "componentFamilies" },
  { name: "Accessibility requirements", value: "accessibilityRequirements" },
  { name: "Writing tone", value: "writingTone" },
  { name: "DO rules", value: "doRules" },
  { name: "DON'T rules", value: "dontRules" }
];

const listFieldSet = new Set<DesignSystemField>(["componentFamilies", "doRules", "dontRules"]);

function isListField(
  field: DesignSystemField
): field is "componentFamilies" | "doRules" | "dontRules" {
  return listFieldSet.has(field);
}

function parseCsvList(value: string): string[] {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export async function promptProviders(): Promise<Provider[]> {
  const answers = await inquirer.prompt<{ providers: Provider[] }>([
    {
      type: "checkbox",
      name: "providers",
      message: "Select provider files to generate/update:",
      choices: providerChoices,
      validate: (value: unknown[]) => value.length > 0 || "Select at least one provider."
    }
  ]);

  return ProviderSelectionSchema.parse(answers.providers);
}

export async function promptDesignSystem(defaultProductName = "typeui.sh"): Promise<DesignSystemInput> {
  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "productName",
      message: "Product name:",
      default: defaultProductName
    },
    {
      type: "input",
      name: "brandSummary",
      message: "Brand summary (1-2 sentences):"
    },
    {
      type: "input",
      name: "visualStyle",
      message: "Visual style keywords (comma or sentence):",
      default: "modern, clean, high-contrast"
    },
    {
      type: "input",
      name: "typographyScale",
      message: "Typography scale guidance:",
      default: "12/14/16/20/24/32"
    },
    {
      type: "input",
      name: "colorPalette",
      message: "Color palette guidance:",
      default: "primary, neutral, success, warning, danger"
    },
    {
      type: "input",
      name: "spacingScale",
      message: "Spacing scale guidance:",
      default: "4/8/12/16/24/32"
    },
    {
      type: "input",
      name: "componentFamilies",
      message: "Component families (comma-separated):",
      default: "buttons, inputs, cards, modals"
    },
    {
      type: "input",
      name: "accessibilityRequirements",
      message: "Accessibility requirements:",
      default: "WCAG 2.2 AA, keyboard-first interactions, clear focus states"
    },
    {
      type: "input",
      name: "writingTone",
      message: "UI writing tone:",
      default: "concise, confident, and helpful"
    },
    {
      type: "input",
      name: "doRules",
      message: "Design DO rules (comma-separated):",
      default: "prefer consistent spacing, use semantic colors, preserve hierarchy"
    },
    {
      type: "input",
      name: "dontRules",
      message: "Design DON'T rules (comma-separated):",
      default: "avoid low contrast, avoid inconsistent radii, avoid vague labels"
    }
  ]);

  const normalized = FlatDesignSystemPromptSchema.parse(answers);
  return DesignSystemSchema.parse(normalized);
}

export async function promptDesignSystemFields(): Promise<DesignSystemField[]> {
  const answers = await inquirer.prompt<{ fields: DesignSystemField[] }>([
    {
      type: "checkbox",
      name: "fields",
      message: "Select fields to update:",
      choices: designFieldChoices,
      validate: (value: unknown[]) => value.length > 0 || "Select at least one field."
    }
  ]);

  return answers.fields;
}

export async function promptDesignSystemUpdates(
  current: DesignSystemInput,
  fields: DesignSystemField[]
): Promise<Partial<DesignSystemInput>> {
  const questions = fields.map((field) => ({
    type: "input" as const,
    name: field,
    message:
      `${designFieldChoices.find((choice) => choice.value === field)?.name ?? field}:` +
      (isListField(field) ? " (comma-separated)" : ""),
    default: isListField(field) ? current[field].join(", ") : current[field]
  }));

  const answers = await inquirer.prompt<Record<DesignSystemField, string>>(questions);
  const updates: Partial<DesignSystemInput> = {};

  for (const field of fields) {
    const value = isListField(field) ? parseCsvList(answers[field]) : answers[field];
    (updates as Record<string, unknown>)[field] = value;
  }

  const merged = DesignSystemSchema.parse({ ...current, ...updates });
  const validatedUpdates: Partial<DesignSystemInput> = {};
  for (const field of fields) {
    (validatedUpdates as Record<string, unknown>)[field] = merged[field];
  }

  return validatedUpdates;
}

export function listSupportedProviders(): readonly string[] {
  return SUPPORTED_PROVIDERS;
}
