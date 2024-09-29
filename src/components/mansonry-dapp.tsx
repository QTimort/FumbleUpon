import React from "react"

export interface MasonryDapps {
  id: number
  height: number
  content: string
  color: string
  url?: string
  screenshotUrl?: string
}

export const SkeletonMasonryDapp: React.FC<{ item: MasonryDapps }> = ({
  item,
}) => (
  <div
    className={`${item.content.length > 0 ? "bg-gray-200 animate-pulse rounded bg-rad-orange/20" : ""} -z-10`}
    style={{
      height: `${item.height}px`,
    }}
  />
)

export const MasonryDapp: React.FC<{ item: MasonryDapps }> = ({ item }) => (
  <div
    className={`${
      item.content.length > 0 ? "border border-rad-orange" : ""
    } -z-10`}
  >
    <div
      className="relative m-1 flex flex-col items-center justify-center overflow-hidden"
      style={{ height: `${item.height}px` }}
    >
      {item.screenshotUrl && (
        <>
          <div className="absolute inset-0 bg-rad-orange opacity-30" />
          <img
            className="relative z-10 h-full w-full object-cover opacity-80 sepia"
            src={item.screenshotUrl}
            alt={item.content}
          />
        </>
      )}
    </div>
  </div>
)
