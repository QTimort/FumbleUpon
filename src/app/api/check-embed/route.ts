import { NextRequest, NextResponse } from "next/server"
import axios from "axios"

export async function GET(
  req: NextRequest,
  context: { params: { url: string } }
) {
  const searchParams = new URL(req.url)?.searchParams
  const url = searchParams?.get("url")

  if (!url) {
    return NextResponse.json({ error: "No URL provided" })
  }

  try {
    const response = await axios.head(url)
    const canEmbed = !(
      "x-frame-options" in response.headers ||
      ("content-security-policy" in response.headers &&
        response.headers["content-security-policy"].includes("frame-ancestors"))
    )
    return NextResponse.json({ canEmbed })
  } catch (error) {
    console.error("Error checking URL:", error)
    return NextResponse.json({ error: "Failed to fetch the URL" })
  }
}
