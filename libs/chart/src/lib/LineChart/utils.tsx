import * as d3 from "d3";
import { AxisSettings } from "../ChartComponent/Axis";
import LineChartLine from "./LineChartLine";

import {
  LineChartDataType,
  LineChartProps,
  LineChartSettings,
  LineData as LineCoordData,
  LineData,
} from "./type";

export function prepareXAxisSettings(
  settings: LineChartSettings,
  numberOfTicks:number
): AxisSettings {
  const { axis, grid } = settings;
  return {
    length: axis.XLength,
    orient: "bottom",
    offset: { top: axis.YLength + axis.offsetY, left: 0 },
    ticks: numberOfTicks,
    gird: grid,
    ticksFormat: settings.tickFormat,
    girdLength: axis.YLength,
  };
}

export function prepareYAxisSettings(
  settings: LineChartSettings
): AxisSettings {
  const { axis, grid } = settings;
  return {
    length: axis.YLength,
    orient: "left",
    offset: { top: 0, left: axis.offsetX },
    gird: grid,
    girdLength: axis.XLength,
  };
}

export function computeNumberOfTicks(data: LineChartDataType) {
  return data.lines[0].yValues.length;
}

export function renderChartLine(
  key: string,
  lineCoord: LineCoordData,
  color: string
) {
  const LineComponents = [];
  for (let i = 0; i < lineCoord.length - 1; i++) {
    const point1 = lineCoord[i];
    const point2 = lineCoord[i + 1];
    const keyStr = `${key}-${i}`;
    const Line = (
      <LineChartLine
        x1={point1.x}
        y1={point1.y}
        x2={point2.x}
        y2={point2.y}
        color={color}
        index={i}
        key={keyStr}
      />
    );
    LineComponents.push(Line);
  }
  return LineComponents;
}

export function computeLineData(
  lineData: LineChartDataType["lines"][number],
  scaleX2Coord: d3.AxisScale<Date>,
  scaleY2Coord: d3.AxisScale<number>,
  scaleIndex2X: (value: number) => Date
): LineData {
  const { yValues } = lineData;
  return yValues.map((valueY, index) => {
    const valueX = scaleIndex2X(index);
    const x = scaleX2Coord(valueX) as number;
    const y = scaleY2Coord(valueY) as number;
    return { x, y, valueX, valueY };
  });
}

export function computeYRange(dataset: LineChartDataType): number[] {
  const yValuesList = dataset.lines.map((e) => e.yValues).flat(1);
  const max = Math.max(...yValuesList);
  let min = Math.min(...yValuesList);
  if (min >= 0) return [0, max * 1.1];
  return [min, max * 1.1];
}

/**  Compute appropriate XRange based on the chart type:
 *  - continuous types: return array [startDate,endDate];
 *  - discrete types: return array consists of all ticks presenting point of time.
 * */
export function computeXRange(
  dataset: LineChartProps["dataset"],
  ticks: number
) {
  const [startDate, interval] = dataset.xRange;
  const endDateValue = startDate.valueOf() + interval * (ticks - 1); // in milliseconds
  const endDate = new Date(endDateValue);
  return [startDate, endDate] as [startDate: Date, endDate: Date];
}

export function getScaleIndex2XValue(XRange: Date[], numberOfTicks: number) {
  const indexRange = [0, numberOfTicks - 1];
  return d3.scaleTime().domain(XRange).range(indexRange).invert;
}

export function getXAxisScale(XRange: Date[], settings: LineChartSettings) {
  const { axis } = settings;
  return d3
    .scaleTime()
    .domain(XRange)
    .rangeRound([axis.offsetX, axis.offsetX + axis.XLength]);
}

export function getXAxisUpdateDependency(dataSet: LineChartDataType) {
  const b = dataSet.xRange;
  return [b[0].toString(), b[1]];
}

export function computeArrayOfXCoords(linesData: LineData[]) {
  const firstLine = linesData[0];
  return firstLine.map((point) => {
    return point.x;
  });
}

export function calculateStepSize(linesCoord: LineData) {
  const firstPointX = linesCoord[0].x;
  const nextPointX = linesCoord[1].x;
  return nextPointX - firstPointX;
}

export function toggleLineIndicator(
  el: SVGSVGElement,
  showed: boolean,
  posX: number
) {
  const line = d3.select(el).select(".line-chart__line-indicator");
  if (showed) {
    line.attr("transform", `translate(${posX},0)`).attr("stroke", "brown");
    return;
  }
  line.attr("stroke", "transparent");
}

export function toggleCirclePoints(
  el: SVGSVGElement,
  showed: boolean,
  PointsCoordData: { x: number; y: number }[]
) {
  const points = d3.select(el).selectAll(".chart-line__point-circle");
  if (showed) {
    points.each(function (this, k, index) {
      const coord = PointsCoordData[index];
      d3.select(this).attr("cx", coord.x).attr("cy", coord.y).attr("r", 3);
    });
    return;
  }
  points.each(function (this, k, index) {
    const i = index as number;
    const coord = PointsCoordData[i];
    d3.select(this).attr("r", 0);
  });
}

export function getAllPointCoordsWhoseXIndexIs(
  XIndex: number,
  linesData: LineData[]
) {
  return linesData.map((line) => {
    const point = line[XIndex];
    return { x: point.x, y: point.y };
  });
}
