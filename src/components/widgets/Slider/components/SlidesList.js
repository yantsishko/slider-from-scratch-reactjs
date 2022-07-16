import React, { useContext } from "react";

import Slide from "./Slide";
import { SliderContext } from "../Slider";

import "../styles.scss";

export default function SlidesList({ translate, transition, width, slideWidth }) {
  const { items } = useContext(SliderContext);

  return (
    <div
      className="slide-list"
      style={{
        transform: `translateX(-${translate}px)`,
        transition: `transform ease-out ${transition}s`,
        height: "100%",
        width: `${width}px`,
        display: "flex",
      }}
    >
      {items.map((slide) => (
        <Slide key={slide.url} data={slide} width={slideWidth} />
      ))}
    </div>
  );
}
