

export const NAV_LINKS = [
    { label: "About", href: "#about", type: "anchor" },
    { label: "Work", href: "#work", type: "anchor" },
    { label: "Testimonials", href: "#testimonials", type: "anchor" },
    { label: "Contact", href: "#contact", type: "anchor" },
    { label: "Login", href: "/login", type: "route" },
];

export const EXTERNAL_LINKS = {
    GITHUB: 'https://github.com/billybrown237',
    GITLAB: 'https://github.com/billybrown237',
    LINKEDIN: 'https://linkedin.com/in/kdbbrown',
    LINKTREE: 'https://linktr.ee/kano_dekou',
    GITHUB_REPO: 'https://github.com/BillyBrown237/billybrown237.github.io',
    TWITTER: 'https://twitter.com/shahsagarm',
    FIGMA: 'https://www.figma.com/@shahsagarm',
    FIGMA_FILE:
        'https://www.figma.com/community/file/1262992249991763120/Personal-Portfolio-Website-Template-%7C-Mobile-%26-Desktop',
};

export const SOCIAL_LINKS = [
    { label: "GitHub",
        href: EXTERNAL_LINKS.GITHUB,
        icon:<i className="fi fi-brands-github text-2xl"></i> },
    {
        label: "Gitlab",
        href: EXTERNAL_LINKS.GITLAB,
        icon: <i className="fi fi-brands-gitlab text-2xl"></i>
    } ,
    {
        label: "LinkedIn",
        href: EXTERNAL_LINKS.LINKEDIN,
        icon: <i className="fi fi-brands-linkedin text-2xl"></i>
    }
]