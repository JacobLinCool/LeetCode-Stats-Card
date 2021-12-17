export type ProblemDifficulty = "All" | "Easy" | "Medium" | "Hard";

export interface ProblemSolved {
    difficulty: ProblemDifficulty;
    count: number;
}

export interface Contributions {
    points: number;
    questionCount: number;
    testcaseCount: number;
}

export interface Profile {
    realName: string;
    websites: string[];
    countryName: string;
    skillTags: string[];
    company?: string;
    school?: string;
    starRating: number;
    aboutMe: string;
    userAvatar: string;
    reputation: number;
    ranking: number;
}

export interface AcSubmissionNum {
    difficulty: ProblemDifficulty;
    count: number;
    submissions: number;
}

export interface TotalSubmissionNum {
    difficulty: ProblemDifficulty;
    count: number;
    submissions: number;
}

export interface SubmitStats {
    acSubmissionNum: AcSubmissionNum[];
    totalSubmissionNum: TotalSubmissionNum[];
}

export interface Badge {
    id: string;
    displayName: string;
    icon: string;
    creationDate: string;
}

export interface User {
    username: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    socialAccounts?: any;
    githubUrl: string;
    contributions: Contributions;
    profile: Profile;
    submissionCalendar: string;
    submitStats: SubmitStats;
    badges: Badge[];
    upcomingBadges: Badge[];
    activeBadge?: Badge;
}

export interface Submission {
    title: string;
    titleSlug: string;
    timestamp: string;
    statusDisplay: string;
    lang: string;
}

export interface Data {
    allQuestionsCount: ProblemSolved[];
    matchedUser: User;
    recentSubmissionList: Submission[];
}
