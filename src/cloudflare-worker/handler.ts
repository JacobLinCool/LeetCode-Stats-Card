import { Router } from "itty-router";
import {
    ActivityExtension,
    AnimationExtension,
    Config,
    FontExtension,
    Generator,
    RemoteStyleExtension,
    ThemeExtension,
} from "../core";
import { Cache } from "./cache";
import demo from "./demo";
import Header from "./headers";
import { booleanize, normalize } from "./utils";

const router = Router();

router.get("/favicon.ico", async () => {
    return Response.redirect(
        "https://raw.githubusercontent.com/JacobLinCool/leetcode-stats-card/main/favicon/leetcode.ico",
        301,
    );
});

function sanitize(config: Record<string, string>): Config {
    const sanitized: Config = {
        username: "jacoblincool",
        site: "us",
        width: 500,
        height: 200,
        css: [],
        extensions: [FontExtension, AnimationExtension, ThemeExtension],
        font: "baloo_2",
        animation: true,
        theme: { light: "light", dark: "dark" },
    };

    if (!config.username?.trim()) {
        throw new Error("Missing username");
    }
    sanitized.username = config.username.trim();

    // #region backward compatibility
    if (config.border_radius) {
        const size = parseFloat(config.border_radius) ?? 1;
        sanitized.css.push(`#background{rx:${size}px}`);
    }

    if (config.show_rank && booleanize(config.show_rank) === false) {
        sanitized.css.push(`#ranking{display:none}`);
    }
    // #endregion

    if (config.site?.trim().toLowerCase() === "cn") {
        sanitized.site = "cn";
    }

    if (config.width?.trim()) {
        sanitized.width = parseInt(config.width.trim()) ?? 500;
    }

    if (config.height?.trim()) {
        sanitized.height = parseInt(config.height.trim()) ?? 200;
    }

    if (config.theme?.trim()) {
        const themes = config.theme.trim().split(",");
        if (themes.length === 1 || themes[1] === "") {
            sanitized.theme = themes[0].trim();
        } else {
            sanitized.theme = { light: themes[0].trim(), dark: themes[1].trim() };
        }
    }

    if (config.font?.trim()) {
        sanitized.font = normalize(config.font.trim());
    }

    if (config.animation?.trim()) {
        sanitized.animation = booleanize(config.animation.trim());
    }

    if (config.ext === "activity" || config.extension === "activity") {
        sanitized.extensions.push(ActivityExtension);
    }

    if (config.border) {
        const size = parseFloat(config.border) ?? 1;
        sanitized.extensions.push(() => (generator, data, body, styles) => {
            styles.push(
                `#background{stroke-width:${size};width:${generator.config.width - size}px;height:${
                    generator.config.height - size
                }px;transform:translate(${size / 2}px,${size / 2}px)}`,
            );
        });
    }

    if (config.radius) {
        const size = parseFloat(config.radius) ?? 1;
        sanitized.css.push(`#background{rx:${size}px}`);
    }

    if (config.hide) {
        const targets = config.hide.split(",").map((x) => x.trim());
        sanitized.css.push(...targets.map((x) => `#${x}{display:none}`));
    }

    if (config.sheets) {
        sanitized.sheets = config.sheets.split(",").map((x) => x.trim());
        sanitized.extensions.push(RemoteStyleExtension);
    }

    return sanitized;
}

async function generate(config: Record<string, string>): Promise<Response> {
    const generator = new Generator(new Cache());
    generator.verbose = true;

    let sanitized: Config;
    try {
        sanitized = sanitize(config);
    } catch (err) {
        return new Response((err as Error).message, {
            status: 400,
        });
    }
    console.log("sanitized config", JSON.stringify(sanitized, null, 4));

    const cache_time = parseInt(config.cache || "60") ?? 60;
    const cache_header =
        `max-age=${cache_time}` + (cache_time <= 0 ? ", no-store, no-cache" : ", public");

    const headers = new Header().add("cors", "svg");
    headers.set("cache-control", cache_header);

    return new Response(await generator.generate(sanitized), { headers });
}

// handle path variable
router.get(
    "/:username",
    async ({ params, query }: { params: { username: string }; query: Record<string, string> }) => {
        query.username = params.username;
        return await generate(query);
    },
);

// handle query string
router.get("*", async ({ query }: { query: Record<string, string> }) => {
    if (!query.username) {
        return new Response(demo, {
            headers: new Header().add("cors", "html"),
        });
    }

    return await generate(query);
});

// 404 for all other routes
router.all("*", () => new Response("Not Found.", { status: 404 }));

export async function handle(request: Request): Promise<Response> {
    console.log(`${request.method} ${request.url}`);
    return router.handle(request);
}
