import { ComponentStory, ComponentMeta } from '@storybook/react';
import GlobalStyleProvider from '../GlobalStyleProvider';
import { TimePicker } from './TimePicker';

export default {
  component: TimePicker,
  title: 'my-component/TimePicker',
} as ComponentMeta<typeof TimePicker>;

const Template: ComponentStory<typeof TimePicker> = (args) => (
  <GlobalStyleProvider>
  <TimePicker {...args} />
  </GlobalStyleProvider>

);

export const Primary = Template.bind({});
Primary.args = {};
