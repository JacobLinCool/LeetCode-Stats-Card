import { MemoryCache } from "./cache";
import { Generator } from "./card";
import { ActivityExtension } from "./exts/activity";
import { AnimationExtension } from "./exts/animation";
import { ContestExtension } from "./exts/contest";
import { FontExtension } from "./exts/font";
import { HeatmapExtension } from "./exts/heatmap";
import { RemoteStyleExtension } from "./exts/remote-style";
import { ThemeExtension } from "./exts/theme";
import { Config } from "./types";

/**
 * The default in-memory cache instance.
 */
export const cache = new MemoryCache();

/**
 * Generate a card.
 * @param config The configuration of the card
 * @returns The card (svg)
 */
export async function generate(config: Partial<Config>): Promise<string> {
    const generator = new Generator(cache);
    return await generator.generate({
        username: "jacoblincool",
        site: "us",
        width: 500,
        height: 200,
        css: [],
        extensions: [FontExtension, AnimationExtension, ThemeExtension],
        animation: true,
        font: "baloo_2",
        theme: "light",
        ...config,
    });
}

export default generate;
export {
    MemoryCache,
    Generator,
    Config,
    ActivityExtension,
    AnimationExtension,
    ContestExtension,
    FontExtension,
    HeatmapExtension,
    RemoteStyleExtension,
    ThemeExtension,
};
