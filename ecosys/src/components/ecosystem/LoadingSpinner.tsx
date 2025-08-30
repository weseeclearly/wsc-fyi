'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import * as THREE from 'three'

export function LoadingSpinner() {
  const spinnerRef = useRef<THREE.Group>(null)
  
  useFrame(() => {
    if (spinnerRef.current) {
      spinnerRef.current.rotation.y += 0.02
    }
  })

  return (
    <group ref={spinnerRef} position={[0, 2, 0]}>
      {/* Spinning ecosystem elements */}
      {Array.from({ length: 8 }, (_, i) => {
        const angle = (i / 8) * Math.PI * 2
        const radius = 2
        return (
          <mesh
            key={i}
            position={[
              Math.cos(angle) * radius,
              Math.sin(i * 0.5) * 0.5,
              Math.sin(angle) * radius
            ]}
          >
            <sphereGeometry args={[0.1, 8, 8]} />
            <meshStandardMaterial
              color={new THREE.Color().setHSL(i / 8, 0.8, 0.6)}
              emissive={new THREE.Color().setHSL(i / 8, 0.5, 0.2)}
            />
          </mesh>
        )
      })}
      
      {/* Loading text */}
      <Text
        position={[0, -1, 0]}
        fontSize={0.5}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        Growing your ecosystem...
      </Text>
    </group>
  )
}