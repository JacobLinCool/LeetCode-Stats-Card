import type { IThemeConfig } from "../types";

export default {
    css: `
@media (prefers-color-scheme: dark) {
    .background {
        stroke: #d3d3d3;
        fill: #101010;
    }
    .username {
        fill: #f0f0f0;
    }
    .ranking {
        fill: #dcdcdc;
    }
    .total_solved {
        fill: #f0f0f0;
    }
    .total_solved_ring .ring_bg {
        stroke: #404040;
    }
    .total_solved_ring .ring {
        stroke: #ffa116;
    }
    .easy_solved .difficulty {
        fill: #f0f0f0;
    }
    .easy_solved .solved {
        fill: #dcdcdc;
    }
    .easy_solved .progress_bg {
        stroke: #404040;
    }
    .easy_solved .progress {
        stroke: #5cb85c;
    }
    .medium_solved .difficulty {
        fill: #f0f0f0;
    }
    .medium_solved .solved {
        fill: #dcdcdc;
    }
    .medium_solved .progress_bg {
        stroke: #404040;
    }
    .medium_solved .progress {
        stroke: #f0ad4e;
    }
    .hard_solved .difficulty {
        fill: #f0f0f0;
    }
    .hard_solved .solved {
        fill: #dcdcdc;
    }
    .hard_solved .progress_bg {
        stroke: #404040;
    }
    .hard_solved .progress {
        stroke: #d9534f;
    }
    .title {
        fill: #f0f0f0;
        color: #f0f0f0;
    }
    .subtitle {
        fill: #dcdcdc;
        color: #dcdcdc;
    }
    
    path#L {
        fill: #ffffff;
    }
}`,
} as IThemeConfig;
