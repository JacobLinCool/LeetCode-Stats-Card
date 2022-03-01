import type { IThemeConfig } from "../types/types";

export default {
    colors: {
        background: "#101010",
        border: "#d3d3d3",
        username: "#f0f0f0",
        ranking: "#dcdcdc",
        total_solved_number: "#f0f0f0",
        total_solved_ring_background: "#404040",
        total_solved_ring_foreground: "#ffa116",
        easy: {
            text: "#f0f0f0",
            number: "#dcdcdc",
            progress_background: "#404040",
            progress_foreground: "#5cb85c",
        },
        medium: {
            text: "#f0f0f0",
            number: "#dcdcdc",
            progress_background: "#404040",
            progress_foreground: "#f0ad4e",
        },
        hard: {
            text: "#f0f0f0",
            number: "#dcdcdc",
            progress_background: "#404040",
            progress_foreground: "#d9534f",
        },
    },
    css: `
path#L {
    fill: #ffffff;
}`,
} as IThemeConfig;
