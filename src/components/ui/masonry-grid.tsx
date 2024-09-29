import React, { useEffect, useRef, useState } from "react"

interface Item {
  id: string | number
  height: number
  [key: string]: any // Allow for additional properties
}

interface MasonryGridProps<T extends Item> {
  items: T[]
  columnCount?: number
  gap?: number
  renderItem: (item: T) => React.ReactNode
  columnWidth?: number
}

function MasonryGrid<T extends Item>({
  items,
  columnCount = 4,
  gap = 16,
  renderItem,
  columnWidth,
}: MasonryGridProps<T>) {
  const gridRef = useRef<HTMLDivElement>(null)
  const [columns, setColumns] = useState<T[][]>(
    Array(columnCount)
      .fill([])
      .map(() => [])
  )

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      distributeItems()
    })

    if (gridRef.current) {
      resizeObserver.observe(gridRef.current)
    }

    return () => {
      if (gridRef.current) {
        resizeObserver.unobserve(gridRef.current)
      }
    }
  }, [items, columnCount])

  const distributeItems = () => {
    const newColumns: T[][] = Array(columnCount)
      .fill([])
      .map(() => [])
    const columnHeights: number[] = Array(columnCount).fill(0)

    items.forEach((item) => {
      const shortestColumnIndex = columnHeights.indexOf(
        Math.min(...columnHeights)
      )
      newColumns[shortestColumnIndex].push(item)
      columnHeights[shortestColumnIndex] += item.height
    })

    setColumns(newColumns)
  }

  return (
    <div
      ref={gridRef}
      className="w-full"
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${columnCount}, 1fr)`,
        gap: `${gap}px`,
      }}
    >
      {columns.map((column, columnIndex) => (
        <div
          key={columnIndex}
          className="flex min-w-48 flex-col"
          style={{
            gap: `${gap}px`,
            width: columnWidth != null ? columnWidth + "px" : "auto",
          }}
        >
          {column.map((item) => (
            <div key={item.id}>{renderItem(item)}</div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default MasonryGrid
