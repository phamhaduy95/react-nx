import {
  TaskDataType,
  useMonthScheduleStore,
} from './MonthScheduleStoreProvider';
import { findAllTasksInADayAmongTasksList } from './utils';
import { useEffect, useRef, useState } from 'react';

import dayjs from 'dayjs';
import CloseIcon from '@mui/icons-material/Close';
import { ClickOutSideWatcher } from '@phduylib/my-component';

type Props = {
  lineLimit: number;
  currDate: Date;
};

export function RemainingTaskIndicator(props: Props) {
  const { lineLimit, currDate } = props;
  const [isShowed, setShowed] = useState(false);
  const tasksList = useMonthScheduleStore((state) => state.tasks);
  const tasksInADay = findAllTasksInADayAmongTasksList(currDate, tasksList);
  const numberOfHiddenTasks = Math.max(0, tasksInADay.length - lineLimit);
  const isTaskIndicatorShowed = tasksInADay.length > lineLimit;

  const handleClick = () => {
    setShowed((prev) => !prev);
  };

  const handlePopupToggle = (isOpen:boolean)=>{
    setShowed(isOpen)
  }

  if (isTaskIndicatorShowed)
    return (
      <>
        <div
          className="TableDateCell__RemainingTaskIndicator"
          onClick={handleClick}
        >
          {`+${numberOfHiddenTasks} more`}
        </div>
        <TaskListBox
          tasksList={tasksInADay}
          currDate={currDate}
          isShowed={isShowed}
          onToggle={handlePopupToggle}
        />
      </>
    );
  return <></>;
}

type TaskListProps = {
  currDate: Date;
  tasksList: TaskDataType[];
  isShowed: boolean;
  onToggle: (isOpen: boolean) => void;
};

function TaskListBox(props: TaskListProps) {
  const { currDate, tasksList, isShowed, onToggle } = props;
  const [isOpen, setOpen] = useState(false);
  const dateText = dayjs(currDate).format('DD-MM-YYYY');
  useEffect(() => {
    setOpen(isShowed);
  }, [isShowed]);
  const ref = useRef<any>(null);

  useEffect(() => {
    onToggle(isOpen);
  }, [isOpen]);

  const handleClickOutSide = () => {
    setOpen(false);
  };

  const handleClickClose = ()=>{
    setOpen(false)
  }

  if (isOpen) {
    const taskComponentList = tasksList.map((task, i) => {
      return (
        <div className="TaskListPopup__Body__Task" key={i}>
          {task.title}
        </div>
      );
    });

    return (
      <ClickOutSideWatcher onClickOutSide={handleClickOutSide} ref={ref}>
        <div className="TableDateCell__TaskListPopup" ref={ref}>
          <div className="TableDateCell__TaskListPopup__Header">
            <span className="TaskListPopup__Header__DateText">{dateText}</span>
            <div className="TaskListPopup__Header__Close" onClick={handleClickClose}>
              <CloseIcon />
            </div>
          </div>
          <div className="TableDateCell__TaskListPopup__Body">
            {taskComponentList}
          </div>
        </div>
      </ClickOutSideWatcher>
    );
  }
  return <></>;
}
