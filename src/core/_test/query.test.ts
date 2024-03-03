import { describe, expect, test } from "vitest";
import query from "../query";
import { FetchedData } from "../types";

describe("query", () => {
    test("should match types (us)", async () => {
        const data = await query.us("jacoblincool");
        test_types(data);
    });

    test("should match types (cn)", async () => {
        const data = await query.cn("leetcode");
        test_types(data);
    });
});

function test_types(data: FetchedData) {
    expect(typeof data.profile.about).toBe("string");
    expect(typeof data.profile.avatar).toBe("string");
    expect(typeof data.profile.country).toBe("string");
    expect(typeof data.profile.realname).toBe("string");
    for (const skill of data.profile.skills) {
        expect(typeof skill).toBe("string");
    }

    (["easy", "medium", "hard"] as const).forEach((difficulty) => {
        expect(typeof data.problem[difficulty].solved).toBe("number");
        expect(typeof data.problem[difficulty].total).toBe("number");
    });
    expect(typeof data.problem.ranking).toBe("number");

    for (const submission of data.submissions) {
        expect(typeof submission.id).toBe("string");
        expect(typeof submission.slug).toBe("string");
        expect(typeof submission.status).toBe("string");
        expect(typeof submission.title).toBe("string");
        expect(typeof submission.lang).toBe("string");
        expect(submission.time).toBeGreaterThan(0);
    }

    if (data.contest) {
        expect(typeof data.contest.rating).toBe("number");
        expect(typeof data.contest.ranking).toBe("number");
        expect(typeof data.contest.badge).toBe("string");
    }
}
