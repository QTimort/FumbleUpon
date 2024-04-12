import React from "react"

import { BG_TEXT } from "@/components/ui/bg-text"

export const TextBackground: React.FC = () => {
  return (
    <div className="absolute bottom-0 left-0 right-0 top-0 -z-10 overflow-hidden font-sans text-xs text-rad-orange opacity-10">
      {BG_TEXT}
    </div>
  )
}
