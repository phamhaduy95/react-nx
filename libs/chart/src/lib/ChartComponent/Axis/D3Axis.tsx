import { useEffect, useLayoutEffect } from "react";
import * as d3 from "d3";
import { AxisProps } from "./type";
import { getAxisClassName, getD3AxisGenerator, getGridPosition } from "./utils";
import { provideDefaultValueForInputSetting } from "./defaultAxisSettings";

export default function D3Axis(props: AxisProps) {
  let { ScaleFunction, dependency } = props;
  const settings = provideDefaultValueForInputSetting(props.settings);
  let { gird, ticks, length, orient, ticksFormat } = settings;
  dependency = dependency === undefined ? [] : dependency;
  const axisClassName = getAxisClassName(settings.orient);
  useEffect(() => {
    const { offset, length } = settings;
    const axisGenerator = getD3AxisGenerator(settings.orient);
    let axis = axisGenerator(ScaleFunction);
    addTickAndTickFormatToAxis(ticks, ticksFormat, axis);

    d3.select<SVGGElement, any>(`.${axisClassName}`)
      .attr("transform", `translate(${offset.left},${offset.top})`)
      .call(axis);

    const numberOfGirdLines = d3
      .selectAll(`.${axisClassName}> .tick >.grid-line`)
      .size();

    if (gird) {
      const girdPosition = getGridPosition(settings);
      d3.selectAll(`.${axisClassName}>.tick`)
        .append("line")
        .classed("grid-line", true)
        .attr(girdPosition.orient, girdPosition.size)
        .attr("stroke", "black")
        .attr("stroke-width", "0.5")
        .attr("stroke-dasharray", "5,2");
    }
    // if (!gird && isGridLinesExisted) {
    //   d3.selectAll(`.${axisClassName} > .tick > .grid-line`).remove();
    //   return;
    // }
    return ()=> {
       console.log("clean up")
  
        // remove any gird before updating 
        d3.selectAll(`.${axisClassName} > .tick > .grid-line`).remove();
        return
    }
  }, [gird, ticks, length, orient,ticksFormat, ...dependency]);

  return <g className={axisClassName}></g>;
}


function addTickAndTickFormatToAxis(
  ticks: number | boolean,
  ticksFormat: string | boolean,
  axis: d3.Axis<any>
) {
  if (ticks) {
    if (ticksFormat) axis.ticks(ticks, ticksFormat);
    else axis.ticks(ticks);
  }
}
