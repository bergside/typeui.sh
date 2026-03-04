import path from "node:path";
import os from "node:os";

export const PRODUCT_ID = "typeui.sh";
export const MANAGED_BLOCK_START = "<!-- TYPEUI_SH_MANAGED_START -->";
export const MANAGED_BLOCK_END = "<!-- TYPEUI_SH_MANAGED_END -->";
export const POLAR_VERIFY_URL = "https://typeui.sh/api/license/verify";

export const LICENSE_CACHE_DIR = path.join(os.homedir(), ".typeui-sh");
export const LICENSE_CACHE_PATH = path.join(LICENSE_CACHE_DIR, "license.json");

export function getPolarVerifyUrl(): string {
  return POLAR_VERIFY_URL;
}
