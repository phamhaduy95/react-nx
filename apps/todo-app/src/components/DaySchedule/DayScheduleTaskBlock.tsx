import dayjs from 'dayjs';
import React, { memo, useEffect, useRef } from 'react';
import { TaskDataType } from '../../type/model';
import { useDayScheduleStore } from './DayScheduleStoreProvider';
import { getTimeRatioInPercentage } from './utils';

type DayScheduleTaskProps = {
  taskId: string;
  linePos: number;
};

export const DayScheduleTaskBlock = memo((props: DayScheduleTaskProps) => {
  const { taskId, linePos } = props;
  const taskBlockRef = useRef<HTMLDivElement>(null);
  const baseDate = useDayScheduleStore((state) => state.date);
  const taskData = useDayScheduleStore(
    (state) => {
      return state.tasks.find((e) => e.id === taskId);
    },
    (a, b) => a?.id === b?.id
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
    positionTaskBlockOnTimeLine(offsetPos, taskBlockEl);
  }, [taskBlockRef.current, taskData, linePos, baseDate.toDateString()]);

  if (taskData === undefined) return <></>;
  return (
    <div className="DaySchedule__TaskBlock" ref={taskBlockRef}>
      <span className="DaySchedule__TaskBlock__title">{taskData?.title}</span>
    </div>
  );
});

const TASK_BLOCK_HEIGHT = 12; // in %

type PositionType = {
  top: string;
  left: string;
  width: string;
  height: string;
};

function calculateTaskBlockOffsetPosition(
  taskData: TaskDataType,
  baseDate: Date,
  linePos: number
): PositionType {
  const { startDate, endDate } = taskData;
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

function positionTaskBlockOnTimeLine(
  position: PositionType,
  taskBlockEl: HTMLElement
) {
  const { top, left, width, height } = position;
  taskBlockEl.style.top = top;
  taskBlockEl.style.left = left;
  taskBlockEl.style.width = width;
  taskBlockEl.style.height = height;
}
