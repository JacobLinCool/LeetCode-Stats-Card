import type { IRawConfig, IConfig, Ttheme, Tfont } from "./types/types";
import { theme_list } from "./theme";

const default_config: IConfig = {
    username: "",
    theme: "default",
    font: "baloo",
    animation: true,
    show_rank: true,
    width: 500,
    height: 200,
    border: 1,
    border_radius: 4,
    extension: null,
};

function booleanize(value: string | boolean): boolean {
    if (typeof value === "boolean") return value;

    const F = ["false", "null", "0", ""];
    return !F.includes(value.toLowerCase());
}

function cook(config: IRawConfig | IConfig): IConfig {
    const cooked: IConfig = {};

    cooked.username = config.username || "";
    cooked.extension = config.extension && config.extension !== "null" ? config.extension : null;
    cooked.site = config.site?.toLowerCase() === "cn" ? "cn" : "us";

    // backwards compatibility
    if (config.style !== undefined && config.theme === undefined) {
        config.theme = config.style;
    }

    if (config.theme && theme_list.includes(config.theme.toLowerCase() as Ttheme)) {
        cooked.theme = config.theme.toLowerCase() as Ttheme;
    }

    if (config.font) {
        cooked.font = config.font.replace(/ /g, "_").toLowerCase() as Tfont;
    }

    // extension default height
    if (cooked.extension && config.height === undefined) {
        config.height = "400";
    }

    // boolean conversion
    if (config.animation) cooked.animation = booleanize(config.animation);
    if (config.show_rank) cooked.show_rank = booleanize(config.show_rank);

    // number conversion
    cooked.width = config.width !== undefined ? +config.width : 500;
    cooked.height = config.height !== undefined ? +config.height : 200;
    cooked.border = config.border !== undefined ? +config.border : 1;
    cooked.border_radius = config.border_radius !== undefined ? +config.border_radius : 4;

    // disable extension if the height is not enough
    if (config.width !== undefined && <number>(<unknown>config.height) < 400) {
        delete cooked.extension;
    }

    return cooked;
}

function make_config(user_config: IRawConfig | IConfig): Required<IConfig> {
    const config = { ...default_config, ...cook(user_config) };

    return config as Required<IConfig>;
}

export { make_config };
