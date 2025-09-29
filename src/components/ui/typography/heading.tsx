import { cn } from "@/lib/utils"
import { Slot } from "@radix-ui/react-slot"
import type { PropsWithChildren } from "react"
import {
  typographyVariants,
  type TypographyVariants,
} from "./typography-variants"

type HeadingBaseProps = PropsWithChildren & {
  className?: string
}

type HeadingAsChildProps = {
  asChild: true
  as?: never
}
type HeadingAsProps = {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
  asChild?: false
}
type HeadingProps = HeadingBaseProps &
  TypographyVariants &
  (HeadingAsChildProps | HeadingAsProps)

function Heading({
  children,
  className,
  asChild = false,
  as: Tag = "h1",
  weight = "normal",
  size = "base",
  italic = false,
  color = "default",
  ...headingProps
}: HeadingProps) {
  const Component = asChild ? Slot : Tag
  return (
    <Component
      {...headingProps}
      className={cn(
        typographyVariants({ size, weight, italic, color }),
        className,
      )}
    >
      {children}
    </Component>
  )
}

export { Heading }
export type { HeadingProps }
