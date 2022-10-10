import { TaskDataSchema, TaskDataInput } from './types';
export function compareTwoTaskData(data1:TaskDataInput,data2:TaskDataInput){
    if (data1.categoryId !== data2.categoryId) return false;
    if (data1.description !== data2.description) return false;
    if (data1.endTime?.toString() !== data2.endTime?.toString()) return false;
    if  (data1.startTime?.toString() !== data2.startTime?.toString()) return false;
    if (data1.title !== data2.title) return false;
    return true; 
};
