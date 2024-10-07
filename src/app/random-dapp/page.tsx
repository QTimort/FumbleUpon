"use client"

import React, { Suspense } from "react"

import { siteConfig } from "@/config/site"
import { TextBackground } from "@/components/ui/text-background"
import TitleWithLines from "@/components/ui/title-with-lines"
import DappPreviewSkeleton from "@/components/dapp-preview-skeleton"
import RandomDappContent from "@/components/random-dapp-content"

export default function RandomDapp() {
  return (
    <div className="flex min-h-screen flex-col justify-between">
      <main className="flex flex-grow items-center justify-center p-4">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 px-0 text-center sm:px-8">
          <div className="w-full bg-rad-black">
            <div className="border border-rad-orange p-1">
              <TitleWithLines link={"/"} title={siteConfig.name} />
            </div>
            <div className="border border-t-0 border-rad-orange bg-rad-orange">
              <div className="bg-rad-black py-0 md:py-6">
                <div className="bg-black text-white font-['Joystix', monospace] w-full">
                  <Suspense fallback={<DappPreviewSkeleton />}>
                    <RandomDappContent />
                  </Suspense>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <TextBackground />
    </div>
  )
}
