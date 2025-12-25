import { beforeEach, describe, expect, it, vi } from "vitest";

let latestGenerator:
    | {
          config?: Record<string, unknown>;
          cache?: Cache;
          headers: Record<string, string>;
      }
    | undefined;

vi.mock("leetcode-card", async () => {
    const actual = await vi.importActual<typeof import("leetcode-card")>("leetcode-card");

    class MockGenerator {
        public verbose = false;
        public config: Record<string, unknown> | undefined;
        public cache?: Cache;
        public headers: Record<string, string>;

        constructor(cache?: Cache, headers?: Record<string, string>) {
            this.cache = cache;
            this.headers = headers ?? {};
            latestGenerator = { cache, headers: this.headers };
        }

        async generate(config: Record<string, unknown>): Promise<string> {
            this.config = config;
            latestGenerator = latestGenerator
                ? { ...latestGenerator, config }
                : { cache: this.cache, headers: this.headers, config };
            return "<svg></svg>";
        }
    }

    return { ...actual, Generator: MockGenerator };
});

describe("vercel handler", () => {
    beforeEach(() => {
        latestGenerator = undefined;
    });

    it("returns demo html when username is missing", async () => {
        const { handleRequest } = await import("./handler");
        const res = await handleRequest(new Request("https://example.com/api"));

        expect(res.status).toBe(200);
        expect(res.headers.get("content-type")).toContain("text/html");
        const body = await res.text();
        expect(body.toLowerCase()).toContain("<!doctype html>");
    });

    it("generates svg using path username and forwards headers", async () => {
        const { handleRequest } = await import("./handler");
        const res = await handleRequest(
            new Request("https://example.com/api/john?cache=123&width=350", {
                headers: { "user-agent": "vitest" },
            }),
        );

        expect(res.status).toBe(200);
        expect(res.headers.get("cache-control")).toBe("public, max-age=123");
        expect(latestGenerator?.config?.username).toBe("john");
        expect(latestGenerator?.config?.width).toBe(350);
        expect(latestGenerator?.headers["user-agent"]).toBe("vitest");
        expect(await res.text()).toBe("<svg></svg>");
    });
});
