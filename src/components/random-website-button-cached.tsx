// components/RandomWebsiteButtonCache.tsx
import React, { useCallback, useEffect, useState } from "react"
import { getNewSite } from "@/utils/getNewSite"

import { Button } from "@/components/ui/button"

const RandomWebsiteButtonCache = () => {
  const [count, setCount] = useState<undefined | number>()

  const openNewWindow = useCallback((url: string) => {
    const newWindow = window.open(url, "_blank", "noopener")
    if (newWindow) {
      newWindow.opener = null
      newWindow.focus()
    }
  }, [])

  const goToRandomWebsite = useCallback(async () => {
    try {
      const site = await getNewSite()
      if (!site.url)
        throw new Error(site.error || "Failed to get a random website!")
      openNewWindow(site.url)
    } catch (error) {
      // Handle error here, e.g., display user-friendly message or log to a centralized system
      console.error("Failed to go to a new website:", error)
    }
  }, [openNewWindow])

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const response = await fetch("/api/count")
        const data = await response.json()
        setCount(data.count)
      } catch (error) {
        console.error("Failed to fetch count:", error)
      }
    }

    fetchCount()
  }, [])

  return (
    <div>
      <Button onClick={goToRandomWebsite}>
        {`FUMBLE UPON${count === undefined ? "" : ` ${count} Dapps`}`}
      </Button>
    </div>
  )
}
export default RandomWebsiteButtonCache
