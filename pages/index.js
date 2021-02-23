import Head from "next/head";
import {
  useSpring,
  animated,
  useTransition,
  Transition,
  interpolate,
  config,
} from "react-spring";
import { useDrag } from "react-use-gesture";
import { useState, useEffect } from "react";

const slides = [
  {
    id: 1,
    url: "https://source.unsplash.com/random/800x600",
  },
  {
    id: 2,
    url: "https://source.unsplash.com/random/800x500",
  },
  {
    id: 3,
    url: "https://source.unsplash.com/random/800x550",
  },
  { id: 4, url: "https://source.unsplash.com/random/800x400" },
];

export default function Home() {
  const [index, set] = useState(0);

  const [{ xy }, setXY] = useSpring(() => ({ xy: [0, 0] }));

  const bind = useDrag(
    ({ down, movement, moving, dragging, offset, cancel }) => {
      if (!dragging && Math.abs(offset[0]) >= 200) {
        console.log(offset)

        set(index + 1);
        setXY({xy: 0})
      }
      setXY({ xy: movement });
    }
  );

  const transitions = useTransition(slides[index], (item) => item.id, {
    from: {  opacity: 0.25},
    enter: {  opacity: 1 },
    leave: {  opacity: 0.25 },
    config: config.slow
  });

  useEffect(() => {
    console.log(index);
  }, [index]);

  return (
    <div className="h-screen bg-blue-200 w-screen items-center justify-center flex overflow-hidden">
      {transitions.map(({ item, props, key }) => {
        return (
          <animated.div
            {...bind()}
            className={` h-64 w-64 bg-red-${
              item.id * 100
            } rounded-full`}
            key={key}
            style={{
              ...props,
              transform: xy.interpolate(
                (x, y) => `translate3d(${x}px, ${y}px, 0)`
              ),
            }}
          >
            {item.text}
          </animated.div>
        );
      })}
    </div>
  );
}
