import { ContestInfo, ContestRanking, LeetCode } from "leetcode-query";
import { Generator } from "../card";
import { Item } from "../item";
import { Extension } from "../types";

export async function ContestExtension(generator: Generator): Promise<Extension> {
    const pre_result = new Promise<null | { ranking: ContestRanking; history: ContestInfo[] }>(
        (resolve) => {
            const lc = new LeetCode();
            lc.user_contest_info(generator.config.username)
                .then((data) => {
                    try {
                        const history = Array.isArray(data.userContestRankingHistory)
                            ? data.userContestRankingHistory.filter((x) => x.attended)
                            : [];

                        if (history.length === 0) {
                            resolve(null);
                            return;
                        }

                        resolve({ ranking: data.userContestRanking, history });
                    } catch (e) {
                        console.error(e);
                        resolve(null);
                    }
                })
                .catch(() => resolve(null));
        },
    );

    return async function Contest(generator, data, body) {
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

            if (result.ranking.badge) {
                const image =
                    result.ranking.badge.name === "Guardian"
                        ? guardian_icon()
                        : result.ranking.badge.name === "Knight"
                          ? knight_icon()
                          : "";

                extension.children?.push(
                    new Item("image", {
                        id: "ext-contest-badge",
                        attr: {
                            href: image,
                        },
                        style: {
                            transform: "translate(300px, 10px)",
                            width: "48px",
                            height: "48px",
                            opacity: generator.config.animation !== false ? 0 : 1,
                            animation:
                                generator.config.animation !== false
                                    ? "fade_in 1 0.3s 1.7s forwards"
                                    : "",
                        },
                    }),
                );
            }

            for (
                let i = Math.ceil(min_rating / 100) * 100;
                i < max_rating;
                i += max_rating - min_rating < 1000 ? 100 : 200
            ) {
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

            const start_date = new Date(start_time * 1000);
            const end_date = new Date(end_time * 1000);

            extension.children?.push(
                new Item("text", {
                    content: `${start_date.getFullYear()}/${start_date.getMonth() + 1}`,
                    id: "ext-contest-start-date",
                    style: {
                        transform: `translate(50px, 185px)`,
                        "text-anchor": "start",
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
                    content: `${end_date.getFullYear()}/${end_date.getMonth() + 1}`,
                    id: "ext-contest-end-date",
                    style: {
                        transform: `translate(${generator.config.width - 20}px, 185px)`,
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
            );

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

function knight_icon() {
    return "data:image/png;base64,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";
}

function guardian_icon() {
    return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAMAAAAOusbgAAADAFBMVEUAAABJR0dKSEhXVFRiYGBEQ0NiYGBTU1NHRkZPTU1BQEBnZWVbWVlEQ0NoZmZRT09ZV1dEQ0NVVFRoZmZCQUFMS0tkYmJMS0tDQkJEQ0NDQUFdW1toZWVlY2NJSEhlZGRgX19bWVleXV1bWlpnZmZUUlJlY2NBQEBbWlpNTExERERNTEwuLy0qKyksLStAPz9dXFxmo+hTUlJ6retKSUmMt+1QT09bWVpjoee70PRCQUFMS0tJR0dpZ2cpKShOTU2av+9jYWKTu+5gXl5lY2NXVlZEQ0O+0vWQue7O2veGtOxhoOdVVFSAsexWmuWYve+5z/RnZWWcwPC1zfOiw/CVvO+mxfGKtu18r+thYGBopOiIte1ZWFhGRUWEs+xfn+d3rOpcneZanOaRuu5qpegyMjHC1PWOuO6fwfByqem3zvRspujE1faWve9+sOu/0/W0zPOxy/PJ2PbH1/agwvBYm+bT3fi80fWCsuzL2fddnudup+lwqOlTmeWsyPKewfB1q+rB0/WuyvI8PDw5OTlRl+TQ3PioxvF0qurF1vaqx/KjxPGDsupzc3M1NTTW3vhwcHBtbW5paWqlxO2gvOJkaXJbYmyduN6Urc+cvuqrvNh2ncxekMhra2xSWWOrxu6Is+iDsOaZs9dolstvcnqhwOprpOVYZHR9sOuOtuh3quRPXnF8redlm9l3e4RlbHlkn+Jkjbx0dHdNWWckJCOUuulxp+WhttV0oNV9o897mb1iZm1OVV5FUFyNsd6TsNV2eX9HVWVYXWSxw+GDrd+JrNmLqdCRp8aCn8OCj6NsfZFicINudYJDRUm80PCyye1snNKKoL95k7RldoxJZoZqbna4ze22x+Rsod6DqdhTkNNQdZ2KjpliZGlDSVFQk92Bp9SJm7SNl6l/iJeAgolOUVZ7qeC4wtqfsMtRiMZPe6yWmqZkfJh4gY/N1e2pwuZbhbRVaoNVVlfH0Om2vtOwtsebq8N5m8NNgLmWorZzhZxcX2Wlq7tegqtJTlW/yN9Ex+jeAAAALHRSTlMACBIiXp1IGkss+vVubuvem4z13cNbODXktO7YwoR/VPPw6Lqvr5nTy8o/81nwl+0AABSCSURBVGje1NY9aBNhGAdw24RUMUhoMQ5tjf2wKNwl4Qh32CQ9QnoJhRsanA7S8TqIELVQcRH0glAhZxIUoZDN2SEUHFwK3d20SyctdAh26McgFPT/5M3dJb1r/MLBf4fSLj/+z/u8b3Lu/8jAoM8XDgcCkUjE30kkEggEwhd8QwP/gPOFA/7xmemxkZFLly5dROYpGYqWyVyjTE5Ojt6YCo0H/YELQ39PDoYjwZmxEWAFFngMdaKxZK1MTEyOTs0EA3/KDwyFx0GmKRBtl6VXBWsnbmViNOQPD/6m6guMj5HJYrMdWCoqikoREPxSlGJRkuK9rhSXJGli9Hrw1yfv80+PpB0VP9Xm5u5Oq7VTYy7HRaP8HAvP89Eox+m6aZaNWC4hC6pSbMMswG+EfmXsAxFUtVOvvP3SOjn6fri/8OzZwsLRWxpyXOe7MncqPKeb5VhKFpQ2W6QMj4au/MQNT1+00Fpzt3W8t79KeYYsIHubdLoqx3un29fNWEpQoSJKUZkI9r1ugRGr6e7J0eHqC5gIU5FHj/Y2MyTrfL906eUlUenk+lB/F2qzdbz/AnFYy330gMmKHmXpzzPcSKpteepM2dd2m1Ap6NvLkvtgZa8JWIPskbOq67OgVSV01l5Nk7sDluKcLUMZu7Kytl2l2yuQ7B0v25QhDwe84QjtVWvVUeF2dQVL7trd7aqGKGa0b07ROl34Ke8Fo8K7++6z7WbvIsskZ7OKyTlxw+y/Dm0AHr7secK4v/Vj1hfqaldbGjKruwZ3eXmrmQWt6Jw7TNXLswlZlpcMk7NkPqkK6nUv2I/Cm4dQvduyusQ+WS6tv8kiAmQvmzNlKVNI1+uNupa05TJV9pr1DG2We8oEd6uUfJ7Jqsl5ZjaD4TVqtWq1UslZJ82JeNm9HrAxwCdAHXWBUMY6bilfyufzD/vKuXnbbSbmokzmE4C9Dpku8ZGrrMU6baHmH966BRkfBaJbxlOdcNxKUtejrHIO8FW3O4jdqu05z4XTlrkEl9plH4JdXFxsy5J8WjZTB5LmuNXsgWiwc44BDnkvdeW7zfbMGKbFUlkG31l/E4cs9Mp6SkPdBrFItVYvZLKKESXYAOyx1uGL6cLm4alNdoZcslkE6uKdO7ffecjmQbogCw3HFWKykuApJuCbbjgA+O0hNsppa9cltjNmW0XuvfsIWBL1Lrgcryc3jAYbc6Ne0IyNmCDPEawDHva6xoXCrvUkOysFl1i7MGZssQhkSeo5ZzPeSPK5GurCTc9rcSOaEhMbHVgU3Bd5HF+qdsA6bWHS2Zae5KEyG4VRF2mz9+/ff/cRcPe0daE2r+eqtls0ymIytsHjlDlZFMUh9/sBuMU2eW3FeS1QlAL4CarnMWmoFkvyK8Dd0441qmqu2qzU6nClohqT5ZTehqMJwO4XZBrwN2uj1iwXJJ0sGuPv7a0PaAzVYp8iL9/T9ypZdypXKlqdrbOkqEIiuUSFCU4BPu9+uACfgIXJWBSER68FArj0OZv9uoUTJtliHz9+/Pp9EREdWWXrrMEVxGQqZ2zMsY/JJcBB98MF+JjaUtB1GSzlFoXg9XlcnjfrnwAzlbnPn/fKSK7QSBe0eMc14TJ4FrDr6frBh92FJhWGcQCnD4jom6iICKIIij6xs0U70lFZJrEo62hFOQI5TAL7AMGuElIQdkIyP6ZGGTKpbhSiqFi0kWwjGkoXOYKCWkHexG5iEN30f973HO046c8q28V+PI/v+zyeLVnpdN779c8qQLH6/SEZ8Dm6tWOVOsFcZe5gtPABn/D/lRXzBRyrPrieyGFyubwP8LzRtXRlrzP+AzA/UnwXQIWLkFwtEXzwZ67GYF2N4quQgnxEVP7ZjEq42yQqe58+ZZ/3ORzu7pa2z58fvb1PpvX3tlktl4k+erQyTPDB4VwNcNONut1R92jqCCJBbkYRJPvTPeylDke6JWnnvPkBeKyuLT4KTWR9PnK5mhsm+AJkwJyFSzHKSiQcDu/rFuwx/BtrwTHAq9rh5XggK1WhInwDNcNm1UkcMMgEX5hK3mSwrqqyKhdI7uPdjpj6TOiqvcdut/dEWrAiSdKueYMLT2PfDT1mZSJB/eXRK9XcGMEXSs/zTVhVVVmWA3ImRU+QgsJgdpx7wpGYsnvv4b1cptGFLGgfXIA/ocstlWnBIN7bCv2f3eVq7g7gI0emIA9GtWrBBnwBXyYFGAeKWh2JxRS8oPWP49WERcCL2gcXngNntGqDbBMgJFc/xW/P1PFNgqc/7SeYyYDBIj5ifaFTE+U+BDKJrfAPunx0SZK4oX1w4THwd5DXSyzlNL2zDTw3WD89r1er9em5EjoNGCkl84NuN1iYUH2nkIkRelZHt41pwR5JFNtn5lo8ETWg6iz23qXTkIO/2S8arMOl72N3cKgBH6Rj1Dc8lI8CZmyIWIvlxMSICSG5M2wXRXFdG7wMcE5j9X2Lv04eysUBI/wpH/C5tykmfxhKuNUAa7LmntBkUekEQ+4BvMLoLrAiFbqzOsuCmutzcQP84Wuj8RkuaoaMigmlnED8E+nONWszE3DbsF4C906lVa6++0DXnn+zwuWw9edkJjn7PEWwaWoooQaoXqCk+l0u1/gfE+6wWekIhwGvMd6nRYDj00zlsLb7QF+rzTbeluKfrSMffr6dzBSSiXweMmBTuVAM+DSXVJfNZoOMXSAoneAI4O1GeD3g4Ro3YXNa233X8rPJoUKGMlpIFhPuwRskm5BUoegLWaCSa0O8Xsf4m24ud4Y3LjTuCFyaMcDamWL91pYQvvL5xGySki3Kshtb4Ua+wI5Rd3moGLJY0GQKXJvX4f2SBoxuz4djgiDsNMKLAZdqjAV8EqnNzc3maQVpwzGRSMg8qgo6UUgxeWo0i4pJ5vU6vAOOl0z2GGWCFVEQVi0x7gjAP7WTjIkVPFQpOXsxJMjEH74LtHkRCMgyl+kcpUjmKljHwICjq4vJEmpuh1HxLiO8GWPiGw4SYLaJcmO9yNeku7mBVD6TcW1pRMqqGzJcLnOY2IGurq4zZ0iWDDIf1gKyqAOMUMWHgpUnTgbjpkabmwDhYwo3KAQ6kRkhWCq/zvr9Np2Fi3xJS4hH6QAvNS4nwG+vUfAOB+vfmTv1HjACVYWKHoOFakFCIVktZsoES+8mnqFkB1junkdekizalbZhLQhm45ZYDXgGNwcwCp5xOpk7msRUBKs3Gao+pSynTgVkkiWkDBkwU5l77Pyxu5BF0aMYhzUqNm6JbRjIX3FnGTx9D7Cz9D4zVJTJZdWG+EwmVYslFNBkEbLNCxgqsZR+o7wXIdhsXmeEMY1/34BMcMMJeIq5SADR31oLok8pP6r2ZSdHCBbfvX5mc3SBpRB769b1u29EBN1uwT3mdngH4EncWgbPOJGv3A2wxQezVa2fT0eX34Wis6OQ8fNT488cAyiYq/391xFdbsH7ABvX0yYGD5J8qc7g94Ui7i16rG15C1ym+knVgqqzo2mChfQ4wVD7+28BPX79+PHjJAsC5P/DGfrEegML6TedrRmcaLhg9TWPtGYjj81F8huChYfjj9FrwOgyYy9ffnT3voDYW+sJsHEvbiWYphRKvtogOD5ZTKgEk0ohlsMYyQ42LjAgbX5LdiJNsFCGDBgsQu7Zs2dfvCK55x/Ys8YAb8HGLUQxp6KQaxgfTJbZnieU6m022dscUhiQXj91W0DMDz8+PnOsn7uknj1w4ACX7QqHIx5PO4w1X3AjJN+cI9h6531Rxp5vY/lEJpbHYdNlszn98cF5wNRk5iIXmWyG3Bn+W639h8Ycx3Ec9yOMyI/8VgrJzzo/5kdnNT8vza/Iz7EzrLiW/UUtm6yQi8sffss5d5bd7m7YJWs7rKZhNoqNYsuQKCI//iEiz/fn8737Ohv5XV5ZynSP3u/P9/t+3303eYtxEBeZbh+7CsxbkisngOP3vDSZHrMK1LygaErecuLQB4Gp2ZsisMHipqff8Mh3rCOjcJs4mIKBZRWobfvy0XzgKUevHF6n3S+abBbMlIJes2jyloUH9ys47fQDLyUDa5bk5eV7kohl5LdhNRxl0+88tu/qfGCRgc2zNVSqhVTjYgm9ZnDXJGo47QAycIx1kvwzSarm78Hs2g1UvcOQl927iSzHi2ruW27Y6ExWFS+onYSrYGSXC1izxOlwOJD5lmXkN+Djas0TVt6OvfseTQdetufmYQ44tuajGzc2lIHXTz57MZEc8KQRm/+ub04hMCzVOkhuLnIa8m5LE3gg8CE9HQl1L957EJnVcfsm2zba5XGwRpfVIjDgqkm4ntraA7g2m/+ILws4zwms3dyc/DOQxJZm6xo/q4EfqlWgA71339XpwMjsPFxdrS5Ws3YFT12/oCaRPC+7VHUAWOSiQmBYVGEJMqx8u1P8PuYzwvsFsSnFW4x1Ik8BnnavKgBsbHmmIrCwJnzWwwmfjzzweqsOCGxFBlYuKsnMzNQyGR4HdwS+dtjYe4S/eHez7wUwNV8KrDFcUM3qXeCyC3z5DQX7jzxxLQm89eBarf7SorHAuAabkZHhPq/cvq3j4J7Ay45H1y3Bpt/7Hi2T0fK+PCCwVomoaiZnqzOuekzFNcApKd4HHoGtodKi9DwHrFJJampquFFg3tDHZSDyVVhxWfKy6CcvkG4vA753KUCrY7CuVmayy54CHBkPXHfkSWFWdoq3zCOw5UxpUZ4UbLBkdHHIpo+4ySHvPxsbyYS3GCKfAh4VKZ85U+BotagqWdn2JTOnAicl1ZQGx45dmm33lj3GtVhCpUFkXIMlrwWm03FpO4BP3FWwxipg4U2dN3nD4r0PBa4tP7sGGViKJUolc+zLx625LK32HwmORc6y+454BLb4S4MCx1hVsbV7k59oDlrBc6SzNNkYyWx5hvCuxQ9xBV4/dSYw1ZoqmwB5ydqArIHH4SeMjPSxhdm+Mo9FcgY5BxhWMtF9nePv0fQJ/QQpWVdLuG1p9oINu14IfO/e/upIQErWrqhk7NKlXF/j1tYBJ70uDTqd0Evn+MrOC7z1zI2S3JwMXNSJE4tf4/Zu2QRu1U+VjKtZInvnsPqBh2TF6Qey52FjLq0tlGZHkoETP95xECft9h0x5NKSnExgcWe5r3PR9W/RNB1XkCppst5A2Ayl41MMmG/eq/Km2Nk9bB9UI8gpPn8S8VNgbq6Ddi8tEpnniaEbJcDKPRnC7duqGbjVUH6HYH9AqoUl0uzJV0ZJNDzjw1v2fLbpsgnkesp2vT0vvc6/U8KNm+twpit5K6m4UZKRKu6sBgru0FzBnHI3nuZUjzP2j9Bc2uXnBD53+p56sDaq1kfFsFGXcNCFRWHPp9DH/DuZDIwcqk4fi4wrckHGaGn0BQru3qpZuOVg4AkRQLUJ+IIORE6frq6NVFVVTwCe8SHic80pBDZpsdODN8Jh98mCTBWqdqYb8jZkSuZWomDGdLNp35mX3n8XFxZ4OfIS792ysrK7leWXqifI060DyFkmzC7Q277kzklxM3QykYP5Z3C3bQu5C0bPeiZXFpv4G+nYjd9eqPOOi85kstzrq6z0+bzjAuXv+aEKcq1Peq3u4Sy2n7H8SkoKtJuqkpHjyIvKZ9zF7k+4vVt9E27ZhVde8f6LDcT2cxE7ywB5hcgTan3G0LJnZz0J5jmjKwg1Ni1SKdqBvE1S8UoOuEPC936/qDOvfDGiytUbSD6NkGw7fS+vE3jMxbc+/t3Of6l87n9eypBANYrVM0r+pGbmOILhC0putOHyZO07Segmcplat67YTCbZQldWzwAWOSWFa+BuDR+a/HcKcnSxMVdlNHRuSb7IW62EdfjddEQec6DSbqqcKOFEXSneyuo3Y8jFWi+X/t2aZODH3ERmtZqdJZk4kX4XIG+1WKzWIe2/78oxyxM7HyyqORsZjuxA5Nkir4gEZpbXJAsc4i5S1cZU3JWSWfQ7tcDdaJGR9e0DNgfYGFJXJOWarKaZjpV16unWm7rqi8r1fHQXF8SqhSW4mwg0ZcuItpgH/N0LTMtUW2iORonQrspqYEmywJ5X7pPFqaOj5WpV3FUqm1bWN+JacH8gvQx56ResDIk8oZWsXKJds8lEVO2ultR/grW0wf2RtO8mRT1HViyBdWKrRZ/15Lkhjw+Jixrvwkbdpxek3j64P5bh3XjhMc+DhguL65Rl66TqoifhGs/jMedDDcqN7lvDNdmNG3Gpl9Xww+kxQmqqCxrVRj8DOQgdD5bcyA+HX4Xd+SeLZViQZtSNcw239Y+7yJ1FrhEZV7Mkhy94VsKdk6SYOaFuILPJsMDCzn1n1vvT8us71KtUXBmNMh1lQBYQahXWUIl2UYWd+6xR3CG4Pysnj08e778hrFZB9UzWA7LJpWz2mGx+1mjRff7pJHROJv4w1cZYwwQ1WVSjyVGWbG+4Lm4b6v359BomsicMq1SBU5tlUePd+7dsFn3//lLaS80MxczmijVZrRJD3by5/pYVtgP1/mLaDZtEkp8XNNl75tmSOBb3aUjcvp2o91fTqs0IoV+fNF1YcxWYZ0sMdvuzCxbSG/c30rK/wImh/PijRcVF/bpa3AabctmDv5eOyfJk5XG4ydmaPSZahd1+yyIZ0ut3XbmtEsmkhmJz8TXfZNjNTytQ9W30+2nXJ1EScn95/wiLiqtVXe4zdfd24Hj/SFq2EZhPwLjxd1B8l+9zF5G+Pf4MK3Kn3kmEduOa+9ZUhd3+rsKmpmT7P8XqKZYodMiNCvr1lSzlNjSaU+MPpl0bJX96hgsac1W1pP6WOt4h5vH+0XanpSXdqtc9Ns9Wwu412vwXMrx7UhqpePdlk1XuU+5faLPZ7q59RU68VR9XLVeVHhoJtPnvpGVC9zQbqWio346q8zRaLjv/76V9nySR0yoantbfJ/XPbjWiMpu7/qU2m1ujt8hWm63xQkXFhetWUMrtM7zFX0/rPn2BjeAaK/BfJKF7HNyhKzfRP0qvrkM6aLZvn04c7r9My/YJCQnDW7f47/IZ7i9yjAS4/0IAAAAASUVORK5CYII=";
}
