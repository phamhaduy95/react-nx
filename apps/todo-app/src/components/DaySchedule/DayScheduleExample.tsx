import dayjs from 'dayjs';
import { TaskDataType } from '../../type/model';
import { DaySchedule, DayScheduleProps } from './DaySchedule';
import { v4 as uuidv4 } from 'uuid';
import { useMemo } from 'react';

const generateTask = (
  title: string,
  startDate: Date,
  length: number,
  unit: dayjs.ManipulateType
): TaskDataType => {
  return {
    id: uuidv4(),
    category: '',
    description: '',
    title: title,
    startDate: startDate,
    endDate: dayjs(startDate).add(length, unit).toDate(),
  };
};

export function getDayScheduleSampleData(){
  const startTime = dayjs().hour(8).minute(0);
  const data: DayScheduleProps['data'] = {
    date: dayjs().toDate(),
    tasksList: [
      generateTask('task 1', startTime.add(-5, 'hour').toDate(), 230, 'minute'),
      generateTask('task 2', startTime.add(-2, 'hour').toDate(), 1, 'day'),
      generateTask('task 5', startTime.add(2, 'hour').toDate(), 3, 'hour'),
      generateTask('task 12', startTime.add(2, 'hour').toDate(), 3, 'hour'),
      generateTask('task 15', startTime.toDate(), 40, 'minute'),
      generateTask('task 19', startTime.toDate(), 40, 'minute'),
      generateTask('task 11', startTime.toDate(), 40, 'minute'),
      generateTask('task 13', startTime.toDate(), 40, 'minute'),
      generateTask('task 4', startTime.add(30, 'minute').toDate(), 510, 'minute'),
    ],
  }; 
  return data;
}


export function DayScheduleExample() {
  const data = useMemo(()=>getDayScheduleSampleData(),[])

  const handleTaskSelect: DayScheduleProps['onTaskSelect'] = (task) => {
    console.log(task);
  };

  const handleDateSelect: DayScheduleProps['onDateSelect'] = (date) => {
    console.log(date);
  };
  return (
    <DaySchedule
      data={data}
      onTaskSelect={handleTaskSelect}
      onDateSelect={handleDateSelect}
    />
  );
}
