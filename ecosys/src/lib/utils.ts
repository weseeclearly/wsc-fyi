import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Ecosystem utility functions
export function generateEcosystemId(): string {
  return `ecosystem_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

export function calculateAnimaFromEngagement(engagement: any): number {
  // Convert engagement metrics to Anima energy
  const likes = engagement.likes || 0
  const retweets = engagement.retweets || 0
  const replies = engagement.replies || 0
  const bookmarks = engagement.bookmarks || 0
  
  return (likes * 1) + (retweets * 3) + (replies * 5) + (bookmarks * 10)
}

export function formatAnimaCount(anima: number): string {
  if (anima >= 1000000) {
    return `${(anima / 1000000).toFixed(1)}M`
  }
  if (anima >= 1000) {
    return `${(anima / 1000).toFixed(1)}K`
  }
  return anima.toString()
}