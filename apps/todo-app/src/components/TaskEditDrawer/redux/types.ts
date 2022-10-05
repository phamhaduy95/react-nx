
import { Action } from "@reduxjs/toolkit";
import { ErrorsMessage, TaskDataInput, TaskDataSchema } from "../types";


export type TaskEditDrawerState = {
    taskData: TaskDataInput;
    errorMessages: ErrorsMessage<TaskDataSchema>;
    isOpen: boolean;
}

export interface UpdateTaskDataAction extends Action<string> {
    payload: {
        taskDataPiece:Partial<TaskDataInput>
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


