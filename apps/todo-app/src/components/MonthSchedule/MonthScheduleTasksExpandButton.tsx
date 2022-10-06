import { useMonthScheduleStore } from './MonthScheduleStoreProvider';
import { useState } from 'react';
import { findAllTasksInADayAmongTasksList } from '../utils';
import TaskListPopover from '../TaskListPopover/TaskListPopover';
import { useMonthScheduleSharedData } from './MonthScheduleContextProvider';

type Props = {
  anchorRef: React.MutableRefObject<HTMLDivElement | null>;
  lineLimit: number;
  currDate: Date;
};

export function MonthScheduleTasksExpandButton(props: Props) {
  const { lineLimit, currDate, anchorRef } = props;
  const [isShowed, setShowed] = useState(false);
  const tasksList = useMonthScheduleStore((state) => state.tasks);
  const tasksInADay = findAllTasksInADayAmongTasksList(currDate, tasksList);
  const numberOfHiddenTasks = Math.max(0, tasksInADay.length - lineLimit);
  const isTaskIndicatorShowed = tasksInADay.length > lineLimit;
  const { onTaskSelect } = useMonthScheduleSharedData();

  const handleClick = (e:React.MouseEvent) => {
    e.stopPropagation();
    setShowed((prev) => !prev);
  };

  const handlePopupToggle = (isOpen: boolean) => {
    setShowed(isOpen);
  };

  if (isTaskIndicatorShowed)
    return (
      <>
        <div className="TableDateCell__TasksExpandButton" onClick={handleClick}>
          {`+${numberOfHiddenTasks} more`}
        </div>
        <TaskListPopover
          className=""
          taskList={tasksInADay}
          anchorRef={anchorRef}
          isOpen={isShowed}
          onToggle={handlePopupToggle}
          onTaskSelect={onTaskSelect}
        />
      </>
    );
  return <></>;
}
