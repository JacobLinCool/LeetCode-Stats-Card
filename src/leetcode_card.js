import { svg_tag } from "./tag.js";
import { leetcode_icon } from "./img.js";
import { style } from "./style.js";
import { append_extension } from "./extension.js";

function leetcode_card(data, parameters) {
    const [svg_start_tag, svg_close_tag] = svg_tag(parameters.width, parameters.height, 500, parameters.extension == "activity" ? 400 : 200);
    let svg_data = `${svg_start_tag} <style>${style(parameters)}</style>
<g class="leetcode_stats_card theme_${parameters.style}">
    <rect id="background" stroke="lightgray" stroke-width="${parameters.border}" width="${500 - parameters.border}" height="${
        (parameters.extension == "activity" ? 400 : 200) - parameters.border
    }" x="${parameters.border / 2}" y="${parameters.border / 2}" rx="${parameters.border_radius}" />
    <g id="head">
        <g id="icon" transform="translate(20, 15)">${leetcode_icon(30, 30)}</g>
        <text id="username" transform="translate(65, 40)" style="font-size: 24px;">${data.username}</text>
        <text id="rank" class="sub" text-anchor="end" transform="translate(480, 40)" style="font-size: 18px;">#${
            data.profile.ranking > 100000 ? "100000+" : data.profile.ranking
        }</text>
    </g>
    <g id="body">
        <g id="total_solved_circle" transform="translate(30, 5)">
            <circle class="circle_bg" cx="40" cy="40" r="40" stroke-width="6" />
            <circle class="circle" cx="40" cy="40" r="40" stroke="#ffa116" stroke-width="6" stroke-linecap="round" stroke-dasharray="${
                80 * Math.PI * (data.problem.all.solved / data.problem.all.total)
            } 1000" transform-origin="40px 40px" />
            <g>
                <text id="total_solved" x="40" y="40" style="font-size: 28px;" alignment-baseline="central" dominant-baseline="central" text-anchor="middle">${
                    data.problem.all.solved
                }</text>
            </g>
        </g>
        <g id="solved_details" transform="translate(160, 0)">
            <g id="easy_solved" transform="translate(0, 0)">
                <text class="difficulty">Easy</text>
                <text class="sub solved">${data.problem.easy.solved} / ${data.problem.easy.total}</text>
                <line class="progress_bg" x1="0" y1="10" x2="300" y2="10" />
                <line class="progress" x1="0" y1="10" x2="300" y2="10" stroke="#5cb85c" stroke-dasharray="${
                    300 * (data.problem.easy.solved / data.problem.easy.total)
                } 1000" />
            </g>
            <g id="medium_solved" transform="translate(0, 40)">
                <text class="difficulty">Medium</text>
                <text class="sub solved">${data.problem.medium.solved} / ${data.problem.medium.total}</text>
                <line class="progress_bg" x1="0" y1="10" x2="300" y2="10" />
                <line class="progress" x1="0" y1="10" x2="300" y2="10" stroke="#f0ad4e" stroke-dasharray="${
                    300 * (data.problem.medium.solved / data.problem.medium.total)
                } 1000" />
            </g>
            <g id="hard_solved" transform="translate(0, 80)">
                <text class="difficulty">Hard</text>
                <text class="sub solved">${data.problem.hard.solved} / ${data.problem.hard.total}</text>
                <line class="progress_bg" x1="0" y1="10" x2="300" y2="10" />
                <line class="progress" x1="0" y1="10" x2="300" y2="10" stroke="#d9534f" stroke-dasharray="${
                    300 * (data.problem.hard.solved / data.problem.hard.total)
                } 1000" />
            </g>
        </g>
    </g>
    ${append_extension(data, parameters)}
</g>
${svg_close_tag}`;

    return svg_data
        .split("\n")
        .map((line) => line.trim())
        .join(" ");
}

export { leetcode_card };
