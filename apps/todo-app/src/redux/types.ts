import { TaskDataType } from "../type/model";

export type ReduxTaskData = Omit<TaskDataType,"startDate"|"endDate"> & {
    startDate:string,
    endDate:string,
  }; 

  