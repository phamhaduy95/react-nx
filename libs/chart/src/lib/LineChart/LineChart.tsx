import { LineChartProps, LineChartSettings } from "./type";
import * as d3 from "d3";
import { D3Axis } from "../ChartComponent/Axis";
import { useEffect, useRef } from "react";
import {
  calculateStepSize,
  computeArrayOfXCoords,
  computeLineData,
  computeNumberOfTicks,
  computeXRange,
  computeYRange,
  getAllPointCoordsWhoseXIndexIs,
  getScaleIndex2XValue,
  getXAxisScale,
  getXAxisUpdateDependency,
  prepareXAxisSettings,
  prepareYAxisSettings,
  renderChartLine,
  toggleCirclePoints,
  toggleLineIndicator,
} from "./utils";

import { provideDefaultValueWhenNotProvided } from "./defaultSettings";
import PopUpTooltips, {
  toggleToolTipsDisplay,
  updateToolTipsContent,
  updateToolTipsPosition,
} from "./PopUpTooltips";
import { AxisSettings } from "../ChartComponent/Axis/type";

export default function LineChart(props: LineChartProps) {
  console.time("start");
  const { dataset } = props;
  const settings = provideDefaultValueWhenNotProvided(props.settings);
  const { axis, tickFormat } = settings;
  const numberOfTicks = computeNumberOfTicks(dataset);
  const XRange = computeXRange(dataset, numberOfTicks);
  const YRange = computeYRange(dataset);
  const colorScale = d3
    .scaleOrdinal<any, any>(d3.schemeSet1)
    .domain([0, dataset.lines.length - 1]);
  const scaleXtoAxis = getXAxisScale(XRange, settings);
  const scaleYtoAxis = d3
    .scaleLinear()
    .domain(YRange)
    .range([axis.offsetY + axis.YLength, axis.offsetY]);
  const scaleIndexToX = getScaleIndex2XValue(XRange, numberOfTicks);
  const XAxisSettings = prepareXAxisSettings(settings,numberOfTicks);
  const YAxisSettings = prepareYAxisSettings(settings);
  const linesData = dataset.lines.map((YValues, i) => {
    const data = computeLineData(
      YValues,
      scaleXtoAxis,
      scaleYtoAxis,
      scaleIndexToX
    );
    return data;
  });

  const XCoordArray = computeArrayOfXCoords(linesData);
  const ref = useRef<SVGSVGElement>(null);
  function isPointerInsidePlottingArea(pos: { x: number; y: number }) {
    return (
      pos.x >= axis.offsetX &&
      pos.x <= axis.offsetX + axis.XLength &&
      pos.y >= axis.offsetY &&
      pos.y <= axis.YLength + axis.offsetY
    );
  }
  const stepSize = calculateStepSize(linesData[0]);
  useEffect(() => {
    const el = ref.current;
    if (el === null) return;
    const tooltipEl = d3
      .select(el)
      .select(".line-chart__tooltips")
      .node() as SVGGElement;
    d3.select(el).on("mousemove", (event: MouseEvent) => {
      const [x, y] = d3.pointer(event);

      if (!isPointerInsidePlottingArea({ x, y })) {
        toggleToolTipsDisplay(tooltipEl, false);
        toggleLineIndicator(el, false, 0);
        toggleCirclePoints(el, false, []);
        return;
      }

      const lastIndex = XCoordArray.length - 1;
      const XIndex = XCoordArray.findIndex((value, index) => {
        if (index === 0 && x <= value + stepSize / 2) return true;
        if (index === lastIndex && x > value - stepSize / 2) return true;
        if (x <= value + stepSize / 2 && x > value - stepSize / 2) return true;
        return false;
      });
      const posX = XCoordArray[XIndex];
      toggleLineIndicator(el, true, posX);
      const pointsCoordArray = getAllPointCoordsWhoseXIndexIs(
        XIndex,
        linesData
      );
      toggleCirclePoints(el, true, pointsCoordArray);

      toggleToolTipsDisplay(tooltipEl, true);

      const tooltipsContent = {
        x: d3.timeFormat(tickFormat)(scaleXtoAxis.invert(posX)),
        y: linesData.map((line) => {
          return line[XIndex].valueY.toString();
        }),
      };
      updateToolTipsContent(el, tooltipsContent, true);
      
      const YCoordAverage =
        pointsCoordArray
          .map((i) => i.y)
          .reduce((pre, curr) => {
            return pre + curr;
          }) / pointsCoordArray.length;
      const newPos = {
        x: posX,
        y: YCoordAverage,
      };
      updateToolTipsPosition(tooltipEl, newPos, axis);

    });
  }, [stepSize, linesData.length, numberOfTicks,getXAxisUpdateDependency(dataset)]);

  const renderCirclePoints = () => {
    const numberOfLines = linesData.length;
    return d3.range(numberOfLines).map((i) => {
      return (
        <circle
          className="chart-line__point-circle"
          cx={0}
          cy={0}
          fill={colorScale(i)}
          key={i}
        ></circle>
      );
    });
  };

  const renderLines = () => {
    const lines = dataset.lines;

    return lines.map((line, i) => {
      const { key } = line;
      const lineData = linesData[i];
      return renderChartLine(key, lineData, colorScale(i));
    });
  };
  const viewBox = {
    x: 2 * axis.offsetX + axis.XLength,
    y: 2 * axis.offsetY + axis.YLength,
  };
  return (
    <div className="line-chart">
      <svg
        className="line-chart__svg"
        height={settings.height}
        width={settings.width}
        viewBox={`0,0 ${viewBox.x},${viewBox.y}`}
        ref={ref}
      >
        <D3Axis
          ScaleFunction={scaleXtoAxis}
          settings={XAxisSettings}
          key={0}
          dependency={getXAxisUpdateDependency(dataset)}
        />
        <D3Axis ScaleFunction={scaleYtoAxis} settings={YAxisSettings} key={1} 
          dependency={[YRange[0],YRange[1]]}
        />
        {renderLines()}
        <line
          className="line-chart__line-indicator"
          x1={0}
          y1={axis.offsetY}
          x2={0}
          y2={axis.YLength + axis.offsetY}
          strokeDasharray="2,2"
          strokeWidth={1}
        ></line>
        {renderCirclePoints()}
        <PopUpTooltips numberOfYValue={linesData.length} />
      </svg>
    </div>
  );
}
