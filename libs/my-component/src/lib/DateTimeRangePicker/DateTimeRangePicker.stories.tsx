import { ComponentStory, ComponentMeta } from '@storybook/react';
import { DateTimeRangePicker } from './DateTimeRangePicker';


export default {
  component: DateTimeRangePicker,
  title: 'my-component/DateTimeRangePicker',
} as ComponentMeta<typeof DateTimeRangePicker>;

const Template: ComponentStory<typeof DateTimeRangePicker> = (args) => (
    <DateTimeRangePicker {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  className: '',
};
