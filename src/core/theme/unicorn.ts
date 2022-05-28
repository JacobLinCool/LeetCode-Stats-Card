import { Gradient } from "../elements";
import { Item } from "../item";
import { Theme } from "./_theme";

export default Theme({
    palette: {
        bg: ["url(#g-bg)", "#ffffffaa"],
        text: ["url(#g-text)"],
        color: ["url(#g-text)", "#6ee7b7", "#fcd34d", "#fca5a5"],
    },
    css: `#background{stroke:url(#g-text)}`,
    extends: new Item({
        type: "defs",
        children: [
            Gradient("g-bg", [
                ["#dbeafe", 0],
                ["#e0e7ff", 0.5],
                ["#fae8ff", 1],
            ]),
            Gradient("g-text", [
                ["#2563eb", 0],
                ["#4f46e5", 0.5],
                ["#d946ef", 1],
            ]),
        ],
    }),
});
