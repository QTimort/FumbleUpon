"use client"

import React, { useCallback, useEffect, useRef, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"

import { siteConfig } from "@/config/site"
import { TextBackground } from "@/components/ui/text-background"
import TitleWithLines from "@/components/ui/title-with-lines"
import DappPreview from "@/components/dapp-preview"
import DappPreviewSkeleton from "@/components/dapp-preview-skeleton"

interface Dapp {
  url: string
  screenshotUrl: string
  name: string
}

export default function RandomDapp() {
  const [dapp, setDapp] = useState<Dapp | null>(null)
  const [loading, setLoading] = useState(true)
  const [history, setHistory] = useState<Dapp[]>([])
  const [currentIndex, setCurrentIndex] = useState(-1)
  const [fumbleStreak, setFumbleStreak] = useState(0)
  const router = useRouter()
  const searchParams = useSearchParams()
  const hasFetchedRef = useRef(false)

  const fetchRandomDapp = useCallback(async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/random")
      const data = await response.json()
      if (data.url && data.screenshotUrl) {
        const newDapp = {
          url: data.url,
          screenshotUrl: data.screenshotUrl,
          name: new URL(data.url).hostname.replace("www.", ""),
        }
        setDapp(newDapp)
        setHistory((prev) => [...prev.slice(0, currentIndex + 1), newDapp])
        setCurrentIndex((prev) => prev + 1)
        updateQueryParams(newDapp.url)
        setFumbleStreak((prev) => prev + 1)
      }
    } catch (error) {
      console.error("Failed to fetch random dapp:", error)
    } finally {
      setLoading(false)
    }
  }, [currentIndex])

  const updateQueryParams = useCallback(
    (url: string) => {
      const params = new URLSearchParams(searchParams)
      params.set("url", url)
      router.replace(`/random-dapp?${params.toString()}`)
    },
    [router, searchParams]
  )

  const loadDappFromUrl = useCallback(
    (url: string) => {
      const dapp = {
        url,
        screenshotUrl: `/screenshots/${url
          .replace(/^(https?:\/\/)?(www\.)?/, "")
          .replace(/\/$/, "")
          .replace(/[^a-zA-Z0-9.-]/g, "_")}_screenshot.png`,
        name: new URL(url).hostname.replace("www.", ""),
      }
      setDapp(dapp)
      setLoading(false)

      // Update history if it's a new dapp
      if (!history.some((d) => d.url === url)) {
        setHistory((prev) => [...prev, dapp])
        setCurrentIndex((prev) => prev + 1)
        setFumbleStreak((prev) => prev + 1)
      }
    },
    [history]
  )

  useEffect(() => {
    if (hasFetchedRef.current) return

    const urlParam = searchParams.get("url")
    if (urlParam) {
      loadDappFromUrl(urlParam)
    } else {
      void fetchRandomDapp()
    }

    hasFetchedRef.current = true
  }, [searchParams, loadDappFromUrl, fetchRandomDapp])

  const handleFumbleAgain = () => {
    void fetchRandomDapp()
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1)
      const prevDapp = history[currentIndex - 1]
      setDapp(prevDapp)
      updateQueryParams(prevDapp.url)
      setFumbleStreak((prev) => Math.max(0, prev - 1))
    }
  }

  const handleNext = () => {
    if (currentIndex < history.length - 1) {
      setCurrentIndex((prev) => prev + 1)
      const nextDapp = history[currentIndex + 1]
      setDapp(nextDapp)
      updateQueryParams(nextDapp.url)
      setFumbleStreak((prev) => prev + 1)
    } else {
      void fetchRandomDapp()
    }
  }

  return (
    <div className="flex min-h-screen flex-col justify-between">
      <main className="flex flex-grow items-center justify-center p-4">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 px-0 text-center sm:px-8">
          <div className="w-full bg-rad-black">
            <div className="border border-rad-orange p-1">
              <TitleWithLines title={siteConfig.name} />
            </div>
            <div className="border border-t-0 border-rad-orange bg-rad-orange">
              <div className="bg-rad-black py-0 md:py-6">
                <div className="bg-black text-white font-['Joystix', monospace] w-full">
                  {loading ? (
                    <DappPreviewSkeleton />
                  ) : dapp ? (
                    <DappPreview
                      title={dapp.name}
                      description="Discover this amazing Solana dapp!"
                      screenshotUrl={dapp.screenshotUrl}
                      url={dapp.url}
                      onFumbleAgain={handleFumbleAgain}
                      onPrevious={handlePrevious}
                      onNext={handleNext}
                      hasPrevious={currentIndex > 0}
                      hasNext={true}
                      fumbleStreak={fumbleStreak}
                    />
                  ) : (
                    <div className="flex h-[300px] items-center justify-center sm:h-[400px]">
                      Failed to load dapp
                    </div>
                  )}
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
