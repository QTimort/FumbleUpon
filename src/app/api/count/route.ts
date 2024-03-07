import { NextRequest, NextResponse } from "next/server"

import { EcosystemItem } from "@/types/Ecosystems"
import { getDappsFromEcosystems } from "@/lib/ecosystems"

const ecosystemFiles = ["alchemy", "cubik", "custom", "dudestoolbox"]
const ecosystems: Record<string, EcosystemItem[]> = {}

ecosystemFiles.forEach((file) => {
  ecosystems[file] = require(`../../../../public/ecosystem/${file}.json`)
})

export async function GET(req: NextRequest) {
  const dapps = getDappsFromEcosystems(ecosystems)
  return NextResponse.json({ count: dapps?.length || 0 })
}
