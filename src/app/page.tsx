// app/page.tsx
"use client"

import React, {useEffect, useMemo, useState} from "react"
import { useRouter } from "next/navigation"

import { siteConfig } from "@/config/site"
import { TextBackground } from "@/components/ui/text-background"
import TitleWithLines from "@/components/ui/title-with-lines"
import Logo from "@/components/logo"
import MasonryGrid from "@/components/ui/masonry-grid";

interface ExploreComponentProps {
  dappCount: number
}

interface Dapp {
  url: string
  screenshotUrl: string
  name: string
  height: number
}

const Skeleton: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`bg-gray-300 animate-pulse ${className}`}></div>
)

const DappSkeleton: React.FC<{ height: number; bottom: number }> = ({
  height,
  bottom,
}) => (
  <div
    className="absolute left-0 right-0"
    style={{ height: `${height}px`, bottom: `${bottom}px` }}
  >
    <Skeleton className="h-full w-full" />
  </div>
)

interface MyItem {
  id: number;
  height: number;
  content: string;
  color: string;
  url?: string
  screenshotUrl?: string
}

const baseItems: MyItem[] = [
  { id: 1, height: 50, content: '', color: 'rgba(52,152,219,0)' },
  { id: 2, height: 200, content: '', color: 'rgba(46,204,113,0)' },
  { id: 3, height: 150, content: '', color: 'rgba(230,126,34,0)' },
  { id: 4, height: 250, content: 'Desert Oasis', color: '#f1c40f' },
  { id: 5, height: 230, content: 'Coastal Cliffs', color: '#9b59b6' },
  { id: 6, height: 150, content: 'Arctic Tundra', color: '#1abc9c' },
  { id: 7, height: 230, content: 'Volcanic Island', color: '#e74c3c' },
  { id: 8, height: 230, content: 'Rolling Hills', color: '#34495e' },
  { id: 9, height: 170, content: 'Misty Valley', color: '#7f8c8d' },
  { id: 10, height: 260, content: 'Tropical Rainforest', color: '#27ae60' },
  { id: 11, height: 200, content: 'Towering Mountains', color: '#3498db' },
];


export default function Home() {
  const [dapps, setDapps] = useState<Dapp[]>([])
  const [loading, setLoading] = useState(true)
  const [count, setCount] = useState<undefined | number>()
  const router = useRouter()

  useEffect(() => {
    fetch("/api/count")
      .then((r) => r.json())
      .then((r) => {
        setCount(r.count)
      })
  }, [])

  useEffect(() => {
    const fetchDapps = async () => {
      try {
        const response = await fetch("/api/random-dapps")
        const data = await response.json()
        setDapps(
          data.dapps.map(
            (dapp: { url: string; screenshotUrl: string }, index: number) => ({
              ...dapp,
              name: new URL(dapp.url).hostname.replace("www.", ""),
              height: [200, 250, 225, 300, 280, 125][index], // Custom heights
            })
          )
        )
      } catch (error) {
        console.error("Failed to fetch dapps:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchDapps()
  }, [])

  const handleFumbleUpon = () => {
    router.push("/random-dapp")
  }

  const gridHeight = 333 // Total height of the grid
  const gap = 16 // Gap between grid items
  const itemOffset = 3;

  const items = useMemo(() => {
    const updatedItems = [...baseItems];

    dapps.forEach((dapp, index) => {
      if (index + itemOffset < updatedItems.length) {
        updatedItems[index + itemOffset] = {
          ...updatedItems[index + itemOffset],
          url: dapp.url,
          screenshotUrl: dapp.screenshotUrl,
          content: dapp.name,
          color: 'rgba(52,152,219,0)'
        };
      }
    });

    return updatedItems;
  }, [dapps]);

  const renderItem = (item: MyItem) => (
    <div className={`${item.content.length > 0 ? 'border-rad-orange border' : ''} -z-10`}>
      <div
        className={'relative m-1'}
        style={{
          height: `${item.height}px`,
          backgroundColor: item.color,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden'
        }}
      >
        {item.screenshotUrl && (
          <>
            <div
              className="absolute inset-0 opacity-30 bg-rad-orange"
            />
            <img
              className="sepia relative z-10"
              src={item.screenshotUrl}
              alt={item.content}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: 0.8, // Adjust this value to change the transparency of the image
              }}
            />
          </>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex h-screen flex-col justify-between">
      <main className="flex flex-grow items-center justify-center">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 px-4 text-center sm:px-8">
          <div className={"w-full bg-rad-black"}>
            <div className={"w-full border border-rad-orange p-1"}>
              <TitleWithLines title={siteConfig.name}/>
            </div>
            <div
              className={
                "flex h-auto w-full flex-col border border-rad-orange bg-rad-orange md:flex-row"
              }
            >
              <div
                className={
                  "flex w-full flex-col items-center justify-center overflow-hidden bg-rad-black p-2 py-6"
                }
              >
                <div className="bg-black text-white font-['Joystix', monospace] p-8">
                  <div className="text-center">
                    <h2 className="mb-4 text-6xl">EXPLORE SOLANA</h2>
                    <p className="text-rad-orange mb-4 text-xl">
                      DISCOVER NEW DAPPS EVERYDAY
                      <br />
                      ACROSS THE NETWORK
                    </p>
                    <button
                      className="border-yellow-500 text-yellow-500 border border border-rad-orange px-6 py-2 "
                      onClick={handleFumbleUpon}
                    >
                      <div className={"flex justify-center gap-2 relative z-10"}>
                        <Logo size={24} />
                        <p>FUMBLEUPON {count} DAPPS</p>
                      </div>
                    </button>
                  </div>

                  <div
                    className="relative bottom-[10%]"
                    style={{ height: `${gridHeight}px` }}
                  >
                    {loading ? (
                      <>
                        {/* todo fix skeleton */}
                        <DappSkeleton height={250} bottom={100} />
                        <DappSkeleton height={250} bottom={100} />
                        <DappSkeleton height={125} bottom={50} />
                        <DappSkeleton height={250} bottom={0} />
                        <DappSkeleton height={250} bottom={0} />
                        <DappSkeleton height={125} bottom={0} />
                      </>
                    ) : (
                      <>
                        <MasonryGrid items={items} renderItem={renderItem}/>
                      </>
                    )}
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
