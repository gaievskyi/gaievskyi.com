import { SplitText } from "@/components/ui/split-text/split-text"
import { cn } from "@/lib/utils"
import "./flip-text.css"

type FlipTextProps = {
  children: string
  className?: string
}

export function FlipText({ children, className }: FlipTextProps) {
  return (
    <SplitText className={cn("animate-flip-on-hover", className)}>
      {children}
    </SplitText>
  )
}
