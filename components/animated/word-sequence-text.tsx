"use client"

import { useRef } from "react"

import { animationDurations, animationEases } from "@/lib/animations/constants"
import { gsap, useGSAP } from "@/lib/animations/gsap"
import { prefersReducedMotion } from "@/lib/animations/reduced-motion"
import { cn } from "@/lib/utils"

type WordSequenceTextProps = {
  className?: string
  delay?: number
  pauseDuration?: number
  revealDuration?: number
  words: string[]
}

export function WordSequenceText({
  className,
  delay = 0.2,
  pauseDuration = 0.65,
  revealDuration = animationDurations.normal,
  words,
}: WordSequenceTextProps) {
  const scope = useRef<HTMLSpanElement>(null)

  useGSAP(
    () => {
      const items = scope.current
        ? Array.from(scope.current.querySelectorAll("[data-word]")).filter(
            (item): item is HTMLElement => item instanceof HTMLElement
          )
        : []

      if (items.length === 0) {
        return
      }

      if (prefersReducedMotion()) {
        gsap.set(items, { autoAlpha: 1, clearProps: "transform" })
        return
      }

      gsap.set(items, { autoAlpha: 0, y: 10 })

      const interval = revealDuration + pauseDuration
      const timeline = gsap.timeline({ delay })

      items.forEach((item, index) => {
        timeline.to(
          item,
          {
            autoAlpha: 1,
            duration: revealDuration,
            ease: animationEases.out,
            y: 0,
          },
          index * interval
        )
      })
    },
    { dependencies: [delay, pauseDuration, revealDuration, words], scope }
  )

  return (
    <span
      ref={scope}
      className={cn("inline-flex flex-wrap gap-x-2 gap-y-1", className)}
    >
      <span className="sr-only">{words.join(" ")}</span>
      {words.map((word, index) => (
        <span
          key={word}
          aria-hidden="true"
          className={cn(index === words.length - 1 && "text-brand-accent")}
          data-word
        >
          {word}
        </span>
      ))}
    </span>
  )
}
