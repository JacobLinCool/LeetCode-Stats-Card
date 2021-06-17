import { default_style } from "./style/default.js";
import { dark_style } from "./style/dark.js";
import { forest_style } from "./style/forest.js";
import { wtf_style } from "./style/wtf.js";
import { animations, animation_style, circle_animation } from "./style/animation.js";
import { extension_style } from "./style/extension.js";

let css = "";

function style({ data, parameters }) {
    if (parameters.font) {
        css += `g.leetcode_stats_card * {font-family: "${decodeURIComponent(parameters.font)}"; } `;
    }

    load_style(default_style);

    if (parameters.style == "auto") {
        css += `@media (prefers-color-scheme: dark) { `;
        load_style(dark_style);
        css += `} `;
        console.log("Load Style: ", "auto");
    }

    if (parameters.style == "dark") {
        load_style(dark_style);
        console.log("Load Style: ", "dark");
    }

    if (parameters.style == "forest") {
        load_style(forest_style);
        console.log("Load Style: ", "forest");
    }

    if (parameters.style == "wtf") {
        load_style(wtf_style);
        console.log("Load Style: ", "wtf");
    }

    if (parameters.animation != "false" && Number(parameters.animation) != 0) {
        load_style(animation_style);
        css += animations;

        if (data) {
            css += circle_animation(".circle", 80 * Math.PI * (data.problem.all.solved / data.problem.all.total), 0.7);
        }
        console.log("Load Style: ", "animation");
    }

    if (parameters.extension) {
        load_style(extension_style);
        console.log("Load Style: ", "extension");
    }

    return css;
}

function load_style(rules) {
    rules.forEach((rule) => {
        if (typeof rule === "string") {
            css += rule;
        } else {
            css += `${rule[0]}{${Object.entries(rule[1])
                .map((pair) => pair[0] + ":" + pair[1] + ";")
                .join("")}} `;
        }
    });
}

export { style };
