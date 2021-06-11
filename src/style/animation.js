const animations = `
@keyframes fade_in {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}
`
    .split("\n")
    .map((line) => line.trim())
    .join(" ");

const animation_style = [
    [
        "#icon",
        {
            opacity: 0,
        },
    ],
    [
        "#username",
        {
            opacity: 0,
        },
    ],
    [
        "#rank",
        {
            opacity: 0,
        },
    ],
    [
        ".circle_bg",
        {
            opacity: 0,
        },
    ],
    [
        ".circle",
        {
            opacity: 0,
        },
    ],
    [
        "#total_solved",
        {
            opacity: 0,
        },
    ],
    [
        "#easy_solved .difficulty",
        {
            opacity: 0,
        },
    ],
    [
        "#easy_solved .solved",
        {
            opacity: 0,
        },
    ],
    [
        "#easy_solved .progress_bg",
        {
            opacity: 0,
        },
    ],
    [
        "#easy_solved .progress",
        {
            opacity: 0,
        },
    ],
    [
        "#medium_solved .difficulty",
        {
            opacity: 0,
        },
    ],
    [
        "#medium_solved .solved",
        {
            opacity: 0,
        },
    ],
    [
        "#medium_solved .progress_bg",
        {
            opacity: 0,
        },
    ],
    [
        "#medium_solved .progress",
        {
            opacity: 0,
        },
    ],
    [
        "#hard_solved .difficulty",
        {
            opacity: 0,
        },
    ],
    [
        "#hard_solved .solved",
        {
            opacity: 0,
        },
    ],
    [
        "#hard_solved .progress_bg",
        {
            opacity: 0,
        },
    ],
    [
        "#hard_solved .progress",
        {
            opacity: 0,
        },
    ],
];

for (let i = 0; i < animation_style.length; i++) {
    animation_style[i][1].animation = `fade_in 1 0.3s ${0.1 * i}s forwards`;
}

export { animations, animation_style };
