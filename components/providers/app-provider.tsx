"use client"

import { type ReactNode } from "react"

import { ThemeProvider } from "@/components/theme-provider"
import { TooltipProvider } from "@/components/ui/tooltip"

type AppProviderProps = {
  children: ReactNode
}

export function AppProvider({ children }: AppProviderProps) {
  return (
    <TooltipProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </TooltipProvider>
  )
}
