import { ScrollSnap } from "@/components/animated/scroll-snap"
import { AppHeader } from "@/components/layout/app-header"
import { SectionNav } from "@/components/layout/section-nav"
import ContactSection from "@/components/portfolio/contact-section"
import HeroSection from "@/components/portfolio/hero-section"
import ProjectsSection from "@/components/portfolio/projects-section"
import SkillsSection from "@/components/portfolio/skills-section"

export default function Page() {
  return (
    <div className="h-svh">
      <AppHeader />
      <SectionNav />
      <main className="h-full">
        <ScrollSnap className="h-full [scrollbar-width:none] overflow-y-auto [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          <HeroSection />
          <SkillsSection />
          <ProjectsSection />
          <ContactSection />
        </ScrollSnap>
      </main>
    </div>
  )
}
