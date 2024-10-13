interface CacheOptions {
    expire?: number;
}

interface CacheEntry<T> {
    value: T;
    expireAt: number | null;
}

export class MemoryCache<T> {
    private cache: Map<string, CacheEntry<T>> = new Map();

    async get(key: string): Promise<T | null> {
        const entry = this.cache.get(key);
        if (!entry) return null;

        if (entry.expireAt !== null && Date.now() > entry.expireAt) {
            this.cache.delete(key);
            return null;
        }

        return entry.value;
    }

    async put(key: string, value: T, options: CacheOptions = {}): Promise<void> {
        const expireAt = options.expire ? Date.now() + options.expire : null;
        this.cache.set(key, { value, expireAt });
    }

    async recycle(): Promise<void> {
        const now = Date.now();
        for (const [key, entry] of this.cache.entries()) {
            if (entry.expireAt !== null && now > entry.expireAt) {
                this.cache.delete(key);
            }
        }
    }

    async clear(): Promise<void> {
        this.cache.clear();
    }
}
