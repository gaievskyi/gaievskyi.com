import { ComponentDemoLayout } from "@/components/crafts/component-demo-layout"
import { craftsMap } from "@/components/video/crafts-videos"
import type { Metadata } from "next"
import dynamic from "next/dynamic"

const VercelBadgeScene = dynamic(
  () => import("@/components/crafts/vercel-badge-scene"),
)

export const metadata: Metadata = {
  title: "Vercel Badge",
  description:
    "A 3D interactive Vercel Ship 2024 badge recreation — WebGL-powered with realistic materials and physics using Three.js and React Three Fiber.",
  openGraph: {
    siteName: "Daniel Gaievskyi",
    title: "Vercel Badge",
    type: "website",
    images: [
      {
        url: craftsMap["vercel-badge"].poster + "?time=2.5",
        alt: "Vercel Badge craft by Daniel Gaievskyi",
        width: 1920,
        height: 1080,
      },
    ],
  },
  twitter: {
    images: [
      {
        url: craftsMap["vercel-badge"].poster + "?time=2.5",
        alt: "Vercel Badge craft by Daniel Gaievskyi",
        width: 1920,
        height: 1080,
      },
    ],
    card: "summary_large_image",
    title: "Vercel Badge",
    creator: "@dgaievskyi",
  },
}

export default function VercelBadgePage() {
  return (
    <>
      <VercelBadgeScene />
      <ComponentDemoLayout
        title="Vercel Badge"
        date="June 2024"
        previous={{
          title: "Family Transactions",
          href: "/crafts/family-transactions",
        }}
        next={{
          title: "Dynamic Island",
          href: "/crafts/dynamic-island",
        }}
        className="h-[550px]"
      >
        {null}
      </ComponentDemoLayout>
    </>
  )
}
