import { SlideBlurIn } from "@/components/animated/slide-blur-in"
import { Badge } from "@/components/ui/badge"
import { skillGroups } from "@/lib/data/skills"

export default function SkillsSection() {
  return (
    <section className="flex h-full w-full shrink-0 items-center justify-center px-6 py-12 md:py-20">
      <SlideBlurIn className="mx-auto flex w-full max-w-4xl flex-col gap-8">
        <h2 className="mx-auto font-space-grotesk text-4xl leading-none font-semibold text-balance md:text-5xl">
          Skills & <span className="text-brand-accent">Technologies</span>
        </h2>

        {skillGroups.map((group) => (
          <div key={group.title} className="flex flex-col gap-3">
            <h3 className="text-center font-mono text-sm tracking-widest text-muted-foreground">
              {group.title}
            </h3>
            <div className="flex flex-wrap justify-center gap-2">
              {group.items.map((item) => (
                <Badge
                  key={item.name}
                  variant="outline"
                  className="h-7 gap-1.5 px-2.5 text-xs sm:h-8 sm:gap-1.5 sm:px-3 sm:text-sm md:h-9 md:gap-2 md:px-4 md:text-base [&>svg]:size-3.5! sm:[&>svg]:size-4! md:[&>svg]:size-5!"
                >
                  <item.icon
                    color={item.brand ? "default" : "currentColor"}
                    className={item.invertOnDark ? "dark:invert" : undefined}
                  />
                  {item.name}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </SlideBlurIn>
    </section>
  )
}
