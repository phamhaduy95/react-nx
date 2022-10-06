import { ReduxTaskData } from "apps/todo-app/src/redux/types";


type DateStr = string;

export type ReduxMonthScheduleState = {
  month: DateStr;
  tasks: ReduxTaskData[];
};
