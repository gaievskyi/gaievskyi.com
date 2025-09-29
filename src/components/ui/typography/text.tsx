import { cn } from "@/lib/utils"
import { Slot } from "@radix-ui/react-slot"
import type { PropsWithChildren } from "react"
import {
  typographyVariants,
  type TypographyVariants,
} from "./typography-variants"

type TextBaseProps = PropsWithChildren & {
  className?: string
}

type TextAsChildProps = {
  asChild: true
  as?: never
}
type TextAsProps = {
  as?: "span" | "div" | "label" | "sup" | "p"
  asChild?: false
}
type TextProps = TextBaseProps &
  TypographyVariants &
  (TextAsChildProps | TextAsProps)

function Text({
  children,
  className,
  asChild = false,
  as: Tag = "p",
  size = "base",
  weight = "normal",
  italic = false,
  color = "default",
  ...textProps
}: TextProps) {
  const Component = asChild ? Slot : Tag
  return (
    <Component
      {...textProps}
      className={cn(
        "leading-normal tracking-normal",
        typographyVariants({ size, weight, italic, color }),
        className,
      )}
    >
      {children}
    </Component>
  )
}

export { Text }
export type { TextProps }
