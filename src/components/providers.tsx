import { TooltipProvider } from "@/components/ui/tooltip"
import { ThemeProvider } from "next-themes"
import type { PropsWithChildren } from "react"

export function Providers({ children }: PropsWithChildren) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <TooltipProvider>{children}</TooltipProvider>
    </ThemeProvider>
  )
}
