import { svg_tag } from "./svg.js";
import { leetcode_icon } from "./img.js";
import { style } from "./style.js";

function leetcode_card(data) {
    const [svg_start_tag, svg_close_tag] = svg_tag();
    return `${svg_start_tag}
<style>${style()}</style>
<rect id="main_rect" width="498" height="198" x="0.5" y="0.5" rx="4" />
<g transform="translate(15, 10)">${leetcode_icon(30, 30)}</g>
<text transform="translate(60, 40)" fill="rgb(38, 38, 38)">JacobLinCool</text>
<g id="body">
</g>
${svg_close_tag}`;
}

export { leetcode_card };
