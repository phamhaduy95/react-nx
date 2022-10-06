import { ReduxTaskData } from "apps/todo-app/src/redux/types";


type DateStr = string;

export type ReduxDayScheduleState = {
  date: DateStr;
  tasksList: ReduxTaskData[];
};
