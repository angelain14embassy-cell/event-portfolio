import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';

function RotatingCube() {
    const meshRef = useRef();

    useFrame((state, delta) => {
        meshRef.current.rotation.x += delta * 0.5;
        meshRef.current.rotation.y += delta * 0.6;
    });

    return (
        <Float speed={2} rotationIntensity={1} floatIntensity={2}>
            <mesh ref={meshRef}>
                <icosahedronGeometry args={[2, 1]} />
                <meshStandardMaterial color="#818CF8" wireframe />
            </mesh>
        </Float>
    );
}

export default function Hero3D() {
    return (
        <div style={{ height: '260px', width: '100%' }}>
            <Canvas camera={{ position: [0, 0, 6] }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1} />
                <RotatingCube />
                <OrbitControls enableZoom={false} />
            </Canvas>
        </div>
    );
}