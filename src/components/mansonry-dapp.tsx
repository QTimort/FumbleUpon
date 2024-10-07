import React, { useCallback, useEffect, useMemo, useState } from "react"

export interface MasonryDapps {
  id: number
  height: number
  content: string
  color: string
  url?: string
  screenshotUrl?: string
}

interface MasonryGridProps {
  items: MasonryDapps[]
  columnCount: number
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
            loading="lazy"
          />
        </>
      )}
    </div>
  </div>
)

export const MasonryGrid: React.FC<MasonryGridProps> = ({
  items,
  columnCount,
}) => {
  const [columns, setColumns] = useState<MasonryDapps[][]>(
    Array(columnCount).fill([])
  )

  const distributeItems = useCallback(() => {
    const newColumns: MasonryDapps[][] = Array(columnCount)
      .fill([])
      .map(() => [])
    const columnHeights = Array(columnCount).fill(0)

    items.forEach((item) => {
      const shortestColumnIndex = columnHeights.indexOf(
        Math.min(...columnHeights)
      )
      newColumns[shortestColumnIndex].push(item)
      columnHeights[shortestColumnIndex] += item.height
    })

    setColumns(newColumns)
  }, [items, columnCount])

  useEffect(() => {
    distributeItems()
  }, [distributeItems])

  const masonryStyle = useMemo(
    () => ({
      display: "grid",
      gridTemplateColumns: `repeat(${columnCount}, 1fr)`,
      gridGap: "1rem",
    }),
    [columnCount]
  )

  return (
    <div style={masonryStyle}>
      {columns.map((column, columnIndex) => (
        <div key={columnIndex}>
          {column.map((item) => (
            <React.Fragment key={item.id}>
              {item.content ? (
                <MasonryDapp item={item} />
              ) : (
                <SkeletonMasonryDapp item={item} />
              )}
            </React.Fragment>
          ))}
        </div>
      ))}
    </div>
  )
}
