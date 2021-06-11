import { html } from "./html.js";
import { parameters } from "./parameter.js";
import { leetcode_data } from "./leetcode.js";
import { cors_header } from "./header.js";
import { leetcode_card } from "./leetcode_card.js";

async function main() {
    addEventListener("fetch", (event) => {
        let handler = handle_request(event);
        event.respondWith(handler);
    });
}

async function handle_request(event) {
    const request = event.request;
    if (request.method !== "GET") {
        return new Response("Allowed Method: GET");
    }

    const final_parameters = parameters(new URL(request.url).searchParams);
    console.log("Final Parameters", final_parameters);

    if (final_parameters.username) {
        // contruct cache key
        const cache_key = new Request(request.url, request);
        const cache = caches.default;

        // check cache
        let response = await cache.match(cache_key);

        // if no cache
        if (!response) {
            const data = await leetcode_data(final_parameters.username);
            console.log("Leetcode Data", data);

            response = new Response(leetcode_card(data, final_parameters), {
                headers: {
                    "Content-Type": "image/svg+xml; charset=utf-8",
                    "Cache-Control": "s-maxage=60",
                },
            });
            cors_header(response.headers);

            // async update cache
            event.waitUntil(cache.put(cache_key, response.clone()));
        }
        return response;
    } else
        return new Response(html, {
            headers: {
                "Content-Type": "text/html; charset=utf-8",
            },
        });
}

export { main };
