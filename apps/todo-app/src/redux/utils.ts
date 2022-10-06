import { TaskDataType } from '../type/model';
import { ReduxTaskData } from './types';
export function convertTaskDataIntoReduxState(taskData:TaskDataType):ReduxTaskData{
    const startDate = taskData.startDate.toString();
    const endDate = taskData.endDate.toString();
    return {...taskData,startDate,endDate} as ReduxTaskData
}

export function convertTaskDataReduxIntoTaskData(taskRedux:ReduxTaskData):TaskDataType {
    const startDate = new Date(taskRedux.startDate);
    const endDate = new Date(taskRedux.endDate);
    return {...taskRedux,startDate,endDate};
}

