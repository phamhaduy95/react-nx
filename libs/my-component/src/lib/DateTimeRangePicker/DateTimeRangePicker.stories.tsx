import { ComponentStory, ComponentMeta } from '@storybook/react';
import { DateTimeRangePicker } from './DateTimeRangePicker';
import GlobalStyleProvider from '../GlobalStyleProvider';

export default {
  component: DateTimeRangePicker,
  title: 'my-component/DateTimeRangePicker',
} as ComponentMeta<typeof DateTimeRangePicker>;

const Template: ComponentStory<typeof DateTimeRangePicker> = (args) => (
  <GlobalStyleProvider>
    <DateTimeRangePicker {...args} />
  </GlobalStyleProvider>
);

export const Primary = Template.bind({});
Primary.args = {
  className: '',
};
