import { Router } from "itty-router";
import { Config, Generator } from "../core";
import { Cache } from "./cache";
import demo from "./demo";
import Header from "./headers";
import { sanitize } from "./sanitize";

const router = Router();

router.get("/favicon.ico", async () => {
    return Response.redirect(
        "https://raw.githubusercontent.com/JacobLinCool/leetcode-stats-card/main/favicon/leetcode.ico",
        301,
    );
});

async function generate(config: Record<string, string>, req: Request): Promise<Response> {
    let sanitized: Config;
    try {
        sanitized = sanitize(config);
    } catch (err) {
        return new Response((err as Error).message, {
            status: 400,
        });
    }
    console.log("sanitized config", JSON.stringify(sanitized, null, 4));

    const cache_time = parseInt(config.cache || "60") ?? 60;
    const cache_header =
        `max-age=${cache_time}` + (cache_time <= 0 ? ", no-store, no-cache" : ", public");

    const generator = new Generator(new Cache(cache_time), {
        "user-agent": req.headers.get("user-agent") || "Unknown",
    });
    generator.verbose = true;

    const headers = new Header().add("cors", "svg");
    headers.set("cache-control", cache_header);

    return new Response(await generator.generate(sanitized), { headers });
}

// handle path variable
router.get("/:username", async (request) => {
    request.query.username = request.params.username;
    return await generate(request.query as never, request);
});

// handle query string
router.get("*", async (req: { query: Record<string, string> }) => {
    if (!req.query.username) {
        return new Response(demo, {
            headers: new Header().add("cors", "html"),
        });
    }

    return await generate(req.query, req as unknown as Request);
});

router.delete("/:site/:username", async ({ params }) => {
    if (params?.site && params?.username) {
        const site = params.site.toLowerCase();
        const username = params.username.toLowerCase();
        const cache = new Cache(60);
        return new Response(
            JSON.stringify({ success: await cache.delete(`data-${username}-${site}`) }, null, 4),
            { headers: new Header().add("cors", "json") },
        );
    }
});

// 404 for all other routes
router.all("*", () => new Response("Not Found.", { status: 404 }));

export async function handle(request: Request): Promise<Response> {
    console.log(`${request.method} ${request.url}`);
    return router.handle(request);
}
