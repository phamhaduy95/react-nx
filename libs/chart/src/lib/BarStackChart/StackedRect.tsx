import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

type Props = {
  x: number;
  y: number;
  width: number | string;
  height: number;
  fill: string;
  transition?: {
    delay: number;
    duration: number;
  };
};

export default function StackedRect(props: Props) {
  const { x, y, width, height, fill, transition } = props;

  const ref = useRef<SVGRectElement | null>(null);
  // add transition effect to rect's height change

  useEffect(() => {
    if (transition === undefined) return;
    const el = ref.current;
    if (el === null) return;
    d3.select(el).attr("y", y + height);
  }, []);

  useEffect(() => {
    if (transition === undefined) return;
    const { delay, duration } = transition;
    const el = ref.current;
    if (el === null) return;
    d3.select(el)
      .transition()
      .delay(delay)
      .duration(duration)
      .attr("height", height)
      .attr("y", y);
  }, [height, y]);

  return (
    <>
      <rect
        ref={ref}
        className="bar-stack-chart__stack-rect"
        x={x}
        width={width}
        fill={fill}
        stroke="grey"
      />
    </>
  );
}
