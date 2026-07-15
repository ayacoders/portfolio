import { SlideBlurIn } from "@/components/animated/slide-blur-in"
import { Badge } from "@/components/ui/badge"
import { contactLinks } from "@/lib/data/contact"

export default function ContactSection() {
  return (
    <section className="flex h-full w-full shrink-0 items-center justify-center px-6 py-12 md:py-20">
      <SlideBlurIn className="mx-auto flex w-full max-w-4xl flex-col gap-8">
        <h2 className="mx-auto font-space-grotesk text-4xl leading-none font-semibold text-balance md:text-5xl">
          Get In <span className="text-brand-accent">Touch</span>
        </h2>

        <div className="flex flex-wrap justify-center gap-3">
          {contactLinks.map((link) => {
            const isMailto = link.href.startsWith("mailto:")
            return (
              <Badge
                key={link.label}
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
            )
          })}
        </div>
      </SlideBlurIn>
    </section>
  )
}
