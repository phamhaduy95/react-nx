import React, { useMemo } from 'react';
import { useTimePickerContext } from './TimePickerContext';
import useEffect from 'react';
import ScrollableDataColumn, {
  ScrollableDataColumnProps,
} from '../ScrollableDataColumn/ScrollableDataColumn';

export function TimePickerHourColumn(props: any) {
  const { state, action } = useTimePickerContext();

  const handleHourSelect = (value: any) => {
    action.selectHour(value);
  };

  const hour = useMemo(()=>{
      return state.selectTime.hour;
  },[state.selectTime.hour])

   const hourData = useHourData();
  return (
    <ScrollableDataColumn
      className="TimePicker__HourColumn"
      dataSet={hourData}
      numberShowedItem={5}
      onSelect={handleHourSelect}
      initialSelected={hour}
    />
  );
}

function useHourData() {
  const data = useMemo(() => {
    const data: ScrollableDataColumnProps['dataSet'] = [];
    for (let i = 0; i < 24; i++) {
      data.push({ value: i });
    }
    return data;
  }, []);
  return data;
}
