import { Item, svg_attrs } from "./item";
import { Config, FetchedData } from "./types";

export function Root(config: Config, data: FetchedData) {
    return new Item("svg", {
        id: "root",
        attr: {
            width: config.width,
            height: config.height,
            viewBox: `0 0 ${config.width} ${config.height}`,
            ...svg_attrs,
        },
        style: { fill: "none" },
        children: [
            new Item("title", {
                content: `${data?.profile.username || config.username} | LeetCode Stats Card`,
            }),
            new Item("style", {
                id: "default-colors",
                content: `svg{opacity:0}:root{--bg-0:#fff;--bg-1:#e5e5e5;--bg-2:#d3d3d3;--bg-3:#d3d3d3;--text-0:#000;--text-1:#808080;--text-2:#808080;--text-3:#808080;--color-0:#ffa116;--color-1:#5cb85c;--color-2:#f0ad4e;--color-3:#d9534f}`,
            }),
            new Item("rect", {
                id: "background",
                style: {
                    transform: "translate(0.5px, 0.5px)",
                    stroke: "var(--bg-2)",
                    fill: "var(--bg-0)",
                    "stroke-width": 1,
                    width: config.width - 1 + "px",
                    height: config.height - 1 + "px",
                    rx: "4px",
                },
            }),
        ],
    });
}

export function Icon() {
    const item = new Item("g", {
        id: "icon",
        style: {
            transform: "translate(20px, 15px) scale(0.27)",
        },
    });

    item.children = [
        new Item("g", {
            style: {
                stroke: "none",
                fill: "var(--text-0)",
                "fill-rule": "evenodd",
            },
            children: [
                new Item("path", {
                    id: "C",
                    attr: {
                        d: "M67.506,83.066 C70.000,80.576 74.037,80.582 76.522,83.080 C79.008,85.578 79.002,89.622 76.508,92.112 L65.435,103.169 C55.219,113.370 38.560,113.518 28.172,103.513 C28.112,103.455 23.486,98.920 8.227,83.957 C-1.924,74.002 -2.936,58.074 6.616,47.846 L24.428,28.774 C33.910,18.621 51.387,17.512 62.227,26.278 L78.405,39.362 C81.144,41.577 81.572,45.598 79.361,48.342 C77.149,51.087 73.135,51.515 70.395,49.300 L54.218,36.217 C48.549,31.632 38.631,32.262 33.739,37.500 L15.927,56.572 C11.277,61.552 11.786,69.574 17.146,74.829 C28.351,85.816 36.987,94.284 36.997,94.294 C42.398,99.495 51.130,99.418 56.433,94.123 L67.506,83.066 Z",
                    },
                    style: {
                        fill: "#FFA116",
                        "fill-rule": "nonzero",
                    },
                }),
                new Item("path", {
                    id: "L",
                    attr: {
                        d: "M49.412,2.023 C51.817,-0.552 55.852,-0.686 58.423,1.722 C60.994,4.132 61.128,8.173 58.723,10.749 L15.928,56.572 C11.277,61.551 11.786,69.573 17.145,74.829 L36.909,94.209 C39.425,96.676 39.468,100.719 37.005,103.240 C34.542,105.760 30.506,105.804 27.990,103.336 L8.226,83.956 C-1.924,74.002 -2.936,58.074 6.617,47.846 L49.412,2.023 Z",
                    },
                    style: {
                        fill: "#000000",
                    },
                }),
                new Item("path", {
                    id: "dash",
                    attr: {
                        d: "M40.606,72.001 C37.086,72.001 34.231,69.142 34.231,65.614 C34.231,62.087 37.086,59.228 40.606,59.228 L87.624,59.228 C91.145,59.228 94,62.087 94,65.614 C94,69.142 91.145,72.001 87.624,72.001 L40.606,72.001 Z",
                    },
                    style: {
                        fill: "#B3B3B3",
                    },
                }),
            ],
        }),
    ];

    return item;
}

export function Username(username: string, site: string) {
    const item = new Item("a", {
        id: "username",
        attr: {
            href:
                username === "User Not Found"
                    ? "https://github.com/JacobLinCool/LeetCode-Stats-Card"
                    : `https://leetcode.${site === "us" ? "com" : "cn"}/${username}/`,
            target: "_blank",
        },
        style: {
            transform: "translate(65px, 40px)",
        },
        children: [
            new Item("text", {
                id: "username-text",
                content: username,
                style: {
                    fill: "var(--text-0)",
                    "font-size": "24px",
                    "font-weight": "bold",
                },
            }),
        ],
    });

    return item;
}

export function Ranking(ranking: number) {
    const item = new Item("text", {
        id: "ranking",
        content: "#" + ranking.toString(),
        style: {
            transform: "translate(480px, 40px)",
            fill: "var(--text-1)",
            "font-size": "18px",
            "font-weight": "bold",
            "text-anchor": "end",
        },
    });

    return item;
}

