import { ContestInfo, ContestRanking, LeetCode, UserContestInfo } from "leetcode-query";
import { Generator } from "../card";
import { Gradient } from "../elements";
import { Item } from "../item";
import { Extension } from "../types";

export function ContestExtension(generator: Generator): Extension {
    const pre_result = new Promise<null | { ranking: ContestRanking; history: ContestInfo[] }>(
        (resolve) => {
            const lc = new LeetCode();
            lc.once("receive-graphql", async (res) => {
                try {
                    const { data } = (await res.json()) as { data: UserContestInfo };
                    const history = data.userContestRankingHistory.filter((x) => x.attended);

                    if (history.length === 0) {
                        resolve(null);
                        return;
                    }

                    resolve({ ranking: data.userContestRanking, history });
                } catch (e) {
                    resolve(null);
                }
            });
            lc.user_contest_info(generator.config.username).catch(() => resolve(null));
        },
    );

    return async function Contest(generator, data, body, styles) {
        const result = await pre_result;

        if (result) {
            if (generator.config.height < 400) {
                generator.config.height = 400;
            }

            const start_time = result.history[0].contest.startTime;
            const end_time = result.history[result.history.length - 1].contest.startTime;
            const [min_rating, max_rating] = result.history.reduce(
                ([min, max], { rating }) => [Math.min(min, rating), Math.max(max, rating)],
                [Infinity, -Infinity],
            );

            const width = generator.config.width - 90;
            const height = 100;
            const x_scale = width / (end_time - start_time);
            const y_scale = height / (max_rating - min_rating);

            const points = result.history.map((d) => {
                const { rating } = d;
                const time = d.contest.startTime;
                const x = (time - start_time) * x_scale;
                const y = (max_rating - rating) * y_scale;
                return [x, y];
            });

            const extension = new Item("g", {
                id: "ext-contest",
                style: { transform: `translate(0px, 200px)` },
                children: [
                    new Item("line", {
                        attr: { x1: 10, y1: 0, x2: generator.config.width - 10, y2: 0 },
                        style: { stroke: "var(--bg-1)", "stroke-width": 1 },
                    }),
                    new Item("text", {
                        content: "Contest Rating",
                        id: "ext-contest-rating-title",
                        style: {
                            transform: `translate(20px, 20px)`,
                            fill: "var(--text-1)",
                            "font-size": "0.8rem",
                            opacity: generator.config.animation !== false ? 0 : 1,
                            animation:
                                generator.config.animation !== false
                                    ? "fade_in 1 0.3s 1.7s forwards"
                                    : "",
                        },
                    }),
                    new Item("text", {
                        content: result.ranking.rating.toFixed(0),
                        id: "ext-contest-rating",
                        style: {
                            transform: `translate(20px, 50px)`,
                            fill: "var(--text-0)",
                            "font-size": "2rem",
                            opacity: generator.config.animation !== false ? 0 : 1,
                            animation:
                                generator.config.animation !== false
                                    ? "fade_in 1 0.3s 1.7s forwards"
                                    : "",
                        },
                    }),
                    new Item("text", {
                        content: "Highest Rating",
                        id: "ext-contest-highest-rating-title",
                        style: {
                            transform: `translate(160px, 20px)`,
                            fill: "var(--text-1)",
                            "font-size": "0.8rem",
                            opacity: generator.config.animation !== false ? 0 : 1,
                            animation:
                                generator.config.animation !== false
                                    ? "fade_in 1 0.3s 1.7s forwards"
                                    : "",
                        },
                    }),
                    new Item("text", {
                        content: max_rating.toFixed(0),
                        id: "ext-contest-highest-rating",
                        style: {
                            transform: `translate(160px, 50px)`,
                            fill: "var(--text-0)",
                            "font-size": "2rem",
                            opacity: generator.config.animation !== false ? 0 : 1,
                            animation:
                                generator.config.animation !== false
                                    ? "fade_in 1 0.3s 1.7s forwards"
                                    : "",
                        },
                    }),
                    new Item("text", {
                        content:
                            result.ranking.globalRanking + " / " + result.ranking.totalParticipants,
                        id: "ext-contest-ranking",
                        style: {
                            transform: `translate(${generator.config.width - 20}px, 20px)`,
                            "text-anchor": "end",
                            fill: "var(--text-1)",
                            "font-size": "0.8rem",
                            opacity: generator.config.animation !== false ? 0 : 1,
                            animation:
                                generator.config.animation !== false
                                    ? "fade_in 1 0.3s 1.7s forwards"
                                    : "",
                        },
                    }),
                    new Item("text", {
                        content: result.ranking.topPercentage.toFixed(2) + "%",
                        id: "ext-contest-percentage",
                        style: {
                            transform: `translate(${generator.config.width - 20}px, 50px)`,
                            "text-anchor": "end",
                            fill: "var(--text-0)",
                            "font-size": "2rem",
                            opacity: generator.config.animation !== false ? 0 : 1,
                            animation:
                                generator.config.animation !== false
                                    ? "fade_in 1 0.3s 1.7s forwards"
                                    : "",
                        },
                    }),
                ],
            });

            for (let i = Math.ceil(min_rating / 100) * 100; i < max_rating; i += 100) {
                const y = (max_rating - i) * y_scale;
                const text = new Item("text", {
                    content: i.toFixed(0),
                    id: "ext-contest-rating-label-" + i,
                    style: {
                        transform: `translate(45px, ${y + 73.5}px)`,
                        "text-anchor": "end",
                        fill: "var(--text-2)",
                        "font-size": "0.7rem",
                        opacity: generator.config.animation !== false ? 0 : 1,
                        animation:
                            generator.config.animation !== false
                                ? "fade_in 1 0.3s 1.7s forwards"
                                : "",
                    },
                });
                const line = new Item("line", {
                    attr: { x1: 0, y1: y, x2: width + 20, y2: y },
                    style: {
                        stroke: "var(--bg-1)",
                        "stroke-width": 1,
                        transform: `translate(50px, 70px)`,
                        opacity: generator.config.animation !== false ? 0 : 1,
                        animation:
                            generator.config.animation !== false
                                ? "fade_in 1 0.3s 1.7s forwards"
                                : "",
                    },
                });
                extension.children?.push(text, line);
            }

            extension.children?.push(
                new Item("polyline", {
                    id: "ext-contest-polyline",
                    attr: {
                        points: points.map(([x, y]) => `${x},${y}`).join(" "),
                    },
                    style: {
                        transform: `translate(60px, 70px)`,
                        stroke: "var(--color-0)",
                        "stroke-width": 2,
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        fill: "none",
                        opacity: generator.config.animation !== false ? 0 : 1,
                        animation:
                            generator.config.animation !== false
                                ? "fade_in 1 0.3s 1.7s forwards"
                                : "",
                    },
                }),
            );

            body["ext-contest"] = () => extension;
        }
    };
}
