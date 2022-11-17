import { ComponentStory, ComponentMeta } from '@storybook/react';
import BreadCrumbsItem from './BreadCrumbItem';
import { BreadCrumbs } from './BreadCrumbs';

export default {
  component: BreadCrumbs,
  title: 'my-component/BreadCrumbs',
} as ComponentMeta<typeof BreadCrumbs>;

const items = ['Home', 'About', 'Product', 'Author', 'Section1', 'Work'];
const children = items.map((item, i) => {
  return (
    <BreadCrumbsItem value={item} key={i}>
      <a href="#">{item}</a>
    </BreadCrumbsItem>
  );
});

const Template: ComponentStory<typeof BreadCrumbs> = (args) => (
  <BreadCrumbs {...args}>{args.children}</BreadCrumbs>
);

export const Primary = Template.bind({});
Primary.args = {
  children: children,
  maxItems: 4,
  itemsAfterCollapse: 2,
  itemsBeforeCollapse: 1,
  separator: '/',
};
