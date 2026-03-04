import inquirer from "inquirer";
import {
  DesignSystemSchema,
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

function parseCsvList(value: string): string[] {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function unique(values: string[]): string[] {
  return [...new Set(values)];
}

function splitKeywords(value: string): string[] {
  return parseCsvList(value);
}

function splitGuidanceMeta(value: string): { keywords: string; meta: string } {
  const [keywords, ...rest] = value.split("|");
  return {
    keywords: keywords?.trim() ?? "",
    meta: rest.join("|").trim()
  };
}

function parseMetaField(meta: string, label: string): string | undefined {
  const pattern = new RegExp(`${label}=([^|]+)`, "i");
  const match = meta.match(pattern);
  return match?.[1]?.trim();
}

function matchPresetDefaults(current: string, presets: string[]): { selected: string[]; custom: string[] } {
  const currentValues = splitKeywords(current);
  const presetLookup = new Map(presets.map((preset) => [preset.toLowerCase(), preset]));

  const selected: string[] = [];
  const custom: string[] = [];

  for (const value of currentValues) {
    const matchedPreset = presetLookup.get(value.toLowerCase());
    if (matchedPreset) {
      selected.push(matchedPreset);
    } else {
      custom.push(value);
    }
  }

  return { selected: unique(selected), custom: unique(custom) };
}

async function promptPresetSelection(options: {
  message: string;
  presets: string[];
  defaultSelected?: string[];
  defaultCustom?: string[];
}): Promise<string[]> {
  const selectedAnswer = await inquirer.prompt<{ selected: string[] }>([
    {
      type: "checkbox",
      name: "selected",
      message: options.message,
      choices: options.presets,
      default: options.defaultSelected ?? [],
      validate: (value: unknown[]) => value.length > 0 || "Select at least one option."
    }
  ]);

  const customAnswer = await inquirer.prompt<{ custom: string }>([
    {
      type: "input",
      name: "custom",
      message: "Additional custom options (comma-separated, optional):",
      default: (options.defaultCustom ?? []).join(", ")
    }
  ]);

  return unique([...selectedAnswer.selected, ...parseCsvList(customAnswer.custom)]);
}

type PromptChoice = { name: string; value: string };

async function promptSingleCheckboxChoice(options: {
  message: string;
  choices: PromptChoice[];
  defaultChoice?: string;
}): Promise<string> {
  const answer = await inquirer.prompt<{ value: string[] }>([
    {
      type: "checkbox",
      name: "value",
      message: options.message,
      choices: options.choices,
      default: options.defaultChoice ? [options.defaultChoice] : [],
      validate: (value: unknown[]) => value.length === 1 || "Select exactly one font family."
    }
  ]);
  return answer.value[0];
}

const CUSTOM_FONT_OPTION = "Custom font";

function buildGoogleFontsSpecimenUrl(fontFamily: string): string {
  return `https://fonts.google.com/specimen/${encodeURIComponent(fontFamily).replace(/%20/g, "+")}`;
}

async function promptFontSelection(options: {
  message: string;
  choices: string[];
  defaultValue: string;
}): Promise<string> {
  const isKnown = options.choices.includes(options.defaultValue);
  const mergedChoices = isKnown
    ? options.choices
    : [options.defaultValue, ...options.choices.filter((choice) => choice !== options.defaultValue)];
  const choiceOptions: PromptChoice[] = mergedChoices.map((fontFamily) => ({
    name: `${fontFamily} (preview: ${buildGoogleFontsSpecimenUrl(fontFamily)})`,
    value: fontFamily
  }));

  const selected = await promptSingleCheckboxChoice({
    message: `${options.message} (choose one)`,
    choices: [...choiceOptions, { name: `${CUSTOM_FONT_OPTION} (enter manually)`, value: CUSTOM_FONT_OPTION }],
    defaultChoice: options.defaultValue
  });

  if (selected !== CUSTOM_FONT_OPTION) {
    return selected;
  }

  const custom = await inquirer.prompt<{ customFont: string }>([
    {
      type: "input",
      name: "customFont",
      message: "Custom font family name:",
      default: isKnown ? "" : options.defaultValue,
      validate: (value: string) => value.trim().length > 0 || "Please enter a font family."
    }
  ]);
  return custom.customFont.trim();
}

const VISUAL_STYLE_OPTIONS = [
  "modern",
  "minimal",
  "clean",
  "high-contrast",
  "bold",
  "playful",
  "editorial",
  "data-dense",
  "enterprise",
  "premium"
];

const TYPOGRAPHY_SCALE_OPTIONS = [
  "12/14/16/20/24/32",
  "12/14/16/18/24/30/36",
  "13/15/17/21/27/35",
  "14/16/18/24/32/40",
  "mobile-first compact scale",
  "desktop-first expressive scale"
];

const GOOGLE_FONT_SANS_OPTIONS = [
  "Inter",
  "Roboto",
  "Open Sans",
  "Lato",
  "Montserrat",
  "Poppins",
  "Nunito",
  "Work Sans",
  "Source Sans 3",
  "Plus Jakarta Sans",
  "Archivo",
  "Barlow",
  "Kanit",
  "M PLUS 1p",
  "Raleway",
  "PT Sans",
  "Ubuntu",
  "Cabin",
  "Hind",
  "Public Sans",
  "Mulish",
  "Quicksand",
  "Lexend",
  "Manrope",
  "Noto Sans",
  "DM Sans",
  "Rubik",
  "Urbanist"
];

const GOOGLE_FONT_DISPLAY_OPTIONS = [
  "Inter",
  "Montserrat",
  "Poppins",
  "Space Grotesk",
  "Plus Jakarta Sans",
  "Outfit",
  "Playfair Display",
  "Merriweather",
  "Bebas Neue",
  "Raleway",
  "Oswald",
  "Archivo",
  "Anton",
  "Bricolage Grotesque",
  "Sora",
  "Figtree",
  "Josefin Sans",
  "Lora",
  "Archivo Black",
  "Abril Fatface",
  "Cormorant Garamond",
  "DM Serif Display"
];

const GOOGLE_FONT_MONO_OPTIONS = [
  "JetBrains Mono",
  "Fira Code",
  "Source Code Pro",
  "IBM Plex Mono",
  "Inconsolata",
  "Space Mono",
  "Roboto Mono",
  "Ubuntu Mono",
  "Fira Mono",
  "Cousine",
  "PT Mono",
  "Anonymous Pro",
  "Overpass Mono"
];

const COLOR_PALETTE_OPTIONS = [
  "primary",
  "secondary",
  "neutral",
  "success",
  "warning",
  "danger",
  "info",
  "surface/subtle layers",
  "dark mode parity"
];

const SPACING_SCALE_OPTIONS = [
  "4/8/12/16/24/32",
  "2/4/8/12/16/24/32/48",
  "8pt baseline grid",
  "compact density mode",
  "comfortable density mode"
];

const COMPONENT_FAMILY_OPTIONS = [
  "buttons",
  "inputs",
  "forms",
  "selects/comboboxes",
  "checkboxes/radios/switches",
  "textareas",
  "date/time pickers",
  "file uploaders",
  "cards",
  "tables",
  "data lists",
  "data grids",
  "charts",
  "stats/metrics",
  "badges/chips",
  "avatars",
  "breadcrumbs",
  "pagination",
  "steppers",
  "modals",
  "drawers/sheets",
  "tooltips",
  "popovers/menus",
  "navigation",
  "sidebars",
  "top bars/headers",
  "command palette",
  "tabs",
  "accordions",
  "carousels",
  "progress indicators",
  "skeletons",
  "alerts/toasts",
  "notifications center",
  "search",
  "empty states",
  "onboarding",
  "authentication screens",
  "settings pages",
  "documentation layouts",
  "feedback components",
  "pricing blocks",
  "data visualization wrappers"
];

const ACCESSIBILITY_OPTIONS = [
  "WCAG 2.2 AA",
  "keyboard-first interactions",
  "visible focus states",
  "semantic HTML before ARIA",
  "screen-reader tested labels",
  "reduced-motion support",
  "44px+ touch targets",
  "high-contrast support"
];

const WRITING_TONE_OPTIONS = [
  "concise",
  "confident",
  "helpful",
  "clear",
  "friendly",
  "professional",
  "action-oriented",
  "low-jargon"
];

const DO_RULE_OPTIONS = [
  "prefer semantic tokens over raw values",
  "preserve visual hierarchy",
  "keep interaction states explicit",
  "design for empty/loading/error states",
  "ensure responsive behavior by default",
  "document accessibility rationale"
];

const DONT_RULE_OPTIONS = [
  "avoid low contrast text",
  "avoid inconsistent spacing rhythm",
  "avoid decorative motion without purpose",
  "avoid ambiguous labels",
  "avoid mixing multiple visual metaphors",
  "avoid inaccessible hit areas"
];

async function promptTypographyGuidance(current?: string): Promise<string> {
  const parsed = splitGuidanceMeta(current ?? "");
  const defaults = matchPresetDefaults(parsed.keywords, TYPOGRAPHY_SCALE_OPTIONS);

  const scaleValues = await promptPresetSelection({
    message: "Select typography scale strategy:",
    presets: TYPOGRAPHY_SCALE_OPTIONS,
    defaultSelected: defaults.selected.length > 0 ? defaults.selected : ["12/14/16/20/24/32"],
    defaultCustom: defaults.custom
  });

  const primaryFont = await promptFontSelection({
    message: "Primary UI font family (Google Fonts):",
    choices: GOOGLE_FONT_SANS_OPTIONS,
    defaultValue: parseMetaField(parsed.meta, "primary") ?? "Inter"
  });
  const secondaryFont = await promptFontSelection({
    message: "Display/heading font family (Google Fonts):",
    choices: GOOGLE_FONT_DISPLAY_OPTIONS,
    defaultValue: parseMetaField(parsed.meta, "display") ?? "Inter"
  });
  const monoFont = await promptFontSelection({
    message: "Monospace font family (Google Fonts):",
    choices: GOOGLE_FONT_MONO_OPTIONS,
    defaultValue: parseMetaField(parsed.meta, "mono") ?? "JetBrains Mono"
  });
  const typographyDetails = await inquirer.prompt<{ fontWeights: string }>([
    {
      type: "input",
      name: "fontWeights",
      message: "Core font weights (comma-separated):",
      default: parseMetaField(parsed.meta, "weights") ?? "400, 500, 600, 700"
    }
  ]);

  return (
    `${scaleValues.join(", ")} | Fonts: primary=${primaryFont}, ` +
    `display=${secondaryFont}, mono=${monoFont} | ` +
    `weights=${typographyDetails.fontWeights}`
  );
}

async function promptColorPaletteGuidance(current?: string): Promise<string> {
  const parsed = splitGuidanceMeta(current ?? "");
  const defaults = matchPresetDefaults(parsed.keywords, COLOR_PALETTE_OPTIONS);

  const paletteValues = await promptPresetSelection({
    message: "Select color palette guidance:",
    presets: COLOR_PALETTE_OPTIONS,
    defaultSelected:
      defaults.selected.length > 0
        ? defaults.selected
        : ["primary", "neutral", "success", "warning", "danger"],
    defaultCustom: defaults.custom
  });

  const tokenDetails = await inquirer.prompt<{
    primary: string;
    secondary: string;
    success: string;
    warning: string;
    danger: string;
    surface: string;
    text: string;
  }>([
    {
      type: "input",
      name: "primary",
      message: "Primary brand color token (name or hex):",
      default: parseMetaField(parsed.meta, "primary") ?? "#3B82F6",
      validate: (value: string) => /^#([0-9A-Fa-f]{6})$/.test(value.trim()) || "Enter a valid hex color, e.g. #3B82F6."
    },
    {
      type: "input",
      name: "secondary",
      message: "Secondary/accent token (hex):",
      default: parseMetaField(parsed.meta, "secondary") ?? "#8B5CF6",
      validate: (value: string) => /^#([0-9A-Fa-f]{6})$/.test(value.trim()) || "Enter a valid hex color, e.g. #8B5CF6."
    },
    {
      type: "input",
      name: "success",
      message: "Success token (hex):",
      default: parseMetaField(parsed.meta, "success") ?? "#16A34A",
      validate: (value: string) => /^#([0-9A-Fa-f]{6})$/.test(value.trim()) || "Enter a valid hex color, e.g. #16A34A."
    },
    {
      type: "input",
      name: "warning",
      message: "Warning token (hex):",
      default: parseMetaField(parsed.meta, "warning") ?? "#D97706",
      validate: (value: string) => /^#([0-9A-Fa-f]{6})$/.test(value.trim()) || "Enter a valid hex color, e.g. #D97706."
    },
    {
      type: "input",
      name: "danger",
      message: "Danger token (hex):",
      default: parseMetaField(parsed.meta, "danger") ?? "#DC2626",
      validate: (value: string) => /^#([0-9A-Fa-f]{6})$/.test(value.trim()) || "Enter a valid hex color, e.g. #DC2626."
    },
    {
      type: "input",
      name: "surface",
      message: "Surface/background token (hex):",
      default: parseMetaField(parsed.meta, "surface") ?? "#FFFFFF",
      validate: (value: string) => /^#([0-9A-Fa-f]{6})$/.test(value.trim()) || "Enter a valid hex color, e.g. #FFFFFF."
    },
    {
      type: "input",
      name: "text",
      message: "Primary text token (hex):",
      default: parseMetaField(parsed.meta, "text") ?? "#111827",
      validate: (value: string) => /^#([0-9A-Fa-f]{6})$/.test(value.trim()) || "Enter a valid hex color, e.g. #111827."
    }
  ]);

  return (
    `${paletteValues.join(", ")} | Tokens: primary=${tokenDetails.primary}, secondary=${tokenDetails.secondary}, ` +
    `success=${tokenDetails.success}, warning=${tokenDetails.warning}, danger=${tokenDetails.danger}, ` +
    `surface=${tokenDetails.surface}, text=${tokenDetails.text}`
  );
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
  const basics = await inquirer.prompt<{ productName: string; brandSummary: string }>([
    {
      type: "input",
      name: "productName",
      message: "Product name:",
      default: defaultProductName
    },
    {
      type: "input",
      name: "brandSummary",
      message: "Brand summary (1-2 sentences, what makes the product distinct):"
    }
  ]);

  const visualStyle = await promptPresetSelection({
    message: "Select visual style directions:",
    presets: VISUAL_STYLE_OPTIONS,
    defaultSelected: ["modern", "clean", "high-contrast"]
  });
  const typographyScale = await promptTypographyGuidance();
  const colorPalette = await promptColorPaletteGuidance();
  const spacingScale = await promptPresetSelection({
    message: "Select spacing scale guidance:",
    presets: SPACING_SCALE_OPTIONS,
    defaultSelected: ["4/8/12/16/24/32"]
  });
  const componentFamilies = await promptPresetSelection({
    message: "Select component families to prioritize:",
    presets: COMPONENT_FAMILY_OPTIONS,
    defaultSelected: COMPONENT_FAMILY_OPTIONS
  });
  const accessibilityRequirements = await promptPresetSelection({
    message: "Select accessibility requirements:",
    presets: ACCESSIBILITY_OPTIONS,
    defaultSelected: ["WCAG 2.2 AA", "keyboard-first interactions", "visible focus states"]
  });
  const writingTone = await promptPresetSelection({
    message: "Select writing tone attributes:",
    presets: WRITING_TONE_OPTIONS,
    defaultSelected: ["concise", "confident", "helpful"]
  });
  const doRules = await promptPresetSelection({
    message: "Select Design DO rules:",
    presets: DO_RULE_OPTIONS,
    defaultSelected: [
      "prefer semantic tokens over raw values",
      "preserve visual hierarchy",
      "keep interaction states explicit"
    ]
  });
  const dontRules = await promptPresetSelection({
    message: "Select Design DON'T rules:",
    presets: DONT_RULE_OPTIONS,
    defaultSelected: [
      "avoid low contrast text",
      "avoid inconsistent spacing rhythm",
      "avoid ambiguous labels"
    ]
  });

  return DesignSystemSchema.parse({
    productName: basics.productName,
    brandSummary: basics.brandSummary,
    visualStyle: visualStyle.join(", "),
    typographyScale,
    colorPalette,
    spacingScale: spacingScale.join(", "),
    componentFamilies,
    accessibilityRequirements: accessibilityRequirements.join(", "),
    writingTone: writingTone.join(", "),
    doRules,
    dontRules
  });
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
  const updates: Partial<DesignSystemInput> = {};

  for (const field of fields) {
    switch (field) {
      case "productName": {
        const answer = await inquirer.prompt<{ productName: string }>([
          {
            type: "input",
            name: "productName",
            message: "Product name:",
            default: current.productName
          }
        ]);
        updates.productName = answer.productName;
        break;
      }
      case "brandSummary": {
        const answer = await inquirer.prompt<{ brandSummary: string }>([
          {
            type: "input",
            name: "brandSummary",
            message: "Brand summary:",
            default: current.brandSummary
          }
        ]);
        updates.brandSummary = answer.brandSummary;
        break;
      }
      case "visualStyle": {
        const defaults = matchPresetDefaults(current.visualStyle, VISUAL_STYLE_OPTIONS);
        const values = await promptPresetSelection({
          message: "Select visual style directions:",
          presets: VISUAL_STYLE_OPTIONS,
          defaultSelected: defaults.selected,
          defaultCustom: defaults.custom
        });
        updates.visualStyle = values.join(", ");
        break;
      }
      case "typographyScale": {
        updates.typographyScale = await promptTypographyGuidance(current.typographyScale);
        break;
      }
      case "colorPalette": {
        updates.colorPalette = await promptColorPaletteGuidance(current.colorPalette);
        break;
      }
      case "spacingScale": {
        const defaults = matchPresetDefaults(current.spacingScale, SPACING_SCALE_OPTIONS);
        const values = await promptPresetSelection({
          message: "Select spacing scale guidance:",
          presets: SPACING_SCALE_OPTIONS,
          defaultSelected: defaults.selected,
          defaultCustom: defaults.custom
        });
        updates.spacingScale = values.join(", ");
        break;
      }
      case "componentFamilies": {
        const defaults = matchPresetDefaults(current.componentFamilies.join(", "), COMPONENT_FAMILY_OPTIONS);
        updates.componentFamilies = await promptPresetSelection({
          message: "Select component families to prioritize:",
          presets: COMPONENT_FAMILY_OPTIONS,
          defaultSelected: defaults.selected.length > 0 ? defaults.selected : COMPONENT_FAMILY_OPTIONS,
          defaultCustom: defaults.custom
        });
        break;
      }
      case "accessibilityRequirements": {
        const defaults = matchPresetDefaults(current.accessibilityRequirements, ACCESSIBILITY_OPTIONS);
        const values = await promptPresetSelection({
          message: "Select accessibility requirements:",
          presets: ACCESSIBILITY_OPTIONS,
          defaultSelected: defaults.selected,
          defaultCustom: defaults.custom
        });
        updates.accessibilityRequirements = values.join(", ");
        break;
      }
      case "writingTone": {
        const defaults = matchPresetDefaults(current.writingTone, WRITING_TONE_OPTIONS);
        const values = await promptPresetSelection({
          message: "Select writing tone attributes:",
          presets: WRITING_TONE_OPTIONS,
          defaultSelected: defaults.selected,
          defaultCustom: defaults.custom
        });
        updates.writingTone = values.join(", ");
        break;
      }
      case "doRules": {
        const defaults = matchPresetDefaults(current.doRules.join(", "), DO_RULE_OPTIONS);
        updates.doRules = await promptPresetSelection({
          message: "Select Design DO rules:",
          presets: DO_RULE_OPTIONS,
          defaultSelected: defaults.selected,
          defaultCustom: defaults.custom
        });
        break;
      }
      case "dontRules": {
        const defaults = matchPresetDefaults(current.dontRules.join(", "), DONT_RULE_OPTIONS);
        updates.dontRules = await promptPresetSelection({
          message: "Select Design DON'T rules:",
          presets: DONT_RULE_OPTIONS,
          defaultSelected: defaults.selected,
          defaultCustom: defaults.custom
        });
        break;
      }
    }
  }

  const merged = DesignSystemSchema.parse({ ...current, ...updates });
  const validatedUpdates: Partial<DesignSystemInput> = {};
  for (const field of fields) {
    (validatedUpdates as Record<string, unknown>)[field] = merged[field as keyof DesignSystemInput];
  }

  return validatedUpdates;
}

export function listSupportedProviders(): readonly string[] {
  return SUPPORTED_PROVIDERS;
}
