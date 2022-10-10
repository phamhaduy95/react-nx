
import { Action } from "@reduxjs/toolkit";
import { ReduxTaskData } from "apps/todo-app/src/redux/types";
import { ErrorsMessage, TaskDataInput, TaskDataSchema } from "../types";



export type TaskEditDrawerState = {
    type:"update"|"add";
    taskData: ReduxTaskData;
    errorMessages: ErrorsMessage<TaskDataSchema>;
    isOpen: boolean;
}

export interface UpdateTaskDataAction extends Action<string> {
    payload: {
        taskDataPiece:Partial<ReduxTaskData>
    }
}

export interface UpdateErrorsMessage extends Action<string> {
    payload: {
        errorMessage:ErrorsMessage<TaskDataSchema>
    }
}

export interface ToggleDrawerAction extends Action<string> {
    payload: {
        isOpen:boolean,
    }
}


