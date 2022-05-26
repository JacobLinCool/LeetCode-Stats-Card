import Baloo_2 from "nano-font/fonts/Baloo_2";
import Milonga from "nano-font/fonts/Milonga";
import Patrick_Hand from "nano-font/fonts/Patrick_Hand";
import Ruthie from "nano-font/fonts/Ruthie";
import Source_Code_Pro from "nano-font/fonts/Source_Code_Pro";
import { Generator } from "../card";
import { Extension } from "../types";

export const supported: Record<string, { name: string; base64: string }> = {
    baloo_2: Baloo_2,
    milonga: Milonga,
    patrick_hand: Patrick_Hand,
    ruthie: Ruthie,
    source_code_pro: Source_Code_Pro,
};

export function FontExtension(generator: Generator): Extension {
    return async (generator, data, body, styles) => {
        if (Array.isArray(generator.config.fonts)) {
            const list = generator.config.fonts.map((font: string) => {
                if (supported[font.toLowerCase()]) {
                    return supported[font.toLowerCase()];
                } else {
                    return { name: font };
                }
            });
            styles.push(css(list));
        } else if (typeof generator.config.font === "string") {
            const font = supported[generator.config.font.toLowerCase()];

            if (font) {
                styles.push(css([font]));
            } else {
                styles.push(css([{ name: generator.config.font }]));
            }
        }
    };
}

function css(fonts: { name: string; base64?: string | null }[]): string {
    let css = "";
    for (const font of fonts) {
        if (!font.base64) {
            continue;
        }
        css += `@font-face {font-family:"${font.name}";src:url("${font.base64}") format("woff2")}`;
    }
    css += `*{font-family:${fonts
        .map((font) =>
            ["monospace", "sans-serif", "sans"].includes(font.name) ? font.name : `"${font.name}"`,
        )
        .join(",")}}`;
    return css;
}
