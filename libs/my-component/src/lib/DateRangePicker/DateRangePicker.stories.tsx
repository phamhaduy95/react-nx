import { ComponentStory, ComponentMeta } from '@storybook/react';
import GlobalStyleProvider from '../GlobalStyleProvider';
import { DateRangePicker } from './DateRangePicker';

export default {
  component: DateRangePicker,
  title: 'my-component/DateRangePicker',
  argTypes: {
    onSelect: { action: 'onSelect executed!' },
  },
} as ComponentMeta<typeof DateRangePicker>;

const Template: ComponentStory<typeof DateRangePicker> = (args) => (
  <GlobalStyleProvider>
    <DateRangePicker {...args} />
  </GlobalStyleProvider>
);

export const Primary = Template.bind({});
Primary.args = {
  className: '',
  dateFormat: '',
  label: {start:"start",end:"end"}
};
