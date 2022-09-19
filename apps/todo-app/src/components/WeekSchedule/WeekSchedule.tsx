import { range } from '../../utils/range';
import {
  WeekScheduleStoreProvider,
  WeekScheduleState,
  useWeekScheduleStore,
} from './WeekScheduleStoreProvider';
import { WeekScheduleWeekDaysBox } from './WeekScheduleWeeksDayBox';
import { WeekScheduleTimeLine } from './WeekScheduleTimeLineBox';
import { useEffect, useMemo } from 'react';
import './WeekSchedule.scss';
import { WeekScheduleWeekTaskView } from './WeekScheduleWeekTaskView';

export type WeekScheduleProps = {
  data: {
    range: WeekScheduleState['range'];
    tasks: WeekScheduleState['tasks'];
  };
};

export function WeekSchedule(props: WeekScheduleProps) {
  return (
    <WeekScheduleStoreProvider>
      <WrappedWeekSchedule {...props} />
    </WeekScheduleStoreProvider>
  );
}

function WrappedWeekSchedule(props: WeekScheduleProps) {
  const { data } = props;
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

  return (
    <div className="WeekSchedule">
      <div className="WeekSchedule__Container">
        <div className="WeekSchedule__Header">
          <WeekScheduleWeekDaysBox />
          <WeekScheduleWeekTaskView />
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
