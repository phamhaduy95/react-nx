import dayjs from 'dayjs';
import React, { useMemo } from 'react';
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
    taskId: uuidv4(),
    categoryId: '',
    description: '',
    title: `task ${count}`,
    startTime: startDate,
    endTime: dayjs(startDate).add(length, unit).toDate(),
    userId: 'c0e86673-bce3-4608-8c32-06763581e952',
  };
};

export function getMonthScheduleDataSample() {
  const firstDateOfMonth = dayjs().startOf('month').hour(0).minute(0);

  const month = dayjs().toDate();
  const tasks = [
    generateTask(firstDateOfMonth.add(1, 'day').toDate(), 25, 'hour'),
    generateTask(firstDateOfMonth.add(3, 'day').toDate(), 300, 'minute'),
    generateTask(firstDateOfMonth.toDate(), 5, 'hour'),
    generateTask(firstDateOfMonth.toDate(), 24 * 5, 'hour'),
    generateTask(firstDateOfMonth.add(28, 'hour').toDate(), 2, 'hour'),
  ];

  return { date: month, tasks };
}

export function MonthScheduleExample() {
  const data = useMemo(() => getMonthScheduleDataSample(), []);
  const handleSelectTask: MonthScheduleProps['onTaskSelect'] = (task) => {
    console.log(task);
  };

  const handleDateSelect: MonthScheduleProps['onDateSelect'] = (date) => {
    console.log(date);
  };
  return (
    // <MonthSchedule
    // isLoading={false}

    //   onDateSelect={handleDateSelect}
    //   onTaskSelect={handleSelectTask}
    // />
    <></>
  );
}
