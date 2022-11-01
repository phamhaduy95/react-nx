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
import { ModalType } from 'apps/todo-app/src/redux';

export function MonthScheduleSection() {
  const dispatch = useAppDispatch();
  const action = useAppAction();
  const monthArg = useAppSelector(
    (state) => state.CalendarApp.dateArgs.monthArg,
    shallowEqual
  );

  const filterOptions = useAppSelector(
    (state) => state.CalendarApp.taskFilterOptions
  );

  const { data: reduxData } = appApi.useGetMonthScheduleDataQuery(monthArg);

  const data: MonthScheduleProps['data'] = useMemo(() => {
    if (reduxData) {
      const filterFunction =
        createPredicateFunctionFromFilterOptions(filterOptions);
      const filteredTasks = reduxData.tasks.filter((task) =>
        filterFunction(task)
      );
      const newData: typeof reduxData = { ...reduxData, tasks: filteredTasks };
      return convertMonthScheduleDataFromReduxToProps(newData);
    }

    return {
      month: new Date(monthArg.year, monthArg.month - 1),
      tasks: [],
    };
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
      data={data}
      onTaskSelect={handleTaskSelect}
      onDateSelect={handleDateSelect}
    />
  );
}
