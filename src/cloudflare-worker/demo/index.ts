import { supported as fonts } from "../../core/exts/font";
import { supported as themes } from "../../core/exts/theme";
import html from "./demo.html";

export default html
    .replace(
        "${theme_options}",
        Object.keys(themes)
            .map(
                (theme, i) =>
                    `<option value="${theme}" ${i === 0 ? "selected" : ""}>${theme}</option>`,
            )
            .join(""),
    )
    .replace(
        "${font_options}",
        Object.keys(fonts)
            .map(
                (font, i) =>
                    `<option value="${font}" ${i === 0 ? "selected" : ""}>${font}</option>`,
            )
            .join(""),
    );
