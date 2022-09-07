import { ComponentStory, ComponentMeta } from '@storybook/react';
import { DropDown } from './DropDown';
import { DropDownItem } from './DropDownItem';

export default {
  component: DropDown,
  title: 'my-component/DropDown',
} as ComponentMeta<typeof DropDown>;

export const Primary: ComponentStory<typeof DropDown> = (args) => {
  return (
    <DropDown label="Item List">
      <DropDownItem>Item 1</DropDownItem>
      <DropDownItem>Item 2</DropDownItem>
      <DropDownItem>Item 3</DropDownItem>
      <DropDownItem>Item 4</DropDownItem>
    </DropDown>
  );
};
Primary.args = {};
