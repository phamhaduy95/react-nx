import { ComponentStory, ComponentMeta } from '@storybook/react';
import { BreadCrumbs } from './BreadCrumbs';

export default {
  component: BreadCrumbs,
  title: 'BreadCrumbs',
} as ComponentMeta<typeof BreadCrumbs>;


const items = ["Home","About","Product","Author"]
const children = items.map((item,i)=>{
  return <BreadCrumbs.Item index={i}>
          <a href="#">{item}</a>
          </BreadCrumbs.Item>
})



const Template: ComponentStory<typeof BreadCrumbs> = (args) => (
  <BreadCrumbs {...args}>{args.children}</BreadCrumbs>
);

export const Primary = Template.bind({});
Primary.args = {
  maxItem: 2,
  separator: '/',
  children: children,
  onChange:()=>{console.log("onchange")}
};
