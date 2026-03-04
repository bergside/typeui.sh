import { z } from "zod";
import { SUPPORTED_PROVIDERS } from "../types";

const csvToList = (value: string): string[] =>
  value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

const nonEmptyList = z
  .string()
  .transform(csvToList)
  .pipe(z.array(z.string()).min(1, "At least one item is required."));

export const ProviderSelectionSchema = z.array(z.enum(SUPPORTED_PROVIDERS)).min(1);

export const DesignSystemSchema = z.object({
  productName: z.string().min(2, "Product name is too short."),
  brandSummary: z.string(),
  visualStyle: z.string().min(3),
  typographyScale: z.string().min(3),
  colorPalette: z.string().min(3),
  spacingScale: z.string().min(3),
  componentFamilies: z.array(z.string().min(1)).min(1),
  accessibilityRequirements: z.string().min(3),
  writingTone: z.string().min(3),
  doRules: z.array(z.string().min(1)).min(1),
  dontRules: z.array(z.string().min(1)).min(1)
});

export const FlatDesignSystemPromptSchema = z.object({
  productName: z.string().min(2),
  brandSummary: z.string(),
  visualStyle: z.string().min(3),
  typographyScale: z.string().min(3),
  colorPalette: z.string().min(3),
  spacingScale: z.string().min(3),
  componentFamilies: nonEmptyList,
  accessibilityRequirements: z.string().min(3),
  writingTone: z.string().min(3),
  doRules: nonEmptyList,
  dontRules: nonEmptyList
});

export type DesignSystemSchemaType = z.infer<typeof DesignSystemSchema>;
