import {
  convertTaskDataIntoReduxState,
} from 'apps/todo-app/src/redux';
import { useCallback, useMemo } from 'react';
import { shallowEqual } from 'react-redux';
import { createPredicateFunctionFromFilterOptions } from '../../../redux/CalendarApp/utils';
import { convertWeekScheduleDataFromReduxToProps } from '../../../redux/appApi/utils';
import { WeekScheduleProps, WeekSchedule } from '../../../components';
import { appApi } from '../../../redux/appApi/appApi';
import { useAppAction, useAppDispatch, useAppSelector } from '../../../redux';
import { ModalType } from 'apps/todo-app/src/type/model';

export function WeekScheduleSection() {
  const dispatch = useAppDispatch();
  const action = useAppAction();
  const weekArg = useAppSelector(
    (state) => state.CalendarApp.dateArgs.weekArg,
    shallowEqual
  );

  const filterOptions = useAppSelector(
    (state) => state.CalendarApp.taskFilterOptions
  );

  const { data: reduxData } = appApi.useGetWeekScheduleDataQuery(weekArg);

  const inputData: WeekScheduleProps['data'] = useMemo(() => {
    if (reduxData) {
      const filterFunction =
        createPredicateFunctionFromFilterOptions(filterOptions);
      const filteredTasks = reduxData.tasks.filter((task) =>
        filterFunction(task)
      );
      const newData: typeof reduxData = { ...reduxData, tasks: filteredTasks };
      return convertWeekScheduleDataFromReduxToProps(newData);
    }
    return {
      range: {
        startDate: new Date(weekArg.startDate),
        endDate: new Date(weekArg.endDate),
      },
      tasks: [],
    };
  }, [reduxData, filterOptions,weekArg]);

  const handleTaskSelect: NonNullable<WeekScheduleProps['onTaskSelect']> =
    useCallback((task) => {
      const taskRedux = convertTaskDataIntoReduxState(task);
      dispatch(action.AppModal.openModal(ModalType.addAndUpdateTask));
      dispatch(action.TaskEditModal.editTask(taskRedux));
    }, []);
  const handleDateSelect: NonNullable<WeekScheduleProps['onDateSelect']> =
    useCallback((date) => {
      const startDate = date.toISOString();
      dispatch(action.AppModal.openModal(ModalType.addAndUpdateTask));
      dispatch(action.TaskEditModal.addTask({ startTime: startDate }));
    }, []);

  return (
    <WeekSchedule
      className="CalendarApp__WeekSchedule"
      data={inputData}
      onTaskSelect={handleTaskSelect}
      onDateSelect={handleDateSelect}
    />
  );
}
