import { Vector3 } from "three";
import { FaLongArrowAltDown, FaMapMarkerAlt } from "react-icons/fa"; //location icon

const radius = 2;

export const locations = {
  nullIsland: {
    lat: 0,
    lng: 0
  },
  uob: {
    lat: 52.4506,
    lng: -1.9306
  },
  iqvia: {
    lat: 10.0079,
    lng: 76.3637
  },
  mace: {
    lat: 10.05411,
    lng: 76.61915
  },
  inrix: {
    lat: 52.4532,
    lng: -2.0106
  },
  default: {
    lat: -0.2731,
    lng: -34.6756
  }
};

const degToRad = (deg) => (deg * Math.PI) / 180.0;

//returns a vector3, which can be used for position
// pass into locations locations[sydney]
function latLngToVec3(radius, { lat, lng }) {
  return new Vector3().setFromSphericalCoords(
    radius,
    degToRad(90 - lat),
    degToRad(lng + 90)
  );
}

export function createMarker(location, color) {
  console.log("locations[mace]--", locations["mace"]);
  console.log("location", location.key);
  if (location.lat !== -0.2731 && location.lng !== -34.6756) {
    return (
      <Marker position={latLngToVec3(radius * 1.02, location)} color={color} />
    );
  } else {
    return <></>;
  }
}
//creates a sphere and sets its position and colour, can be used as <Marker postiion = {} />
const Marker = ({ position, color }) => {
  return (
    <>
      <mesh position={position} rotation={[0, 0, 0]}>
        <sphereBufferGeometry
          attach="geometry"
          args={[radius * 0.008, 16, 16]}
        />
        <meshBasicMaterial attach="material" color={color} />
      </mesh>
    </>
  );
};
