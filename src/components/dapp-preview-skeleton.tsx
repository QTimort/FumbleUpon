import React from "react"

const DappPreviewSkeleton: React.FC = () => {
  return (
    <div className="bg-black text-white font-['Joystix', monospace] flex flex-col-reverse md:flex-row">
      <div className="my-4 flex flex-col justify-between px-4 py-0 md:my-0 md:min-h-[500px] md:w-2/5 md:px-6">
        <div className="mb-4 flex justify-between">
          <div className="border border-rad-orange">
            <div className="bg-gray-600 h-8 w-16 animate-pulse rounded px-3 py-1 md:px-4 md:py-2"></div>
          </div>
          <div className="border border-rad-orange">
            <div className="bg-gray-600 h-8 w-16 animate-pulse rounded px-3 py-1 md:px-4 md:py-2"></div>
          </div>
        </div>
        <div>
          <div className="mb-4 text-left md:mb-6">
            <div className="bg-gray-600 mb-2 h-8 w-3/4 animate-pulse"></div>
            <div className="bg-gray-600 h-4 w-full animate-pulse"></div>
          </div>
          <div className="space-y-6 md:space-y-4">
            <div className="h-10 w-full animate-pulse bg-rad-orange"></div>
            <div className="h-10 w-full border border-rad-orange">
              <div className="bg-gray-600 h-full w-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative h-[40vh] border-b border-rad-orange md:h-auto md:w-3/5 md:border md:border-r-0">
        <div className="bg-gray-600 absolute inset-0 animate-pulse"></div>
      </div>
    </div>
  )
}

export default DappPreviewSkeleton
