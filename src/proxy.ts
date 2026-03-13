import { NextResponse, type NextRequest } from "next/server"

const AGENT_PATHS = /^(\/|\/blog\/[^/]+|\/projects\/[^/]+|\/crafts\/[^/]+)$/

export function proxy(request: NextRequest) {
  const accept = request.headers.get("accept") ?? ""
  if (!accept.includes("text/markdown")) return NextResponse.next()

  const { pathname } = request.nextUrl
  if (!AGENT_PATHS.test(pathname)) return NextResponse.next()

  const url = request.nextUrl.clone()
  url.pathname = `/api/markdown${pathname === "/" ? "" : pathname}`
  return NextResponse.rewrite(url)
}

export const config = {
  matcher: ["/", "/blog/:slug*", "/projects/:slug*", "/crafts/:slug*"],
}
