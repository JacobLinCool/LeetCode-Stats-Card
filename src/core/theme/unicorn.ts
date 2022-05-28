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
    extends: new Item("defs", {
        children: [
            Gradient("g-bg", { 0: "#dbeafe", 0.5: "#e0e7ff", 1: "#fae8ff" }),
            Gradient("g-text", { 0: "#2563eb", 0.5: "#4f46e5", 1: "#d946ef" }),
        ],
    }),
});
