import { ComponentStory, ComponentMeta } from '@storybook/react';
import { IconButton } from './IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
export default {
  component: IconButton,
  title: 'my-component/Button/IconButton',
} as ComponentMeta<typeof IconButton>;



export const Example: ComponentStory<typeof IconButton> = (args) => (
  <IconButton {...args} />
);
Example.args = {
  children:<DeleteIcon/>
};
