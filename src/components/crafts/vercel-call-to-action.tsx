import { Icon } from "@/components/ui/icon"
import { FlipText } from "@/components/ui/split-text/flip-text"

export function VercelCallToAction() {
  return (
    <button className="group inline-flex h-[96px] w-fit items-center justify-between gap-20 rounded-full border border-[#ffffff25] bg-black pr-5 pl-9 transition-colors focus-within:outline-[#47A8FF] hover:bg-[rgb(10,10,10)]">
      <FlipText className="mb-2 text-5xl font-semibold tracking-tight">
        Start Deploying
      </FlipText>
      <div className="grid size-15 place-content-center rounded-full bg-white text-black">
        <Icon name="sprite:vercel-arrow-right" className="size-8" />
      </div>
    </button>
  )
}
