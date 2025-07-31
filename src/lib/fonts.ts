import { Geist, Geist_Mono } from "next/font/google"
import localFont from "next/font/local"

export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
})

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
})

export const heldaneText = localFont({
  variable: "--font-heldane",
  display: "swap",
  src: [
    {
      path: "../../public/fonts/heldane/HeldaneText-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/heldane/HeldaneText-RegularItalic.woff2",
      weight: "400",
      style: "italic",
    },
  ],
})
