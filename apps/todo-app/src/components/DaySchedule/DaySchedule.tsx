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

export type DayScheduleProps = {
  data: {
    date: Date;
    tasksList: TaskDataType[];
  };
};

export function DaySchedule(props: DayScheduleProps) {
  return (
    <DayScheduleStoreProvider>
      <WrappedDaySchedule {...props} />
    </DayScheduleStoreProvider>
  );
}

export function WrappedDaySchedule(props: DayScheduleProps) {
  const { data } = props;
  const action = useDayScheduleStore((state) => state.action);
  
  useEffect(() => {
    action.updateDayData(data.date, data.tasksList);
  }, [data]);


  return (
    <div className="DaySchedule">
      <div className="DaySchedule__Container" >
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
      return <div className="DaySchedule__TimeFrame" key={e}></div>;
    });
  }, []);

  // increase the height of timeLine incase there are many tasks lines to be showed;
  useEffect(()=>{
    const timeLineEl = timeLineRef.current;
    if (timeLineEl === null) return;
    const maxNumberOfLine = taskLines.length;
    const newHeight = Math.max(maxNumberOfLine*14+1,100);
  
    timeLineEl.style.height = `${newHeight}%`;  
  },[taskLines.length]);

  return (
    <div className="DaySchedule__TimeLine" ref={timeLineRef}>
      {timesFrames}
      <DayScheduleCurrentTimeIndicator containerRef={timeLineRef}/>
      {renderTaskLines(taskLines)}
    </div>
  );
}

function renderTaskLines(tasksLines: DayScheduleState['tasksLine']) {
  let linePos = 0;
  const TaskBlocks: JSX.Element[] = [];
  for (let line of tasksLines) {
    for (let task of line) {
      const { id } = task;
      TaskBlocks.push(
        <DayScheduleTaskBlock taskId={id} linePos={linePos} key={id} />
      );
    }
    linePos++;
  }
  return TaskBlocks;
}



