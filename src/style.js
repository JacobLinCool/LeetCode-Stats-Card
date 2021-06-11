const default_style = [
    [
        "text",
        {
            "font-family": `"Segoe UI", "PingFang SC", Ubuntu, Sans-Serif`,
            "font-weight": "bold",
            fill: "rgb(38, 38, 38)",
        },
    ],
    [
        "text.sub",
        {
            fill: "rgb(128, 128, 128)",
        },
    ],
];

const dark_style = [
    [
        "path#L",
        {
            fill: "#ffffff",
        },
    ],
    [
        "rect#background",
        {
            fill: "#101010",
        },
    ],
    [
        "text",
        {
            fill: "rgb(218, 218, 218)",
        },
    ],
    [
        "text.sub",
        {
            fill: "rgb(160, 160, 160)",
        },
    ],
];

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
