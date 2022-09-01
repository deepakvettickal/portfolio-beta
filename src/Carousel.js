import React, { useState } from "react";
import { BiChevronRight, BiChevronLeft } from "react-icons/bi";
import "./cards.scss";
import { locations } from "./markers";

//change this later
const rotateOrder = ["default", "mace", "uob", "iqvia", "inrix", "default"];

const Card = ({ title, content }) => (
  <div className="card">
    <h2>{title}</h2>
    <p>{content}</p>
  </div>
);

const Carousel = ({
  children,
  setActiveMarker,
  order,
  setOrder,
  setRotationOn
}) => {
  const [active, setActive] = useState(0);
  const count = React.Children.count(children);
  const MAX_VISIBILITY = 3;

  function clickRight() {
    setActive((i) => i + 1);
    order = order + 1;
    setOrder(order);
    setActiveMarker(locations[rotateOrder[order]]);
  }

  function clickLeft() {
    setActive((i) => i - 1);
    order = order - 1;
    setOrder(order);
    setActiveMarker(locations[rotateOrder[order]]);
  }

  return (
    <div className="carousel">
      {/* {active > 0 && (
        // <button className="nav left" onClick={() => clickLeft()}>
        <button className="nav left">
          <BiChevronLeft />
        </button>
      )} */}
      {React.Children.map(children, (child, i) => (
        <div
          className="card-container"
          style={{
            "--active": i === active ? 1 : 0,
            "--offset": (active - i) / 3,
            "--direction": Math.sign(active - i),
            "--abs-offset": Math.abs(active - i) / 3,
            "pointer-events": active === i ? "auto" : "none",
            opacity: Math.abs(active - i) >= MAX_VISIBILITY ? "0" : "1",
            display: Math.abs(active - i) > MAX_VISIBILITY ? "none" : "block"
          }}
        >
          {child}
        </div>
      ))}
      {active < count - 1 && (
        <button className="nav right" onClick={() => clickRight()}>
          <BiChevronRight />
        </button>
      )}
    </div>
  );
};

export default Carousel;
export { Card };
