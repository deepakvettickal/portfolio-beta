//sphere
import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";

import { RepeatWrapping, sRGBEncoding, Vector3 } from "three";
import { useTexture } from "@react-three/drei";

import { vertexShader, moonFragmentShader } from "./earthShaders";

// import earthday from "/earthday.jpg";

export default function Moon(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef();
  // Rotate mesh every frame, this is outside of React without overhead
  // useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.001));
  useFrame(() => (mesh.current.rotation.y -= 0.001));

  const moonDayTexture = useTexture("/moonday.jpg");
  const moonNightTexture = useTexture("/moonnight.jpg");

  return (
    <mesh {...props} ref={mesh} scale={[1.0, 1.0, 1.0]} rotation={[0, 0, 0]}>
      {/* //args={[radius, width, height]} */}
      <sphereBufferGeometry attach="geometry" args={[1, 32, 32]} />
      {/* <meshStandardMaterial attach="material" color="blue" /> */}
      <shaderMaterial
        uniforms={{
          uDayTexture: { value: moonDayTexture },
          uNightTexture: { value: moonNightTexture },
          uSunDirection: { value: new Vector3(1.0, 0, 0) }
          // uSpecularTexture : {} //do later
        }}
        // Feed the shaders
        vertexShader={vertexShader}
        fragmentShader={moonFragmentShader}
      />
    </mesh>
  );
}
