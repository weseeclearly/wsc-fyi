'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function EcosystemLighting() {
  const sunRef = useRef<THREE.DirectionalLight>(null)
  
  useFrame(({ clock }) => {
    if (!sunRef.current) return
    
    const time = clock.getElapsedTime()
    
    // Subtle sun movement for dynamic lighting
    const sunAngle = time * 0.1
    sunRef.current.position.x = Math.cos(sunAngle) * 20
    sunRef.current.position.z = Math.sin(sunAngle) * 20
    
    // Subtle intensity variation
    sunRef.current.intensity = 0.8 + Math.sin(time * 0.2) * 0.1
  })

  return (
    <>
      {/* Main sun light */}
      <directionalLight
        ref={sunRef}
        position={[10, 15, 10]}
        intensity={0.8}
        color={new THREE.Color(1, 0.95, 0.8)}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
      />
      
      {/* Ambient light for overall illumination */}
      <ambientLight
        intensity={0.3}
        color={new THREE.Color(0.4, 0.6, 1)}
      />
      
      {/* Hemisphere light for sky/ground gradient */}
      <hemisphereLight
        skyColor={new THREE.Color(0.6, 0.8, 1)}
        groundColor={new THREE.Color(0.2, 0.4, 0.2)}
        intensity={0.4}
      />
      
      {/* Subtle fill lights */}
      <pointLight
        position={[-10, 5, -10]}
        intensity={0.2}
        color={new THREE.Color(0.8, 0.6, 1)}
        distance={30}
        decay={2}
      />
      
      <pointLight
        position={[10, 5, -10]}
        intensity={0.2}
        color={new THREE.Color(1, 0.8, 0.6)}
        distance={30}
        decay={2}
      />
    </>
  )
}