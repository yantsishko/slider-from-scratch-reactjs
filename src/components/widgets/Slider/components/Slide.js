import React from "react";
import SlideTitle from "./SlideTitle";
import SlideImage from "./SlideImage";

import "./../styles.scss";

export default function Slide({ data }) {
  return (
    <div className="slide">
      <SlideImage src={data.url} alt={data.title} />
      <SlideTitle title={data.title} />
    </div>
  );
}
