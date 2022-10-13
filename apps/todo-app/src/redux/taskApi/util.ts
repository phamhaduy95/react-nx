import { DayScheduleProps } from '../../components/DaySchedule';
import { MonthScheduleProps } from '../../components/MonthSchedule';
import { WeekScheduleProps } from '../../components/WeekSchedule';
import {
  convertTaskDataIntoReduxState,
  convertTaskDataReduxIntoTaskData,
} from '../utils';
import {
  ReduxDayScheduleState,
  ReduxMonthScheduleState,
  ReduxWeekScheduleState,
} from './type';

export function convertDayScheduleDataFromReduxToProps(
  data: ReduxDayScheduleState
): DayScheduleProps['data'] {
  const newTaskList = data.tasks.map((e) =>
    convertTaskDataReduxIntoTaskData(e)
  );
  return {
    date: new Date(data.date),
    tasksList: newTaskList,
  };
}

export function covertDayScheduleDataFromPropsToRedux(
  data: DayScheduleProps['data']
): ReduxDayScheduleState {
  const reduxTaskList = data.tasksList.map((e) =>
    convertTaskDataIntoReduxState(e)
  );
  return {
    date: data.date.toString(),
    tasks: reduxTaskList,
  };
}

export function convertMonthScheduleDataFromReduxToProps(
  data: ReduxMonthScheduleState
): MonthScheduleProps['data'] {
  const newTaskList = data.tasks.map((e) =>
    convertTaskDataReduxIntoTaskData(e)
  );
  return {
    month: new Date(data.month),

    tasks: newTaskList,
  };
}

export function convertMonthScheduleDataFromPropsToRedux(
  data: MonthScheduleProps['data']
): ReduxMonthScheduleState {
  const reduxTaskList = data.tasks.map((e) => convertTaskDataIntoReduxState(e));
  return {
    month: data.month.toString(),
    tasks: reduxTaskList,
  };
}

export function convertWeekScheduleDataFromReduxToProps(
  data: ReduxWeekScheduleState
): WeekScheduleProps['data'] {
  const tasks = data.tasks.map((e) => convertTaskDataReduxIntoTaskData(e));
  return {
    range: {
      startDate: new Date(data.startDate),
      endDate: new Date(data.endDate),
    },
    tasks: tasks,
  };
}

export function convertWeekScheduleDataFromPropsToRedux(
  data: WeekScheduleProps['data']
): ReduxWeekScheduleState {
  const reduxTaskList = data.tasks.map((e) => convertTaskDataIntoReduxState(e));
  return {
    startDate: data.range.startDate.toISOString(),
    endDate: data.range.endDate.toISOString(),
    tasks: reduxTaskList,
  };
}
