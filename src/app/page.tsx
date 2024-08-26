// app/page.tsx
'use client';

import { siteConfig } from "@/config/site"
import { TextBackground } from "@/components/ui/text-background"
import TitleWithLines from "@/components/ui/title-with-lines"
import React, {useEffect, useState} from "react";
import DappCard from "@/components/dapp-card";
import { useRouter } from 'next/navigation';
import Logo from "@/components/logo";

interface ExploreComponentProps {
  dappCount: number;
}

interface Dapp {
  url: string;
  screenshotUrl: string;
  name: string;
  height: number;
}

const Skeleton: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`animate-pulse bg-gray-300 ${className}`}></div>
);

const DappSkeleton: React.FC<{ height: number, bottom: number }> = ({ height, bottom }) => (
  <div className="absolute left-0 right-0" style={{ height: `${height}px`, bottom: `${bottom}px` }}>
    <Skeleton className="w-full h-full" />
  </div>
);


export default function Home() {
  const [dapps, setDapps] = useState<Dapp[]>([]);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState<undefined | number>()
  const router = useRouter();

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
        const response = await fetch('/api/random-dapps');
        const data = await response.json();
        setDapps(data.dapps.map((dapp: { url: string, screenshotUrl: string }, index: number) => ({
          ...dapp,
          name: new URL(dapp.url).hostname.replace('www.', ''),
          height: [200, 250, 225, 300, 280, 125][index] // Custom heights
        })));
      } catch (error) {
        console.error('Failed to fetch dapps:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDapps();
  }, []);

  const handleFumbleUpon = () => {
    router.push('/random-dapp');
  };

  const gridHeight = 333; // Total height of the grid
  const gap = 16; // Gap between grid items

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
              <div
                className={
                  "flex w-full flex-col items-center justify-center bg-rad-black p-2 py-6 overflow-hidden"
                }
              >
                <div className="bg-black text-white p-8 font-['Joystix', monospace]">
                  <div className="text-center mb-8">
                    <h2 className="text-6xl mb-4">EXPLORE SOLANA</h2>
                    <p className="text-yellow-500 text-xl mb-4">
                      DISCOVER NEW DAPPS EVERYDAY<br/>
                      ACROSS THE NETWORK
                    </p>
                    <button className="border border-yellow-500 text-yellow-500 px-6 py-2 border border-rad-orange "
                            onClick={handleFumbleUpon}>
                      <div className={'flex justify-center gap-2'}>
                        <Logo size={24}/>
                        <p>
                          FUMBLEUPON {count} DAPPS
                        </p>
                      </div>
                    </button>
                  </div>

                  <div className="relative bottom-[-25%]" style={{height: `${gridHeight}px`}}>
                    {loading ? (
                      <>
                        <DappSkeleton height={250} bottom={100} />
                        <DappSkeleton height={250} bottom={100} />
                        <DappSkeleton height={125} bottom={50} />
                        <DappSkeleton height={250} bottom={0} />
                        <DappSkeleton height={250} bottom={0} />
                        <DappSkeleton height={125} bottom={0}/>
                      </>
                    ) : (
                      dapps.map((dapp, index) => {
                        const column = index % 4;
                        const row = Math.floor(index / 4);
                        const bottom = row === 0 ? 0 : dapps[index - 4].height + gap;

                        return (
                          <DappCard
                            key={index}
                            dapp={dapp}
                            className="absolute"
                            style={{
                              left: `calc(${column * 25}% + ${gap * column}px)`,
                              bottom: `${bottom}px`,
                              width: '25%',
                              height: `${dapp.height}px`,
                            }}
                          />
                        );
                      })
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <TextBackground/>
    </div>
  )
}
