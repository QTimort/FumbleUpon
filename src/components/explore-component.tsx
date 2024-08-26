// components/ExploreComponent.tsx

import React from "react"
import Image from "next/image"

interface ExploreComponentProps {
  dappCount: number
}

const ExploreComponent: React.FC<ExploreComponentProps> = ({ dappCount }) => {
  return (
    <div className="bg-black text-white font-['Joystix', monospace] p-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl">FUMBLEUPON</h1>
        <button className="bg-yellow-500 text-black px-4 py-2">
          FOLLOW US
        </button>
      </div>

      <div className="mb-8 text-center">
        <h2 className="mb-4 text-6xl">EXPLORE SOLANA</h2>
        <p className="text-yellow-500 mb-4 text-xl">
          DISCOVER NEW DAPPS EVERYDAY
          <br />
          ACROSS THE NETWORK
        </p>
        <button className="border-yellow-500 text-yellow-500 border px-6 py-2">
          FUMBLEUPON {dappCount} DAPPS
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="from-yellow-500 to-yellow-700 relative aspect-video overflow-hidden bg-gradient-to-b"
          >
            <Image
              src="/marinade-logo.png"
              alt="Marinade"
              layout="fill"
              objectFit="cover"
            />
            <div className="text-black absolute inset-0 flex items-center justify-center text-xl font-bold">
              <p>
                Welcome to the new
                <br />
                SOL staking meta
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ExploreComponent
