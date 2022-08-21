import { useMemo } from "react";
import { ScrollableDataColumnProps } from "../ScrollableDataColumn";

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
  
  export function extractTimeFromDate(date:Date):{hour:number,minute:number,second:number}{
      const hour = date.getHours();
      const minute = date.getMinutes();
      const second = date.getSeconds();
      return {hour,minute,second}
  }