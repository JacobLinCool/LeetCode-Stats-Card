const default_style = [
    [
        "#leetcode_icon",
        {
            background: "initial",
        },
    ],
    [
        "#main_rect",
        {
            width: "498px",
            height: "198px",
            stroke: "lightgray",
            "stroke-width": 1,
        },
    ],
    [
        "#head",
        {
            transform: "translate(25px, 35px)",
        },
    ],
    [
        "#body",
        {
            transform: "translate(25px, 75px)",
        },
    ],
];

function style(set = "default") {
    let css = "";
    default_style.forEach((rule) => {
        css += `${rule[0]}{${Object.entries(rule[1])
            .map((pair) => pair[0] + ":" + pair[1] + ";")
            .join("")}} `;
    });
    return css;
}

export { style };
