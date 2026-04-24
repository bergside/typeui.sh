import { afterEach, describe, expect, it, vi } from "vitest";
import { getRegistrySpecsUrl } from "../src/config";
import { listRegistrySpecs, pullRegistryMarkdown, pullSkillMarkdown } from "../src/registry/registryClient";

const originalFetch = global.fetch;

afterEach(() => {
  global.fetch = originalFetch;
  vi.restoreAllMocks();
});

describe("pullRegistryMarkdown", () => {
  it("returns markdown on successful skill pull response", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(
        new Response(
          JSON.stringify({
            paper: {
              slug: "paper",
              name: "Paper",
              skillPath: "skills/paper/SKILL.md"
            }
          }),
          {
            status: 200,
            headers: {
              "content-type": "application/json"
            }
          }
        )
      )
      .mockResolvedValueOnce(
        new Response("## hello", {
          status: 200,
          headers: {
            "content-type": "text/markdown; charset=utf-8"
          }
        })
      );
    global.fetch = fetchMock as typeof fetch;

    const result = await pullRegistryMarkdown("paper", "skill");
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.markdown).toContain("## hello");
    }
    expect(fetchMock).toHaveBeenNthCalledWith(
      1,
      getRegistrySpecsUrl(),
      expect.objectContaining({
        method: "GET"
      })
    );
    expect(fetchMock).toHaveBeenNthCalledWith(
      2,
      "https://raw.githubusercontent.com/bergside/awesome-design-skills/main/skills/paper/SKILL.md",
      expect.objectContaining({
        method: "GET"
      })
    );
  });

  it("pulls design markdown from explicit designPath when available", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(
        new Response(
          JSON.stringify({
            paper: {
              slug: "paper",
              name: "Paper",
              skillPath: "skills/paper/SKILL.md",
              designPath: "skills/paper/DESIGN.md"
            }
          }),
          {
            status: 200,
            headers: {
              "content-type": "application/json"
            }
          }
        )
      )
      .mockResolvedValueOnce(
        new Response("## design", {
          status: 200,
          headers: {
            "content-type": "text/plain; charset=utf-8"
          }
        })
      );
    global.fetch = fetchMock as typeof fetch;

    const result = await pullRegistryMarkdown("paper", "design");
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.markdown).toContain("## design");
    }
    expect(fetchMock).toHaveBeenNthCalledWith(
      2,
      "https://raw.githubusercontent.com/bergside/awesome-design-skills/main/skills/paper/DESIGN.md",
      expect.objectContaining({
        method: "GET"
      })
    );
  });

  it("infers design path from skillPath when designPath is missing", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(
        new Response(
          JSON.stringify({
            paper: {
              slug: "paper",
              name: "Paper",
              skillPath: "skills/paper/SKILL.md"
            }
          }),
          {
            status: 200,
            headers: {
              "content-type": "application/json"
            }
          }
        )
      )
      .mockResolvedValueOnce(
        new Response("## inferred", {
          status: 200,
          headers: {
            "content-type": "text/markdown; charset=utf-8"
          }
        })
      );
    global.fetch = fetchMock as typeof fetch;

    const result = await pullRegistryMarkdown("paper", "design");
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.markdown).toContain("## inferred");
    }
    expect(fetchMock).toHaveBeenNthCalledWith(
      2,
      "https://raw.githubusercontent.com/bergside/awesome-design-skills/main/skills/paper/DESIGN.md",
      expect.objectContaining({
        method: "GET"
      })
    );
  });

  it("returns not_found when slug does not exist in index", async () => {
    global.fetch = vi.fn(async () => {
      return new Response(
        JSON.stringify({
          paper: {
            slug: "paper",
            name: "Paper",
            skillPath: "skills/paper/SKILL.md"
          }
        }),
        {
          status: 200,
          headers: {
            "content-type": "application/json"
          }
        }
      );
    }) as typeof fetch;

    const result = await pullRegistryMarkdown("missing", "skill");
    expect(result).toEqual({
      ok: false,
      reason: "not_found"
    });
  });

  it("maps not found when markdown file URL is missing", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(
        new Response(
          JSON.stringify({
            paper: {
              slug: "paper",
              name: "Paper",
              skillPath: "skills/paper/SKILL.md"
            }
          }),
          {
            status: 200,
            headers: {
              "content-type": "application/json"
            }
          }
        )
      )
      .mockResolvedValueOnce(new Response("Not found", {
        status: 404,
        headers: {
          "content-type": "text/plain"
        }
      }));
    global.fetch = fetchMock as typeof fetch;

    const result = await pullRegistryMarkdown("paper", "design");
    expect(result).toEqual({
      ok: false,
      reason: "not_found"
    });
  });

  it("returns an error when selected format has no markdown path", async () => {
    global.fetch = vi.fn(async () => {
      return new Response(
        JSON.stringify({
          paper: {
            slug: "paper",
            name: "Paper",
            skillPath: ""
          }
        }),
        {
          status: 200,
          headers: {
            "content-type": "application/json"
          }
        }
      );
    }) as typeof fetch;

    const result = await pullRegistryMarkdown("paper", "design");
    expect(result).toEqual({
      ok: false,
      reason: "No design markdown path found for slug 'paper'."
    });
  });

  it("rejects invalid slug before network request", async () => {
    global.fetch = vi.fn() as typeof fetch;
    const result = await pullRegistryMarkdown("Bad Slug", "skill");
    expect(result.ok).toBe(false);
    expect(global.fetch).not.toHaveBeenCalled();
  });
});

