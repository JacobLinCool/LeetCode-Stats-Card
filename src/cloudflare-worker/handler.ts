import type { IRawConfig } from "../core/types";
import { Router } from "itty-router";
import demo from "../core/demo";
import leetcode_card from "../core";

const router = Router();

// favicon.ico
router.get("/favicon.ico", async () => {
    return Response.redirect("https://raw.githubusercontent.com/JacobLinCool/leetcode-stats-card/main/favicon/leetcode.ico", 301);
});

async function card_response(config: IRawConfig): Promise<Response> {
    const svg = await leetcode_card(config);

    return new Response(svg, {
        headers: {
            "Content-Type": "image/svg+xml",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": "true",
            "Cache-Control": "max-age=0, no-cache, no-store, must-revalidate",
        },
    });
}

// handle path variable
router.get("/:username", async ({ params, query }: { params: { username: string }; query: IRawConfig }) => {
    query.username = params.username;

    return await card_response(query);
});

// handle query string
router.get("*", async ({ query }: { query: IRawConfig }) => {
    if (!query.username) {
        return new Response(demo, {
            headers: {
                "Content-Type": "text/html",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": "true",
            },
        });
    }

    return await card_response(query);
});

// 405 for post requests
router.post("*", () => new Response("Method Not Allowed.", { status: 405 }));

// 404 for all other routes
router.all("*", () => new Response("Not Found.", { status: 404 }));

export async function handle_request(request: Request): Promise<Response> {
    console.log(`${request.method} ${request.url}`);

    return router.handle(request);
}
