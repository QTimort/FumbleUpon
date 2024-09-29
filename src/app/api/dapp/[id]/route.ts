import { NextRequest, NextResponse } from "next/server"

import { EcosystemItem } from "@/types/Ecosystems"
import { getDappsFromEcosystems } from "@/lib/ecosystems"

export const revalidate = 0

const ecosystemFiles = ["alchemy", "cubik", "custom", "dudestoolbox"]
const ecosystems: Record<string, EcosystemItem[]> = {}

ecosystemFiles.forEach((file) => {
  ecosystems[file] = require(`../../../../../public/ecosystem/${file}.json`)
})

function cleanWebsiteName(url: string): string {
  return url
    .replace(/^(https?:\/\/)?(www\.)?/, "")
    .replace(/\/$/, "")
    .replace(/[^a-zA-Z0-9.-]/g, "_")
}

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const dapps = getDappsFromEcosystems(ecosystems)
  const dapp = dapps.find((d) => cleanWebsiteName(d) === params.id)

  if (dapp) {
    const cleanedWebsiteName = cleanWebsiteName(dapp)
    const screenshotUrl = `/screenshots/${cleanedWebsiteName}_screenshot.png`
    return NextResponse.json({
      id: cleanedWebsiteName,
      url: dapp,
      screenshotUrl,
    })
  } else {
    return NextResponse.json(
      {
        error: "Failed to find the requested dapp",
      },
      { status: 404 }
    )
  }
}
