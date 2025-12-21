"use client"

import { TooltipProvider } from "@/components/ui/tooltip"
import { LazyMotion } from "motion/react"
import { ThemeProvider } from "next-themes"
import type { PropsWithChildren } from "react"

const domAnimation = () => import("./dom-animation").then((mod) => mod.default)

export function Providers({ children }: PropsWithChildren) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <LazyMotion strict features={domAnimation}>
        <TooltipProvider>{children}</TooltipProvider>
      </LazyMotion>
    </ThemeProvider>
  )
}
