// app/random-dapp/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import DappPreview from '@/components/dapp-preview';
import { useRouter } from 'next/navigation';
import TitleWithLines from "@/components/ui/title-with-lines";
import {siteConfig} from "@/config/site";
import {TextBackground} from "@/components/ui/text-background";

interface Dapp {
  url: string;
  screenshotUrl: string;
  name: string;
}

export default function RandomDapp() {
  const [dapp, setDapp] = useState<Dapp | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchRandomDapp = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/random');
      const data = await response.json();
      if (data.url && data.screenshotUrl) {
        setDapp({
          url: data.url,
          screenshotUrl: data.screenshotUrl,
          name: new URL(data.url).hostname.replace('www.', '')
        });
      }
    } catch (error) {
      console.error('Failed to fetch random dapp:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomDapp();
  }, []);

  const handleFumbleAgain = () => {
    fetchRandomDapp();
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!dapp) {
    return <div className="flex justify-center items-center h-screen">Failed to load dapp</div>;
  }
  return (
    <div className="flex h-screen flex-col justify-between">
      <main className="flex flex-grow items-center justify-center">
        <div
          className="container flex max-w-[64rem] flex-col items-center gap-4 px-4 text-center sm:px-8">
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
                  "flex w-full flex-col items-center justify-center bg-rad-black p-2 py-6 overflow-hidden"
                }
              >
                <div className="bg-black text-white p-8 font-['Joystix', monospace] w-full">
                  <DappPreview
                    title={dapp.name}
                    description="Discover this amazing Solana dapp!"
                    screenshotUrl={dapp.screenshotUrl}
                    url={dapp.url}
                    onFumbleAgain={handleFumbleAgain}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <TextBackground/>
    </div>
  );
}
