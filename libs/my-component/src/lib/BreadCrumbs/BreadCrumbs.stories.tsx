import { ComponentStory, ComponentMeta } from '@storybook/react';
import { BreadCrumbs } from './BreadCrumbs';

export default {
  component: BreadCrumbs,
  title: 'BreadCrumbs',
} as ComponentMeta<typeof BreadCrumbs>;

const Template: ComponentStory<typeof BreadCrumbs> = (args) => (
  <BreadCrumbs {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
