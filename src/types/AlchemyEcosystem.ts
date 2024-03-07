export interface AlchemyEcosystem {
  data: AlchemyData
}

export interface AlchemyData {
  "@context": string
  "@graph": AlchemyGraph[]
}

export interface AlchemyGraph {
  "@type": AlchemyGraphType
  url?: string
  headline?: string
  "@id": string
  significantLink?: string
  relatedLink?: string[]
  isPartOf: AlchemyIsPartOfElement[] | AlchemyPurpleIsPartOf
  breadcrumb?: AlchemyBreadcrumb
  reviewedBy?: AlchemyReviewedBy
  inLanguage?: AlchemyInLanguage
  datePublished?: string
  dateModified?: string
  keywords?: string[]
  mentions?: AlchemyReviewedBy[]
  mainEntity?: AlchemyMainEntity[]
}

export enum AlchemyGraphType {
  FAQPage = "FAQPage",
  WebPage = "WebPage",
}

export interface AlchemyBreadcrumb {
  "@type": AlchemyBreadcrumbType
  itemListElement: AlchemyItemListElement[]
}

export enum AlchemyBreadcrumbType {
  BreadcrumbList = "BreadcrumbList",
}

export interface AlchemyItemListElement {
  "@type": AlchemyItemListElementType
  position: number
  name: string
  item: string
}

export enum AlchemyItemListElementType {
  ListItem = "ListItem",
}

export enum AlchemyInLanguage {
  EnUS = "en-US",
}

export interface AlchemyIsPartOfElement {
  "@type": AlchemyPurpleType
  url: string
  headline?: AlchemyHeadline
  "@id": string
  publisher?: AlchemyPublisher
  name?: string
  isPartOf?: AlchemyReviewedBy
}

export enum AlchemyPurpleType {
  CollectionPage = "CollectionPage",
  WebSite = "WebSite",
}

export enum AlchemyHeadline {
  AlchemyTheWeb3DevelopmentPlatform = "Alchemy - the web3 development platform",
}

export interface AlchemyReviewedBy {
  "@type": AlchemyReviewedByType
  name: AlchemyName
  url?: string
  "@id": string
}

export enum AlchemyReviewedByType {
  CollectionPage = "CollectionPage",
  Organization = "Organization",
  Thing = "thing",
}

export enum AlchemyName {
  Alchemy = "Alchemy",
  Blockchain = "blockchain",
  DAOS = "DAOs",
  DAOTools = "DAO Tools",
  DeFiDapps = "DeFi Dapps",
  DeFiTools = "DeFi Tools",
  DecentralizedApplication = "decentralized application",
  DecentralizedGames = "Decentralized Games",
  IdentityTools = "Identity Tools",
  InfrastructureTools = "Infrastructure Tools",
  NFTDapps = "NFT Dapps",
  NFTTools = "NFT Tools",
  NewDappsAndTools = "New Dapps and Tools",
  RaaSTools = "RaaS Tools",
  RealWorldAssetDapps = "Real World Asset Dapps",
  SolidityTools = "Solidity Tools",
  TradingTools = "Trading Tools",
  VentureCapitalFirms = "Venture Capital Firms",
  Web3 = "web3",
  Web3DeveloperTools = "Web3 Developer Tools",
  Web3GamingTools = "Web3 Gaming Tools",
  Web3SecurityTools = "Web3 Security Tools",
  Web3ServiceProviders = "Web3 Service Providers",
  Web3SocialDapps = "Web3 Social Dapps",
  Web3WalletTools = "Web3 Wallet Tools",
  Web3Wallets = "Web3 Wallets",
}

export interface AlchemyPublisher {
  "@type": AlchemyReviewedByType
  "@id": string
}

export interface AlchemyPurpleIsPartOf {
  "@id": string
}

export interface AlchemyMainEntity {
  "@type": AlchemyMainEntityType
  name: string
  acceptedAnswer?: AlchemyAcceptedAnswer
  url?: string
  sameAs?: string
  logo?: AlchemyLogo[]
}

export enum AlchemyMainEntityType {
  OnlineBusiness = "OnlineBusiness",
  Question = "Question",
}

export interface AlchemyAcceptedAnswer {
  "@type": AcceptedAnswerType
  text: string
}

export enum AcceptedAnswerType {
  Answer = "Answer",
}

export interface AlchemyLogo {
  "@type": AlchemyLogoType
  name: string
  contentUrl: string
  keywords: string[]
}

export enum AlchemyLogoType {
  ImageObject = "ImageObject",
}
