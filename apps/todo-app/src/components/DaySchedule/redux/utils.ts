import { ReduxDayScheduleState } from './types';
import { DayScheduleProps } from '../DaySchedule';
import {
  convertTaskDataReduxIntoTaskData,
  convertTaskDataIntoReduxState,
} from '../../../redux/utils';
export function convertDayScheduleDataFromReduxToProps(
  data: ReduxDayScheduleState
): DayScheduleProps['data'] {
  const newTaskList = data.tasksList.map((e) =>
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
    tasksList: reduxTaskList,
  };
}
