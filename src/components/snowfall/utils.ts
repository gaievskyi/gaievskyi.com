interface Particle {
  readonly x: number
  readonly y: number
  readonly radius: number
  readonly speed: number
  readonly wind: number
  readonly opacity: number
  readonly rotation: number
  readonly rotationSpeed: number
  readonly sinOffset: number
}

interface Dimensions {
  readonly width: number
  readonly height: number
  readonly viewportHeight: number
}

interface ThemeStyle {
  readonly heap: readonly [string, string, string]
  readonly heapShadow: { color: string; blur: number; offset: number }
  readonly heapStroke: {
    color: string
    width: number
    shadow: string
    blur: number
  }
  readonly particle: {
    fill: string
    shadow: string
    blur: number
    width: number
  }
  readonly filter: string
  readonly heapFilter: string
}

const CONFIG = {
  canvas: { alpha: true, desynchronized: true, willReadFrequently: false },
  heap: { sampleRate: 200, maxHeightRatio: 0.4 },
  animation: { targetFps: 60, maxDeltaMultiplier: 2 },
  resize: { debounceMs: 150 },
  melt: { intervalFrames: 30, spots: 15, rate: 0.1 },
  smooth: { intervalFrames: 5, weight: 0.7, neighborWeight: 0.15 },
  particle: {
    radius: { min: 1.5, max: 4 },
    speed: { min: 0.3, max: 1.1 },
    wind: { min: -0.3, max: 0.3 },
    opacity: { min: 0.6, max: 1 },
    rotation: { min: -0.01, max: 0.01 },
    swayAmplitude: 0.3,
    swayFrequency: 0.01,
  },
} as const

const THEME_STYLES: Record<"dark" | "light", ThemeStyle> = {
  dark: {
    heap: [
      "rgba(255, 255, 255, 0.95)",
      "rgba(255, 255, 255, 0.85)",
      "rgba(255, 255, 255, 0.7)",
    ],
    heapShadow: { color: "rgba(255, 255, 255, 0.2)", blur: 8, offset: -2 },
    heapStroke: {
      color: "rgba(255, 255, 255, 0.3)",
      width: 1,
      shadow: "transparent",
      blur: 0,
    },
    particle: {
      fill: "255, 255, 255",
      shadow: "rgba(255, 255, 255, 0.4)",
      blur: 3,
      width: 0.5,
    },
    filter: "drop-shadow(0 0 2px rgba(255, 255, 255, 0.3))",
    heapFilter: "drop-shadow(0 -2px 4px rgba(255, 255, 255, 0.2))",
  },
  light: {
    heap: [
      "rgba(230, 240, 255, 1)",
      "rgba(220, 235, 255, 0.95)",
      "rgba(200, 225, 255, 0.85)",
    ],
    heapShadow: { color: "rgba(50, 100, 180, 0.6)", blur: 15, offset: -3 },
    heapStroke: {
      color: "rgba(100, 150, 220, 0.8)",
      width: 2,
      shadow: "rgba(80, 130, 200, 0.5)",
      blur: 4,
    },
    particle: {
      fill: "220, 235, 255",
      shadow: "rgba(80, 140, 220, 0.8)",
      blur: 6,
      width: 0.8,
    },
    filter: "drop-shadow(0 0 4px rgba(100, 150, 220, 0.5))",
    heapFilter: "drop-shadow(0 -2px 8px rgba(80, 130, 200, 0.4))",
  },
} as const

const random = (min: number, max: number): number =>
  Math.random() * (max - min) + min

const clamp = (value: number, min: number, max: number): number =>
  Math.max(min, Math.min(max, value))

const wrap = (value: number, max: number): number =>
  value < 0 ? max : value > max ? 0 : value

const getDocumentHeight = (): number =>
  Math.max(document.documentElement.scrollHeight, window.innerHeight)

const getScrollY = (): number => window.scrollY || window.pageYOffset

const getDimensions = (): Dimensions => ({
  width: window.innerWidth,
  height: getDocumentHeight(),
  viewportHeight: window.innerHeight,
})

