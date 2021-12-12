import type { IThemeConfig } from "../types";

export default {
    colors: {
        background: "#ffffff",
        border: "#d3d3d3",
        username: "#262626",
        ranking: "#808080",
        total_solved_number: "#262626",
        total_solved_ring_background: "#e5e5e5",
        total_solved_ring_foreground: "#ffa116",
        easy: {
            text: "#262626",
            number: "#808080",
            progress_background: "#e5e5e5",
            progress_foreground: "#5cb85c",
        },
        medium: {
            text: "#262626",
            number: "#808080",
            progress_background: "#e5e5e5",
            progress_foreground: "#f0ad4e",
        },
        hard: {
            text: "#262626",
            number: "#808080",
            progress_background: "#e5e5e5",
            progress_foreground: "#d9534f",
        },
    },
    css: "",
} as IThemeConfig;
