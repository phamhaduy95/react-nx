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
import { createPredicateFunctionFromFilterOptions } from '../../../redux/CalendarApp';
import { ModalType } from 'apps/todo-app/src/type/model';

export function MonthScheduleSection() {
  const dispatch = useAppDispatch();
  const action = useAppAction();
  const monthArg = useAppSelector(
    (state) => state.CalendarApp.dateArgs.monthArg,
    shallowEqual
  );
  const dateArg = useMemo(
    () => new Date(monthArg.year, monthArg.month - 1),
    [monthArg]
  );

  const filterOptions = useAppSelector(
    (state) => state.CalendarApp.taskFilterOptions
  );

  const {
    data: reduxData,
    isFetching,
    isLoading,
  } = appApi.useGetMonthScheduleDataQuery(monthArg);

  const tasksList: MonthScheduleProps['tasksList'] = useMemo(() => {
    if (reduxData) {
      const filterFunction =
        createPredicateFunctionFromFilterOptions(filterOptions);
      const filteredTasks = reduxData.tasks.filter((task) =>
        filterFunction(task)
      );
      const newData: typeof reduxData = { ...reduxData, tasks: filteredTasks };
      return convertMonthScheduleDataFromReduxToProps(newData).tasks;
    }
    return [];
  }, [reduxData, filterOptions]);

  const handleTaskSelect: NonNullable<MonthScheduleProps['onTaskSelect']> =
    useCallback((task) => {
      const taskRedux = convertTaskDataIntoReduxState(task);
      dispatch(action.AppModal.openModal(ModalType.addAndUpdateTask));
      dispatch(action.TaskEditModal.editTask(taskRedux));
    }, []);
  const handleDateSelect: NonNullable<MonthScheduleProps['onDateSelect']> =
    useCallback((date) => {
      const startDate = date.toISOString();
      dispatch(action.AppModal.openModal(ModalType.addAndUpdateTask));
      dispatch(action.TaskEditModal.addTask({ startTime: startDate }));
    }, []);

  return (
    <MonthSchedule
      className="CalendarApp__MonthSchedule"
      isLoading={isLoading || isFetching}
      tasksList={tasksList}
      date={dateArg}
      onTaskSelect={handleTaskSelect}
      onDateSelect={handleDateSelect}
    />
  );
}
