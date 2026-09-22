"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Line, OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";

function SignalOrbit() {
  const group = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (group.current) {
      group.current.rotation.y = clock.getElapsedTime() * 0.08;
      group.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.18) * 0.08;
    }
  });
  const points = Array.from({ length: 42 }, (_, index) => {
    const angle = index * 0.48;
    const radius = 1.2 + (index % 5) * 0.16;
    return new THREE.Vector3(Math.cos(angle) * radius, Math.sin(angle * 1.7) * 0.7, Math.sin(angle) * radius);
  });
  return <group ref={group}><Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.5}><Line points={points} color="#e8b96a" lineWidth={1.2} transparent opacity={0.72} /><mesh><icosahedronGeometry args={[0.38, 1]} /><meshStandardMaterial color="#e8b96a" emissive="#8b5e2d" emissiveIntensity={0.7} roughness={0.35} metalness={0.65} /></mesh><mesh position={[1.8, 0.8, -0.8]}><sphereGeometry args={[0.055, 16, 16]} /><meshBasicMaterial color="#f4e5c8" /></mesh><mesh position={[-1.7, -0.6, 0.9]}><sphereGeometry args={[0.035, 16, 16]} /><meshBasicMaterial color="#e8b96a" /></mesh></Float></group>;
}

export function HeroScene() {
  return <div className="hero-scene"><Canvas camera={{ position: [0, 0, 5.4], fov: 42 }} gl={{ antialias: true, alpha: true }} dpr={[1, 1.8]}><color attach="background" args={["#0a0c0d"]} /><Stars radius={5} depth={2.5} count={160} factor={3} saturation={0} fade speed={0.45} /><SignalOrbit /><OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.35} /></Canvas></div>;
}
