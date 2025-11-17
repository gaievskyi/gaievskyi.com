import { ComponentDemoLayout } from "@/components/crafts/component-demo-layout"
import { VercelCallToAction } from "@/components/crafts/vercel-call-to-action"

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
