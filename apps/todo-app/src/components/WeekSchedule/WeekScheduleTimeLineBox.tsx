import dayjs from 'dayjs';
import { useEffect, useMemo, useRef } from 'react';
import { range } from '../../utils/range';
import { useWeekScheduleStore } from './WeekScheduleStoreProvider';
import {
  findTaskWhichStartsOnThisDate,
  organizeTasksOnTimeLine,
} from './utils';
import { TaskDataType } from '../../type/model';
import { getTimeRatioInPercentage } from '../DaySchedule/utils';
import { Position, positionElement } from '../utils';

export type WeekScheduleTimeLineProps = {
  pos: number;
};

export function WeekScheduleTimeLine(props: WeekScheduleTimeLineProps) {
  const { pos } = props;
  const containerRef = useRef<HTMLDivElement>(null);
  const currDate = useWeekScheduleStore(
    (state) => {
      const startDate = state.range.startDate;
      return dayjs(startDate).add(pos, 'day').toDate();
    },
    (a, b) => a.toDateString() === b.toDateString()
  );
  const timeFrames = useMemo(() => {
    return range(0, 23).map((e) => {
      return <div className="WeekSchedule__TimeFrame" key={e}></div>;
    });
  }, []);

  const tasks = useWeekScheduleStore((state) => state.tasks);
  const showedTasks = useMemo(
    () => findTaskWhichStartsOnThisDate(tasks, currDate),
    [tasks, currDate]
  );

  const linesArray = organizeTasksOnTimeLine(showedTasks, 3);
  function renderTaskTimeLine() {
    const TaskLines: JSX.Element[] = [];
    let lineNumber = -1;
    for (let taskLine of linesArray) {
      lineNumber++;
      for (let task of taskLine) {
        TaskLines.push(
          <TaskTimeLine
            linePos={lineNumber}
            taskData={task}
            width={task.width}
            key={task.id}
          />
        );
      }
    }
    return TaskLines;
  }

  return (
    <div className="WeekSchedule__WeekDayTimeLine" ref={containerRef}>
      {renderTaskTimeLine()}
      {timeFrames}
    </div>
  );
}
type TaskTimeLineProps = {
  taskData: TaskDataType;
  linePos: number;
  width: number;
};

function TaskTimeLine(props: TaskTimeLineProps) {
  const { taskData, linePos, width } = props;
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (el === null) return;
    const pos = calculateTaskLinePosAndSize(taskData, linePos, width);
    console.log(taskData.title, pos);
    positionElement(el, pos);
  }, [taskData, linePos, width]);

  return (
    <div className="WeekSchedule__WeekDayTimeLine__TaskTimeLine" ref={ref}>
      <p className="WeekDayTimeLine__TaskTitle">{taskData.title}</p>
    </div>
  );
}

const MIN_LINE_WIDTH = 25; // in %
const MIN_GAP_BETWEEN_LINE = 5; // in %;

function calculateTaskLinePosAndSize(
  taskData: TaskDataType,
  linePos: number,
  taskWidth: number
): Position {
  const { startDate, endDate } = taskData;
  const startTime = getTimeRatioInPercentage(startDate, startDate);
  const endTime = getTimeRatioInPercentage(endDate, startDate);
  
  return {
    top: `${startTime}%`,
    left: `${linePos * MIN_LINE_WIDTH + MIN_GAP_BETWEEN_LINE * (linePos + 1)}%`,
    width: `${
      taskWidth * MIN_LINE_WIDTH + MIN_GAP_BETWEEN_LINE * (taskWidth - 1)
    }%`,
    height: `${endTime - startTime}%`,
  };
}

