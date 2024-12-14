import { Hono } from "hono";
import { cors } from "hono/cors";
import { Config, Generator } from "leetcode-card";
import demo from "./demo";
import Header from "./headers";
import { sanitize } from "./sanitize";

const app = new Hono().use("*", cors());

app.get("/favicon.ico", (c) => {
    return c.redirect(
        "https://raw.githubusercontent.com/JacobLinCool/leetcode-stats-card/main/favicon/leetcode.ico",
        301,
    );
});

async function generate(
    config: Record<string, string>,
    header: Record<string, string>,
): Promise<Response> {
    let sanitized: Config;
    try {
        sanitized = sanitize(config);
    } catch (err) {
        return new Response((err as Error).message, {
            status: 400,
        });
    }
    console.log("sanitized config", JSON.stringify(sanitized, null, 4));

    const cache_time = parseInt(config.cache || "300") ?? 300;
    const cache = await caches.open("leetcode");

    const generator = new Generator(cache, header);
    generator.verbose = true;

    const headers = new Header().add("cors", "svg");
    headers.set("cache-control", `public, max-age=${cache_time}`);

    return new Response(await generator.generate(sanitized), { headers });
}

// handle path variable
app.get("/:username", async (c) => {
    const username = c.req.param("username");
    const query = Object.fromEntries(new URL(c.req.url).searchParams);
    query.username = username;
    return await generate(query, {
        "user-agent": c.req.header("user-agent") || "Unknown",
    });
});

// handle query string
app.get("*", async (c) => {
    const query = Object.fromEntries(new URL(c.req.url).searchParams);

    if (!query.username) {
        return new Response(demo, {
            headers: new Header().add("cors", "html"),
        });
    }

    return await generate(query, {
        "user-agent": c.req.header("user-agent") || "Unknown",
    });
});

// 404 for all other routes
app.all("*", () => new Response("Not Found.", { status: 404 }));

export async function handle(request: Request): Promise<Response> {
    console.log(`${request.method} ${request.url}`);
    return app.fetch(request);
}
