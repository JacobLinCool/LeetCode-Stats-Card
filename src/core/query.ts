/* eslint-disable @typescript-eslint/no-explicit-any */
import { LeetCode, LeetCodeCN } from "leetcode-query";
import { CN_LANGS_MAP, CN_RESULTS_MAP } from "./constants";
import { FetchedData } from "./types";

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
                easy: {
                    solved:
                        data.user.submits.ac.find((x: any) => x.difficulty === "Easy")?.count || 0,
                    total: data.problems.find((x: any) => x.difficulty === "Easy")?.count || 0,
                },
                medium: {
                    solved:
                        data.user.submits.ac.find((x: any) => x.difficulty === "Medium")?.count ||
                        0,
                    total: data.problems.find((x: any) => x.difficulty === "Medium")?.count || 0,
                },
                hard: {
                    solved:
                        data.user.submits.ac.find((x: any) => x.difficulty === "Hard")?.count || 0,
                    total: data.problems.find((x: any) => x.difficulty === "Hard")?.count || 0,
                },
                ranking: data.user.profile.ranking,
            },
            submissions: data.submissions.map((x: any) => ({
                ...x,
                time: parseInt(x.time) * 1000,
            })),
            contest: data.contest
                ? {
                      rating: data.contest.rating,
                      ranking: data.contest.ranking,
                      badge: data.contest.badge?.name || "",
                  }
                : undefined,
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
                easy: {
                    solved: data.progress.ac.find((x: any) => x.difficulty === "EASY")?.count || 0,
                    total: (Object.values(data.progress) as any[]).reduce(
                        (acc, arr) => acc + arr.find((x: any) => x.difficulty === "EASY").count,
                        0,
                    ),
                },
                medium: {
                    solved:
                        data.progress.ac.find((x: any) => x.difficulty === "MEDIUM")?.count || 0,
                    total: (Object.values(data.progress) as any[]).reduce(
                        (acc, arr) => acc + arr.find((x: any) => x.difficulty === "MEDIUM").count,
                        0,
                    ),
                },
                hard: {
                    solved: data.progress.ac.find((x: any) => x.difficulty === "HARD")?.count || 0,
                    total: (Object.values(data.progress) as any[]).reduce(
                        (acc, arr) => acc + arr.find((x: any) => x.difficulty === "HARD").count,
                        0,
                    ),
                },
                ranking: data.user.ranking,
            },
            submissions: data.submissions.map((x: any) => ({
                title: x.question.title,
                time: x.time * 1000,
                status: CN_RESULTS_MAP[x.status] || "",
                lang: CN_LANGS_MAP[x.lang] || "",
                slug: x.question.slug,
                id: x.id,
            })),
        };

        return result;
    }
}

export default new Query();
