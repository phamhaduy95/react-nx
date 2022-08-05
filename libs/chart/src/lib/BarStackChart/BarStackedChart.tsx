import { useEffect } from "react";
import * as d3 from "d3";
import "./BarStackChart.scss";
import { BarStackChartProps, BarStackCharSettingsType } from "./type";
import {
  generateStackLayOutData,
  generateXScaleFunction,
  generateYScaleFunction,
  rotate2DArray,
  getRawValueListForEveryKey,
  getAllKeyStringFromDataSet,
} from "./utils";
import StackRect from "./StackedRect";
import { D3Axis } from "../ChartComponent";
import { AxisSettings } from "../ChartComponent";

export default function BarStackedChart(props: BarStackChartProps) {
  const { dataSet, settings } = props;
  const { axis, height, width } = settings;
  const stackLayoutData = generateStackLayOutData(dataSet);
  const keys = getAllKeyStringFromDataSet(dataSet);
  const XScale = generateXScaleFunction(dataSet, settings);
  const YScale = generateYScaleFunction(stackLayoutData, settings);
  const XAxisSettings = getXAxisSettings(axis);
  const YAxisSettings = getYAxisSettings(axis);

  const renderStackedColumns = () => {
    const colorScale = d3
      .scaleOrdinal<number, string>(d3.schemePastel1)
      .domain([0, keys.length]);
    const rotatedStackData = rotate2DArray(stackLayoutData);
    const array = rotatedStackData.map((row, i) => {
      const x = (XScale(dataSet[i].key) as number) + axis.offsetLeft;
      const rectWidth = XScale.bandwidth();
      return row.map((cell, j) => {
        const transition = { delay: 150 * j, duration: 150 };
        const y = YScale(cell[1]) + axis.offsetTop;
        const rectHeight = YScale(cell[0]) - YScale(cell[1]);
        return (
          <StackRect
            x={x}
            y={y}
            width={rectWidth}
            height={rectHeight}
            fill={colorScale(j)}
            transition={transition}
            key={`${i}-${j}`}
          />
        );
      });
    });
    return array.flat(1);
  };

  const renderLegendsSection = () => {
    const colorScale = d3
      .scaleOrdinal<number, string>(d3.schemePastel1)
      .domain([0, keys.length]);
    return keys.map((key, index) => {
      const colorStr = colorScale(index);
      return (
        <div className="legend">
          <span className="legend__text">{key}</span>
          <span
            className="legend__color-indicator"
            style={{ background: colorStr }}
          />
        </div>
      );
    });
  };

  const applyLegendPosition = () => {
    const { legends } = settings;
    switch (legends.position) {
      case "bottom":
        return "";
      case "top":
        return "--top";
      case "right":
        return "--right";
      case "left":
        return "--left";
    }
  };

  /** Note: regular HTML tags are not rendered inside svg tag on the screen, however, we can still see them on html tree while debugging with browser.
   * Note: since there is no support for auto-alignment mechanism such as flex or grid like regular html page, we only can position each svg element using transform: translate or setting a specific value to x,y coordinator. As result, I founds that it would be much easier and more manageable when we put the legends section outside of the svg scope and instead make it as regular html element. */
  return (
    <div className={`stack-chart ${applyLegendPosition()}`}>
      <svg
        className="stack-chart__svg-view"
        viewBox="0,0 400,400"
        width={settings.width}
        height={settings.height}
      >
        <D3Axis ScaleFunction={XScale} settings={XAxisSettings} key={0} />
        <D3Axis ScaleFunction={YScale} settings={YAxisSettings} key={1} />
        <g className="left-axis"></g>
        {renderStackedColumns()}
      </svg>
      <div className="stack-chart__legends-section">
        {renderLegendsSection()}
      </div>
    </div>
  );
}

function getXAxisSettings(settings: BarStackCharSettingsType["axis"]) {
  const { XLength, YLength, offsetLeft, offsetTop } = settings;
  const XAxisSettings: AxisSettings = {
    length: XLength,
    offset: { top: offsetTop + YLength, left: offsetLeft },
    orient: "bottom",
    gird: false,
    ticks: 10,
  };
  return XAxisSettings;
}

function getYAxisSettings(settings: BarStackCharSettingsType["axis"]) {
  const { XLength, YLength, offsetLeft, offsetTop } = settings;
  const YAxisSettings: AxisSettings = {
    length: YLength,
    offset: { top: offsetTop, left: offsetLeft },
    orient: "left",
    gird: true,
    ticks: 10,
    girdLength: XLength,
  };
  return YAxisSettings;
}
