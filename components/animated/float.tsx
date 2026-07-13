"use client"

import { useRef, type ReactNode } from "react"

import { animationEases } from "@/lib/animations/constants"
import { gsap, useGSAP } from "@/lib/animations/gsap"
import { prefersReducedMotion } from "@/lib/animations/reduced-motion"
import { cn } from "@/lib/utils"

type FloatProps = {
  children: ReactNode
  className?: string
  distance?: number
  duration?: number
}

export function Float({
  children,
  className,
  distance = 10,
  duration = 3,
}: FloatProps) {
  const scope = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        gsap.set(scope.current, { clearProps: "all" })
        return
      }

      gsap.to(scope.current, {
        duration,
        ease: animationEases.inOut,
        repeat: -1,
        y: distance,
        yoyo: true,
      })
    },
    { dependencies: [distance, duration], scope }
  )

  return (
    <div ref={scope} className={cn(className)}>
      {children}
    </div>
  )
}
