import type { IConfig, LeetCodeData } from "./types/types";
import { get_font } from "./font";
import { get_theme } from "./theme";
import { leetcode_icon } from "./image";
import { get_animation_css } from "./animation";
import { append_extension } from "./extension";

class Card {
    private svg: { start: string; end: string };
    private font: string;
    private theme: string;
    private theme_injection: string;

    constructor(private config: Required<IConfig>, private data: LeetCodeData) {
        this.svg = {
            start: `<svg xmlns="http://www.w3.org/2000/svg" width="${config.width}" height="${
                config.height
            }" viewBox="0 0 ${500} ${config.extension ? 400 : 200}" fill="none">`,
            end: `</svg>`,
        };

        this.font = get_font(config.font);
        const theme = get_theme(config.theme);
        this.theme = theme.css;
        this.theme_injection = theme.svg;
    }

    export_svg(): string {
        const card_body = this.get_svg_body();
        const card_style = this.get_svg_style();

        const card =
            this.svg.start +
            `<title>${this.data.username} | LeetCode Stats Card</title>` +
            card_body +
            card_style +
            this.svg.end;
        return card;
    }

    private get_svg_body(): string {
        const card_body = `
<g class="leetcode_stats_card theme_${this.config.theme}">
    <rect class="background" stroke-width="${this.config.border}" width="${
            500 - this.config.border
        }" height="${(this.config.extension ? 400 : 200) - this.config.border}" x="${
            this.config.border / 2
        }" y="${this.config.border / 2}" rx="${this.config.border_radius}" />
    <g class="head">
        <a href="${
            this.config.site === "cn" ? "https://leetcode-cn.com/u" : "https://leetcode.com"
        }/${this.data.username}/" target="_blank">
            <g class="icon" transform="translate(20, 15)">${leetcode_icon(30, 30)}</g>
            <text class="username" transform="translate(65, 40)" style="font-size: 24px;">${
                this.data.username
            }</text>
            ${
                this.config.show_rank
                    ? `<text class="ranking" text-anchor="end" transform="translate(480, 40)" style="font-size: 18px;">#${
                          this.data.profile.ranking >= 100000
                              ? "100000+"
                              : this.data.profile.ranking
                      }</text>`
                    : ""
            }
        </a>
    </g>
    <g class="body">
        <g class="total_solved_ring" transform="translate(30, 5)">
            <circle class="ring_bg" cx="40" cy="40" r="40" />
            <circle class="ring" cx="40" cy="40" r="40" transform-origin="40px 40px" stroke-dasharray="${
                80 * Math.PI * (this.data.problem.all.solved / this.data.problem.all.total)
            } 1000" />
            <g>
                <text class="total_solved" x="40" y="40" style="font-size: 28px;" alignment-baseline="central" dominant-baseline="central" text-anchor="middle">${
                    this.data.problem.all.solved
                }</text>
            </g>
        </g>
        <g class="solved_details" transform="translate(160, 0)">
            <g class="easy_solved" transform="translate(0, 0)">
                <text class="difficulty">Easy</text>
                <text class="sub solved">${this.data.problem.easy.solved} / ${
            this.data.problem.easy.total
        }</text>
                <line class="progress_bg" x1="0" y1="10" x2="300" y2="10" />
                <line class="progress" x1="0" y1="10" x2="300" y2="10" stroke-dasharray="${
                    300 * (this.data.problem.easy.solved / this.data.problem.easy.total)
                } 1000" />
            </g>
            <g class="medium_solved" transform="translate(0, 40)">
                <text class="difficulty">Medium</text>
                <text class="sub solved">${this.data.problem.medium.solved} / ${
            this.data.problem.medium.total
        }</text>
                <line class="progress_bg" x1="0" y1="10" x2="300" y2="10" />
                <line class="progress" x1="0" y1="10" x2="300" y2="10" stroke-dasharray="${
                    300 * (this.data.problem.medium.solved / this.data.problem.medium.total)
                } 1000" />
            </g>
            <g class="hard_solved" transform="translate(0, 80)">
                <text class="difficulty">Hard</text>
                <text class="sub solved">${this.data.problem.hard.solved} / ${
            this.data.problem.hard.total
        }</text>
                <line class="progress_bg" x1="0" y1="10" x2="300" y2="10" />
                <line class="progress" x1="0" y1="10" x2="300" y2="10" stroke-dasharray="${
                    300 * (this.data.problem.hard.solved / this.data.problem.hard.total)
                } 1000" />
            </g>
        </g>
    </g>
    ${this.config.extension ? append_extension(this.data, this.config) : ""}
</g>
${this.theme_injection || ""}
`;

        return card_body;
    }

    private get_svg_style(): string {
        const card_style =
            "<style>" +
            `
.leetcode_stats_card * {
    transform-box: fill-box;
}
.leetcode_stats_card text {
    font-weight: bold;
}
.leetcode_stats_card .head {
    transform: translate(0px, 0px);
}
.leetcode_stats_card .body {
    transform: translate(0px, 80px);
}
.total_solved_ring .ring_bg {
    stroke-width: 6;
}
.total_solved_ring .ring {
    transform: rotate(-90deg);
    stroke-width: 6;
    stroke-linecap: round;
}
.solved_details .difficulty {
    font-size: 18px;
}
.solved_details .solved {
    font-size: 16px;
    text-anchor: end;
    transform: translate(300px, 0px);
}
.solved_details .progress_bg, .solved_details .progress {
    stroke-width: 4;
    stroke-linecap: round;
}
` +
            this.font +
            "</style>" +
            "<style>" +
            this.theme +
            "</style>" +
            (this.config.animation
                ? `<style>${get_animation_css(
                      this.data.problem.all.solved / this.data.problem.all.total,
                      1,
                  )}</style>`
                : "");

        return card_style;
    }
}

function get_404_card(config: IConfig): Card {
    return new Card(
        {
            ...config,
            username: "User Not Found",
        } as Required<IConfig>,
        {
            username: "User Not Found",
            profile: {
                name: "User Not Found",
                avatar: "",
                ranking: 0,
                about: "",
                country: "",
                skills: [],
                school: "",
                reputation: 0,
            },
            problem: {
                all: {
                    solved: 0,
                    total: 0,
                },
                easy: {
                    solved: 0,
                    total: 0,
                },
                medium: {
                    solved: 0,
                    total: 0,
                },
                hard: {
                    solved: 0,
                    total: 0,
                },
            },
            activity: [],
        } as any,
    );
}

export default Card;
export { get_404_card };
