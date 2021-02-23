import { render } from "react-dom";
import React, { useRef, useEffect, useState } from "react";
import _ from "lodash";
import { useSprings, animated } from "react-spring";
import { useDrag } from "react-use-gesture";

const pages = [
  "https://images.pexels.com/photos/62689/pexels-photo-62689.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/296878/pexels-photo-296878.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/4016596/pexels-photo-4016596.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/351265/pexels-photo-351265.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/924675/pexels-photo-924675.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
];

export default function Viewpager() {
  const [width, setWidth] = useState(1280);
  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);

  const [props, set] = useSprings(pages.length, (i) => ({
    x: i * width,
    scale: 1,
    display: "block",
  }));
  const index = useRef(0);

  const bind = useDrag(
    ({ active, movement: [mx], direction: [xDir], distance, cancel }) => {
      if (active && distance > width / 2)
        cancel(
          (index.current = _.clamp(
            index.current + (xDir > 0 ? -1 : 1),
            0,
            pages.length - 1
          ))
        );
      set((i) => {
        if (i < index.current - 1 || i > index.current + 1)
          return { display: "none" };
        const x = (i - index.current) * width + (active ? mx : 0);
        const scale = active ? 1 - distance / width / 2 : 1;
        return { x, scale, display: "block" };
      });
    }
  );
  return props.map(({ x, display, scale }, i) => (
    <animated.div
      className="h-screen w-screen fixed overflow-hidden"
      {...bind()}
      key={i}
      style={{ display, x }}
    >
      <animated.div
        className="h-64 w-64 fixed overflow-hidden rounded-full mx-auto"
        style={{ scale, backgroundImage: `url(${pages[i]})` }}
      />
    </animated.div>
  ));
}
