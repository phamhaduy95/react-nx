import { ComponentStory, ComponentMeta } from '@storybook/react';
import { TextField } from './TextField';

export default {
  component: TextField,
  title: 'my-component/TextField',
} as ComponentMeta<typeof TextField>;


export const Example: ComponentStory<typeof TextField> = (args) => (
  <TextField {...args} />
);
Example.args = {
  label: 'name',
};
