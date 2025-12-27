// Single source of truth for all site content
// This data is used by both HTML pages and LLM-friendly markdown endpoints

export const site = {
    title: "Naresh Ramesh",
    description: "Welcome to my website!",
    url: "https://ghostwriternr.me",
};

export const bio = {
    // Used on homepage (Intro component) and in llms.txt
    short: "Building agents at Cloudflare. I enjoy writing, curating music and making origami. Open Source maintainer & supporter. Dreaming of the sky and a prosperous India.",

    // Used on about page - array of paragraphs
    extended: [
        "I'm an optimistic software engineer with a love for writing poetry, curating music, reading fiction, and making origami. I occasionally make pixel art, and dream about a world with unbound access to information.",
        "I tend to value people above all else, both in my personal relationships and at work. I've always found this natural, and able to build systems around this simple truth.",
        "I'm currently spending a lot of time thinking about AI & agents, and converting some of those ideas into code at Cloudflare. Here's a quick overview of what I've been up to the last few years.",
    ],

    // For LLM context - summarizes work history in one line
    workSummary:
        "Previously Co-founder & CTO at CodeStory, where I led engineering for Aide, an open source AI-native IDE. Before that, Tech Lead at Setu, Software Engineer at Intuit, and Google Summer of Code at gRPC.",
};

export type SocialLink = {
    name: string;
    url: string;
    icon:
        | "github"
        | "x"
        | "linkedin"
        | "gmail"
        | "bluesky"
        | "instagram"
        | "ytmusic";
    ariaLabel: string;
};

export const socialLinks: SocialLink[] = [
    {
        name: "GitHub",
        url: "https://github.com/ghostwriternr",
        icon: "github",
        ariaLabel: "GitHub Profile",
    },
    {
        name: "Twitter/X",
        url: "https://twitter.com/ghostwriternr",
        icon: "x",
        ariaLabel: "Twitter Profile",
    },
    {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/naresh-ramesh",
        icon: "linkedin",
        ariaLabel: "LinkedIn Profile",
    },
    {
        name: "Email",
        url: "mailto:ghostwriternr@gmail.com",
        icon: "gmail",
        ariaLabel: "Email me",
    },
    {
        name: "Bluesky",
        url: "https://bsky.app/profile/ghostwriternr.me",
        icon: "bluesky",
        ariaLabel: "Bluesky Profile",
    },
    {
        name: "Instagram",
        url: "https://www.instagram.com/noresh.romesh",
        icon: "instagram",
        ariaLabel: "Instagram Profile",
    },
    {
        name: "YouTube Music",
        url: "https://music.youtube.com/channel/UCxWjIwpCoSwtLGSKxkfJxcw",
        icon: "ytmusic",
        ariaLabel: "YouTube Music Profile",
    },
];

export type WorkExperience = {
    role: string;
    company: string;
    period: string;
    description: string;
    logo: "cloudflare" | "codestory" | "setu" | "intuit" | "grpc";
};

export const workExperience: WorkExperience[] = [
    {
        role: "Senior Systems Engineer",
        company: "Cloudflare",
        period: "Current",
        description:
            "Building the foundation for developers to build and run the next generation of software with AI agents at the core.",
        logo: "cloudflare",
    },
    {
        role: "Co-founder & CTO",
        company: "CodeStory",
        period: "Jul 2023 - Mar 2025",
        description:
            "Led engineering for Aide, an open source AI-native IDE processing 10B+ LLM tokens/day. Built state-of-the-art coding agents, and shipped it within a fork of VSCode. Raised $1.4M pre-seed funding and managed a 2k+ member community.",
        logo: "codestory",
    },
    {
        role: "Tech Lead",
        company: "Setu",
        period: "Jun 2020 - Jul 2023",
        description:
            "Led engineering for a 6-person team working on UPI Deeplinks and BBPS Bill Collect, Setu's highest revenue products. Built the systems for handling payments, refunds and settlements via multiple banks, and an automated merchant onboarding system.",
        logo: "setu",
    },
    {
        role: "Software Engineer",
        company: "Intuit",
        period: "Aug 2018 - May 2020",
        description:
            "Built notification systems for Mint's 4M users and cross-platform GraphQL billing APIs for QuickBooks. Established the company's first Open Source and Inner Source program as Intuit India's site leader.",
        logo: "intuit",
    },
    {
        role: "Google Summer of Code",
        company: "gRPC",
        period: "May 2018 - Jul 2018",
        description:
            "Added support for building gRPC Python with the Bazel build system and integrated with Skylark, Google's internal CI. Due to limited support at the time, wrote custom Skylark rules for the Cython modules to make it work.",
        logo: "grpc",
    },
];

export const notFound = {
    title: "404",
    subtitle: "This page has wandered off somewhere",
    poem: `Not all who wander are lost,
but this page, I fear, is.
A ghost in the machine,
a dream that never was.`,
};
