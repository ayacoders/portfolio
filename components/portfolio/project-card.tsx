import { SiGithub } from "@icons-pack/react-simple-icons"
import { ExternalLink } from "lucide-react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import type { Project } from "@/lib/data/projects"

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Card size="sm">
      <Image
        loading="eager"
        src={project.image}
        alt={`${project.title} preview`}
        width={640}
        height={360}
        className="aspect-video w-full object-cover"
      />

      <CardHeader>
        <CardTitle>{project.title}</CardTitle>
        <CardDescription>{project.description}</CardDescription>
      </CardHeader>

      <CardFooter className="flex justify-end gap-1 border-t-0 bg-transparent">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button asChild variant="ghost" size="lg">
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} repository`}
              >
                <SiGithub color="default" className="dark:invert" />
              </a>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Repository</TooltipContent>
        </Tooltip>

        {project.liveUrl && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button asChild variant="ghost" size="icon-xs">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.title} live site`}
                >
                  <ExternalLink />
                </a>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Live site</TooltipContent>
          </Tooltip>
        )}
      </CardFooter>
    </Card>
  )
}
