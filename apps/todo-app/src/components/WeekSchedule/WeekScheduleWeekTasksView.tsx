import { PopoverProps } from '@phduylib/my-component';
import dayjs from 'dayjs';
import { useEffect, useMemo, useRef, useState } from 'react';
import { TaskDataType } from '../../type/model';
import { range } from '../../utils/range';
import {
  calculateTaskBarLengthInDayUnit,
  findAllTasksInADayAmongTasksList,
  findsAllShowedTasksInTaskLine,
  isSunDay,
} from '../utils';

import { useWeekScheduleStore } from './WeekScheduleStoreProvider';
import TaskListPopover from '../TaskListPopover/TaskListPopover';
import { useWeekScheduleSharedData } from './WeekScheduleContextProvider';

export function WeekScheduleWeeksTaskView() {
  const containerRef = useRef<HTMLDivElement>(null);
  const weekTimeFrames = useMemo(() => {
    return range(0, 6).map((e) => {
      return <WeekTaskViewTimeFrame pos={e} key={e} />;
    });
  }, []);

  return (
    <div className="WeekSchedule__WeekOverViewRow">
      <div className="WeekSchedule__WeekOverViewRow__TextIndicator">
        whole week
      </div>
      <div
        className="WeekSchedule__WeekOverViewRow__TaskTimeLine"
        ref={containerRef}
      >
        {weekTimeFrames}
      </div>
    </div>
  );
}

/* #region : TimeFrame Component  */
type WeekTaskViewTimeFrameProps = {
  pos: number;
};

const TASK_LIMIT = 3;
function WeekTaskViewTimeFrame(props: WeekTaskViewTimeFrameProps) {
  const { pos } = props;
  const timeFrameRef = useRef<HTMLDivElement>(null);
  const taskLinesData = useWeekScheduleStore((state) => state.weekTaskLines);
  const currDate = useWeekScheduleStore(
    (state) => {
      const { startDate } = state.range;
      return dayjs(startDate).add(pos, 'day').toDate();
    },
    (a, b) => a.toDateString() === b.toDateString()
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
    <div
      className="WeekSchedule__WeekOverViewRow__TimeFrame"
      ref={timeFrameRef}
    >
      {TaskBlock}
      <WeekDayTasksExpandButton
        currDate={currDate}
        timeFrameRef={timeFrameRef}
      />
    </div>
  );
}
/* #endregion */

/* #region : TaskLineBlock Component  */

type TaskLineBlockProps = {
  taskData: TaskDataType;
  currDate: Date;
  linePos: number;
};

function WeekTaskViewTaskLineBlock(props: TaskLineBlockProps) {
  const { taskData, linePos, currDate } = props;
  const ref = useRef<HTMLDivElement>(null);
  const { onTaskSelect } = useWeekScheduleSharedData();
  useEffect(() => {
    if (taskData === undefined) return;
    const taskBlockEl = ref.current;
    if (taskBlockEl === null) return;
    const pos = calculateTaskBlockSize(taskData, linePos, currDate);

    positionTaskBlock(taskBlockEl, pos);
  }, [taskData, currDate, linePos]);

  const handleClick = () => {
    onTaskSelect(taskData);
  };

  return (
    <div
      className="WeekSchedule__TimeFrame__TaskBlock"
      ref={ref}
      onClick={handleClick}
    >
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

/* #endregion */

/* #region : TasksExpandButton Component */

type TaskExpandButtonProps = {
  currDate: Date;
  timeFrameRef: React.MutableRefObject<HTMLElement | null>;
};

function WeekDayTasksExpandButton(props: TaskExpandButtonProps) {
  const { currDate, timeFrameRef } = props;
  const [isPopoverOpen, setPopoverOpen] = useState(false);
  const { onTaskSelect } = useWeekScheduleSharedData();
  const tasks = useWeekScheduleStore((state) => state.tasks);
  const tasksWithInDay = useMemo(
    () => findAllTasksInADayAmongTasksList(currDate, tasks),
    [currDate.toDateString(), tasks]
  );
  const numberOfTasks = tasksWithInDay.length - TASK_LIMIT;

  const handleClick = () => {
    setPopoverOpen(true);
  };

  const handlePopoverOpenState: PopoverProps['onOpen'] = (isOpen) => {
    setPopoverOpen(isOpen);
  };

  if (numberOfTasks < TASK_LIMIT) return <></>;

  return (
    <>
      <button
        type="button"
        className="WeekSchedule__TimeFrame__TaskExpandButton"
        onClick={handleClick}
      >
        +{numberOfTasks}
      </button>
      <TaskListPopover
        className=""
        anchorRef={timeFrameRef}
        isOpen={isPopoverOpen}
        onToggle={handlePopoverOpenState}
        taskList={tasksWithInDay}
        onTaskSelect={onTaskSelect}
      />
    </>
  );
}

/* #endregion */
