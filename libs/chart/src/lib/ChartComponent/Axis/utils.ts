import { AxisSettings } from "./type";
import * as d3 from "d3";

export function getD3AxisGenerator(orient: AxisSettings["orient"]) {
  switch (orient) {
    case "left": {
      return d3.axisLeft;
    }
    case "right": {
      return d3.axisRight;
    }
    case "bottom": {
      return d3.axisBottom;
    }
    case "top": {
      return d3.axisTop;
    }
  }
}

export function getAxisClassName(orient: AxisSettings["orient"]) {
  switch (orient) {
    case "left": {
      return "axis-left";
    }
    case "right": {
      return "axis-right";
    }
    case "bottom": {
      return "axis-bottom";
    }
    case "top": {
      return "axis-top";
    }
  }
}

export function getGridPosition(settings: AxisSettings) {
  let { orient, girdLength } = settings;
  girdLength = (girdLength === undefined)?0:girdLength;
  switch (orient) {
    case "left": {
      return {
        orient: "x2",
        size: girdLength,
      };
    }
    case "right": {
      return {
        orient: "x2",
        size: -girdLength,
      };
    }
    case "bottom": {
      return {
        orient: "y2",
        size: -girdLength,
      };
    }
    case "top":{
        return {
            orient: "y2",
            size: -girdLength,
          };
    }
  }
}
