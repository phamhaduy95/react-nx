import { ComponentStory, ComponentMeta } from '@storybook/react';
import { DatePicker } from './DatePicker';

export default {
  component: DatePicker,
  title: 'my-component/DatePicker',
  argTypes: {
    onSelect: { action: 'onSelect executed!' },
    PanelComponent: { action: 'PanelComponent executed!' },
  },
} as ComponentMeta<typeof DatePicker>;

const Template: ComponentStory<typeof DatePicker> = (args) => (
  <DatePicker {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  dateFormat: '',
  label: '',
};
