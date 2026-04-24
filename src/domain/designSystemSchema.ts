import { z } from "zod";
import { Provider, SUPPORTED_PROVIDERS } from "../types";

const csvToList = (value: string): string[] =>
  value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

const nonEmptyList = z
  .string()
  .transform(csvToList)
  .pipe(z.array(z.string()).min(1, "At least one item is required."));

export const ProviderSelectionSchema = z
  .array(
    z.string().refine((provider) => SUPPORTED_PROVIDERS.includes(provider as Provider), {
      message: `Provider must be one of: ${SUPPORTED_PROVIDERS.join(", ")}.`
    })
  )
  .min(1)
  .transform((providers) => providers as Provider[]);

export const DesignSystemSchema = z.object({
  productName: z.string().min(2, "Product name is too short."),
  brandSummary: z.string(),
  visualStyle: z.string().min(3),
  typographyScale: z.string().min(3),
  colorPalette: z.string().min(3),
  spacingScale: z.string().min(3),
  accessibilityRequirements: z.string().min(3),
  writingTone: z.string().min(3),
  doRules: z.array(z.string().min(1)).min(1),
  dontRules: z.array(z.string().min(1)).min(1)
});

export const SkillMetadataSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Skill name is required.")
    .max(100, "Skill name is too long.")
    .regex(
      /^[a-z0-9](?:[a-z0-9-_]*[a-z0-9])?$/,
      "Skill name must contain only lowercase letters, numbers, dashes, or underscores."
    ),
  description: z
    .string()
    .trim()
    .min(3, "Skill description is too short.")
    .max(240, "Skill description is too long.")
    .refine((value) => !/[\r\n]/.test(value), "Skill description must be a single line.")
});

export const FlatDesignSystemPromptSchema = z.object({
  productName: z.string().min(2),
  brandSummary: z.string(),
  visualStyle: z.string().min(3),
  typographyScale: z.string().min(3),
  colorPalette: z.string().min(3),
  spacingScale: z.string().min(3),
  accessibilityRequirements: z.string().min(3),
  writingTone: z.string().min(3),
  doRules: nonEmptyList,
  dontRules: nonEmptyList
});

export const RegistrySlugSchema = z
  .string()
  .trim()
  .min(1, "Slug is required.")
  .max(100, "Slug is too long.")
  .regex(/^[a-z0-9](?:[a-z0-9-_]*[a-z0-9])?$/, "Slug must contain only lowercase letters, numbers, dashes, or underscores.");

export const PullFormatSchema = z.enum(["skill", "design"]);

export type DesignSystemSchemaType = z.infer<typeof DesignSystemSchema>;
