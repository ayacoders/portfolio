import { ScrollSnap } from "@/components/animated/scroll-snap"
import { AppHeader } from "@/components/layout/app-header"
import HeroSection from "@/components/portfolio/hero-section"
import ProjectsSection from "@/components/portfolio/projects-section"
import SkillsSection from "@/components/portfolio/skills-section"

export default function Page() {
  return (
    <div className="h-svh">
      <AppHeader />
      <main className="h-full">
        <ScrollSnap className="h-full overflow-y-auto">
          <HeroSection />
          <SkillsSection />
          <ProjectsSection />
        </ScrollSnap>
      </main>
    </div>
  )
}
