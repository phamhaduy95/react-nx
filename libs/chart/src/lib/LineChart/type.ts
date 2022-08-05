export type LineChartSettings = {
  height: number;
  width: number;
  axis: {
    XLength: number;
    YLength: number;
    offsetX: number;
    offsetY: number;
  };
  dots?: {
    size: number;
  };
  grid?: boolean;
  tickFormat?:string
};

export type LineChartDataType = {
  xRange:[startDate:Date,interval:number];
  lines: { key: string; yValues: number[] }[];
};

export type LineChartProps = {
  dataset: LineChartDataType;
  settings: LineChartSettings;
};

export type PointData = {
  x:number;
  y:number;
  valueX: Date;
  valueY: number;
}

export type LineData = PointData[];
