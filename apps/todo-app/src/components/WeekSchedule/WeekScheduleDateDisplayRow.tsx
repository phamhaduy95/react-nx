import { range } from 'd3';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import { useWeekScheduleStore } from './WeekScheduleStoreProvider';

const DATE_FORMAT = 'ddd D/M';

export function WeekScheduleDateDisplayRow() {
  const weekRange = useWeekScheduleStore(
    (state) => state.range,
    (a, b) => {
      return (
        a.startDate.toDateString() === b.startDate.toDateString() &&
        a.endDate.toDateString() === b.endDate.toDateString()
      );
    }
  );

  const weekDayIndicators = useMemo(() => {
    return range(0, 7).map((e) => {
      const dayStr = dayjs(weekRange.startDate)
        .add(e, 'day')
        .format(DATE_FORMAT);
      return (
        <div className="WeekSchedule__DateDisplayRow__Text" key={e}>
          {dayStr}
        </div>
      );
    });
  }, [weekRange.startDate.toDateString()]);

  return (
    <div className="WeekSchedule__DateDisplayRow">
      <div className="WeekSchedule__DateDisplayRow__DummyCell"></div>
      {weekDayIndicators}
    </div>
  );
}
