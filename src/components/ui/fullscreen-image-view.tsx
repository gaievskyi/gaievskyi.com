"use client"

import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "@radix-ui/react-dialog"
import { MinimizeIcon, MinusCircle, PlusCircle, X } from "lucide-react"
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch"
import { useRef } from "react"
import Image from "next/image"

const DEFAULT_PLACEHOLDER_URL =
  "https://raw.githubusercontent.com/stackzero-labs/ui/refs/heads/main/public/placeholders/headphone-2.jpg"

type FullscreenImageViewProps = {
  className?: string
  imageTitle?: string
  imageUrl: string
  thumbnailUrl?: string
  placeholderUrl?: string
  showControls?: boolean
}

export const FullscreenImageView = ({
  className,
  imageTitle,
  imageUrl,
  placeholderUrl = DEFAULT_PLACEHOLDER_URL,
  showControls = true,
  thumbnailUrl,
}: FullscreenImageViewProps) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  const onError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    console.error("Image failed to load", event.currentTarget.src)
    event.currentTarget.src = placeholderUrl
  }

  const handleImageClick = (event: React.MouseEvent) => {
    event.stopPropagation()
    closeButtonRef.current?.click()
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className={cn("cursor-zoom-in", className)}>
          <Image
            quality={100}
            src={thumbnailUrl || imageUrl}
            alt={`${imageTitle ?? "Image"} - Preview`}
            width={1000}
            height={1000}
            className="h-auto w-full mb-0 rounded-lg object-contain transition-opacity hover:opacity-90"
            onError={onError}
          />
        </div>
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-xs" />
        <DialogContent className="fixed inset-0 z-[101] flex items-center justify-center bg-transparent p-0">
          <DialogTitle className="sr-only">{imageTitle || "Image"}</DialogTitle>
          <DialogDescription className="sr-only">
            {imageTitle || "Image"}
          </DialogDescription>
          <div className="relative h-full w-full flex items-center justify-center">
            <TransformWrapper
              initialScale={1}
              initialPositionX={0}
              initialPositionY={0}
              minScale={0.5}
              maxScale={2}
              centerOnInit={true}
              centerZoomedOut={true}
              wheel={{ step: 0.5 }}
              doubleClick={{ disabled: true }}
            >
              {({ zoomIn, zoomOut, resetTransform }) => (
                <>
                  <TransformComponent
                    wrapperClass="!w-full !h-full !flex !items-center !justify-center !cursor-zoom-out"
                    contentClass="!flex !items-center !justify-center !w-full !h-full"
                  >
                    <div
                      className="flex items-center justify-center w-full h-full cursor-zoom-out"
                      onClick={handleImageClick}
                    >
                      <img
                        src={imageUrl}
                        alt={`${imageTitle ?? "Image"} - Full`}
                        className="max-h-[90vh] max-w-[90vw] object-contain pointer-events-none"
                        onError={onError}
                        draggable={false}
                      />
                    </div>
                  </TransformComponent>
                  {showControls && (
                    <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-1 rounded-full bg-black/70 p-1 border backdrop-blur-xs">
                      <button
                        onClick={() => zoomOut()}
                        className="rounded-full p-1 text-white transition-colors hover:bg-white/20"
                        aria-label="Zoom out"
                      >
                        <MinusCircle className="size-5" />
                      </button>
                      <button
                        onClick={() => resetTransform()}
                        className="rounded-full p-1 text-white transition-colors hover:bg-white/20"
                        aria-label="Reset zoom"
                      >
                        <MinimizeIcon className="size-5" />
                      </button>
                      <button
                        onClick={() => zoomIn()}
                        className="rounded-full p-1 text-white transition-colors hover:bg-white/20"
                        aria-label="Zoom in"
                      >
                        <PlusCircle className="size-5" />
                      </button>
                    </div>
                  )}
                </>
              )}
            </TransformWrapper>
            <DialogClose asChild>
              <button
                ref={closeButtonRef}
                className="absolute border bg-black/70 top-6 right-6 z-10 rounded-full bg-black/70 p-2 text-white backdrop-blur-xs transition-colors hover:bg-black/80"
                aria-label="Close fullscreen view"
              >
                <X className="size-5" />
              </button>
            </DialogClose>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}
