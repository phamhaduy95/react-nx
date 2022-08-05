import * as d3 from "d3";
import { BarStackCharSettingsType, BarStackChartProps } from "./type";

export function findMaxHeight(data: any[][][]): number {
    if (data.length === 0) return 0;
    const lastRow = data[data.length - 1];
    let max = 0;
    lastRow.forEach((i) => {
      max = Math.max(max, i[1]);
    });
    return Math.round(max * 1.25);
  }
export function getAllKeyStringFromDataSet(data:BarStackChartProps["dataSet"]){
      const {valuesList} = data[0];
      const keys = Object.getOwnPropertyNames(valuesList);
      return keys
  }
  
export function generateStackLayOutData(data: BarStackChartProps["dataSet"]) {
     const keys = getAllKeyStringFromDataSet(data);
     const stack = d3
      .stack<typeof data[number]>()
      .keys(keys)
      .value((d,key)=>{
        return d.valuesList[key]
      })
      .order(d3.stackOrderNone)
      .offset(d3.stackOffsetNone);
    const stackDataLayout = stack(data);
    return stackDataLayout;
  }

export function getRawValueListForEveryKey(data: BarStackChartProps["dataSet"]){
  const keys = getAllKeyStringFromDataSet(data);
  const results = [] 
  for( let key of keys){
      let array = [];
      for(let row of data){
          array.push(row.valuesList[key]);
      }
      results.push(array);
  }
  return results;
}
  
export  function generateXScaleFunction(
    data:BarStackChartProps["dataSet"],
    setting: BarStackCharSettingsType
  ) {
    const {XLength} = setting.axis
    const XScale = d3
      .scaleBand<string>()
      .domain(data.map((i) => i.key))
      .range([0, XLength])
      .padding(0.3);
    return  XScale;
  }
  
 export function generateYScaleFunction(
    stackDataLayout: d3.Series<any, string>[],
    setting: BarStackCharSettingsType
  ){
    const {YLength} = setting.axis
    const maxYValue = findMaxHeight(stackDataLayout);
    const YScale = d3.scaleLinear().domain([maxYValue, 0]).range([0, YLength]);
    return YScale;
  }
  
export  function rotate2DArray(array: d3.Series<any, string>[]) {
    const newArray = [];
    const height = array.length;
    const width = array[0].length;
    for (let i = 0; i < width; i++) {
      const row = [];
      for (let j = 0; j < height; j++) {
        let value = array[j][i];
        row.push(value);
      }
      newArray.push(row);
    }
    return newArray;
  }
  