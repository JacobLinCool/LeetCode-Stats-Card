import { describe, expect, test } from "vitest";
import generate from "../";
import { ActivityExtension } from "../exts/activity";
import { AnimationExtension } from "../exts/animation";
import { FontExtension } from "../exts/font";
import { ThemeExtension } from "../exts/theme";

describe("generate", () => {
    test("should work (us)", async () => {
        const svg = await generate({
            username: "jacoblincool",
            site: "us",
            width: 500,
            height: 200,
            css: [],
            extensions: [],
        });
        expect(svg.length).toBeGreaterThan(1000);
    });

    test("should work (cn)", async () => {
        const svg = await generate({
            username: "leetcode",
            site: "cn",
            width: 500,
            height: 200,
            css: [],
            extensions: [],
        });
        expect(svg.length).toBeGreaterThan(1000);
    });

    test("should work (not found)", async () => {
        const svg = await generate({
            username: "random-" + Math.random().toString(36).substring(2, 7),
        });
        expect(svg.length).toBeGreaterThan(1000);
        expect(svg.includes("User Not Found")).toBeTruthy();
    });

    test("should work with extensions (us)", async () => {
        const svg = await generate({
            username: "jacoblincool",
            theme: "nord",
            font: "Source_Code_Pro",
            extensions: [FontExtension, AnimationExtension, ThemeExtension, ActivityExtension],
        });
        expect(svg.length).toBeGreaterThan(1000);
        expect(svg.includes("#2e3440")).toBeTruthy();
        expect(svg.includes("Source Code Pro")).toBeTruthy();
    });
});
