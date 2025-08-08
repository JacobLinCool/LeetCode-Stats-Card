import {
    ActivityExtension,
    AnimationExtension,
    Config,
    ContestExtension,
    FontExtension,
    HeatmapExtension,
    RemoteStyleExtension,
    ThemeExtension,
} from "leetcode-card";
import { booleanize, normalize } from "./utils";

// Helper functions to reduce complexity
function handleExtension(config: Record<string, string>): Config["extensions"] {
    const extensions = [FontExtension, AnimationExtension, ThemeExtension];

    const extName = config.ext || config.extension;
    if (extName === "activity") {
        extensions.push(ActivityExtension);
    } else if (extName === "contest") {
        extensions.push(ContestExtension);
    } else if (extName === "heatmap") {
        extensions.push(HeatmapExtension);
    }

    if (config.sheets) {
        extensions.push(RemoteStyleExtension);
    }

    return extensions;
}

function handleCssRules(config: Record<string, string>): string[] {
    const css: string[] = [];

    // Handle border radius (backward compatibility)
    if (config.border_radius) {
        css.push(`#background{rx:${parseFloat(config.border_radius) ?? 1}px}`);
    }

    // Handle show_rank (backward compatibility)
    if (config.show_rank && booleanize(config.show_rank) === false) {
        css.push(`#ranking{display:none}`);
    }

    // Handle radius
    if (config.radius) {
        css.push(`#background{rx:${parseFloat(config.radius) ?? 4}px}`);
    }

    // Handle hide elements
    if (config.hide) {
        const targets = config.hide.split(",").map((x) => x.trim());
        css.push(...targets.map((x) => `#${x}{display:none}`));
    }

    return css;
}

export function sanitize(config: Record<string, string>): Config {
    if (!config.username?.trim()) {
        throw new Error("Missing username");
    }

    const sanitized: Config = {
        username: config.username.trim(),
        site: config.site?.trim().toLowerCase() === "cn" ? "cn" : "us",
        width: parseInt(config.width?.trim()) || 500,
        height: parseInt(config.height?.trim()) || 200,
        css: [],
        extensions: handleExtension(config),
        font: normalize(config.font?.trim() || "baloo_2"),
        animation: config.animation ? booleanize(config.animation.trim()) : true,
        theme: { light: "light", dark: "dark" },
        cache: 60,
    };

    // Handle theme
    if (config.theme?.trim()) {
        const themes = config.theme.trim().split(",");
        sanitized.theme =
            themes.length === 1 || themes[1] === ""
                ? themes[0].trim()
                : { light: themes[0].trim(), dark: themes[1].trim() };
    }

    // Handle custom colors (comma-separated hex values)
    if (config.colors) {
        const raw = config.colors
            .split(",")
            .map((x) => x.trim())
            .filter(Boolean);
        const hex = raw
            .map((c) => (c.startsWith("#") ? c : `#${c}`))
            .map((c) => c.toLowerCase())
            .filter((c) => /^#([0-9a-f]{3}|[0-9a-f]{6})$/.test(c));
        if (hex.length > 0) {
            sanitized.colors = hex;
        }
    }

    // Handle border
    if (config.border) {
        const size = parseFloat(config.border) ?? 1;
        sanitized.extensions.push(() => (generator, data, body, styles) => {
            styles.push(
                `#background{stroke-width:${size};width:${generator.config.width - size}px;height:${
                    generator.config.height - size
                }px;transform:translate(${size / 2}px,${size / 2}px)}`,
            );
        });
    }

    // Handle CSS rules
    sanitized.css = handleCssRules(config);

    // Handle remote style sheets
    if (config.sheets) {
        sanitized.sheets = config.sheets.split(",").map((x) => x.trim());
    }

    // Handle cache
    if (config.cache) {
        const cacheValue = parseInt(config.cache);
        if (cacheValue >= 0 && cacheValue <= 60 * 60 * 24 * 7) {
            sanitized.cache = cacheValue;
        }
    }

    return sanitized;
}
