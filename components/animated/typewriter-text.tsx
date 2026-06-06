"use client"

import { useEffect, useMemo, useState } from "react"

import { prefersReducedMotion } from "@/lib/animations/reduced-motion"
import { cn } from "@/lib/utils"

type TypewriterTextProps = {
  className?: string
  delay?: number
  deleteDuration?: number
  pauseDuration?: number
  typeDuration?: number
  words: string[]
}

type TypewriterPhase = "delay" | "type" | "pause" | "delete"

export function TypewriterText({
  className,
  delay = 0.2,
  deleteDuration = 0.45,
  pauseDuration = 1.4,
  typeDuration = 0.75,
  words,
}: TypewriterTextProps) {
  const reduceMotion = typeof window !== "undefined" && prefersReducedMotion()
  const [phase, setPhase] = useState<TypewriterPhase>("delay")
  const [visibleLength, setVisibleLength] = useState(() =>
    reduceMotion ? (words[0]?.length ?? 0) : 0
  )
  const [wordIndex, setWordIndex] = useState(0)

  const currentWord = words[wordIndex % words.length] ?? ""
  const fallbackText = words.join(", ")
  const longestWord = useMemo(
    () =>
      words.reduce(
        (longest, word) => (word.length > longest.length ? word : longest),
        ""
      ),
    [words]
  )

  useEffect(() => {
    if (words.length === 0) {
      return
    }

    if (reduceMotion) {
      return
    }

    const wordLength = Math.max(1, currentWord.length)
    const typeDelay = Math.max(40, (typeDuration * 1000) / wordLength)
    const deleteDelay = Math.max(30, (deleteDuration * 1000) / wordLength)

    const timeout = window.setTimeout(() => {
      if (phase === "delay") {
        setPhase("type")
        return
      }

      if (phase === "type") {
        if (visibleLength < currentWord.length) {
          setVisibleLength((length) => length + 1)
          return
        }

        setPhase("pause")
        return
      }

      if (phase === "pause") {
        setPhase("delete")
        return
      }

      if (visibleLength > 0) {
        setVisibleLength((length) => length - 1)
        return
      }

      setWordIndex((index) => (index + 1) % words.length)
      setPhase("type")
    }, getPhaseDelay())

    return () => {
      window.clearTimeout(timeout)
    }

    function getPhaseDelay() {
      if (phase === "delay") {
        return delay * 1000
      }

      if (phase === "type") {
        return typeDelay
      }

      if (phase === "pause") {
        return pauseDuration * 1000
      }

      return deleteDelay
    }
  }, [
    currentWord,
    delay,
    deleteDuration,
    pauseDuration,
    phase,
    reduceMotion,
    typeDuration,
    visibleLength,
    words,
  ])

  const visibleText = reduceMotion
    ? (words[0] ?? "")
    : currentWord.slice(0, visibleLength)

  return (
    <span className={cn("relative inline-block", className)}>
      <span aria-hidden="true">
        {visibleText.split("").map((letter, index) => (
          <span key={`${letter}-${index}`} className="animate-in fade-in">
            {letter}
          </span>
        ))}
      </span>
      <span className="invisible absolute inset-0" aria-hidden="true">
        {longestWord}
      </span>
      <span className="sr-only">{fallbackText}</span>
    </span>
  )
}
