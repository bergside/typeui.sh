import { getDesignSystemUrl, getRegistryPullUrl, getRegistrySpecsUrl } from "../config";
import { RegistrySlugSchema } from "../domain/designSystemSchema";
import { PullFormat } from "../types";

interface PullFailure {
  ok: false;
  reason: string;
}

interface PullSuccess {
  ok: true;
  markdown: string;
}

export type RegistryPullResult = PullFailure | PullSuccess;

export interface RegistrySpec {
  name: string;
  slug: string;
  image: string;
  previewUrl: string;
  hasSkillMd: boolean;
  hasDesignMd: boolean;
}

interface RegistryIndexEntry {
  slug: string;
  name: string;
  skillPath: string;
  designPath: string;
}

type RegistryIndex = Record<string, RegistryIndexEntry>;

function mapRegistryHttpFailure(status: number, action: string): string {
  switch (status) {
    case 404:
      return "not_found";
    default:
      return `Unexpected registry response (${status}) while ${action}.`;
  }
}

function parseRegistryIndex(payload: unknown): RegistryIndex | null {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return null;
  }

  const entries = Object.entries(payload as Record<string, unknown>);
  const index: RegistryIndex = {};

  for (const [key, rawValue] of entries) {
    if (!rawValue || typeof rawValue !== "object" || Array.isArray(rawValue)) {
      return null;
    }
    const candidate = rawValue as Partial<RegistryIndexEntry>;
    if (typeof candidate.slug !== "string" || typeof candidate.name !== "string") {
      return null;
    }
    if (candidate.skillPath !== undefined && typeof candidate.skillPath !== "string") {
      return null;
    }
    if (candidate.designPath !== undefined && typeof candidate.designPath !== "string") {
      return null;
    }
    index[key] = {
      slug: candidate.slug,
      name: candidate.name,
      skillPath: candidate.skillPath ?? "",
      designPath: candidate.designPath ?? ""
    };
  }

  return index;
}

async function fetchRegistryIndex(): Promise<{ ok: true; index: RegistryIndex } | PullFailure> {
  const endpoint = getRegistrySpecsUrl();
  let response: Response;
  try {
    response = await fetch(endpoint, {
      method: "GET",
      headers: {
        accept: "application/json"
      }
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return {
      ok: false,
      reason: `Could not reach registry index at ${endpoint}: ${message}`
    };
  }

  if (!response.ok) {
    return {
      ok: false,
      reason: mapRegistryHttpFailure(response.status, "fetching registry index")
    };
  }

  let payload: unknown;
  try {
    payload = await response.json();
  } catch {
    return {
      ok: false,
      reason: "Registry returned invalid index JSON."
    };
  }

  const index = parseRegistryIndex(payload);
  if (!index) {
    return {
      ok: false,
      reason: "Registry index has an unexpected format."
    };
  }

  return {
    ok: true,
    index
  };
}

function inferDesignPathFromSkillPath(skillPath: string): string {
  const normalizedSkillPath = skillPath.trim();
  if (!normalizedSkillPath.endsWith("SKILL.md")) {
    return "";
  }
  return normalizedSkillPath.replace(/SKILL\.md$/, "DESIGN.md");
}

function resolveRegistryMarkdownPath(entry: RegistryIndexEntry, format: PullFormat): string {
  if (format === "skill") {
    return entry.skillPath.trim();
  }

  const explicitDesignPath = entry.designPath.trim();
  if (explicitDesignPath) {
    return explicitDesignPath;
  }

  return inferDesignPathFromSkillPath(entry.skillPath);
}

export async function pullRegistryMarkdown(slug: string, format: PullFormat): Promise<RegistryPullResult> {
  const parsedSlug = RegistrySlugSchema.safeParse(slug);
  if (!parsedSlug.success) {
    return {
      ok: false,
      reason: parsedSlug.error.issues[0]?.message ?? "Invalid slug."
    };
  }

  const indexResult = await fetchRegistryIndex();
  if (!indexResult.ok) {
    return indexResult;
  }

  const entry = indexResult.index[parsedSlug.data];
  if (!entry) {
    return {
      ok: false,
      reason: "not_found"
    };
  }

  const markdownPath = resolveRegistryMarkdownPath(entry, format);
  if (!markdownPath) {
    return {
      ok: false,
      reason: `No ${format} markdown path found for slug '${parsedSlug.data}'.`
    };
  }

  const endpoint = getRegistryPullUrl(markdownPath);
  let response: Response;
  try {
    response = await fetch(endpoint, {
      method: "GET",
      headers: {
        accept: "text/markdown, text/plain;q=0.9, */*;q=0.8"
      }
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return {
      ok: false,
      reason: `Could not reach registry markdown at ${endpoint}: ${message}`
    };
  }

  if (!response.ok) {
    return {
      ok: false,
      reason: mapRegistryHttpFailure(response.status, `fetching ${format} markdown for '${parsedSlug.data}'`)
    };
  }

  const contentType = response.headers.get("content-type") ?? "";
  const normalizedContentType = contentType.toLowerCase();
  if (!normalizedContentType.includes("text/markdown") && !normalizedContentType.includes("text/plain")) {
    return {
      ok: false,
      reason: `Unexpected content type from registry: ${contentType || "unknown"}.`
    };
  }

  const markdown = await response.text();
  if (!markdown.trim()) {
    return {
      ok: false,
      reason: "Registry returned empty markdown."
    };
  }

  return { ok: true, markdown };
}

export async function pullSkillMarkdown(slug: string): Promise<RegistryPullResult> {
  return pullRegistryMarkdown(slug, "skill");
}

export type RegistrySpecsResult = { ok: true; specs: RegistrySpec[] } | PullFailure;

export async function listRegistrySpecs(): Promise<RegistrySpecsResult> {
  const indexResult = await fetchRegistryIndex();
  if (!indexResult.ok) {
    return indexResult;
  }

  const specs = Object.values(indexResult.index).map((entry) => ({
    name: entry.name,
    slug: entry.slug,
    image: "",
    previewUrl: getDesignSystemUrl(entry.slug),
    hasSkillMd: Boolean(entry.skillPath.trim()),
    hasDesignMd: Boolean(resolveRegistryMarkdownPath(entry, "design"))
  }));

  return {
    ok: true,
    specs
  };
}
