import { FadeIn } from "@/components/animated/fade-in"

const skillGroups = [
  {
    title: "Languages",
    items: "Java, C, Python, TypeScript, SQL",
  },
  {
    title: "Frontend",
    items: "Next.js, Nuxt.js, React, Vue, Tailwind CSS",
  },
  {
    title: "Backend & Frameworks",
    items: "NestJS, Express, REST API development",
  },
  {
    title: "Tools & Technologies",
    items: "Git, Postman, MikroORM, Drizzle ORM, Docker, CI/CD workflows",
  },
]

export default function SkillsSection() {
  return (
    <section className="flex h-full w-full shrink-0 snap-start items-center justify-center px-6 py-12 md:py-20">
      <FadeIn className="mx-auto flex w-full max-w-4xl flex-col gap-6">
        <h2 className="font-space-grotesk text-3xl leading-none font-semibold text-balance md:text-4xl">
          Skills & Technologies
        </h2>

        {skillGroups.map((group) => (
          <div key={group.title}>
            <h3 className="font-mono text-xs tracking-widest text-muted-foreground">
              {group.title}
            </h3>
            <p className="text-lg">{group.items}</p>
          </div>
        ))}
      </FadeIn>
    </section>
  )
}
