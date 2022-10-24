import { useMemo, useCallback } from 'react';
import { shallowEqual } from 'react-redux';
import {
  useAppAction,
  useAppDispatch,
  useAppSelector,
} from '../../../redux/rootStore';
import {
  DaySchedule,
  DayScheduleProps,
} from '../../../components/DaySchedule/DaySchedule';
import { appApi } from '../../../redux/appApi/appApi';
import {
  convertDayScheduleDataFromReduxToProps,
  convertTaskDataIntoReduxState,
} from '../../../redux/appApi/utils';
import dayjs from 'dayjs';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { createPredicateFunctionFromFilterOptions } from '../../../redux/taskFilterOption';


export function DayScheduleSection() {
  const dispatch = useAppDispatch();
  const action = useAppAction();
  const dayArg = useAppSelector(
    (state) => state.saveDateArg.dateArg,
    shallowEqual
  );
  const { data: reduxData } = appApi.useGetDayScheduleDataQuery(dayArg);
  const filterOption = useAppSelector((state)=>state.taskFilter);
  

  const data: DayScheduleProps['data'] = useMemo(() => {
    if (reduxData) {
      console.log(filterOption.categories);
      const filterPredicate =  createPredicateFunctionFromFilterOptions(filterOption);
      const filterTasks = reduxData.tasks.filter((task)=>filterPredicate(task));
      console.log(filterTasks)
      const newData = {...reduxData,tasks:filterTasks};
      return convertDayScheduleDataFromReduxToProps(newData);
    }
      return {
      date: new Date(dayArg.year, dayArg.month - 1, dayArg.date),
      tasksList: [],
    };
  }, [reduxData,filterOption]);

  


  const handleTaskSelect: NonNullable<DayScheduleProps['onTaskSelect']> =
    useCallback((task) => {
      const taskRedux = convertTaskDataIntoReduxState(task);
      dispatch(action.taskEditModal.toggleDrawerOpen(true));
      dispatch(action.taskEditModal.editTask(taskRedux));
    }, []);
  const handleDateSelect: NonNullable<DayScheduleProps['onDateSelect']> =
    useCallback((date) => {
      const startDate = date.toString();
      dispatch(action.taskEditModal.toggleDrawerOpen(true));
      dispatch(action.taskEditModal.addTask({ startTime: startDate }));
    }, []);

  const renderDateString = () => {
    const date = new Date(dayArg.year, dayArg.month - 1, dayArg.date);
    const dayStr = dayjs(date).format('MMM D YYYY');
    return <div className="CalendarApp__DateString">{dayStr}</div>;
  };

  function handleGotoNextDay() {
    dispatch(action.saveDateArg.gotoNextDay());
  }
  function handleGotoPreviousDay() {
    dispatch(action.saveDateArg.gotoPreviousDay());
  }

  return (
    <>
      <div className="CalendarApp__DateNavigationBox">
        <ArrowBackIosIcon
          className="CalendarApp__PreviousIcon"
          onClick={handleGotoPreviousDay}
        />
        <ArrowForwardIosIcon
          className="CalendarApp__NextIcon"
          onClick={handleGotoNextDay}
        />
        {renderDateString()}
      </div>
      <DaySchedule
        data={data}
        onTaskSelect={handleTaskSelect}
        onDateSelect={handleDateSelect}
      />
    </>
  );
}
