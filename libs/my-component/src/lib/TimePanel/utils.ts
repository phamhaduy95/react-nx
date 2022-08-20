import { useMemo } from "react";
import { ScrollableDataColumnProps } from "../ScrollableDataColumn";

type DataType = "hour"|"second"|"minute";

export function useColumnDataGenerator(dataType:DataType) {
    const maxValue = (dataType === "hour")?24:60; 
    const data = useMemo(() => {
      const data: ScrollableDataColumnProps['dataSet'] = [];
      for (let i = 0; i < maxValue; i++) {
        data.push({ value: i });
      }
      return data;
    }, []);
    return data;
  }
  