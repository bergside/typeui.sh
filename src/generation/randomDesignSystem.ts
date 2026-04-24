import { DesignSystemSchema } from "../domain/designSystemSchema";
import { DesignSystemInput } from "../types";

const PRODUCT_PREFIXES = [
  "Atlas",
  "Nova",
  "Lumen",
  "Vertex",
  "Nimbus",
  "Harbor",
  "Prism",
  "Cobalt",
  "Echo",
  "Forge",
  "Pulse",
  "Aster"
];

const PRODUCT_SUFFIXES = [
  "UI",
  "Cloud",
  "Flow",
  "Studio",
  "Works",
  "Console",
  "Labs",
  "Desk",
  "Board",
  "Portal",
  "Suite",
  "System"
];

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

const FONT_WEIGHT_OPTIONS = [
  "100",
  "200",
  "300",
  "400",
  "500",
  "600",
  "700",
  "800",
  "900"
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

const BRAND_AUDIENCES = [
  "product",
  "engineering",
  "design systems",
  "growth",
  "operations",
  "support"
];

const BRAND_DOMAINS = [
  "dashboard",
  "admin",
  "commerce",
  "analytics",
  "collaboration",
  "publishing",
  "developer tooling",
  "ops automation"
];

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function sampleOne<T>(values: T[]): T {
  return values[randomInt(0, values.length - 1)];
}

function sampleMany<T>(values: T[], minCount: number, maxCount: number): T[] {
  const count = randomInt(minCount, Math.min(maxCount, values.length));
  const shuffled = [...values];
  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = randomInt(0, i);
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, count);
}

function hslToHex(hue: number, saturation: number, lightness: number): string {
  const s = saturation / 100;
  const l = lightness / 100;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((hue / 60) % 2) - 1));
  const m = l - c / 2;

  let r = 0;
  let g = 0;
  let b = 0;

  if (hue < 60) {
    r = c;
    g = x;
  } else if (hue < 120) {
    r = x;
    g = c;
  } else if (hue < 180) {
    g = c;
    b = x;
  } else if (hue < 240) {
    g = x;
    b = c;
  } else if (hue < 300) {
    r = x;
    b = c;
  } else {
    r = c;
    b = x;
  }

  const toHex = (value: number): string =>
    Math.round((value + m) * 255)
      .toString(16)
      .padStart(2, "0")
      .toUpperCase();

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function generateColorTokens(): {
  primary: string;
  secondary: string;
  success: string;
  warning: string;
  danger: string;
  surface: string;
  text: string;
} {
  const baseHue = randomInt(0, 359);
  const primary = hslToHex(baseHue, randomInt(58, 84), randomInt(32, 46));
  const secondary = hslToHex((baseHue + randomInt(32, 92)) % 360, randomInt(60, 88), randomInt(38, 55));
  const success = hslToHex(randomInt(122, 145), randomInt(55, 75), randomInt(34, 46));
  const warning = hslToHex(randomInt(30, 44), randomInt(72, 90), randomInt(42, 56));
  const danger = hslToHex(randomInt(2, 15), randomInt(65, 88), randomInt(42, 55));
  const surface = hslToHex(baseHue, randomInt(10, 24), randomInt(95, 99));
  const text = hslToHex(baseHue, randomInt(18, 34), randomInt(11, 18));

  return { primary, secondary, success, warning, danger, surface, text };
}

function generateProductName(): string {
  return `${sampleOne(PRODUCT_PREFIXES)} ${sampleOne(PRODUCT_SUFFIXES)}`;
}

function generateBrandSummary(productName: string, visualStyle: string): string {
  const audience = sampleOne(BRAND_AUDIENCES);
  const domain = sampleOne(BRAND_DOMAINS);
  const direction = visualStyle.split(",")[0]?.trim() || visualStyle;
  return `${productName} delivers ${direction} interface guidance for ${domain} workflows, helping ${audience} teams ship consistently and accessibly.`;
}

function generateTypographyScale(): string {
  const scale = sampleOne(TYPOGRAPHY_SCALE_OPTIONS);
  const primary = sampleOne(GOOGLE_FONT_SANS_OPTIONS);
  const display = sampleOne(GOOGLE_FONT_DISPLAY_OPTIONS);
  const mono = sampleOne(GOOGLE_FONT_MONO_OPTIONS);
  const weights = sampleMany(FONT_WEIGHT_OPTIONS, 4, 7).sort((a, b) => Number(a) - Number(b));
  return `${scale} | Fonts: primary=${primary}, display=${display}, mono=${mono} | weights=${weights.join(", ")}`;
}

function generateColorPalette(): string {
  const required = ["primary", "neutral"];
  const optional = COLOR_PALETTE_OPTIONS.filter((value) => !required.includes(value));
  const selected = [...required, ...sampleMany(optional, 2, 5)];
  const tokens = generateColorTokens();
  return (
    `${selected.join(", ")} | Tokens: primary=${tokens.primary}, secondary=${tokens.secondary}, ` +
    `success=${tokens.success}, warning=${tokens.warning}, danger=${tokens.danger}, ` +
    `surface=${tokens.surface}, text=${tokens.text}`
  );
}

export function generateRandomDesignSystem(): DesignSystemInput {
  const visualStyle = sampleMany(VISUAL_STYLE_OPTIONS, 3, 5).join(", ");
  const design = {
    productName: generateProductName(),
    brandSummary: "",
    visualStyle,
    typographyScale: generateTypographyScale(),
    colorPalette: generateColorPalette(),
    spacingScale: sampleOne(SPACING_SCALE_OPTIONS),
    accessibilityRequirements: sampleMany(ACCESSIBILITY_OPTIONS, 3, 5).join(", "),
    writingTone: sampleMany(WRITING_TONE_OPTIONS, 2, 4).join(", "),
    doRules: sampleMany(DO_RULE_OPTIONS, 3, 5),
    dontRules: sampleMany(DONT_RULE_OPTIONS, 3, 5)
  };

  design.brandSummary = generateBrandSummary(design.productName, visualStyle);
  return DesignSystemSchema.parse(design);
}
