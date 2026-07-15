import { SlideBlurIn } from "@/components/animated/slide-blur-in"
import { ProjectCard } from "@/components/portfolio/project-card"
import { projects } from "@/lib/data/projects"

export default function ProjectsSection() {
  return (
    <section className="flex min-h-full w-full shrink-0 justify-center px-6 py-12 md:py-20">
      <SlideBlurIn className="mx-auto flex w-full max-w-4xl flex-col gap-8">
        <h2 className="mx-auto font-space-grotesk text-4xl leading-none font-semibold text-balance md:text-5xl">
          Featured <span className="text-brand-accent">Projects</span>
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </SlideBlurIn>
    </section>
  )
}
