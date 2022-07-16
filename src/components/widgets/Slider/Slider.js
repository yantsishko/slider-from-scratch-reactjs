import React, { useEffect, useState, createContext, useRef } from "react";
import PropTypes from "prop-types";

import { getImages } from "../../../imagesApi";

import Arrows from "./components/Controls/Arrows";
import Dots from "./components/Controls/Dots";

import SlidesList from "./components/SlidesList";

export const SliderContext = createContext();

const getWidth = () => window.innerWidth;

const Slider = function ({ width, height, autoPlay, autoPlayTime }) {
  const [items, setItems] = useState([]);
  const [slide, setSlide] = useState(0);
  const [itemsForRender, setItemsForRender] = useState([]);
  const [transition, setTransition] = useState(0);
  const [translate, setTranslate] = useState(getWidth());

  const transitionRef = useRef();
  const sliderRef = useRef();

  useEffect(() => {
    if (items.length) {
      setItemsForRender([items[items.length - 1], items[0], items[1]]);
    }
  }, [items]);

  useEffect(() => {
    transitionRef.current = smoothTransition;
  });

  useEffect(() => {
    const slider = sliderRef.current;

    const smooth = e => {
      if (e.target.className.includes('slide-list')) {
        transitionRef.current()
      }
    }

    slider.addEventListener('transitionend', smooth);

    return () => {
      slider.removeEventListener('transitionend', smooth);
    }
  }, []);

  useEffect(() => {
    if (transition === 0) {
      setTransition(0.5);
    }
  }, [transition]);

  const smoothTransition = () => {
    let newSlides = [];

    if (slide === items.length - 1) {
      newSlides = [items[items.length - 2], items[items.length - 1], items[0]];
    } else if (slide === 0) {
      newSlides = [items[items.length - 1], items[0], items[1]];
    } else {
      newSlides = items.slice(slide - 1, slide + 2);
    }

    setTranslate(getWidth());
    setItemsForRender(newSlides);
    setTransition(0);
  }

  useEffect(() => {
    const loadData = async () => {
      const images = await getImages();
      setItems(images);
    };
    loadData();
  }, []);

  const changeSlide = (direction = 1) => {
    if (direction === 1) {
      setTranslate(translate + getWidth());
      setSlide(slide === items.length - 1 ? 0 : slide + 1);
    } else {
      setTranslate(0);
      setSlide(slide === 0 ? items.length - 1 : slide - 1);
    }
  };

  const goToSlide = (number) => {
    setSlide(number % items.length);
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
    <div style={{ width, height }} className="slider" ref={sliderRef}>
      <SliderContext.Provider
        value={{
          goToSlide,
          changeSlide,
          slidesCount: items.length,
          slideNumber: slide,
          items: itemsForRender,
        }}
      >
        <Arrows />
        <SlidesList
          translate={translate}
          transition={transition}
          width={getWidth() * itemsForRender.length}
          slideWidth={getWidth()}
        />
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
