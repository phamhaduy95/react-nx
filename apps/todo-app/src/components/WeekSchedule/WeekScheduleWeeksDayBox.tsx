import { range } from 'd3';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import { useWeekScheduleStore } from './WeekScheduleStoreProvider';

const DATE_FORMAT = 'ddd D/M';

export function WeekScheduleWeekDaysBox() {
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
        <div className="WeekSchedule__WeekDaysBox__DayIndicator" key={e}>
          {dayStr}
        </div>
      );
    });
  }, [weekRange.startDate.toDateString()]);

  return (
    <div className="WeekSchedule__WeekDaysBox">
      <div className="WeekSchedule__WeekDaysBox__DummyCell"></div>
      {weekDayIndicators}
    </div>
  );
}
