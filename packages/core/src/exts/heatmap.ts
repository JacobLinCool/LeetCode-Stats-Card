import { LeetCode, LeetCodeCN } from "leetcode-query";
import { Generator } from "../card";
import { Item } from "../item";
import { Extension } from "../types";

export async function HeatmapExtension(generator: Generator): Promise<Extension> {
    const pre_counts = new Promise<Record<string, number>>((resolve) => {
        if (generator.config.site === "us") {
            const lc = new LeetCode();
            lc.once("receive-graphql", async (res) => {
                try {
                    const { data } = (await res.json()) as {
                        data: { user: { calendar: { calendar: string } } };
                    };
                    const calendar = data?.user?.calendar?.calendar;
                    resolve(calendar ? JSON.parse(calendar) : {});
                } catch (e) {
                    console.warn("Failed to parse calendar", e);
                    resolve({});
                }
            });
            lc.graphql({
                operationName: "calendar",
                query: `query calendar($username: String!, $year: Int) { user: matchedUser(username: $username) { calendar: userCalendar(year: $year) { calendar: submissionCalendar } } }`,
                variables: { username: generator.config.username },
            });
        } else {
            const lc = new LeetCodeCN();
            lc.once("receive-graphql", async (res) => {
                try {
                    const { data } = (await res.json()) as {
                        data: { calendar: { calendar: string } };
                    };
                    const calendar = data?.calendar?.calendar;
                    resolve(calendar ? JSON.parse(calendar) : {});
                } catch (e) {
                    console.warn("Failed to parse calendar", e);
                    resolve({});
                }
            });
            lc.graphql(
                {
                    operationName: "calendar",
                    query: `query calendar($username: String!, $year: Int) { calendar: userCalendar(userSlug: $username, year: $year) { calendar: submissionCalendar } }`,
                    variables: { username: generator.config.username },
                },
                "/graphql/noj-go/",
            );
        }
    });

    return async function Heatmap(generator, data, body) {
        if (generator.config.height < 320) {
            generator.config.height = 320;
        }

        const counts = await pre_counts;
        const today = Math.floor(Date.now() / 86400_000) * 86400;
        const width = generator.config.width - 40;
        const wrap = +(width / 52).toFixed(2);
        const block = wrap * 0.9;

        const extension = new Item("g", {
            id: "ext-heatmap",
            style: { transform: `translate(0px, 200px)` },
            children: [
                new Item("line", {
                    attr: { x1: 10, y1: 0, x2: generator.config.width - 10, y2: 0 },
                    style: { stroke: "var(--bg-1)", "stroke-width": 1 },
                }),
                new Item("text", {
                    content: "Heatmap (Last 52 Weeks)",
                    id: "ext-heatmap-title",
                    style: {
                        transform: `translate(20px, 20px)`,
                        fill: "var(--text-0)",
                        opacity: generator.config.animation !== false ? 0 : 1,
                        animation:
                            generator.config.animation !== false
                                ? "fade_in 1 0.3s 1.7s forwards"
                                : "",
                    },
                }),
            ],
        });

        const blocks = new Item("g", {
            id: "ext-heatmap-blocks",
            children: [],
            style: {
                transform: `translate(20px, 35px)`,
                opacity: generator.config.animation !== false ? 0 : 1,
                animation:
                    generator.config.animation !== false ? "fade_in 1 0.3s 1.9s forwards" : "",
            },
        });
        extension.children?.push(blocks);

        for (let i = 0; i < 364; i++) {
            const count = counts[today - i * 86400] || 0;
            const opacity = calc_opacity(count);

            blocks.children?.push(
                new Item("rect", {
                    attr: {
                        class: `ext-heatmap-${count}`,
                    },
                    style: {
                        transform: `translate(${width - wrap * (Math.floor(i / 7) + 1)}px, ${
                            wrap * (6 - (i % 7))
                        }px)`,
                        fill: `var(--color-1)`,
                        opacity: opacity,
                        width: `${block}px`,
                        height: `${block}px`,
                        stroke: "var(--color-0)",
                        "stroke-width": +(i === 0),
                        rx: 2,
                    },
                }),
            );
        }

        const from = new Date((today - 86400 * 364) * 1000);
        const to = new Date(today * 1000);
        extension.children?.push(
            new Item("text", {
                content: `${from.getFullYear()}.${from.getMonth() + 1}.${from.getDate()}`,
                id: "ext-heatmap-from",
                style: {
                    transform: `translate(20px, 110px)`,
                    fill: "var(--text-0)",
                    opacity: generator.config.animation !== false ? 0 : 1,
                    animation:
                        generator.config.animation !== false ? "fade_in 1 0.3s 2.1s forwards" : "",
                    "font-size": "10px",
                },
            }),
            new Item("text", {
                content: `${to.getFullYear()}.${to.getMonth() + 1}.${to.getDate()}`,
                id: "ext-heatmap-to",
                style: {
                    transform: `translate(${generator.config.width - 20}px, 110px)`,
                    fill: "var(--text-0)",
                    opacity: generator.config.animation !== false ? 0 : 1,
                    animation:
                        generator.config.animation !== false ? "fade_in 1 0.3s 2.1s forwards" : "",
                    "font-size": "10px",
                    "text-anchor": "end",
                },
            }),
        );

        body["ext-heatmap"] = () => extension;
    };
}

function calc_opacity(count: number, max = 8): number {
    return Math.sin(Math.min(1, (count + 0.5) / max) * Math.PI * 0.5);
}
