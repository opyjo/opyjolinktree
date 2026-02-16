export type AppLink = {
  name: string;
  url: string;
  description: string;
  tag?: string;
};

export const appLinks: AppLink[] = [
  {
    name: "Portfolio",
    url: "https://example.com",
    description: "My personal site and writing.",
    tag: "featured"
  },
  {
    name: "TaskFlow",
    url: "https://example.com",
    description: "A minimal project tracker for teams."
  },
  {
    name: "AudioLab",
    url: "https://example.com",
    description: "Generate custom playlists with AI."
  }
];
