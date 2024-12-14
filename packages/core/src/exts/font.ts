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

const remote_base = "https://cdn.jsdelivr.net/gh/JacobLinCool/nano-font@json/";

export async function FontExtension(generator: Generator): Promise<Extension> {
    const config = generator.config;
    let names: string[] = [];
    if (Array.isArray(config.fonts)) {
        names = config.fonts.filter((font) => !supported[font.toLowerCase()]);
    } else if (typeof config.font === "string" && !supported[config.font.toLowerCase()]) {
        names = [config.font];
    }

    await Promise.all(
        names.map(async (name) => {
            try {
                const url = `${remote_base}${name.replace(/\s+/g, "_")}.json`;
                const cached = await generator.cache?.match(url);
                if (cached) {
                    supported[name.toLowerCase()] = await cached.json();
                    generator.log(`Loaded cached font ${name}`);
                } else {
                    const res = await fetch(url);
                    if (res.ok) {
                        const data = (await res.clone().json()) as { name: string; base64: string };
                        supported[name.toLowerCase()] = { name, base64: data.base64 };
                        generator.log(`loaded remote font "${name}"`);
                        generator.cache?.put(url, res);
                    } else {
                        return;
                    }
                }
            } catch {
                // do nothing
            }
        }),
    );

    return async function Font(generator, data, body, styles) {
        if (Array.isArray(config.fonts)) {
            const list = config.fonts.map((font: string) => {
                if (supported[font.toLowerCase()]) {
                    return supported[font.toLowerCase()];
                } else {
                    return { name: font };
                }
            });
            styles.push(css(list));
        } else if (typeof config.font === "string") {
            const font = supported[config.font.toLowerCase()];

            if (font) {
                styles.push(css([font]));
            } else {
                styles.push(css([{ name: config.font }]));
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
