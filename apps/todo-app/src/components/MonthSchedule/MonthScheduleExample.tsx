import dayjs from 'dayjs';
import React from 'react';
import { TaskDataType } from '../../type/model';
import { MonthSchedule, MonthScheduleProps } from './MonthSchedule';
import { v4 as uuidv4 } from 'uuid';

let count = 0;
const generateTask = (
  startDate: Date,
  length: number,
  unit: dayjs.ManipulateType
): TaskDataType => {
  count += 1;
  return {
    id: uuidv4(),
    category: '',
    description: '',
    title: `task ${count}`,
    startDate: startDate,
    endDate: dayjs(startDate).add(length, unit).toDate(),
  };
};
const firstDateOfMonth = dayjs().startOf('month').hour(0).minute(0);

const data: MonthScheduleProps['data'] = {
  month: dayjs().toDate(),
  tasks: [
    generateTask(firstDateOfMonth.add(1, 'day').toDate(), 25, 'hour'),
    generateTask(firstDateOfMonth.add(3, 'day').toDate(), 300, 'minute'),
    generateTask(firstDateOfMonth.toDate(), 5, 'hour'),
    generateTask(firstDateOfMonth.toDate(), 24 * 5, 'hour'),
    generateTask(firstDateOfMonth.add(28, 'hour').toDate(), 2, 'hour'),
  ],
};

export function MonthScheduleExample() {
  const handleSelectTask: MonthScheduleProps['onTaskSelect'] = (task) => {
    console.log(task);
  };

  const handleDateSelect: MonthScheduleProps['onDateSelect'] = (date) => {
    console.log(date);
  };
  return (
    <MonthSchedule
      data={data}
      onDateSelect={handleDateSelect}
      onTaskSelect={handleSelectTask}
    />
  );
}
