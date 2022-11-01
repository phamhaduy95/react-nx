import { ComponentStory, ComponentMeta } from '@storybook/react';
import {GlobalStyleProvider} from '../GlobalStyleProvider';
import Calendar from './Calendar';


export default {
  component: Calendar,
  title: 'my-component/Calendar',
  argTypes: {
    onSelect: { action: 'onSelect executed!' },
  },
} as ComponentMeta<typeof Calendar>;

const Template: ComponentStory<typeof Calendar> = (args) => (
  <GlobalStyleProvider>
  <Calendar {...args} />
  </GlobalStyleProvider>
);

export const Example = Template.bind({});
Example.args = {
  className: '',
  selectable: false,
};
