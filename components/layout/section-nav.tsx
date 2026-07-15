"use client"

import { useEffect, useRef, useState } from "react"
import { Code, Folder, Home, Mail } from "lucide-react"

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { animationDurations, animationEases } from "@/lib/animations/constants"
import { gsap, useGSAP } from "@/lib/animations/gsap"
import { prefersReducedMotion } from "@/lib/animations/reduced-motion"
import { cn } from "@/lib/utils"

const sections = [
  { icon: Home, id: "hero", label: "Home" },
  { icon: Code, id: "skills", label: "Skills" },
  { icon: Folder, id: "projects", label: "Projects" },
  { icon: Mail, id: "contact", label: "Contact" },
]

export function SectionNav() {
  const [activeId, setActiveId] = useState(sections[0].id)
  const navRef = useRef<HTMLElement>(null)
  const indicatorRef = useRef<HTMLSpanElement>(null)
  const itemRefs = useRef<Record<string, HTMLAnchorElement | null>>({})
  const hasPositioned = useRef(false)

  useEffect(() => {
    const ratios = new Map<string, number>()

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(entry.target.id, entry.intersectionRatio)
        }

        let maxId = sections[0].id
        let maxRatio = 0

        ratios.forEach((ratio, id) => {
          if (ratio > maxRatio) {
            maxRatio = ratio
            maxId = id
          }
        })

        if (maxRatio > 0) {
          setActiveId(maxId)
        }
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1] }
    )

    sections.forEach(({ id }) => {
      const el = document.getElementById(id)

      if (el) {
        observer.observe(el)
      }
    })

    return () => observer.disconnect()
  }, [])

  useGSAP(
    () => {
      const target = itemRefs.current[activeId]
      const indicator = indicatorRef.current

      if (!target || !indicator) {
        return
      }

      const position = { height: target.offsetHeight, y: target.offsetTop }

      if (prefersReducedMotion() || !hasPositioned.current) {
        gsap.set(indicator, position)
        hasPositioned.current = true
        return
      }

      gsap.to(indicator, {
        ...position,
        duration: animationDurations.fast,
        ease: animationEases.out,
      })
    },
    { dependencies: [activeId], scope: navRef }
  )

  return (
    <nav
      ref={navRef}
      aria-label="Section navigation"
      className="fixed top-1/2 left-4 z-40 hidden -translate-y-1/2 flex-col gap-10 md:flex lg:left-6"
    >
      <span
        ref={indicatorRef}
        aria-hidden="true"
        className="absolute right-0 w-0.5 rounded-full bg-brand-accent"
      />

      {sections.map(({ icon: Icon, id, label }) => {
        const isActive = id === activeId

        return (
          <Tooltip key={id}>
            <TooltipTrigger asChild>
              <a
                ref={(el) => {
                  itemRefs.current[id] = el
                }}
                href={`#${id}`}
                aria-label={label}
                aria-current={isActive ? "true" : undefined}
                onClick={(event) => {
                  event.preventDefault()
                  document.getElementById(id)?.scrollIntoView({
                    behavior: prefersReducedMotion() ? "auto" : "smooth",
                    block: "start",
                  })
                }}
                className={cn(
                  "flex w-10 items-center justify-center pr-3 transition-colors",
                  isActive
                    ? "text-brand-accent"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon className="size-5" />
              </a>
            </TooltipTrigger>
            <TooltipContent side="right">{label}</TooltipContent>
          </Tooltip>
        )
      })}
    </nav>
  )
}
