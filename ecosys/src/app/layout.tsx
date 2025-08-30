import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ECOSYS - Your Living Digital Ecosystem',
  description: 'Transform your social media analytics into a thriving 3D permaculture garden. Nurture your digital soul and watch your content ecosystem bloom.',
  keywords: 'analytics, social media, ecosystem, permaculture, digital garden, creator tools, Twitter analytics, content strategy',
  authors: [{ name: 'ECOSYS Team' }],
  openGraph: {
    title: 'ECOSYS - Your Living Digital Ecosystem',
    description: 'Transform your social media analytics into a thriving 3D permaculture garden.',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'ECOSYS - Digital Ecosystem Visualization'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ECOSYS - Your Living Digital Ecosystem',
    description: 'Transform your social media analytics into a thriving 3D permaculture garden.',
    images: ['/og-image.jpg']
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}