import React from 'react';

interface TitleWithLinesProps {
  title: string;
}

const TitleWithLines: React.FC<TitleWithLinesProps> = ({ title }) => {
  return (
    <div className="flex items-center justify-center w-full px-2">
      <div className="flex flex-col gap-y-[3px] flex-1">
        <div className="flex-1 border-t border-rad-orange"></div>
        <div className="flex-1 border-t border-rad-orange"></div>
        <div className="flex-1 border-t border-rad-orange"></div>
      </div>
      <span className="px-2 text-lg font-semibold uppercase">{title}</span>
      <div className="flex flex-col gap-y-[3px] flex-1">
        <div className="flex-1 border-t border-rad-orange"></div>
        <div className="flex-1 border-t border-rad-orange"></div>
        <div className="flex-1 border-t border-rad-orange"></div>
      </div>
    </div>
  );
};

export default TitleWithLines;
