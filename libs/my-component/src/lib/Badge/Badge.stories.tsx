import { ComponentStory, ComponentMeta } from '@storybook/react';
import Badge from './Badge';

export default {
  component: Badge,
  title: 'my-component/Badge',
} as ComponentMeta<typeof Badge>;

const Template: ComponentStory<typeof Badge> = (args) => <Badge {...args} />;

export const Example:ComponentStory<typeof Badge> = (args)=>{
    return (
      <Badge {...args} >
        <div>Bell</div>
      </Badge>
    )
}

Example.args = {
  badgeContent:25,
  maxValue:99,
  showZero:false,
}

