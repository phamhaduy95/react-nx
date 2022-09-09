import { ComponentStory, ComponentMeta } from '@storybook/react';
import { TimePicker } from './TimePicker';

export default {
  component: TimePicker,
  title: 'my-component/TimePicker',
} as ComponentMeta<typeof TimePicker>;

const Template: ComponentStory<typeof TimePicker> = (args) => (
  <TimePicker {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
