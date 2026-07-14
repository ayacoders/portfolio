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

type SlideBlurInProps = {
  children: ReactNode
  className?: string
  blur?: number
  delay?: number
  duration?: number
  stagger?: number
  x?: number
}

export function SlideBlurIn({
  children,
  className,
  blur = 2,
  delay = 0,
  duration = animationDurations.slow,
  stagger = animationStaggers.normal,
  x = -64,
}: SlideBlurInProps) {
  const scope = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const root = scope.current
      const items = root
        ? Array.from(root.children).filter(
            (item): item is HTMLElement => item instanceof HTMLElement
          )
        : []

      if (prefersReducedMotion() || !root || items.length === 0) {
        gsap.set(items, { clearProps: "all" })
        return
      }

      const hiddenState = { autoAlpha: 0, filter: `blur(${blur}px)`, x }
      const visibleState = { autoAlpha: 1, filter: "blur(0px)", x: 0 }

      gsap.set(items, hiddenState)

      const observer = new IntersectionObserver(
        ([entry]) => {
          gsap.killTweensOf(items)

          if (entry.isIntersecting) {
            gsap.to(items, {
              ...visibleState,
              delay,
              duration,
              ease: animationEases.out,
              stagger,
            })
          } else {
            gsap.set(items, hiddenState)
          }
        },
        { threshold: 0.5 }
      )

      observer.observe(root)

      return () => observer.disconnect()
    },
    { dependencies: [blur, delay, duration, stagger, x], scope }
  )

  return (
    <div ref={scope} className={cn("min-w-0", className)}>
      {children}
    </div>
  )
}
