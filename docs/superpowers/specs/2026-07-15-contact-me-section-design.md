# Contact Me Section — Design

## Context

`AchievementsSection` (`components/portfolio/achievements-section.tsx`) and its data source (`lib/data/achievements.ts`) were scaffolded but never populated — the achievements array is empty and nothing renders. This work replaces that empty section with a real Contact Me section, in the same slot in the page's scroll order.

## Scope

- Remove: `components/portfolio/achievements-section.tsx`, `lib/data/achievements.ts`.
- Add: `lib/data/contact.ts`, `components/portfolio/linkedin-icon.tsx`, `components/portfolio/contact-section.tsx`.
- Update: `app/page.tsx` to render `ContactSection` in place of `AchievementsSection`, same position (last section, after Projects).

## Data — `lib/data/contact.ts`

Follows the existing `lib/data/{skills,projects}.ts` pattern: a typed array of plain data objects, icons imported as components.

```ts
export type ContactLink = {
  label: string
  href: string
  icon: IconType // same shape as @icons-pack/react-simple-icons IconType
}

export const contactLinks: ContactLink[] = [
  {
    label: "bandebasethanpatrick25@gmail.com",
    href: "mailto:bandebasethanpatrick25@gmail.com",
    icon: SiGmail,
  },
  { label: "GitHub", href: "https://github.com/ayacoders", icon: SiGithub },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/ayacoders",
    icon: LinkedinIcon,
  },
]
```

- Gmail and GitHub icons come from `@icons-pack/react-simple-icons` (`SiGmail`, `SiGithub`), already a project dependency (used in `skills-section.tsx`).
- LinkedIn has no icon in either `@icons-pack/react-simple-icons` (removed upstream in Simple Icons v13 at LinkedIn's request) or `lucide-react`. A hand-written inline SVG fills the gap.

## `components/portfolio/linkedin-icon.tsx`

A small SVG icon component matching the `IconType` shape used by simple-icons (`className`, `color`, `size` props, forwarded ref not required), so it can sit in the same `contactLinks` array and render identically to `SiGmail`/`SiGithub` without special-casing in the section component.

## `components/portfolio/contact-section.tsx`

Same structural pattern as `hero-section.tsx` / `skills-section.tsx` / `projects-section.tsx`:

```tsx
<section className="flex h-full w-full shrink-0 items-center justify-center px-6 py-12 md:py-20">
  <SlideBlurIn className="mx-auto flex w-full max-w-4xl flex-col gap-8">
    <h2 className="mx-auto font-space-grotesk text-4xl leading-none font-semibold text-balance md:text-5xl">
      Get In <span className="text-brand-accent">Touch</span>
    </h2>
    <div className="flex flex-wrap justify-center gap-3">
      {contactLinks.map((link) => (
        <Badge asChild key={link.label} variant="outline" className="...">
          <a
            href={link.href}
            target={link.href.startsWith("mailto:") ? undefined : "_blank"}
            rel={link.href.startsWith("mailto:") ? undefined : "noreferrer"}
          >
            <link.icon color="currentColor" />
            {link.label}
          </a>
        </Badge>
      ))}
    </div>
  </SlideBlurIn>
</section>
```

Reuses `Badge` (as `skills-section.tsx` does for icon chips) rendered `asChild` as an anchor, so each contact link is a clickable pill with icon + label. External links (GitHub, LinkedIn) get `target="_blank" rel="noreferrer"`; the `mailto:` link does not.

## `app/page.tsx`

Swap the import and JSX usage of `AchievementsSection` for `ContactSection`, keeping it as the last section after `ProjectsSection`.

## Out of scope

- No contact form (static site, no backend).
- No changes to `AppHeader` (resume download / theme toggle untouched).
