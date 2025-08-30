'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Cylinder, Sphere } from '@react-three/drei'
import * as THREE from 'three'

interface TwitterTreeProps {
  position: [number, number, number]
  health: number
  animaProduction: number
}

export function TwitterTree({ position, health, animaProduction }: TwitterTreeProps) {
  const treeRef = useRef<THREE.Group>(null)
  const leavesRef = useRef<THREE.Group>(null)
  const animaParticlesRef = useRef<THREE.Group>(null)
  
  // Calculate tree characteristics based on health
  const treeHeight = useMemo(() => 2 + health * 3, [health])
  const leafColor = useMemo(() => {
    // Healthy trees are more vibrant
    return new THREE.Color().setHSL(0.3, 0.8, 0.3 + health * 0.4)
  }, [health])
  
  const trunkColor = useMemo(() => {
    return new THREE.Color().setHSL(0.08, 0.6, 0.2 + health * 0.2)
  }, [health])

  useFrame(({ clock }) => {
    if (!leavesRef.current || !animaParticlesRef.current) return
    
    const time = clock.getElapsedTime()
    
    // Gentle swaying of leaves
    leavesRef.current.rotation.z = Math.sin(time * 0.5) * 0.1 * health
    leavesRef.current.rotation.x = Math.cos(time * 0.3) * 0.05 * health
    
    // Animate anima particles floating up
    animaParticlesRef.current.children.forEach((particle, index) => {
      const particleTime = time + index * 0.5
      particle.position.y = 1 + (particleTime * 0.5) % 4
      particle.position.x = Math.sin(particleTime) * 0.5
      particle.position.z = Math.cos(particleTime) * 0.5
      
      // Fade out as they rise
      const opacity = 1 - ((particleTime * 0.5) % 4) / 4
      ;(particle as THREE.Mesh).material = new THREE.MeshBasicMaterial({
        color: new THREE.Color(0.3, 0.8, 1),
        transparent: true,
        opacity: opacity * 0.6
      })
    })
  })

  return (
    <group ref={treeRef} position={position}>
      {/* Tree trunk */}
      <Cylinder args={[0.3, 0.5, treeHeight, 8]} position={[0, treeHeight / 2, 0]} castShadow>
        <meshStandardMaterial
          color={trunkColor}
          roughness={0.8}
          metalness={0.1}
        />
      </Cylinder>
      
      {/* Tree leaves/canopy */}
      <group ref={leavesRef} position={[0, treeHeight * 0.8, 0]}>
        {/* Main canopy */}
        <Sphere args={[1.5 + health, 16, 16]} castShadow>
          <meshStandardMaterial
            color={leafColor}
            roughness={0.7}
            metalness={0.1}
          />
        </Sphere>
        
        {/* Additional leaf clusters for healthy trees */}
        {health > 0.7 && (
          <>
            <Sphere args={[0.8, 12, 12]} position={[-1, 0.5, 0.5]} castShadow>
              <meshStandardMaterial
                color={leafColor}
                roughness={0.7}
                metalness={0.1}
              />
            </Sphere>
            <Sphere args={[0.6, 10, 10]} position={[1.2, 0.3, -0.8]} castShadow>
              <meshStandardMaterial
                color={leafColor}
                roughness={0.7}
                metalness={0.1}
              />
            </Sphere>
          </>
        )}
        
        {/* Twitter-blue accents for engagement */}
        {Array.from({ length: Math.floor(animaProduction / 10) }, (_, i) => (
          <Sphere
            key={i}
            args={[0.1, 8, 8]}
            position={[
              (Math.random() - 0.5) * 2,
              (Math.random() - 0.5) * 2,
              (Math.random() - 0.5) * 2
            ]}
          >
            <meshStandardMaterial
              color={new THREE.Color(0.1, 0.6, 1)}
              emissive={new THREE.Color(0.05, 0.3, 0.5)}
              emissiveIntensity={0.5}
            />
          </Sphere>
        ))}
      </group>
      
      {/* Anima particles floating upward */}
      <group ref={animaParticlesRef}>
        {Array.from({ length: Math.min(10, animaProduction) }, (_, i) => (
          <mesh key={i}>
            <sphereGeometry args={[0.05, 6, 6]} />
            <meshBasicMaterial
              color={new THREE.Color(0.3, 0.8, 1)}
              transparent
              opacity={0.6}
            />
          </mesh>
        ))}
      </group>
      
      {/* Subtle glow effect for high-performing trees */}
      {health > 0.8 && (
        <pointLight
          position={[0, treeHeight, 0]}
          color={new THREE.Color(0.3, 0.8, 1)}
          intensity={0.5}
          distance={5}
          decay={2}
        />
      )}
    </group>
  )
}