export const MANAGED_BLOCK_START = "<!-- TYPEUI_SH_MANAGED_START -->";
export const MANAGED_BLOCK_END = "<!-- TYPEUI_SH_MANAGED_END -->";
export const API_DOMAIN = "https://www.typeui.sh";
export const GITHUB_REGISTRY_REPO_URL = "https://github.com/bergside/awesome-design-skills";
export const GITHUB_REGISTRY_RAW_BASE_URL =
  "https://raw.githubusercontent.com/bergside/awesome-design-skills/main";
export const REGISTRY_SPECS_URL = `${GITHUB_REGISTRY_RAW_BASE_URL}/skills/index.json`;

export function getRegistryPullUrl(markdownPath: string): string {
  const encodedPath = markdownPath
    .split("/")
    .filter(Boolean)
    .map((segment) => encodeURIComponent(segment))
    .join("/");
  return `${GITHUB_REGISTRY_RAW_BASE_URL}/${encodedPath}`;
}

export function getRegistrySpecsUrl(): string {
  return REGISTRY_SPECS_URL;
}

export function getDesignSystemUrl(slug: string): string {
  return `${GITHUB_REGISTRY_REPO_URL}/tree/main/skills/${encodeURIComponent(slug)}`;
}

export function getDesignSystemPreviewUrl(slug: string): string {
  return `${API_DOMAIN}/design-skills/${encodeURIComponent(slug)}`;
}
