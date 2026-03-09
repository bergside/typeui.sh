import { RegistrySlugSchema } from "../domain/designSystemSchema";
import { getRegistryPullUrl, getRegistrySpecsUrl } from "../config";

interface PullFailure {
  ok: false;
  reason: string;
}

interface PullSuccess {
  ok: true;
  markdown: string;
}

export type RegistryPullResult = PullFailure | PullSuccess;

interface PullFailureBody {
  ok?: boolean;
  reason?: string;
  error?: string;
}

export interface RegistrySpec {
  name: string;
  slug: string;
  image: string;
  previewUrl: string;
  hasSkillMd: boolean;
}

interface SpecsSuccessBody {
  ok?: boolean;
  specs?: RegistrySpec[];
}

function mapHttpFailure(status: number, reason?: string): string {
  const normalizedReason = reason?.trim();
  switch (status) {
    case 400:
      return normalizedReason || "Invalid request. Check the slug and license key format.";
    case 403:
      return normalizedReason || "license_invalid";
    case 404:
      return normalizedReason || "not_found";
    case 429:
      return normalizedReason || "Rate limited. Please try again in a moment.";
    case 500:
      return normalizedReason || "Server is missing required configuration.";
    case 502:
      return normalizedReason || "Registry dependency is temporarily unavailable.";
    default:
      return normalizedReason || `Unexpected registry response (${status}).`;
  }
}

async function tryReadFailureJson(response: Response): Promise<PullFailureBody | null> {
  try {
    return (await response.json()) as PullFailureBody;
  } catch {
    return null;
  }
}

export async function pullSkillMarkdown(slug: string): Promise<RegistryPullResult> {
  const parsedSlug = RegistrySlugSchema.safeParse(slug);
  if (!parsedSlug.success) {
    return {
      ok: false,
      reason: parsedSlug.error.issues[0]?.message ?? "Invalid slug."
    };
  }

  const endpoint = getRegistryPullUrl(parsedSlug.data);
  let response: Response;
  try {
    response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({})
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return {
      ok: false,
      reason: `Could not reach registry service at ${endpoint}: ${message}`
    };
  }

  if (!response.ok) {
    const body = await tryReadFailureJson(response);
    return {
      ok: false,
      reason: mapHttpFailure(response.status, body?.reason || body?.error)
    };
  }

  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().includes("text/markdown")) {
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

function mapSpecsFailure(status: number, reason?: string): string {
  const normalizedReason = reason?.trim();
  switch (status) {
    case 400:
      return normalizedReason || "Invalid request. Check the license key format.";
    case 403:
      return normalizedReason || "license_invalid";
    case 429:
      return normalizedReason || "Rate limited. Please try again in a moment.";
    case 500:
      return normalizedReason || "Server is missing required configuration.";
    case 502:
      return normalizedReason || "Registry dependency is temporarily unavailable.";
    default:
      return normalizedReason || `Unexpected registry response (${status}).`;
  }
}

export type RegistrySpecsResult = { ok: true; specs: RegistrySpec[] } | PullFailure;

export async function listRegistrySpecs(): Promise<RegistrySpecsResult> {
  const endpoint = getRegistrySpecsUrl();
  let response: Response;
  try {
    response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({})
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return {
      ok: false,
      reason: `Could not reach registry service at ${endpoint}: ${message}`
    };
  }

  if (!response.ok) {
    const body = await tryReadFailureJson(response);
    return {
      ok: false,
      reason: mapSpecsFailure(response.status, body?.reason || body?.error)
    };
  }

  let payload: SpecsSuccessBody;
  try {
    payload = (await response.json()) as SpecsSuccessBody;
  } catch {
    return {
      ok: false,
      reason: "Registry returned invalid JSON."
    };
  }

  if (!payload.ok || !Array.isArray(payload.specs)) {
    return {
      ok: false,
      reason: "Registry response did not include specs."
    };
  }

  return {
    ok: true,
    specs: payload.specs
  };
}
