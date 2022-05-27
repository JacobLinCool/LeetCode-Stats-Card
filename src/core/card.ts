import { Icon, Ranking, Root, Solved, TotalSolved, Username } from "./elements";
import { Item } from "./item";
import query from "./query";
import { Cache, Config, Extension, FetchedData } from "./types";

export class Generator {
    public verbose = false;
    public config: Config = {
        username: "jacoblincool",
        site: "us",
        width: 500,
        height: 200,
        css: [],
        extensions: [],
    };
    public cache: Cache;

    constructor(cache: Cache) {
        this.cache = cache;
    }

    async generate(config: Config): Promise<string> {
        const start_time = Date.now();
        this.log("generating card for", config.username, config.site);

        this.config = config;

        const extensions = this.config.extensions.map((init) => init(this)) ?? [];
        const data = this.fetch(config.username, config.site);
        const body = this.body();

        const result = await this.hydrate(await data, body, await Promise.all(extensions));
        this.log(`card generated in ${Date.now() - start_time}ms`);
        return result;
    }

    protected async fetch(username: string, site: "us" | "cn"): Promise<FetchedData> {
        this.log("fetching", username, site);
        const cache_key = `data-${username}-${site}`;

        const cached: FetchedData | null = await this.cache.get(cache_key);
        if (cached) {
            this.log("fetch cache hit");
            return cached;
        } else {
            this.log("fetch cache miss");
        }

        try {
            if (site === "us") {
                const data = await query.us(username);
                await this.cache.put(cache_key, data);
                return data;
            } else {
                const data = await query.cn(username);
                await this.cache.put(cache_key, data);
                return data;
            }
        } catch (err) {
            const message = (err as Error).message;
            return {
                profile: {
                    username: message,
                    realname: "",
                    about: "",
                    avatar: "",
                    skills: [],
                    country: "",
                },
                problem: {
                    easy: {
                        solved: Math.round(Math.random() * 500),
                        total: 500 + Math.round(Math.random() * 500),
                    },
                    medium: {
                        solved: Math.round(Math.random() * 500),
                        total: 500 + Math.round(Math.random() * 500),
                    },
                    hard: {
                        solved: Math.round(Math.random() * 500),
                        total: 500 + Math.round(Math.random() * 500),
                    },
                    ranking: 0,
                },
                submissions: [
                    {
                        title: "",
                        time: 0,
                        status: "System Error",
                        lang: "JavaScript",
                        slug: "",
                        id: "",
                    },
                ],
            };
        }
    }

    protected body(): Record<string, (...args: any[]) => Item> {
        const icon = Icon;
        const username = Username;
        const ranking = Ranking;
        const total_solved = TotalSolved;
        const solved = Solved;

        return { icon, username, ranking, total_solved, solved };
    }

    protected async hydrate(
        data: FetchedData,
        body: Record<string, (...args: unknown[]) => Item>,
        extensions: Extension[],
    ): Promise<string> {
        this.log("hydrating");
        const ext_styles: string[] = [];

        for (const extension of extensions) {
            try {
                await extension(this, data, body, ext_styles);
            } catch (err) {
                this.log("Extension Failed", err);
            }
        }

        const root = Root(this.config, data);
        if (!root.children) {
            root.children = [];
        }
        root.children.push(body.icon());
        delete body.icon;
        root.children.push(body.username(data.profile.username, this.config.site));
        delete body.username;
        root.children.push(body.ranking(data.problem.ranking));
        delete body.ranking;
        const [total, solved] = (["easy", "medium", "hard"] as const).reduce(
            (acc, level) => [
                acc[0] + data.problem[level].total,
                acc[1] + data.problem[level].solved,
            ],
            [0, 0],
        );
        root.children.push(body.total_solved(total, solved));
        delete body.total_solved;
        root.children.push(body.solved(data.problem));
        delete body.solved;

        Object.values(body).forEach((item) => {
            root.children?.push(item());
        });

        const styles = [`@namespace svg url(http://www.w3.org/2000/svg);`, root.css()];
        styles.push(...ext_styles);
        styles.push(`svg{opacity:1}`);
        if (this.config?.css) {
            styles.push(...this.config.css);
        }

        root.children.push(new Item({ type: "style", content: styles.join("\n") }));

        return root.stringify();
    }

    public log(...args: unknown[]): void {
        if (this.verbose) {
            console.log(...args);
        }
    }
}
