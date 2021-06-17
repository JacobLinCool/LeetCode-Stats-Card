import { default_style } from "./style/default.js";
import { dark_style } from "./style/dark.js";
import { animations, animation_style, circle_animation } from "./style/animation.js";
import { extension_style } from "./style/extension.js";

function style({ data, parameters }) {
    let css = "";

    if (parameters.font) {
        css += `@import url('https://fonts.googleapis.com/css2?family=${decodeURIComponent(parameters.font).replace(
            / /g,
            "+"
        )}&amp;display=swap'); g.leetcode_stats_card * {font-family: "${decodeURIComponent(parameters.font)}"; }`;
    }

    default_style.forEach((rule) => {
        css += `${rule[0]}{${Object.entries(rule[1])
            .map((pair) => pair[0] + ":" + pair[1] + ";")
            .join("")}} `;
    });

    if (parameters.style == "auto") {
        css += `@media (prefers-color-scheme: dark) { `;
        dark_style.forEach((rule) => {
            css += `${rule[0]}{${Object.entries(rule[1])
                .map((pair) => pair[0] + ":" + pair[1] + ";")
                .join("")}} `;
        });
        css += `} `;
    }

    if (parameters.style == "dark") {
        dark_style.forEach((rule) => {
            css += `${rule[0]}{${Object.entries(rule[1])
                .map((pair) => pair[0] + ":" + pair[1] + ";")
                .join("")}} `;
        });
    }

    if (parameters.animation != "false" && Number(parameters.animation) != 0) {
        animation_style.forEach((rule) => {
            css += `${rule[0]}{${Object.entries(rule[1])
                .map((pair) => pair[0] + ":" + pair[1] + ";")
                .join("")}} `;
        });
        css += animations;

        if (data) {
            css += circle_animation(".circle", 80 * Math.PI * (data.problem.all.solved / data.problem.all.total), 0.7);
        }
    }

    if (parameters.extension) {
        extension_style.forEach((rule) => {
            css += `${rule[0]}{${Object.entries(rule[1])
                .map((pair) => pair[0] + ":" + pair[1] + ";")
                .join("")}} `;
        });
    }

    return css;
}

export { style };
