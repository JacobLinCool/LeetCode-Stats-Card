import { LeetCode, LeetCodeCN } from "leetcode-query";
import LeetCodeQL from "./graphql/leetcode";
import LeetCodeCNQL from "./graphql/leetcode-cn";

interface Data {
    username: string;
    profile: {
        name: string;
        about: string;
        avatar: string;
        skills: string[];
        country: string;
        ranking: number;
    };
    problem: Record<string, any>;
    activity: {
        title: string;
        problem: string;
        lang: string;
        time: Date;
        status: string;
    }[];
}

const CN_LANGS_MAP = {
    A_0: "C++",
    A_1: "Java",
    A_2: "Python",
    A_3: "MySQL",
    A_4: "C",
    A_5: "C#",
    A_6: "JavaScript",
    A_7: "Ruby",
    A_8: "Bash",
    A_9: "Swift",
    A_10: "Go",
    A_11: "Python3",
    A_12: "Scala",
    A_13: "Kotlin",
    A_14: "MS SQL Server",
    A_15: "Oracle",
    A_16: "HTML",
    A_17: "Python ML",
    A_18: "Rust",
    A_19: "PHP",
    A_20: "TypeScript",
    A_21: "Racket",
    A_22: "Erlang",
    A_23: "Elixir",
};

const CN_RESULTS_MAP = {
    A_10: "Accepted",
    A_11: "Wrong Answer",
    A_12: "Memory Limit Exceeded",
    A_13: "Output Limit Exceeded",
    A_14: "Time Limit Exceeded",
    A_15: "Runtime Error",
    A_16: "System Error",
    A_20: "Compile Error",
    A_30: "Timeout",
};

async function get_data(username: string): Promise<Data> {
    const lc = new LeetCode();
    const { data } = (await lc.graphql(LeetCodeQL(username))) as {
        data: {
            allQuestionsCount: {
                difficulty: "All" | "Easy" | "Medium" | "Hard";
                count: number;
            }[];
            matchedUser: {
                username: string;
                profile: {
                    realName: string;
                    aboutMe: string;
                    userAvatar: string;
                    skillTags: string[];
                    countryName: string;
                    ranking: number;
                };
                submitStats: {
                    acSubmissionNum: {
                        difficulty: string;
                        count: number;
                    }[];
                };
            };
            recentSubmissionList: {
                title: string;
                titleSlug: string;
                timestamp: string;
                statusDisplay: string;
                lang: string;
            }[];
        };
    };

    const parsed = {
        username: data.matchedUser.username,
        profile: {
            name: data.matchedUser.profile.realName || "",
            about: data.matchedUser.profile.aboutMe,
            avatar: data.matchedUser.profile.userAvatar || "",
            skills: data.matchedUser.profile.skillTags,
            country: data.matchedUser.profile.countryName || "",
            ranking: data.matchedUser.profile.ranking,
        },
        problem: data.allQuestionsCount.reduce((acc, cur) => {
            acc[cur.difficulty.toLowerCase()] = {
                total: cur.count,
                solved:
                    data.matchedUser.submitStats.acSubmissionNum.find(
                        (x) => x.difficulty === cur.difficulty,
                    )?.count || 0,
            };
            return acc;
        }, {} as Record<string, any>),
        activity: data.recentSubmissionList.map((submission) => ({
            title: submission.title,
            problem: "https://leetcode.com/problems/" + submission.titleSlug + "/",
            lang: submission.lang,
            time: new Date(parseInt(submission.timestamp) * 1000),
            status: submission.statusDisplay,
        })),
    };

    return parsed;
}

async function get_data_cn(username: string): Promise<Data> {
    const lc = new LeetCodeCN();
    const { data } = (await lc.graphql(LeetCodeCNQL(username))) as {
        data: {
            userProfileUserQuestionProgress: {
                numAcceptedQuestions: {
                    difficulty: "EASY" | "MEDIUM" | "HARD";
                    count: number;
                }[];
                numFailedQuestions: {
                    difficulty: "EASY" | "MEDIUM" | "HARD";
                    count: number;
                }[];
                numUntouchedQuestions: {
                    difficulty: "EASY" | "MEDIUM" | "HARD";
                    count: number;
                }[];
            };
            userProfilePublicProfile: {
                username: string;
                siteRanking: number;
                profile: {
                    realName: string;
                    aboutMe: string;
                    userAvatar: string;
                    skillTags: string[];
                    countryName: string;
                };
            };
            recentSubmitted: {
                status: keyof typeof CN_RESULTS_MAP;
                lang: keyof typeof CN_LANGS_MAP;
                submitTime: number;
                question: {
                    questionFrontendId: string;
                    title: string;
                    translatedTitle: string;
                    titleSlug: string;
                };
            }[];
        };
    };

    const parsed = {
        username: data.userProfilePublicProfile.username,
        profile: {
            name: data.userProfilePublicProfile.profile.realName || "",
            about: data.userProfilePublicProfile.profile.aboutMe,
            avatar: data.userProfilePublicProfile.profile.userAvatar || "",
            skills: data.userProfilePublicProfile.profile.skillTags,
            country: data.userProfilePublicProfile.profile.countryName || "",
            ranking: data.userProfilePublicProfile.siteRanking,
        },
        problem: data.userProfileUserQuestionProgress.numAcceptedQuestions.reduce((acc, cur) => {
            acc[cur.difficulty.toLowerCase()] = {
                total: (
                    [
                        "numAcceptedQuestions",
                        "numFailedQuestions",
                        "numUntouchedQuestions",
                    ] as (keyof typeof data.userProfileUserQuestionProgress)[]
                ).reduce(
                    (total, type) =>
                        total +
                        (data.userProfileUserQuestionProgress[type].find(
                            (x) => x.difficulty === cur.difficulty,
                        )?.count || 0),
                    0,
                ),
                solved:
                    data.userProfileUserQuestionProgress.numAcceptedQuestions.find(
                        (x) => x.difficulty === cur.difficulty,
                    )?.count || 0,
            };
            return acc;
        }, {} as Record<string, any>),
        activity: data.recentSubmitted.map((submission) => ({
            title: submission.question.translatedTitle,
            problem: "https://leetcode-cn.com/problems/" + submission.question.titleSlug + "/",
            lang: CN_LANGS_MAP[submission.lang],
            time: new Date(submission.submitTime * 1000),
            status: CN_RESULTS_MAP[submission.status],
        })),
    };

    parsed.problem.all = Object.keys(parsed.problem).reduce(
        (acc, cur) => ({
            total: acc.total + parsed.problem[cur].total,
            solved: acc.solved + parsed.problem[cur].solved,
        }),
        { total: 0, solved: 0 },
    );

    return parsed;
}

export default async function (username: string, site: "us" | "cn" = "us"): Promise<Data> {
    switch (site) {
        case "us":
            return await get_data(username);
        case "cn":
            return await get_data_cn(username);
    }
}
