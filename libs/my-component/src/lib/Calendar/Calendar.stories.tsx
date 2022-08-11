import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Calendar } from './Calendar';

export default {
  component: Calendar,
  title: 'my-component/Calendar',
  argTypes: {
    onSelect: { action: 'onSelect executed!' },
  },
} as ComponentMeta<typeof Calendar>;

const Template: ComponentStory<typeof Calendar> = (args) => (
  <Calendar {...args} />
);

export const Example = Template.bind({});
Example.args = {
  className: '',
  selectable: false,
  date: new Date(Date.now())
};
