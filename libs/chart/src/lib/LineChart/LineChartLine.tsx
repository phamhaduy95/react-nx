import React, { useEffect, useLayoutEffect, useRef } from "react";
import * as d3 from "d3";

type Props = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  index: number;
  color: string;
};

export default function LineChartLine(props: Props) {
  const { x1, x2, y1, y2, index, color } = props;
  const ref = useRef<SVGLineElement>(null);
  useLayoutEffect(() => {
    const el = ref.current;
    if (el === null) return;
    d3.select(el)
      .transition()
      .attr("x1", x1)
      .attr("x2", x1)
      .attr("y1", y1)
      .attr("y2", y1)
      .transition()
      .duration(25)
      .delay(index * 25)
      .attr("x2", x2)
      .attr("y2", y2);
  }, [x1, x2, y1, y2]);

  return <line ref={ref} stroke={color} className="line-chart__line" />;
}
