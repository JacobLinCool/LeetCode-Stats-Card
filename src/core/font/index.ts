import type { Tfont } from "../types/types";
import * as Baloo_2 from "worker-font/lib/fonts/Baloo_2";
import * as Milonga from "worker-font/lib/fonts/Milonga";
import * as Patrick_Hand from "worker-font/lib/fonts/Patrick_Hand";
import * as Ruthie from "worker-font/lib/fonts/Ruthie";
import * as Source_Code_Pro from "worker-font/lib/fonts/Source_Code_Pro";

const font: {
    [key in Tfont]: string;
} = {
    baloo: Baloo_2.base64,
    source_code_pro: Source_Code_Pro.base64,
    milonga: Milonga.base64,
    patrick_hand: Patrick_Hand.base64,
    ruthie: Ruthie.base64,
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
