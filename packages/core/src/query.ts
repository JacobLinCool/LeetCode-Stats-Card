/* eslint-disable @typescript-eslint/no-explicit-any */
import { LeetCode, LeetCodeCN } from "leetcode-query";
import { CN_LANGS_MAP, CN_RESULTS_MAP } from "./constants";
import { FetchedData } from "./types";

interface ProblemCount {
    difficulty: string;
    count: number;
}

interface DifficultyStats {
    solved: number;
    total: number;
}

function getProblemStats(
    difficulty: string,
    acCounts: ProblemCount[],
    totalCounts: ProblemCount[],
): DifficultyStats {
    return {
        solved: acCounts.find((x) => x.difficulty === difficulty)?.count || 0,
        total: totalCounts.find((x) => x.difficulty === difficulty)?.count || 0,
    };
}

function getCNProblemStats(
    difficulty: string,
    progress: Record<string, ProblemCount[]>,
): DifficultyStats {
    return {
        solved: progress.ac.find((x) => x.difficulty === difficulty.toUpperCase())?.count || 0,
        total: (Object.values(progress) as ProblemCount[][]).reduce(
            (acc, arr) =>
                acc + (arr.find((x) => x.difficulty === difficulty.toUpperCase())?.count || 0),
            0,
        ),
    };
}

export class Query {
    async us(username: string, headers?: Record<string, string>): Promise<FetchedData> {
        const lc = new LeetCode();
        const { data } = await lc.graphql({
            operationName: "data",
            variables: { username },
            query: `
            query data($username: String!) {
                problems: allQuestionsCount { 
                    difficulty 
                    count 
                }
                user: matchedUser(username: $username) {
                    username
                    profile { 
                        realname: realName 
                        about: aboutMe 
                        avatar: userAvatar 
                        skills: skillTags 
                        country: countryName 
                        ranking
                    }
                    submits: submitStatsGlobal {
                        ac: acSubmissionNum { difficulty count }
                    }
                }
                submissions: recentSubmissionList(username: $username, limit: 10) {
                    id
                    title 
                    slug: titleSlug 
                    time: timestamp 
                    status: statusDisplay 
                    lang
                }
                contest: userContestRanking(username: $username) {
                    rating
                    ranking: globalRanking
                    badge {
                        name
                    }
                }
            }`,
            headers,
        });

        if (!data?.user) {
            throw new Error("User Not Found");
        }

        const result: FetchedData = {
            profile: {
                username: data.user.username,
                realname: data.user.profile.realname,
                about: data.user.profile.about,
                avatar: data.user.profile.avatar,
                skills: data.user.profile.skills,
                country: data.user.profile.country,
            },
            problem: {
                easy: getProblemStats("Easy", data.user.submits.ac, data.problems),
                medium: getProblemStats("Medium", data.user.submits.ac, data.problems),
                hard: getProblemStats("Hard", data.user.submits.ac, data.problems),
                ranking: data.user.profile.ranking,
            },
            submissions: data.submissions.map((x: { time: string }) => ({
                ...x,
                time: parseInt(x.time) * 1000,
            })),
            contest: data.contest && {
                rating: data.contest.rating,
                ranking: data.contest.ranking,
                badge: data.contest.badge?.name || "",
            },
        };

        return result;
    }

    async cn(username: string, headers?: Record<string, string>): Promise<FetchedData> {
        const lc = new LeetCodeCN();
        const { data } = await lc.graphql({
            operationName: "data",
            variables: { username },
            query: `
            query data($username: String!) {
                progress: userProfileUserQuestionProgress(userSlug: $username) {
                    ac: numAcceptedQuestions { difficulty count }
                    wa: numFailedQuestions { difficulty count }
                    un: numUntouchedQuestions { difficulty count }
                }
                user: userProfilePublicProfile(userSlug: $username) {
                    username 
                    ranking: siteRanking
                    profile { 
                        realname: realName 
                        about: aboutMe 
                        avatar: userAvatar 
                        skills: skillTags 
                        country: countryName
                    }
                }
                submissions: recentSubmitted(userSlug: $username) {
                    id: submissionId
                    status
                    lang 
                    time: submitTime
                    question { 
                        title: translatedTitle 
                        slug: titleSlug 
                    }
                }
            }`,
            headers,
        });

        if (!data?.user) {
            throw new Error("User Not Found");
        }

        const result: FetchedData = {
            profile: {
                username: data.user.username,
                realname: data.user.profile.realname,
                about: data.user.profile.about,
                avatar: data.user.profile.avatar,
                skills: data.user.profile.skills,
                country: data.user.profile.country,
            },
            problem: {
                easy: getCNProblemStats("EASY", data.progress),
                medium: getCNProblemStats("MEDIUM", data.progress),
                hard: getCNProblemStats("HARD", data.progress),
                ranking: data.user.ranking,
            },
            submissions: data.submissions.map(
                (x: {
                    question: { title: any; slug: any };
                    time: number;
                    status: string | number;
                    lang: string | number;
                    id: any;
                }) => ({
                    title: x.question.title,
                    time: x.time * 1000,
                    status: CN_RESULTS_MAP[x.status] || "",
                    lang: CN_LANGS_MAP[x.lang] || "",
                    slug: x.question.slug,
                    id: x.id,
                }),
            ),
        };

        return result;
    }
}

export default new Query();
