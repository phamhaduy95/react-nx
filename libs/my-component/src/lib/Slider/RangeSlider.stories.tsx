import { ComponentStory, ComponentMeta } from '@storybook/react';

import RangeSlider from './RangeSlider';

export default {
  component: RangeSlider,
  title: 'Slider/RangeSlider',
  argTypes:{
    onValueChanged: { action: 'newValue' } 
  }
} as ComponentMeta<typeof RangeSlider>;

const Template: ComponentStory<typeof RangeSlider> = (args) => (
  <RangeSlider  {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  max:150,
  min:0,
  step:1,
};
