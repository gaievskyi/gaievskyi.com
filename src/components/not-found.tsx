import * as motion from "motion/react-client"
import dynamic from "next/dynamic"

const FuzzyText = dynamic(() => import("@/components/fuzzy-text"))

export function NotFound() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        filter: "blur(5px)",
      }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="flex flex-col gap-4"
    >
      <FuzzyText fontSize={200}>404</FuzzyText>
      <FuzzyText fontSize={85} fontFamily="Heldane" className="ml-2">
        not found
      </FuzzyText>
    </motion.div>
  )
}
