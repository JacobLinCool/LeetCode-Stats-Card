const default_style = [
    [
        ".leetcode_stats_card *",
        {
            "font-family": `"Segoe UI", "PingFang SC", Ubuntu, Sans-Serif`,
            "transform-box": "fill-box",
        },
    ],
    [
        ".leetcode_stats_card text, .leetcode_stats_card .text",
        {
            "font-weight": "bold",
            fill: "rgb(38, 38, 38)",
            color: "rgb(38, 38, 38)",
        },
    ],
    [
        ".leetcode_stats_card text.sub, .leetcode_stats_card .sub_text",
        {
            fill: "rgb(128, 128, 128)",
            color: "rgb(128, 128, 128)",
        },
    ],
    [
        ".leetcode_stats_card rect#background, .leetcode_stats_card .theme_background",
        {
            fill: "#ffffff",
            background: "#ffffff",
        },
    ],
    [
        ".leetcode_stats_card #head",
        {
            transform: "translate(0px, 0px)",
        },
    ],
    [
        ".leetcode_stats_card #body",
        {
            transform: "translate(0px, 80px)",
        },
    ],
    [
        "#total_solved_circle .circle_bg, #solved_details .progress_bg",
        {
            stroke: "rgb(229, 229, 229)",
        },
    ],
    [
        "#total_solved_circle .circle",
        {
            "transform-box": "fill-box",
            transform: "rotate(-90deg)",
        },
    ],
    [
        "#solved_details .difficulty",
        {
            "font-size": "18px",
        },
    ],
    [
        "#solved_details .solved",
        {
            "font-size": "16px",
            "text-anchor": "end",
            transform: "translate(300px, 0px)",
        },
    ],
    [
        "#solved_details .progress_bg, #solved_details .progress",
        {
            "stroke-width": "4",
            "stroke-linecap": "round",
        },
    ],
];

export { default_style };
