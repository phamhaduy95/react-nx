import { convertTaskDataIntoReduxState } from 'apps/todo-app/src/redux';
import dayjs from 'dayjs';
import { useCallback, useMemo } from 'react';
import { shallowEqual } from 'react-redux';
import {
  useAppAction,
  useAppDispatch,
  useAppSelector,
} from '../../../redux/rootStore';
import { appApi } from '../../../redux/appApi/appApi';
import { convertWeekScheduleDataFromReduxToProps } from '../../../redux/appApi/utils';
import {
  WeekSchedule,
  WeekScheduleProps,
} from '../../../components/WeekSchedule/WeekSchedule';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { createPredicateFunctionFromFilterOptions } from '../../../redux/taskFilterOption/utils';


export function WeekScheduleSection() {
  const dispatch = useAppDispatch();
  const action = useAppAction();
  const weekArg = useAppSelector(
    (state) => state.saveDateArg.weekArg,
    shallowEqual
  );
  
  const filterOptions = useAppSelector((state) => state.taskFilter);

  const { data: reduxData } = appApi.useGetWeekScheduleDataQuery(weekArg);


  const inputData: WeekScheduleProps['data'] = useMemo(() => {
    if (reduxData) { 
      const filterFunction = createPredicateFunctionFromFilterOptions(filterOptions);
      const filteredTasks = reduxData.tasks.filter((task)=>filterFunction(task));
      const newData:typeof reduxData = {...reduxData,tasks:filteredTasks};
      return convertWeekScheduleDataFromReduxToProps(newData);
    }
    return {
      range: {
        startDate: new Date(weekArg.startDate),
        endDate: new Date(weekArg.endDate),
      },
      tasks: [],
    };
  }, [reduxData,filterOptions]);

  const handleTaskSelect: NonNullable<WeekScheduleProps['onTaskSelect']> =
    useCallback((task) => {
      const taskRedux = convertTaskDataIntoReduxState(task);
      dispatch(action.taskEditModal.editTask(taskRedux));
    }, []);
  const handleDateSelect: NonNullable<WeekScheduleProps['onDateSelect']> =
    useCallback((date) => {
      const startDate = date.toISOString();
      dispatch(action.taskEditModal.addTask({ startTime: startDate }));
    }, []);
  const renderWeekString = () => {
    const firstDayStr = dayjs(weekArg.startDate).format('MMM D');
    const endDayStr = dayjs(weekArg.endDate).format('- MMM D, YYYY');
    const str = firstDayStr.concat(endDayStr);

    return <div className="CalendarApp__DateString">{str}</div>;
  };

  function handleGotoNextWeek() {
    dispatch(action.saveDateArg.goToNextWeek());
  }
  function handleGotoPreviousWeek() {
    dispatch(action.saveDateArg.goToPreviousWeek());
  }

  return (
    <>
      <div className="CalendarApp__DateNavigationBox">
        <ArrowBackIosIcon
          className="CalendarApp__PreviousIcon"
          onClick={handleGotoPreviousWeek}
        />
        <ArrowForwardIosIcon
          className="CalendarApp__NextIcon"
          onClick={handleGotoNextWeek}
        />
        {renderWeekString()}
      </div>
      <WeekSchedule
        data={inputData}
        onTaskSelect={handleTaskSelect}
        onDateSelect={handleDateSelect}
      />
    </>
  );
}
