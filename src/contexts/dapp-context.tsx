"use client"

import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react"

export interface Dapp {
  id: string
  document: string
  productType: string
  category: string
  userTarget: string
  status: string | null
  handle: string
  logo: string
  logoUrl: string
  url: string
  description: string
  title: string
  preview: string
}

interface DappsContextType {
  dapps: Record<string, Dapp>
  getRandomDapps: (n: number) => { randomDapps: Dapp[]; totalDapps: number }
  getDappByUrl: (url: string) => Dapp | undefined
  isLoading: boolean
  error: string | null
}

const DappsContext = createContext<DappsContextType | undefined>(undefined)

export const useDapps = () => {
  const context = useContext(DappsContext)
  if (!context) {
    throw new Error("useDapps must be used within a DappsProvider")
  }
  return context
}

interface DappsProviderProps {
  children: ReactNode
}

export const DappsProvider: React.FC<DappsProviderProps> = ({ children }) => {
  const [dapps, setDapps] = useState<Record<string, Dapp>>({})
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [unusedDapps, setUnusedDapps] = useState<string[]>([])

  useEffect(() => {
    const fetchDapps = async () => {
      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/QTimort/FumbleUponDB/refs/heads/master/db.json"
        )
        if (!response.ok) {
          throw new Error("Failed to fetch dapps")
        }
        const data = (await response.json()) as { [key: string]: Dapp }
        const filteredData = Object.fromEntries(
          Object.entries(data || {}).filter(([, v]) => !!v?.url)
        )
        setDapps(filteredData)
        setUnusedDapps(Object.keys(filteredData))
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setIsLoading(false)
      }
    }

    fetchDapps()
  }, [])

  const getRandomDapps = (
    n: number
  ): { randomDapps: Dapp[]; totalDapps: number } => {
    const totalDapps = Object.keys(dapps).length

    if (n > totalDapps) {
      n = totalDapps // Limit n to the total number of dapps
    }

    let availableDapps = [...unusedDapps]

    if (availableDapps.length < n) {
      // Reset the unused dapps when there aren't enough left
      availableDapps = Object.keys(dapps)
    }

    const selectedDapps: Dapp[] = []

    for (let i = 0; i < n; i++) {
      const randomIndex = Math.floor(Math.random() * availableDapps.length)
      const randomDappKey = availableDapps[randomIndex]

      selectedDapps.push(dapps[randomDappKey])
      availableDapps.splice(randomIndex, 1)
    }

    // Update unusedDapps state
    setUnusedDapps(availableDapps)

    return { randomDapps: selectedDapps, totalDapps }
  }

  const getDappByUrl = (url: string): Dapp | undefined => {
    return Object.values(dapps).find((dapp) => dapp.url === url)
  }

  return (
    <DappsContext.Provider value={{ dapps, getRandomDapps, getDappByUrl, isLoading, error }}>
      {children}
    </DappsContext.Provider>
  )
}
