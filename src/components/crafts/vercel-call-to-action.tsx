import { Icon } from "@/components/ui/icon"
import { FlipText } from "@/components/ui/split-text/flip-text"
import { geist } from "@/lib/fonts"

export function VercelCallToAction() {
  return (
    <button
      className={`${geist.className} group inline-flex h-[72px] lg:h-[96px] w-fit items-center justify-between rounded-full gap-6 lg:gap-20 border border-[#ffffff25] bg-black pr-3 lg:pr-4 pl-5 lg:pl-7 transition-colors focus-within:outline-[#47A8FF] hover:bg-[rgb(10,10,10)]`}
    >
      <FlipText className="mb-2 text-4xl lg:text-5xl font-semibold tracking-tight">
        Start Deploying
      </FlipText>
      <div className="relative flex items-center justify-center size-12 lg:size-16 rounded-full bg-white text-black overflow-hidden">
        <Icon
          name="sprite:vercel-arrow-right"
          className="size-6 lg:size-9 transition-transform duration-400 ease-out filter-[drop-shadow(3rem_0_0_currentColor)] lg:filter-[drop-shadow(4rem_0_0_currentColor)] group-hover:-translate-x-12 lg:group-hover:-translate-x-16"
        />
      </div>
    </button>
  )
}
