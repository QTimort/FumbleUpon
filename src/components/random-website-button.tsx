"use client"

import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"

async function getNewSite(): Promise<{ url?: string; error?: string }> {
  try {
    const response = await fetch(`/api/random`)
    const data = await response.json()
    if (!data.url) {
      return { error: data.error || "An unknown error occurred" }
    }
    return { url: data.url }
  } catch (error) {
    console.error("Failed to check if embedding is allowed:", error)
    return { error: JSON.stringify(error) || "Unknown error" }
  }
}

const RandomWebsiteButton = () => {
  const [count, setCount] = useState<undefined | number>()

  const openNewWindow = (url: string) => {
    const newWindow = window.open(url, "_blank", "noopener")
    if (newWindow) {
      newWindow.opener = null
      newWindow.focus()
    }
  }

  const goToRandomWebsite = async () => {
    try {
      const site = await getNewSite()
      if (!site.url)
        throw new Error(site.error || "Failed to get a random website!")
      openNewWindow(site.url)
    } catch (error) {
      // todo handle error & loading
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
    <div>
      <Button
        variant="rad"
        className={'uppercase'}
        onClick={goToRandomWebsite}
      >{`FUMBLE UPON${count == null ? "" : " " + count + " Dapps"}`}</Button>
    </div>
  )
}
export default RandomWebsiteButton
