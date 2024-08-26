// components/DappCard.tsx

import React, { CSSProperties, useState } from "react"

interface DappCardProps {
  dapp: {
    url: string
    screenshotUrl: string
    name: string
  }
  className?: string
  style?: CSSProperties
}

const DappCard: React.FC<DappCardProps> = ({ dapp, className, style }) => {
  const [imageLoaded, setImageLoaded] = useState(false)

  const handleClick = () => {
    window.open(dapp.url, "_blank", "noopener,noreferrer")
  }

  return (
    <div
      className={`cursor-pointer border border-rad-orange ${className}`}
      style={style}
      onClick={handleClick}
    >
      <div
        className={`bg-gray-300 absolute inset-0 animate-pulse ${imageLoaded ? "hidden" : ""}`}
      />
      <img
        src={dapp.screenshotUrl}
        alt={dapp.name}
        className={`h-full w-full object-cover transition-opacity duration-300 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
        onLoad={() => setImageLoaded(true)}
      />
      <div className="from-transparent to-black absolute inset-0 bg-gradient-to-b opacity-70" />
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h3 className="text-white truncate text-lg font-bold">{dapp.name}</h3>
      </div>
    </div>
  )
}

export default DappCard
