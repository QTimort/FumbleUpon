// components/website-screenshot.tsx

"use client"

import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"

interface WebsiteScreenshotProps {
  url: string
  screenshotUrl: string
  onFumbleAgain: () => void
}

const WebsiteScreenshot: React.FC<WebsiteScreenshotProps> = ({
  url,
  screenshotUrl,
  onFumbleAgain,
}) => {
  const [imageStatus, setImageStatus] = useState<
    "loading" | "loaded" | "error"
  >("loading")

  useEffect(() => {
    setImageStatus("loading")
  }, [screenshotUrl])

  const handleImageError = () => {
    setImageStatus("error")
  }

  const handleImageLoad = () => {
    setImageStatus("loaded")
  }

  const openWebsite = () => {
    window.open(url, "_blank", "noopener")
  }

  const cleanedWebsiteName = new URL(url).hostname.replace(/^www\./, "")

  return (
    <div className="flex w-full flex-col items-center  gap-4">
      <h2 className="text-xl font-bold text-rad-orange">
        {cleanedWebsiteName}
      </h2>
      <div
        className="bg-gray-500 relative  flex aspect-video h-auto w-full cursor-pointer items-center justify-center overflow-hidden border border-rad-orange"
        onClick={openWebsite}
      >
        <img
          src={screenshotUrl}
          alt={`${cleanedWebsiteName} Screenshot`}
          className={imageStatus !== "loaded" ? "h-[1px] w-[1px] " : ""}
          onError={handleImageError}
          onLoad={handleImageLoad}
        />
        {imageStatus !== "loaded" && (
          <div
            role="status"
            className="inset-0 animate-pulse space-y-8 md:flex md:items-center md:space-x-8 md:space-y-0 rtl:space-x-reverse"
          >
            <div className="bg-gray-700 flex h-full w-full items-center justify-center">
              <svg
                className="text-gray-600 h-10 w-10"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 18"
              >
                <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
              </svg>
            </div>
            <span className="sr-only">Loading...</span>
          </div>
        )}
      </div>
      <Button variant="rad" onClick={onFumbleAgain}>
        FUMBLE AGAIN
      </Button>
    </div>
  )
}

export default WebsiteScreenshot
