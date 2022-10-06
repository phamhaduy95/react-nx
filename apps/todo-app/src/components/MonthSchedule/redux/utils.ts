import {
  convertTaskDataReduxIntoTaskData,
  convertTaskDataIntoReduxState,
} from '../../../redux/utils';
import { MonthScheduleProps } from '../MonthSchedule';
import { ReduxMonthScheduleState } from './types';
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
  const reduxTaskList = data.tasks.map((e) =>
    convertTaskDataIntoReduxState(e)
  );
  return {
    month: data.month.toString(),
    tasks: reduxTaskList,
  };
}
