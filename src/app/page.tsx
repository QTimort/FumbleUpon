"use client"

import React, { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { useDapps } from "@/contexts/dapp-context"

import { siteConfig } from "@/config/site"
import { compareScreenSize, useScreenSize } from "@/hooks/use-screen-size"
import MasonryGrid from "@/components/ui/masonry-grid"
import { TextBackground } from "@/components/ui/text-background"
import TitleWithLines from "@/components/ui/title-with-lines"
import Logo from "@/components/logo"
import {
  MasonryDapp,
  MasonryDapps,
  SkeletonMasonryDapp,
} from "@/components/mansonry-dapp"

interface Dapp {
  id: string
  url: string
  preview: string
  title: string
  height?: number
}

interface RenderItemProps {
  item: MasonryDapps
  isLoading: boolean
}

const RenderItem: React.FC<RenderItemProps> = ({ item, isLoading }) => {
  if (isLoading) {
    return <SkeletonMasonryDapp item={item} />
  }
  return <MasonryDapp item={item} />
}

const masonryDapps: MasonryDapps[] = [
  { id: 1, height: 50, content: "", color: "rgba(52,152,219,0)" },
  { id: 2, height: 200, content: "", color: "rgba(46,204,113,0)" },
  { id: 3, height: 150, content: "", color: "rgba(230,126,34,0)" },
  { id: 4, height: 250, content: "Desert Oasis", color: "#f1c40f" },
  { id: 5, height: 230, content: "Coastal Cliffs", color: "#9b59b6" },
  { id: 6, height: 150, content: "Arctic Tundra", color: "#1abc9c" },
  { id: 7, height: 230, content: "Volcanic Island", color: "#e74c3c" },
  { id: 8, height: 230, content: "Rolling Hills", color: "#34495e" },
  { id: 9, height: 170, content: "Misty Valley", color: "#7f8c8d" },
  { id: 10, height: 260, content: "Tropical Rainforest", color: "#27ae60" },
  { id: 11, height: 200, content: "Towering Mountains", color: "#3498db" },
]

export default function Home() {
  const { getRandomDapps, isLoading, error } = useDapps()
  const [randomDapps, setRandomDapps] = useState<Dapp[]>([])
  const [count, setCount] = useState<number>(0)
  const router = useRouter()
  const itemOffset = 3
  const screenSize = useScreenSize()
  const smallerThanMd = compareScreenSize(screenSize, "md") === "smaller"

  const handleFumbleUpon = () => {
    router.push("/random-dapp")
  }

  useEffect(() => {
    if (!isLoading && !error) {
      const { randomDapps: newRandomDapps, totalDapps } = getRandomDapps(6)
      setRandomDapps(
        newRandomDapps.map((dapp, index) => ({
          ...dapp,
          height: [200, 250, 225, 300, 280, 125][index], // Custom heights
        }))
      )
      setCount(totalDapps)
    }
  }, [isLoading, error]) // Remove getRandomDapps from the dependency array

  const items = useMemo(() => {
    const updatedItems = [...masonryDapps]

    randomDapps.forEach((dapp, index) => {
      if (index + itemOffset < updatedItems.length) {
        updatedItems[index + itemOffset] = {
          ...updatedItems[index + itemOffset],
          url: dapp.url,
          screenshotUrl: dapp.preview,
          content: dapp.title,
          color: "rgba(52,152,219,0)",
        }
      }
    })

    return updatedItems
  }, [randomDapps])

  return (
    <div className="flex h-screen flex-col justify-between">
      <main className="flex flex-grow items-center justify-center">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 px-4 text-center sm:px-8">
          <div className={"w-full bg-rad-black"}>
            <div className={"w-full border border-rad-orange p-1"}>
              <TitleWithLines link={"/"} title={siteConfig.name} />
            </div>
            <div
              className={
                "flex h-auto w-full flex-col border border-t-0 border-rad-orange bg-rad-orange md:flex-row"
              }
            >
              <div
                className={
                  "flex min-h-[80vh] w-full flex-col items-center justify-center overflow-hidden bg-rad-black p-2 py-6 md:min-h-[540px]"
                }
              >
                <div className="bg-black text-white font-['Joystix', monospace] relative w-full p-8">
                  <div className="relative z-10 text-center">
                    <h2 className="mb-4 text-4xl md:text-6xl">
                      EXPLORE SOLANA
                    </h2>
                    <p className="mb-4 text-xl text-rad-orange">
                      DISCOVER NEW DAPPS EVERYDAY
                      <br />
                      ACROSS THE NETWORK
                    </p>
                    <button
                      className="border-yellow-500 text-yellow-500 border border-rad-orange px-6 py-2 "
                      onClick={handleFumbleUpon}
                    >
                      <div
                        className={"relative z-10 flex justify-center gap-2"}
                      >
                        <Logo size={24} />
                        <p>FUMBLEUPON {count} DAPPS</p>
                      </div>
                    </button>
                  </div>
                  <div
                    className={
                      "relative bottom-[50vh] w-full md:bottom-[-80%] "
                    }
                  >
                    <div
                      className="absolute -left-40 bottom-0 brightness-[0.2] sm:-left-12 md:left-auto md:scale-100 md:opacity-100"
                      style={{ height: `${333}px` }}
                    >
                      <MasonryGrid<MasonryDapps>
                        items={items}
                        columnWidth={smallerThanMd ? 350 : undefined}
                        columnCount={smallerThanMd ? 2 : 4}
                        gap={16}
                        renderItem={(item) => (
                          <RenderItem item={item} isLoading={isLoading} />
                        )}
                      />
                    </div>
                  </div>
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
