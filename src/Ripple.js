import React, { Suspense, useRef, useState } from "react";
import * as THREE from "three";
import { useFrame } from "react-three-fiber";

import "./styles.css";

const clock = new THREE.Clock();

const uniforms = {
  time: { type: "float", value: 0.0 },
  mouse: { type: "vec2", value: new THREE.Vector2() },
  colorA: { type: "vec3", value: new THREE.Color(0x68c3c0) }
};

const vertexShader = /* glsl */ `
  #define AMP 0.2
  #define FREQ 10.0
  #define PI 3.14159265359

  uniform float time;
  uniform vec2 mouse;

  varying vec2 vUv;
  varying vec3 vPos;

  void main() {
    vec2 vUv = uv;
    vec3 pos = position;

    float dist = distance(uv, mouse);
    float decay = clamp(dist * 5.0, 1.0, 10.0);

    float ripple = sin(-PI * FREQ * dist + time) * (AMP / decay);

    pos.z = ripple;
    vPos.z = pos.z;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 colorA;

  varying vec3 vColor;
  varying vec3 vPos;

  void main() {
    gl_FragColor.rgb = colorA + vPos.z;
    gl_FragColor.a = 1.0;
  }
`;

const shader = { uniforms, vertexShader, fragmentShader };

function Plane({ defaultUv }) {
  const ref = useRef();

  const size = [5, 5];
  const res = [60, 60];

  const [uv, setUv] = useState(defaultUv);

  const useTime = (unitsPerSecond) => {
    const [time, setTime] = useState(false);
    useFrame(() => {
      const tick = unitsPerSecond * clock.getDelta();
      setTime(time + tick);
    });
    return time;
  };

  return (
    <mesh ref={ref} onPointerMove={({ uv }) => setUv(uv)}>
      <planeGeometry attach="geometry" args={[...size, ...res]} />
      <shaderMaterial
        attach="material"
        args={[shader]}
        uniforms-time-value={useTime(4)}
        uniforms-mouse-value={uv}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

const Ripple = () => {
  return (
    <mesh
      style={{ background: "white" }}
      pixelRatio={window.devicePixelRatio}
      camera={{ position: [0, 0, 5] }}
    >
      <Suspense fallback={null}>
        <Plane defaultUv={[0.5, 0.5]} />
      </Suspense>
    </mesh>
  );
};

export default Ripple;
