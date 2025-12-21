import { useSyncExternalStore, type PropsWithChildren } from "react"

const emptySubscribe = () => () => {}

export function ClientOnly({ children }: PropsWithChildren) {
  const isServer = useSyncExternalStore(
    emptySubscribe,
    () => false,
    () => true,
  )
  return isServer ? null : children
}
