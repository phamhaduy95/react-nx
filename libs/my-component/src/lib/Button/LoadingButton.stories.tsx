import { ComponentStory, ComponentMeta } from '@storybook/react';
import { LoadingButton } from './LoadingButton';
export default {
  component: LoadingButton,
  title: 'my-component/Button/LoadingButton',
} as ComponentMeta<typeof LoadingButton>;



export const Example: ComponentStory<typeof LoadingButton> = (args) => (
  <LoadingButton {...args} />
);
Example.args = {
  children:"Loading",
};
