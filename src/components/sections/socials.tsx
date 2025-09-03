import { ExternalLink } from "@/components/ui/external-link"
import {
  PreviewCard,
  PreviewCardContent,
  PreviewCardTrigger,
} from "@/components/ui/preview-card"
import { Text } from "@/components/ui/typography/text"
import Image from "next/image"

export function Socials() {
  return (
    <Text color="muted">
      You can find me on{" "}
      <PreviewCard>
        <PreviewCardTrigger
          render={
            <ExternalLink
              href="https://x.com/dgaievskyi"
              className="dark:text-foreground dark:hover:text-white"
            >
              X
            </ExternalLink>
          }
        />
        <PreviewCardContent className="text-sm">
          <Image
            loading="lazy"
            width="250"
            height="130"
            src="/images/abstract-1.avif"
            alt="Station Hofplein signage in Rotterdam, Netherlands"
            className="aspect-video rounded object-cover"
          />
          <p className="my-2">I tweet tweets.</p>
          <a
            href="https://x.com/dgaievskyi"
            className="underline underline-offset-2"
            target="_blank"
          >
            @dgaievskyi
          </a>
        </PreviewCardContent>
      </PreviewCard>
      ,{" "}
      <PreviewCard>
        <PreviewCardTrigger
          render={
            <ExternalLink
              href="https://t.me/designbeng"
              className="dark:text-foreground dark:hover:text-white"
            >
              Telegram
            </ExternalLink>
          }
        />
        <PreviewCardContent className="text-sm">
          <Image
            loading="lazy"
            width="250"
            height="130"
            src="/images/abstract-2.avif"
            alt="Station Hofplein signage in Rotterdam, Netherlands"
            className="aspect-video rounded object-cover"
          />
          <p className="my-2">I post posts.</p>
          <a
            href="https://t.me/designbeng"
            className="underline underline-offset-2"
            target="_blank"
          >
            @designbeng
          </a>
        </PreviewCardContent>
      </PreviewCard>
      , and{" "}
      <PreviewCard>
        <PreviewCardTrigger
          render={
            <ExternalLink
              href="https://github.com/gaievskyi"
              className="dark:text-foreground dark:hover:text-white"
            >
              GitHub
            </ExternalLink>
          }
        />
        <PreviewCardContent className="text-sm">
          <Image
            loading="lazy"
            width="250"
            height="130"
            src="/images/abstract-3.avif"
            alt="Station Hofplein signage in Rotterdam, Netherlands"
            className="aspect-video rounded object-cover"
          />
          <p className="my-2">I code codes.</p>
          <a
            href="https://github.com/gaievskyi"
            className="underline underline-offset-2"
            target="_blank"
          >
            @gaievskyi
          </a>
        </PreviewCardContent>
      </PreviewCard>
      .
    </Text>
  )
}
