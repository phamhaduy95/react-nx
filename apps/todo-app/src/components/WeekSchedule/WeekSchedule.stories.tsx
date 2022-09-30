import { ComponentStory, ComponentMeta } from '@storybook/react';
import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';
import { TaskDataType } from '../../type/model';
import { WeekSchedule, WeekScheduleProps } from './WeekSchedule';

let count =0;
const generateTask = (
  startDate: Date,
  length: number,
  unit: dayjs.ManipulateType
): TaskDataType => {
  count +=1; 
  return {
    id: uuidv4(),
    category: '',
    description: '',
    title: `task ${count}`,
    startDate: startDate,
    endDate: dayjs(startDate).add(length, unit).toDate(),
  };
};
const startTime = dayjs().date(11).hour(0).minute(0);

const data: WeekScheduleProps['data'] = {
   range:{
    startDate:new Date(2022,8,11),
    endDate:new Date(2022,8,17),
   },
   tasks: [
    generateTask( startTime.add(0, 'hour').toDate(),1, 'hour'),
    generateTask( startTime.add(0, 'hour').toDate(),50, 'minute'),
    generateTask( startTime.add(55, 'minute').toDate(), 2, 'hour'),
    generateTask( startTime.add(55, 'minute').toDate(), 2, 'hour'),
    generateTask( startTime.add(80, 'minute').toDate(), 2, 'hour'),
    generateTask( startTime.add(3, 'hour').toDate(), 1, 'hour'),
    generateTask( startTime.add(4*61, 'minute').toDate(), 1, 'hour'),
  ],
};

export default {
  component: WeekSchedule,
  title: 'DaySchedule',
} as ComponentMeta<typeof WeekSchedule>;

const Template: ComponentStory<typeof WeekSchedule> = (args) => (
  <WeekSchedule {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  data: data,
};
