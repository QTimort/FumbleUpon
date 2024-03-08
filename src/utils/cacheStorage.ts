// utils/cacheStorage.ts
import { isResponseFresh } from "./isResponseFresh"

const MAX_CACHE_SIZE = 100

export class CacheStorage {
  private cache: Map<string, Response>

  constructor() {
    this.cache = new Map()
  }

  get(url: string): Response | undefined {
    const cachedResponse = this.cache.get(url)
    if (!cachedResponse || !isResponseFresh(cachedResponse)) {
      this.cache.delete(url)
      return
    }
    return cachedResponse
  }

  set(url: string, response: Response): void {
    this.cache.set(url, response)
    this.trimCache()
  }

  private trimCache(): void {
    if (this.cache.size > MAX_CACHE_SIZE) {
      const oldestKey = Array.from(this.cache.keys())[0]
      this.cache.delete(oldestKey)
    }
  }
}
