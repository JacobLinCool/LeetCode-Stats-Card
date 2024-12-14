import { describe, expect, test } from "vitest";
import { Icon, Ranking, Solved, TotalSolved, Username } from "../elements";

describe("elements", () => {
    test("Icon", () => {
        const icon = Icon();
        expect(icon.stringify().length).toBeGreaterThan(100);
    });

    test("Username", () => {
        const username = Username("username", "us");
        expect(username.stringify().length).toBeGreaterThan(100);
    });

    test("Ranking", () => {
        const ranking = Ranking(1234);
        expect(ranking.stringify().length).toBeGreaterThan(10);
    });

    test("TotalSolved", () => {
        const total_solved = TotalSolved(1234, 123);
        expect(total_solved.stringify().length).toBeGreaterThan(100);
    });

    test("Solved", () => {
        const solved = Solved({
            easy: { solved: 100, total: 200 },
            medium: { solved: 100, total: 200 },
            hard: { solved: 100, total: 200 },
            ranking: 0,
        });
        expect(solved.stringify().length).toBeGreaterThan(100);
    });
});
