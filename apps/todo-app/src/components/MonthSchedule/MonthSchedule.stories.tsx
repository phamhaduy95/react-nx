import { ComponentStory, ComponentMeta } from '@storybook/react';
import dayjs from 'dayjs';

import { TaskDataType } from '../../type/model';

import { v4 as uuidv4 } from 'uuid';
import { MonthScheduleProps, MonthSchedule } from './MonthSchedule';
import React from 'react';

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
    generateTask(firstDateOfMonth.add(2, 'hour').toDate(), 120, 'minute'),
    generateTask(firstDateOfMonth.add(25, 'minute').toDate(), 300, 'minute'),
    generateTask(firstDateOfMonth.toDate(), 5, 'hour'),
    generateTask(firstDateOfMonth.toDate(), 24 * 5, 'hour'),
    generateTask(firstDateOfMonth.add(28, 'hour').toDate(), 2, 'hour'),
  ],
};

export default {
  component: MonthSchedule,
  title: 'MonthSchedule',
} as ComponentMeta<typeof MonthSchedule>;

const Template: ComponentStory<typeof MonthSchedule> = (args) => (
  <MonthSchedule {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
