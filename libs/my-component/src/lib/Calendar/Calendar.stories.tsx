import { ComponentStory, ComponentMeta } from '@storybook/react';
import { GlobalStyleProvider } from '../GlobalStyleProvider';
import Calendar from './Calendar';

export default {
  component: Calendar,
  title: 'my-component/Calendar',
  argTypes: {
    dateValue: {
      control: { type: 'date' },
    },
    onDateSelect: {action:"date selected"}
  },
} as ComponentMeta<typeof Calendar>;

const Template: ComponentStory<typeof Calendar> = (args) => {
  const dateValue = args.dateValue;
  const input = !dateValue ? new Date(Date.now()) : new Date(dateValue);

  return <Calendar {...args} dateValue={input} />;
};

export const Example = Template.bind({});


Example.args = {
  className: '',
  dateValue: new Date(Date.now()),
};
