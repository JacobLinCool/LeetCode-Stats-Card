import { ext_activity } from "./extension/activity.js";

let extension_wrap = [`<g id="extension" transform="translate(0, 200)">`, `</g>`];

function append_extension(data, parameters) {
    if (parameters.extension == "activity") {
        return `${extension_wrap[0]}
        <line x1="10" y1="0" x2="${parameters.width - 10}" y2="0" stroke="lightgray" stroke-width="1" style="${
            parameters.animation ? `opacity: 0; animation: fade_in 1 0.3s 1.8s forwards;` : ""
        }"></line>
        ${ext_activity(data, parameters)}
        ${extension_wrap[1]}`;
    }
    return "";
}

export { append_extension };
