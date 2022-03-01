import type { LeetCodeGraphQLQuery } from "leetcode-query";

export default function (username: string): LeetCodeGraphQLQuery {
    return {
        operationName: "getUserProfile",
        variables: { username },
        query: `
        query getUserProfile($username: String!) {
            allQuestionsCount { difficulty count }
            matchedUser(username: $username) {
                username
                profile { 
                    realName aboutMe userAvatar skillTags countryName ranking
                }
                submitStats {
                    acSubmissionNum { difficulty count }
                }
            }
            recentSubmissionList(username: $username, limit: 10) {
                title titleSlug timestamp statusDisplay lang
            }
        }
        `,
    };
}
