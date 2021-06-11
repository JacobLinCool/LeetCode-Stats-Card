import { svg_tag } from "./svg.js";
import { leetcode_icon } from "./img.js";
import { style } from "./style.js";

function leetcode_card(data, parameters) {
    const [svg_start_tag, svg_close_tag] = svg_tag(parameters.width, parameters.height);
    return `${svg_start_tag}
<style>${style(parameters)}</style>
<rect id="background" stroke="lightgray" stroke-width="1" width="498" height="198" x="0.5" y="0.5" rx="4" />
<g id="icon" transform="translate(20, 15)">${leetcode_icon(30, 30)}</g>
<text id="username" transform="translate(65, 40)" style="font-size: 24px;">${data.username}</text>
<text id="rank" class="sub" text-anchor="end" transform="translate(480, 40)" style="font-size: 18px;">#${
        data.profile.ranking > 100000 ? "100000+" : data.profile.ranking
    }</text>

<g transform="translate(30, 85)">
    <circle class="circle_bg" cx="40" cy="40" r="40" stroke="lightgray" stroke-width="6" />
    <circle class="circle" cx="40" cy="40" r="40" stroke="#FFA116" stroke-width="6" stroke-linecap="round" stroke-dasharray="${
        80 * Math.PI * (data.problem.all.solved / data.problem.all.total)
    } 1000" transform-origin="40px 40px" />
    <g>
        <text id="total_solved" x="40" y="40" style="font-size: 28px;" alignment-baseline="central" dominant-baseline="central" text-anchor="middle">${
            data.problem.all.solved
        }</text>
    </g>
</g>

<g transform="translate(160, 80)">
    <g id="easy_solved" transform="translate(0, 0)">
        <text class="difficulty" style="font-size: 18px;">Easy</text>
        <text class="sub solved" text-anchor="end" transform="translate(300, 0)" style="font-size: 16px;">${data.problem.easy.solved} / ${
        data.problem.easy.total
    }</text>
        <line class="progress_bg" x1="0" y1="10" x2="300" y2="10" stroke="lightgray" stroke-width="4" stroke-linecap="round" />
        <line class="progress" x1="0" y1="10" x2="300" y2="10" stroke="#5cb85c" stroke-width="4" stroke-dasharray="${
            300 * (data.problem.easy.solved / data.problem.easy.total)
        } 1000" stroke-linecap="round" />
    </g>
    <g id="medium_solved" transform="translate(0, 40)">
        <text class="difficulty" style="font-size: 18px;">Medium</text>
        <text class="sub solved" text-anchor="end" transform="translate(300, 0)" style="font-size: 16px;">${data.problem.medium.solved} / ${
        data.problem.medium.total
    }</text>
        <line class="progress_bg" x1="0" y1="10" x2="300" y2="10" stroke="lightgray" stroke-width="4" stroke-linecap="round" />
        <line class="progress" x1="0" y1="10" x2="300" y2="10" stroke="#f0ad4e" stroke-width="4" stroke-dasharray="${
            300 * (data.problem.medium.solved / data.problem.medium.total)
        } 1000" stroke-linecap="round" />
    </g>
    <g id="hard_solved" transform="translate(0, 80)">
        <text class="difficulty" style="font-size: 18px;">Hard</text>
        <text class="sub solved" text-anchor="end" transform="translate(300, 0)" style="font-size: 16px;">${data.problem.hard.solved} / ${
        data.problem.hard.total
    }</text>
        <line class="progress_bg" x1="0" y1="10" x2="300" y2="10" stroke="lightgray" stroke-width="4" stroke-linecap="round" />
        <line class="progress" x1="0" y1="10" x2="300" y2="10" stroke="#d9534f" stroke-width="4" stroke-dasharray="${
            300 * (data.problem.hard.solved / data.problem.hard.total)
        } 1000" stroke-linecap="round" />
    </g>
</g>
${svg_close_tag}`;
}

export { leetcode_card };
