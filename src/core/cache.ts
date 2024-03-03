import { Cache } from "./types";

/**
 * The default in-memory cache.
 */
export class MemoryCache implements Cache {
    private cache = new Map<string, { value: unknown; expire: number }>();

    /**
     * Store an item
     * @param key The key of the item
     * @param value The value of the item
     * @param options The options of caching
     * @param options.expire The expire time of the item, in milliseconds
     */
    async put(key: string, value: unknown, { expire = 5 * 60 * 1000 } = {}): Promise<void> {
        this.cache.set(key, { value, expire: Date.now() + expire });
    }

    /**
     * Get an item
     * @param key The key of the item
     * @returns The item
     */
    async get(key: string): Promise<unknown | null> {
        const item = this.cache.get(key);

        if (item) {
            if (item.expire > Date.now()) {
                return item.value;
            } else {
                this.cache.delete(key);
            }
        }

        return null;
    }

    /**
     * Delete an item
     * @param key The key of the item
     */
    async delete(key: string): Promise<void> {
        this.cache.delete(key);
    }

    /**
     * Clear all items
     */
    async clear(): Promise<void> {
        this.cache.clear();
    }

    /**
     * Clear expired items
     */
    async recycle(): Promise<void> {
        for (const [key, item] of this.cache) {
            if (item.expire < Date.now()) {
                this.cache.delete(key);
            }
        }
    }
}
