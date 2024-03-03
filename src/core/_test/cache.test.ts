import { describe, expect, test } from "vitest";
import { MemoryCache } from "../cache";

describe("memory cache", () => {
    test("should get and put", async () => {
        const cache = new MemoryCache();
        const key = "test";
        const value = "value";
        await cache.put(key, value);
        expect(await cache.get(key)).toBe(value);
        expect(await cache.get("no-key")).toBe(null);
    });

    test("should expire", async () => {
        const cache = new MemoryCache();
        const key = "test";
        const value = "value";
        await cache.put(key, value, { expire: 10 });
        expect(await cache.get(key)).toBe(value);
        await new Promise<void>((r) => setTimeout(r, 20));
        expect(await cache.get(key)).toBe(null);
    });

    test("recycle", async () => {
        const cache = new MemoryCache();
        const key = "test";
        const value = "value";
        await cache.put(key, value, { expire: 10 });
        expect(await cache.get(key)).toBe(value);
        await cache.recycle();
        expect(await cache.get(key)).toBe(value);
        await new Promise<void>((r) => setTimeout(r, 20));
        expect(await cache.get(key)).toBe(null);
    });

    test("clear", async () => {
        const cache = new MemoryCache();
        const key = "test";
        const value = "value";
        await cache.put(key, value);
        expect(await cache.get(key)).toBe(value);
        await cache.clear();
        expect(await cache.get(key)).toBe(null);
    });
});
