"use client"

import { Download, Moon, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Kbd } from "@/components/ui/kbd"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export function AppHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 w-full px-6 py-4">
      <div className="flex w-full items-center justify-end gap-2">
        <Button asChild variant="ghost">
          <a href="/files/Bandebas_Resume.pdf" download>
            <Download />
            Resume
          </a>
        </Button>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              aria-label="Theme toggle hint"
              variant="ghost"
              size="icon"
              type="button"
            >
              <Sun className="dark:hidden" />
              <Moon className="hidden dark:block" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <span>Press</span>
            <Kbd>D</Kbd>
            <span>to toggle theme</span>
          </TooltipContent>
        </Tooltip>
      </div>
    </header>
  )
}