export function TotalSolved(total: number, solved: number) {
    return new Item("g", {
        id: "total-solved",
        style: {
            transform: "translate(30px, 85px)",
        },
        children: [
            new Item("circle", {
                id: "total-solved-bg",
                style: {
                    cx: "40px",
                    cy: "40px",
                    r: "40px",
                    stroke: "var(--bg-1)",
                    "stroke-width": "6px",
                },
            }),
            new Item("circle", {
                id: "total-solved-ring",
                style: {
                    cx: "40px",
                    cy: "40px",
                    r: "40px",
                    transform: "rotate(-90deg)",
                    "transform-origin": "40px 40px",
                    "stroke-dasharray": `${(80 * Math.PI * solved) / total} 10000`,
                    stroke: "var(--color-0)",
                    "stroke-width": "6px",
                    "stroke-linecap": "round",
                },
            }),
            new Item("text", {
                content: solved.toString(),
                id: "total-solved-text",
                style: {
                    transform: "translate(40px, 40px)",
                    "font-size": "28px",
                    "alignment-baseline": "central",
                    "dominant-baseline": "central",
                    "text-anchor": "middle",
                    fill: "var(--text-0)",
                    "font-weight": "bold",
                },
            }),
        ],
    });
}

export function Solved(problem: FetchedData["problem"]) {
    const group = new Item("g", {
        id: "solved",
        style: {
            transform: "translate(160px, 80px)",
        },
    });

    const difficulties = ["easy", "medium", "hard"] as const;
    const colors = ["var(--color-1)", "var(--color-2)", "var(--color-3)"] as const;
    for (let i = 0; i < difficulties.length; i++) {
        group.children?.push(
            new Item("g", {
                id: `${difficulties[i]}-solved`,
                style: {
                    transform: `translate(0, ${i * 40}px)`,
                },
                children: [
                    new Item("text", {
                        id: `${difficulties[i]}-solved-type`,
                        style: {
                            fill: "var(--text-0)",
                            "font-size": "18px",
                            "font-weight": "bold",
                        },
                        content: difficulties[i][0].toUpperCase() + difficulties[i].slice(1),
                    }),
                    new Item("text", {
                        id: `${difficulties[i]}-solved-count`,
                        style: {
                            transform: "translate(300px, 0px)",
                            fill: "var(--text-1)",
                            "font-size": "16px",
                            "font-weight": "bold",
                            "text-anchor": "end",
                        },
                        content: `${problem[difficulties[i]].solved} / ${
                            problem[difficulties[i]].total
                        }`,
                    }),
                    new Item("line", {
                        id: `${difficulties[i]}-solved-bg`,
                        attr: { x1: 0, y1: 10, x2: 300, y2: 10 },
                        style: {
                            stroke: "var(--bg-1)",
                            "stroke-width": "4px",
                            "stroke-linecap": "round",
                        },
                    }),
                    new Item("line", {
                        id: `${difficulties[i]}-solved-progress`,
                        attr: { x1: 0, y1: 10, x2: 300, y2: 10 },
                        style: {
                            stroke: colors[i],
                            "stroke-width": "4px",
                            "stroke-dasharray": `${
                                300 *
                                (problem[difficulties[i]].solved / problem[difficulties[i]].total)
                            } 10000`,
                            "stroke-linecap": "round",
                        },
                    }),
                ],
            }),
        );
    }

    return group;
}

export const selectors = [
    "#root",
    "#background",
    "#icon",
    "#L",
    "#C",
    "#dash",
    "#username",
    "#username-text",
    "#ranking",
    "#total-solved",
    "#total-solved-bg",
    "#total-solved-ring",
    "#total-solved-text",
    "#solved",
    "#easy-solved",
    "#easy-solved-type",
    "#easy-solved-count",
    "#easy-solved-bg",
    "#easy-solved-progress",
    "#medium-solved",
    "#medium-solved-type",
    "#medium-solved-count",
    "#medium-solved-bg",
    "#medium-solved-progress",
    "#hard-solved",
    "#hard-solved-type",
    "#hard-solved-count",
    "#hard-solved-bg",
    "#hard-solved-progress",
] as const;

export function Gradient(id: string, colors: Record<string, string>, ratio = 0) {
    return new Item("linearGradient", {
        id,
        attr: {
            x1: 0,
            y1: 0,
            x2: Math.round(Math.cos(ratio) * 100) / 100,
            y2: Math.round(Math.sin(ratio) * 100) / 100,
        },
        children: Object.entries(colors)
            .sort((a, b) => a[0].localeCompare(b[0]))
            .map(([offset, color]) => {
                return new Item("stop", { attr: { offset, "stop-color": color } });
            }),
    });
}
