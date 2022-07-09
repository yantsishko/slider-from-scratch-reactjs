import React, { useEffect, useState, createContext } from "react";
import PropTypes from "prop-types";
import { getImages } from "../../../imagesApi";

import Arrows from "./components/Controls/Arrows";
import Dots from "./components/Controls/Dots";

import Slide from "./components/Slide";

export const SliderContext = createContext();

const Slider = function ({ width, height, autoPlay, autoPlayTime }) {
  const [items, setItems] = useState([]);
  const [slide, setSlide] = useState(0);
  const [animation, setAnimation] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const images = await getImages();
      setItems(images);
    };
    loadData();
  }, []);

  const preloadImages = () => {
    const prevItemIndex = slide - 1 < 0 ? items.length - 1 : slide - 1;
    const nextItemIndex = (slide + 1) % items.length;

    new Image().src = items[slide].url;
    new Image().src = items[prevItemIndex].url;
    new Image().src = items[nextItemIndex].url;
  }

  useEffect(() => {
    if (items.length) {
      preloadImages();
    }
  }, [slide, items])

  const changeSlide = (direction = 1) => {
    setAnimation(false);
    let slideNumber = 0;

    if (slide + direction < 0) {
      slideNumber = items.length - 1;
    } else {
      slideNumber = (slide + direction) % items.length;
    }

    setSlide(slideNumber);

    const timeout = setTimeout(() => {
      setAnimation(true);
    }, 0);

    return () => {
      clearTimeout(timeout)
    }
  };

  const goToSlide = (number) => {
    setAnimation(false);
    setSlide(number % items.length);

    const timeout = setTimeout(() => {
      setAnimation(true);
    }, 0);

    return () => {
      clearTimeout(timeout)
    }
  };

  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      changeSlide(1);
    }, autoPlayTime);

    return () => {
      clearInterval(interval);
    };
  }, [items.length, slide]); // when images uploaded or slide changed manually we start timer

  return (
    <div style={{ width, height }} className="slider">
      <SliderContext.Provider
        value={{
          goToSlide,
          changeSlide,
          slidesCount: items.length,
          slideNumber: slide,
        }}
      >
        <Arrows />
        {
          items.length && (
            <Slide data={items[slide]} animation={animation} />
          )
        }
        <Dots />
      </SliderContext.Provider>
    </div>
  );
};

Slider.propTypes = {
  autoPlay: PropTypes.bool,
  autoPlayTime: PropTypes.number,
  width: PropTypes.string,
  height: PropTypes.string
};

Slider.defaultProps = {
  autoPlay: false,
  autoPlayTime: 5000,
  width: "100%",
  height: "100%"
};

export default Slider;
