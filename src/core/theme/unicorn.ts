import type { IThemeConfig } from "../types/types";

export default {
    colors: {
        background: "url(#g-bg)",
        border: "url(#g-text)",
        username: "url(#g-text)",
        ranking: "url(#g-text)",
        total_solved_number: "url(#g-text)",
        total_solved_ring_background: "#ffffffaa",
        total_solved_ring_foreground: "url(#g-text)",
        easy: {
            text: "url(#g-text)",
            number: "url(#g-text)",
            progress_background: "#ffffffaa",
            progress_foreground: "#6ee7b7",
        },
        medium: {
            text: "url(#g-text)",
            number: "url(#g-text)",
            progress_background: "#ffffffaa",
            progress_foreground: "#fcd34d",
        },
        hard: {
            text: "url(#g-text)",
            number: "url(#g-text)",
            progress_background: "#ffffffaa",
            progress_foreground: "#fca5a5",
        },
    },
    svg: `
<defs>
<linearGradient id="g-bg" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0%" stop-color="#dbeafe"/>
    <stop offset="50%" stop-color="#e0e7ff"/>
    <stop offset="100%" stop-color="#fae8ff"/>
</linearGradient>
<linearGradient id="g-text" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0%" stop-color="#2563eb"/>
    <stop offset="50%" stop-color="#4f46e5"/>
    <stop offset="100%" stop-color="#d946ef"/>
</linearGradient>
</defs>
`,
} as IThemeConfig;
