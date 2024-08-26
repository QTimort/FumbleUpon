// components/DappCard.tsx

import React, { useState, CSSProperties } from 'react';

interface DappCardProps {
  dapp: {
    url: string;
    screenshotUrl: string;
    name: string;
  };
  className?: string;
  style?: CSSProperties;
}

const DappCard: React.FC<DappCardProps> = ({ dapp, className, style }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleClick = () => {
    window.open(dapp.url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      className={`cursor-pointer border border-rad-orange ${className}`}
      style={style}
      onClick={handleClick}
    >
      {/* Skeleton loader */}
      <div className={`absolute inset-0 bg-gray-300 animate-pulse ${imageLoaded ? 'hidden' : ''}`} />

      {/* Image */}
      <img
        src={dapp.screenshotUrl}
        alt={dapp.name}
        className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={() => setImageLoaded(true)}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-70" />

      {/* Dapp name */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h3 className="text-white text-lg font-bold truncate">{dapp.name}</h3>
      </div>
    </div>
  );
};

export default DappCard;
