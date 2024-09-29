// components/dapp-preview.tsx

import React from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"

import Logo from "@/components/logo"

interface DappPreviewProps {
  title: string
  description: string
  screenshotUrl: string
  url: string
  onFumbleAgain: () => void
}

const DappPreview: React.FC<DappPreviewProps> = ({
  title,
  description,
  screenshotUrl,
  url,
  onFumbleAgain,
}) => {
  const router = useRouter()

  const handleGoBack = () => {
    router.push("/")
  }

  return (
    <div className="bg-black text-white font-['Joystix', monospace] flex flex-col md:flex-row min-h-[400px]">
      <div className="px-6 flex flex-col justify-between md:w-2/5">
        <div className="flex justify-between">
          <div className={'border-rad-orange border '}>
            <button
              onClick={handleGoBack}
              className="bg-gray-200 text-black hover:bg-gray-300 rounded px-4 py-2 text-rad-orange transition-colors"
            >
              ← Back
            </button>
          </div>
          <div className={'border-rad-orange border '}>
            <button
              onClick={handleGoBack}
              className="bg-gray-200 text-black hover:bg-gray-300 rounded px-4 py-2 text-rad-orange transition-colors"
            >
              Next →
            </button>
          </div>
        </div>
        <div>
          <div className={'text-left mb-8'}>
            <h2 className="text-2xl">{title}</h2>
            <p className="text-rad-orange text-sm">{description}</p>
          </div>
          <div className="space-y-4">
            <button
              onClick={() => window.open(url, "_blank", "noopener,noreferrer")}
              className="text-black hover:bg-yellow-600 w-full bg-rad-orange px-4 py-2 text-rad-black transition-colors"
            >
              CHECK THE FULL DAPP
            </button>
            <button
              onClick={onFumbleAgain}
              className="text-white hover:bg-white hover:text-black w-full border border-rad-orange px-4 py-2 transition-colors"
            >
              <div className={"flex justify-center gap-2"}>
                <Logo size={24}/>
                <p>FUMBLE AGAIN</p>
              </div>
            </button>
          </div>
        </div>
      </div>
      <div className="md:w-3/5 border border-r-0 border-rad-orange">
        <Image
          src={screenshotUrl}
          alt={`${title} preview`}
          layout="fill"
          className={'!relative !object-cover'}
          objectFit="cover"
        />
      </div>
    </div>
  )
}

export default DappPreview
