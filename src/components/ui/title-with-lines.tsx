import React from "react"
import Link from "next/link"

interface TitleWithLinesProps {
  title: string
  link?: string
}

const TitleWithLines: React.FC<TitleWithLinesProps> = ({ title, link }) => {
  const Content = (
    <div className="flex w-full items-center justify-center px-2">
      <div className="flex flex-1 flex-col gap-y-[3px]">
        <div className="flex-1 border-t border-rad-orange"></div>
        <div className="flex-1 border-t border-rad-orange"></div>
        <div className="flex-1 border-t border-rad-orange"></div>
      </div>
      <span className="px-2 text-lg font-semibold uppercase">{title}</span>
      <div className="flex flex-1 flex-col gap-y-[3px]">
        <div className="flex-1 border-t border-rad-orange"></div>
        <div className="flex-1 border-t border-rad-orange"></div>
        <div className="flex-1 border-t border-rad-orange"></div>
      </div>
    </div>
  )

  const FollowUsLink = (
    <div className="mx-2 border-l border-rad-orange px-2">
      <Link
        href="https://twitter.com/FumbleUpon_"
        target="_blank"
        rel="noopener noreferrer"
        className=""
      >
        <span className="z-10 text-center text-rad-orange md:text-left">
          ■{" "}
        </span>
        <span>follow us</span>
      </Link>
    </div>
  )

  const containerClass = "flex w-full items-center justify-center px-2"

  if (link) {
    return (
      <div className={containerClass}>
        <Link href={link} className="flex grow items-center">
          {Content}
        </Link>
        {FollowUsLink}
      </div>
    )
  }

  return (
    <div className={containerClass}>
      {Content}
      {FollowUsLink}
    </div>
  )
}

export default TitleWithLines
