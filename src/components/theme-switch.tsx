"use client"

import { ClientOnly } from "@/components/client-only"
import { Button } from "@/components/ui/button"
import { Icon } from "@/components/ui/icon"
import { useShortcut } from "@/hooks/use-shortcut"
import { useTheme } from "next-themes"

const getThemeIcon = (theme: string | undefined) => {
  switch (theme) {
    case "light":
      return <Icon name="sprite:sun" className="size-4 text-black" />
    case "dark":
      return <Icon name="sprite:moon" className="size-4 text-white" />
  }
}

const getNextTheme = (currentTheme: string | undefined) => {
  switch (currentTheme) {
    case "light":
      return "dark"
    case "dark":
      return "light"
    default:
      return "light"
  }
}

export function ThemeSwitch() {
  const { theme, setTheme, resolvedTheme } = useTheme()

  useShortcut("cmd+j", () => {
    setTheme(getNextTheme(theme))
  })

  const onToggle = () => {
    setTheme(getNextTheme(theme))
  }

  return (
    <ClientOnly>
      <Button
        type="button"
        variant="outline"
        size="icon-sm"
        onClick={onToggle}
        aria-label="Toggle theme"
      >
        {getThemeIcon(resolvedTheme)}
      </Button>
    </ClientOnly>
  )
}
