import { Cache as Base } from "../core/types";

export class Cache implements Base {
    private cache;

    constructor() {
        this.cache = caches.open("leetcode");
    }

    async put(key: string, value: any, options?: { expire?: number }) {
        key = this.urlify(key);

        if (value instanceof Response) {
            value.headers.set("Cache-Control", `public, max-age=${options?.expire ?? 60}`);
            await (await this.cache).put(key, value);
        } else {
            const dummy: Response = new Response(JSON.stringify(value), {
                headers: {
                    "Content-Type": "application/x-custom-data",
                    "Cache-Control": `public, max-age=${options?.expire ?? 60}`,
                },
            });

            await (await this.cache).put(key, dummy);
        }
    }

    async get(key: string) {
        key = this.urlify(key);

        const response = await (await this.cache).match(key);

        if (response) {
            if (response?.headers.get("Content-Type") === "application/x-custom-data") {
                return await response.json();
            } else {
                return response;
            }
        }

        return null;
    }

    private urlify(key: string) {
        try {
            return new URL(key).href;
        } catch {
            return `https://my-dummy-site.com/${key}`;
        }
    }
}
