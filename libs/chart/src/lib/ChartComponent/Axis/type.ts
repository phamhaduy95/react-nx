export type AxisSettings = {
    orient: "top" | "left" | "bottom" | "right";
    length: number;
    ticks?: number|false;
    ticksFormat?:string|false,
    offset: {
      top: number;
      left: number;
    };
    gird?: boolean;
    girdLength?:number;
  };
  
 export type AxisProps = {
    settings: AxisSettings;
    ScaleFunction: d3.AxisScale<any>;
    dependency?: (number|string|boolean)[]
  };