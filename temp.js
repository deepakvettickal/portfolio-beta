//good copy of earth.js
import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";

import { RepeatWrapping, sRGBEncoding, Vector3 } from "three";
import { useTexture } from "@react-three/drei";

import { vertexShader, fragmentShader } from "./shaders";

// import earthday from "/earthday.jpg";

export default function Earth(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef();
  // Rotate mesh every frame, this is outside of React without overhead
  // useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.001));
  useFrame(() => (mesh.current.rotation.y -= 0.001));

  const earthDayTexture = useTexture("/earthday.jpg");
  earthDayTexture.encoding = sRGBEncoding;
  earthDayTexture.wrapS = RepeatWrapping;
  earthDayTexture.wrapT = RepeatWrapping;
  earthDayTexture.anisotropy = 20;
  const earthNightTexture = useTexture("/earthnight.jpg");
  earthNightTexture.encoding = sRGBEncoding;
  earthNightTexture.wrapS = RepeatWrapping;
  earthNightTexture.wrapT = RepeatWrapping;
  earthNightTexture.anisotropy = 20;

  return (
    <mesh {...props} ref={mesh} scale={[1.3, 1.3, 1.3]} rotation={[0, 0, 0]}>
      {/* //args={[radius, width, height]} */}
      <sphereBufferGeometry attach="geometry" args={[2, 64, 64]} />
      {/* <meshStandardMaterial attach="material" color="blue" /> */}
      <shaderMaterial
        toneMapped={false}
        uniforms={{
          uDayTexture: { value: earthDayTexture },
          uNightTexture: { value: earthNightTexture },
          uSunDirection: { value: new Vector3(1.0, 0, 0) }
          // uSpecularTexture : {} //do later
        }}
        // Feed the shaders
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </mesh>
  );
}
