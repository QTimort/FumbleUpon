// components/website-screenshot.tsx

"use client"

import { useState, useEffect } from "react"
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
  const [imageStatus, setImageStatus] = useState<'loading' | 'loaded' | 'error'>('loading')

  useEffect(() => {
    setImageStatus('loading')
  }, [screenshotUrl])

  const handleImageError = () => {
    setImageStatus('error')
  }

  const handleImageLoad = () => {
    setImageStatus('loaded')
  }

  const openWebsite = () => {
    window.open(url, "_blank", "noopener")
  }

  const cleanedWebsiteName = new URL(url).hostname.replace(/^www\./, '')

  return (
    <div className="flex flex-col items-center gap-4  w-full">
      <h2 className="text-xl font-bold text-rad-orange">{cleanedWebsiteName}</h2>
      <div
        className="cursor-pointer overflow-hidden  border border-rad-orange relative w-full h-auto bg-gray-500 aspect-video flex justify-center items-center"
        onClick={openWebsite}
      >
        <img
          src={screenshotUrl}
          alt={`${cleanedWebsiteName} Screenshot`}
          className={imageStatus !== 'loaded' ? 'w-[1px] h-[1px] ' : ''}
          onError={handleImageError}
          onLoad={handleImageLoad}
        />
        {imageStatus !== 'loaded' && (
          <div role="status" className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center inset-0">
            <div className="flex items-center justify-center w-full h-full bg-gray-700">
              <svg className="w-10 h-10 text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
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
