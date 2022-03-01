import get_data from "./data";

async function get_leetcode_data(username: string, site: "us" | "cn" = "us"): Promise<any> {
    const baseurl = `https://leetcode${site === "us" ? "" : "-cn"}.com/graphql/`;
    const cache_key = baseurl + username;
    const cache = caches ? await caches.open("leetcode") : null;

    // check cache
    let response = cache ? await cache.match(cache_key) : null;

    if (response) {
        console.log("Cache Hit", response.url, response.headers.get("date"));
    } else {
        console.log("Cache Miss");
        response = new Response(JSON.stringify(await get_data(username, site)), {
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "public, max-age=60",
                Date: new Date().toUTCString(),
            },
        });

        cache && cache.put(cache_key, response.clone());
    }

    return await response.json();
}

export { get_leetcode_data };
