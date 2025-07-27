import { ComponentDemoLayout } from "@/components/crafts/component-demo-layout"
import { BrightnessSlider } from "@/components/crafts/ios-slider/brightness-slider"
// import { VolumeSlider } from "@/components/crafts/ios-slider/volume-slider"

export default function IosSliderPage() {
  return (
    <ComponentDemoLayout
      title="iOS Slider"
      date="June 2025"
      slug="ios-slider"
      previous={{ title: "Radial Menu", href: "/crafts/radial-menu" }}
      next={{ title: "Fractional Slider", href: "/crafts/fractional-slider" }}
    >
      {/* <div className="flex gap-6"> */}
      <BrightnessSlider />
      {/* <VolumeSlider /> */}
      {/* </div> */}
    </ComponentDemoLayout>
  )
}
