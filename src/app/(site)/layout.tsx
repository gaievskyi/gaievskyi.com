import { LetHimCook } from "@/components/console-message"
import { ScreenSizeIndicator } from "@/components/dev-screen-size-indicator"
import { ProgressiveBlur } from "@/components/progressive-blur"
import { Providers } from "@/components/providers"
import { isDevelopment, isProduction } from "@/lib/constants"
import { geistMono, heldaneText } from "@/lib/fonts"
import { getServerSideURL } from "@/lib/get-url"
import "@/styles/globals.css"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import type { Metadata } from "next"

const url = getServerSideURL()
const name = "Daniel Gaievskyi"
const description =
  "Design Engineer crafting polished UI components, interactive experiments, and developer tools. Exploring the intersection of design and engineering."

export const metadata: Metadata = {
  title: {
    default: name,
    template: `%s — ${name}`,
  },
  description,
  category: "technology",
  authors: [{ name, url }],
  creator: name,
  metadataBase: new URL(url),
  openGraph: {
    images: [
      {
        url: `/images/opengraph-image.png`,
        alt: name,
        width: 834,
        height: 446,
      },
    ],
    siteName: name,
    type: "website",
    locale: "en_US",
    url,
  },
  twitter: {
    card: "summary_large_image",
    title: name,
    creator: "@dgaievskyi",
  },
  formatDetection: {
    telephone: false,
    address: false,
    email: false,
  },
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body
        className={`${geistMono.variable} ${heldaneText.variable} font-system root relative antialiased`}
        suppressHydrationWarning
      >
        <Providers>
          <ProgressiveBlur
            position="top"
            direction="top"
            className="h-10 md:h-[60px]"
          />
          {children}
        </Providers>
        <ScreenSizeIndicator enabled={isDevelopment} />
      </body>
      <LetHimCook />
      {isProduction && <SpeedInsights />}
      {isProduction && <Analytics mode="production" />}
    </html>
  )
}
