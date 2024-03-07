import { NextRequest, NextResponse } from "next/server"

import { EcosystemItem } from "@/types/Ecosystems"
import { getDappsFromEcosystems } from "@/lib/ecosystems"

function generateRandom(seed: number): number {
  const a = 1664525;
  const c = 1013904223;
  const m = 2 ** 32;
  seed = (a * seed + c) % m;
  return seed / m;
}


function getRandomItemFromArray<T>(arr: T[]): T | undefined {
  if (arr.length === 0) return undefined
  // we dont use Math.random because it output the same result on vercel
  const randomIndex: number = Math.floor(generateRandom(Date.now()) * arr.length)
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
