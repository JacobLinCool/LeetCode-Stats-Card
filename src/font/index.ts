import type { Tfont } from "../types";
import baloo from "./baloo";
import milonga from "./milonga";
import patrick_hand from "./patrick_hand";
import ruthie from "./ruthie";
import source_code_pro from "./source_code_pro";

const font: {
    [key in Tfont]: string;
} = {
    baloo,
    source_code_pro,
    milonga,
    patrick_hand,
    ruthie,
};

const font_list = Object.keys(font) as Tfont[];

function get_font(font_name: Tfont): string {
    let css = "";
    if (font_list.includes(font_name)) {
        css += `
@font-face { 
    font-family: "${font_name}";
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: url("${font[font_name]}") format("woff2");
}`;
    }
    css += `
.leetcode_stats_card * {
    font-family: "${font_name}", "Segoe UI", "PingFang SC", Ubuntu, sans-serif;
}`;
    return css;
}

export { get_font, font_list };
