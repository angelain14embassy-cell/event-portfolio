import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Torus, Float, Stars, Sparkles } from '@react-three/drei';
import { useTheme } from '../context/ThemeContext';

// Central Dynamic Wireframe Node
function ACMCentralCore({ isDark }) {
    const coreRef = useRef();

    useFrame(({ clock }) => {
        if (coreRef.current) {
            coreRef.current.rotation.x = clock.getElapsedTime() * 0.15;
            coreRef.current.rotation.y = clock.getElapsedTime() * 0.25;
        }
    });

    return (
        <Float speed={2} rotationIntensity={1} floatIntensity={1.5}>
            {/* Outer Wireframe Sphere */}
            <Sphere ref={coreRef} args={[1, 48, 48]} scale={2}>
                <MeshDistortMaterial
                    color={isDark ? "#3b82f6" : "#2563eb"}
                    attach="material"
                    distort={0.35}
                    speed={2}
                    roughness={0.1}
                    wireframe={true}
                />
            </Sphere>

            {/* Inner Glowing Core */}
            <Sphere args={[0.7, 32, 32]}>
                <meshStandardMaterial
                    color={isDark ? "#a855f7" : "#7c3aed"}
                    emissive={isDark ? "#9333ea" : "#6d28d9"}
                    emissiveIntensity={1.5}
                    roughness={0.3}
                />
            </Sphere>
        </Float>
    );
}

// Tech Data Rings orbiting the core
function OrbitingRings({ isDark }) {
    const ring1Ref = useRef();
    const ring2Ref = useRef();

    useFrame(({ clock }) => {
        const time = clock.getElapsedTime();
        if (ring1Ref.current) {
            ring1Ref.current.rotation.x = time * 0.4;
            ring1Ref.current.rotation.y = time * 0.2;
        }
        if (ring2Ref.current) {
            ring2Ref.current.rotation.x = -time * 0.3;
            ring2Ref.current.rotation.z = time * 0.5;
        }
    });

    const ringColor = isDark ? "#60a5fa" : "#3b82f6";

    return (
        <>
            <Torus ref={ring1Ref} args={[2.8, 0.02, 16, 100]}>
                <meshStandardMaterial color={ringColor} wireframe emissive={ringColor} emissiveIntensity={0.8} />
            </Torus>
            <Torus ref={ring2Ref} args={[3.2, 0.015, 16, 100]}>
                <meshStandardMaterial color="#a855f7" wireframe emissive="#a855f7" emissiveIntensity={0.8} />
            </Torus>
        </>
    );
}

const Hero3D = () => {
    // Theme context hook (falls back smoothly if provider isn't mounted)
    let theme = 'dark';
    try {
        const themeContext = useTheme();
        theme = themeContext.theme;
    } catch (e) {
        // default to dark
    }

    const isDark = theme === 'dark';

    return (
        <div style={{ width: '100%', height: '500px', position: 'relative' }}>
            <React.Suspense fallback={<div style={{ color: '#60a5fa', textAlign: 'center', paddingTop: '100px' }}>Loading 3D Node Workspace...</div>}>
                <Canvas camera={{ position: [0, 0, 7], fov: 45 }}>
                    <ambientLight intensity={0.8} />
                    <directionalLight position={[5, 5, 5]} intensity={1.5} />
                    <pointLight position={[-5, -5, -5]} color="#3b82f6" intensity={2} />

                    {/* Interactive Background Stars & Floating Data Sparkles */}
                    <Stars radius={80} depth={50} count={2500} factor={4} saturation={0} fade speed={1.5} />
                    <Sparkles count={80} scale={6} size={3} speed={0.4} color={isDark ? "#60a5fa" : "#2563eb"} />

                    {/* 3D ACM Visuals */}
                    <ACMCentralCore isDark={isDark} />
                    <OrbitingRings isDark={isDark} />

                    {/* Smooth Controls for Mouse Drag/Rotate */}
                    <OrbitControls
                        enableZoom={false}
                        autoRotate
                        autoRotateSpeed={1.2}
                        maxPolarAngle={Math.PI / 1.8}
                        minPolarAngle={Math.PI / 3}
                    />
                </Canvas>
            </React.Suspense>
        </div>
    );
};

export default Hero3D;