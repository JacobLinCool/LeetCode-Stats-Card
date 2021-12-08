import type { IConfig, LeetCodeData } from "../types";
import activity from "./activity";

const extensions: { [key: string]: (data: LeetCodeData, config: IConfig) => string } = {
    activity,
};

const extension_wrap = [`<g id="extension" transform="translate(0, 200)">`, `</g>`];

function append_extension(data: LeetCodeData, config: Required<IConfig>): string {
    if (config.extension && config.extension in extensions) {
        let extension = extension_wrap[0];

        extension += `<line x1="10" y1="0" x2="${config.width - 10}" y2="0" stroke="lightgray" stroke-width="1" style="${
            config.animation ? `opacity: 0; animation: fade_in 1 0.3s 1.8s forwards;` : ""
        }"></line>`;
        extension += extensions[config.extension](data, config);

        extension += extension_wrap[1];
        return extension;
    }
    return "";
}

export { append_extension };
