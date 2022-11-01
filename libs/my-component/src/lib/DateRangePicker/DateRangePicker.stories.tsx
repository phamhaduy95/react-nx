import { ComponentStory, ComponentMeta } from '@storybook/react';

import { DateRangePicker } from './DateRangePicker';

export default {
  component: DateRangePicker,
  title: 'my-component/DateRangePicker',
  argTypes: {
    onSelect: { action: 'onSelect executed!' },
  },
} as ComponentMeta<typeof DateRangePicker>;

const Template: ComponentStory<typeof DateRangePicker> = (args) => (
  <DateRangePicker {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  className: '',
  dateFormat: '',
  label: { start: 'start', end: 'end' },
};
