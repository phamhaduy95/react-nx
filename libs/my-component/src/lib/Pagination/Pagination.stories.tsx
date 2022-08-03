import { ComponentStory, ComponentMeta } from '@storybook/react';
import  Pagination  from './Pagination';

export default {
  component: Pagination,
  title: 'my-component/Pagination',
} as ComponentMeta<typeof Pagination>;

const Template: ComponentStory<typeof Pagination> = (args) => (
  <Pagination {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  maxNumber:7,
  boundaryCount:0,
  siblingCount:0,
  onActiveChange:()=>{console.log("active")}
};
