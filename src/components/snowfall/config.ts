export const CONFIG = {
  animation: { targetFps: 60, maxDeltaMultiplier: 2 },
  particle: {
    radius: { min: 1.2, max: 2 },
    speed: { min: 0.5, max: 1.5 },
    wind: { min: -0.15, max: 0.15 },
    opacity: { min: 0.5, max: 0.95 },
    rotation: { min: -0.02, max: 0.02 },
    swayAmplitude: 0.5,
    swayFrequency: 0.008,
    flutterAmplitude: 0.15,
    flutterFrequency: 0.05,
    fadeZone: 20,
  },
} as const
