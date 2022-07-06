import React, { useCallback, useContext } from "react";
import { SliderContext } from "../../Slider";

import "../../styles.scss";

export default function Dot({ number }) {
  const { goToSlide, slideNumber } = useContext(SliderContext);
  const goTo = useCallback(goToSlide);

  return (
    <div
      className={`dot ${slideNumber === number ? "selected" : ""}`}
      onClick={() => goTo(number)}
    />
  );
}
