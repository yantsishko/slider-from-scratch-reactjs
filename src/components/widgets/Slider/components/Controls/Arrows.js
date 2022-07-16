import React, { useCallback, useContext } from "react";

import { SliderContext } from "../../Slider";

import "../../styles.scss";

export default function Arrows() {
  const { changeSlide } = useContext(SliderContext);
  const changeSlideClbk = useCallback(changeSlide);

  return (
    <div className="arrows">
      <div className="arrow left" onClick={() => changeSlideClbk(-1)} />
      <div className="arrow right" onClick={() => changeSlideClbk(1)} />
    </div>
  );
}
