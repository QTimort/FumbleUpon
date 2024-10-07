import React, { useCallback, useEffect, useState } from "react"
import Image from "next/image"

import Logo from "@/components/logo"

interface DappPreviewProps {
  title: string
  productType: string
  category: string
  userTarget: string
  screenshotUrl: string
  url: string
  onFumbleAgain: () => void
  onPrevious: () => void
  onNext: () => void
  hasPrevious: boolean
  hasNext: boolean
  fumbleStreak: number
}

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(_: Error) {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.log({ error, errorInfo })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="bg-red-200 text-red-800 p-4">Error loading image</div>
      )
    }

    return this.props.children
  }
}

const ShimmerEffect: React.FC = () => (
  <div className="animate-shimmer from-gray-200 via-gray-300 to-gray-200 absolute h-full w-full bg-gradient-to-r bg-[length:400%_100%]" />
)

const DappPreview: React.FC<DappPreviewProps> = ({
  title,
  productType,
  category,
  userTarget,
  screenshotUrl,
  url,
  onFumbleAgain,
  onPrevious,
  onNext,
  hasPrevious,
  hasNext,
  fumbleStreak,
}) => {
  const [imageState, setImageState] = useState({
    currentImage: screenshotUrl || "",
    isLoading: true,
  })

  useEffect(() => {
    if (screenshotUrl && screenshotUrl !== imageState.currentImage) {
      setImageState((prevState) => ({
        ...prevState,
        currentImage: screenshotUrl,
        isLoading: true,
      }))
    }
  }, [screenshotUrl, imageState.currentImage])

  const handleImageLoad = useCallback(() => {
    setImageState((prevState) => ({ ...prevState, isLoading: false }))
  }, [])

  const handleImageError = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
      console.error("Error loading image:", e)
      setImageState((prevState) => ({ ...prevState, isLoading: false }))
    },
    []
  )

  const tags = [productType, category, userTarget]
    .map((s) => s?.split?.(","))
    .flat()
    .filter(Boolean)

  return (
    <div className="bg-black text-white font-['Joystix', monospace] flex flex-col-reverse md:flex-row">
      <div className="my-4 flex flex-col justify-between px-4 py-0 md:my-0 md:min-h-[500px] md:w-2/5 md:px-6">
        <div className="mb-4 flex justify-between">
          <div className="border border-rad-orange">
            <button
              onClick={onPrevious}
              disabled={!hasPrevious}
              className="bg-gray-200 text-black hover:bg-gray-300 rounded px-3 py-1 text-sm text-rad-orange transition-colors disabled:cursor-not-allowed disabled:opacity-50 md:px-4 md:py-2 md:text-base"
            >
              ← Prev
            </button>
          </div>
          <div className="border border-rad-orange">
            <button
              onClick={onNext}
              disabled={!hasNext}
              className="bg-gray-200 text-black hover:bg-gray-300 rounded px-3 py-1 text-sm text-rad-orange transition-colors disabled:cursor-not-allowed disabled:opacity-50 md:px-4 md:py-2 md:text-base"
            >
              Next →
            </button>
          </div>
        </div>
        <div>
          <div className="mb-4 text-left md:mb-6">
            <h2 className="mb-2 break-words text-xl md:text-2xl">{title}</h2>
            <div className="flex h-12 flex-wrap gap-2">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="h-6 border border-rad-orange px-2 py-1 text-xs  text-rad-orange"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="space-y-6 md:space-y-4">
            <button
              onClick={() => window.open(url, "_blank", "noopener,noreferrer")}
              className="text-black hover:bg-yellow-600 w-full bg-rad-orange px-4 py-2 text-sm text-rad-black transition-colors md:text-base"
            >
              CHECK THE FULL DAPP
            </button>
            <button
              onClick={onFumbleAgain}
              className="text-white hover:bg-white hover:text-black w-full border border-rad-orange px-4 py-2 text-sm transition-colors md:text-base"
            >
              <div className="flex items-center justify-center gap-2">
                <Logo size={20} />
                <p>FUMBLE AGAIN</p>
                {fumbleStreak > 1 && (
                  <span className="ml-1 px-2 py-1 text-xs text-rad-white md:text-sm">
                    {"(" + fumbleStreak.toString().concat("🔥") + ")"}
                  </span>
                )}
              </div>
            </button>
          </div>
        </div>
      </div>
      <div className="relative h-[40vh] overflow-hidden border-b border-rad-orange md:h-auto md:w-3/5 md:border md:border-r-0">
        {imageState.isLoading && <ShimmerEffect />}
        <ErrorBoundary key={imageState.currentImage}>
          {imageState.currentImage ? (
            <Image
              src={imageState.currentImage}
              alt={`No preview available`}
              fill
              sizes="(max-width: 768px) 100vw, 60vw"
              className={`object-cover transition-opacity duration-300 ${
                imageState.isLoading ? "opacity-0" : "opacity-100"
              }`}
              onLoad={handleImageLoad}
              onError={handleImageError}
              priority
            />
          ) : (
            <div className="bg-gray-200 text-gray-500 flex h-full w-full items-center justify-center">
              No image available
            </div>
          )}
        </ErrorBoundary>
      </div>
    </div>
  )
}

export default DappPreview
