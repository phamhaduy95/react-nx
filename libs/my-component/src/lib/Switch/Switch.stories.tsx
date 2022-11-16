import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Switch } from './Switch';

export default {
  component: Switch,
  title: 'my-component/Switch',
  argTypes: {
    onChange: { action: 'is toggled' },
  },
} as ComponentMeta<typeof Switch>;

const Template: ComponentStory<typeof Switch> = (args) => <Switch {...args} />;

export const Example = Template.bind({});
Example.args = {
  disabled: false,
  value: false,
};
