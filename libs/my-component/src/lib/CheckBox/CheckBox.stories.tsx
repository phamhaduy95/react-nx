import { ComponentStory, ComponentMeta } from '@storybook/react';
import { CheckBox } from './CheckBox';

export default {
  component: CheckBox,
  title: 'my-component/CheckBox',
} as ComponentMeta<typeof CheckBox>;

const Template: ComponentStory<typeof CheckBox> = (args) => (
  <CheckBox {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  label:"check me",
  value:"ok",
};
