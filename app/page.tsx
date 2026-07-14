import { ScrollSnap } from "@/components/animated/scroll-snap"
import { AppHeader } from "@/components/layout/app-header"
import HeroSection from "@/components/portfolio/hero-section"
import SkillsSection from "@/components/portfolio/skills-section"

export default function Page() {
  return (
    <div className="flex h-svh flex-col">
      <AppHeader />
      <main className="min-h-0 flex-1">
        <ScrollSnap className="h-full overflow-y-auto">
          <HeroSection />
          <SkillsSection />
        </ScrollSnap>
      </main>
    </div>
  )
}
