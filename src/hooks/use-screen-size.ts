import { useEffect, useState } from "react"

const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
}

type BreakpointKey = keyof typeof breakpoints

export function useScreenSize() {
  const [screenSize, setScreenSize] = useState<BreakpointKey>("sm")

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      if (width >= breakpoints["2xl"]) {
        setScreenSize("2xl")
      } else if (width >= breakpoints.xl) {
        setScreenSize("xl")
      } else if (width >= breakpoints.lg) {
        setScreenSize("lg")
      } else if (width >= breakpoints.md) {
        setScreenSize("md")
      } else {
        setScreenSize("sm")
      }
    }

    // Set the initial size
    handleResize()

    // Add event listener
    window.addEventListener("resize", handleResize)

    // Clean up
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return screenSize
}

// Utility function to compare sizes
export function compareScreenSize(
  currentSize: BreakpointKey,
  comparedSize: BreakpointKey
): "smaller" | "equal" | "larger" {
  const currentValue = breakpoints[currentSize]
  const comparedValue = breakpoints[comparedSize]

  if (currentValue < comparedValue) {
    return "smaller"
  } else if (currentValue > comparedValue) {
    return "larger"
  } else {
    return "equal"
  }
}
