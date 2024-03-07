export interface DudesToolboxEcosystem {
  id: number
  name: string
  description: string
  icon: string
  twitter: null | string
  discord: string
  website: string
  colorFrom: string
  colorTo: string
  createdAt: Date
  updatedAt: Date
  chainId: number
  toolTypeId: number | null
  categories: DudesToolboxCategory[]
}

export interface DudesToolboxCategory {
  id: number
  name: string
  color: string
  isHidden: null
  createdAt: Date
  updatedAt: Date
  toolId: number
}
