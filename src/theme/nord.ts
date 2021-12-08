import type { IThemeConfig } from "../types";

export default {
    colors: {
        background: "#2E3440",
        border: "#3B4252",
        username: "#ECEFF4",
        ranking: "#D8DEE9",
        total_solved_number: "#ECEFF4",
        total_solved_ring_background: "#434C5E",
        total_solved_ring_foreground: "#D08770",
        easy: {
            text: "#ECEFF4",
            number: "#D8DEE9",
            progress_background: "#434C5E",
            progress_foreground: "#A3BE8C",
        },
        medium: {
            text: "#ECEFF4",
            number: "#D8DEE9",
            progress_background: "#434C5E",
            progress_foreground: "#EBCB8B",
        },
        hard: {
            text: "#ECEFF4",
            number: "#D8DEE9",
            progress_background: "#434C5E",
            progress_foreground: "#BF616A",
        },
    },
    css: `
path#L {
    fill: #ECEFF4;
}`,
} as IThemeConfig;
