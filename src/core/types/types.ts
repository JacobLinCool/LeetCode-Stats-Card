export type Ttheme = "default" | "dark" | "auto" | "nord" | "forest" | "wtf" | "unicorn";
export type Tfont = "baloo" | "milonga" | "patrick_hand" | "ruthie" | "source_code_pro" | string;

export type RequiredRecursive<T> = {
    [P in keyof T]-?: RequiredRecursive<T[P]>;
};

export interface IConfig {
    username?: string;
    theme?: Ttheme;
    animation?: boolean;
    width?: number;
    height?: number;
    border?: number;
    border_radius?: number;
    font?: Tfont;
    extension?: string | null;
    show_rank?: boolean;
    site?: "us" | "cn";

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
}

export interface IRawConfig {
    username?: string;
    theme?: string;
    animation?: string;
    width?: string;
    height?: string;
    border?: string;
    border_radius?: string;
    font?: string;
    extension?: string;
    show_rank?: string;
    site?: string;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
}

export interface IThemeConfig {
    colors: {
        background?: string;
        border?: string;
        username?: string;
        ranking?: string;
        total_solved_number?: string;
        total_solved_ring_background?: string;
        total_solved_ring_foreground?: string;
        easy?: {
            text?: string;
            number?: string;
            progress_background?: string;
            progress_foreground?: string;
        };
        medium?: {
            text?: string;
            number?: string;
            progress_background?: string;
            progress_foreground?: string;
        };
        hard?: {
            text?: string;
            number?: string;
            progress_background?: string;
            progress_foreground?: string;
        };
    };
    css?: string;
    svg?: string;
}

export interface LeetCodeProfile {
    name: string;
    avatar: string;
    about: string;
    country: string;
    skills: string[];
    company?: string;
    school: string;
    ranking: number;
    reputation: number;
}

export interface LeetCodeSocial {
    website: string;
    github: string;
}

export interface LeetCodeContribution {
    point: number;
    question: number;
    testcase: number;
}

export interface LeetCodeCalendar {
    [key: string]: number;
}

export interface LeetCodeProblemSingle {
    total: number;
    solved: number;
}

export interface LeetCodeProblem {
    all: LeetCodeProblemSingle;
    easy: LeetCodeProblemSingle;
    medium: LeetCodeProblemSingle;
    hard: LeetCodeProblemSingle;
}

export interface LeetCodeOwned {
    id: string;
    displayName: string;
    icon: string;
    creationDate: string;
}

export interface LeetCodeBadge {
    id: string;
    displayName: string;
    icon: string;
    creationDate: string;
}

export interface LeetCodeBadges {
    active?: LeetCodeBadge;
    owned: LeetCodeBadge[];
    upcoming: LeetCodeBadge[];
}

export interface LeetCodeActivity {
    title: string;
    problem: string;
    lang: string;
    time: Date;
    status: string;
}

export interface LeetCodeData {
    username: string;
    profile: LeetCodeProfile;
    social: LeetCodeSocial;
    contribution: LeetCodeContribution;
    calendar: LeetCodeCalendar;
    problem: LeetCodeProblem;
    badge: LeetCodeBadges;
    activity: LeetCodeActivity[];
}
