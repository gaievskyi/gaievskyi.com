import { ComponentDemoLayout } from "@/components/crafts/component-demo-layout"
import { VercelCallToAction } from "@/components/crafts/vercel-call-to-action"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Vercel Call to Action",
  description:
    "A polished Vercel-inspired call-to-action component with animated gradient border and hover effects — built with React and Tailwind CSS.",
  openGraph: {
    siteName: "Daniel Gaievskyi",
    title: "Vercel Call to Action",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vercel Call to Action",
    creator: "@dgaievskyi",
  },
}

export default function VercelCallToActionPage() {
  return (
    <ComponentDemoLayout
      title="Vercel Call to Action"
      date="October 2025"
      slug="vercel-call-to-action"
      previous={{
        title: "Fractional Slider",
        href: "/crafts/fractional-slider",
      }}
    >
      <VercelCallToAction />
    </ComponentDemoLayout>
  )
}
