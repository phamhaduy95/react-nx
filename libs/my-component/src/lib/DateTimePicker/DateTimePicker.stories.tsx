import { ComponentStory, ComponentMeta } from '@storybook/react';
import { DateTimePicker } from './DateTimePicker';

export default {
  component: DateTimePicker,
  title: 'my-component/DateTimePicker',
  argTypes: {
    onSelect: { action: 'onSelect executed!' },
    DatePanel: { action: 'DatePanel executed!' },
  },
} as ComponentMeta<typeof DateTimePicker>;

const Template: ComponentStory<typeof DateTimePicker> = (args) => (
  <DateTimePicker {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  className: '',
  dateFormat: '',
  isSecondIncluded: false,
  label: '',
  timeDelimiters: '',
};