const getThemeStyle = (isDark: boolean): ThemeStyle =>
  THEME_STYLES[isDark ? "dark" : "light"]

const calculateDeltaTime = (currentTime: number, lastTime: number): number =>
  clamp(
    (currentTime - lastTime) / (1000 / CONFIG.animation.targetFps),
    0,
    CONFIG.animation.maxDeltaMultiplier,
  )

const createParticle = (width: number, height: number): Particle => ({
  x: random(0, width),
  y: -random(0, height),
  radius: random(CONFIG.particle.radius.min, CONFIG.particle.radius.max),
  speed: random(CONFIG.particle.speed.min, CONFIG.particle.speed.max),
  wind: random(CONFIG.particle.wind.min, CONFIG.particle.wind.max),
  opacity: random(CONFIG.particle.opacity.min, CONFIG.particle.opacity.max),
  rotation: random(0, Math.PI * 2),
  rotationSpeed: random(
    CONFIG.particle.rotation.min,
    CONFIG.particle.rotation.max,
  ),
  sinOffset: random(0, Math.PI * 2),
})

const updateParticle = (
  p: Particle,
  deltaTime: number,
  dimensions: Dimensions,
): Particle => ({
  ...p,
  y: p.y + p.speed * deltaTime,
  x: wrap(
    p.x +
      p.wind * deltaTime +
      Math.sin(p.y * CONFIG.particle.swayFrequency + p.sinOffset) *
        CONFIG.particle.swayAmplitude,
    dimensions.width,
  ),
  rotation: p.rotation + p.rotationSpeed * deltaTime,
})

const shouldResetParticle = (
  p: Particle,
  heapHeight: number,
  visibleBottom: number,
): boolean => p.y >= visibleBottom - heapHeight

const createSnowflakePath = (radius: number): Path2D => {
  const path = new Path2D()
  const armCount = 6
  const branchLength = radius * 0.16

  // Center circle
  path.arc(0, 0, radius * 0.3, 0, Math.PI * 2)
  // Arms with branches
  Array.from({ length: armCount }, (_, i) => {
    const angle = (Math.PI * 2 * i) / armCount
    const [x, y] = [Math.cos(angle) * radius, Math.sin(angle) * radius]
    const [branchX, branchY] = [x * 0.6, y * 0.6]
    // Main arm
    path.moveTo(0, 0)
    path.lineTo(x, y)
    // Branches
    const angles = [angle - Math.PI / 6, angle + Math.PI / 6]
    angles.forEach((a) => {
      path.moveTo(branchX, branchY)
      path.lineTo(
        branchX + Math.cos(a) * branchLength,
        branchY + Math.sin(a) * branchLength,
      )
    })
  })

  return path
}

const getOrCreatePath = (
  cache: Map<number, Path2D>,
  radius: number,
): Path2D => {
  const key = Math.round(radius * 10)
  if (!cache.has(key)) cache.set(key, createSnowflakePath(radius))
  return cache.get(key)!
}

const createHeapGradient = (
  ctx: CanvasRenderingContext2D,
  viewportHeight: number,
  maxHeight: number,
  style: ThemeStyle,
): CanvasGradient => {
  const gradient = ctx.createLinearGradient(
    0,
    viewportHeight,
    0,
    viewportHeight - Math.max(maxHeight, 100),
  )
  style.heap.forEach((color, i) => gradient.addColorStop(i / 2, color))
  return gradient
}

const calculateHeapIndex = (x: number, resolution: number): number =>
  Math.floor(x / resolution)

const calculateSpreadAmount = (distance: number, radius: number): number =>
  Math.max(0, radius * 0.8 - distance * 0.3)

const addSnowToHeap = (
  heap: Float32Array,
  x: number,
  radius: number,
  resolution: number,
  maxHeight: number,
): void => {
  const heapIndex = calculateHeapIndex(x, resolution)
  if (heapIndex < 0 || heapIndex >= heap.length) return

  const spreadIndices = Math.ceil((radius * 2) / resolution)

  for (let j = -spreadIndices; j <= spreadIndices; j++) {
    const targetIndex = heapIndex + j
    if (targetIndex >= 0 && targetIndex < heap.length) {
      const amount = calculateSpreadAmount(Math.abs(j), radius)
      heap[targetIndex] = Math.min(heap[targetIndex] + amount, maxHeight)
    }
  }
}

