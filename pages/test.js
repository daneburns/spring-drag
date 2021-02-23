import React, { useRef, useEffect, useState } from "react";
import _ from "lodash";
import { useSprings, animated } from "react-spring";
import { useGesture } from "react-use-gesture";

const pages = [
  "https://images.pexels.com/photos/62689/pexels-photo-62689.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/296878/pexels-photo-296878.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/1509428/pexels-photo-1509428.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/351265/pexels-photo-351265.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/924675/pexels-photo-924675.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
];

export default function Viewpager() {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);
  const index = useRef(0);
  const [props, set] = useSprings(pages.length, (i) => ({
    x: i * width,
    sc: 1,
    display: "block",
  }));

  const bind = useGesture(
    ({ down, delta: [xDelta], direction: [xDir], distance, cancel }) => {
      if (down && distance > width / 2)
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
        const x = (i - index.current) * width + (down ? xDelta : 0);
        const sc = down ? 1 - distance / width / 2 : 1;
        return { x, sc, display: "block" };
      });
    }
  );
  return props.map(({ x, display, sc }, i) => (
    <animated.div
      {...bind()}
      key={i}
      style={{
        display,
        transform: x.interpolate((x) => `translate3d(${x}px,0,0)`),
      }}
    >
      <animated.div
        style={{
          transform: sc.interpolate((s) => `scale(${s})`),
          backgroundImage: `url(${pages[i]})`,
        }}
      />
    </animated.div>
  ));
}
