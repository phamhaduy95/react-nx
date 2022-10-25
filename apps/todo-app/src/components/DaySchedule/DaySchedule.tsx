import { useEffect, useMemo, useRef } from 'react';
import { range } from 'libs/my-component/src/lib/utils/range';
import './DaySchedule.scss';
import { TaskDataType } from '../../type/model';
import {
  DayScheduleState,
  DayScheduleStoreProvider,
  useDayScheduleStore,
} from './DayScheduleStoreProvider';

import { DayScheduleTaskBlock } from './DayScheduleTaskBlock';
import { DayScheduleCurrentTimeIndicator } from './DayScheduleCurrentTimeIndicator';
import { DayScheduleContextProvider } from './DayScheduleContext';
import { DayScheduleTimeFrame } from './DayScheduleTimeFrame';
import classNames from 'classnames';

export type DayScheduleProps = {
  className?:string;
  data: {
    date: Date;
    tasksList: TaskDataType[];
  };
  onTaskSelect?: (task: TaskDataType) => void;
  onDateSelect?: (date: Date) => void;
};

export function DaySchedule(props: DayScheduleProps) {
  return (
    <DayScheduleContextProvider elProps={props}>
      <DayScheduleStoreProvider>
        <WrappedDaySchedule {...props} />
      </DayScheduleStoreProvider>
    </DayScheduleContextProvider>
  );
}

function WrappedDaySchedule(props: DayScheduleProps) {
  const { data,className } = props;
  const action = useDayScheduleStore((state) => state.action);

  useEffect(() => {
    action.updateDayData(data.date, data.tasksList);
  }, [data]);

  const rootClassName = classNames("DaySchedule",{
    [`${className}`]:className,
  })

  return (
    <div className={rootClassName}>
      <div className="DaySchedule__Container">
        <TimeAxis />
        <DayScheduleTimeLine />
      </div>
    </div>
  );
}

function TimeAxis() {
  const timesIndicators = useMemo(() => {
    return range(0, 23).map((e) => {
      return (
        <div className="DaySchedule__TimeIndicator" key={e}>
          {e}
        </div>
      );
    });
  }, []);
  return <div className="DaySchedule__TimeAxis">{timesIndicators}</div>;
}

function DayScheduleTimeLine() {
  const timeLineRef = useRef<HTMLDivElement>(null);
  const taskLines = useDayScheduleStore((state) => state.tasksLine);

  const timesFrames = useMemo(() => {
    return range(0, 23).map((e) => {
      return <DayScheduleTimeFrame key={e} time={e} />;
    });
  }, []);

  // increase the height of timeLine incase there are many tasks lines to be showed;
  useEffect(() => {
    const timeLineEl = timeLineRef.current;
    if (timeLineEl === null) return;
    const maxNumberOfLine = taskLines.length;
    const newHeight = Math.max(maxNumberOfLine * 14 + 1, 100);

    timeLineEl.style.height = `${newHeight}%`;
  }, [taskLines.length]);

  return (
    <div className="DaySchedule__TimeLine" ref={timeLineRef}>
      {timesFrames}
      <DayScheduleCurrentTimeIndicator containerRef={timeLineRef} />
      {renderTaskLines(taskLines)}
    </div>
  );
}

function renderTaskLines(tasksLines: DayScheduleState['tasksLine']) {
  let linePos = 0;
  const TaskBlocks: JSX.Element[] = [];
  for (let line of tasksLines) {
    for (let task of line) {
      const { taskId: id } = task;
      TaskBlocks.push(
        <DayScheduleTaskBlock taskId={id} linePos={linePos} key={id} />
      );
    }
    linePos++;
  }
  return TaskBlocks;
}
