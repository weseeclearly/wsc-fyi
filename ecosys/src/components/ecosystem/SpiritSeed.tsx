'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sphere, Icosahedron } from '@react-three/drei'
import * as THREE from 'three'

interface SpiritSeedProps {
  position: [number, number, number]
  energy: number
  stage: 'dormant' | 'awakening' | 'hatched'
}

export function SpiritSeed({ position, energy, stage }: SpiritSeedProps) {
  const seedRef = useRef<THREE.Group>(null)
  const innerCoreRef = useRef<THREE.Mesh>(null)
  const outerShellRef = useRef<THREE.Mesh>(null)
  const energyFieldRef = useRef<THREE.Mesh>(null)
  
  // Calculate pulsing based on energy level
  const pulseRate = useMemo(() => {
    return Math.max(0.5, energy / 1000) // Higher energy = faster pulse
  }, [energy])
  
  const glowIntensity = useMemo(() => {
    return Math.min(2, energy / 500) // Higher energy = brighter glow
  }, [energy])

  useFrame(({ clock }) => {
    if (!seedRef.current || !innerCoreRef.current || !outerShellRef.current || !energyFieldRef.current) return
    
    const time = clock.getElapsedTime()
    
    // Pulsing animation
    const pulse = Math.sin(time * pulseRate) * 0.1 + 1
    seedRef.current.scale.setScalar(pulse)
    
    // Inner core rotation
    innerCoreRef.current.rotation.y = time * 0.5
    innerCoreRef.current.rotation.x = time * 0.3
    
    // Outer shell counter-rotation
    outerShellRef.current.rotation.y = -time * 0.2
    outerShellRef.current.rotation.z = time * 0.1
    
    // Energy field animation
    energyFieldRef.current.rotation.y = time * 0.8
    
    // Floating animation
    seedRef.current.position.y = position[1] + Math.sin(time * 0.5) * 0.2
  })

  // Create swirling energy material
  const energyMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        energy: { value: energy },
        glowIntensity: { value: glowIntensity }
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vPosition;
        uniform float time;
        
        void main() {
          vUv = uv;
          vPosition = position;
          
          vec3 pos = position;
          pos += sin(pos * 2.0 + time) * 0.1;
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform float energy;
        uniform float glowIntensity;
        varying vec2 vUv;
        varying vec3 vPosition;
        
        void main() {
          vec2 center = vec2(0.5);
          float dist = distance(vUv, center);
          
          // Create swirling pattern
          float angle = atan(vUv.y - 0.5, vUv.x - 0.5) + time * 2.0;
          float spiral = sin(angle * 3.0 + dist * 10.0 - time * 4.0) * 0.5 + 0.5;
          
          // Energy glow
          float glow = 1.0 - smoothstep(0.0, 0.5, dist);
          glow *= spiral;
          glow *= glowIntensity;
          
          // Purple-pink gradient
          vec3 color = mix(
            vec3(0.5, 0.2, 0.8),  // Purple
            vec3(0.8, 0.2, 0.6),  // Pink
            spiral
          );
          
          gl_FragColor = vec4(color * glow, glow * 0.8);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending
    })
  }, [energy, glowIntensity])

  return (
    <group ref={seedRef} position={position}>
      {/* Energy field - outermost glow */}
      <Sphere ref={energyFieldRef} args={[2, 32, 32]}>
        <primitive object={energyMaterial} attach="material" />
      </Sphere>
      
      {/* Outer shell - crystalline structure */}
      <Icosahedron ref={outerShellRef} args={[1.2, 0]}>
        <meshPhysicalMaterial
          color={new THREE.Color(0.3, 0.1, 0.5)}
          transparent
          opacity={0.3}
          roughness={0.1}
          metalness={0.8}
          clearcoat={1}
          clearcoatRoughness={0.1}
          transmission={0.9}
          thickness={0.5}
        />
      </Icosahedron>
      
      {/* Inner core - the actual seed */}
      <Sphere ref={innerCoreRef} args={[0.8, 16, 16]}>
        <meshStandardMaterial
          color={new THREE.Color(0.6, 0.2, 0.9)}
          emissive={new THREE.Color(0.2, 0.05, 0.3)}
          emissiveIntensity={glowIntensity}
          roughness={0.2}
          metalness={0.1}
        />
      </Sphere>
      
      {/* Particle effects for different stages */}
      {stage === 'awakening' && (
        <group>
          {/* Add particle system here for awakening stage */}
        </group>
      )}
      
      {/* Point light for illumination */}
      <pointLight
        color={new THREE.Color(0.6, 0.2, 0.9)}
        intensity={glowIntensity * 2}
        distance={10}
        decay={2}
      />
    </group>
  )
}