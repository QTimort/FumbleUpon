// components/dapp-preview.tsx

import React from 'react';
import Image from 'next/image';
import {useRouter} from "next/navigation";
import Logo from "@/components/logo";

interface DappPreviewProps {
  title: string;
  description: string;
  screenshotUrl: string;
  url: string;
  onFumbleAgain: () => void;
}

const DappPreview: React.FC<DappPreviewProps> = ({
                                                   title,
                                                   description,
                                                   screenshotUrl,
                                                   url,
                                                   onFumbleAgain
                                                 }) => {
  const router = useRouter();

  const handleGoBack = () => {
    router.push('/');
  };

  return (
    <div className="flex flex-col md:flex-row bg-black text-white font-['Joystix', monospace] p-4 gap-4">
      <div className="flex flex-col justify-between md:w-1/2">
        <div>
          <h2 className="text-4xl mb-4">{title}</h2>
          <p className="text-yellow-500 text-sm mb-4">{description}</p>
        </div>
        <div className="space-y-2">
          <button
            onClick={() => window.open(url, '_blank', 'noopener,noreferrer')}
            className="w-full text-black py-2 px-4 hover:bg-yellow-600 transition-colors text-rad-black bg-rad-orange"
          >
            CHECK THE FULL DAPP
          </button>
          <button
            onClick={onFumbleAgain}
            className="w-full border border-rad-orange text-white py-2 px-4 hover:bg-white hover:text-black transition-colors"
          >
            <div className={'flex justify-center gap-2'}>
              <Logo size={24}/>
              <p>
                FUMBLE AGAIN
              </p>
            </div>
          </button>
          <button
            onClick={handleGoBack}
            className="mt-4 bg-gray-200 text-black py-2 px-4 rounded hover:bg-gray-300 transition-colors"
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
  );
};

export default DappPreview;
