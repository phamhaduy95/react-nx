import { useMemo } from "react";
import { ScrollableDataColumnProps } from "../ScrollableDataColumn";
import { Time } from "./types";

type DataType = "hour"|"second"|"minute";

export function useColumnDataGenerator(dataType:DataType,disabledRange:number[]) {
    const maxValue = (dataType === "hour")?24:60; 
    const data = useMemo(() => {
      const disabledSet = new Set(disabledRange);
      const data: ScrollableDataColumnProps['dataSet'] = [];
      for (let i = 0; i < maxValue; i++) {
        data.push({ 
          value: i,
          disabled: disabledSet.has(i)
        });
      }
      return data;
    }, [disabledRange,dataType]);
    return data;
  }
  
export  function getDefaultTimeValue(){
    return {hour:0,minute:0,second:0} as Time
  }
 

export function extractTimeFromDate(date: Date|null) {
    if (date === null) return {hour:0,minute:0,second:0}
    const hour = date.getHours();
    const second = date.getSeconds();
    const minute = date.getMinutes();
    return { hour, second, minute };
}