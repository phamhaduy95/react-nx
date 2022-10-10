import React, { useEffect, useRef } from 'react';
import { calculateTaskBarLengthInDayUnit, isSunDay } from '../utils';
import { MonthScheduleState } from './MonthScheduleStoreProvider';
import { useMonthScheduleSharedData } from './MonthScheduleContextProvider';

type MonthScheduleTaskProps = {
  cellDate: Date;
  cellRef: React.MutableRefObject<unknown>;
  taskData: MonthScheduleState['tasks'][number];
  index: number;
};

export function MonthScheduleTask(props: MonthScheduleTaskProps) {
  const { cellRef, taskData, index, cellDate } = props;
  const taskBarRef = useRef<HTMLDivElement>(null);
  const isDateSunday = isSunDay(cellDate);
  const { title } = taskData;
  const { onTaskSelect } = useMonthScheduleSharedData();
  const taskBarWidthInDay = calculateTaskBarLengthInDayUnit(
    taskData,
    cellDate,
    isDateSunday
  );

  // this useEffect register an resizeObserver which watch the changed of table cell and recalculate the size of the taskBar
  useEffect(() => {
    const cellEl = cellRef.current as HTMLElement;
    const taskBarEl = taskBarRef.current;
    if (cellEl === null || taskBarEl === null) return;
    const callback: ResizeObserverCallback = (entries) => {
      for (let entry of entries) {
        if (entry.borderBoxSize) {
          const cellWidth = entry.borderBoxSize[0].inlineSize;
          const paddingWidthSize =
            (cellWidth - entry.contentBoxSize[0].inlineSize) / 2;
          const taskBarWidth =
            taskBarWidthInDay * cellWidth - paddingWidthSize * 2;
          taskBarEl.style.width = `${taskBarWidth}px`;
        }
      }
    };
    const observer = new ResizeObserver(callback);
    observer.observe(cellEl);
    return () => {
      observer.disconnect();
    };
  }, [taskBarWidthInDay]);

  // position the taskBar
  useEffect(() => {
    const taskBarEl = taskBarRef.current;
    if (taskBarEl === null) return;
    const offsetTop = index * 22;
    taskBarEl.style.top = `${offsetTop}px`;
  }, [index]);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onTaskSelect(taskData);
  };
  return (
    <div
      className="TableDateCell__TaskLine"
      ref={taskBarRef}
      onClick={handleClick}
    >
      <span className="TableDateCell__TaskLine__title">{title}</span>
    </div>
  );
}
