// app/api/random-dapps/route.ts

import { NextRequest, NextResponse } from "next/server"

import { EcosystemItem } from "@/types/Ecosystems"
import { getDappsFromEcosystems } from "@/lib/ecosystems"

export const revalidate = 0

function getRandomItemsFromArray<T>(arr: T[], count: number): T[] {
  const shuffled = [...arr].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}

const ecosystemFiles = ["alchemy", "cubik", "custom", "dudestoolbox"]
const ecosystems: Record<string, EcosystemItem[]> = {}

ecosystemFiles.forEach((file) => {
  ecosystems[file] = require(`../../../../public/ecosystem/${file}.json`)
})

function cleanWebsiteName(url: string): string {
  return url
    .replace(/^(https?:\/\/)?(www\.)?/, "")
    .replace(/\/$/, "")
    .replace(/[^a-zA-Z0-9.-]/g, "_")
}

export async function GET(req: NextRequest) {
  const dapps = getDappsFromEcosystems(ecosystems)
  const randomDapps = getRandomItemsFromArray(dapps, 7)

  const dappsWithScreenshots = randomDapps.map((dapp) => {
    const cleanedWebsiteName = cleanWebsiteName(dapp)
    const screenshotUrl = `/screenshots/${cleanedWebsiteName}_screenshot.png`
    return { url: dapp, screenshotUrl }
  })

  return NextResponse.json({ dapps: dappsWithScreenshots })
}
