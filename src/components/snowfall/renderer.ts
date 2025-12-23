import type { Particle } from "./types"
import { getComputedStyleValue } from "./utils"

const applyContextStyle = (
  ctx: CanvasRenderingContext2D,
  style: { color: string; blur: number; offset?: number; width?: number },
): void => {
  ctx.shadowColor = style.color
  ctx.shadowBlur = style.blur
  if (style.offset !== undefined) ctx.shadowOffsetY = style.offset
  if (style.width !== undefined) ctx.lineWidth = style.width
}

export const renderParticle = (
  ctx: CanvasRenderingContext2D,
  particle: Particle,
  path: Path2D,
  isDark: boolean,
  canvasHeight: number,
  fadeZone: number,
): void => {
  const depthOpacity = 0.5 + particle.depth * 0.5

  const distanceFromBottom = canvasHeight - particle.y
  const fadeMultiplier =
    distanceFromBottom < fadeZone
      ? Math.pow(distanceFromBottom / fadeZone, 2)
      : 1

  const finalOpacity =
    particle.opacity * depthOpacity * (isDark ? 0.9 : 1) * fadeMultiplier

  const particleBlur = parseFloat(
    getComputedStyleValue("--snowfall-particle-blur"),
  )
  const depthBlur = particleBlur * (0.8 + particle.depth * 0.4)

  ctx.save()
  ctx.translate(particle.x, particle.y)
  ctx.rotate(particle.rotation)

  applyContextStyle(ctx, {
    color: getComputedStyleValue("--snowfall-particle-shadow"),
    blur: depthBlur,
  })
  ctx.shadowOffsetX = 0
  ctx.shadowOffsetY = 0

  const particleFill = getComputedStyleValue("--snowfall-particle-fill")
  const fillColor = `rgba(${particleFill}, ${finalOpacity})`
  ctx.strokeStyle = fillColor

  const particleWidth = parseFloat(
    getComputedStyleValue("--snowfall-particle-width"),
  )

  if (particle.complexity > 0.1) {
    ctx.lineWidth = particleWidth * (0.8 + particle.radius * 0.15)
    ctx.lineCap = "round"
    ctx.stroke(path)
  } else {
    ctx.fillStyle = fillColor
    ctx.lineWidth = particleWidth * 0.5
    ctx.fill(path)
  }

  ctx.restore()
}
