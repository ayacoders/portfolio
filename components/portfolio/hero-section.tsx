import Image from "next/image"

import { FadeIn } from "@/components/animated/fade-in"
import { TypewriterText } from "@/components/animated/typewriter-text"

const heroRoles = ["Builder.", "Designer.", "Developer."]

export default function HeroSection() {
  return (
    <section className="flex w-full flex-1 items-start py-12 md:py-20">
      <FadeIn className="flex w-full flex-col items-center gap-10 md:flex-row md:justify-start md:gap-12">
        <div className="w-full max-w-2xl min-w-0 space-y-4 md:flex-1">
          <h3 className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
            Ethan Patrick &mdash; Full Stack Developer
          </h3>
          <h1 className="font-space-grotesk text-5xl leading-none font-bold text-balance md:text-7xl">
            <TypewriterText words={heroRoles} />
          </h1>
          <p className="max-w-xl text-muted-foreground">
            Computer Science graduate building accessible web experiences, with
            experience across national hackathons and collaborative projects.
          </p>
        </div>

        <div className="flex w-full justify-center md:shrink-0 md:basis-64">
          <Image
            src="/images/profile.jpeg"
            alt="Portrait of Ethan Patrick"
            width={420}
            height={420}
            priority
            className="aspect-square w-full max-w-56 rounded-2xl border border-border object-cover shadow-sm md:max-w-64"
          />
        </div>
      </FadeIn>
    </section>
  )
}
