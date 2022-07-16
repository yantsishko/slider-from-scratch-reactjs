import React from "react";

import SlideTitle from "./SlideTitle";
import SlideImage from "./SlideImage";

import "./../styles.scss";

export default function Slide({ data, width }) {
  return (
    <div
      className="slide"
      style={{
        height: "100%",
        width: `${width}px`,
      }}
    >
      <SlideImage src={data.url} alt={data.title} />
      <SlideTitle title={data.title} />
    </div>
  );
}
