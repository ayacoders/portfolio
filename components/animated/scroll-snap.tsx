"use client"

import { useRef, type ReactNode } from "react"

import { animationDurations, animationEases } from "@/lib/animations/constants"
import { gsap, Observer, useGSAP } from "@/lib/animations/gsap"
import { prefersReducedMotion } from "@/lib/animations/reduced-motion"
import { cn } from "@/lib/utils"

type ScrollSnapProps = {
  children: ReactNode
  className?: string
}

export function ScrollSnap({ children, className }: ScrollSnapProps) {
  const scope = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const container = scope.current
      const sectionCount = container?.children.length ?? 0

      if (!container || prefersReducedMotion() || sectionCount < 2) {
        return
      }

      let index = 0
      let animating = false

      const goToSection = (next: number) => {
        next = gsap.utils.clamp(0, sectionCount - 1, next)

        if (animating || next === index) {
          return
        }

        animating = true
        gsap.to(container, {
          duration: animationDurations.normal,
          ease: animationEases.inOut,
          scrollTo: { y: next * container.clientHeight },
          onComplete: () => {
            animating = false
            index = next
          },
        })
      }

      Observer.create({
        preventDefault: true,
        target: container,
        tolerance: 10,
        type: "wheel,touch,pointer",
        wheelSpeed: -1,
        onDown: () => goToSection(index - 1),
        onUp: () => goToSection(index + 1),
      })
    },
    { scope }
  )

  return (
    <div ref={scope} className={cn(className)}>
      {children}
    </div>
  )
}
