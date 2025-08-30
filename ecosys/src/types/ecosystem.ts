// Core ecosystem types
export interface EcosystemData {
  id: string
  userId: string
  platforms: Platform[]
  spiritSeed: SpiritSeed
  totalAnima: number
  healthScore: number
  diversityIndex: number
  createdAt: Date
  updatedAt: Date
}

export interface Platform {
  id: string
  type: 'twitter' | 'instagram' | 'linkedin' | 'youtube' | 'tiktok'
  username: string
  isConnected: boolean
  lastSync: Date
  metrics: PlatformMetrics
  visualElement: EcosystemElement
}

export interface PlatformMetrics {
  followers: number
  engagement: number
  posts: number
  recentPerformance: ContentPerformance[]
}

export interface ContentPerformance {
  id: string
  type: 'tweet' | 'post' | 'video' | 'story'
  content: string
  timestamp: Date
  metrics: {
    likes: number
    shares: number
    comments: number
    saves: number
    views?: number
  }
  animaGenerated: AnimaBreakdown
}

export interface AnimaBreakdown {
  sunlight: number    // likes, views
  seed: number        // shares, retweets
  root: number        // comments, replies
  heartwood: number   // saves, bookmarks
  total: number
}

export interface EcosystemElement {
  id: string
  type: 'tree' | 'plant' | 'flower' | 'mushroom' | 'wildlife'
  position: [number, number, number]
  scale: number
  health: number
  animaProduction: number
  lastUpdate: Date
  metadata: {
    platformSource: string
    contentSource?: string
    rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary'
  }
}

// Spirit Seed system
export interface SpiritSeed {
  id: string
  stage: 'dormant' | 'awakening' | 'hatched'
  energy: number
  pulseRate: number
  glowIntensity: number
  position: [number, number, number]
  awakensAt: Date | null
  metadata: {
    animaAbsorbed: AnimaBreakdown
    uniqueTraits: string[]
    rarityScore: number
  }
}

// AI Companion
export interface AICompanion {
  id: string
  name: string
  personality: 'wise' | 'energetic' | 'mystical' | 'analytical'
  avatar: string
  insights: CompanionInsight[]
  lastInteraction: Date
}

export interface CompanionInsight {
  id: string
  type: 'observation' | 'prediction' | 'suggestion' | 'celebration'
  message: string
  timestamp: Date
  isRead: boolean
  metadata: {
    triggerEvent?: string
    confidence: number
    actionable: boolean
  }
}

// Ecosystem visualization
export interface EcosystemScene {
  terrain: TerrainConfig
  lighting: LightingConfig
  weather: WeatherConfig
  elements: EcosystemElement[]
  spiritSeed: SpiritSeed
}

export interface TerrainConfig {
  size: number
  height: number
  texture: string
  fertility: number
}

export interface LightingConfig {
  sunIntensity: number
  ambientColor: string
  sunColor: string
  timeOfDay: 'dawn' | 'day' | 'dusk' | 'night'
}

export interface WeatherConfig {
  type: 'sunny' | 'cloudy' | 'rainy' | 'stormy'
  intensity: number
  effects: string[]
}