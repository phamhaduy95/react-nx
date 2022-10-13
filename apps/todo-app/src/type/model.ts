import { Omit } from "@reduxjs/toolkit/dist/tsHelpers";

export type TaskDataType = {
    taskId: string;
    categoryId: string;
    title: string;
    userId:string;
    startTime: Date;
    endTime: Date;
    description: string;
  };

  // since redux does not allow any non-serializable data type ( in this case is Date ). startDate and endDate hove to be string instead.

