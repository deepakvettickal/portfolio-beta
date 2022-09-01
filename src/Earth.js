//sphere
import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";

import { Vector3 } from "three";
import { useTexture } from "@react-three/drei";
import { useSpring, a } from "@react-spring/three";
import { vertexShader, fragmentShader } from "./earthShaders";

// import earthday from "/earthday.jpg";
import { createMarker, locations } from "./markers.js";

export default function Earth({ position, activeMarker, order }) {
  const mesh = useRef();

  const earthDayTexture = useTexture("/earthday.jpg");
  const earthNightTexture = useTexture("/earthnight.jpg");

  //Rotation and zoom
  const latRot = (activeMarker.lat * Math.PI) / 180;
  const lonRot = -((activeMarker.lng * Math.PI) / 180) - Math.PI / 2;

  const [zoom, setZoom] = useState(false);
  const { scale, rotation } = useSpring({
    scale: zoom ? 1.35 : 1,
    rotation: [latRot, lonRot, 0]
  });

  const radius = 2;

  useFrame(() => {
    if (order === 5) {
      mesh.current.rotation.y -= 0.00035;
    }
  });

  const handleClick = (event) => {
    if (event.detail === 2) {
      console.log("double click");
      setZoom((prev) => !prev);
    }
  };

  return (
    <>
      <a.group
        dispose={null}
        rotation={rotation}
        scale={scale}
        onClick={handleClick}
      >
        <mesh
          position={[0, 0, 0]}
          ref={mesh}
          scale={[1.1, 1.1, 1.1]}
          rotation={[0, 0, 0]}
        >
          <sphereBufferGeometry attach="geometry" args={[radius, 64, 64]} />
          <shaderMaterial
            toneMapped={false}
            uniforms={{
              uDayTexture: { value: earthDayTexture },
              uNightTexture: { value: earthNightTexture },
              uSunDirection: { value: new Vector3(1.0, 0, 0) }
            }}
            //shaders
            vertexShader={vertexShader}
            fragmentShader={fragmentShader}
          />
          {/* {createMarker(locations["nullIsland"], "white")} */}
          {createMarker(locations["uob"], "white")}
          {createMarker(locations["mace"], "white")}
          {createMarker(locations["iqvia"], "white")}
          {createMarker(locations["inrix"], "white")}
        </mesh>
      </a.group>
    </>
  );
}
