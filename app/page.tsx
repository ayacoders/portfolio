import { AppHeader } from "@/components/layout/app-header"
import HeroSection from "@/components/portfolio/hero-section"

export default function Page() {
  return (
    <div className="flex min-h-svh flex-col">
      <AppHeader />
      <main className="flex flex-1 px-6">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center">
          <HeroSection />
        </div>
      </main>
    </div>
  )
}
