import { SiteConfig } from "@/types"

import { env } from "@/env.mjs"

export const siteConfig: SiteConfig = {
  name: "FumbleUpon",
  author: "@TimortUnchained",
  description:
    "Fumble upon the Solana ecosystem click by click!",
  keywords: ["Solana", "Ecosystem"],
  url: {
    base: env.NEXT_PUBLIC_APP_URL,
    author: "https://twitter.com/TimortUnchained",
  },
  links: {
    github: "https://github.com/QTimort/FumbleUpon",
  },
  ogImage: `${env.NEXT_PUBLIC_APP_URL}/og.jpg`,
}
