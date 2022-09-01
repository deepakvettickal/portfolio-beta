// addLocationMarkers() {
//   const markerGeometry = new SphereBufferGeometry(radius * 0.02, 16, 16)
//   const whiteMaterial = new MeshBasicMaterial()

//   for (const key in locations) {
//     const location = locations[key]

//     // Add vector for each coordinate so we can caclulate the angles individually
//     location.lngVec3 = this.latLngToVec3(radius, { lat: 0, lng: location.lng })
//     location.latVec3 = this.latLngToVec3(radius, { lat: location.lat, lng: 0 })

//     // Add Marker
//     const marker = new Mesh(markerGeometry, whiteMaterial)
//     marker.position.copy(this.latLngToVec3(radius * 1.02, location))
//     this.add(marker)
//     location.marker = marker
//   }
// }

import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";

import { RepeatWrapping, sRGBEncoding, Vector3 } from "three";
import { useTexture, Html } from "@react-three/drei";

import { vertexShader, fragmentShader } from "./shaders";

import { FaMapMarkerAlt } from "react-icons/fa";

export default function Marker(props) {
  //Marker function - edit this

  //define locations
  const locations = {
    nullIsland: {
      lat: 0,
      lng: 0
    },
    london: {
      lat: 51.5074,
      lng: -0.1278
    },
    connecticut: {
      lat: 41.6032,
      lng: -73.0877,
      vec3: null
    },
    sydney: {
      lat: -33.8688,
      lng: 151.2093
    }
  };

  const mesh = useRef();
  // useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.001));
  // useFrame(() => (mesh.current.rotation.y -= 0.001));

  return <mesh {...props}></mesh>;
}