const meltHeap = (heap: Float32Array): void => {
  Array.from({ length: CONFIG.melt.spots }, () => {
    const index = Math.floor(Math.random() * heap.length)
    if (heap[index] > 0)
      heap[index] = Math.max(0, heap[index] - CONFIG.melt.rate)
  })
}

const smoothHeap = (heap: Float32Array): void => {
  if (heap.length <= 2) return
  for (let i = 1; i < heap.length - 1; i++) {
    heap[i] =
      heap[i] * CONFIG.smooth.weight +
      (heap[i - 1] + heap[i + 1]) * CONFIG.smooth.neighborWeight
  }
}

const applyContextStyle = (
  ctx: CanvasRenderingContext2D,
  style: { color: string; blur: number; offset?: number; width?: number },
): void => {
  ctx.shadowColor = style.color
  ctx.shadowBlur = style.blur
  if (style.offset !== undefined) ctx.shadowOffsetY = style.offset
  if (style.width !== undefined) ctx.lineWidth = style.width
}

const renderHeap = (
  ctx: CanvasRenderingContext2D,
  heap: Float32Array,
  resolution: number,
  dimensions: Dimensions,
  gradient: CanvasGradient,
  style: ThemeStyle,
): void => {
  ctx.save()
  applyContextStyle(ctx, style.heapShadow)
  ctx.fillStyle = gradient
  ctx.beginPath()
  ctx.moveTo(0, dimensions.viewportHeight)
  Array.from(heap).forEach((height, i) => {
    ctx.lineTo(i * resolution, dimensions.viewportHeight - height)
  })
  ctx.lineTo(dimensions.width, dimensions.viewportHeight)
  ctx.closePath()
  ctx.fill()
  ctx.restore()
}

const renderHeapOutline = (
  ctx: CanvasRenderingContext2D,
  heap: Float32Array,
  resolution: number,
  viewportHeight: number,
  style: ThemeStyle,
): void => {
  ctx.save()
  ctx.strokeStyle = style.heapStroke.color
  applyContextStyle(ctx, {
    ...style.heapStroke,
    color: style.heapStroke.shadow,
  })
  ctx.beginPath()
  ctx.moveTo(0, viewportHeight - heap[0])
  Array.from(heap)
    .slice(1)
    .forEach((height, i) => {
      ctx.lineTo((i + 1) * resolution, viewportHeight - height)
    })
  ctx.stroke()
  ctx.restore()
}

const renderParticle = (
  ctx: CanvasRenderingContext2D,
  particle: Particle,
  path: Path2D,
  style: ThemeStyle,
  isDark: boolean,
): void => {
  const opacity = isDark ? particle.opacity * 0.8 : particle.opacity

  ctx.save()
  ctx.translate(particle.x, particle.y)
  ctx.rotate(particle.rotation)
  applyContextStyle(ctx, {
    color: style.particle.shadow,
    blur: style.particle.blur,
  })
  ctx.shadowOffsetX = 0
  ctx.shadowOffsetY = 0
  ctx.fillStyle = `rgba(${style.particle.fill}, ${opacity})`
  ctx.strokeStyle = `rgba(${style.particle.fill}, ${opacity})`
  ctx.lineWidth = style.particle.width
  ctx.fill(path)
  ctx.stroke(path)
  ctx.restore()
}

export {
  addSnowToHeap,
  calculateDeltaTime,
  calculateHeapIndex,
  calculateSpreadAmount,
  CONFIG,
  createHeapGradient,
  createParticle,
  getDimensions,
  getOrCreatePath,
  getScrollY,
  getThemeStyle,
  meltHeap,
  renderHeap,
  renderHeapOutline,
  renderParticle,
  shouldResetParticle,
  smoothHeap,
  updateParticle,
}
