import React, { useState, useEffect } from "react";
import { useSprings, animated, interpolate } from "react-spring";

const slides = [
  {
    id: 1,
    url: "https://source.unsplash.com/random/100x100",
  },
  {
    id: 2,
    url: "https://source.unsplash.com/random/150x150",
  },
  {
    id: 3,
    url: "https://source.unsplash.com/random/125x125",
  },
  { id: 4, url: "https://source.unsplash.com/random/110x110" },
];

export default function test() {
  const [windowSize, setWindowSize] = useState({ x: 0, y: 0 });
  const [springs, setSprings] = useSprings(slides.length, (index) => ({
    from: { width: windowSize.x + 'px', height: windowSize.y + 'px' },
    
  }));
  // Update springs with new props
  setSprings((index) => ({width: windowSize.x, height: windowSize.y}));
  // Stop all springs
  useEffect(() => {
    setWindowSize({ x: window.innerWidth, y: window.innerHeight });
  }, []);
  return springs.map((props) => (
    <animated.div className=" bg-red-100" style={props} />
  ));
}
