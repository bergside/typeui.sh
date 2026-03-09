import { afterEach, describe, expect, it, vi } from "vitest";
import { listRegistrySpecs, pullSkillMarkdown } from "../src/registry/registryClient";

const originalFetch = global.fetch;

afterEach(() => {
  global.fetch = originalFetch;
  vi.restoreAllMocks();
});

describe("pullSkillMarkdown", () => {
  it("returns markdown on successful registry response", async () => {
    global.fetch = vi.fn(async () => {
      return new Response("## hello", {
        status: 200,
        headers: {
          "content-type": "text/markdown; charset=utf-8"
        }
      });
    }) as typeof fetch;

    const result = await pullSkillMarkdown("paper");
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.markdown).toContain("## hello");
    }
  });

  it("maps not found response", async () => {
    global.fetch = vi.fn(async () => {
      return new Response(JSON.stringify({ ok: false, reason: "not_found" }), {
        status: 404,
        headers: {
          "content-type": "application/json"
        }
      });
    }) as typeof fetch;

    const result = await pullSkillMarkdown("missing");
    expect(result).toEqual({
      ok: false,
      reason: "not_found"
    });
  });

  it("rejects invalid slug before network request", async () => {
    global.fetch = vi.fn() as typeof fetch;
    const result = await pullSkillMarkdown("Bad Slug");
    expect(result.ok).toBe(false);
    expect(global.fetch).not.toHaveBeenCalled();
  });
});

describe("listRegistrySpecs", () => {
  it("returns parsed specs for valid response", async () => {
    global.fetch = vi.fn(async () => {
      return new Response(
        JSON.stringify({
          ok: true,
          specs: [
            {
              name: "Paper",
              slug: "paper",
              image: "/registry-examples/paper.png",
              previewUrl: "#",
              hasSkillMd: true
            }
          ]
        }),
        {
          status: 200,
          headers: {
            "content-type": "application/json"
          }
        }
      );
    }) as typeof fetch;

    const result = await listRegistrySpecs();
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.specs[0]?.slug).toBe("paper");
      expect(result.specs[0]?.hasSkillMd).toBe(true);
    }
  });

  it("maps forbidden response", async () => {
    global.fetch = vi.fn(async () => {
      return new Response(JSON.stringify({ ok: false, reason: "license_invalid" }), {
        status: 403,
        headers: {
          "content-type": "application/json"
        }
      });
    }) as typeof fetch;

    const result = await listRegistrySpecs();
    expect(result).toEqual({
      ok: false,
      reason: "license_invalid"
    });
  });
});
