import Image from "next/image"

import { siteConfig } from "@/config/site"
import Footer from "@/components/footer"
import { ModeToggle } from "@/components/mode-toggle"
import RandomWebsiteButton from "@/components/random-website-button"

export default function Home() {
  return (
    <div className="flex h-screen flex-col justify-between">
      <main className="flex flex-grow items-center justify-center">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <Image
            src={"/logo.png"}
            alt={siteConfig.name + " Logo"}
            width={128}
            height={128}
            className="h-32 w-32 rounded-full"
          />
          <h1 className="text-4xl font-semibold sm:text-5xl md:text-6xl lg:text-7xl">
            {siteConfig.name}
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            {siteConfig.description}
          </p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-2">
            <RandomWebsiteButton />
            <ModeToggle />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
