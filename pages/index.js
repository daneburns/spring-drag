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

export default function Home() {
  const [index, set] = useState(0);
  const [scale, setScale] = useState(1.0);
  const [windowSize, setWindowSize] = useState({ x: 0, y: 0 });
  const [{ xy }, setXY] = useSpring(() => ({ xy: [0, 0] }));

  useEffect(() => {
    setWindowSize({ x: window.innerWidth, y: window.innerHeight });
  }, []);
  const bind = useDrag(
    ({ down, movement, moving, dragging, offset, cancel, ...state }) => {
      console.log(state);
      if (!dragging && Math.abs(offset[0]) >= 80) {
        if (index >= slides.length - 1) {
          console.log(index);
          set(0);
          setXY({ xy: movement });
          return;
        }
        set(index + 1);
        setXY({ xy: movement });
      }
      setXY({ xy: down ? movement : [0, 0] });
    },
    {
      bounds: { left: -100, right: 100 },
      rubberband: true,
    }
  );

  const transitions = useTransition(slides[index], (item) => item.id, {
    from: { borderColor: "red" },
    enter: { borderColor: "white" },
    leave: { borderColor: "blue" },
  });

  useEffect(() => {
    console.log(index);
  }, [index]);

  return (
    <div className="h-screen bg-blue-200 w-screen items-center justify-center flex overflow-hidden">
      {transitions.map(({ item, props, key }) => {
        return (
          <animated.div
            className={`absolute h-64 w-64 border-solid border-8 bg-red-${
              item.id * 100
            }`}
          >
            <animated.div {...bind()}>
              <animated.div
                key={key}
                className='h-64 w-64 rounded-full'
                style={{
                  ...props,
                  backgroundImage: `url("${item.url}")`,
                  backgroundSize: "contain",
                  transform: xy.interpolate(
                    (x, y) => `translate3d(${x}px, ${y}px, 0)`
                  ),
                }}
              >
                {item.text}
              </animated.div>
            </animated.div>
          </animated.div>
        );
      })}
    </div>
  );
}
