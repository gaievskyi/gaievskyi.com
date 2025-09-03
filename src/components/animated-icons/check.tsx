"use client"

import type { Variants } from "motion/react"
import { motion, useAnimation } from "motion/react"
import type { HTMLAttributes, Ref } from "react"
import { useImperativeHandle } from "react"

export type CheckIconHandle = {
  startAnimation: () => void
  stopAnimation: () => void
}

type CheckIconProps = HTMLAttributes<SVGSVGElement> & {
  size?: number
  ref?: Ref<CheckIconHandle>
}

const checkVariants: Variants = {
  normal: {
    pathLength: 0,
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
  animate: {
    pathLength: 1,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
}

const CheckIcon = ({ className, size = 28, ref, ...props }: CheckIconProps) => {
  const controls = useAnimation()

  useImperativeHandle(ref, () => ({
    startAnimation: () => controls.start("animate"),
    stopAnimation: () => controls.start("normal"),
  }))

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <motion.path
        d="M20 6L9 17L4 12"
        variants={checkVariants}
        initial="normal"
        animate={controls}
        style={{ pathLength: 0 }}
      />
    </svg>
  )
}

export { CheckIcon }
