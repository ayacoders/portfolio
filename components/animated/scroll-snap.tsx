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

// Builds the list of scroll positions a section should stop at: one stop at
// its top if it fits the viewport, or one stop per viewport-height of
// content (ending exactly at its bottom) if it doesn't.
function stopsForSection(top: number, height: number, viewport: number) {
  const maxScroll = Math.max(0, height - viewport)

  if (maxScroll === 0) {
    return [top]
  }

  const stops = [top]
  let offset = viewport

  while (offset < maxScroll) {
    stops.push(top + offset)
    offset += viewport
  }

  stops.push(top + maxScroll)

  return stops
}

function computeStops(container: HTMLElement) {
  const viewport = container.clientHeight

  return Array.from(container.children).flatMap((section) => {
    if (!(section instanceof HTMLElement)) {
      return []
    }

    return stopsForSection(section.offsetTop, section.offsetHeight, viewport)
  })
}

function closestStopIndex(stops: number[], scrollTop: number) {
  let index = 0

  for (let i = 0; i < stops.length; i++) {
    if (stops[i] <= scrollTop + 1) {
      index = i
    }
  }

  return index
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

      let stops = computeStops(container)
      let animating = false

      const resizeObserver = new ResizeObserver(() => {
        stops = computeStops(container)
      })

      Array.from(container.children).forEach((section) => {
        resizeObserver.observe(section)
      })

      const goTo = (direction: 1 | -1) => {
        if (animating) {
          return
        }

        const currentIndex = closestStopIndex(stops, container.scrollTop)
        const nextIndex = gsap.utils.clamp(
          0,
          stops.length - 1,
          currentIndex + direction
        )

        if (nextIndex === currentIndex) {
          return
        }

        animating = true
        gsap.to(container, {
          duration: animationDurations.normal,
          ease: animationEases.inOut,
          scrollTo: { y: stops[nextIndex] },
          onComplete: () => {
            animating = false
          },
        })
      }

      Observer.create({
        preventDefault: true,
        target: container,
        tolerance: 10,
        type: "wheel,touch",
        wheelSpeed: -1,
        onDown: () => goTo(-1),
        onUp: () => goTo(1),
      })

      return () => resizeObserver.disconnect()
    },
    { scope }
  )

  return (
    <div ref={scope} className={cn(className)}>
      {children}
    </div>
  )
}
