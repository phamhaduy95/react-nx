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
import { createPredicateFunctionFromFilterOptions } from '../../../redux/CalendarApp';
import {
  convertDayScheduleDataFromReduxToProps,
  convertTaskDataIntoReduxState,
} from '../../../redux/appApi/utils';
import { ModalType } from 'apps/todo-app/src/type/model';


export function DayScheduleSection() {
  const dispatch = useAppDispatch();
  const action = useAppAction();
  const dayArg = useAppSelector(
    (state) => state.CalendarApp.dateArgs.dateArg,
    shallowEqual
  );

  const { data: reduxData } = appApi.useGetDayScheduleDataQuery(dayArg);

  const filterOption = useAppSelector(
    (state) => state.CalendarApp.taskFilterOptions
  );
  const data: DayScheduleProps['data'] = useMemo(() => {
    if (reduxData) {
      const filterPredicate =
        createPredicateFunctionFromFilterOptions(filterOption);
      const filterTasks = reduxData.tasks.filter((task) =>
        filterPredicate(task)
      );
      const newData = { ...reduxData, tasks: filterTasks };
      return convertDayScheduleDataFromReduxToProps(newData);
    }
    return {
      date: new Date(dayArg.year, dayArg.month - 1, dayArg.date),
      tasksList: [],
    };
  }, [reduxData, filterOption]);

  const handleTaskSelect: NonNullable<DayScheduleProps['onTaskSelect']> =
    useCallback((task) => {
      const taskRedux = convertTaskDataIntoReduxState(task);
      dispatch(action.AppModal.openModal(ModalType.addAndUpdateTask));
      dispatch(action.TaskEditModal.editTask(taskRedux));
    }, []);
  const handleDateSelect: NonNullable<DayScheduleProps['onDateSelect']> =
    useCallback((date) => {
      const startDate = date.toString();
      dispatch(action.AppModal.openModal(ModalType.addAndUpdateTask));
      dispatch(action.TaskEditModal.addTask({ startTime: startDate }));
    }, []);

  return (
    <DaySchedule
      className="CalendarApp__DaySchedule"
      data={data}
      onTaskSelect={handleTaskSelect}
      onDateSelect={handleDateSelect}
    />
  );
}
