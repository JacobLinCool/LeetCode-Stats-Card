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
 * Generate a card.
 * @param config The configuration of the card
 * @returns The card (svg)
 */
export async function generate(config: Partial<Config>): Promise<string> {
    const generator = new Generator();
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
    ActivityExtension,
    AnimationExtension,
    Config,
    ContestExtension,
    FontExtension,
    Generator,
    HeatmapExtension,
    RemoteStyleExtension,
    ThemeExtension,
};
