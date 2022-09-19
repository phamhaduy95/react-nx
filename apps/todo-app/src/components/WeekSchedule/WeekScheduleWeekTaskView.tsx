import dayjs from 'dayjs';
import { useEffect, useMemo, useRef } from 'react';
import { TaskDataType } from '../../type/model';
import { range } from '../../utils/range';
import { calculateTaskBarLengthInDayUnit, findAllTasksInADayAmongTasksList, findsAllShowedTasksInTaskLine, isSunDay } from '../utils';

import { useWeekScheduleStore } from './WeekScheduleStoreProvider';

// view any tasks that span more than one day
export function WeekScheduleWeekTaskView() {
  const containerRef = useRef<HTMLDivElement>(null);
  const weekTimeFrames = useMemo(() => {
    return range(0, 6).map((e) => {
      return <WeekTaskViewTimeFrame pos={e} />;
    });
  }, []);

  return (
    <div className="WeekSchedule__WeekTaskView">
      <div className="WeekSchedule__WeekTaskView__TextIndicator">
        whole week
      </div>
      <div
        className="WeekSchedule__WeekTaskView__TaskTimeLine"
        ref={containerRef}
      >
        {weekTimeFrames}
      </div>
    </div>
  );
}

type WeekTaskViewTimeFrameProps = {
  pos: number;
};

const TASK_LIMIT = 3;

function WeekTaskViewTimeFrame(props: WeekTaskViewTimeFrameProps) {
  const { pos } = props;
  const taskLinesData = useWeekScheduleStore((state) => state.weekTaskLines);
  const currDate = useWeekScheduleStore(
    (state) => {
      const { startDate } = state.range;
      return dayjs(startDate).add(pos, 'day').toDate();
    },
    (a, b) => a.toDateString() === b.toDateString()
  );
  const tasks = useWeekScheduleStore((state) => state.tasks);
  const tasksWithInDay = useMemo(
    () => findAllTasksInADayAmongTasksList(currDate, tasks),
    [currDate.toDateString(), tasks]
  );

  const TaskBlock = useMemo(() => {
    const taskToRenders = findsAllShowedTasksInTaskLine(
      taskLinesData,
      currDate,
      TASK_LIMIT
    );
    return taskToRenders.map((task, i) => {
      return (
        <WeekTaskViewTaskLineBlock
          taskData={task}
          linePos={task.index}
          currDate={currDate}
          key={i}
        />
      );
    });
  }, [taskLinesData, currDate]);

  return (
    <div className="WeekSchedule__WeekTaskView__DayTimeFrame">{TaskBlock}</div>
  );
}

type Props = {
  taskData: TaskDataType;
  currDate: Date;
  linePos: number;
};

function WeekTaskViewTaskLineBlock(props: Props) {
  const { taskData, linePos, currDate } = props;
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (taskData === undefined) return;
    const taskBlockEl = ref.current;
    if (taskBlockEl === null) return;
    const pos = calculateTaskBlockSize(taskData, linePos, currDate);

    positionTaskBlock(taskBlockEl, pos);
  }, [taskData, currDate, linePos]);

  return (
    <div className="WeekSchedule__WeekTaskView__TaskBlock" ref={ref}>
      {taskData.title}
    </div>
  );
}

type Position = {
  top: string;
  left: string;
  width: string;
  height: string;
};

const BLOCK_HEIGHT = 21; // in pixel
const VER_BLOCK_GAP = 8; // in pixel
const HOR_BLOCK_GAP = 8; // in %
function calculateTaskBlockSize(
  taskData: TaskDataType,
  linePos: number,
  currDate: Date
): Position {
  const widthInDayUnit = calculateTaskBarLengthInDayUnit(
    taskData,
    currDate,
    isSunDay(currDate)
  );
  return {
    top: `${linePos * (BLOCK_HEIGHT + VER_BLOCK_GAP) + VER_BLOCK_GAP}px`,
    height: `${BLOCK_HEIGHT}px`,
    left: `${HOR_BLOCK_GAP}%`,
    width: `${widthInDayUnit * 100 - 2 * HOR_BLOCK_GAP}%`,
  };
}

function positionTaskBlock(blockEl: HTMLElement, pos: Position) {
  const { top, left, width, height } = pos;
  blockEl.style.top = top;
  blockEl.style.left = left;
  blockEl.style.width = width;
  blockEl.style.height = height;
}
