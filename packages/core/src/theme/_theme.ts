import { Item } from "../item";

export interface Theme {
    palette: {
        bg?: string[];
        text?: string[];
        color?: string[];
    };
    css: string;
    extends?: Item;
}

export function Theme(theme: Partial<Theme>): Theme {
    const completed: Theme = {
        palette: {
            bg: theme.palette?.bg ?? ["#fff", "#e5e5e5"],
            text: theme.palette?.text ?? ["#000", "#808080"],
            color: theme.palette?.color ?? [],
        },
        css: theme.css ?? "",
        extends: theme.extends ?? undefined,
    };

    while (completed.palette.bg && completed.palette.bg.length < 4) {
        completed.palette.bg.push(completed.palette.bg[completed.palette.bg.length - 1]);
    }
    while (completed.palette.text && completed.palette.text.length < 4) {
        completed.palette.text.push(completed.palette.text[completed.palette.text.length - 1]);
    }

    return completed;
}
