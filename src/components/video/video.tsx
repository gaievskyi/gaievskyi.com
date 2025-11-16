import BackgroundVideo from "next-video/background-video"
import type { Asset } from "next-video/dist/assets.js"
import {
  // @ts-expect-error should update to next 16
  unstable_ViewTransition as ViewTransition,
  type PropsWithChildren,
} from "react"

import { cn } from "@/lib/utils"

type VideoProps = PropsWithChildren &
  Readonly<{
    src: Asset
    slug: string
    className?: string
    blurDataUrl?: string
  }>

export function Video({ slug, src, className, blurDataUrl }: VideoProps) {
  return (
    <ViewTransition name={`video-${slug}`}>
      <div
        className={cn(
          "rounded-lg corner-squircle supports-corner:rounded-xl size-full overflow-clip bg-transparent outline-solid outline-1 outline-border",
          className,
        )}
      >
        <BackgroundVideo
          src={src}
          blurDataURL={blurDataUrl}
          muted
          playsInline
          loop
          autoPlay
          className="size-full object-cover"
        />
      </div>
    </ViewTransition>
  )
}
