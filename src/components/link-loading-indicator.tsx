"use client"

import { Spinner } from "@/components/ui/spinner"
import { useLinkStatus } from "next/link"

export function LinkLoadingIndicator({
  children,
}: {
  children: React.ReactNode
}) {
  const { pending } = useLinkStatus()
  return pending ? <Spinner size="sm" className="mr-8 bg-current" /> : children
}
