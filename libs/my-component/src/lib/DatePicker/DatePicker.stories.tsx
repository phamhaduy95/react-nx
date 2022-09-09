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

const Template: ComponentStory<typeof DatePicker> = (args) => {
  const {dateFormat,label} = args; 
  
  return (
  <DatePicker dateFormat={dateFormat} label={label} />
 )
};

export const Primary = Template.bind({});
Primary.args = {
  dateFormat: 'DD/MM/YYYY',
  label: '',
};
