// components/ExploreComponent.tsx

import React from 'react';
import Image from 'next/image';

interface ExploreComponentProps {
  dappCount: number;
}

const ExploreComponent: React.FC<ExploreComponentProps> = ({ dappCount }) => {
  return (
    <div className="bg-black text-white p-8 font-['Joystix', monospace]">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl">FUMBLEUPON</h1>
        <button className="bg-yellow-500 text-black px-4 py-2">FOLLOW US</button>
      </div>

      <div className="text-center mb-8">
        <h2 className="text-6xl mb-4">EXPLORE SOLANA</h2>
        <p className="text-yellow-500 text-xl mb-4">
          DISCOVER NEW DAPPS EVERYDAY<br />
          ACROSS THE NETWORK
        </p>
        <button className="border border-yellow-500 text-yellow-500 px-6 py-2">
          FUMBLEUPON {dappCount} DAPPS
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="relative aspect-video bg-gradient-to-b from-yellow-500 to-yellow-700 overflow-hidden">
            <Image
              src="/marinade-logo.png"
              alt="Marinade"
              layout="fill"
              objectFit="cover"
            />
            <div className="absolute inset-0 flex items-center justify-center text-black text-xl font-bold">
              <p>Welcome to the new<br />SOL staking meta</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreComponent;
