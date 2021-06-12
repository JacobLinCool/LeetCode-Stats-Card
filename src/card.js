/* This file is not using right now */
import { leetcode_icon } from "./img.js";
let grid = [
    {
        height: 50,
        margin: 15,
        items: [
            {
                type: "space",
                width: 10,
            },
            {
                type: "image",
                width: 25,
                image: leetcode_icon(25, 25),
            },
            {
                type: "space",
                width: 15,
            },
            {
                type: "text",
                width: 200,
                text: "JacobLinCool",
            },
            {
                type: "text",
                width: 250,
                text: "#100000+",
            },
        ],
    },
    {
        height: 150,
        margin: 15,
        items: [],
    },
];

function card(grid) {
    const [svg_start_tag, svg_close_tag] = svg_tag();
    return `${svg_start_tag}
<style>${style()}</style>
<rect id="main_rect" width="498" height="198" x="0.5" y="0.5" rx="4" />
<g id="top">
    <g id="icon">${leetcode_icon(30, 30)}</g>
</g>
<g id="body">
</g>
${svg_close_tag}`;
}

/* More Flexible? */