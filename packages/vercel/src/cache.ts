function normalizeKey(request: RequestInfo | URL): string {
    if (typeof request === "string") return request;
    if (request instanceof Request) return request.url;
    return request.toString();
}

class MemoryCache implements Cache {
    private store = new Map<string, Response>();

    async match(request: RequestInfo | URL): Promise<Response | undefined> {
        const res = this.store.get(normalizeKey(request));
        return res?.clone();
    }

    async matchAll(request?: RequestInfo | URL): Promise<readonly Response[]> {
        const res = request ? await this.match(request) : undefined;
        return res ? [res] : [];
    }

    async add(request: RequestInfo | URL): Promise<void> {
        const res = await fetch(request);
        await this.put(request, res);
    }

    async addAll(requests: RequestInfo[]): Promise<void> {
        await Promise.all(requests.map((req) => this.add(req)));
    }

    async put(request: RequestInfo | URL, response: Response): Promise<void> {
        this.store.set(normalizeKey(request), response.clone());
    }

    async delete(request: RequestInfo | URL): Promise<boolean> {
        return this.store.delete(normalizeKey(request));
    }

    async keys(request?: RequestInfo | URL): Promise<readonly Request[]> {
        if (!request) {
            return Array.from(this.store.keys()).map((key) => new Request(key));
        }
        const key = normalizeKey(request);
        return this.store.has(key) ? [new Request(key)] : [];
    }
}

export async function createCache(): Promise<Cache> {
    if (typeof caches !== "undefined") {
        try {
            return await caches.open("leetcode");
        } catch (err) {
            console.error("Failed to open edge cache", err);
        }
    }

    return new MemoryCache();
}
