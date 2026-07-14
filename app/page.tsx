import { AppHeader } from "@/components/layout/app-header"
import HeroSection from "@/components/portfolio/hero-section"
import SkillsSection from "@/components/portfolio/skills-section"

export default function Page() {
  return (
    <div className="flex h-svh flex-col">
      <AppHeader />
      <main className="min-h-0 flex-1 snap-y snap-mandatory overflow-y-auto scroll-smooth">
        <HeroSection />
        <SkillsSection />
      </main>
    </div>
  )
}
