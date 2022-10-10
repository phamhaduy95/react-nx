import dayjs from 'dayjs';
import { TaskDataType } from '../../type/model';
import { WeekSchedule, WeekScheduleProps } from './WeekSchedule';
import { v4 as uuidv4 } from 'uuid';
import { useCallback } from 'react';

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
  };
};

export function getWeekScheduleSampleData() {
  const startTime = dayjs().hour(0).minute(0);

  const data: WeekScheduleProps['data'] = {
    range: {
      startDate: dayjs().startOf('week').toDate(),
      endDate: dayjs().endOf('week').toDate(),
    },
    tasks: [
      generateTask(startTime.add(0, 'hour').toDate(), 1, 'hour'),
      generateTask(startTime.add(0, 'hour').toDate(), 50, 'minute'),
      generateTask(startTime.add(55, 'minute').toDate(), 2, 'hour'),
      generateTask(startTime.add(55, 'minute').toDate(), 2, 'hour'),
      generateTask(startTime.add(80, 'minute').toDate(), 2, 'hour'),
      generateTask(startTime.add(3, 'hour').toDate(), 1, 'hour'),
      generateTask(startTime.add(4 * 61, 'minute').toDate(), 1, 'hour'),
    ],
  };

  return data;
}

export default function WeekScheduleExample() {
  const data = getWeekScheduleSampleData();
  const handleTaskSelect: NonNullable<WeekScheduleProps['onTaskSelect']> =
    useCallback((task) => {
      console.log(task);
    }, []);

  const handleDateSelect: NonNullable<WeekScheduleProps['onDateSelect']> =
    useCallback((date) => {
      console.log(date);
    }, []);

  return (
    <WeekSchedule
      data={data}
      onTaskSelect={handleTaskSelect}
      onDateSelect={handleDateSelect}
    />
  );
}
