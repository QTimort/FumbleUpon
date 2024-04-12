import Image from "next/image"

import { siteConfig } from "@/config/site"
import { Button } from "@/components/ui/button"
import { TextBackground } from "@/components/ui/text-background"
import TitleWithLines from "@/components/ui/title-with-lines"
import Footer from "@/components/footer"
import RandomWebsiteButton from "@/components/random-website-button"

export default function Home() {
  return (
    <div className="flex h-screen flex-col justify-between">
      <main className="flex flex-grow items-center justify-center">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 px-4 text-center sm:px-8">
          <div className={"w-full bg-rad-black"}>
            <div className={"w-full border border-rad-orange p-1"}>
              <TitleWithLines title={siteConfig.name} />
            </div>
            <div
              className={
                "flex h-auto w-full flex-col border border-rad-orange bg-rad-orange md:flex-row"
              }
            >
              <div className={"flex w-full justify-center md:w-2/5"}>
                <Image
                  src={"/logo.png"}
                  alt={siteConfig.name + " Logo"}
                  width={512}
                  height={512}
                  className="p-8 md:p-16"
                />
              </div>
              <div
                className={
                  "flex w-full flex-col items-center justify-center bg-rad-black p-2 py-6 md:w-3/5"
                }
              >
                <h1 className="hidden text-4xl font-semibold uppercase text-rad-white sm:block sm:text-4xl md:text-5xl lg:text-6xl">
                  {siteConfig.name}
                </h1>
                <p className="max-w-[42rem] uppercase leading-normal text-muted-foreground text-rad-orange sm:text-lg sm:leading-8">
                  {siteConfig.description}
                </p>
                <div className="mt-5 flex flex-wrap justify-center gap-4 sm:gap-2">
                  <RandomWebsiteButton />
                  <div>
                    <Button variant="rad">
                      <svg
                        className={"h-5 w-5 fill-rad-white"}
                        xmlns="http://www.w3.org/2000/svg"
                        shapeRendering="geometricPrecision"
                        textRendering="geometricPrecision"
                        imageRendering="optimizeQuality"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        viewBox="0 0 512 462.799"
                      >
                        <path
                          fillRule="nonzero"
                          d="M403.229 0h78.506L310.219 196.04 512 462.799H354.002L230.261 301.007 88.669 462.799h-78.56l183.455-209.683L0 0h161.999l111.856 147.88L403.229 0zm-27.556 415.805h43.505L138.363 44.527h-46.68l283.99 371.278z"
                        />
                      </svg>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div className={"w-full border border-rad-orange p-1"}>
              <Footer />
            </div>
          </div>
        </div>
      </main>
      <TextBackground />
    </div>
  )
}
