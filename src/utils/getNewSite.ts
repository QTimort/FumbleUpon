// utils/getNewSite.ts
import { fetchAndCache } from "./fetchAndCache"

export async function getNewSite(): Promise<{ url?: string; error?: string }> {
  try {
    const response = await fetchAndCache("/api/random")
    const data = await response.json()

    if (!data.url) {
      return { error: data.error || "An unknown error occurred" }
    }

    return { url: data.url }
  } catch (error) {
    console.error("Failed to check if embedding is allowed:", error)
    return { error: JSON.stringify(error) || "Unknown error" }
  }
}
