import { TaskDataSchema } from './types';
export function compareTwoTaskData(data1:TaskDataSchema,data2:TaskDataSchema){
    if (data1.category !== data2.category) return false;
    if (data1.description !== data2.description) return false;
    if (data1.endDate?.toString() !== data2.endDate?.toString()) return false;
    if  (data1.startDate?.toString() !== data2.startDate?.toString()) return false;
    if (data1.title !== data2.title) return false;
    return true; 
};
