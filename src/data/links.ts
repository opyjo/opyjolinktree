export type AppLink = {
  name: string;
  url: string;
  description: string;
  tag?: string;
};

export const appLinks: AppLink[] = [
  {
    name: "Portfolio",
    url: "https://yourportfolio.com",
    description: "My personal portfolio and projects.",
    tag: "featured"
  },
  {
    name: "GitHub",
    url: "https://github.com/opyjo",
    description: "Check out my open source projects."
  },
  {
    name: "Linktree App",
    url: "https://opyjolinktree.vercel.app",
    description: "This modern link-in-bio app built with Next.js.",
    tag: "new"
  }
];
