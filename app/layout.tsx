import { Geist_Mono, Inter, Space_Grotesk } from "next/font/google"

import "./globals.css"
import { AppProvider } from "@/components/providers/app-provider"
import { cn } from "@/lib/utils"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk-family",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        inter.variable,
        spaceGrotesk.variable
      )}
    >
      <body>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  )
}
