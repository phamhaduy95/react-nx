import React, { useMemo } from 'react';
import ScrollableDataColumn, {
  ScrollableDataColumnProps,
} from '../ScrollableDataColumn/ScrollableDataColumn';
import { useTimePickerContext } from './TimePickerContext';

export function TimePickerSecondColumn(props: any) {
  const { state, action } = useTimePickerContext();
  const secondData = useSecondData();
  const handleSelect = (value: any) => {
    action.selectSecond(value);
  };
  const second = useMemo(() => {
    return state.selectTime.second;
  }, [state.selectTime.second]);

  return (
    <ScrollableDataColumn
      className="TimePicker__SecondColumn"
      dataSet={secondData}
      numberShowedItem={5}
      onSelect={handleSelect}
      initialSelected={second}
    />
  );
}

function useSecondData() {
  const data = useMemo(() => {
    const data: ScrollableDataColumnProps['dataSet'] = [];
    for (let i = 0; i < 60; i++) {
      data.push({ value: i });
    }
    return data;
  }, []);
  return data;
}
