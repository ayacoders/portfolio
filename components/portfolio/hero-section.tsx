import Image from "next/image"

import { FadeIn } from "@/components/animated/fade-in"
import { Float } from "@/components/animated/float"
import { WordSequenceText } from "@/components/animated/word-sequence-text"

const heroRoles = ["Builder.", "Designer.", "Developer."]

export default function HeroSection() {
  return (
    <section className="flex h-full w-full shrink-0 snap-start items-center justify-center px-6 py-12 md:py-20">
      <FadeIn className="mx-auto flex w-full max-w-4xl">
        <div className="w-full">
          <Float
            className="flex w-full flex-col items-center gap-6 md:flex-row md:justify-center md:gap-12"
            distance={8}
            duration={3.5}
          >
            {/* Profile Section */}
            <div className="flex w-full justify-center md:block md:w-auto md:shrink-0 md:basis-64">
              <Image
                src="/images/profile.jpeg"
                alt="Portrait of Ethan Patrick"
                width={420}
                height={420}
                priority
                className="aspect-square w-full max-w-56 rounded-2xl border border-border object-cover shadow-sm md:max-w-64"
              />
            </div>

            {/* Text Section */}
            <div className="w-full max-w-2xl min-w-0">
              <h3 className="font-mono text-xs tracking-widest text-muted-foreground">
                Hi! I am
              </h3>

              <h1 className="-ml-1 font-space-grotesk text-5xl leading-none font-semibold text-balance text-brand-accent md:-ml-1 md:text-6xl lg:-ml-1 lg:text-7xl">
                Ethan Patrick
              </h1>

              <p className="max-w-xl text-muted-foreground">
                Computer Science graduate building accessible web experiences,
                with experience across national hackathons and collaborative
                projects.
              </p>

              <h4 className="mt-1 font-space-grotesk text-xl leading-none font-bold text-balance md:text-3xl">
                <WordSequenceText words={heroRoles} />
              </h4>
            </div>
          </Float>
        </div>
      </FadeIn>
    </section>
  )
}
