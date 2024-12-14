import { Theme } from "./_theme";

const nord = [
    "#2e3440",
    "#3b4252",
    "#434c5e",
    "#4c566a",
    "#d8dee9",
    "#e5e9f0",
    "#eceff4",
    "#8fbcbb",
    "#88c0d0",
    "#81a1c1",
    "#5e81ac",
    "#bf616a",
    "#d08770",
    "#ebcb8b",
    "#a3be8c",
    "#b48ead",
] as const;

export default Theme({
    palette: {
        bg: nord.slice(0, 4),
        text: nord.slice(4, 7).reverse(),
        color: [nord[12], nord[14], nord[13], nord[11]],
    },
    css: `#L{fill:${nord[6]}}`,
});
