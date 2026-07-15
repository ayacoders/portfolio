# Contact Me Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the empty, unused Achievements section with a Contact Me section showing Gmail, GitHub, and LinkedIn links, in the same slot in the page's scroll order.

**Architecture:** A `LinkedinIcon` component fills the icon gap left by upstream removal of the LinkedIn brand icon. A `lib/data/contact.ts` data file lists the three contact links (label, href, icon component), following the existing `lib/data/skills.ts` pattern. A `ContactSection` component renders that data as a row of `Badge` pills (icon + label), following the existing `skills-section.tsx` / `projects-section.tsx` structural pattern. `app/page.tsx` swaps `AchievementsSection` for `ContactSection`. The old, empty `achievements-section.tsx` and `achievements.ts` are deleted.

**Tech Stack:** Next.js 16 (App Router), React, Tailwind v4, shadcn/ui `Badge` (Radix `Slot`), `@icons-pack/react-simple-icons` (`SiGmail`, `SiGithub`).

## Global Constraints

- No semicolons, double quotes, 2-space tabs, `es5` trailing commas, 80 print width (Prettier — enforced by `lint-staged` on commit, don't fight it).
- No test suite is configured in this repo — verification is `bun run check` (lint + typecheck) plus manual visual check via `bun run dev`, not automated tests.
- Path alias `@/*` maps to repo root.
- Contact details (verbatim): Gmail `bandebasethanpatrick25@gmail.com`, GitHub `https://github.com/ayacoders`, LinkedIn `https://www.linkedin.com/in/ayacoders`.

---

### Task 1: LinkedIn icon component

**Files:**

- Create: `components/portfolio/linkedin-icon.tsx`

**Interfaces:**

- Produces: `LinkedinIcon` — a `React.forwardRef` SVG component accepting `{ title?: string; color?: string; size?: string | number } & React.SVGProps<SVGSVGElement>`, matching the shape of `@icons-pack/react-simple-icons`' `IconType` (see `SiGithub`/`SiGmail` for the pattern being matched) so it can sit in the same array and be invoked as `<link.icon color="currentColor" />` without special-casing.

- [ ] **Step 1: Write the component**

```tsx
import * as React from "react"

export const LinkedinIcon = React.forwardRef<
  SVGSVGElement,
  React.SVGProps<SVGSVGElement> & {
    title?: string
    color?: string
    size?: string | number
  }
>(function LinkedinIcon(
  { title = "LinkedIn", color = "currentColor", size = 24, ...props },
  ref
) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill={color}
      viewBox="0 0 24 24"
      ref={ref}
      {...props}
    >
      <title>{title}</title>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
})
```

- [ ] **Step 2: Verify it typechecks**

Run: `bun run typecheck`
Expected: no errors (the new file isn't imported anywhere yet, so this just confirms the file itself is valid TSX).

- [ ] **Step 3: Commit**

```bash
git add components/portfolio/linkedin-icon.tsx
git commit -m "feat: add LinkedIn icon component"
```

---

### Task 2: Contact data file

**Files:**

- Create: `lib/data/contact.ts`

**Interfaces:**

- Consumes: `LinkedinIcon` from `components/portfolio/linkedin-icon.tsx` (Task 1); `SiGmail`, `SiGithub`, `IconType` from `@icons-pack/react-simple-icons`.
- Produces: `ContactLink` type (`{ label: string; href: string; icon: IconType }`) and `contactLinks: ContactLink[]`, consumed by `ContactSection` (Task 3).

- [ ] **Step 1: Write the data file**

```ts
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
    label: "bandebasethanpatrick25@gmail.com",
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
```

- [ ] **Step 2: Verify it typechecks**

Run: `bun run typecheck`
Expected: no errors. `LinkedinIcon`'s prop shape must satisfy `IconType` — if this fails, check the forwardRef prop types in Task 1 match (`color`, `size`, `title` all optional, rest spread onto `svg`).

- [ ] **Step 3: Commit**

```bash
git add lib/data/contact.ts
git commit -m "feat: add contact links data"
```

---

### Task 3: Contact section component

**Files:**

- Create: `components/portfolio/contact-section.tsx`

**Interfaces:**

- Consumes: `contactLinks` from `lib/data/contact.ts` (Task 2); `SlideBlurIn` from `@/components/animated/slide-blur-in`; `Badge` from `@/components/ui/badge`.
- Produces: default export `ContactSection` (React component, no props), consumed by `app/page.tsx` (Task 4).

- [ ] **Step 1: Write the component**

```tsx
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
```

- [ ] **Step 2: Verify it typechecks**

Run: `bun run typecheck`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/portfolio/contact-section.tsx
git commit -m "feat: add contact section component"
```

---

### Task 4: Wire into the page and remove Achievements

**Files:**

- Modify: `app/page.tsx`
- Delete: `components/portfolio/achievements-section.tsx`
- Delete: `lib/data/achievements.ts`

**Interfaces:**

- Consumes: `ContactSection` default export from `components/portfolio/contact-section.tsx` (Task 3).

- [ ] **Step 1: Update the import and usage in `app/page.tsx`**

Change:

```tsx
import AchievementsSection from "@/components/portfolio/achievements-section"
```

to:

```tsx
import ContactSection from "@/components/portfolio/contact-section"
```

Note the import ordering: alphabetically `contact-section` sorts before `hero-section`, so the new import line moves above the `HeroSection` import. Full new import block:

```tsx
import { ScrollSnap } from "@/components/animated/scroll-snap"
import { AppHeader } from "@/components/layout/app-header"
import ContactSection from "@/components/portfolio/contact-section"
import HeroSection from "@/components/portfolio/hero-section"
import ProjectsSection from "@/components/portfolio/projects-section"
import SkillsSection from "@/components/portfolio/skills-section"
```

And change the JSX usage:

```tsx
          <HeroSection />
          <SkillsSection />
          <ProjectsSection />
          <ContactSection />
```

- [ ] **Step 2: Delete the old achievements files**

```bash
git rm components/portfolio/achievements-section.tsx lib/data/achievements.ts
```

- [ ] **Step 3: Verify the full check passes**

Run: `bun run check`
Expected: lint and typecheck both pass with no errors (no remaining references to `AchievementsSection` or `lib/data/achievements`).

- [ ] **Step 4: Manually verify in the browser**

Run: `bun run dev`, open the site, scroll to the last section.
Expected: heading reads "Get In **Touch**" (brand-accent color on "Touch"), three pill badges are shown (Gmail address, GitHub, LinkedIn) each with a distinct icon, clicking GitHub/LinkedIn opens the profile in a new tab, clicking the Gmail pill opens a mail compose window. Check both light and dark mode — icons should be visible (`currentColor`) in both.

- [ ] **Step 5: Commit**

```bash
git add app/page.tsx
git commit -m "refactor: replace Achievements section with Contact Me section"
```

---

## Post-plan cleanup

None — this plan's scope is fully self-contained (data + components + page wiring + deletion of the old section).
