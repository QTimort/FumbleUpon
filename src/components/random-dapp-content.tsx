"use client"

import React, { useCallback, useEffect, useRef, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Dapp, useDapps } from "@/contexts/dapp-context"

import DappPreview from "@/components/dapp-preview"

export default function RandomDappContent() {
  const { getRandomDapps, getDappByUrl, isLoading, error } = useDapps()
  const [dapp, setDapp] = useState<Dapp | null>(null)
  const [history, setHistory] = useState<Dapp[]>([])
  const [currentIndex, setCurrentIndex] = useState(-1)
  const [fumbleStreak, setFumbleStreak] = useState(0)
  const router = useRouter()
  const searchParams = useSearchParams()
  const hasFetchedRef = useRef(false)
  const [isInitialLoad, setIsInitialLoad] = useState(true)

  const fetchRandomDapp = useCallback(() => {
    const { randomDapps } = getRandomDapps(1)
    if (randomDapps.length > 0) {
      const newDapp = randomDapps[0]
      setDapp(newDapp)
      setHistory((prev) => [...prev.slice(0, currentIndex + 1), newDapp])
      setCurrentIndex((prev) => prev + 1)
      updateQueryParams(newDapp.url)
      setFumbleStreak((prev) => prev + 1)
    }
  }, [currentIndex, getRandomDapps])

  const updateQueryParams = useCallback(
    (url: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set("url", url)
      router.replace(`/random-dapp?${params.toString()}`)
    },
    [router, searchParams]
  )

  const loadDappFromUrl = useCallback(
    (url: string) => {
      const dapp = getDappByUrl(url)
      if (dapp) {
        setDapp(dapp)
        // Update history if it's a new dapp
        if (!history.some((d) => d.url === url)) {
          setHistory((prev) => [...prev, dapp])
          setCurrentIndex((prev) => prev + 1)
        }
      } else {
        console.error(`Dapp with URL ${url} not found`)
        fetchRandomDapp()
      }
    },
    [history, getDappByUrl, fetchRandomDapp]
  )

  useEffect(() => {
    if (hasFetchedRef.current || isLoading) return

    const urlParam = searchParams.get("url")
    if (urlParam) {
      loadDappFromUrl(urlParam)
    } else {
      fetchRandomDapp()
    }

    hasFetchedRef.current = true
  }, [searchParams, loadDappFromUrl, fetchRandomDapp, isLoading])

  useEffect(() => {
    if (hasFetchedRef.current || isLoading) return

    const urlParam = searchParams.get("url")
    if (urlParam) {
      loadDappFromUrl(urlParam)
    }

    hasFetchedRef.current = true
  }, [searchParams, loadDappFromUrl, isLoading])

  const goBack = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1)
      setDapp(history[currentIndex - 1])
      updateQueryParams(history[currentIndex - 1].url)
      setFumbleStreak((prev) => prev - 1)
    }
  }, [currentIndex, history, updateQueryParams])

  const handleFumbleAgain = () => {
    setIsInitialLoad(false)
    void fetchRandomDapp()
  }

  const handlePrevious = () => {
    setIsInitialLoad(false)
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1)
      const prevDapp = history[currentIndex - 1]
      setDapp(prevDapp)
      updateQueryParams(prevDapp.url)
      setFumbleStreak((prev) => Math.max(0, prev - 1))
    }
  }

  const handleNext = () => {
    setIsInitialLoad(false)
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

  return isLoading ? (
    <DappPreview
      title={" "}
      screenshotUrl={"/placeholder.png"}
      userTarget={"Target"}
      category={"Category"}
      productType={"Product"}
      url={"#"}
      onFumbleAgain={handleFumbleAgain}
      onPrevious={() => {}}
      onNext={() => {}}
      hasPrevious={currentIndex > 0}
      hasNext={true}
      fumbleStreak={fumbleStreak}
    />
  ) : dapp ? (
    <DappPreview
      title={dapp.title}
      userTarget={dapp.userTarget}
      category={dapp.category}
      productType={dapp.productType}
      screenshotUrl={dapp.preview}
      url={isInitialLoad ? "#" : dapp.url}
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
  )
}
