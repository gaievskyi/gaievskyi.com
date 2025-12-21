"use client"

import {
  useSyncExternalStore,
  type PropsWithChildren,
  type ReactNode,
} from "react"

const noop = () => () => {}

type ClientOnlyProps = PropsWithChildren & { fallback?: ReactNode }

export function ClientOnly({ children, fallback = null }: ClientOnlyProps) {
  const isServer = useSyncExternalStore(
    noop,
    () => false,
    () => true,
  )
  return isServer ? fallback : children
}
