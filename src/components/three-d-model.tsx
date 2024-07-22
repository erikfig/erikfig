
import { useAnimations, useGLTF } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import React, { useEffect } from 'react';
import { Suspense } from "react";

export const ThreeDModel = () => {
  const myMesh = React.useRef<any>()
  const { scene, animations } = useGLTF('/erikfig/lost-programmer.glb')

  const [
    mousePosition,
    setMousePosition
  ] = React.useState({ x: 1000, y: 1000 })

  React.useEffect(() => {
    const updateMousePosition = (e: any) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', updateMousePosition);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
}, []);

  useFrame(({ clock }) => {
    myMesh.current.rotation.y = clock.getElapsedTime() / 40
    myMesh.current.rotation.x = clock.getElapsedTime() / 20
  })

  return (
    <mesh ref={myMesh} position={[3, 0, 0]} scale={[1, 1, 1]} rotation={[-2.5, -0.3, 0.3]}>
      <primitive object={scene} />
    </mesh>
  )
}

export const ThreeDModelCanva = () => {
  return (
    <Canvas flat linear camera={{ near: 0.1, far: 1000}} style={{ height: 'calc(100vh)', position: 'fixed', right: 0, top: 0, zIndex: -1}}>
        <Suspense fallback={null}>
          <directionalLight position={[1, 1, 1]} intensity={2} />

          <ThreeDModel />
        </Suspense>
    </Canvas>
  )
}

