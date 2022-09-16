import dayjs from 'dayjs';
import { useEffect, useRef } from 'react';
import { useDayScheduleStore } from './DayScheduleStoreProvider';
import { getTimeRatioInPercentage } from './utils';

type TimeIndicatorProps = {
  containerRef: React.MutableRefObject<HTMLElement | null>;
};

export function DayScheduleCurrentTimeIndicator(props: TimeIndicatorProps) {
  const { containerRef } = props;
  const ref = useRef<HTMLDivElement>(null);
  const baseDate = useDayScheduleStore(
    (state) => state.date,
    (a, b) => a.toDateString() === b.toDateString()
  );
  const currTime = dayjs().toDate();
  const isToday = dayjs().isSame(baseDate, 'day');
  useEffect(() => {
    if (!isToday) return;
    const el = ref.current;
    const containerEl = containerRef.current;
    if (el === null || containerEl === null) return;
 
    const timeRatio = getTimeRatioInPercentage(currTime, baseDate);
    el.style.left = `${timeRatio}%`;
  }, [ref.current, isToday]);
   const time = dayjs(currTime).format("HH:mm");

  if (isToday)
    return <div className="DaySchedule__CurrentTimeIndicator" ref={ref} data-time={time}></div>;
  return <></>;
}
