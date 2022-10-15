import dayjs from 'dayjs';
import React, { memo, useEffect, useRef } from 'react';
import { TaskDataType } from '../../type/model';
import { useDayScheduleStore } from './DayScheduleStoreProvider';
import { getTimeRatioInPercentage } from './utils';
import { Position, positionElement } from '../utils';
import { useDayScheduleSharedData } from './DayScheduleContext';
import shallow from 'zustand/shallow';

type DayScheduleTaskProps = {
  taskId: string;
  linePos: number;
};

export const DayScheduleTaskBlock = memo((props: DayScheduleTaskProps) => {
  const { taskId, linePos } = props;
  const taskBlockRef = useRef<HTMLDivElement>(null);
  const baseDate = useDayScheduleStore((state) => state.date);
  const { onTaskSelect } = useDayScheduleSharedData();
  const taskData = useDayScheduleStore(
    (state) => {
      return state.tasks.find((e) => e.taskId === taskId);
    }
  );

  useEffect(() => {
    if (taskData === undefined) return;
    const taskBlockEl = taskBlockRef.current;
    if (taskBlockEl === null) return;
    const offsetPos = calculateTaskBlockOffsetPosition(
      taskData,
      baseDate,
      linePos
    );
    positionElement(taskBlockEl, offsetPos);
  }, [taskBlockRef.current, taskData, linePos, baseDate.toDateString()]);

  const handleClick = () => {
    if (taskData) onTaskSelect(taskData);
  };

  if (taskData === undefined) return <></>;
  return (
    <div
      className="DaySchedule__TaskBlock"
      ref={taskBlockRef}
      onClick={handleClick}
    >
      <span className="DaySchedule__TaskBlock__title">{taskData?.title}</span>
    </div>
  );
});

const TASK_BLOCK_HEIGHT = 12; // in %

function calculateTaskBlockOffsetPosition(
  taskData: TaskDataType,
  baseDate: Date,
  linePos: number
): Position {
  const { startTime: startDate, endTime: endDate } = taskData;
  const startPos = getTimeRatioInPercentage(startDate, baseDate);
  const endPos = getTimeRatioInPercentage(endDate, baseDate);
  const offsetPos = {
    top: `${linePos * (TASK_BLOCK_HEIGHT + 2) + 2}%`, // in %
    height: `${TASK_BLOCK_HEIGHT}%`,
    left: `${startPos}%`,
    width: `${endPos - startPos}%`,
  };
  return offsetPos;
}
