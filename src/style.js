import { default_style } from "./style/default.js";
import { dark_style } from "./style/dark.js";

function style(setting = "default") {
    let css = "";
    default_style.forEach((rule) => {
        css += `${rule[0]}{${Object.entries(rule[1])
            .map((pair) => pair[0] + ":" + pair[1] + ";")
            .join("")}} `;
    });

    if (setting == "dark") {
        dark_style.forEach((rule) => {
            css += `${rule[0]}{${Object.entries(rule[1])
                .map((pair) => pair[0] + ":" + pair[1] + ";")
                .join("")}} `;
        });
    }

    return css;
}

export { style };
