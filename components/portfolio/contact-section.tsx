import { SlideBlurIn } from "@/components/animated/slide-blur-in"
import { Badge } from "@/components/ui/badge"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { contactLinks } from "@/lib/data/contact"

export function LinkedinIcon({ color = "currentColor" }: { color?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={color}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

export default function ContactSection() {
  return (
    <section className="flex min-h-full w-full shrink-0 items-center justify-center px-6 py-12 md:py-20">
      <SlideBlurIn className="mx-auto flex w-full max-w-4xl flex-col gap-8">
        <h2 className="mx-auto font-space-grotesk text-4xl leading-none font-semibold text-balance md:text-5xl">
          Get In <span className="text-brand-accent">Touch</span>
        </h2>

        <div className="flex flex-wrap justify-center gap-3">
          {contactLinks.map((link) => {
            const isMailto = link.href.startsWith("mailto:")
            return (
              <Tooltip key={link.label}>
                <TooltipTrigger asChild>
                  <Badge
                    asChild
                    variant="outline"
                    className="h-9 gap-2 px-4 text-sm [&>svg]:size-4!"
                  >
                    <a
                      href={link.href}
                      target={isMailto ? undefined : "_blank"}
                      rel={isMailto ? undefined : "noreferrer"}
                    >
                      <link.icon color="currentColor" />
                      {link.label}
                    </a>
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <span>{link.href.replace(/^mailto:/, "")}</span>
                </TooltipContent>
              </Tooltip>
            )
          })}
        </div>
      </SlideBlurIn>
    </section>
  )
}
