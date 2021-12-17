import type * as LeetCodeAPI from "./leetcode_api";
import type { LeetCodeData } from "./types";
import { LeetCode } from "leetcode-query";

const baseurl = "https://leetcode.com";

async function get_leetcode_data(username: string): Promise<LeetCodeData> {
    const cache_key = baseurl + "/graphql/" + username;
    const cache = caches ? await caches.open("leetcode") : null;

    // check cache
    let response = cache ? await cache.match(cache_key) : null;

    if (response) {
        console.log("Cache Hit", response.url, response.headers.get("date"));
    } else {
        const lc = new LeetCode();

        response = new Response(JSON.stringify(await lc.get_user(username)), {
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "s-maxage=60, max-age=60",
                Date: new Date().toUTCString(),
            },
        });

        cache && cache.put(cache_key, response.clone());
    }

    const data = (await response.json()) as LeetCodeAPI.Data;

    return {
        username: data.matchedUser.username,
        profile: {
            name: data.matchedUser.profile.realName || null,
            avatar: data.matchedUser.profile.userAvatar || null,
            about: data.matchedUser.profile.aboutMe,
            country: data.matchedUser.profile.countryName || null,
            skills: data.matchedUser.profile.skillTags,
            company: data.matchedUser.profile.company || null,
            school: data.matchedUser.profile.school || null,
            ranking: data.matchedUser.profile.ranking,
            reputation: data.matchedUser.profile.reputation,
        },
        social: {
            website: data.matchedUser.profile.websites.length ? data.matchedUser.profile.websites[0] : null,
            github: data.matchedUser.githubUrl || null,
        },
        contribution: {
            point: data.matchedUser.contributions.points,
            question: data.matchedUser.contributions.questionCount,
            testcase: data.matchedUser.contributions.testcaseCount,
        },
        calendar: JSON.parse(data.matchedUser.submissionCalendar),
        problem: {
            all: {
                total: (data.allQuestionsCount.find((x) => x.difficulty === "All") || { count: 0 }).count,
                solved: (data.matchedUser.submitStats.acSubmissionNum.find((x) => x.difficulty === "All") || { count: 0 }).count,
            },
            easy: {
                total: (data.allQuestionsCount.find((x) => x.difficulty === "Easy") || { count: 0 }).count,
                solved: (data.matchedUser.submitStats.acSubmissionNum.find((x) => x.difficulty === "Easy") || { count: 0 }).count,
            },
            medium: {
                total: (data.allQuestionsCount.find((x) => x.difficulty === "Medium") || { count: 0 }).count,
                solved: (data.matchedUser.submitStats.acSubmissionNum.find((x) => x.difficulty === "Medium") || { count: 0 }).count,
            },
            hard: {
                total: (data.allQuestionsCount.find((x) => x.difficulty === "Hard") || { count: 0 }).count,
                solved: (data.matchedUser.submitStats.acSubmissionNum.find((x) => x.difficulty === "Hard") || { count: 0 }).count,
            },
        },
        badge: {
            active: data.matchedUser.activeBadge,
            owned: data.matchedUser.badges.map((badge) => {
                if (!badge.icon.includes("http")) badge.icon = baseurl + badge.icon;
                return badge;
            }),
            upcoming: data.matchedUser.upcomingBadges.map((badge) => {
                if (!badge.icon.includes("http")) badge.icon = baseurl + badge.icon;
                return badge;
            }),
        },
        activity: data.recentSubmissionList.map((submission) => {
            return {
                title: submission.title,
                problem: baseurl + "/problems/" + submission.titleSlug + "/",
                lang: submission.lang,
                time: new Date(parseInt(submission.timestamp) * 1000),
                status: submission.statusDisplay,
            };
        }),
    } as LeetCodeData;
}

export { get_leetcode_data };
