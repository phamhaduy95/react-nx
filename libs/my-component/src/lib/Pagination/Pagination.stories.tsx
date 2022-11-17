import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Pagination } from './Pagination';

export default {
  component: Pagination,
  title: 'my-component/Pagination',
} as ComponentMeta<typeof Pagination>;

const Template: ComponentStory<typeof Pagination> = (args) => (
  <Pagination {...args} />
);

export const Example = Template.bind({});
Example.args = {
  maxNumber: 7,
  boundaryCount: 1,
  siblingCount: 0,
};

Example.argTypes = {
  onActiveChange: { action: 'ok' },
};
