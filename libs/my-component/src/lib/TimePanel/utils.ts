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
 