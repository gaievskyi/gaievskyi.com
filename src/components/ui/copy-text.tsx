"use client"

import {
  CheckIcon,
  type CheckIconHandle,
} from "@/components/animated-icons/check"
import { CopyIcon, type CopyIconHandle } from "@/components/animated-icons/copy"
import { Text } from "@/components/ui/typography/text"
import { useRef, useState } from "react"

export function CopyText({ content }: { content: string }) {
  const copyIconRef = useRef<CopyIconHandle>(null)
  const checkIconRef = useRef<CheckIconHandle>(null)
  const [isCopied, setIsCopied] = useState(false)

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(content)
    setIsCopied(true)
    setTimeout(() => {
      checkIconRef.current?.startAnimation()
    }, 50)
    setTimeout(() => {
      checkIconRef.current?.stopAnimation()
      setTimeout(() => {
        setIsCopied(false)
      }, 200)
    }, 2000)
  }

  return (
    <Text
      onClick={copyToClipboard}
      size="sm"
      className="inline-flex cursor-copy items-center gap-2"
    >
      {content}{" "}
      {isCopied ? (
        <CheckIcon ref={checkIconRef} size={14} />
      ) : (
        <CopyIcon ref={copyIconRef} size={14} />
      )}
    </Text>
  )
}
