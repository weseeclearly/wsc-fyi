'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, PerspectiveCamera } from '@react-three/drei'
import { Suspense } from 'react'
import { EcosystemTerrain } from './EcosystemTerrain'
import { SpiritSeed } from './SpiritSeed'
import { TwitterTree } from './elements/TwitterTree'
import { EcosystemLighting } from './EcosystemLighting'
import { LoadingSpinner } from './LoadingSpinner'

interface EcosystemCanvasProps {
  ecosystemData?: any
  className?: string
}

export function EcosystemCanvas({ ecosystemData, className }: EcosystemCanvasProps) {
  return (
    <div className={`w-full h-full relative ${className}`}>
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[10, 10, 10]} />
        
        <Suspense fallback={<LoadingSpinner />}>
          {/* Lighting setup */}
          <EcosystemLighting />
          
          {/* Environment and atmosphere */}
          <Environment preset="forest" />
          <fog attach="fog" args={['#4a5568', 20, 100]} />
          
          {/* Terrain base */}
          <EcosystemTerrain />
          
          {/* Spirit Seed - the mysterious center piece */}
          <SpiritSeed 
            position={[0, 0.5, 0]}
            energy={ecosystemData?.spiritSeed?.energy || 0}
            stage={ecosystemData?.spiritSeed?.stage || 'dormant'}
          />
          
          {/* Twitter ecosystem elements */}
          {ecosystemData?.platforms?.twitter && (
            <TwitterTree 
              position={[-3, 0, 2]}
              health={ecosystemData.platforms.twitter.health || 0.5}
              animaProduction={ecosystemData.platforms.twitter.animaProduction || 0}
            />
          )}
          
          {/* Other platform elements will go here */}
          
          {/* Camera controls */}
          <OrbitControls 
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={5}
            maxDistance={50}
            minPolarAngle={0}
            maxPolarAngle={Math.PI / 2}
          />
        </Suspense>
      </Canvas>
      
      {/* UI Overlay */}
      <div className="absolute top-4 left-4 z-10">
        <div className="bg-black/20 backdrop-blur-sm rounded-lg p-4 text-white">
          <h3 className="text-lg font-semibold mb-2">Your Digital Ecosystem</h3>
          <div className="space-y-1 text-sm">
            <div>Total Anima: {ecosystemData?.totalAnima || 0}</div>
            <div>Health Score: {Math.round((ecosystemData?.healthScore || 0) * 100)}%</div>
            <div>Diversity Index: {ecosystemData?.diversityIndex || 0}</div>
          </div>
        </div>
      </div>
      
      {/* Spirit Seed status */}
      <div className="absolute bottom-4 right-4 z-10">
        <div className="bg-purple-900/30 backdrop-blur-sm rounded-lg p-4 text-white border border-purple-400/30">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
            <span className="text-sm">Spirit Seed Energy: {ecosystemData?.spiritSeed?.energy || 0}</span>
          </div>
          <div className="text-xs text-purple-200 mt-1">
            Something ancient stirs...
          </div>
        </div>
      </div>
    </div>
  )
}