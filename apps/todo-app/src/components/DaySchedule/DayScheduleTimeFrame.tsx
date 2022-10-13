import dayjs from 'dayjs';
import React from 'react';
import { useDayScheduleSharedData } from './DayScheduleContext';
import { useDayScheduleStore } from './DayScheduleStoreProvider';

type Props = {
  time: number;
};

export function DayScheduleTimeFrame(props: Props) {
  const { time } = props;
  const { onDateSelect } = useDayScheduleSharedData();
  const currDate = useDayScheduleStore(
    (state) => state.date,
    (a, b) => a.toString() === b.toString()
  );

  const handleClick = () => {
    const dateTime = dayjs(currDate).hour(time).minute(0).toDate();
    onDateSelect(dateTime);
  };

  return <div className="DaySchedule__TimeFrame" onClick={handleClick}></div>;
}
