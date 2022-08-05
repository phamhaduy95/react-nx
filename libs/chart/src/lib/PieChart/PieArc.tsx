import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { PieDataSetType } from "./type";
import * as d3 from "d3";
import { displayText } from "./utils";

type DataType = PieDataSetType[number];

type PieArcProps = {
  pieData: d3.PieArcDatum<DataType>;
  fillColor: string;
  index: number;
};

type ArcAngleType = {
  startAngle: number;
  endAngle: number;
};

export default function PieArc(props: PieArcProps) {
  const { pieData, fillColor, index } = props;
  const pieRef = useRef<SVGPathElement | null>(null);
  const textRef = useRef<SVGTextElement | null>(null);
  const [arcAngle, setAngle] = useState<ArcAngleType>({
    startAngle: 0,
    endAngle: 0,
  });

  const arcMkr = d3
    .arc<d3.PieArcDatum<DataType>>()
    .innerRadius(0)
    .outerRadius(150);
  // update stored arc angle state when the input prop pieData is changed.
  useEffect(() => {
    const arcAngle: ArcAngleType = {
      endAngle: pieData.endAngle,
      startAngle: pieData.startAngle,
    };
    setAngle(arcAngle);
  }, [pieData.padAngle, pieData.endAngle]);

  // useEffect(() => {
  //   const pieEl = pieRef.current;
  //   const textEl = textRef.current;
  //   if (pieEl === null || textEl === null) return;
  //   // Note: as the built-in transition api from d3 will alter the attr value at run time, so any attribute, which is required to use d3 transition api, should be changed outside the scope of regular React update cycle. The combination between UseEffect and useRef is the perfect choice to do this task.
  //   d3.select(pieEl)
  //     .transition()
  //     .duration(2000)
  //     .delay(index * 2000)
  //     // the attrTween is used to provides the correct value change for each animation time frame so that the arc angle change animation can be properly implemented as the default mechanic of d3.transition to determine the right transition value is incompetent for this task.
  //     .attrTween("d", () => {
  //       return (t: number) => {
  //         const angelInterpolate = d3.interpolate(
  //           pieData.startAngle,
  //           pieData.endAngle
  //         );
  //         console.log("text");
  //         const angle = angelInterpolate(t);
  //         return arcMkr.endAngle(angle)(pieData) as string;
  //       };
  //     }) // the on event handler in this case is different form regular on from selection as it only support 4 kinds of event for handling animation : end, start, cancel and interrupt
  //     .on("end", function () {
  //       console.log("text");
  //       displayText(textEl, pieData, arcMkr);
  //     });
  // }, []);

  useLayoutEffect(() => {
    const pieEl = pieRef.current;
    const textEl = textRef.current;
    if (pieEl === null || textEl === null) return;
    const endAngleInterpolate = d3.interpolate(
      arcAngle.endAngle,
      pieData.endAngle
    );
    const startAngleInterpolate = d3.interpolate(
      arcAngle.startAngle,
      pieData.startAngle
    );

    d3.select(pieEl)
      .transition()
      .duration(200)
      .attrTween("d", () => {
        return (t: number) => {
          const startAngle = startAngleInterpolate(t);
          const endAngle = endAngleInterpolate(t);
          return arcMkr.startAngle(startAngle).endAngle(endAngle)(
            pieData
          ) as string;
        };
      });

    d3.select(textEl)
      .transition()
      .duration(200)
      .attrTween("y", () => {
        return (t: number) => {
          const startAngle = startAngleInterpolate(t);
          const endAngle = endAngleInterpolate(t);
          const posX = d3
            .arc<d3.PieArcDatum<DataType>>()
            .innerRadius(85)
            .outerRadius(150)
            .startAngle(startAngle)
            .endAngle(endAngle)
            .centroid(pieData)[1];
          return posX.toString();
        };
      })
      .attrTween("x", () => {
        return (t: number) => {
          const startAngle = startAngleInterpolate(t);
          const endAngle = endAngleInterpolate(t);
          const posX = d3
            .arc<d3.PieArcDatum<DataType>>()
            .innerRadius(85)
            .outerRadius(150)
            .startAngle(startAngle)
            .endAngle(endAngle)
            .centroid(pieData)[0];
          return posX.toString();
        };
      });
  }, [pieData.endAngle, pieData.startAngle]);

  // display and animate the first data set of the chart.

  const renderText = () => {
    const angle = Math.abs(pieData.endAngle - pieData.startAngle);
    if (angle < (9 / 180) * Math.PI) return "";
    return pieData.data.value;
  };
  return (
    <>
      <path
        ref={pieRef}
        className="pie-chart__pie"
        stroke="grey"
        fill={fillColor}
      />
      <text
        ref={textRef}
        fontFamily="san-serif"
        fontSize="14"
        textAnchor="middle"
      >
        {renderText()}
      </text>
    </>
  );
}
