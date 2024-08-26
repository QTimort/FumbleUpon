// components/Logo.tsx

import React from "react"

interface LogoProps {
  size?: number
  colorClass?: string
  className?: string
}

const Logo: React.FC<LogoProps> = ({
  size = 100,
  colorClass = "fill-rad-orange",
  className = "",
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 162 232"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${colorClass} ${className}`}
      style={{ aspectRatio: "1 / 1" }}
    >
      <path d="M92.6098 0.327454V46.6248H46.3125V23.4053H69.3904V0.327454H92.6098Z" />
      <path d="M161.985 46.6249V92.9222H138.765V116H161.985V162.297H138.765V139.078H92.6097V162.297H69.3903V185.375H46.3124V208.595H23.093V231.673H0.0151367V185.375H23.093V116H69.3903V92.9222H92.6097V46.6249H161.985Z" />
      <path d="M23.093 92.923H0.0151367V116.001H23.093V92.923Z" />
    </svg>
  )
}

export default Logo
