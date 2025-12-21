import { ComponentDemoLayout } from "@/components/crafts/component-demo-layout"
import { FractionalSlider } from "@/components/crafts/fractional-slider"
import { craftsMap } from "@/components/video/crafts-videos"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Fractional Slider",
  description: "Fractional Slider",
  openGraph: {
    siteName: "@dgaievskyi",
    title: "Fractional Slider",
    type: "website",
    url: "/crafts/fractional-slider",
    images: [
      {
        url: craftsMap["fractional-slider"].poster + "?time=0",
        alt: "Fractional Slider",
        width: 1920,
        height: 1080,
      },
    ],
  },
  twitter: {
    images: [
      {
        url: craftsMap["fractional-slider"].poster + "?time=0",
        alt: "Fractional Slider",
        width: 1920,
        height: 1080,
      },
    ],
    card: "summary_large_image",
    title: "Fractional Slider",
    creator: "@dgaievskyi",
  },
}

export default function FractionalSliderPage() {
  return (
    <ComponentDemoLayout
      title="Fractional Slider"
      date="July 2025"
      previous={{
        title: "iOS Slider",
        href: "/crafts/ios-slider",
      }}
      next={{
        title: "Vercel Call to Action",
        href: "/crafts/vercel-call-to-action",
      }}
      className="h-[300px]"
      slug="fractional-slider"
      decoratedBackground={false}
    >
      <FractionalSlider />
    </ComponentDemoLayout>
  )
}
