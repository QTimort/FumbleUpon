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
    <div className="bg-black text-white font-['Joystix', monospace] flex flex-col gap-4 p-4 md:flex-row">
      <div className="flex flex-col justify-between md:w-1/2">
        <div>
          <h2 className="mb-4 text-4xl">{title}</h2>
          <p className="text-yellow-500 mb-4 text-sm">{description}</p>
        </div>
        <div className="space-y-2">
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
              <Logo size={24} />
              <p>FUMBLE AGAIN</p>
            </div>
          </button>
          <button
            onClick={handleGoBack}
            className="bg-gray-200 text-black hover:bg-gray-300 mt-4 rounded px-4 py-2 transition-colors"
          >
            ← Go Back
          </button>
        </div>
      </div>
      <div className="md:w-1/2">
        <div className="relative aspect-video">
          <Image
            src={screenshotUrl}
            alt={`${title} preview`}
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>
    </div>
  )
}

export default DappPreview
