// utils/fetchAndCache.ts
import { CacheStorage } from "./cacheStorage";

const cache = new CacheStorage();

export async function fetchAndCache(url: string, options?: RequestInit): Promise<Response> {
  const cachedResponse = cache.get(url);
  if (cachedResponse) {
    return cachedResponse;
  }

  const response = await fetch(url, options);
  cache.set(url, response.clone());

  return response;
}