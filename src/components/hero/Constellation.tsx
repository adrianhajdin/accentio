"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import type { MotionValue } from "motion/react";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import mapData from "@/data/north-america.json";
import { getStageLayout } from "./layout";

/*
 * North America, assembled from dots. Nothing is visible in the hero. As the
 * visitor scrolls past it, `morph` goes 0 → 1: ~1,400 dots fade in, scattered
 * in 3D around the map area, and fly into place west → east until they form a
 * dotted map of North America.
 */

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uMorph;
  uniform float uPixelRatio;
  uniform float uSize;
  uniform vec3 uMapCenter;
  uniform float uMapScale;

  attribute vec3 aScatter;
  attribute vec2 aMap;
  attribute float aRand;
  attribute float aDelay;

  varying float vAlpha;

  void main() {
    float t = clamp(uMorph * 1.5 - aDelay * 0.5, 0.0, 1.0);
    t = t * t * (3.0 - 2.0 * t);

    vec3 home = vec3(aMap, 0.0);
    // Start scattered around the map in 3D, drifting gently.
    vec3 drift = 0.03 * vec3(sin(uTime * 0.7 + aRand * 30.0), cos(uTime * 0.6 + aRand * 20.0), 0.0);
    vec3 start = home + aScatter + drift;
    vec3 p = mix(start, home, t);

    vec3 pos = uMapCenter + p * uMapScale;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);

    gl_PointSize = uSize * mix(0.55 + aRand * 0.5, 0.82, t) * uPixelRatio;
    // Fade in as the morph begins; fully settled dots are steady.
    float appear = smoothstep(0.0, 0.35, uMorph - aDelay * 0.15);
    vAlpha = appear * mix(0.35, 0.8, t);
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 uColor;
  varying float vAlpha;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = (1.0 - smoothstep(0.32, 0.5, d)) * vAlpha;
    if (a < 0.01) discard;
    gl_FragColor = vec4(uColor, a);
  }
`;

/** Deterministic pseudo-random so reloads look the same. */
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildGeometry() {
  const rand = mulberry32(11);
  const pts = mapData.points as [number, number][];
  const n = pts.length;
  const scatter = new Float32Array(n * 3);
  const map = new Float32Array(n * 2);
  const rnd = new Float32Array(n);
  const delay = new Float32Array(n);

  for (let i = 0; i < n; i++) {
    map[i * 2] = pts[i][0];
    map[i * 2 + 1] = pts[i][1];
    // Random offset in a sphere (map units), biased outward.
    const u = rand() * 2 - 1;
    const phi = rand() * Math.PI * 2;
    const rad = 0.35 + Math.pow(rand(), 0.6) * 0.9;
    const s = Math.sqrt(1 - u * u);
    scatter[i * 3] = Math.cos(phi) * s * rad;
    scatter[i * 3 + 1] = u * rad;
    scatter[i * 3 + 2] = Math.sin(phi) * s * rad * 1.4;
    rnd[i] = rand();
    // Sweep west → east with a little jitter.
    delay[i] = Math.min(1, ((pts[i][0] + 1) / 2) * 0.85 + rand() * 0.15);
  }

  const g = new THREE.BufferGeometry();
  // `position` is required by three; real positions are computed in the shader.
  g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(n * 3), 3));
  g.setAttribute("aScatter", new THREE.BufferAttribute(scatter, 3));
  g.setAttribute("aMap", new THREE.BufferAttribute(map, 2));
  g.setAttribute("aRand", new THREE.BufferAttribute(rnd, 1));
  g.setAttribute("aDelay", new THREE.BufferAttribute(delay, 1));
  g.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 1e6);
  return g;
}

function createMaterial() {
  return new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    transparent: true,
    depthWrite: false,
    uniforms: {
      uTime: { value: 0 },
      uMorph: { value: 0 },
      uPixelRatio: { value: 1 },
      uSize: { value: 5 },
      uMapCenter: { value: new THREE.Vector3() },
      uMapScale: { value: 1 },
      uColor: { value: new THREE.Color("#8a65ad") },
    },
  });
}

type SceneProps = {
  morph: MotionValue<number>;
  reduceMotion: boolean;
  active: boolean;
};

function Dots({ morph, reduceMotion, active }: SceneProps) {
  const geometry = useMemo(() => buildGeometry(), []);
  const material = useMemo(() => createMaterial(), []);
  const pointsRef = useRef<THREE.Points<THREE.BufferGeometry, THREE.ShaderMaterial>>(null);
  const { size, viewport, gl, invalidate } = useThree();

  // Render on demand: only when scroll moves the morph (and, below, while the
  // dots are still flying in). A settled or empty map costs no frames, which
  // keeps the GPU free for scrolling on phones.
  useEffect(() => morph.on("change", () => invalidate()), [morph, invalidate]);
  useEffect(() => {
    if (active) invalidate();
  }, [active, invalidate]);

  // Re-layout on resize: convert the shared pixel layout to world units.
  useEffect(() => {
    const points = pointsRef.current;
    if (!points) return;
    const u = points.material.uniforms;
    const k = viewport.width / size.width;
    const l = getStageLayout(size.width, size.height);
    u.uMapCenter.value.set(l.map.x * k, l.map.y * k, 0);
    u.uMapScale.value = l.map.s * k;
    u.uPixelRatio.value = gl.getPixelRatio();
    u.uSize.value = l.desktop ? 5.6 : 4.2;
    invalidate();
  }, [size, viewport.width, gl, invalidate]);

  useEffect(
    () => () => {
      geometry.dispose();
      material.dispose();
    },
    [geometry, material],
  );

  useFrame((_, delta) => {
    const points = pointsRef.current;
    if (!points) return;
    const u = points.material.uniforms;
    const dt = Math.min(delta, 0.05);
    if (!reduceMotion) u.uTime.value += dt;
    const target = morph.get();
    const next = THREE.MathUtils.damp(u.uMorph.value, target, 6, dt);
    const settled = Math.abs(next - target) < 0.0005;
    u.uMorph.value = settled ? target : next;
    // Keep going while easing, or while partly assembled (the dots drift).
    const drifting = !reduceMotion && u.uMorph.value > 0 && u.uMorph.value < 1;
    if (!settled || drifting) invalidate();
  });

  return <points ref={pointsRef} geometry={geometry} material={material} frustumCulled={false} />;
}

export default function Constellation(props: SceneProps) {
  return (
    <Canvas
      className="!absolute inset-0"
      style={{ pointerEvents: "none" }}
      frameloop={props.active ? "demand" : "never"}
      // The canvas lives in a sticky layer; it never needs re-measuring on scroll.
      resize={{ scroll: false }}
      dpr={[1, 1.5]}
      // Soft round dots are anti-aliased in the shader; MSAA only costs GPU time.
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 10], fov: 30 }}
      fallback={null}
    >
      <Dots {...props} />
    </Canvas>
  );
}
