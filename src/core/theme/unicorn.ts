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
            new Item({
                type: "linearGradient",
                attr: { id: "g-bg", x1: "0", y1: "0", x2: "1", y2: "0" },
                children: [
                    new Item({
                        type: "stop",
                        attr: { offset: "0%", "stop-color": "#dbeafe" },
                    }),
                    new Item({
                        type: "stop",
                        attr: { offset: "50%", "stop-color": "#e0e7ff" },
                    }),
                    new Item({
                        type: "stop",
                        attr: { offset: "100%", "stop-color": "#fae8ff" },
                    }),
                ],
            }),
            new Item({
                type: "linearGradient",
                attr: { id: "g-text", x1: "0", y1: "0", x2: "1", y2: "0" },
                children: [
                    new Item({
                        type: "stop",
                        attr: { offset: "0%", "stop-color": "#2563eb" },
                    }),
                    new Item({
                        type: "stop",
                        attr: { offset: "50%", "stop-color": "#4f46e5" },
                    }),
                    new Item({
                        type: "stop",
                        attr: { offset: "100%", "stop-color": "#d946ef" },
                    }),
                ],
            }),
        ],
    }),
});
