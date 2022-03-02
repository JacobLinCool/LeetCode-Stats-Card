import type { IThemeConfig, RequiredRecursive, Ttheme } from "../types/types";
import default_theme from "./default";
import dark from "./dark";
import auto from "./auto";
import forest from "./forest";
import wtf from "./wtf";
import nord from "./nord";
import unicorn from "./unicorn";

const theme: {
    [key in Ttheme]: IThemeConfig;
} = {
    default: default_theme,
    dark,
    auto,
    forest,
    wtf,
    nord,
    unicorn,
};

const theme_list = Object.keys(theme) as Ttheme[];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function theme_merge(original: any, patch: any) {
    for (const key of Object.keys(patch)) {
        if (patch[key] instanceof Object)
            Object.assign(patch[key], theme_merge(original[key], patch[key]));
    }
    return { ...original, ...patch };
}

function get_theme(theme_name: Ttheme): { css: string; svg: string } {
    const theme_config = theme_merge(
        theme.default,
        theme[theme_name],
    ) as RequiredRecursive<IThemeConfig>;
    return {
        css: `
.background {
    stroke: ${theme_config.colors.border};
    fill: ${theme_config.colors.background};
}
.username {
    fill: ${theme_config.colors.username};
}
.ranking {
    fill: ${theme_config.colors.ranking};
}
.total_solved {
    fill: ${theme_config.colors.total_solved_number};
}
.total_solved_ring .ring_bg {
    stroke: ${theme_config.colors.total_solved_ring_background};
}
.total_solved_ring .ring {
    stroke: ${theme_config.colors.total_solved_ring_foreground};
}
.easy_solved .difficulty {
    fill: ${theme_config.colors.easy.text};
}
.easy_solved .solved {
    fill: ${theme_config.colors.easy.number};
}
.easy_solved .progress_bg {
    stroke: ${theme_config.colors.easy.progress_background};
}
.easy_solved .progress {
    stroke: ${theme_config.colors.easy.progress_foreground};
}
.medium_solved .difficulty {
    fill: ${theme_config.colors.medium.text};
}
.medium_solved .solved {
    fill: ${theme_config.colors.medium.number};
}
.medium_solved .progress_bg {
    stroke: ${theme_config.colors.medium.progress_background};
}
.medium_solved .progress {
    stroke: ${theme_config.colors.medium.progress_foreground};
}
.hard_solved .difficulty {
    fill: ${theme_config.colors.hard.text};
}
.hard_solved .solved {
    fill: ${theme_config.colors.hard.number};
}
.hard_solved .progress_bg {
    stroke: ${theme_config.colors.hard.progress_background};
}
.hard_solved .progress {
    stroke: ${theme_config.colors.hard.progress_foreground};
}

.title {
    fill: ${theme_config.colors.username};
    color: ${theme_config.colors.username};
}
.subtitle {
    fill: ${theme_config.colors.ranking};
    color: ${theme_config.colors.ranking};
}
${theme_config.css}
    `,
        svg: theme_config.svg,
    };
}

export { get_theme, theme_list };
