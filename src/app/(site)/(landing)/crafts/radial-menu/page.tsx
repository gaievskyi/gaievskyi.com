import type { Metadata } from "next"
import { RadialMenuDemo } from "./radial-menu-demo"
import { ComponentDemoLayout } from "@/components/crafts/component-demo-layout"
import { craftsMap } from "@/components/video/crafts-videos"

export const metadata: Metadata = {
  title: "Radial Menu",
  description:
    "An elegant radial context menu built with React and Tailwind CSS — gesture-driven, spring-animated, and fully keyboard accessible.",
  openGraph: {
    siteName: "Daniel Gaievskyi",
    title: "Radial Menu",
    type: "website",
    images: [
      {
        url: craftsMap["radial-menu"].poster + "?time=1.2",
        alt: "Radial Menu craft by Daniel Gaievskyi",
        width: 1920,
        height: 1080,
      },
    ],
  },
  twitter: {
    images: [
      {
        url: craftsMap["radial-menu"].poster + "?time=1.2",
        alt: "Radial Menu craft by Daniel Gaievskyi",
        width: 1920,
        height: 1080,
      },
    ],
    card: "summary_large_image",
    title: "Radial Menu",
    creator: "@dgaievskyi",
  },
}

export default function RadialMenuPage() {
  return (
    <ComponentDemoLayout
      title="Radial Menu"
      date="May 2025"
      slug="radial-menu"
      previous={{ title: "Dynamic Island", href: "/crafts/dynamic-island" }}
      next={{ title: "iOS Slider", href: "/crafts/ios-slider" }}
    >
      <RadialMenuDemo />
    </ComponentDemoLayout>
  )
}
