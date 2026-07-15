import { SiGithub, SiGmail } from "@icons-pack/react-simple-icons"
import type { IconType } from "@icons-pack/react-simple-icons"

import { LinkedinIcon } from "@/components/portfolio/linkedin-icon"

export type ContactLink = {
  label: string
  href: string
  icon: IconType
}

export const contactLinks: ContactLink[] = [
  {
    label: "Gmail",
    href: "mailto:bandebasethanpatrick25@gmail.com",
    icon: SiGmail,
  },
  {
    label: "GitHub",
    href: "https://github.com/ayacoders",
    icon: SiGithub,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/ayacoders",
    icon: LinkedinIcon,
  },
]
