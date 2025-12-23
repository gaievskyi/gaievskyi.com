import { clamp } from "@/components/snowfall/utils"
import { CONFIG } from "./config"

export const calculateDeltaTime = (
  currentTime: number,
  lastTime: number,
): number =>
  clamp(
    (currentTime - lastTime) / (1000 / CONFIG.animation.targetFps),
    0,
    CONFIG.animation.maxDeltaMultiplier,
  )
