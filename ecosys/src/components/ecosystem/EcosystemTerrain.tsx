'use client'

import { useRef, useMemo } from 'react'
import { Plane } from '@react-three/drei'
import * as THREE from 'three'

export function EcosystemTerrain() {
  const terrainRef = useRef<THREE.Mesh>(null)
  
  // Create a subtle height-mapped terrain
  const terrainGeometry = useMemo(() => {
    const geometry = new THREE.PlaneGeometry(50, 50, 100, 100)
    const positions = geometry.attributes.position.array as Float32Array
    
    // Add some gentle hills and valleys
    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i]
      const z = positions[i + 1]
      
      // Create rolling hills with Perlin-like noise
      const height = 
        Math.sin(x * 0.1) * Math.cos(z * 0.1) * 0.5 +
        Math.sin(x * 0.05) * Math.sin(z * 0.05) * 1.0 +
        Math.random() * 0.1
      
      positions[i + 2] = height
    }
    
    geometry.computeVertexNormals()
    return geometry
  }, [])
  
  // Create grass-like material with subtle animation
  const terrainMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        grassColor: { value: new THREE.Color(0.2, 0.6, 0.3) },
        dirtColor: { value: new THREE.Color(0.4, 0.3, 0.2) }
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vPosition;
        varying vec3 vNormal;
        uniform float time;
        
        void main() {
          vUv = uv;
          vPosition = position;
          vNormal = normal;
          
          vec3 pos = position;
          // Subtle grass movement
          pos.z += sin(pos.x * 2.0 + time) * 0.01;
          pos.z += cos(pos.y * 1.5 + time * 0.8) * 0.01;
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec3 grassColor;
        uniform vec3 dirtColor;
        varying vec2 vUv;
        varying vec3 vPosition;
        varying vec3 vNormal;
        
        void main() {
          // Mix grass and dirt based on height and slope
          float heightFactor = smoothstep(-1.0, 1.0, vPosition.z);
          float slopeFactor = dot(vNormal, vec3(0.0, 0.0, 1.0));
          
          vec3 color = mix(dirtColor, grassColor, heightFactor * slopeFactor);
          
          // Add some variation
          float noise = sin(vUv.x * 50.0) * sin(vUv.y * 50.0) * 0.1 + 0.9;
          color *= noise;
          
          gl_FragColor = vec4(color, 1.0);
        }
      `
    })
  }, [])

  return (
    <group>
      {/* Main terrain */}
      <mesh
        ref={terrainRef}
        geometry={terrainGeometry}
        material={terrainMaterial}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      />
      
      {/* Subtle ambient particles */}
      <group>
        {Array.from({ length: 20 }, (_, i) => (
          <mesh
            key={i}
            position={[
              (Math.random() - 0.5) * 40,
              Math.random() * 5 + 2,
              (Math.random() - 0.5) * 40
            ]}
          >
            <sphereGeometry args={[0.02, 8, 8]} />
            <meshBasicMaterial
              color={new THREE.Color(0.8, 0.9, 0.6)}
              transparent
              opacity={0.6}
            />
          </mesh>
        ))}
      </group>
    </group>
  )
}