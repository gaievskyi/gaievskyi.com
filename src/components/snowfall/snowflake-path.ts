const createSnowflakePath = (radius: number, complexity: number): Path2D => {
  const path = new Path2D()

  if (complexity < 0.1) {
    path.arc(0, 0, radius * 0.8, 0, Math.PI * 2)
    return path
  }

  const armCount = 6
  const armLength = radius * 2.5

  Array.from({ length: armCount }, (_, i) => {
    const angle = (Math.PI * 2 * i) / armCount
    const cos = Math.cos(angle)
    const sin = Math.sin(angle)

    path.moveTo(0, 0)
    path.lineTo(cos * armLength, sin * armLength)
  })

  return path
}

export const getOrCreatePath = (
  cache: Map<string, Path2D>,
  radius: number,
  complexity: number,
): Path2D => {
  const key = `${Math.round(radius * 10)}-${Math.round(complexity * 10)}`
  if (!cache.has(key)) cache.set(key, createSnowflakePath(radius, complexity))
  return cache.get(key)!
}
