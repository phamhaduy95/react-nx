import { ComponentStory, ComponentMeta } from '@storybook/react';
import { TextField } from './TextField';

export default {
  component: TextField,
  title: 'my-component/TextField',
  argTypes:{
  
  }
} as ComponentMeta<typeof TextField>;

const Template: ComponentStory<typeof TextField> = (args) => (
  <TextField {...args} />
);

export const Example:ComponentStory<typeof TextField> = (args) => (
  <TextField {...args} />
);
Example.args = {
  type:"password",
  addOnBefore:"ok",
  prefix:"01"
};
