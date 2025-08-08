import { Generator } from "./card";

export interface Config {
    username: string;
    site: "us" | "cn";

    width: number;
    height: number;

    css: string[];

    extensions: ExtensionInit[];

    colors?: string[];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
}

export type Extension = (
    generator: Generator,
    data: FetchedData,
    body: Record<string, (...args: unknown[]) => Item>,
    styles: string[],
) => Promise<void> | void;

export type ExtensionInit = (generator: Generator) => Promise<Extension> | Extension;

export interface FetchedData {
    profile: {
        username: string;
        realname: string;
        about: string;
        avatar: string;
        skills: string[];
        country: string;
    };

    problem: {
        easy: {
            solved: number;
            total: number;
        };
        medium: {
            solved: number;
            total: number;
        };
        hard: {
            solved: number;
            total: number;
        };
        ranking: number;
    };

    submissions: {
        title: string;
        lang: string;
        time: number;
        status: string;
        id: string;
        slug: string;
    }[];

    contest?: {
        rating: number;
        ranking: number;
        badge: string;
    };

    [key: string]: unknown;
}

export interface Item {
    type: string;
    attr: Record<string, string[] | string | number>;
    style: Record<string, string | number>;
    single?: boolean;
    children?: Item[];
    content?: string;
}
