"use client"

import { useRef, type ReactNode } from "react"

import {
  animationDurations,
  animationEases,
  animationStaggers,
} from "@/lib/animations/constants"
import { gsap, useGSAP } from "@/lib/animations/gsap"
import { prefersReducedMotion } from "@/lib/animations/reduced-motion"
import { cn } from "@/lib/utils"

type FadeInProps = {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
  stagger?: number
  y?: number
}

export function FadeIn({
  children,
  className,
  delay = 0,
  duration = animationDurations.normal,
  stagger = animationStaggers.normal,
  y = 16,
}: FadeInProps) {
  const scope = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const items = scope.current
        ? Array.from(scope.current.children).filter(
            (item): item is HTMLElement => item instanceof HTMLElement
          )
        : []

      if (prefersReducedMotion() || items.length === 0) {
        gsap.set(items, { clearProps: "all" })
        return
      }

      gsap.from(items, {
        autoAlpha: 0,
        delay,
        duration,
        ease: animationEases.out,
        stagger,
        y,
      })
    },
    { dependencies: [delay, duration, stagger, y], scope }
  )

  return (
    <div ref={scope} className={cn("min-w-0", className)}>
      {children}
    </div>
  )
}
