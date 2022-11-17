import { range } from '../../utils/range';
import {
  WeekScheduleStoreProvider,
  WeekScheduleState,
  useWeekScheduleStore,
} from './WeekScheduleStoreProvider';
import { WeekScheduleDateDisplayRow } from './WeekScheduleDateDisplayRow';
import { WeekScheduleTimeLine } from './WeekScheduleTimeLineBox';
import { useEffect, useMemo } from 'react';
import './WeekSchedule.scss';
import { WeekScheduleWeeksTaskView } from './WeekScheduleWeekTasksView';
import { TaskDataType } from '../../type/model';
import { WeekScheduleContextProvider } from './WeekScheduleContextProvider';
import classNames from 'classnames';

export type WeekScheduleProps = {
  className?: string;
  data: {
    range: WeekScheduleState['range'];
    tasks: WeekScheduleState['tasks'];
  };
  onTaskSelect?: (taskData: TaskDataType) => void;
  onDateSelect?: (date: Date) => void;
};

export function WeekSchedule(props: WeekScheduleProps) {
  return (
    <WeekScheduleContextProvider elProps={props}>
      <WeekScheduleStoreProvider>
        <WrappedWeekSchedule {...props} />
      </WeekScheduleStoreProvider>
    </WeekScheduleContextProvider>
  );
}

function WrappedWeekSchedule(props: WeekScheduleProps) {
  const { data, className } = props;
  const action = useWeekScheduleStore((state) => state.action);
  useEffect(() => {
    action.updateWeekTaskData(data.range, data.tasks);
  }, [data]);


  const weekDayTimeLines = useMemo(() => {
    return renderWeekDayTimeLines();
  }, []);

  const timeLineIndicators = useMemo(() => {
    return renderTimeIndicator();
  }, []);

  const rootClassName = classNames('DaySchedule', {
    [`${className}`]: className,
  });

  return (
    <div className={rootClassName}>
      <div className="WeekSchedule__Container">
        <div className="WeekSchedule__Header">
          <WeekScheduleDateDisplayRow />
          <WeekScheduleWeeksTaskView />
        </div>
        <div className="WeekSchedule__TimeLineBox">
          {timeLineIndicators}
          {weekDayTimeLines}
        </div>
      </div>
    </div>
  );
}

const renderWeekDayTimeLines = () => {
  return range(0, 6).map((e) => {
    return <WeekScheduleTimeLine pos={e} key={e} />;
  });
};

const renderTimeIndicator = () => {
  const TimeIndicators = range(0, 23).map((e) => {
    return (
      <div className="WeekSchedule__TimeIndicator" key={e}>
        {e}
      </div>
    );
  });
  return <div className="WeekSchedule__TimeIndicatorBox">{TimeIndicators}</div>;
};
