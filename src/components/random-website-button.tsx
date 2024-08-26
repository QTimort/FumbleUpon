// components/random-website-button.tsx

"use client"

import {useEffect, useState} from "react"
import { Button } from "@/components/ui/button"
import WebsiteScreenshot from "@/components/website-screenshot"

async function getNewSite(): Promise<{
  url?: string
  screenshotUrl?: string
  error?: string
}> {
  try {
    const response = await fetch(`/api/random`)
    const data = await response.json()
    if (!data.url) {
      return { error: data.error || "An unknown error occurred" }
    }
    return { url: data.url, screenshotUrl: data.screenshotUrl }
  } catch (error) {
    console.error("Failed to get a random website:", error)
    return { error: JSON.stringify(error) || "Unknown error" }
  }
}

const RandomWebsiteButton = () => {
  const [count, setCount] = useState<undefined | number>()
  const [currentSite, setCurrentSite] = useState<{
    url: string
    screenshotUrl: string
  } | null>(null)

  const goToRandomWebsite = async () => {
    try {
      const site = await getNewSite()
      if (!site.url || !site.screenshotUrl)
        throw new Error(site.error || "Failed to get a random website!")
      setCurrentSite({ url: site.url, screenshotUrl: site.screenshotUrl })
    } catch (error) {
      console.error("Failed to go to a new website:", error)
    }
  }

  useEffect(() => {
    fetch("/api/count")
      .then((r) => r.json())
      .then((r) => {
        setCount(r.count)
      })
  }, [])

  return (
    <div className="flex flex-col items-center gap-4  w-full">
      {currentSite ? (
        <WebsiteScreenshot
          key={currentSite.url}
          url={currentSite.url}
          screenshotUrl={currentSite.screenshotUrl}
          onFumbleAgain={goToRandomWebsite}
        />
      ) : (
        <Button
          variant="rad"
          className={"uppercase"}
          onClick={goToRandomWebsite}
        >{`FUMBLE UPON${count == null ? "" : " " + count + " Dapps"}`}</Button>
      )}
    </div>
  )
}

export default RandomWebsiteButton
