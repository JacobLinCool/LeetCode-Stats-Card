import { Cache as Base } from "../core/types";

export class Cache implements Base {
    private cache;

    constructor(private expiration = 60) {
        this.cache = caches.open("leetcode");
    }

    async put(key: string, value: unknown, options?: { expire?: number }) {
        key = this.urlify(key);

        if (value instanceof Response) {
            value.headers.set(
                "Cache-Control",
                `public, max-age=${options?.expire ?? this.expiration}`,
            );
            await (await this.cache).put(key, value);
        } else {
            const dummy: Response = new Response(JSON.stringify(value), {
                headers: {
                    "Content-Type": "application/x-custom-data",
                    "Cache-Control": `public, max-age=${options?.expire ?? this.expiration}`,
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

    async delete(key: string) {
        key = this.urlify(key);

        return (await this.cache).delete(key);
    }

    private urlify(key: string) {
        try {
            return new URL(key).href;
        } catch {
            return `https://my-dummy-site.com/${key}`;
        }
    }
}
