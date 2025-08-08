import { Theme } from "../theme/_theme";
import catppuccinMocha from "../theme/catppuccin-mocha";
import chartreuse from "../theme/chartreuse";
import dark from "../theme/dark";
import forest from "../theme/forest";
import light from "../theme/light";
import nord from "../theme/nord";
import radical from "../theme/radical";
import transparent from "../theme/transparent";
import unicorn from "../theme/unicorn";
import wtf from "../theme/wtf";
import { Config, Extension, Item } from "../types";

function themeFromColors(list: string[]): Theme {
    // Map: first 2 -> bg, next 2 -> text, next 4 -> accent colors
    const bg = list.slice(0, 2);
    const text = list.slice(2, 4);
    const color = list.slice(4, 8);
    return Theme({ palette: { bg, text, color } });
}

export const supported: Record<string, Theme> = {
    dark,
    forest,
    light,
    nord,
    unicorn,
    wtf,
    transparent,
    radical,
    chartreuse,
    catppuccinMocha,
};

export function ThemeExtension(): Extension {
    return async function Theme(generator, data, body, styles) {
        if (!generator.config?.theme) {
            return;
        }

        if (typeof generator.config.theme === "string" && supported[generator.config.theme]) {
            const theme = supported[generator.config.theme];
            styles.push(css(theme));
            if (theme.extends) {
                body["theme-ext"] = () => theme.extends as Item;
            }
        }

        if (
            typeof generator.config.theme?.light === "string" &&
            supported[generator.config.theme.light]
        ) {
            const theme = supported[generator.config.theme.light];
            styles.push(`@media (prefers-color-scheme: light) {${css(theme)}}`);
            if (theme.extends) {
                body["theme-ext-light"] = () => theme.extends as Item;
            }
        }

        if (
            typeof generator.config.theme?.dark === "string" &&
            supported[generator.config.theme.dark]
        ) {
            const theme = supported[generator.config.theme.dark];
            styles.push(`@media (prefers-color-scheme: dark) {${css(theme)}}`);
            if (theme.extends) {
                body["theme-ext-dark"] = () => theme.extends as Item;
            }
        }

        // If explicit colors are provided, apply them as an overriding theme
        const colors = (generator.config as Config | undefined)?.colors;
        if (Array.isArray(colors) && colors.length > 0) {
            const t = themeFromColors(colors);
            styles.push(css(t)); // push LAST = highest precedence
        }
    };
}

function css(theme: Theme): string {
    let css = ":root{";
    if (theme.palette.bg) {
        for (let i = 0; i < theme.palette.bg.length; i++) {
            css += `--bg-${i}:${theme.palette.bg[i]};`;
        }
    }
    if (theme.palette.text) {
        for (let i = 0; i < theme.palette.text.length; i++) {
            css += `--text-${i}:${theme.palette.text[i]};`;
        }
    }
    if (theme.palette.color) {
        for (let i = 0; i < theme.palette.color.length; i++) {
            css += `--color-${i}:${theme.palette.color[i]};`;
        }
    }
    css += "}";

    if (theme.palette.bg) {
        css += `#background{fill:var(--bg-0)}`;
        css += `#total-solved-bg{stroke:var(--bg-1)}`;
        css += `#easy-solved-bg{stroke:var(--bg-1)}`;
        css += `#medium-solved-bg{stroke:var(--bg-1)}`;
        css += `#hard-solved-bg{stroke:var(--bg-1)}`;
    }
    if (theme.palette.text) {
        css += `#username{fill:var(--text-0)}`;
        css += `#username-text{fill:var(--text-0)}`;
        css += `#total-solved-text{fill:var(--text-0)}`;
        css += `#easy-solved-type{fill:var(--text-0)}`;
        css += `#medium-solved-type{fill:var(--text-0)}`;
        css += `#hard-solved-type{fill:var(--text-0)}`;
        css += `#ranking{fill:var(--text-1)}`;
        css += `#easy-solved-count{fill:var(--text-1)}`;
        css += `#medium-solved-count{fill:var(--text-1)}`;
        css += `#hard-solved-count{fill:var(--text-1)}`;
    }
    if (theme.palette.color) {
        if (theme.palette.color.length > 0) {
            css += `#total-solved-ring{stroke:var(--color-0)}`;
        }
        if (theme.palette.color.length > 1) {
            css += `#easy-solved-progress{stroke:var(--color-1)}`;
        }
        if (theme.palette.color.length > 2) {
            css += `#medium-solved-progress{stroke:var(--color-2)}`;
        }
        if (theme.palette.color.length > 3) {
            css += `#hard-solved-progress{stroke:var(--color-3)}`;
        }
    }

    css += theme.css || "";

    return css;
}
