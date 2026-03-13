import { getProject, getProjectsSlugs } from "@/cms/data-access/projects"
import { Flex } from "@/components/ui/layout/flex"
import { isVideo, videosMap } from "@/components/video/projects-videos"
import { Video } from "@/components/video/video"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Suspense } from "react"
import { ProjectActions } from "./project-actions"
import { ProjectContent } from "./project-content"

export async function generateStaticParams() {
  const slugs = await getProjectsSlugs()
  return slugs.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params
  const project = await getProject(slug)
  if (!project) return {}
  const video = isVideo(slug) ? videosMap[slug] : undefined
  return {
    title: project.title,
    description: `${project.title} — a project by Daniel Gaievskyi.`,
    alternates: {
      canonical: `https://gaievskyi.com/projects/${slug}`,
    },
    openGraph: {
      title: project.title,
      description: `${project.title} — a project by Daniel Gaievskyi.`,
      siteName: "Daniel Gaievskyi",
      type: "website",
      ...(video?.poster && {
        images: [
          {
            url: video.poster + "?time=0",
            alt: project.title,
            width: 1920,
            height: 1080,
          },
        ],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      creator: "@dgaievskyi",
      ...(video?.poster && {
        images: [
          {
            url: video.poster + "?time=0",
            alt: project.title,
            width: 1920,
            height: 1080,
          },
        ],
      }),
    },
  }
}

export default async function ProjectPage({
  params,
}: PageProps<"/projects/[slug]">) {
  const { slug } = await params
  const projectPromise = getProject(slug)
  const video = isVideo(slug) ? videosMap[slug] : undefined
  if (!video) {
    return notFound()
  }

  return (
    <Flex
      as="main"
      direction="col"
      align="center"
      gap="lg"
      className="container mx-auto grid h-svh w-full max-w-3xl place-content-center px-6 sm:px-0"
    >
      <Suspense>
        <ProjectContent projectPromise={projectPromise} />
      </Suspense>
      <Video src={video} slug={slug} />
      <Suspense>
        <ProjectActions projectPromise={projectPromise} />
      </Suspense>
    </Flex>
  )
}
