// components/dapp-preview.tsx

import React from "react"
import Image from "next/image"

import Logo from "@/components/logo"

interface DappPreviewProps {
  title: string
  description: string
  screenshotUrl: string
  url: string
  onFumbleAgain: () => void
  onPrevious: () => void
  onNext: () => void
  hasPrevious: boolean
  hasNext: boolean
  fumbleStreak: number
}

const DappPreview: React.FC<DappPreviewProps> = ({
  title,
  description,
  screenshotUrl,
  url,
  onFumbleAgain,
  onPrevious,
  onNext,
  hasPrevious,
  fumbleStreak,
}) => {
  return (
    <div className="bg-black text-white font-['Joystix', monospace] flex flex-col-reverse md:flex-row ">
      <div className="my-4 flex flex-col justify-between px-4 py-0 md:my-0  md:min-h-[500px] md:w-2/5 md:px-6">
        <div className="mb-4 flex justify-between">
          <div className="border border-rad-orange">
            <button
              onClick={onPrevious}
              disabled={!hasPrevious}
              className="bg-gray-200 text-black hover:bg-gray-300 rounded px-3 py-1 text-sm text-rad-orange transition-colors disabled:cursor-not-allowed disabled:opacity-50 md:px-4 md:py-2 md:text-base"
            >
              ← Prev
            </button>
          </div>
          <div className="border border-rad-orange">
            <button
              onClick={onNext}
              className="bg-gray-200 text-black hover:bg-gray-300 rounded px-3 py-1 text-sm text-rad-orange transition-colors sm:text-base md:px-4 md:py-2"
            >
              Next →
            </button>
          </div>
        </div>
        <div>
          <div className="mb-4 text-left md:mb-6">
            <h2 className="mb-2 break-words text-xl md:text-2xl">{title}</h2>
            <p className="break-words text-xs text-rad-orange md:text-sm">
              {description}
            </p>
          </div>
          <div className="space-y-6 md:space-y-4">
            <button
              onClick={() => window.open(url, "_blank", "noopener,noreferrer")}
              className="text-black hover:bg-yellow-600 w-full bg-rad-orange px-4 py-2 text-sm text-rad-black transition-colors md:text-base"
            >
              CHECK THE FULL DAPP
            </button>
            <button
              onClick={onFumbleAgain}
              className="text-white hover:bg-white hover:text-black w-full border border-rad-orange px-4 py-2 text-sm transition-colors md:text-base"
            >
              <div className="flex items-center justify-center gap-2">
                <Logo size={20} />
                <p>FUMBLE AGAIN</p>
                {fumbleStreak > 1 && (
                  <span className="ml-1 px-2 py-1 text-xs text-rad-white md:text-sm">
                    {"(" + fumbleStreak.toString().concat("🔥") + ")"}
                  </span>
                )}
              </div>
            </button>
          </div>
        </div>
      </div>
      <div className="relative h-[40vh] border-b border-rad-orange md:h-auto md:w-3/5 md:border md:border-r-0">
        <Image
          src={screenshotUrl}
          alt={`${title} preview`}
          fill
          sizes="(max-width: 768px) 100vw, 60vw"
          className="object-cover"
        />
      </div>
    </div>
  )
}

export default DappPreview
