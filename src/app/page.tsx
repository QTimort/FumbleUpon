import Image from "next/image"

import { siteConfig } from "@/config/site"
import Footer from "@/components/footer"
import RandomWebsiteButton from "@/components/random-website-button"
import TitleWithLines from "@/components/ui/title-with-lines";
import {Button} from "@/components/ui/button";
import {TextBackground} from "@/components/ui/text-background";

export default function Home() {
  return (
    <div className="flex h-screen flex-col justify-between">
      <main className="flex flex-grow items-center justify-center">
        <div className="px-4 sm:px-8 container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <div className={'w-full bg-rad-black'}>
            <div className={'border border-rad-orange w-full p-1'}>
              <TitleWithLines title={siteConfig.name}/>
            </div>
            <div className={'flex flex-col md:flex-row w-full border border-rad-orange h-auto bg-rad-orange'}>
              <div className={'w-full md:w-2/5 flex justify-center'}>
                <Image
                  src={"/logo.png"}
                  alt={siteConfig.name + " Logo"}
                  width={512}
                  height={512}
                  className="p-8 md:p-16"
                />
              </div>
              <div className={'flex flex-col w-full md:w-3/5 justify-center items-center bg-rad-black p-2 py-6'}>
                <h1 className="text-4xl font-semibold sm:text-4xl md:text-5xl lg:text-6xl text-rad-white uppercase hidden sm:block">
                  {siteConfig.name}
                </h1>
                <p
                  className="max-w-[42rem] leading-normal text-muted-foreground sm:text-lg sm:leading-8 text-rad-orange uppercase">
                  {siteConfig.description}
                </p>
                <div className="flex flex-wrap justify-center gap-4 sm:gap-2 mt-5">
                  <RandomWebsiteButton/>
                  <div>
                    <Button
                      variant="rad"
                    >
                      <svg className={'w-5 h-5 fill-rad-white'} xmlns="http://www.w3.org/2000/svg" shapeRendering="geometricPrecision"
                           textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd"
                           clipRule="evenodd" viewBox="0 0 512 462.799">
                        <path fillRule="nonzero"
                              d="M403.229 0h78.506L310.219 196.04 512 462.799H354.002L230.261 301.007 88.669 462.799h-78.56l183.455-209.683L0 0h161.999l111.856 147.88L403.229 0zm-27.556 415.805h43.505L138.363 44.527h-46.68l283.99 371.278z"/>
                      </svg>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div className={'border border-rad-orange w-full p-1'}>
              <Footer/>
            </div>
          </div>
        </div>
      </main>
      <TextBackground/>
    </div>
  )
}
