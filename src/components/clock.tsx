"use client"

import NumberFlow, { NumberFlowGroup } from "@number-flow/react"
import { useEffect, useState } from "react"
import { Text } from "@/components/ui/typography/text"

function useClock() {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const updateClock = () => {
      const now = new Date()
      setCurrentTime(now)
    }

    updateClock()
    const intervalId = setInterval(updateClock, 1000)

    return () => clearInterval(intervalId)
  }, [])

  const hours = currentTime.getHours()
  const minutes = currentTime.getMinutes()
  const seconds = currentTime.getSeconds()

  return {
    currentTime,
    hours,
    minutes,
    seconds,
  }
}

export function Clock() {
  const { currentTime, hours, minutes, seconds } = useClock()

  return (
    <time
      suppressHydrationWarning
      dateTime={currentTime.toISOString()}
      className="text-muted-foreground2 inline-flex items-baseline gap-1"
    >
      <NumberFlowGroup>
        <Text as="span" size="sm" className="flex items-baseline tabular-nums">
          <NumberFlow
            trend={1}
            value={hours}
            format={{ minimumIntegerDigits: 2 }}
          />
          <NumberFlow
            prefix=":"
            trend={1}
            value={minutes}
            digits={{ 1: { max: 5 } }}
            format={{ minimumIntegerDigits: 2 }}
          />
          <NumberFlow
            prefix=":"
            trend={1}
            value={seconds}
            digits={{ 1: { max: 5 } }}
            format={{ minimumIntegerDigits: 2 }}
          />
        </Text>
      </NumberFlowGroup>
    </time>
  )
}
