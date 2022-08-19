import React, { useMemo } from 'react';
import ScrollableDataColumn, {
  ScrollableDataColumnProps,
} from '../ScrollableDataColumn/ScrollableDataColumn';
import { useTimePickerContext } from './TimePickerContext';

export function TimePickerMinuteColumn(props: any) {
  const { state, action } = useTimePickerContext();
  const minuteDate = useMinuteData();
  const handleMinuteSelect = (value: any) => {
    action.selectMinute(value);
  };
  const minute = useMemo(() => {
    return state.selectTime.minute;
  }, [state.selectTime.minute]);

  return (
    <ScrollableDataColumn
      className="TimePicker__MinuteColumn"
      dataSet={minuteDate}
      numberShowedItem={5}
      onSelect={handleMinuteSelect}
      initialSelected={minute}
    />
  );
}

function useMinuteData() {
  const data = useMemo(() => {
    const data: ScrollableDataColumnProps['dataSet'] = [];
    for (let i = 0; i < 60; i++) {
      data.push({ value: i });
    }
    return data;
  }, []);
  return data;
}
