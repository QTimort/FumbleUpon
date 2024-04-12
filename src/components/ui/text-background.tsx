import React from "react";
import {BG_TEXT} from "@/components/ui/bg-text";

export const TextBackground: React.FC = () => {
  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 -z-10 text-rad-orange overflow-hidden opacity-10 text-xs font-sans">
      {BG_TEXT}
    </div>
  );
};
