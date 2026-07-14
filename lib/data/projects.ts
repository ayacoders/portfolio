export type Project = {
  title: string
  description: string
  image: string
  repoUrl: string
  liveUrl?: string
}

export const projects: Project[] = [
  {
    title: "Tempus",
    description:
      "A minimal pomodoro timer for your terminal. Built with Bun and OpenTUI.",
    image: "/images/projects/tempus.png",
    repoUrl: "https://github.com/ayacoders/tempus",
  },
]
