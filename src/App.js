import React, { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import "./styles.css";
import { Stats, OrbitControls } from "@react-three/drei";

import * as THREE from "three";
import Earth from "./Earth.js";
import { locations } from "./markers.js";
import Carousel from "./Carousel.js";
import Card from "./Card.js";
import Stars from "./Stars.js";

function App() {
  const [activeMarker, setActiveMarker] = useState(locations["default"]);
  const [order, setOrder] = useState(0);
  const [zoom, setZoom] = useState(false);

  return (
    <>
      {/* <Stats /> */}

      <div className="row">
        {/* react-three-fiber tends to mess up the colours a bit, when rendering textures */}
        <div className="earth">
          <Stars />
          <Canvas
            gl={{ antialias: true, toneMapping: THREE.NoToneMapping }}
            linear
          >
            <Suspense fallback={null}>
              <group>
                <Earth
                  position={[0, 0, 0]}
                  activeMarker={activeMarker}
                  order={order}
                  zoom={zoom}
                  setZoom={setZoom}
                />
              </group>
            </Suspense>
            {order === 5 && <OrbitControls />}
          </Canvas>
        </div>

        <div className="cards">
          <Carousel
            setActiveMarker={setActiveMarker}
            order={order}
            setOrder={setOrder}
            setZoom={setZoom}
          >
            {[...new Array(6)].map((_, i) => (
              <Card order={order} />
            ))}
          </Carousel>
        </div>
      </div>
    </>
  );
}

export default App;
