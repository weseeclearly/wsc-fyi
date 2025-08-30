import { EcosystemCanvas } from '@/components/ecosystem/EcosystemCanvas'
import { Button } from '@/components/ui/button'
import { Twitter, Sparkles, Zap } from 'lucide-react'

// Mock data for demonstration
const mockEcosystemData = {
  totalAnima: 1247,
  healthScore: 0.73,
  diversityIndex: 0.45,
  spiritSeed: {
    energy: 892,
    stage: 'awakening' as const,
  },
  platforms: {
    twitter: {
      health: 0.8,
      animaProduction: 45
    }
  }
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-purple-500 rounded-full flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">ECOSYS</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <Button variant="outline" className="text-white border-white/20 hover:bg-white/10">
              <Twitter className="w-4 h-4 mr-2" />
              Connect Twitter
            </Button>
            <Button variant="spirit">
              <Zap className="w-4 h-4 mr-2" />
              Awaken Spirit
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative">
        {/* Hero Section */}
        <div className="text-center py-12 px-6">
          <h2 className="text-5xl font-bold text-white mb-4">
            Your Digital <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-purple-500">Ecosystem</span> Awaits
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Watch your social media presence bloom into a living, breathing permaculture garden. 
            Nurture your digital soul and discover the symbiotic relationships in your online world.
          </p>
        </div>

        {/* 3D Ecosystem Canvas */}
        <div className="h-[600px] w-full">
          <EcosystemCanvas 
            ecosystemData={mockEcosystemData}
            className="rounded-xl overflow-hidden border border-white/10"
          />
        </div>

        {/* Features Section */}
        <div className="py-16 px-6">
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
              <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Living Analytics</h3>
              <p className="text-gray-300">
                Your social media metrics transform into a thriving 3D ecosystem that grows and evolves in real-time.
              </p>
            </div>

            <div className="text-center p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Spirit Companion</h3>
              <p className="text-gray-300">
                Nurture your digital soul as it awakens and evolves based on your creative energy and engagement.
              </p>
            </div>

            <div className="text-center p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Twitter className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Cross-Pollination</h3>
              <p className="text-gray-300">
                Discover how your platforms support each other and optimize your content for maximum symbiosis.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center py-16 px-6">
          <h3 className="text-3xl font-bold text-white mb-4">Ready to Grow Your Digital Garden?</h3>
          <p className="text-xl text-gray-300 mb-8">
            Join the creators who are transforming their analytics into living art.
          </p>
          <Button size="lg" variant="ecosystem" className="text-lg px-8 py-4">
            <Twitter className="w-5 h-5 mr-2" />
            Start Your Ecosystem Journey
          </Button>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 px-6 text-center text-gray-400">
        <p>&copy; 2024 ECOSYS. Cultivating digital consciousness.</p>
      </footer>
    </div>
  )
}