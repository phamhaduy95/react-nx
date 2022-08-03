import { ComponentStory, ComponentMeta } from '@storybook/react';

import DualRangeSlider from "./DualRangeSlider"

export default {
  component: DualRangeSlider,
  title: 'Slider/DualRangeSlider',
  argTypes:{
    onValueChanged: { action: 'newValue' } 
  }
} as ComponentMeta<typeof DualRangeSlider>;

const Template: ComponentStory<typeof DualRangeSlider> = (args) => (
  <DualRangeSlider  {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  max:150,
  min:0,
  step:1,
  initialValue:{low:10,high:150},
};