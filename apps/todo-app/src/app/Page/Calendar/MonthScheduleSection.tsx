import { useCallback, useMemo } from 'react';
import { shallowEqual } from 'react-redux';
import { appApi } from '../../../redux/appApi/appApi';
import {
  useAppAction,
  useAppDispatch,
  useAppSelector,
} from '../../../redux/rootStore';
import {
  convertMonthScheduleDataFromReduxToProps,
  convertTaskDataIntoReduxState,
} from '../../../redux/appApi/utils';
import {
  MonthSchedule,
  MonthScheduleProps,
} from '../../../components/MonthSchedule/MonthSchedule';
import dayjs from 'dayjs';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export function MonthScheduleSection() {
  const dispatch = useAppDispatch();
  const action = useAppAction();
  const monthArg = useAppSelector(
    (state) => state.saveDateArg.monthArg,
    shallowEqual
  );

  const { data: reduxData } = appApi.useGetMonthScheduleDataQuery(monthArg);

  const data: MonthScheduleProps['data'] = useMemo(() => {
    if (reduxData) return convertMonthScheduleDataFromReduxToProps(reduxData);

    return {
      month: new Date(monthArg.year, monthArg.month - 1),
      tasks: [],
    };
  }, [reduxData]);

  const handleTaskSelect: NonNullable<MonthScheduleProps['onTaskSelect']> =
    useCallback((task) => {
      const taskRedux = convertTaskDataIntoReduxState(task);

      dispatch(action.taskEditModal.editTask(taskRedux));
    }, []);
  const handleDateSelect: NonNullable<MonthScheduleProps['onDateSelect']> =
    useCallback((date) => {
      const startDate = date.toISOString();
      dispatch(action.taskEditModal.addTask({ startTime: startDate }));
    }, []);

  const renderMonthString = () => {
    const date = new Date(monthArg.year, monthArg.month - 1);
    const dayStr = dayjs(date).format('MMM YYYY');
    return <div className="CalendarApp__DateString">{dayStr}</div>;
  };

  function handleGotoNextMonth() {
    dispatch(action.saveDateArg.goToNextMonth());
  }
  function handleGotoPreviousMonth() {
    dispatch(action.saveDateArg.goToPreviousMonth());
  }

  return (
    <>
      <div className="CalendarApp__DateNavigationBox">
        <ArrowBackIosIcon
          className="CalendarApp__PreviousIcon"
          onClick={handleGotoPreviousMonth}
        />
        <ArrowForwardIosIcon
          className="CalendarApp__NextIcon"
          onClick={handleGotoNextMonth}
        />
        {renderMonthString()}
      </div>
      <MonthSchedule
        data={data}
        onTaskSelect={handleTaskSelect}
        onDateSelect={handleDateSelect}
      />
    </>
  );
}
