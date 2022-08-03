import { ComponentStory, ComponentMeta } from '@storybook/react';
import Tag  from './Tag';

export default {
  component: Tag,
  title: 'Tag',
} as ComponentMeta<typeof Tag>;

const Template: ComponentStory<typeof Tag> = (args) => <Tag {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
