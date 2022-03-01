import type { LeetCodeGraphQLQuery } from "leetcode-query";

export default function (username: string): LeetCodeGraphQLQuery {
    return {
        operationName: "getUserProfile",
        variables: { username },
        query: `
        query getUserProfile($username: String!) {
            userProfileUserQuestionProgress(userSlug: $username) {
                numAcceptedQuestions { difficulty count }
                numFailedQuestions { difficulty count }
                numUntouchedQuestions { difficulty count }
            }
            userProfilePublicProfile(userSlug: $username) {
                username siteRanking
                profile { 
                    realName aboutMe userAvatar skillTags countryName
                }
            }
            recentSubmitted(userSlug: $username) {
                status lang submitTime
                question { questionFrontendId title translatedTitle titleSlug }
            }
        }
        `,
    };
}
