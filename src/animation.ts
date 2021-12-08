const animation_css = `
@keyframes fade_in {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
`;

const animation_order = [
    ".icon",
    ".username",
    ".ranking",
    ".ring_bg",
    ".ring",
    ".total_solved",
    ".easy_solved .difficulty",
    ".easy_solved .solved",
    ".easy_solved .progress_bg",
    ".easy_solved .progress",
    ".medium_solved .difficulty",
    ".medium_solved .solved",
    ".medium_solved .progress_bg",
    ".medium_solved .progress",
    ".hard_solved .difficulty",
    ".hard_solved .solved",
    ".hard_solved .progress_bg",
    ".hard_solved .progress",
    ".extension",
];

function circle_animation(selector: string, len = 0, delay = 0) {
    const R = Math.floor(Math.random() * 1000);
    const animation = `@keyframes circle_${R} { 0% { opacity: 0; stroke-dasharray: 0 1000; } 50% { opacity: 1; } 100% { opacity: 1; stroke-dasharray: ${len} 1000; } }`;
    const style = `${selector} { animation: circle_${R} 1.2s ease ${delay}s 1 forwards }`;
    return animation + style;
}

function get_animation_css(total_ratio: number, speed = 1): string {
    let css = animation_css;
    for (let i = 0; i < animation_order.length; i++) {
        css += `${animation_order[i]} {
            opacity: 0;
            animation: fade_in ${0.3 / speed}s ease ${(0.1 * i).toFixed(2)}s 1 forwards;
        }`;
    }

    css += circle_animation(".ring", 80 * Math.PI * total_ratio, 0.7);

    return css;
}

export { get_animation_css };
