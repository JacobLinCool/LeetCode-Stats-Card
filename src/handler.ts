import type { IConfig, IRawConfig } from "./types";
import { Router } from "itty-router";
import { make_config } from "./config";
import { get_leetcode_data } from "./leetcode";
import Card, { get_404_card } from "./card";
import html from "./demo_html";

const router = Router();

// favicon.ico
router.get("/favicon.ico", async () => {
    return Response.redirect("https://raw.githubusercontent.com/JacobLinCool/leetcode-stats-card/main/favicon/leetcode.ico", 301);
});

async function card_response(config: Required<IConfig>): Promise<Response> {
    try {
        console.log("Config", config);

        const GET_DATA_START = Date.now();
        const data = await get_leetcode_data(config.username);
        const GET_DATA_END = Date.now();
        console.log("GET_DATA_TIME", GET_DATA_END - GET_DATA_START);
        console.log("Data", data);

        const MAKE_CARD_START = Date.now();
        const card = new Card(config, data);
        const svg = card.export_svg();
        const MAKE_CARD_END = Date.now();
        console.log("MAKE_CARD_TIME", MAKE_CARD_END - MAKE_CARD_START);

        return new Response(svg, {
            headers: {
                "Content-Type": "image/svg+xml",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": "true",
            },
        });
    } catch (err) {
        return new Response(get_404_card(config).export_svg(), {
            headers: {
                "Content-Type": "image/svg+xml",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": "true",
            },
        });
    }
}

// handle path variable
router.get("/:username", async ({ params, query }: { params: { username: string }; query: IRawConfig }) => {
    const config = make_config(query);
    config.username = params.username;

    return await card_response(config);
});

// handle query string
router.get("*", async ({ query }: { query: IRawConfig }) => {
    if (!query.username) {
        return new Response(html, {
            headers: {
                "Content-Type": "text/html",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": "true",
            },
        });
    }

    const config = make_config(query) as Required<IConfig>;

    return await card_response(config);
});

// 405 for post requests
router.post("*", () => new Response("Method Not Allowed.", { status: 405 }));

// 404 for all other routes
router.all("*", () => new Response("Not Found.", { status: 404 }));

export async function handle_request(request: Request): Promise<Response> {
    console.log(`${request.method} ${request.url}`);

    return router.handle(request);
}
