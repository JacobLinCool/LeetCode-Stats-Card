import type { IThemeConfig } from "../types/types";

export default {
    css: `
.leetcode_stats_card {
    animation: wtf_animation 1s linear 0s infinite forwards;
}
@keyframes wtf_animation {
    from { filter: hue-rotate(0deg); } to { filter: hue-rotate(360deg); }
}`,
} as IThemeConfig;
