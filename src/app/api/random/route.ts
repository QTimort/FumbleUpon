import { NextRequest, NextResponse } from "next/server"

import { EcosystemItem } from "@/types/Ecosystems"
import { getDappsFromEcosystems } from "@/lib/ecosystems"

// tell to not cache this route
export const revalidate = 0

function getRandomItemFromArray<T>(arr: T[]): T | undefined {
  if (arr.length === 0) return undefined
  const randomIndex: number = Math.floor(Math.random() * arr.length)
  return arr[randomIndex]
}

const ecosystemFiles = ["alchemy", "cubik", "custom", "dudestoolbox"]
const ecosystems: Record<string, EcosystemItem[]> = {}

ecosystemFiles.forEach((file) => {
  ecosystems[file] = require(`../../../../public/ecosystem/${file}.json`)
})


export async function GET(req: NextRequest) {
  const dapps = getDappsFromEcosystems(ecosystems)
  const url = getRandomItemFromArray(dapps)

  if (url) {
    return NextResponse.json({ url })
  } else {
    return NextResponse.json({
      error: "Failed to find a URL for the selected ecosystem item",
    })
  }
}