describe("pullSkillMarkdown", () => {
  it("keeps backward compatibility for skill pulls", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(
        new Response(
          JSON.stringify({
            paper: {
              slug: "paper",
              name: "Paper",
              skillPath: "skills/paper/SKILL.md"
            }
          }),
          {
            status: 200,
            headers: {
              "content-type": "application/json"
            }
          }
        )
      )
      .mockResolvedValueOnce(
        new Response("## hello", {
          status: 200,
          headers: {
            "content-type": "text/markdown; charset=utf-8"
          }
        })
      );
    global.fetch = fetchMock as typeof fetch;

    const result = await pullSkillMarkdown("paper");
    expect(result.ok).toBe(true);
  });
});

describe("listRegistrySpecs", () => {
  it("returns parsed specs and both skill/design availability flags", async () => {
    global.fetch = vi.fn(async () => {
      return new Response(
        JSON.stringify({
          paper: {
            slug: "paper",
            name: "Paper",
            skillPath: "skills/paper/SKILL.md"
          },
          simple: {
            slug: "simple",
            name: "Simple",
            skillPath: "skills/simple/SKILL.md",
            designPath: "skills/simple/DESIGN.md"
          },
          noSkill: {
            slug: "no-skill",
            name: "No Skill",
            skillPath: ""
          }
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
      expect(result.specs).toHaveLength(3);
      expect(result.specs[0]).toEqual(
        expect.objectContaining({
          slug: "paper",
          hasSkillMd: true,
          hasDesignMd: true,
          previewUrl: "https://github.com/bergside/awesome-design-skills/tree/main/skills/paper"
        })
      );
      expect(result.specs[2]).toEqual(
        expect.objectContaining({
          slug: "no-skill",
          hasSkillMd: false,
          hasDesignMd: false
        })
      );
    }
  });

  it("returns invalid format for malformed index payload", async () => {
    global.fetch = vi.fn(async () => {
      return new Response(
        JSON.stringify({
          paper: {
            slug: "paper",
            name: "Paper",
            designPath: 123
          }
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
    expect(result).toEqual({
      ok: false,
      reason: "Registry index has an unexpected format."
    });
  });

  it("maps registry index fetch failures", async () => {
    global.fetch = vi.fn(async () => {
      return new Response("Unavailable", {
        status: 503,
        headers: {
          "content-type": "text/plain"
        }
      });
    }) as typeof fetch;

    const result = await listRegistrySpecs();
    expect(result).toEqual({
      ok: false,
      reason: "Unexpected registry response (503) while fetching registry index."
    });
  });

  it("uses GET against the index endpoint", async () => {
    const fetchMock = vi.fn(async () => {
      return new Response(
        JSON.stringify({
          paper: {
            slug: "paper",
            name: "Paper",
            skillPath: "skills/paper/SKILL.md"
          }
        }),
        {
          status: 200,
          headers: {
            "content-type": "application/json"
          }
        }
      );
    });
    global.fetch = fetchMock as typeof fetch;

    await listRegistrySpecs();
    expect(fetchMock).toHaveBeenCalledWith(
      getRegistrySpecsUrl(),
      expect.objectContaining({
        method: "GET"
      })
    );
  });
});
