import {
    ActivityExtension,
    AnimationExtension,
    Config,
    ContestExtension,
    FontExtension,
    HeatmapExtension,
    RemoteStyleExtension,
    ThemeExtension,
} from "../core";
import { booleanize, normalize } from "./utils";

export function sanitize(config: Record<string, string>): Config {
    const sanitized: Config = {
        username: "jacoblincool",
        site: "us",
        width: 500,
        height: 200,
        css: [],
        extensions: [FontExtension, AnimationExtension, ThemeExtension],
        font: "baloo_2",
        animation: true,
        theme: { light: "light", dark: "dark" },
        cache: 60,
    };

    if (!config.username?.trim()) {
        throw new Error("Missing username");
    }
    sanitized.username = config.username.trim();

    // #region backward compatibility
    if (config.border_radius) {
        const size = parseFloat(config.border_radius) ?? 1;
        sanitized.css.push(`#background{rx:${size}px}`);
    }

    if (config.show_rank && booleanize(config.show_rank) === false) {
        sanitized.css.push(`#ranking{display:none}`);
    }
    // #endregion

    if (config.site?.trim().toLowerCase() === "cn") {
        sanitized.site = "cn";
    }

    if (config.width?.trim()) {
        sanitized.width = parseInt(config.width.trim()) ?? 500;
    }

    if (config.height?.trim()) {
        sanitized.height = parseInt(config.height.trim()) ?? 200;
    }

    if (config.theme?.trim()) {
        const themes = config.theme.trim().split(",");
        if (themes.length === 1 || themes[1] === "") {
            sanitized.theme = themes[0].trim();
        } else {
            sanitized.theme = { light: themes[0].trim(), dark: themes[1].trim() };
        }
    }

    if (config.font?.trim()) {
        sanitized.font = normalize(config.font.trim());
    }

    if (config.animation?.trim()) {
        sanitized.animation = booleanize(config.animation.trim());
    }

    if (config.ext === "activity" || config.extension === "activity") {
        sanitized.extensions.push(ActivityExtension);
    } else if (config.ext === "contest" || config.extension === "contest") {
        sanitized.extensions.push(ContestExtension);
    } else if (config.ext === "heatmap" || config.extension === "heatmap") {
        sanitized.extensions.push(HeatmapExtension);
    }

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

    if (config.radius) {
        const size = parseFloat(config.radius) ?? 4;
        sanitized.css.push(`#background{rx:${size}px}`);
    }

    if (config.hide) {
        const targets = config.hide.split(",").map((x) => x.trim());
        sanitized.css.push(...targets.map((x) => `#${x}{display:none}`));
    }

    if (config.sheets) {
        sanitized.sheets = config.sheets.split(",").map((x) => x.trim());
        sanitized.extensions.push(RemoteStyleExtension);
    }

    if (config.cache && parseInt(config.cache) >= 0 && parseInt(config.cache) <= 60 * 60 * 24 * 7) {
        sanitized.cache = parseInt(config.cache);
    }

    return sanitized;
}
