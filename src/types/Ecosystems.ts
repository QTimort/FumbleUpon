export interface EcosystemItem {
  data?: {
    '@graph'?: Array<{
      '@type': string;
      mainEntity?: Array<{ '@type': string; url: string }>;
    }>;
  };
  url?: string;
  website?: string;
}

export type Ecosystems = Record<string, EcosystemItem[]>;
