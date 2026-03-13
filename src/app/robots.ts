import { getServerSideURL } from "@/lib/get-url"
import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api/"],
      },
    ],
    sitemap: getServerSideURL() + "/sitemap.xml",
  }
}
